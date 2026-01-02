
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Mic, Volume2, RefreshCcw, CheckCircle, AlertCircle, BarChart3, Play, Star, Zap, ChevronDown, History, Trophy } from 'lucide-react';
import { vocabularyList } from '../data/vocabulary';

// --- Types ---
interface PracticePhrase {
  id: string;
  char: string;
  pinyin: string;
  meaning: string;
  example?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface Topic {
  id: string;
  name: string;
  icon: string;
  phrases: PracticePhrase[];
}

interface WordHistory {
  correctCount: number;
  totalAttempts: number;
  totalScore: number;
}

type PracticeMode = 'vocab' | 'example';

export const SpeakingPage: React.FC = () => {
  // --- Persisted State: History ---
  const [practiceHistory, setPracticeHistory] = useState<Record<string, WordHistory>>(() => {
    const saved = localStorage.getItem('pronunciation_history');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('pronunciation_history', JSON.stringify(practiceHistory));
  }, [practiceHistory]);

  // --- Configuration State ---
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('vocab');
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);

  // Generate topics dynamically from the vocabulary list
  const generatedTopics = useMemo(() => {
    const groups: Record<string, PracticePhrase[]> = {};
    
    const sortedVocab = [...vocabularyList].sort((a, b) => {
      const getLvl = (l: string) => parseInt(l.match(/\d+/)?.[0] || '0');
      return getLvl(a.level) - getLvl(b.level);
    });

    sortedVocab.forEach(v => {
      const level = v.level || 'Khác';
      if (!groups[level]) groups[level] = [];
      
      let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy';
      if (v.char.length >= 4) difficulty = 'Hard';
      else if (v.char.length >= 2) difficulty = 'Medium';

      groups[level].push({
        ...v,
        difficulty
      });
    });

    return Object.keys(groups).map(level => ({
      id: level.replace(/\s+/g, '-').toLowerCase(),
      name: level,
      icon: level.includes('1') ? '🌱' : level.includes('2') ? '🌿' : level.includes('3') ? '🌳' : '📖',
      phrases: groups[level]
    }));
  }, []);

  const [activeTopicId, setActiveTopicId] = useState<string>(generatedTopics[0]?.id || '');
  const activeTopic = useMemo(() => 
    generatedTopics.find(t => t.id === activeTopicId) || generatedTopics[0], 
    [activeTopicId, generatedTopics]
  );
  
  const [activePhrase, setActivePhrase] = useState<PracticePhrase>(activeTopic?.phrases[0]);

  // Sync active phrase when topic or mode changes
  useEffect(() => {
    if (activeTopic && !activeTopic.phrases.find(p => p.id === activePhrase?.id)) {
      setActivePhrase(activeTopic.phrases[0]);
    }
  }, [activeTopic]);
  
  // Speech Recognition State
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'listening' | 'analyzing' | 'success' | 'error'>('idle');
  const recognitionRef = useRef<any>(null);

  // Audio Visualization State
  const [audioLevel, setAudioLevel] = useState<number[]>(new Array(10).fill(10));
  const animationRef = useRef<number>(0);

  // Practice Counter (Session specific)
  const [practicedInSession, setPracticedInSession] = useState<Set<string>>(new Set());

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'zh-CN';

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        setFeedbackStatus('listening');
        setTranscript('');
        setScore(null);
        startVisualizer();
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        stopVisualizer();
        if (feedbackStatus === 'listening') setFeedbackStatus('idle');
      };

      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        analyzePronunciation(result);
      };

      recognitionRef.current.onerror = () => {
        setFeedbackStatus('error');
        setIsRecording(false);
        stopVisualizer();
      };
    }

    return () => {
      stopVisualizer();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [activePhrase, practiceMode]);

  const startRecording = () => {
    if (recognitionRef.current) recognitionRef.current.start();
    else alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome.");
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  const playReferenceAudio = () => {
    if ('speechSynthesis' in window) {
      const textToSpeak = practiceMode === 'vocab' ? activePhrase.char : (activePhrase.example || activePhrase.char);
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const analyzePronunciation = (spokenText: string) => {
    setFeedbackStatus('analyzing');
    const targetText = practiceMode === 'vocab' ? activePhrase.char : (activePhrase.example || activePhrase.char);
    
    const cleanSpoken = spokenText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？。！]/g,"");
    const cleanTarget = targetText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？。！]/g,"");

    let matchCount = 0;
    for(let char of cleanTarget) {
      if(cleanSpoken.includes(char)) matchCount++;
    }

    let calculatedScore = 0;
    if (cleanTarget === cleanSpoken) {
      calculatedScore = 100;
    } else {
      const lengthScore = 1 - (Math.abs(cleanSpoken.length - cleanTarget.length) / Math.max(cleanSpoken.length, cleanTarget.length));
      const charScore = matchCount / cleanTarget.length;
      calculatedScore = Math.floor(((lengthScore * 0.3) + (charScore * 0.7)) * 100);
    }
    
    if (calculatedScore < 0) calculatedScore = 0;
    if (cleanSpoken !== cleanTarget && calculatedScore > 90) calculatedScore = 90;

    setTimeout(() => {
      setScore(calculatedScore);
      setFeedbackStatus('success');
      
      // Update history
      setPracticeHistory(prev => {
        const current = prev[activePhrase.id] || { correctCount: 0, totalAttempts: 0, totalScore: 0 };
        return {
          ...prev,
          [activePhrase.id]: {
            correctCount: calculatedScore >= 80 ? current.correctCount + 1 : current.correctCount,
            totalAttempts: current.totalAttempts + 1,
            totalScore: current.totalScore + calculatedScore
          }
        };
      });

      // Update session progress
      setPracticedInSession(prev => new Set(prev).add(activePhrase.id));
    }, 600);
  };

  const startVisualizer = () => {
    const update = () => {
      setAudioLevel(prev => prev.map(() => Math.random() * 40 + 10));
      animationRef.current = requestAnimationFrame(update);
    };
    update();
  };

  const stopVisualizer = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setAudioLevel(new Array(10).fill(5));
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (s >= 50) return 'text-orange-500 bg-orange-50 border-orange-200';
    return 'text-red-500 bg-red-50 border-red-200';
  };

  const getFeedbackMessage = (s: number) => {
    if (s >= 90) return "Tuyệt vời! Phát âm chuẩn người bản xứ.";
    if (s >= 80) return "Rất tốt! Chỉ sai lệch một chút về thanh điệu.";
    if (s >= 50) return "Khá tốt. Hãy chú ý rõ âm hơn.";
    return "Hãy thử lại. Cố gắng nói chậm và rõ hơn.";
  };

  if (!activePhrase) return null;

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 animate-fade-in">
      
      {/* Sidebar: Topics & Phrases */}
      <div className="w-full md:w-80 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Mic className="w-5 h-5 text-blue-600" />
            Chủ đề luyện nói
          </h2>
        </div>
        
        {/* Topic Selector */}
        <div className="flex p-2 gap-2 overflow-x-auto border-b border-slate-100 no-scrollbar">
           {generatedTopics.map(topic => (
             <button
               key={topic.id}
               onClick={() => setActiveTopicId(topic.id)}
               className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                 activeTopicId === topic.id 
                 ? 'bg-blue-600 text-white shadow-sm' 
                 : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
               }`}
             >
               <span>{topic.icon}</span>
               {topic.name}
             </button>
           ))}
        </div>

        {/* Practice Mode Selector (Matches Screenshot 2) */}
        <div className="relative border-b-2 border-blue-500/10">
           <div className="px-4 pt-3 pb-1">
             <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest block mb-1">
               DỮ LIỆU TỪ FLASHCARDS (SRS)
             </span>
           </div>
           <button 
             onClick={() => setIsModeMenuOpen(!isModeMenuOpen)}
             className="w-full px-4 pb-3 flex items-center justify-between hover:bg-slate-50 transition-colors group"
           >
              <span className="text-sm font-bold text-slate-700">
                 Luyện nói với "{practiceMode === 'vocab' ? 'từ vựng' : 'câu ví dụ'}"
              </span>
              <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform ${isModeMenuOpen ? 'rotate-180' : ''}`} />
           </button>
           
           {isModeMenuOpen && (
             <div className="absolute top-full left-0 right-0 bg-white border-b border-x border-slate-200 shadow-xl z-20 animate-in slide-in-from-top-2 duration-200 rounded-b-xl overflow-hidden">
                <button 
                  onClick={() => { setPracticeMode('vocab'); setIsModeMenuOpen(false); }}
                  className={`w-full text-left px-6 py-3 text-sm font-bold transition-colors hover:bg-blue-50 ${practiceMode === 'vocab' ? 'text-blue-600 bg-blue-50/50 border-l-4 border-blue-600' : 'text-slate-600'}`}
                >
                  Luyện nói với "từ vựng"
                </button>
                <button 
                  onClick={() => { setPracticeMode('example'); setIsModeMenuOpen(false); }}
                  className={`w-full text-left px-6 py-3 text-sm font-bold transition-colors hover:bg-blue-50 ${practiceMode === 'example' ? 'text-blue-600 bg-blue-50/50 border-l-4 border-blue-600' : 'text-slate-600'}`}
                >
                  Luyện nói với "câu ví dụ"
                </button>
             </div>
           )}
        </div>

        {/* Phrase List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
          {activeTopic.phrases.map((phrase) => {
            const hist = practiceHistory[phrase.id] as WordHistory;
            const isPracticed = practicedInSession.has(phrase.id);
            return (
              <div 
                key={phrase.id}
                onClick={() => {
                  setActivePhrase(phrase);
                  setScore(null);
                  setTranscript('');
                  setFeedbackStatus('idle');
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer group relative ${
                  activePhrase.id === phrase.id 
                  ? 'bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-200' 
                  : 'bg-white border-slate-100 hover:border-blue-200'
                }`}
              >
                <div className="flex justify-between items-start">
                   <div className="flex-1">
                      <div className={`text-lg font-bold font-sans mb-1 ${activePhrase.id === phrase.id ? 'text-blue-700' : 'text-slate-800'}`}>
                        {phrase.char}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{phrase.meaning}</div>
                   </div>
                   <div className="flex items-center gap-2">
                      {isPracticed && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {activePhrase.id === phrase.id && <div className="text-blue-500 animate-pulse"><Play className="w-3 h-3 fill-current" /></div>}
                   </div>
                </div>
                
                {hist && hist.totalAttempts > 0 && (
                   <div className="mt-2 pt-2 border-t border-slate-100/80 flex items-center gap-3 text-[10px] font-black text-slate-400">
                      <span className="flex items-center gap-1"><Trophy className="w-2.5 h-2.5 text-yellow-500" /> {hist.correctCount} ĐẠT</span>
                      <span className="flex items-center gap-1"><History className="w-2.5 h-2.5" /> TB: {Math.round(hist.totalScore / hist.totalAttempts)}Đ</span>
                   </div>
                )}
                
                <div className="mt-2 flex items-center justify-between">
                   <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${
                     phrase.difficulty === 'Easy' ? 'text-green-600 border-green-200 bg-green-50' :
                     phrase.difficulty === 'Medium' ? 'text-orange-600 border-orange-200 bg-orange-50' :
                     'text-red-600 border-red-200 bg-red-50'
                   }`}>
                     {phrase.difficulty}
                   </span>
                   {phrase.id.includes('hsk') && (
                     <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
                       HSK {phrase.id.split('-')[0].replace('hsk', '')}
                     </span>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Practice Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
            <div className={`h-full transition-all duration-1000 ${score ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: score ? `${score}%` : '0%' }}></div>
         </div>

         <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-white">
            <div className="mb-8 text-center max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-widest mb-8 border border-blue-200 shadow-sm">
                 {activeTopic.name} • {practiceMode === 'vocab' ? 'TỪ VỰNG' : 'CÂU VÍ DỤ'}
              </span>
              
              <h1 className={`font-black text-slate-800 font-sans mb-8 drop-shadow-sm tracking-wide leading-tight ${
                practiceMode === 'vocab' ? 'text-8xl md:text-9xl' : 'text-3xl md:text-5xl px-6'
              }`}>
                {practiceMode === 'vocab' ? activePhrase.char : (activePhrase.example || activePhrase.char)}
              </h1>
              
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-3 font-sans italic opacity-90">
                {practiceMode === 'vocab' ? activePhrase.pinyin : (activePhrase.examplePinyin || activePhrase.pinyin)}
              </div>
              
              <p className="text-xl text-slate-500 font-semibold max-w-lg mx-auto">
                {practiceMode === 'vocab' ? activePhrase.meaning : (activePhrase.exampleMeaning || activePhrase.meaning)}
              </p>
            </div>

            <button 
              onClick={playReferenceAudio}
              className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 rounded-full text-slate-700 font-black shadow-lg hover:border-blue-400 hover:text-blue-700 hover:shadow-blue-100 transition-all group active:scale-95"
            >
               <Volume2 className="w-7 h-7 group-hover:scale-110 transition-transform" />
               NGHE MẪU
            </button>
         </div>

         <div className="min-h-[160px] border-t border-slate-100 bg-slate-50/50 p-6 flex flex-col items-center justify-center">
            {feedbackStatus === 'idle' && (
              <div className="text-slate-400 flex flex-col items-center animate-fade-in">
                 <p className="mb-4 font-black text-xs tracking-[0.2em] uppercase">NHẤN MICRO ĐỂ BẮT ĐẦU NÓI</p>
                 <div className="h-1 w-16 bg-slate-200 rounded-full"></div>
              </div>
            )}

            {feedbackStatus === 'listening' && (
              <div className="flex flex-col items-center animate-fade-in w-full max-w-md">
                 <p className="text-blue-600 font-black text-sm uppercase mb-4 animate-pulse">Đang lắng nghe...</p>
                 <div className="flex items-end justify-center gap-1.5 h-16 w-full">
                    {audioLevel.map((h, i) => (
                      <div 
                        key={i} 
                        className="w-2.5 bg-blue-600 rounded-full transition-all duration-75 ease-in-out shadow-sm"
                        style={{ height: `${h}px` }}
                      ></div>
                    ))}
                 </div>
              </div>
            )}

            {feedbackStatus === 'error' && (
               <div className="flex items-center gap-3 text-red-500 bg-red-50 px-6 py-4 rounded-2xl border border-red-200 animate-fade-in shadow-md">
                  <AlertCircle className="w-6 h-6" />
                  <span className="font-black text-sm uppercase">Hệ thống không nghe rõ. Thử lại!</span>
               </div>
            )}

            {(feedbackStatus === 'success' || feedbackStatus === 'analyzing') && transcript && (
               <div className="w-full max-w-xl animate-fade-in">
                  <div className="flex flex-col md:flex-row items-center gap-10">
                      <div className="relative w-32 h-32 flex-shrink-0">
                         <svg className="w-full h-full transform -rotate-90">
                           <circle cx="64" cy="64" r="54" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                           <circle 
                             cx="64" cy="64" r="54" 
                             stroke={score && score >= 80 ? "#22c55e" : score && score >= 50 ? "#f97316" : "#ef4444"} 
                             strokeWidth="12" 
                             fill="none" 
                             strokeDasharray="339.29"
                             strokeDashoffset={339.29 - ((score || 0) / 100 * 339.29)}
                             className="transition-all duration-1000 ease-out"
                           />
                         </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {score !== null ? (
                                <>
                                  <span className="text-4xl font-black text-slate-800">{score}</span>
                                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Điểm</span>
                                </>
                            ) : (
                                <RefreshCcw className="w-10 h-10 text-blue-500 animate-spin" />
                            )}
                         </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Kết quả nhận diện:</div>
                          <div className="text-3xl font-black text-slate-800 mb-4">"{transcript}"</div>
                          {score !== null && (
                            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black shadow-md border ${getScoreColor(score)}`}>
                               {score >= 80 ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                               {getFeedbackMessage(score).toUpperCase()}
                            </div>
                          )}
                      </div>
                  </div>
               </div>
            )}
         </div>

         <div className="p-8 bg-white border-t border-slate-100 flex justify-center items-center relative z-10">
            <div className="relative">
               {isRecording && (
                 <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
               )}
               <button
                 onClick={isRecording ? stopRecording : startRecording}
                 className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${
                    isRecording 
                    ? 'bg-red-500 text-white shadow-red-200' 
                    : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
                 }`}
               >
                 {isRecording ? (
                   <div className="w-12 h-12 bg-white rounded-xl"></div>
                 ) : (
                   <Mic className="w-14 h-14" />
                 )}
               </button>
            </div>
         </div>
      </div>

      {/* Stats Sidebar (Matches Screenshot 3) */}
      <div className="hidden lg:flex w-72 flex-col gap-6">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
               <BarChart3 className="w-5 h-5 text-blue-600" />
               Thống kê phiên
            </h3>
            <div className="space-y-8">
               <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">ĐÃ LUYỆN TẬP</span>
                    <span className="text-lg font-black text-slate-800">{practicedInSession.size}/{activeTopic.phrases.length}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 shadow-inner overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-700 shadow-md" 
                      style={{ width: `${(practicedInSession.size / activeTopic.phrases.length) * 100}%` }}
                    ></div>
                  </div>
               </div>
               
               <div className="pt-8 border-t border-slate-100">
                  <div className="text-[11px] text-slate-400 uppercase font-black tracking-widest mb-1">ĐIỂM TRUNG BÌNH (PHIÊN)</div>
                  <div className="text-5xl font-black text-blue-600 tracking-tighter">
                    {score ? score : <span className="text-slate-200">-</span>}
                  </div>
               </div>
            </div>
         </div>

         {/* Overall History Tracker */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
            <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
               <History className="w-5 h-5 text-emerald-600" />
               Lịch sử gần đây
            </h3>
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
               {Object.entries(practiceHistory).slice(0, 15).map(([id, item]) => {
                  const hist = item as WordHistory;
                  const vocab = vocabularyList.find(v => v.id === id);
                  if (!vocab) return null;
                  const avg = Math.round(hist.totalScore / hist.totalAttempts);
                  return (
                    <div key={id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 group hover:border-blue-300 transition-colors">
                       <div className="flex justify-between items-center mb-1.5">
                          <span className="text-base font-bold text-slate-800">{vocab.char}</span>
                          <span className={`text-xs font-black ${avg >= 80 ? 'text-green-600' : 'text-orange-500'}`}>{avg}Đ</span>
                       </div>
                       <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase">
                          <span>{hist.totalAttempts} TẬP</span>
                          <span className="text-blue-500">{hist.correctCount} ĐẠT</span>
                       </div>
                    </div>
                  );
               })}
               {Object.keys(practiceHistory).length === 0 && (
                 <div className="py-12 text-center">
                    <History className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-xs text-slate-400 italic font-medium">Chưa có dữ liệu luyện tập</p>
                 </div>
               )}
            </div>
         </div>

         <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
               <Star className="w-24 h-24" />
            </div>
            <div className="relative z-10">
               <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                  <Zap className="w-7 h-7 text-yellow-300" />
               </div>
               <h3 className="font-black text-xl mb-3 uppercase tracking-tight">Mẹo phát âm</h3>
               <p className="text-blue-100 text-sm leading-relaxed font-bold italic">
                  "Hãy nghe mẫu và nhại lại đúng cao độ của các thanh điệu trước khi nhấn mic để đạt điểm tối đa!"
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

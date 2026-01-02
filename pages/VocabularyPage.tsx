
import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Volume2, Book, Layers, Check, X, RotateCcw, Filter, Brain, Clock, Sparkles, Plus, Play, Info } from 'lucide-react';
import { vocabularyList as staticVocabularyList } from '../data/vocabulary';
import { Vocabulary } from '../types';

type ViewMode = 'dictionary' | 'flashcard' | 'session-start';
type FlashcardState = 'front' | 'back';

export const VocabularyPage: React.FC = () => {
  const { searchQuery, setSearchQuery, customVocabulary, addVocabulary, vocabProgress, updateVocabSRS } = useApp();
  const [viewMode, setViewMode] = useState<ViewMode>('dictionary');
  const [selectedLevel, setSelectedLevel] = useState<string>('HSK 3 - 1'); 
  
  const [queue, setQueue] = useState<Vocabulary[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardSide, setCardSide] = useState<FlashcardState>('front');
  
  const [learnedSet, setLearnedSet] = useState<Set<string>>(new Set());
  const [forgotCount, setForgotCount] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVocabForm, setNewVocabForm] = useState<Partial<Vocabulary>>({
    char: '', pinyin: '', meaning: '', level: 'Tự tạo',
    example: '', examplePinyin: '', exampleMeaning: ''
  });

  const allVocabulary = useMemo(() => [...customVocabulary, ...staticVocabularyList], [customVocabulary]);

  const dueCount = useMemo(() => {
    const now = Date.now();
    return allVocabulary.filter(v => vocabProgress[v.id] && vocabProgress[v.id].nextReview <= now).length;
  }, [allVocabulary, vocabProgress]);

  const newCount = useMemo(() => {
    return allVocabulary.filter(v => !vocabProgress[v.id]).length;
  }, [allVocabulary, vocabProgress]);

  const normalizeLevel = (lvl: string) => lvl.replace(/\s/g, '').toUpperCase();

  const isHSK3Part1 = (v: Vocabulary) => {
    if (normalizeLevel(v.level) !== 'HSK3' && normalizeLevel(v.level) !== 'HSK3-1') return false;
    const idNum = parseInt(v.id.split('-').pop() || '0');
    return idNum >= 1 && idNum <= 507;
  };

  const isHSK3Part2 = (v: Vocabulary) => {
    if (normalizeLevel(v.level) !== 'HSK3' && normalizeLevel(v.level) !== 'HSK3-2') return false;
    const idNum = parseInt(v.id.split('-').pop() || '0');
    return idNum >= 508 && idNum <= 973;
  };

  const isHSK4Part1 = (v: Vocabulary) => {
    if (normalizeLevel(v.level) !== 'HSK4' && normalizeLevel(v.level) !== 'HSK4-1') return false;
    const idNum = parseInt(v.id.split('-').pop() || '0');
    return idNum >= 1 && idNum <= 512;
  };

  const isHSK4Part2 = (v: Vocabulary) => {
    if (normalizeLevel(v.level) !== 'HSK4' && normalizeLevel(v.level) !== 'HSK4-2') return false;
    const idNum = parseInt(v.id.split('-').pop() || '0');
    return idNum >= 513 && idNum <= 981;
  };

  const startSession = () => {
    const now = Date.now();
    const sessionSize = 10;

    const sessionQueue = allVocabulary.filter(v => {
      const p = vocabProgress[v.id];
      let matchesLevel = selectedLevel === 'All' || normalizeLevel(v.level) === normalizeLevel(selectedLevel);
      if (selectedLevel === 'HSK 3 - 1') matchesLevel = isHSK3Part1(v);
      if (selectedLevel === 'HSK 3 - 2') matchesLevel = isHSK3Part2(v);
      if (selectedLevel === 'HSK 4-1') matchesLevel = isHSK4Part1(v);
      if (selectedLevel === 'HSK 4-2') matchesLevel = isHSK4Part2(v);
      
      const isDue = p && p.nextReview <= now;
      const isNew = !p;
      return matchesLevel && (isDue || isNew);
    }).slice(0, sessionSize);

    sessionQueue.sort(() => Math.random() - 0.5);

    setQueue(sessionQueue);
    setCurrentCardIndex(0);
    setCardSide('front');
    setLearnedSet(new Set());
    setForgotCount(0);
    setIsSessionComplete(false);
    setViewMode('flashcard');
  };

  const currentCard = queue[currentCardIndex];
  const levels = ['All', 'Tự tạo', 'HSK 1', 'HSK 2', 'HSK 3 - 1', 'HSK 3 - 2', 'HSK 4-1', 'HSK 4-2', 'HSK 5-1', 'HSK 5-2', 'HSK 6', 'HSK 7-9'];

  const filteredDictionary = useMemo(() => {
    return allVocabulary.filter(item => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = (
        item.char.toLowerCase().includes(q) ||
        item.pinyin.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q)
      );
      
      let matchesLevel = selectedLevel === 'All' || normalizeLevel(item.level) === normalizeLevel(selectedLevel);
      if (selectedLevel === 'HSK 3 - 1') matchesLevel = isHSK3Part1(item);
      if (selectedLevel === 'HSK 3 - 2') matchesLevel = isHSK3Part2(item);
      if (selectedLevel === 'HSK 4-1') matchesLevel = isHSK4Part1(item);
      if (selectedLevel === 'HSK 4-2') matchesLevel = isHSK4Part2(item);

      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, selectedLevel, allVocabulary]);

  const speakText = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    window.speechSynthesis.speak(utterance);
  };

  const getLevelBadgeColor = (level: string) => {
    if (level.includes('HSK 1')) return 'bg-green-100 text-green-700';
    if (level.includes('HSK 2')) return 'bg-cyan-100 text-cyan-700';
    if (level.includes('HSK 3')) return 'bg-blue-100 text-blue-700';
    if (level.includes('HSK 4')) return 'bg-indigo-100 text-indigo-700';
    return 'bg-fuchsia-100 text-fuchsia-700';
  };

  const handleFlip = () => setCardSide(prev => prev === 'front' ? 'back' : 'front');

  const handleNext = (known: boolean) => {
    updateVocabSRS(currentCard.id, known);
    if (known) setLearnedSet(prev => new Set(prev).add(currentCard.id));
    else {
      setForgotCount(prev => prev + 1);
      setQueue(prev => [...prev, currentCard]); 
    }

    if (currentCardIndex < queue.length - 1) {
       setCardSide('front');
       setCurrentCardIndex(prev => prev + 1);
    } else {
       setIsSessionComplete(true);
    }
  };

  const getCardStatus = (id: string) => {
    const p = vocabProgress[id];
    if (!p) return { label: 'Từ mới', color: 'bg-blue-100 text-blue-700', icon: Sparkles };
    if (p.box === 0) return { label: 'Đang học', color: 'bg-orange-100 text-orange-700', icon: Brain };
    if (p.box >= 4) return { label: 'Thành thạo', color: 'bg-green-100 text-green-700', icon: Check };
    return { label: 'Ôn tập', color: 'bg-purple-100 text-purple-700', icon: Clock };
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVocabForm.char && newVocabForm.pinyin && newVocabForm.meaning) {
        addVocabulary({
            id: `custom-${Date.now()}`,
            char: newVocabForm.char, pinyin: newVocabForm.pinyin, meaning: newVocabForm.meaning,
            level: newVocabForm.level || 'Tự tạo',
            example: newVocabForm.example, examplePinyin: newVocabForm.examplePinyin, exampleMeaning: newVocabForm.exampleMeaning
        } as Vocabulary);
        setIsAddModalOpen(false);
        setNewVocabForm({ char: '', pinyin: '', meaning: '', level: 'Tự tạo', example: '', examplePinyin: '', exampleMeaning: '' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 gap-4">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('dictionary')}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
              viewMode === 'dictionary' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Book className="w-4 h-4" /> Từ điển
          </button>
          <button
            onClick={() => setViewMode('session-start')}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
              (viewMode === 'flashcard' || viewMode === 'session-start') ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" /> Flashcards (SRS)
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
            {viewMode === 'dictionary' && (
            <div className="relative flex-1 w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                type="text"
                placeholder="Tìm từ / câu / chữ Hán..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            )}
            
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
            >
                <Plus className="w-4 h-4" /> Thêm từ
            </button>
        </div>
      </div>

      {viewMode === 'dictionary' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-wrap items-center gap-2 px-1">
             {levels.map(level => (
                 <button
                     key={level}
                     onClick={() => setSelectedLevel(level)}
                     className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                         selectedLevel === level 
                         ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                         : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                     }`}
                 >
                     {level === 'All' ? 'Tất cả' : level}
                 </button>
             ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDictionary.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.id.includes('-') ? item.id.split('-').pop() : ''}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${getLevelBadgeColor(item.level)}`}>
                        {item.level}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {vocabProgress[item.id] && (
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded border ${getCardStatus(item.id).color}`}>Box {vocabProgress[item.id].box}</span>
                    )}
                    <button onClick={(e) => speakText(item.char, e)} className="p-1.5 rounded-full hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors">
                        <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-baseline gap-3 mb-1">
                   <div className="text-3xl font-bold text-slate-800">{item.char}</div>
                   <div className="text-lg font-medium text-blue-600 font-sans">{item.pinyin}</div>
                </div>
                <div className="text-base text-slate-700 font-medium mb-3 border-b border-slate-50 pb-2">{item.meaning}</div>
                {item.example && (
                  <div className="mt-auto bg-slate-50 p-3 rounded-lg border border-slate-100/50">
                    <div className="text-sm text-slate-800 font-medium leading-relaxed">{item.example.split(/[(（]/)[0]}</div>
                    {item.examplePinyin && <div className="text-sm text-blue-600 font-sans font-medium">{item.examplePinyin}</div>}
                    <div className="text-xs text-slate-500 italic mt-1">{item.exampleMeaning || item.example.match(/[(（](.*?)[)）]/)?.[1]}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'session-start' && (
          <div className="max-w-2xl mx-auto py-12 animate-fade-in">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                  <div className="bg-blue-600 p-10 text-white text-center">
                      <Layers className="w-16 h-16 mx-auto mb-6 opacity-80" />
                      <h2 className="text-3xl font-black mb-2">Học tập thông minh (SRS)</h2>
                      <p className="text-blue-100 font-medium">Hệ thống sẽ tự động chọn lọc từ vựng dựa trên trí nhớ của bạn.</p>
                  </div>
                  <div className="p-10 space-y-10">
                      <div className="grid grid-cols-2 gap-6">
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                              <div className="text-4xl font-black text-blue-600 mb-1">{dueCount}</div>
                              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cần ôn tập ngay</div>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                              <div className="text-4xl font-black text-emerald-600 mb-1">{newCount}</div>
                              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Từ mới sẵn sàng</div>
                          </div>
                      </div>

                      <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-600 uppercase mb-2">
                             <Filter className="w-4 h-4" /> Cấp độ mục tiêu
                          </div>
                          <div className="flex flex-wrap gap-2">
                              {levels.map(l => (
                                  <button
                                      key={l}
                                      onClick={() => setSelectedLevel(l)}
                                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${selectedLevel === l ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                                  >
                                      {l === 'All' ? 'Tất cả' : l}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <button 
                        onClick={startSession}
                        className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3 active:scale-95"
                      >
                          <Play className="w-6 h-6 fill-current" /> Bắt đầu phiên học
                      </button>

                      <div className="flex gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800 text-xs">
                          <Info className="w-5 h-5 flex-shrink-0" />
                          <p className="leading-relaxed">SRS (Spaced Repetition System) giúp bạn ghi nhớ từ vựng lâu dài bằng cách lặp lại vào các thời điểm tối ưu.</p>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {viewMode === 'flashcard' && !isSessionComplete && currentCard && (
        <div className="max-w-2xl mx-auto min-h-[600px] flex flex-col animate-fade-in">
           <div className="flex justify-between items-center text-sm text-slate-500 mb-4 px-4">
              <span className="flex items-center gap-2 font-bold text-blue-600">
                 <Brain className="w-4 h-4" /> {learnedSet.size} / {queue.length}
              </span>
              <button onClick={() => setViewMode('session-start')} className="text-xs hover:underline">Hủy phiên</button>
           </div>
           
           <div className="w-full bg-slate-200 rounded-full h-2 mb-6 shadow-inner">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-700 shadow-sm" style={{ width: `${(currentCardIndex / queue.length) * 100}%` }}></div>
           </div>

           <div className="flex-1 relative perspective-1000 group cursor-pointer" onClick={handleFlip}>
              <div className={`w-full h-[480px] relative preserve-3d transition-transform duration-500 ease-in-out ${cardSide === 'back' ? 'rotate-y-180' : ''} shadow-2xl rounded-3xl overflow-hidden border-2 border-slate-100`}>
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 backface-hidden bg-white flex flex-col items-center justify-center p-8 text-center">
                      <div className="absolute top-6 right-6">
                         {(() => {
                           const status = getCardStatus(currentCard.id);
                           const StatusIcon = status.icon;
                           return (
                             <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${status.color} shadow-sm border border-current/10`}>
                                <StatusIcon className="w-4 h-4" /> {status.label}
                             </span>
                           )
                         })()}
                      </div>
                      <div className="text-6xl font-black text-blue-700 mb-6 font-sans drop-shadow-sm">{currentCard.pinyin}</div>
                      <div className="text-3xl font-bold text-slate-800 leading-relaxed">{currentCard.meaning}</div>
                      <div className="text-xs text-slate-300 font-black uppercase tracking-[0.2em] mt-16 animate-pulse">Chạm để lật</div>
                  </div>

                  {/* BACK SIDE (Refined to match Screenshot 1) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#f8fafc] flex flex-col items-center justify-center p-8 text-center border-4 border-blue-100">
                      <div className="text-9xl font-black text-slate-800 mb-12 font-sans">{currentCard.char}</div>
                      
                      {currentCard.example && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full max-w-md text-left relative overflow-hidden group/example">
                            {/* Blue Volume Icon - Match Screenshot 1 */}
                            <button 
                              onClick={(e) => speakText(currentCard.example || '', e)}
                              className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-lg shadow hover:scale-110 transition-all z-20"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>

                            <div className="pr-10">
                              <div className="text-lg text-slate-800 font-bold mb-1 leading-tight">{currentCard.example.split(/[(（]/)[0]}</div>
                              {/* Blue Pinyin - Match Screenshot 1 */}
                              {currentCard.examplePinyin && <div className="text-sm text-blue-600 font-sans font-semibold mb-3">{currentCard.examplePinyin}</div>}
                              {/* Italic Gray Meaning - Match Screenshot 1 */}
                              <div className="text-sm text-slate-500 italic border-t border-slate-100 pt-3">
                                {currentCard.exampleMeaning || currentCard.example.match(/[(（](.*?)[)）]/)?.[1] || "Câu ví dụ cho từ vựng đang học"}
                              </div>
                            </div>
                        </div>
                      )}
                  </div>
              </div>
           </div>

           <div className="mt-10 grid grid-cols-2 gap-6 px-4 pb-12">
              <button 
                 onClick={() => handleNext(false)}
                 className="py-5 rounded-2xl border-2 border-red-200 bg-white text-red-600 font-black text-lg hover:bg-red-50 hover:border-red-300 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
              >
                  <X className="w-7 h-7" /> Chưa thuộc
              </button>
              <button 
                 onClick={() => handleNext(true)}
                 className="py-5 rounded-2xl bg-blue-600 text-white font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                  <Check className="w-7 h-7" /> Đã thuộc
              </button>
           </div>
        </div>
      )}

      {viewMode === 'flashcard' && isSessionComplete && (
           <div className="max-w-2xl mx-auto py-12 animate-fade-in">
               <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-12 text-center">
                   <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600 shadow-sm animate-bounce">
                       <Check className="w-12 h-12" />
                   </div>
                   <h3 className="text-3xl font-black text-slate-800 mb-3">Tuyệt vời!</h3>
                   <p className="text-slate-500 font-medium mb-10">Bạn đã hoàn thành phiên học hôm nay. Não bộ của bạn đang ghi nhớ rất tốt.</p>
                   
                   <div className="grid grid-cols-2 gap-8 mb-12">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <div className="text-4xl font-black text-blue-600">{learnedSet.size}</div>
                          <div className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-widest">Từ đã thuộc</div>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <div className="text-4xl font-black text-red-500">{forgotCount}</div>
                          <div className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-widest">Lần quên</div>
                      </div>
                   </div>
                   
                   <div className="flex gap-4">
                     <button onClick={() => setViewMode('dictionary')} className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">Quay lại từ điển</button>
                     <button onClick={startSession} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all inline-flex items-center justify-center gap-2"><RotateCcw className="w-5 h-5" /> Tiếp tục học</button>
                   </div>
               </div>
           </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Plus className="w-5 h-5 text-blue-600" /> Thêm từ vựng mới</h3>
                    <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-2 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Hán tự</label>
                            <input type="text" required value={newVocabForm.char} onChange={(e) => setNewVocabForm({...newVocabForm, char: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Pinyin</label>
                            <input type="text" required value={newVocabForm.pinyin} onChange={(e) => setNewVocabForm({...newVocabForm, pinyin: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Nghĩa tiếng Việt</label>
                        <input type="text" required value={newVocabForm.meaning} onChange={(e) => setNewVocabForm({...newVocabForm, meaning: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex justify-end gap-3 pt-6">
                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold">Hủy</button>
                        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100">Lưu từ vựng</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

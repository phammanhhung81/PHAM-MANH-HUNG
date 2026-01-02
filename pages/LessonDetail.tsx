
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, BookOpen, Headphones, Mic, PenTool, CheckCircle, GraduationCap, PlayCircle, Star, ArrowRight, Volume2, FileText, Calendar, Plus, Loader2 } from 'lucide-react';
import { StrokeVisualizer } from '../components/StrokeVisualizer';
import { getStrokeData } from '../data/strokeData';
import { writingRules, RuleData } from '../data/rulesData';
import { pinyinRules } from '../data/pinyinRulesData';
import { fanYuyeSessions } from '../data/fanYuyeData';
import { sentenceBuildingData } from '../data/sentenceBuildingData';
import { sentenceBuildingData2 } from '../data/sentenceBuildingData2';
import { sentenceBuildingData3 } from '../data/sentenceBuildingData3';
import { RulePracticeModal, CharacterPracticeModal } from '../components/PracticeModals';
import { GoogleGenAI, Modality } from "@google/genai";

// Audio decoding helpers for Gemini raw PCM
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioDataRaw(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lessons, updateLessonProgress } = useApp();
  const lesson = lessons.find(l => l.id === id);
  const [activeTab, setActiveTab] = useState<string>(id === 'pinyin-1' ? 'theory' : 'vocab');
  const [isAudioLoading, setIsAudioLoading] = useState<string | null>(null);
  
  // State for writing tab
  const [selectedWritingChar, setSelectedWritingChar] = useState<string>("你");
  const [practicingRule, setPracticingRule] = useState<RuleData | null>(null);
  const [practicingChar, setPracticingChar] = useState<string | null>(null);

  if (!lesson) {
    return <div className="text-center py-20">Không tìm thấy bài học</div>;
  }

  const handleCompleteActivity = () => {
    const newProgress = Math.min(100, lesson.progress + 25);
    updateLessonProgress(lesson.id, newProgress);
  };

  const speakText = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    window.speechSynthesis.speak(u);
  };

  const playPinyinAudio = async (text: string) => {
    if (isAudioLoading) return;
    setIsAudioLoading(text);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say slowly and clearly in standard Beijing Mandarin: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioBuffer = await decodeAudioDataRaw(decodeBase64(base64Audio), audioCtx, 24000, 1);
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        source.start();
      }
    } catch (error) {
      console.error("Gemini TTS Error, falling back to Browser Speech:", error);
      speakText(text);
    } finally {
      setIsAudioLoading(null);
    }
  };

  // --- SENTENCE BUILDING LESSON (Self Study Vol 1, 2 & 3) ---
  if (id === 'self-study-sentence-1' || id === 'self-study-sentence-2' || id === 'self-study-sentence-3') {
    const data = id === 'self-study-sentence-1' ? sentenceBuildingData : 
                 id === 'self-study-sentence-2' ? sentenceBuildingData2 :
                 sentenceBuildingData3;
    
    return (
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-10">
        <div className="flex items-center space-x-4 mb-6">
          <button 
            onClick={() => navigate('/lessons')}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{lesson.title}</h2>
            <div className="flex items-center space-x-3 text-sm text-slate-500">
               <span>Tiến độ: {lesson.progress}%</span>
               <div className="w-24 bg-slate-200 rounded-full h-1.5">
                 <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${lesson.progress}%` }}></div>
               </div>
            </div>
          </div>
          <div className="flex-1"></div>
          {lesson.progress < 100 && (
            <button 
              onClick={handleCompleteActivity}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Hoàn thành bài học
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-12">
           {data.map((session) => (
             <div key={session.id} className="space-y-6">
                <h3 className="text-xl font-bold text-blue-800 border-l-4 border-blue-600 pl-4 uppercase bg-blue-50 py-2 rounded-r-lg">
                   {session.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {session.flows.map((flow, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 relative overflow-hidden group hover:shadow-md transition-all">
                       <div className="absolute top-0 right-0 p-2 opacity-10 font-black text-6xl text-slate-300 select-none -z-0">
                         {idx + 1}
                       </div>
                       <div className="space-y-4 relative z-10">
                          {flow.steps.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-3">
                               {sIdx > 0 && (
                                 <div className="flex flex-col items-center justify-center">
                                    <Plus className="w-4 h-4 text-blue-300" />
                                 </div>
                               )}
                               <div className={`flex-1 p-3 rounded-lg border ${sIdx === flow.steps.length - 1 ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-slate-50 border-slate-100'}`}>
                                  <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{step.type || 'Từ'}</span>
                                  </div>
                                  <div className="font-bold text-lg text-slate-800 leading-tight mb-1">{step.cn}</div>
                                  <div className="text-sm text-blue-600 font-sans mb-0.5 flex items-center gap-2">
                                    {step.py}
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        speakText(step.cn);
                                      }}
                                      className="p-1 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                      title="Nghe phát âm"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <div className="text-xs text-slate-500 italic">{step.vn}</div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  // --- FAN YUYE LESSON (34 Sessions) ---
  if (id === 'fan-yuye') {
    return (
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-10">
        <div className="flex items-center space-x-4 mb-6">
          <button 
            onClick={() => navigate('/lessons')}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{lesson.title}</h2>
            <div className="flex items-center space-x-3 text-sm text-slate-500">
               <a href={lesson.subtitle} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-md block">
                 {lesson.subtitle}
               </a>
            </div>
          </div>
          <div className="flex-1"></div>
          {lesson.progress < 100 && (
            <button 
              onClick={handleCompleteActivity}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Hoàn thành bài học
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {fanYuyeSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center justify-between">
                <h3 className="font-bold text-blue-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  {session.title}
                </h3>
                <span className="text-xs font-semibold text-blue-600 bg-white px-2 py-1 rounded border border-blue-200">
                  Buổi {session.id}
                </span>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {session.content.map((line, idx) => (
                    <li key={idx} className="text-slate-700 text-sm leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- WRITING LESSON (7 Rules) ---
  if (id === 'writing-1') {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <button 
            onClick={() => navigate('/lessons')}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{lesson.title}</h2>
            <div className="flex items-center space-x-3 text-sm text-slate-500">
               <span>Tiến độ: {lesson.progress}%</span>
               <div className="w-24 bg-slate-200 rounded-full h-1.5">
                 <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${lesson.progress}%` }}></div>
               </div>
            </div>
          </div>
          <div className="flex-1"></div>
          {lesson.progress < 100 && (
            <button 
              onClick={handleCompleteActivity}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Hoàn thành bài học
            </button>
          )}
        </div>

        {/* 7 Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in pb-10">
           {writingRules.map((rule) => {
             const Icon = rule.icon;
             const bgClass = `bg-${rule.color}-50`;
             const borderClass = `border-${rule.color}-100`;
             const textClass = `text-${rule.color}-900`;
             const iconBgClass = `bg-${rule.color}-100`;
             const iconColorClass = `text-${rule.color}-600`;
             const numColorClass = `text-${rule.color}-600`;
             const hoverBorderClass = `hover:border-${rule.color}-300`;
             
             return (
               <div 
                 key={rule.id}
                 onClick={() => {
                    if (rule.data) {
                      setPracticingRule(rule.data);
                    }
                 }}
                 className={`${bgClass} p-6 rounded-2xl border-2 ${borderClass} ${hoverBorderClass} flex flex-col relative overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer ${rule.id === 7 ? 'md:col-span-2' : ''}`}
               >
                   {/* Background Number */}
                   <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none select-none">
                      <span className={`text-9xl font-bold ${numColorClass}`}>{rule.id}</span>
                   </div>

                   {/* Header with Animated Icon */}
                   <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className={`w-12 h-12 ${iconBgClass} rounded-xl flex items-center justify-center ${iconColorClass} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                         <Icon className={`w-7 h-7 transition-transform duration-500 ${rule.animation}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${textClass}`}>{rule.title}</h3>
                        <div className="text-xs font-medium opacity-60 uppercase tracking-wider mt-0.5">Quy tắc {rule.id}</div>
                      </div>
                   </div>
                   
                   {/* Description */}
                   <p className={`${textClass} opacity-80 mb-6 text-sm relative z-10 font-medium leading-relaxed min-h-[40px]`}>
                      {rule.desc}
                   </p>

                   {/* Examples Visual */}
                   <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50 relative z-10 mt-auto group-hover:bg-white transition-colors">
                      <div className="flex flex-wrap gap-4 items-center justify-center">
                          {rule.examples.map((char, i) => (
                            <div 
                                key={i} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPracticingChar(char);
                                }}
                                className="text-center group/char relative cursor-pointer"
                            >
                               <div className="text-4xl font-sans text-slate-700 mb-1 group-hover/char:text-blue-600 group-hover/char:scale-110 transition-all duration-300 relative z-10">
                                   {char}
                               </div>
                               <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/char:opacity-100 transition-opacity text-[10px] font-bold text-blue-600 whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded shadow-sm border border-blue-100 pointer-events-none">
                                   Tập viết
                               </div>
                            </div>
                          ))}
                      </div>
                      
                      {/* Hint */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-[10px] text-slate-400 font-medium">
                           <PlayCircle className="w-3 h-3 mr-1" />
                           Chọn chữ để luyện
                      </div>
                   </div>
               </div>
             );
           })}
        </div>

        {/* Modals */}
        {practicingRule && (
          <RulePracticeModal
            data={practicingRule}
            onClose={() => setPracticingRule(null)}
          />
        )}

        {practicingChar && (
          <CharacterPracticeModal
            char={practicingChar}
            onClose={() => setPracticingChar(null)}
          />
        )}
      </div>
    );
  }

  // --- PINYIN LESSON TABS ---
  const isPinyinLesson = id === 'pinyin-1';
  const tabs = isPinyinLesson 
    ? [
        { id: 'theory', label: 'Lý thuyết & Bảng chữ cái', icon: GraduationCap },
        { id: 'rules', label: '10 Quy tắc biến điệu', icon: Star },
        { id: 'practice', label: 'Luyện tập', icon: Mic },
      ]
    : [
        { id: 'vocab', label: 'Từ vựng', icon: BookOpen },
        { id: 'listening', label: 'Nghe hiểu', icon: Headphones },
        { id: 'speaking', label: 'Luyện nói', icon: Mic },
        { id: 'writing', label: 'Viết Hán tự', icon: PenTool },
      ];

  const writingChars = [
     { char: "你", pinyin: "nǐ", desc: "Đại từ nhân xưng ngôi thứ 2" },
     { char: "好", pinyin: "hǎo", desc: "Tốt, đẹp, hay" },
     { char: "谢", pinyin: "xiè", desc: "Cảm ơn" }
  ];

  const currentStrokeData = getStrokeData(selectedWritingChar);

  const PinyinVowelTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse bg-white rounded-lg shadow-sm">
        <thead className="bg-blue-50 text-blue-900">
          <tr>
            <th className="p-3 border border-blue-100">Pinyin</th>
            <th className="p-3 border border-blue-100">VN</th>
            <th className="p-3 border border-blue-100">Pinyin</th>
            <th className="p-3 border border-blue-100">VN</th>
            <th className="p-3 border border-blue-100">Pinyin</th>
            <th className="p-3 border border-blue-100">VN</th>
            <th className="p-3 border border-blue-100">Pinyin</th>
            <th className="p-3 border border-blue-100">VN</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['a', 'a', 'o', 'ô', 'e', 'ưa', '-i', 'ư'],
            ['e', 'dia', 'er', 'ơr', 'ai', 'ai', 'ei', 'ây'],
            ['ao', 'ao', 'ou', 'âu', 'an', 'an', 'en', 'ân'],
            ['ang', 'ang', 'eng', 'âng', 'ong', 'ung', 'i', 'i'],
            ['ia', 'i-a', 'iao', 'ieo', 'ie', 'ia', 'iu', 'iêu'],
            ['ian', 'ien', 'in', 'in', 'iang', 'iang', 'ing', 'ing'],
            ['iong', 'iung', 'u', 'u', 'ua', 'u-a (loa)', 'uo', 'ua (chua)'],
            ['uai', 'oai', 'ui', 'uây', 'uan', 'uan', 'un', 'uân'],
            ['uang', 'uang', 'ü', 'duy', 'üe', 'duê', 'üan', 'doen'],
            ['ün', 'duyn', '', '', '', '', '', '']
          ].map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {row.map((cell, cIdx) => (
                <td 
                  key={cIdx} 
                  className={`p-3 border border-slate-100 ${cIdx % 2 !== 0 ? 'text-slate-500 italic' : 'font-bold text-blue-800 cursor-pointer hover:bg-blue-100 transition-colors'}`}
                  onClick={() => {
                    if (cIdx % 2 === 0 && cell) playPinyinAudio(cell);
                  }}
                  title={cIdx % 2 === 0 ? "Nhấn để nghe giọng Bắc Kinh" : undefined}
                >
                  <div className="flex items-center justify-between">
                    {cell}
                    {cIdx % 2 === 0 && cell && isAudioLoading === cell && (
                      <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const PinyinConsonantTable = () => (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-sm text-left border-collapse bg-white rounded-lg shadow-sm">
        <thead className="bg-indigo-50 text-indigo-900">
          <tr>
            <th className="p-3 border border-indigo-100">Phụ âm</th>
            <th className="p-3 border border-indigo-100">Cách đọc</th>
            <th className="p-3 border border-indigo-100">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {[
            { py: 'b', vn: 'pua', note: '' }, { py: 'd', vn: 'tưa', note: '' }, { py: 'g', vn: 'cưa', note: '' },
            { py: 'q', vn: 'tri', note: 'bật hơi' }, { py: 'r', vn: 'rư', note: 'uốn lưỡi' }, { py: 'zh', vn: 'trư', note: 'uốn lưỡi' },
            { py: 'p', vn: 'phua', note: 'bật hơi' }, { py: 't', vn: 'thưa', note: '' }, { py: 'k', vn: 'khưa', note: '' },
            { py: 'x', vn: 'xi', note: '' }, { py: 'z', vn: 'chzư', note: '' }, { py: 'ch', vn: 'chu', note: 'bật hơi' },
            { py: 'm', vn: 'mưa', note: '' }, { py: 'n', vn: 'nưa', note: '' }, { py: 'h', vn: 'hưa', note: '' },
            { py: 'y', vn: 'y', note: '' }, { py: 'c', vn: 'chu', note: 'đẩy lưỡi' }, { py: 'sh', vn: 'xư', note: 'uốn lưỡi' },
            { py: 'f', vn: 'phưa', note: '' }, { py: 'l', vn: 'lưa', note: '' }, { py: 'j', vn: 'chi', note: '' },
            { py: 'w', vn: 'u', note: '' }, { py: 's', vn: 'sư', note: '' }
          ].map((item, idx) => (
            <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-indigo-50/30">
              <td 
                className="p-3 font-bold text-indigo-800 text-lg border-r border-slate-100 cursor-pointer hover:text-indigo-600 flex items-center justify-between"
                onClick={() => playPinyinAudio(item.py)}
                title="Nhấn để nghe giọng Bắc Kinh"
              >
                <div className="flex items-center gap-2">
                    {item.py}
                    {isAudioLoading === item.py && <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />}
                </div>
                <Volume2 className="w-3 h-3 opacity-20" />
              </td>
              <td className="p-3 text-slate-700 italic border-r border-slate-100">{item.vn}</td>
              <td className="p-3 text-slate-500 text-xs">{item.note && <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{item.note}</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={() => navigate('/lessons')}
          className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{lesson.title}</h2>
          <div className="flex items-center space-x-3 text-sm text-slate-500">
             <span>Tiến độ: {lesson.progress}%</span>
             <div className="w-24 bg-slate-200 rounded-full h-1.5">
               <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${lesson.progress}%` }}></div>
             </div>
          </div>
        </div>
        <div className="flex-1"></div>
        {lesson.progress < 100 ? (
          <button 
            onClick={handleCompleteActivity}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Hoàn thành phần này
          </button>
        ) : (
           <span className="text-green-600 font-bold flex items-center bg-green-50 px-3 py-1 rounded-lg">
             <CheckCircle className="w-5 h-5 mr-2" />
             Đã hoàn thành
           </span>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-20 z-30">
        <div className="flex border-b border-slate-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center space-x-2 transition-colors relative ${
                activeTab === tab.id 
                  ? 'text-blue-600 bg-blue-50/50' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8 min-h-[400px]">
          {/* --- PINYIN LESSON CONTENT --- */}
          {isPinyinLesson && activeTab === 'theory' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-2">1</span>
                  Bảng Nguyên Âm (Nhấn vào Pinyin để nghe giọng Bắc Kinh)
                </h3>
                <PinyinVowelTable />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm mr-2">2</span>
                  Bảng Phụ Âm (Nhấn vào Phụ âm để nghe giọng Bắc Kinh)
                </h3>
                <PinyinConsonantTable />
              </div>
            </div>
          )}

          {isPinyinLesson && activeTab === 'rules' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in pb-10">
                {pinyinRules.map((rule) => {
                  const bgClass = `bg-${rule.color}-50`;
                  const borderClass = `border-${rule.color}-100`;
                  const textClass = `text-${rule.color}-800`;
                  const headingClass = `text-${rule.color}-900`;
                  const tagClass = `bg-${rule.color}-100 text-${rule.color}-700`;

                  return (
                    <div key={rule.id} className={`${bgClass} rounded-2xl border-2 ${borderClass} overflow-hidden shadow-sm hover:shadow-md transition-all`}>
                        <div className="p-5 border-b border-white/50">
                           <div className="flex justify-between items-start mb-2">
                              <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${tagClass}`}>
                                Quy tắc {rule.id}
                              </span>
                           </div>
                           <h3 className={`text-lg font-bold ${headingClass} mb-1`}>{rule.title}</h3>
                           <p className={`text-sm ${textClass} opacity-90 leading-relaxed`}>{rule.description}</p>
                        </div>
                        
                        <div className="p-5 space-y-4 bg-white/60">
                           {rule.cases.map((c, idx) => (
                             <div key={idx} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between text-sm mb-2">
                                   <div className="font-semibold text-slate-700">{c.condition}</div>
                                   <ArrowRight className="w-4 h-4 text-slate-300" />
                                   <div className={`font-bold ${headingClass}`}>{c.result}</div>
                                </div>
                                
                                {c.diagram && (
                                  <div className="text-center bg-slate-50 py-1.5 rounded-lg text-xs font-mono text-slate-500 mb-2 border border-slate-100">
                                     {c.diagram}
                                  </div>
                                )}

                                {(c.example || c.examplePinyin) && (
                                  <div className="flex items-center gap-2 text-xs border-t border-slate-50 pt-2 mt-1">
                                     <span className="text-slate-400 font-medium">Ví dụ:</span>
                                     <span className="text-slate-700">{c.example}</span>
                                     {c.examplePinyin && <span className={`font-bold ${textClass}`}>/ {c.examplePinyin} /</span>}
                                     <button onClick={() => playPinyinAudio(c.example || '')} className="ml-auto text-slate-400 hover:text-blue-600"><Volume2 className="w-3 h-3" /></button>
                                  </div>
                                )}
                             </div>
                           ))}
                        </div>
                    </div>
                  );
                })}
             </div>
          )}

          {isPinyinLesson && activeTab === 'practice' && (
             <div className="max-w-3xl mx-auto animate-fade-in space-y-8">
                 {/* Tone Practice Section */}
                 <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                        <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mr-3">
                            <Mic className="w-5 h-5" />
                        </span>
                        Luyện tập Thanh điệu (4 Thanh)
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { tone: 1, char: 'mā', desc: 'Thanh 1: Cao - Bằng', visual: '→', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                            { tone: 2, char: 'má', desc: 'Thanh 2: Lên giọng', visual: '↗', color: 'bg-green-50 border-green-200 text-green-700' },
                            { tone: 3, char: 'mǎ', desc: 'Thanh 3: Xuống - Lên', visual: '↘↗', color: 'bg-orange-50 border-orange-200 text-orange-700' },
                            { tone: 4, char: 'mà', desc: 'Thanh 4: Xuống dứt khoát', visual: '↘', color: 'bg-red-50 border-red-200 text-red-700' },
                        ].map((item) => (
                            <div 
                                key={item.tone}
                                onClick={() => playPinyinAudio(item.char)}
                                className={`p-6 rounded-2xl border-2 ${item.color} cursor-pointer hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group relative overflow-hidden`}
                            >
                                <div className="text-4xl font-sans font-bold mb-2">{item.char}</div>
                                <div className="text-sm font-medium opacity-80">{item.desc}</div>
                                <div className="absolute top-2 right-3 opacity-20 text-4xl font-sans font-black">{item.visual}</div>
                                <div className="mt-2 p-2 rounded-full bg-white/50 text-current opacity-0 group-hover:opacity-100 transition-opacity">
                                    {isAudioLoading === item.char ? <Loader2 className="w-5 h-5 animate-spin" /> : <Volume2 className="w-5 h-5" />}
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Practice List */}
                 <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                        <span className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mr-3">
                            <BookOpen className="w-5 h-5" />
                        </span>
                        Ghép vần cơ bản
                    </h3>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-600">Pinyin</th>
                                    <th className="p-4 font-semibold text-slate-600">Thanh 1</th>
                                    <th className="p-4 font-semibold text-slate-600">Thanh 2</th>
                                    <th className="p-4 font-semibold text-slate-600">Thanh 3</th>
                                    <th className="p-4 font-semibold text-slate-600">Thanh 4</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { base: 'ba', t1: 'bā', t2: 'bá', t3: 'bǎ', t4: 'bà' },
                                    { base: 'ma', t1: 'mā', t2: 'má', t3: 'mǎ', t4: 'mà' },
                                    { base: 'shu', t1: 'shū', t2: 'shú', t3: 'shǔ', t4: 'shù' },
                                    { base: 'ni', t1: 'nī', t2: 'ní', t3: 'nǐ', t4: 'nì' },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="p-4 font-bold text-slate-400 font-mono">{row.base}</td>
                                        {[row.t1, row.t2, row.t3, row.t4].map((t, i) => (
                                            <td key={i} className="p-4">
                                                <button 
                                                    onClick={() => playPinyinAudio(t)}
                                                    className="px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all text-lg font-medium text-slate-700 flex items-center gap-2 group"
                                                >
                                                    {t}
                                                    <div className="opacity-0 group-hover:opacity-100 text-blue-500">
                                                       {isAudioLoading === t ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Volume2 className="w-3.5 h-3.5" />}
                                                    </div>
                                                </button>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>
             </div>
          )}

          {/* --- GENERIC LESSON CONTENT --- */}
          {!isPinyinLesson && activeTab === 'vocab' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-4">Từ vựng mới</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { char: '你好', pinyin: 'nǐ hǎo', meaning: 'Xin chào' },
                  { char: '谢谢', pinyin: 'xiè xie', meaning: 'Cảm ơn' },
                  { char: '再见', pinyin: 'zài jiàn', meaning: 'Tạm biệt' },
                  { char: '老师', pinyin: 'lǎo shī', meaning: 'Giáo viên' },
                ].map((word, idx) => (
                  <div key={idx} className="flex items-center p-4 border border-slate-100 rounded-lg hover:border-blue-200 transition-colors bg-slate-50">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl font-bold text-blue-800 shadow-sm">
                      {word.char}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-slate-800">{word.pinyin}</div>
                      <div className="text-sm text-slate-500">{word.meaning}</div>
                    </div>
                    <button 
                      onClick={() => playPinyinAudio(word.char)}
                      className="ml-auto p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                    >
                      {isAudioLoading === word.char ? <Loader2 className="w-5 h-5 animate-spin" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isPinyinLesson && activeTab === 'listening' && (
            <div className="text-center space-y-6 py-10">
               <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
                 <Headphones className="w-10 h-10" />
               </div>
               <h3 className="text-xl font-bold text-slate-800">Hội thoại bài học</h3>
            </div>
          )}

          {!isPinyinLesson && activeTab === 'speaking' && (
             <div className="flex flex-col items-center justify-center py-10 space-y-6">
                <div className="text-6xl font-sans text-slate-800">你好吗？</div>
                <div className="text-xl text-slate-500">Nǐ hǎo ma?</div>
                <button className="flex flex-col items-center space-y-2 group">
                   <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-600 transition-colors">
                      <Mic className="w-8 h-8 text-white" />
                   </div>
                   <span className="text-sm font-medium text-slate-500 group-hover:text-red-600">Nhấn để nói</span>
                </button>
             </div>
          )}

          {!isPinyinLesson && activeTab === 'writing' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Visualizer */}
              <div className="bg-white border-2 border-slate-100 rounded-2xl flex flex-col items-center justify-center min-h-[400px] p-8 shadow-sm">
                 {currentStrokeData ? (
                   <StrokeVisualizer strokeData={currentStrokeData} size={280} autoPlay={true} />
                 ) : (
                   <div className="flex flex-col items-center text-slate-300">
                     <span className="text-9xl font-sans mb-4">{selectedWritingChar}</span>
                     <p className="text-sm">Chưa có dữ liệu mô phỏng nét viết cho chữ này.</p>
                   </div>
                 )}
                 
                 <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {writingChars.map(w => (
                      <button 
                        key={w.char}
                        onClick={() => setSelectedWritingChar(w.char)}
                        className={`w-12 h-12 rounded-lg text-xl font-sans font-bold border-2 transition-all ${
                          selectedWritingChar === w.char 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                          : 'border-slate-100 text-slate-600 hover:border-blue-300'
                        }`}
                      >
                        {w.char}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Right Column: Info */}
              <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-xl text-slate-800 mb-2">
                      {writingChars.find(c => c.char === selectedWritingChar)?.char} 
                      <span className="text-slate-400 font-normal text-base ml-2">
                        {writingChars.find(c => c.char === selectedWritingChar)?.pinyin}
                      </span>
                    </h3>
                    <p className="text-slate-600">
                      {writingChars.find(c => c.char === selectedWritingChar)?.desc}
                    </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

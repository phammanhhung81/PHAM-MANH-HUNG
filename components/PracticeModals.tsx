
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StrokeVisualizer } from './StrokeVisualizer';
import { getStrokeData } from '../data/strokeData';
import { RuleData } from '../data/rulesData';
import { X, PenTool, Eraser, Check, Info, BookOpen, Brain, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

// --- Character Practice Modal ---
export const CharacterPracticeModal = ({ char, onClose }: { char: string; onClose: () => void }) => {
  const strokeData = useMemo(() => getStrokeData(char) || { char, paths: [] }, [char]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [showAnimation]);

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = (event as React.MouseEvent).clientX;
      clientY = (event as React.MouseEvent).clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) e.stopPropagation();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    if ('touches' in e) e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => setIsDrawing(false);
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-blue-600" />
            Luyện viết: {char}
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex flex-col items-center gap-4">
           <div className="flex bg-slate-100 p-1 rounded-lg mb-2">
              <button onClick={() => setShowAnimation(true)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${showAnimation ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Xem mẫu</button>
              <button onClick={() => setShowAnimation(false)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${!showAnimation ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Tự viết</button>
           </div>

           {showAnimation && strokeData.paths.length > 0 ? (
             <div className="w-[260px] h-[260px]">
                <StrokeVisualizer strokeData={strokeData} size={260} autoPlay={true} />
             </div>
           ) : (
             <div className="relative w-[260px] h-[260px] bg-white border-2 border-slate-800 shadow-sm select-none">
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute w-full h-full" style={{ backgroundImage: `linear-gradient(45deg, transparent 49.5%, #ef4444 49.5%, #ef4444 50.5%, transparent 50.5%), linear-gradient(-45deg, transparent 49.5%, #ef4444 49.5%, #ef4444 50.5%, transparent 50.5%)` }}></div>
                    <div className="absolute top-1/2 left-0 w-full h-px bg-red-500 border-t border-dashed border-red-500/50"></div>
                    <div className="absolute top-0 left-1/2 h-full w-px bg-red-500 border-l border-dashed border-red-500/50"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.1]">
                   <span className="text-[220px] font-sans leading-none select-none text-slate-900">{char}</span>
                </div>
                <canvas
                   ref={canvasRef}
                   className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
                   onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                   onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                />
             </div>
           )}
           
           {!showAnimation && (
              <button onClick={clearCanvas} className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200">
                 <Eraser className="w-3 h-3" /> Xóa
              </button>
           )}
        </div>
      </div>
    </div>
  );
};

// --- Writing Practice Modal (For Radicals) ---
export const WritingPracticeModal = ({ radical, onClose }: { radical: any; onClose: () => void }) => {
  const { char, pinyin, meaning, sinoViet } = radical;
  const strokeData = useMemo(() => getStrokeData(char) || { char, paths: [] }, [char]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [showAnimation]);

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = (event as React.MouseEvent).clientX;
      clientY = (event as React.MouseEvent).clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) e.stopPropagation();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    if ('touches' in e) e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => setIsDrawing(false);
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-start bg-slate-50">
          <div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-blue-600" />
                Luyện viết bộ: {char}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                 <span className="font-sans font-bold text-blue-700">{pinyin}</span> 
                 <span className="mx-1">•</span> 
                 {sinoViet && <span className="font-medium text-slate-700">{sinoViet}</span>}
                 {sinoViet && <span className="mx-1">•</span>}
                 <span>{meaning}</span>
              </p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex flex-col items-center gap-4">
           <div className="flex bg-slate-100 p-1 rounded-lg mb-2">
              <button onClick={() => setShowAnimation(true)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${showAnimation ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Xem mẫu</button>
              <button onClick={() => setShowAnimation(false)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${!showAnimation ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Tự viết</button>
           </div>

           {showAnimation && strokeData.paths.length > 0 ? (
             <div className="w-[260px] h-[260px]">
                <StrokeVisualizer strokeData={strokeData} size={260} autoPlay={true} />
             </div>
           ) : (
             <div className="relative w-[260px] h-[260px] bg-white border-2 border-slate-800 shadow-sm select-none">
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute w-full h-full" style={{ backgroundImage: `linear-gradient(45deg, transparent 49.5%, #ef4444 49.5%, #ef4444 50.5%, transparent 50.5%), linear-gradient(-45deg, transparent 49.5%, #ef4444 49.5%, #ef4444 50.5%, transparent 50.5%)` }}></div>
                    <div className="absolute top-1/2 left-0 w-full h-px bg-red-500 border-t border-dashed border-red-500/50"></div>
                    <div className="absolute top-0 left-1/2 h-full w-px bg-red-500 border-l border-dashed border-red-500/50"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.1]">
                   <span className="text-[220px] font-sans leading-none select-none text-slate-900">{char}</span>
                </div>
                <canvas
                   ref={canvasRef}
                   className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
                   onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                   onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                />
             </div>
           )}
           
           {!showAnimation && (
              <button onClick={clearCanvas} className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200">
                 <Eraser className="w-3 h-3" /> Xóa
              </button>
           )}
        </div>
      </div>
    </div>
  );
};

// --- Rule Practice Modal ---
export const RulePracticeModal = ({ data, onClose }: { data: RuleData; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz' | 'practice'>('learn');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // Canvas logic
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (activeTab === 'practice') {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
            ctx.strokeStyle = '#1e40af';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }
  }, [activeTab]);

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = (event as React.MouseEvent).clientX;
      clientY = (event as React.MouseEvent).clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) e.stopPropagation();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    if ('touches' in e) e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 h-[85vh] md:h-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                  Bài học {data.lesson_id}
                </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">{data.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-white px-6 pt-2">
            {[
                { id: 'learn', label: 'Lý thuyết', icon: BookOpen },
                { id: 'quiz', label: 'Trắc nghiệm', icon: Brain },
                { id: 'practice', label: 'Luyện tập', icon: PenTool },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id 
                        ? 'border-blue-600 text-blue-700' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-200'
                    }`}
                >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-0 bg-slate-50/50">
            {activeTab === 'learn' && (
                <div className="p-6 md:p-8 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-500" />
                            Giải thích quy tắc
                        </h4>
                        <p className="text-slate-600 leading-relaxed text-sm">{data.rule_description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Enhanced Visualizer Section */}
                         <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                             {data.visualization ? (
                                <StrokeVisualizer strokeData={data.visualization} />
                             ) : (
                                <>
                                  <div className="text-9xl font-serif text-slate-800 mb-4">{data.example_character}</div>
                                  <p className="text-center text-sm text-slate-500">{data.example_description}</p>
                                </>
                             )}
                         </div>

                         <div className="space-y-3">
                             <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Các bước thực hiện</h4>
                             {data.stroke_steps.map((step, idx) => (
                                 <div key={idx} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex gap-3">
                                     <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                         {idx + 1}
                                     </div>
                                     <p className="text-slate-600 text-sm">{step}</p>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
            )}

            {activeTab === 'quiz' && (
                <div className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-full max-w-lg space-y-6">
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Câu hỏi ôn tập</span>
                            <h3 className="text-xl font-bold text-slate-800">{data.quiz.question}</h3>
                        </div>

                        <div className="space-y-3">
                            {data.quiz.options.map((opt, idx) => {
                                const isSelected = selectedOption === idx;
                                const isCorrect = idx === data.quiz.correct_option;
                                const showResult = selectedOption !== null;
                                
                                let styleClass = "border-slate-200 hover:border-blue-300 hover:bg-slate-50";
                                if (showResult) {
                                    if (isSelected && isCorrect) styleClass = "bg-green-50 border-green-200 ring-1 ring-green-500";
                                    else if (isSelected && !isCorrect) styleClass = "bg-red-50 border-red-200 ring-1 ring-red-500";
                                    else if (isCorrect) styleClass = "bg-green-50 border-green-200"; // Show correct answer if wrong selected
                                    else styleClass = "opacity-50 border-slate-100";
                                }

                                return (
                                    <button
                                        key={idx}
                                        disabled={showResult}
                                        onClick={() => setSelectedOption(idx)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${styleClass}`}
                                    >
                                        <span className={`text-sm font-medium ${showResult && (isCorrect || isSelected) ? 'text-slate-800' : 'text-slate-600'}`}>
                                            {opt}
                                        </span>
                                        {showResult && isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                                        {showResult && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-red-500" />}
                                    </button>
                                );
                            })}
                        </div>

                        {selectedOption !== null && (
                            <div className={`p-4 rounded-xl flex gap-3 animate-in fade-in slide-in-from-bottom-2 ${
                                selectedOption === data.quiz.correct_option ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <div className="text-sm">
                                    <span className="font-bold block mb-1">
                                        {selectedOption === data.quiz.correct_option ? 'Chính xác!' : 'Chưa chính xác.'}
                                    </span>
                                    {data.quiz.explanation}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'practice' && (
                <div className="p-6 md:p-8 flex flex-col items-center">
                    <div className="relative w-[300px] h-[300px] bg-white border-2 border-slate-800 shadow-sm select-none mb-6">
                         {/* Grid Lines */}
                        <div className="absolute inset-0 pointer-events-none opacity-30">
                            <div className="absolute w-full h-full" 
                                style={{ backgroundImage: `linear-gradient(45deg, transparent 49.5%, #ef4444 49.5%, #ef4444 50.5%, transparent 50.5%), linear-gradient(-45deg, transparent 49.5%, #ef4444 49.5%, #ef4444 50.5%, transparent 50.5%)` }}>
                            </div>
                            <div className="absolute top-1/2 left-0 w-full h-px bg-red-500 border-t border-dashed border-red-500/50"></div>
                            <div className="absolute top-0 left-1/2 h-full w-px bg-red-500 border-l border-dashed border-red-500/50"></div>
                        </div>

                        {/* Guide Character */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15]">
                            <span className="text-[260px] font-serif leading-none select-none text-slate-900 font-normal mt-[-20px]">
                                {data.practice.canvas_settings.background_character}
                            </span>
                        </div>

                        {/* Canvas */}
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
                            style={{ width: '300px', height: '300px' }}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                    </div>
                    
                    <div className="max-w-md w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Hướng dẫn</div>
                        <p className="text-slate-700 text-sm mb-4">{data.practice.instructions}</p>
                        <button 
                            onClick={clearCanvas}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors"
                        >
                            <Eraser className="w-4 h-4" /> Xóa và viết lại
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
             {activeTab !== 'learn' && (
                 <button 
                    onClick={() => setActiveTab(activeTab === 'quiz' ? 'learn' : 'quiz')}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                 >
                    Quay lại
                 </button>
             )}
             {activeTab === 'learn' ? (
                 <button 
                    onClick={() => setActiveTab('quiz')}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 text-sm font-medium transition-colors flex items-center gap-2"
                 >
                    Làm bài tập <ArrowRight className="w-4 h-4" />
                 </button>
             ) : activeTab === 'quiz' ? (
                 <button 
                    onClick={() => setActiveTab('practice')}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 text-sm font-medium transition-colors flex items-center gap-2"
                 >
                    Luyện viết <PenTool className="w-4 h-4" />
                 </button>
             ) : (
                 <button 
                    onClick={onClose}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg shadow-green-200 text-sm font-medium transition-colors flex items-center gap-2"
                 >
                    Hoàn thành <Check className="w-4 h-4" />
                 </button>
             )}
        </div>
      </div>
    </div>
  );
};

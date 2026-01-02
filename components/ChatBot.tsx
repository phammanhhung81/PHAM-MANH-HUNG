
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Minus, Maximize2, User, Mic, MicOff, Loader, ChevronUp, Languages, Phone, PhoneOff } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý AI học tiếng Trung của bạn. Bạn cần giúp đỡ gì về từ vựng, ngữ pháp hay luyện tập hôm nay không?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechLang, setSpeechLang] = useState<'zh-CN' | 'vi-VN'>('zh-CN');
  const [showLangSelector, setShowLangSelector] = useState(false);
  
  // Resizing States
  const [dimensions, setDimensions] = useState({ width: 384, height: 550 }); // Default w-96 is 384px
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const resizeStartRef = useRef<{ x: number, y: number, w: number, h: number } | null>(null);

  // Live API States
  const [isLiveActive, setIsLiveActive] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Refs for Chat
  const aiRef = useRef<any>(null);
  const chatRef = useRef<any>(null);

  // Refs for Live API
  const liveSessionRef = useRef<any>(null);
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const micStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!aiRef.current) {
      aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatRef.current = aiRef.current.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: 'Bạn là một trợ lý ảo chuyên nghiệp giúp người Việt học tiếng Trung. Bạn có kiến thức sâu rộng về HSK, ngữ pháp tiếng Trung, cách viết chữ Hán và bộ thủ. Hãy trả lời thân thiện, ngắn gọn và có kèm phiên âm pinyin cho các từ tiếng Trung.',
        },
      });
    }
    return () => stopLiveSession();
  }, []);

  // Resize logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeStartRef.current) return;

      const deltaX = resizeStartRef.current.x - e.clientX;
      const deltaY = resizeStartRef.current.y - e.clientY;

      let newWidth = resizeStartRef.current.w;
      let newHeight = resizeStartRef.current.h;

      if (isResizing.includes('left')) newWidth = resizeStartRef.current.w + deltaX;
      if (isResizing.includes('top')) newHeight = resizeStartRef.current.h + deltaY;

      setDimensions({
        width: Math.max(320, Math.min(newWidth, window.innerWidth - 48)),
        height: Math.max(400, Math.min(newHeight, window.innerHeight - 48))
      });
    };

    const handleMouseUp = () => {
      setIsResizing(null);
      document.body.style.cursor = 'default';
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const startResizing = (direction: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(direction);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: dimensions.width,
      h: dimensions.height
    };
    
    if (direction === 'top') document.body.style.cursor = 'ns-resize';
    else if (direction === 'left') document.body.style.cursor = 'ew-resize';
    else if (direction === 'top-left') document.body.style.cursor = 'nwse-resize';
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isMinimized]);

  // --- Regular Chat Methods ---
  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: messageToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessageStream({ message: messageToSend });
      
      let botMessageText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of response) {
        botMessageText += chunk.text || '';
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: botMessageText };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, đã có lỗi xảy ra khi kết nối với máy chủ AI. Vui lòng thử lại sau.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng nhận diện giọng nói.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = speechLang; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // --- Live API Implementation ---
  const startLiveSession = async () => {
    if (isLiveActive) {
      stopLiveSession();
      return;
    }

    try {
      setIsLiveActive(true);
      setMessages(prev => [...prev, { role: 'model', text: '[Đang bật chế độ đàm thoại trực tiếp...]' }]);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextInRef.current = inputCtx;
      audioContextOutRef.current = outputCtx;
      nextStartTimeRef.current = 0;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: 'Bạn là một trợ lý học tiếng Trung thân thiện. Bạn đang trò chuyện trực tiếp qua giọng nói. Hãy trả lời ngắn gọn, tự nhiên bằng cả tiếng Trung và tiếng Việt.',
        },
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              // CRITICAL: Solely rely on sessionPromise resolves and then call `session.sendRealtimeInput`, do not add other condition checks.
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.addEventListener('ended', () => activeSourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              activeSourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => s.stop());
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Live error:', e);
            stopLiveSession();
          },
          onclose: () => {
            stopLiveSession();
          }
        }
      });

      liveSessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Could not start live session:', err);
      stopLiveSession();
      setMessages(prev => [...prev, { role: 'model', text: 'Không thể khởi động chế độ đàm thoại. Vui lòng kiểm tra quyền truy cập microphone.' }]);
    }
  };

  const stopLiveSession = () => {
    setIsLiveActive(false);
    if (liveSessionRef.current) {
      liveSessionRef.current.close();
      liveSessionRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextInRef.current) {
      audioContextInRef.current.close();
      audioContextInRef.current = null;
    }
    if (audioContextOutRef.current) {
      audioContextOutRef.current.close();
      audioContextOutRef.current = null;
    }
    activeSourcesRef.current.forEach(s => s.stop());
    activeSourcesRef.current.clear();
  };

  // Live API Helpers
  function createBlob(data: Float32Array) {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) int16[i] = data[i] * 32768;
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  function encode(bytes: Uint8Array) {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  const handleQuickHint = (hint: string) => {
    handleSend(hint);
  };

  function decode(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
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

  const QUICK_HINTS = [
    'HSK 1 có bao nhiêu từ?', 
    'Cách viết chữ "Học"', 
    'Ngữ pháp chữ "了"',
    'Bộ "Mộc" (木) nghĩa là gì?',
    'Giải thích Bài 1 Tập 3',
    '50 bộ thủ hay dùng nhất',
    'Phân biệt "想" và "要"',
    'Quy tắc viết chữ "国"',
    'Bộ thủ nào chỉ thời gian?'
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-green-700 transition-all transform hover:scale-110 z-[100] group"
      >
        <MessageSquare className="w-7 h-7 group-hover:hidden" />
        <Bot className="w-7 h-7 hidden group-hover:block animate-bounce" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl flex flex-col z-[100] border border-slate-200 transition-all duration-300 overflow-hidden ${
        isMinimized ? 'h-16 w-96' : ''
      }`}
      style={!isMinimized ? { width: dimensions.width, height: dimensions.height } : {}}
    >
      {/* Resizing Handles */}
      {!isMinimized && (
        <>
          {/* Top Handle */}
          <div 
            className="absolute top-0 left-0 right-0 h-1.5 cursor-ns-resize hover:bg-green-400/30 z-[120]" 
            onMouseDown={(e) => startResizing('top', e)}
          />
          {/* Left Handle */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-1.5 cursor-ew-resize hover:bg-green-400/30 z-[120]" 
            onMouseDown={(e) => startResizing('left', e)}
          />
          {/* Top-Left Handle */}
          <div 
            className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize hover:bg-green-400/50 z-[130]" 
            onMouseDown={(e) => startResizing('top-left', e)}
          />
        </>
      )}

      {/* Header */}
      <div className="bg-green-600 p-4 text-white flex items-center justify-between cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            {isLiveActive ? <Phone className="w-4 h-4 animate-pulse text-green-300" /> : <Bot className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-bold text-sm">AI Trợ Giảng</h3>
            {!isMinimized && <p className="text-[10px] text-green-100">{isLiveActive ? 'Live Conversation' : 'Online | gemini-3-pro'}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Conversational Voice Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); startLiveSession(); }}
            className={`p-1.5 rounded-lg transition-all flex items-center gap-1 ${
              isLiveActive ? 'bg-red-500 shadow-inner' : 'hover:bg-white/10'
            }`}
            title={isLiveActive ? "Tắt đàm thoại" : "Mở đàm thoại trực tiếp"}
          >
            {isLiveActive ? <PhoneOff className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${
                    msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-white text-green-600'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-green-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.text || (isLoading && idx === messages.length - 1 ? '...' : '')}</div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-4 py-2 border-t border-slate-100 bg-white flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_HINTS.map((hint, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickHint(hint)}
                className="whitespace-nowrap px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-medium hover:bg-green-50 hover:text-green-600 transition-colors border border-slate-200"
              >
                {hint}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100 bg-white relative">
            {/* Language Selector Dropdown */}
            {showLangSelector && (
              <div className="absolute bottom-full left-4 mb-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-[110] animate-fade-in min-w-[120px]">
                <button 
                  onClick={() => { setSpeechLang('vi-VN'); setShowLangSelector(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-slate-50 ${speechLang === 'vi-VN' ? 'text-green-600 bg-green-50' : 'text-slate-700'}`}
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-[10px] font-bold">VI</span>
                  Tiếng Việt
                </button>
                <div className="h-px bg-slate-100 mx-2"></div>
                <button 
                  onClick={() => { setSpeechLang('zh-CN'); setShowLangSelector(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-slate-50 ${speechLang === 'zh-CN' ? 'text-green-600 bg-green-50' : 'text-slate-700'}`}
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-[10px] font-bold">CN</span>
                  Tiếng Trung
                </button>
              </div>
            )}

            <div className={`flex gap-2 items-center bg-slate-100 p-1.5 rounded-xl transition-all ${isLiveActive ? 'opacity-50 pointer-events-none' : 'focus-within:ring-2 focus-within:ring-green-500 focus-within:bg-white'}`}>
              <div className="flex items-center">
                <button
                  onClick={() => setShowLangSelector(!showLangSelector)}
                  className="flex items-center gap-1 px-2 py-2 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors border-r border-slate-200 mr-1"
                  title="Chọn ngôn ngữ"
                >
                  <span className="text-[10px] font-black">{speechLang === 'zh-CN' ? 'CN' : 'VI'}</span>
                  <ChevronUp className={`w-3 h-3 transition-transform ${showLangSelector ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={startListening}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-slate-400 hover:bg-slate-200'
                  }`}
                  title="Nhập bằng giọng nói"
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isLiveActive ? "Chế độ rảnh tay đang bật..." : isListening ? "Đang nghe..." : "Nhập câu hỏi..."}
                disabled={isLiveActive}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 py-1"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading || isLiveActive}
                className={`p-2 rounded-lg transition-all ${
                  input.trim() && !isLoading && !isLiveActive
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
            {isLiveActive && (
              <div className="mt-2 text-center">
                <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest animate-pulse">Đang trong cuộc hội thoại...</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

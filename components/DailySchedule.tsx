
import React, { useState, useEffect, useRef } from 'react';
import { Bot, CheckCircle, Circle, X, Mic, Send, Loader, Plus, Trash2, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export const DailySchedule: React.FC = () => {
  const { schedule, toggleScheduleItem, addScheduleItem, deleteScheduleItem } = useApp();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTime, setNewTaskTime] = useState('');
  const [newTaskLabel, setNewTaskLabel] = useState('');
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '你好！我是你的中文助教。今天想聊什么？\n(Xin chào! Tôi là trợ lý tiếng Trung của bạn. Hôm nay bạn muốn nói chuyện gì?)', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatOpen]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTime || !newTaskLabel) return;
    
    addScheduleItem(newTaskTime, newTaskLabel);
    setNewTaskTime('');
    setNewTaskLabel('');
    setIsAddingTask(false);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate response
    setTimeout(() => {
        const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            text: '说得很好！我们可以 continue 练习。(Nói rất tốt! Chúng ta có thể tiếp tục luyện tập.)',
            sender: 'bot'
        };
        setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'zh-CN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    } else {
        alert('Trình duyệt của bạn không hỗ trợ tính năng này.');
    }
  };

  return (
    <>
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800">Lịch học hôm nay</h3>
        <button 
          onClick={() => setIsAddingTask(!isAddingTask)}
          className={`p-1.5 rounded-full transition-all ${isAddingTask ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
        >
          {isAddingTask ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>
      
      {isAddingTask && (
        <form onSubmit={handleAddTask} className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-fade-in">
           <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="VD: 14:00" 
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Tên nhiệm vụ..." 
                  value={newTaskLabel}
                  onChange={(e) => setNewTaskLabel(e.target.value)}
                  required
                  className="flex-[2] px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Thêm vào lịch
              </button>
           </div>
        </form>
      )}

      <div className="flex-1 space-y-6 relative overflow-y-auto pr-2 custom-scrollbar">
         {/* Timeline line */}
         <div className="absolute left-[3.5rem] top-2 bottom-2 w-0.5 bg-slate-100"></div>

        {schedule.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-center relative z-10 group transition-all ${item.completed ? 'opacity-50' : ''}`}
          >
            <div className="w-14 text-sm font-semibold text-slate-500">{item.time}</div>
            <div 
              className={`w-3 h-3 rounded-full border-2 border-white shadow-sm mx-4 transition-colors cursor-pointer ${item.completed ? 'bg-green-500' : 'bg-blue-500'}`}
              onClick={() => toggleScheduleItem(item.id)}
            ></div>
            <div className="flex-1 flex items-center justify-between min-w-0">
                <div 
                  className={`font-medium truncate cursor-pointer ${item.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}
                  onClick={() => toggleScheduleItem(item.id)}
                >
                    {item.task}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button 
                      onClick={() => deleteScheduleItem(item.id)}
                      className="p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                        <Circle 
                          className="w-5 h-5 text-slate-300 group-hover:text-blue-500 cursor-pointer" 
                          onClick={() => toggleScheduleItem(item.id)}
                        />
                    )}
                </div>
            </div>
          </div>
        ))}

        <div className="mt-8 pt-4 border-t border-dashed border-slate-200">
            <div 
                onClick={() => setIsChatOpen(true)}
                className="bg-indigo-50 rounded-lg p-3 border border-indigo-100 flex items-center gap-3 cursor-pointer hover:bg-indigo-100 transition-colors"
            >
                <div className="p-2 bg-indigo-100 rounded-full">
                    <Bot className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                    <div className="text-xs text-indigo-500 font-semibold uppercase">Ghi chú</div>
                    <div className="text-sm font-medium text-indigo-900">Luyện hội thoại với AI</div>
                </div>
            </div>
        </div>
      </div>
    </div>

    {/* Chat Modal */}
    {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md h-[600px] rounded-2xl shadow-xl overflow-hidden flex flex-col animate-fade-in">
                {/* Header */}
                <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-full">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">AI Trợ Giảng</h3>
                            <div className="flex items-center gap-1.5 opacity-90">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-xs">Đang hoạt động</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsChatOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                msg.sender === 'user' 
                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none'
                            }`}>
                                <div className="whitespace-pre-wrap">{msg.text}</div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-slate-100">
                    <div className="flex gap-2 items-end">
                        <div className="flex-1 bg-slate-100 rounded-2xl flex items-center p-1 border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
                            <button 
                                onClick={startListening}
                                disabled={isListening}
                                className={`p-2 rounded-full transition-colors ${isListening ? 'text-red-500 bg-red-50 animate-pulse' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
                            >
                                {isListening ? <Loader className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
                            </button>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder={isListening ? "Đang nghe..." : "Nhập tin nhắn..."}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 py-2"
                            />
                        </div>
                        <button 
                            onClick={handleSendMessage}
                            disabled={!inputText.trim()}
                            className={`p-3 rounded-full shadow-sm transition-all ${
                                inputText.trim() 
                                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
  );
};

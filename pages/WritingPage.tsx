
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  PenTool, Search, HelpCircle, Book, 
  Hash, Clock, ArrowRight, Check, BookOpen, Info, Volume2
} from 'lucide-react';
import { radicalsList, Radical } from '../data/radicals';
import { radicals214, Radical214 } from '../data/radicals214';
import { radicalPoemData } from '../data/radicalPoemData';
import { WritingPracticeModal } from '../components/PracticeModals'; // We still need the radical practice modal here

export const WritingPage: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStroke, setSelectedStroke] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [practicingRadical, setPracticingRadical] = useState<Radical | Radical214 | null>(null);
  const [activeTab, setActiveTab] = useState<'50-radicals' | '214-radicals' | 'rules'>('50-radicals');

  // Handle initial tab from navigation state (e.g. from LessonDetail)
  useEffect(() => {
    if (location.state && (location.state as any).activeTab) {
        setActiveTab((location.state as any).activeTab);
    }
  }, [location.state]);

  // Derive unique categories and stroke counts from data
  const categories = useMemo(() => {
    const cats = new Set(radicalsList.map(r => r.category));
    return Array.from(cats).sort();
  }, []);

  const strokeCounts = useMemo(() => {
    const counts = new Set(radicalsList.map(r => r.strokes));
    return Array.from(counts).sort((a, b) => a - b);
  }, []);

  // Filter for 50 Radicals
  const filteredRadicals = useMemo(() => {
    return radicalsList.filter((item) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = (
        item.char.toLowerCase().includes(q) ||
        item.pinyin.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.association.toLowerCase().includes(q)
      );

      const matchesStroke = selectedStroke === 'all' || 
                           (selectedStroke === '7+' ? item.strokes >= 7 : item.strokes === parseInt(selectedStroke));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesStroke && matchesCategory;
    });
  }, [searchTerm, selectedStroke, selectedCategory]);

  // Filter for 214 Radicals
  const filteredRadicals214 = useMemo(() => {
    return radicals214.filter((item) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = (
        item.char.toLowerCase().includes(q) ||
        item.pinyin.toLowerCase().includes(q) ||
        item.sinoViet.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.id.toString().includes(q)
      );
      
      const matchesStroke = selectedStroke === 'all' || 
                           (selectedStroke === '7+' ? item.strokes >= 7 : item.strokes === parseInt(selectedStroke));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesStroke && matchesCategory;
    });
  }, [searchTerm, selectedStroke, selectedCategory]);

  // Reset filters when changing tabs
  useEffect(() => {
     setSearchTerm('');
     setSelectedStroke('all');
     setSelectedCategory('all');
  }, [activeTab]);

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-10">
      {/* New Header Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: 50 Bộ Thủ (Active) */}
        <div 
            onClick={() => setActiveTab('50-radicals')}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex flex-col relative overflow-hidden group ${
                activeTab === '50-radicals' 
                ? 'bg-white border-blue-600 shadow-md ring-4 ring-blue-50' 
                : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
        >
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg transition-colors ${activeTab === '50-radicals' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    <PenTool className="w-5 h-5" />
                </div>
                <h3 className={`text-lg font-bold ${activeTab === '50-radicals' ? 'text-blue-700' : 'text-slate-700'}`}>
                    50 Bộ Thủ Thường Dùng
                </h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Nắm vững 50 bộ thủ này sẽ giúp bạn dễ dàng ghi nhớ và viết đúng hàng ngàn chữ Hán phổ biến.
            </p>
            {activeTab === '50-radicals' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
            )}
        </div>

        {/* Card 2: 214 Bộ Thủ */}
        <div 
            onClick={() => setActiveTab('214-radicals')}
            className={`p-6 rounded-xl border-2 transition-all cursor-pointer flex flex-col relative overflow-hidden group ${
                activeTab === '214-radicals' 
                ? 'bg-white border-blue-600 shadow-md ring-4 ring-blue-50' 
                : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
        >
           <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg transition-colors ${activeTab === '214-radicals' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    <Book className="w-5 h-5" />
                </div>
                <h3 className={`text-lg font-bold ${activeTab === '214-radicals' ? 'text-blue-700' : 'text-slate-700'}`}>
                    214 Bộ Thủ Chữ Hán
                </h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Bảng tra cứu đầy đủ 214 bộ thủ Khang Hy - nền tảng của toàn bộ hệ thống chữ Hán.
            </p>
            {activeTab === '214-radicals' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
            )}
        </div>

        {/* Card 3: Học bộ thủ qua bài thơ */}
        <div 
            onClick={() => setActiveTab('rules')}
            className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col relative overflow-hidden group ${
                activeTab === 'rules' 
                ? 'bg-white border-blue-600 shadow-md ring-4 ring-blue-50' 
                : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
        >
           <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg transition-colors ${activeTab === 'rules' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    <BookOpen className="w-5 h-5" />
                </div>
                <h3 className={`text-lg font-bold ${activeTab === 'rules' ? 'text-blue-700' : 'text-slate-700'}`}>
                    Học bộ thủ qua bài thơ
                </h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Các bài diễn ca lục bát giúp bạn học thuộc 214 bộ thủ một cách dễ dàng và thú vị hơn.
            </p>
            {activeTab === 'rules' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
            )}
        </div>
      </div>

      {/* FILTER BAR - Common for both radical tabs */}
      {(activeTab === '50-radicals' || activeTab === '214-radicals') && (
      <div className="flex flex-col gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Search */}
                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all text-sm"
                        placeholder="Tìm bộ thủ, pinyin, nghĩa..."
                    />
                </div>

                {/* Stroke Filter */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-sm font-medium text-slate-500 whitespace-nowrap flex items-center gap-2">
                       <Hash className="w-4 h-4" /> Số nét:
                    </span>
                    <select 
                        value={selectedStroke}
                        onChange={(e) => setSelectedStroke(e.target.value)}
                        className="w-full md:w-40 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer hover:bg-white"
                    >
                        <option value="all">Tất cả</option>
                        {[1,2,3,4,5,6].map(num => (
                            <option key={num} value={num}>{num} nét</option>
                        ))}
                        <option value="7+">7+ nét</option>
                    </select>
                </div>
            </div>

            {/* Category Filter - For both 50 Radicals and 214 Radicals */}
            <div className="flex flex-col sm:flex-row items-start gap-3 border-t border-slate-100 pt-6">
                <span className="text-sm font-medium text-slate-500 whitespace-nowrap mt-1.5">Phân loại:</span>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                            selectedCategory === 'all'
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                    >
                        Tất cả
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                                selectedCategory === cat
                                ? 'bg-slate-800 text-white border-slate-800'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
      )}

      {/* TABLE: 50 RADICALS */}
      {activeTab === '50-radicals' && (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-16">STT</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Bộ thủ</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Pinyin</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Số nét</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Phân loại</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Nghĩa gốc</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Ví dụ chữ</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Liên tưởng</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Luyện tập</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRadicals.map((radical) => (
                <tr key={radical.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="py-4 px-6 text-sm text-slate-400 text-center font-mono">
                    {radical.id}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-bold text-blue-700 font-sans bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 group-hover:bg-blue-100 group-hover:border-blue-200 transition-colors inline-block min-w-[3rem]">
                        {radical.char}
                      </span>
                      <button 
                        onClick={() => speakText(radical.char)}
                        className="p-1.5 rounded-full hover:bg-blue-100 text-slate-400 hover:text-blue-600 transition-colors"
                        title="Phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-base font-medium text-slate-700 font-sans">
                      {radical.pinyin}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                      {radical.strokes}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-medium text-slate-500 border border-slate-200 px-2.5 py-1 rounded-md bg-white">
                      {radical.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-800">
                      {radical.meaning}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-slate-600 whitespace-nowrap">
                      {radical.example.split('(').map((part, index) => (
                        index === 0 ? 
                        <span key={index} className="text-lg font-bold text-slate-800 mr-2 font-sans">{part}</span> : 
                        <span key={index} className="text-slate-500 italic">({part}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-2 max-w-xs">
                       <HelpCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                       <span className="text-sm text-slate-600 font-medium">
                         {radical.association}
                       </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                     <button
                        onClick={() => setPracticingRadical(radical)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all hover:scale-105 active:scale-95 group/btn"
                        title="Luyện viết"
                     >
                        <PenTool className="w-5 h-5 group-hover/btn:text-blue-700" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRadicals.length === 0 && (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                 <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-slate-800 font-medium mb-1">Không tìm thấy kết quả</h3>
            <p className="text-slate-500 text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
            <button 
                onClick={() => {setSearchTerm(''); setSelectedStroke('all'); setSelectedCategory('all');}}
                className="mt-4 text-blue-600 text-sm font-medium hover:underline"
            >
                Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
      )}

      {/* TABLE: 214 RADICALS */}
      {activeTab === '214-radicals' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-16">Stt</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Số nét</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Phân loại</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Bộ thủ</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Pinyin</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Hán ngữ</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Hán Việt</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Giải nghĩa</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Luyện tập</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRadicals214.map((radical) => (
                    <tr key={radical.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="py-4 px-6 text-sm text-slate-400 text-center font-mono">
                        {radical.id}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                          {radical.strokes}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-medium text-slate-500 border border-slate-200 px-2.5 py-1 rounded-md bg-white whitespace-nowrap">
                          {radical.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl font-bold text-blue-700 font-sans bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 group-hover:bg-blue-100 group-hover:border-blue-200 transition-colors inline-block min-w-[2.5rem]">
                            {radical.char}
                          </span>
                          <button 
                            onClick={() => speakText(radical.char)}
                            className="p-1.5 rounded-full hover:bg-blue-100 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-base font-medium text-slate-700 font-sans">
                          {radical.pinyin}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-semibold text-slate-700">
                          {radical.sinoViet}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-slate-800">
                          {radical.meaning}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-slate-500">
                          {radical.description}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                         <button
                            onClick={() => setPracticingRadical(radical)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all hover:scale-105 active:scale-95 group/btn"
                            title="Luyện viết"
                         >
                            <PenTool className="w-5 h-5 group-hover/btn:text-blue-700" />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRadicals214.length === 0 && (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                     <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-slate-800 font-medium mb-1">Không tìm thấy kết quả</h3>
                <p className="text-slate-500 text-sm">Thử thay đổi từ khóa tìm kiếm của bạn.</p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedStroke('all'); setSelectedCategory('all');}}
                    className="mt-4 text-blue-600 text-sm font-medium hover:underline"
                >
                    Xóa bộ lọc
                </button>
              </div>
            )}

            {filteredRadicals214.length > 0 && (
               <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
                  <span>Hiển thị {filteredRadicals214.length} bộ thủ</span>
                  <span>Tổng số: 214 bộ thủ Khang Hy</span>
               </div>
            )}
          </div>
      )}

      {/* POEM LEARNING SECTION */}
      {activeTab === 'rules' && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-800">Diễn Ca 214 Bộ Thủ</h2>
            <p className="text-slate-600">Phương pháp học bộ thủ qua thơ giúp ghi nhớ nhanh và lâu hơn.</p>
          </div>
          
          {radicalPoemData.map((group) => (
            <div key={group.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
                    <h3 className="font-bold text-blue-800">{group.title}</h3>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-8">
                    <div className="space-y-3 font-medium text-slate-800 text-lg leading-relaxed">
                        {group.lines.map((line, idx) => (
                            <p key={idx} className="pl-4 border-l-4 border-blue-200">{line}</p>
                        ))}
                    </div>
                    <div className="bg-slate-50 p-5 rounded-xl text-sm text-slate-600 space-y-3 h-fit">
                        <h4 className="font-bold text-slate-700 mb-2 uppercase text-xs tracking-wider flex items-center gap-2">
                            <Info className="w-4 h-4" /> Giải thích
                        </h4>
                        {group.explanation.map((exp, idx) => (
                            <p key={idx}>{exp}</p>
                        ))}
                    </div>
                </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === '50-radicals' && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2">Tại sao cần học bộ thủ?</h3>
          <p className="text-sm text-blue-700/80">
            Bộ thủ là thành phần cấu tạo nên chữ Hán. Hiểu bộ thủ giúp bạn đoán nghĩa, đoán âm và ghi nhớ chữ Hán nhanh hơn gấp 3 lần.
          </p>
        </div>
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h3 className="font-bold text-indigo-800 mb-2">Mẹo ghi nhớ</h3>
          <p className="text-sm text-indigo-700/80">
            Hãy liên tưởng hình dáng bộ thủ với các sự vật thực tế (như bộ Mộc giống cái cây, bộ Khẩu giống cái miệng).
          </p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="font-bold text-emerald-800 mb-2">Luyện tập hàng ngày</h3>
          <p className="text-sm text-emerald-700/80">
            Mỗi ngày học 5 bộ thủ, bạn sẽ nắm vững 50 bộ thủ thông dụng nhất chỉ trong 10 ngày.
          </p>
        </div>
      </div>
      )}

      {/* Radical Writing Practice Modal */}
      {practicingRadical && (
        <WritingPracticeModal 
          radical={practicingRadical} 
          onClose={() => setPracticingRadical(null)} 
        />
      )}
    </div>
  );
};

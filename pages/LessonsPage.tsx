import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle, Clock, BookOpen, Plus, X, Download, ExternalLink, Library, Book as BookIcon, Share2, Bookmark } from 'lucide-react';
import { Lesson } from '../types';

interface BookItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  downloadUrl: string;
  color?: string;
}

const BOOKS_DATA: BookItem[] = [
  {
    id: 'book-1',
    title: 'Hack não 3000 chữ Hán - Tập 1',
    subtitle: 'NXB Giáo dục',
    description: 'Tài liệu nhập môn cơ bản nhất cho người mới bắt đầu học tiếng Trung.',
    downloadUrl: 'https://drive.google.com/file/d/1bt3ITiUuqcHLYBE74UfAfEGZ_HpZTbX1/view?usp=sharing',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'book-2',
    title: 'Hack não 3000 chữ Hán - Tập 2',
    subtitle: 'Tài liệu ôn tập',
    description: 'Tổng hợp các chữ Hán thường gặp nhất trong đời sống và thi cử HSK.',
    downloadUrl: 'https://drive.google.com/file/d/18tSfFS0Fjjf5hOzjKs-qvr7dC_9cABUj/view?usp=sharing',
    color: 'from-indigo-500 to-indigo-700'
  },
  {
    id: 'book-3',
    title: 'Hack não 3000 chữ Hán - Tập 3',
    subtitle: 'Sách tham khảo',
    description: 'Giải thích chi tiết các cấu trúc ngữ pháp từ cơ bản đến nâng cao.',
    downloadUrl: 'https://drive.google.com/file/d/1QjNdhzxoKx1JfPUQNpTaowKxhKqCZ7Tc/view?usp=sharing',
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 'book-4',
    title: 'Từ điển hình ảnh Trung - Việt - Tập 1',
    subtitle: 'HỌC QUA HÌNH ẢNH',
    description: 'Học từ vựng sinh động thông qua hình ảnh minh họa thực tế.',
    downloadUrl: 'https://drive.google.com/file/d/1b-26ybu2B9_XnUZtqmKgYAx_t5_ghtiZ/view?usp=sharing',
    color: 'from-amber-500 to-amber-700'
  },
  {
    id: 'book-5',
    title: 'Từ điển hình ảnh Trung - Việt - Tập 2',
    subtitle: 'HỌC QUA HÌNH ẢNH',
    description: 'Học từ vựng sinh động thông qua hình ảnh minh họa thực tế',
    downloadUrl: 'https://drive.google.com/file/d/1wJ1B3UmKoULpAdr9WYh8r7c746jc4Gkn/view?usp=sharing',
    color: 'from-rose-500 to-rose-700'
  },
  {
    id: 'book-6',
    title: 'Siêu trí nhớ chữ Hán - Tập 1',
    subtitle: 'NXB THANH NIÊN - DIỆU HỒ',
    description: 'Dễ dàng nhớ nhanh 1000 chữ Hán sau 2 tháng',
    downloadUrl: 'https://drive.google.com/file/d/1apu6aTCHCgoNfHgllVPFzBIQsZD8F4vN/view?',
    color: 'from-cyan-500 to-cyan-700'
  },
  {
    id: 'book-7',
    title: 'Siêu trí nhớ chữ Hán - Tập 2',
    subtitle: 'NXB THANH NIÊN - DIỆU HỒ',
    description: 'Dễ dàng nhớ nhanh 1000 chữ Hán sau 2 tháng (Tập 2)',
    downloadUrl: 'https://drive.google.com/file/d/1Z_Gme-owjTd4B0ycp8TDTDwwsok_wjQ3/view?usp=sharing',
    color: 'from-purple-500 to-purple-700'
  }
];

export const LessonsPage: React.FC = () => {
  const { lessons, addLesson } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'library' | 'books' | 'online'>('library');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Lesson>>({
    title: '',
    subtitle: '',
    status: 'not-started',
    lastStudied: '',
    progress: 0
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-700 border-green-200';
      case 'doing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'review': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'done': return 'Đã hoàn thành';
      case 'doing': return 'Đang học';
      case 'review': return 'Cần ôn tập';
      default: return 'Chưa bắt đầu';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title) {
      addLesson({
        id: `custom-${Date.now()}`,
        title: formData.title,
        subtitle: formData.subtitle || '',
        status: (formData.status as Lesson['status']) || 'not-started',
        lastStudied: formData.lastStudied || '-',
        progress: formData.progress || 0
      });
      setIsModalOpen(false);
      setFormData({
        title: '',
        subtitle: '',
        status: 'not-started',
        lastStudied: '',
        progress: 0
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20 relative">
      {/* Category Tabs Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('library')}
          className={`p-6 rounded-2xl border-2 text-left transition-all group ${
            activeTab === 'library' 
            ? 'bg-white border-blue-600 shadow-md ring-4 ring-blue-50' 
            : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg transition-colors ${activeTab === 'library' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:text-blue-50'}`}>
              <Library className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-lg ${activeTab === 'library' ? 'text-blue-700' : 'text-slate-700'}`}>Thư viện bài học</h3>
          </div>
          <p className="text-sm text-slate-500">Khám phá và theo dõi lộ trình học tập của bạn.</p>
        </button>

        <button 
          onClick={() => setActiveTab('books')}
          className={`p-6 rounded-2xl border-2 text-left transition-all group ${
            activeTab === 'books' 
            ? 'bg-white border-blue-600 shadow-md ring-4 ring-blue-50' 
            : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg transition-colors ${activeTab === 'books' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:text-blue-50'}`}>
              <BookIcon className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-lg ${activeTab === 'books' ? 'text-blue-700' : 'text-slate-700'}`}>Thư viện sách hay</h3>
          </div>
          <p className="text-sm text-slate-500">Sách giúp học nhanh và nhớ nhanh</p>
        </button>

        <button 
          onClick={() => setActiveTab('online')}
          className={`p-6 rounded-2xl border-2 text-left transition-all group ${
            activeTab === 'online' 
            ? 'bg-white border-blue-600 shadow-md ring-4 ring-blue-50' 
            : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg transition-colors ${activeTab === 'online' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:text-blue-50'}`}>
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className={`font-bold text-lg ${activeTab === 'online' ? 'text-blue-700' : 'text-slate-700'}`}>Bài học ngắn online</h3>
          </div>
          <p className="text-sm text-slate-500">Nguồn bài học từ Facebook và Tiktok</p>
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-800">
          {activeTab === 'library' ? 'Nội dung bài học' : activeTab === 'books' ? 'Tài liệu PDF & Sách' : 'Nguồn tham khảo mạng'}
        </h2>
        {activeTab === 'library' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all flex items-center space-x-2 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm bài học</span>
          </button>
        )}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeTab === 'library' && lessons.map((lesson) => (
          <div 
            key={lesson.id}
            onClick={() => navigate(`/lessons/${lesson.id}`)}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group overflow-hidden flex flex-col h-full"
          >
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${getStatusColor(lesson.status)}`}>
                  {getStatusLabel(lesson.status)}
                </div>
                {lesson.status === 'done' && (
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                {lesson.title}
              </h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                {lesson.subtitle}
              </p>
              
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-auto">
                <div className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                  {lesson.lastStudied !== '-' ? lesson.lastStudied : 'Chưa học'}
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                  HSK {lesson.id.includes('hsk') ? lesson.id.charAt(3) : '1'}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-500 uppercase tracking-wider">Tiến độ</span>
                <span className="text-blue-600 font-black">{lesson.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-700 shadow-sm ${
                    lesson.progress === 100 ? 'bg-green-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${lesson.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'books' && BOOKS_DATA.map((book) => {
          return (
            <div 
              key={book.id}
              className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full perspective-1000"
            >
              {/* Digitized Book Cover Area */}
              <div className={`h-64 relative bg-gradient-to-br ${book.color || 'from-slate-700 to-slate-900'} p-8 flex flex-col justify-end overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-4 right-4"><Bookmark className="w-12 h-12" /></div>
                  <div className="absolute bottom-[-20px] left-[-20px]"><BookIcon className="w-48 h-48 rotate-12" /></div>
                </div>
                
                {/* Book Spine Simulation */}
                <div className="absolute top-0 left-0 w-4 h-full bg-black/20 z-10"></div>
                
                <div className="relative z-20">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-2">DIGITAL LIBRARY</div>
                   <h3 className="text-xl font-black text-white leading-tight mb-1 line-clamp-2 drop-shadow-md">
                     {book.title}
                   </h3>
                   <div className="h-1 w-12 bg-white/40 rounded-full"></div>
                </div>
              </div>

              {/* Content Info */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-slate-100 text-slate-500 border border-slate-200">
                    {book.subtitle}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-blue-50 text-blue-600 border border-blue-100">
                    PDF 
                  </span>
                </div>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3 italic">
                  "{book.description}"
                </p>

                <button 
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 active:scale-95"
                  onClick={() => window.open(book.downloadUrl, '_blank')}
                >
                  <Download className="w-4 h-4" />
                  Mở tài liệu ngay
                </button>
              </div>
            </div>
          );
        })}

        {activeTab === 'books' && (
          <div className="group relative bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center opacity-60 min-h-[480px]">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-slate-300">
                <Plus className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-black text-slate-400 uppercase tracking-tight mb-2">Đang bổ sung thêm...</h4>
              <p className="text-xs text-slate-400 font-medium max-w-[180px]">Thư viện sách sẽ được cập nhật liên tục với nhiều tài liệu HSK mới nhất.</p>
          </div>
        )}

        {activeTab === 'online' && (
          <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 shadow-inner">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
                <ExternalLink className="w-12 h-12" />
             </div>
             <h3 className="text-2xl font-black text-slate-600 uppercase tracking-tight">Tính năng đang phát triển</h3>
             <p className="text-slate-400 max-w-sm mt-3 font-medium">Danh sách tổng hợp các bài học ngắn từ Tiktok và Facebook sẽ sớm ra mắt.</p>
             <div className="mt-8 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-blue-200 animate-bounce delay-200"></div>
             </div>
          </div>
        )}
      </div>

      {/* Add Lesson Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in scale-100 border border-slate-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Plus className="w-6 h-6 text-blue-600" />
                Thêm bài học mới
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-white p-2 rounded-full transition-colors border border-transparent hover:border-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Tên bài học <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: HSK 1: Bài 4"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mô tả nội dung</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="Chủ đề, nội dung chính..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Trạng thái</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 bg-white transition-all text-sm font-medium"
                    >
                      <option value="not-started">Chưa bắt đầu</option>
                      <option value="doing">Đang học</option>
                      <option value="review">Cần ôn tập</option>
                      <option value="done">Hoàn thành</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Học gần nhất</label>
                    <input
                      type="text"
                      name="lastStudied"
                      value={formData.lastStudied}
                      onChange={handleInputChange}
                      placeholder="VD: Hôm nay"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Tiến độ hiện tại</label>
                    <span className="text-sm font-black text-blue-600">{formData.progress}%</span>
                  </div>
                  <input
                    type="range"
                    name="progress"
                    min="0"
                    max="100"
                    step="5"
                    value={formData.progress}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
                >
                  Tạo bài học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
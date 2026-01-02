import React from 'react';
import { Lesson } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const RecentLessons: React.FC = () => {
  const { lessons } = useApp();
  const navigate = useNavigate();

  // Show only first 3 for the dashboard widget
  const recentLessons = lessons.slice(0, 3);

  const getStatusBadge = (status: Lesson['status']) => {
    switch (status) {
      case 'doing': return <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold">Đang học</span>;
      case 'done': return <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold">Đã xong</span>;
      case 'review': return <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded font-semibold">Cần ôn</span>;
      case 'not-started': return <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-semibold">Chưa học</span>;
    }
  };

  const getProgressLabel = (status: Lesson['status']) => {
    switch(status) {
        case 'doing': return 'Đang học...';
        case 'done': return 'Hoàn thành';
        case 'review': return 'Cần ôn tập';
        case 'not-started': return 'Sẵn sàng';
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800">Bài học gần đây</h3>
        <button 
          onClick={() => navigate('/lessons')}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-6 flex-1 overflow-y-auto">
        {recentLessons.map((lesson) => (
          <div 
            key={lesson.id} 
            className="border-b border-slate-50 last:border-0 pb-4 last:pb-0 cursor-pointer group hover:bg-slate-50 p-2 rounded-lg transition-colors -mx-2"
            onClick={() => navigate(`/lessons/${lesson.id}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-slate-800 text-base group-hover:text-blue-700">{lesson.title}</h4>
                <span className="text-xs text-slate-400">{lesson.subtitle}</span>
              </div>
              {getStatusBadge(lesson.status)}
            </div>
            
            <div className="mt-2">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{getProgressLabel(lesson.status)}</span>
                    <span>{lesson.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                            lesson.status === 'done' ? 'bg-green-500' : 
                            lesson.status === 'review' ? 'bg-orange-400' : 
                            lesson.status === 'not-started' ? 'bg-slate-300' : 'bg-blue-500'
                        }`} 
                        style={{ width: `${lesson.progress}%` }}
                    ></div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { StatItem } from '../types';

export const QuickStats: React.FC = () => {
  const stats: StatItem[] = [
    { value: '24', label: 'Từ vựng sắp quên' },
    { value: '8,0', label: 'Điểm phát âm' },
    { value: '68%', label: 'Tỉ lệ ôn lại' },
    { value: '15', label: 'Chữ Hán hay nhầm' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-8">Thống kê nhanh</h3>
      <div className="space-y-8 flex-1">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between group cursor-default">
            <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-none mb-1">{stat.value}</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-tight">{stat.label}</span>
            </div>
            <div className="h-10 w-1 bg-slate-50 rounded-full group-hover:bg-blue-100 transition-all duration-300"></div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
          Dữ liệu được cập nhật theo thời gian thực
        </div>
      </div>
    </div>
  );
};
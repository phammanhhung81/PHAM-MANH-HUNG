
import React, { useState, useEffect } from 'react';
import { Bell, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isSidebarLocked } = useApp();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const formattedDate = `${currentDate.getDate()} Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`;

  return (
    <header 
      className={`h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-end sticky top-0 z-40 shadow-sm transition-all duration-300`}
    >
      <div className="flex items-center space-x-6">
        <div className="flex flex-col items-end mr-2 animate-fade-in">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Ngày học hiện tại</span>
          <div className="flex items-center text-slate-700 font-bold text-sm mt-0.5">
            <Calendar className="w-4 h-4 mr-1.5 text-blue-600" />
            {formattedDate}
          </div>
        </div>
        
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

        <button className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors group">
          <Bell className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
        </button>

        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-800 leading-tight">Phạm Mạnh Hùng</div>
            <div className="text-[10px] text-green-500 font-bold flex items-center justify-end">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              Trực tuyến
            </div>
          </div>
          <img
            className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-blue-200 transition-all shadow-sm"
            src="https://picsum.photos/200/200?random=1"
            alt="User Avatar"
          />
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GenericPageProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export const GenericPage: React.FC<GenericPageProps> = ({ title, icon: Icon, description }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
        <div className="p-4 bg-blue-50 rounded-full mb-6">
          <Icon className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">{description}</p>
        <div className="animate-pulse flex space-x-2">
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full animation-delay-200"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full animation-delay-400"></div>
        </div>
        <p className="text-xs text-slate-400 mt-4 uppercase tracking-widest">Đang phát triển</p>
      </div>
    </div>
  );
};
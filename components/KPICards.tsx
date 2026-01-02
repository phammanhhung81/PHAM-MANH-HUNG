
import React from 'react';
import { Book, Type, MessageSquare, Clock, TrendingUp } from 'lucide-react';
import { KPIData } from '../types';
import { useApp } from '../context/AppContext';

const KPICard: React.FC<{ data: KPIData }> = ({ data }) => {
  const getIcon = () => {
    switch (data.icon) {
      case 'book': return <Book className="w-6 h-6" />;
      case 'type': return <Type className="w-6 h-6" />;
      case 'message': return <MessageSquare className="w-6 h-6" />;
      case 'clock': return <Clock className="w-6 h-6" />;
      default: return <TrendingUp className="w-6 h-6" />;
    }
  };

  const getStyles = () => {
    switch (data.icon) {
      case 'book': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'type': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
      case 'message': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'clock': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const styles = getStyles();
  const iconColorClass = styles.split(' ')[0];
  const bgAndBorderClasses = styles.split(' ').slice(1).join(' ');

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center space-x-5 hover:shadow-md transition-all duration-300 group cursor-default">
      <div className={`p-4 rounded-2xl ${bgAndBorderClasses} group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
        <div className={iconColorClass}>
          {getIcon()}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-1">
          {data.value}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
          {data.label}
        </div>
      </div>
    </div>
  );
};

export const KPICards: React.FC = () => {
  const { kpis } = useApp();

  if (!kpis || kpis.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
      {kpis.map((kpi, index) => (
        <KPICard key={index} data={kpi} />
      ))}
    </div>
  );
};

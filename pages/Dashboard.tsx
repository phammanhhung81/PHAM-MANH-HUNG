
import React from 'react';
import { KPICards } from '../components/KPICards';
import { ProgressChart } from '../components/ProgressChart';
import { QuickStats } from '../components/QuickStats';
import { RecentLessons } from '../components/RecentLessons';
import { DailySchedule } from '../components/DailySchedule';

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="mb-4">
          <h2 className="text-2xl font-black text-slate-800">Xin chào!</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Tiếp tục hành trình chinh phục tiếng Trung của bạn.</p>
      </div>

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-auto lg:min-h-[420px]">
        <div className="lg:col-span-3">
          <ProgressChart />
        </div>
        <div className="lg:col-span-1">
          <QuickStats />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentLessons />
        </div>
        <div className="lg:col-span-1">
          <DailySchedule />
        </div>
      </div>
    </div>
  );
};

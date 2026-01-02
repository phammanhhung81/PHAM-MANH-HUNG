
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'T2', plan: 30, actual: 20 },
  { name: 'T3', plan: 35, actual: 30 },
  { name: 'T4', plan: 40, actual: 45 },
  { name: 'T5', plan: 40, actual: 38 },
  { name: 'T6', plan: 50, actual: 48 },
  { name: 'T7', plan: 60, actual: 25 },
  { name: 'CN', plan: 60, actual: 55 },
];

export const ProgressChart: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('30 ngày');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-slate-800">Biểu đồ tiến độ học tập</h3>
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
          {['7 ngày', '30 ngày', '60 ngày'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                activeFilter === filter
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend 
              verticalAlign="bottom" 
              align="center"
              height={36} 
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ paddingTop: '20px' }}
              // Custom legend to match screenshot order: Thực tế (Dark Blue) then Kế hoạch (Light Blue)
              payload={[
                { value: 'Thực tế', type: 'circle', id: 'actual', color: '#2563eb' },
                { value: 'Kế hoạch', type: 'circle', id: 'plan', color: '#bfdbfe' },
              ]}
            />
            <Bar dataKey="plan" name="plan" fill="#bfdbfe" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="actual" name="actual" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

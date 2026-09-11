import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

export const ApplicationChart = ({
  data = [
    { name: 'Applied', value: 12, color: '#6D4AFF' },
    { name: 'Under Review', value: 6, color: '#3B82F6' },
    { name: 'Interview', value: 4, color: '#8B5CF6' },
    { name: 'Offer', value: 2, color: '#10B981' },
  ],
  total = 24,
}) => {
  const [period, setPeriod] = useState('This Month');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-black text-slate-900 dark:text-white">Application Status</h3>
        <button className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
          <span>{period}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Donut Chart with Center Text */}
        <div className="relative w-40 h-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={68}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
              {total}
            </span>
            <span className="text-[10px] font-bold text-slate-400 mt-1">
              Applications
            </span>
          </div>
        </div>

        {/* Legend with Counts */}
        <div className="w-full space-y-2 text-xs font-bold">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-slate-600 dark:text-slate-300 font-semibold">{item.name}</span>
              </div>
              <span className="text-slate-900 dark:text-white font-black">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationChart;

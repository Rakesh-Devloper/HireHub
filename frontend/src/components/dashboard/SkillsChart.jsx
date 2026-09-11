import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SkillsChart = ({
  skills = [
    { name: 'JavaScript', percentage: 85, color: '#3B82F6' },
    { name: 'Python', percentage: 72, color: '#3B82F6' },
    { name: 'React.js', percentage: 68, color: '#6D4AFF' },
    { name: 'Node.js', percentage: 60, color: '#6D4AFF' },
    { name: 'UI/UX', percentage: 52, color: '#8B5CF6' },
  ],
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-black text-slate-900 dark:text-white">Top Skills in Demand</h3>
        <button
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-1 text-xs font-extrabold text-[#6D4AFF] dark:text-indigo-400 hover:underline cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-800 dark:text-slate-200">{skill.name}</span>
              <span className="text-slate-400 dark:text-slate-400">{skill.percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${skill.percentage}%`,
                  backgroundColor: skill.color || '#3B82F6',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsChart;

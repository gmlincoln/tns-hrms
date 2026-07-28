import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, UserX, Clock, AlertTriangle } from 'lucide-react';
import { CircularProgress } from './CircularProgress';

export const StatsCards: React.FC = () => {
  const cards = [
    {
      id: 'present',
      title: 'Present',
      value: 55,
      percentage: 87,
      color: '#10B981', // Success (green)
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      icon: UserCheck,
      comparison: '+5 vs yesterday',
      comparisonColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'absent',
      title: 'Absent',
      value: 8,
      percentage: 13,
      color: '#EF4444', // Danger (red)
      bgColor: 'bg-rose-50 dark:bg-rose-950/20',
      textColor: 'text-rose-600 dark:text-rose-400',
      icon: UserX,
      comparison: '-2 vs yesterday',
      comparisonColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'on-time',
      title: 'On Time',
      value: 17,
      percentage: 26,
      color: '#3B82F6', // Info (blue)
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      icon: Clock,
      comparison: '-3 vs yesterday',
      comparisonColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      id: 'late',
      title: 'Late',
      value: 39,
      percentage: 61,
      color: '#F59E0B', // Warning (orange)
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      textColor: 'text-amber-600 dark:text-amber-400',
      icon: AlertTriangle,
      comparison: '+8 vs yesterday',
      comparisonColor: 'text-rose-600 dark:text-rose-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            whileHover={{ y: -4, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${card.bgColor} ${card.textColor}`}>
                  <Icon size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {card.title}
                </span>
              </div>
              <div>
                <span className="text-3xl font-bold font-manrope text-slate-800 dark:text-white leading-none">
                  {card.value}
                </span>
              </div>
              <div className="text-xs font-semibold">
                <span className={card.comparisonColor}>{card.comparison}</span>
              </div>
            </div>
            <div>
              <CircularProgress percentage={card.percentage} color={card.color} size={68} strokeWidth={5.5} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

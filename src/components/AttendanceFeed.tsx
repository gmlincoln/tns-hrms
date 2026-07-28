import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FeedItem {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  location: string;
  avatar: string;
  type: 'IN' | 'OUT';
  method: 'Face' | 'Fingerprint' | 'RFID' | 'GPS';
  time: string;
  timeAgo: string;
}

interface AttendanceFeedProps {
  feedItems: FeedItem[];
}

export const AttendanceFeed: React.FC<AttendanceFeedProps> = ({ feedItems }) => {
  const getMethodBadgeClass = (method: string) => {
    switch (method) {
      case 'Face':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 border-blue-100 dark:border-blue-900/20';
      case 'Fingerprint':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100 dark:border-amber-900/20';
      case 'RFID':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400 border-purple-100 dark:border-purple-900/20';
      case 'GPS':
        return 'bg-teal-50 text-teal-600 dark:bg-teal-950/20 dark:text-teal-400 border-teal-100 dark:border-teal-900/20';
      default:
        return 'bg-slate-50 text-slate-600 dark:bg-slate-950/20 dark:text-slate-400 border-slate-100 dark:border-slate-900/20';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 flex flex-col h-full shadow-sm">
      {/* Feed Header */}
      <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-700/50 pb-4 mb-4">
        <div>
          <h3 className="text-lg font-bold font-poppins text-slate-800 dark:text-white leading-tight">
            Attendance Feed
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Device punches, most recent first
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-900/40 text-[10px] font-bold uppercase tracking-wider animate-pulse-slow">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          LIVE
        </div>
      </div>

      {/* Feed List Container */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 max-h-[500px]">
        <AnimatePresence initial={false}>
          {feedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="p-3.5 bg-slate-50/70 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 rounded-xl flex items-start gap-3 hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all group overflow-hidden"
            >
              {/* Photo */}
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/10 group-hover:ring-indigo-500/25 transition-all shrink-0"
              />

              {/* Info Details */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {item.department} • {item.location} ({item.employeeId})
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                    {item.timeAgo}
                  </span>
                </div>

                {/* Badge details */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {/* Punch Type Badge */}
                  <span
                    className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${
                      item.type === 'IN'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/20'
                        : 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/20'
                    }`}
                  >
                    {item.type === 'IN' ? '↓ IN' : '↑ OUT'}
                  </span>

                  {/* Recognition Method Badge */}
                  <span
                    className={`inline-flex items-center text-[9px] font-bold px-2 py-0.5 rounded-md border ${getMethodBadgeClass(
                      item.method
                    )}`}
                  >
                    {item.method}
                  </span>

                  {/* Clock Time */}
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold ml-auto">
                    {item.time}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

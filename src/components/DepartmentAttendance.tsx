import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { CircularProgress } from './CircularProgress';

interface Department {
  id: string;
  name: string;
  percentage: number;
  totalEmployees: number;
  presentCount: number;
  color: string;
}

export const DepartmentAttendance: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const departments: Department[] = [
    {
      id: 'hr-admin',
      name: 'HR & Admin',
      percentage: 50,
      totalEmployees: 18,
      presentCount: 15,
      color: '#10B981', // green
    },
    {
      id: 'finance-accounts',
      name: 'Finance & Accounts',
      percentage: 53,
      totalEmployees: 15,
      presentCount: 12,
      color: '#3B82F6', // blue
    },
    {
      id: 'operations',
      name: 'Operations',
      percentage: 73,
      totalEmployees: 22,
      presentCount: 20,
      color: '#F59E0B', // orange
    },
    {
      id: 'it',
      name: 'IT',
      percentage: 91,
      totalEmployees: 12,
      presentCount: 11,
      color: '#8B5CF6', // purple
    },
    {
      id: 'marketing',
      name: 'Marketing & PR',
      percentage: 82,
      totalEmployees: 11,
      presentCount: 9,
      color: '#EC4899', // pink
    },
    {
      id: 'sales',
      name: 'Sales & BD',
      percentage: 67,
      totalEmployees: 24,
      presentCount: 16,
      color: '#14B8A6', // teal
    },
  ];

  // Show 2 departments at a time
  const itemsPerPage = 2;
  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleDepartments = departments.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const legendItems = [
    { label: 'On Time', color: 'bg-emerald-500' },
    { label: 'Late', color: 'bg-amber-500' },
    { label: 'Absent', color: 'bg-rose-500' },
    { label: 'On Leave', color: 'bg-blue-500' },
    { label: 'Holiday / Day Off', color: 'bg-slate-400' },
    { label: 'Special Day', color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 flex flex-col h-full justify-between shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold font-poppins text-slate-800 dark:text-white leading-tight">
            Department-wise Attendance
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Live distribution across all departments
          </p>
        </div>
        <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 transition-all">
          View all departments <ArrowRight size={14} />
        </button>
      </div>

      {/* Carousel Body */}
      <div className="relative flex items-center flex-1 py-4">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 -ml-2 p-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 dark:bg-slate-700 dark:hover:bg-slate-650 dark:border-slate-600 dark:text-slate-200 z-10 shadow-sm transition-all focus:outline-none"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Carousel Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-8 select-none">
          {visibleDepartments.map((dept) => (
            <div
              key={dept.id}
              className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-4 hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all"
            >
              <div className="relative">
                <CircularProgress percentage={dept.percentage} color={dept.color} size={110} strokeWidth={9} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                  {dept.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {dept.totalEmployees} employees - {dept.presentCount} present
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 -mr-2 p-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 dark:bg-slate-700 dark:hover:bg-slate-650 dark:border-slate-600 dark:text-slate-200 z-10 shadow-sm transition-all focus:outline-none"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Pagination dots & Legend */}
      <div className="mt-5 space-y-5">
        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === i 
                  ? 'bg-indigo-600 dark:bg-indigo-400 w-5' 
                  : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

        {/* Color Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-slate-100 dark:border-slate-700/50 pt-4">
          {legendItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${item.color}`} />
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

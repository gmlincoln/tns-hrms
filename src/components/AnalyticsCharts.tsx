import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { PieChart as PieIcon, Activity } from 'lucide-react';

// Color definitions matching the prompt's theme
const COLORS = {
  primary: '#4F46E5', // Indigo
  success: '#10B981', // Green
  warning: '#F59E0B', // Orange
  danger: '#EF4444',  // Red
  info: '#3B82F6',    // Blue
  purple: '#8B5CF6',
  pink: '#EC4899',
  teal: '#14B8A6'
};

// Mock data
const attendanceTrendData = [
  { name: 'Mon', Present: 50, Late: 5 },
  { name: 'Tue', Present: 52, Late: 4 },
  { name: 'Wed', Present: 48, Late: 8 },
  { name: 'Thu', Present: 54, Late: 3 },
  { name: 'Fri', Present: 55, Late: 5 },
  { name: 'Sat', Present: 20, Late: 2 },
  { name: 'Sun', Present: 15, Late: 1 },
];

const weeklyAttendanceData = [
  { name: 'Week 1', Present: 52, OnLeave: 3 },
  { name: 'Week 2', Present: 54, OnLeave: 2 },
  { name: 'Week 3', Present: 49, OnLeave: 4 },
  { name: 'Week 4', Present: 55, OnLeave: 1 },
];

const lateVsOnTimeData = [
  { name: 'HR', OnTime: 12, Late: 3 },
  { name: 'Finance', OnTime: 11, Late: 1 },
  { name: 'Operations', OnTime: 15, Late: 5 },
  { name: 'IT', OnTime: 9, Late: 2 },
];

const monthlyAttendanceData = [
  { name: 'Jan', Rate: 92 },
  { name: 'Feb', Rate: 94 },
  { name: 'Mar', Rate: 91 },
  { name: 'Apr', Rate: 95 },
  { name: 'May', Rate: 93 },
  { name: 'Jun', Rate: 96 },
];

const deptComparisonData = [
  { name: 'IT', value: 35 },
  { name: 'Operations', value: 25 },
  { name: 'Finance', value: 20 },
  { name: 'HR', value: 20 },
];

const leaveStatisticsData = [
  { name: 'Sick Leave', value: 40 },
  { name: 'Casual Leave', value: 30 },
  { name: 'Annual Leave', value: 20 },
  { name: 'Unpaid Leave', value: 10 },
];

const DEPT_PIE_COLORS = [COLORS.primary, COLORS.success, COLORS.warning, COLORS.info];
const LEAVE_PIE_COLORS = [COLORS.danger, COLORS.info, COLORS.success, COLORS.warning];

export const AnalyticsCharts: React.FC = () => {
  const [activeChartGroup, setActiveChartGroup] = useState<'trends' | 'distribution'>('trends');

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-sm">
      {/* Charts Header & Filter Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 dark:border-slate-700/50 pb-4">
        <div>
          <h3 className="text-lg font-bold font-poppins text-slate-800 dark:text-white leading-tight">
            Analytics Overview
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Key insights, trend patterns and leave statistics
          </p>
        </div>
        <div className="flex items-center bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-xl self-start">
          <button
            onClick={() => setActiveChartGroup('trends')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeChartGroup === 'trends'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Activity size={14} /> Trends & Attendance
          </button>
          <button
            onClick={() => setActiveChartGroup('distribution')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeChartGroup === 'distribution'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <PieIcon size={14} /> Departments & Leaves
          </button>
        </div>
      </div>

      {activeChartGroup === 'trends' ? (
        /* Trends & Attendance Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Attendance Trend (Area Chart) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Attendance Trend</h4>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-semibold">Area Chart</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={COLORS.success} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-750" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="Present" stroke={COLORS.success} fillOpacity={1} fill="url(#colorPresent)" strokeWidth={2} />
                  <Area type="monotone" dataKey="Late" stroke={COLORS.warning} fill="none" strokeWidth={2} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Weekly Attendance (Bar Chart) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weekly Attendance</h4>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-semibold">Bar Chart</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-750" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="Present" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="OnLeave" fill={COLORS.info} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Late vs On-Time (Stacked Bar Chart) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Late vs On-Time By Dept</h4>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-semibold">Stacked Bar</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lateVsOnTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-750" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="OnTime" stackId="a" fill={COLORS.success} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Late" stackId="a" fill={COLORS.warning} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Monthly Attendance (Line Chart) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Monthly Attendance Rate (%)</h4>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-semibold">Line Chart</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-750" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[80, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="Rate" stroke={COLORS.primary} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        /* Department & Leave Distribution Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 5: Department Comparison (Donut Chart) */}
          <div className="space-y-3 flex flex-col">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Department Comparison</h4>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-semibold">Donut Chart</span>
            </div>
            <div className="h-64 flex-1 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deptComparisonData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {deptComparisonData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={DEPT_PIE_COLORS[index % DEPT_PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <span className="text-2xl font-bold font-manrope text-slate-800 dark:text-white">100%</span>
                <p className="text-[10px] text-slate-400 font-medium">Headcount</p>
              </div>
            </div>
          </div>

          {/* Chart 6: Leave Statistics (Pie Chart) */}
          <div className="space-y-3 flex flex-col">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Leave Statistics</h4>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-semibold">Pie Chart</span>
            </div>
            <div className="h-64 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveStatisticsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    labelLine={false}
                    label={({ name, percent }) => typeof percent === 'number' ? `${name} ${(percent * 100).toFixed(0)}%` : name}
                    dataKey="value"
                  >
                    {leaveStatisticsData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={LEAVE_PIE_COLORS[index % LEAVE_PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

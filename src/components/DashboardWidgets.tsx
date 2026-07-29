import React from 'react';
import { 
  UserCheck, CheckCircle2, RefreshCw, AlertOctagon, 
  UserPlus, Gift, Clock, Plus, CalendarRange, 
  FileSpreadsheet, ArrowUpRight 
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                          1. RECENT ACTIVITIES                              */
/* -------------------------------------------------------------------------- */
interface DashboardWidgetProps {
  employees?: any[];
}

/* -------------------------------------------------------------------------- */
/*                          1. RECENT ACTIVITIES                              */
/* -------------------------------------------------------------------------- */
export const RecentActivities: React.FC<DashboardWidgetProps> = ({ employees = [] }) => {
  const getEmpName = (index: number, fallback: string) => {
    return employees[index]?.name || fallback;
  };

  const activities = [
    {
      id: 1,
      title: `${getEmpName(1, 'Kazi Fahmid Hassan Rafi')} checked in`,
      time: 'Moments ago',
      type: 'checkin',
      icon: UserCheck,
      iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400',
    },
    {
      id: 2,
      title: `Leave request approved for ${getEmpName(3, 'Samia Rahman')}`,
      time: '15 mins ago',
      type: 'leave',
      icon: CheckCircle2,
      iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400',
    },
    {
      id: 3,
      title: 'Morning shift assigned to 5 new recruits',
      time: '1 hour ago',
      type: 'shift',
      icon: RefreshCw,
      iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400',
    },
    {
      id: 4,
      title: 'Device ID #D84 went offline',
      time: '2 hours ago',
      type: 'device',
      icon: AlertOctagon,
      iconBg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400',
    },
    {
      id: 5,
      title: `New employee ${getEmpName(4, 'Abul Kalam Azad')} joined Management`,
      time: '4 hours ago',
      type: 'join',
      icon: UserPlus,
      iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold font-poppins text-slate-800 dark:text-white mb-4">
        Recent Activities
      </h3>
      <div className="relative border-l border-slate-100 dark:border-slate-700 ml-4 space-y-5">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="relative pl-6">
              <span className={`absolute -left-3.5 top-0.5 p-1 rounded-full ${act.iconBg} ring-4 ring-white dark:ring-slate-800 shrink-0`}>
                <Icon size={12} />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {act.title}
                </p>
                <span className="text-[10px] text-slate-400 font-medium">
                  {act.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                           2. UPCOMING LEAVES                               */
/* -------------------------------------------------------------------------- */
export const UpcomingLeaves: React.FC<DashboardWidgetProps> = ({ employees = [] }) => {
  const defaultLeaves = [
    {
      id: 1,
      name: 'Samia Rahman',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop',
      type: 'Sick Leave',
      date: '29 Jul - 31 Jul',
      status: 'Approved',
      statusClass: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/25 dark:text-emerald-400 dark:border-emerald-900/20',
    },
    {
      id: 2,
      name: 'Mohiminul Islam',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop',
      type: 'Annual Leave',
      date: '02 Aug - 08 Aug',
      status: 'Pending',
      statusClass: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/25 dark:text-amber-400 dark:border-amber-900/20',
    },
    {
      id: 3,
      name: 'Julia Akter Lipi',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&fit=crop',
      type: 'Maternity Leave',
      date: '10 Aug - 10 Nov',
      status: 'Approved',
      statusClass: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/25 dark:text-emerald-400 dark:border-emerald-900/20',
    },
  ];

  // Map to dynamic employees from the roster if available
  const leaves = defaultLeaves.map((l, idx) => {
    // Look for match by index or name
    const emp = employees.find(e => e.name === l.name) || employees[idx + 3] || employees[0];
    if (emp) {
      return {
        ...l,
        name: emp.name,
        avatar: emp.avatar,
        type: l.type,
      };
    }
    return l;
  });

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold font-poppins text-slate-800 dark:text-white mb-4">
        Upcoming Leaves
      </h3>
      <div className="space-y-4">
        {leaves.map((leave) => (
          <div key={leave.id} className="flex items-center justify-between border-b border-slate-50 dark:border-slate-700/30 pb-3 last:border-b-0 last:pb-0">
            <div className="flex items-center gap-3">
              <img
                src={leave.avatar}
                alt={leave.name}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/10"
              />
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{leave.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{leave.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{leave.date}</p>
              <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded border ${leave.statusClass} mt-0.5`}>
                {leave.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                          3. TODAY'S BIRTHDAYS                              */
/* -------------------------------------------------------------------------- */
interface BirthdayProps extends DashboardWidgetProps {
  onWishClick: (name: string) => void;
}

export const TodaysBirthdays: React.FC<BirthdayProps> = ({ onWishClick, employees = [] }) => {
  const defaultBirthdays = [
    {
      id: 1,
      name: 'Kazi Fahmid Hassan Rafi',
      department: 'IT Department',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&fit=crop',
    },
    {
      id: 2,
      name: 'Prosunjit Roy',
      department: 'Finance & Accounts',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop',
    },
  ];

  const birthdays = defaultBirthdays.map((b, idx) => {
    const emp = employees.find(e => e.name === b.name) || employees[idx + 1] || employees[0];
    if (emp) {
      return {
        ...b,
        name: emp.name,
        avatar: emp.avatar,
        department: emp.dept || b.department,
      };
    }
    return b;
  });

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold font-poppins text-slate-800 dark:text-white mb-4 flex items-center gap-1.5">
        <Gift size={16} className="text-rose-500" /> Today's Birthdays
      </h3>
      <div className="space-y-4">
        {birthdays.map((bday) => (
          <div key={bday.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={bday.avatar}
                alt={bday.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-500/20"
              />
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{bday.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{bday.department}</p>
              </div>
            </div>
            <button
              onClick={() => onWishClick(bday.name)}
              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20 rounded-lg text-[10px] font-bold transition-colors"
            >
              Wish 🎉
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                            4. SHIFT OVERVIEW                               */
/* -------------------------------------------------------------------------- */
export const ShiftOverview: React.FC = () => {
  const shifts = [
    { name: 'Morning Shift', hours: '06:00 AM - 02:00 PM', employees: 25, late: 2, absent: 1 },
    { name: 'Evening Shift', hours: '02:00 PM - 10:00 PM', employees: 30, late: 4, absent: 0 },
    { name: 'Night Shift', hours: '10:00 PM - 06:00 AM', employees: 22, late: 1, absent: 2 },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold font-poppins text-slate-800 dark:text-white mb-4">
        Shift Overview
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-medium">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700/50 text-slate-400">
              <th className="pb-2.5">Shift</th>
              <th className="pb-2.5 text-center">Employees</th>
              <th className="pb-2.5 text-center">Late</th>
              <th className="pb-2.5 text-center">Absent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/30">
            {shifts.map((shift, idx) => (
              <tr key={idx} className="text-slate-700 dark:text-slate-300">
                <td className="py-2.5">
                  <p className="font-bold text-xs">{shift.name}</p>
                  <span className="text-[9px] text-slate-400 font-medium">{shift.hours}</span>
                </td>
                <td className="py-2.5 text-center font-semibold">{shift.employees}</td>
                <td className="py-2.5 text-center">
                  <span className={`font-bold ${shift.late > 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                    {shift.late}
                  </span>
                </td>
                <td className="py-2.5 text-center">
                  <span className={`font-bold ${shift.absent > 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                    {shift.absent}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                            5. CALENDAR WIDGET                              */
/* -------------------------------------------------------------------------- */
export const CalendarWidget: React.FC = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayDate = currentDate.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOffset = new Date(year, month, 1).getDay();

  const blankDays = Array(startDayOffset).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Mark types
  const getDayMarker = (day: number) => {
    if (day === todayDate) return 'today';
    const dayOfWeek = new Date(year, month, day).getDay();
    if (dayOfWeek === 5) return 'holiday'; // Fridays
    if ([8, 22].includes(day)) return 'leave';
    if ([15].includes(day)) return 'event';
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold font-poppins text-slate-800 dark:text-white">
          Calendar Widget
        </h3>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
          {monthNames[month]} {year}
        </span>
      </div>

      <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-2">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-semibold">
        {blankDays.map((_, idx) => (
          <span key={`blank-${idx}`} className="py-1"></span>
        ))}
        {days.map((day) => {
          const marker = getDayMarker(day);
          let classStr = 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50';
          if (marker === 'today') {
            classStr = 'bg-indigo-600 text-white font-bold rounded-lg shadow-md shadow-indigo-600/20';
          } else if (marker === 'holiday') {
            classStr = 'text-rose-500 font-bold';
          } else if (marker === 'leave') {
            classStr = 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 rounded-lg';
          } else if (marker === 'event') {
            classStr = 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 rounded-lg';
          }

          return (
            <button
              key={day}
              className={`py-1 w-7 h-7 flex items-center justify-center mx-auto transition-all ${classStr}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 mt-4 pt-3 text-[9px] font-bold text-slate-500">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span>Leave</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>Events</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full text-rose-500 font-extrabold">•</span>
          <span>Holiday</span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                            6. QUICK ACTIONS                                */
/* -------------------------------------------------------------------------- */
interface QuickActionsProps {
  onActionClick: (title: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    { title: 'Create Employee', icon: Plus, color: 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100' },
    { title: 'Assign Shift', icon: CalendarRange, color: 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100' },
    { title: 'Approve Leave', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' },
    { title: 'Generate Report', icon: FileSpreadsheet, color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100' },
    { title: 'Add Device', icon: Clock, color: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100' },
    { title: 'Export Attendance', icon: ArrowUpRight, color: 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold font-poppins text-slate-800 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              onClick={() => onActionClick(act.title)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border border-transparent text-xs font-bold transition-all text-left dark:bg-slate-900/40 dark:text-slate-350 dark:hover:bg-slate-900/80 ${act.color}`}
            >
              <Icon size={14} className="shrink-0" />
              <span className="truncate">{act.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

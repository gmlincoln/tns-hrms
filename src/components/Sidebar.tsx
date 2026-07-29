import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, BarChart3, 
  UserCheck, CalendarDays, CalendarX, Clock, 
  Smartphone, Settings, FolderKanban, UserPlus, 
  Car, ChevronLeft, ChevronRight, Fingerprint, ChevronDown, ChevronUp, X
} from 'lucide-react';
import { TouchAndSolveLogo } from './TouchAndSolveLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileSidebarOpen?: boolean;
  setIsMobileSidebarOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileSidebarOpen = false,
  setIsMobileSidebarOpen,
}) => {
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(() => activeTab.startsWith('attendance'));
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(() => activeTab === 'employees' || activeTab.startsWith('employee-'));

  useEffect(() => {
    if (activeTab.startsWith('attendance')) {
      setIsAttendanceOpen(true);
    }
    if (activeTab === 'employees' || activeTab.startsWith('employee-')) {
      setIsEmployeeOpen(true);
    }
  }, [activeTab]);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'attendance', 
      name: 'Attendance', 
      icon: Fingerprint,
      subItems: [
        { id: 'attendance-list', name: 'List Of Attendance' },
        { id: 'attendance-individual', name: 'Individual Report' },
        { id: 'attendance-summary', name: 'Summary Report' },
        { id: 'attendance-sheet', name: 'Attendance Sheet' },
        { id: 'attendance-request', name: 'Request Attendance' }
      ]
    },
    { id: 'occupancy', name: 'Occupancy', icon: Users },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { 
      id: 'employees', 
      name: 'Employee', 
      icon: UserCheck,
      subItems: [
        { id: 'employee-create', name: 'Create Employee' },
        { id: 'employees', name: 'List of Employee' },
        { id: 'employee-chart', name: 'Employee Chart' }
      ]
    },
    { id: 'shift-management', name: 'Shift Management', icon: CalendarDays },
    { id: 'leave', name: 'Leave', icon: CalendarX },
    { id: 'overtime', name: 'Overtime', icon: Clock },
    { id: 'devices', name: 'Devices', icon: Smartphone },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'project-management', name: 'Project Management', icon: FolderKanban },
    { id: 'visitor-management', name: 'Visitor Management', icon: UserPlus },
    { id: 'parking-management', name: 'Parking Management', icon: Car },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-[#1E1B3A] text-slate-300 z-40 transition-all duration-300 ease-in-out border-r border-[#2d2854] flex flex-col lg:translate-x-0 ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        isCollapsed ? 'lg:w-20' : 'lg:w-64'
      } w-64`}
    >
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-[#2d2854] h-18">
        <TouchAndSolveLogo 
          isCollapsed={isCollapsed} 
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('dashboard');
            window.history.pushState(null, '', '/');
            if (setIsMobileSidebarOpen) setIsMobileSidebarOpen(false);
          }}
        />
        <button 
          onClick={() => {
            if (setIsMobileSidebarOpen && window.innerWidth < 1024) {
              setIsMobileSidebarOpen(false);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
          className={`p-1.5 rounded-lg bg-[#2d2854] hover:bg-indigo-600 text-white transition-colors duration-200 ${isCollapsed ? 'mx-auto mt-2' : ''}`}
        >
          <span className="lg:hidden"><X size={16} /></span>
          <span className="hidden lg:inline">{isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}</span>
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          if (item.subItems) {
            const isAttendance = item.id === 'attendance';
            const isEmployee = item.id === 'employees';
            
            const isOpen = isAttendance ? isAttendanceOpen : isEmployee ? isEmployeeOpen : false;
            const setIsOpen = isAttendance ? setIsAttendanceOpen : isEmployee ? setIsEmployeeOpen : () => {};
            
            const isSubItemActive = item.subItems.some(sub => sub.id === activeTab) || activeTab === item.id;
            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => {
                    if (isCollapsed) {
                      setIsCollapsed(false);
                      setIsOpen(true);
                    } else {
                      setIsOpen(!isOpen);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left font-medium text-sm group relative ${
                    isSubItemActive && !isOpen
                      ? 'bg-indigo-600/40 text-white border border-indigo-500/25'
                      : isOpen && isSubItemActive
                      ? 'bg-[#8B5CF6] text-white shadow-lg shadow-purple-600/30'
                      : 'hover:bg-[#2d2854] hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon size={19} className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${isSubItemActive ? 'text-white' : 'text-slate-400'}`} />
                    {!isCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    isOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 px-2 py-1 bg-slate-950 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                      {item.name}
                    </div>
                  )}
                </button>

                {/* Submenu Items */}
                {isOpen && !isCollapsed && (
                  <div className="pl-6 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {item.subItems.map(sub => {
                      const isSubActive = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setActiveTab(sub.id);
                            if (setIsMobileSidebarOpen) setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center px-4 py-2 rounded-lg text-left text-xs font-semibold transition-all duration-205 ${
                            isSubActive 
                              ? 'text-indigo-400 bg-indigo-500/10 font-bold border-l-2 border-indigo-500 pl-3' 
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                          }`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (setIsMobileSidebarOpen) setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 text-left font-medium text-sm group relative ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'hover:bg-[#2d2854] hover:text-white text-slate-400'
              }`}
            >
              <Icon size={19} className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {!isCollapsed && (
                <span className="truncate transition-opacity duration-200">{item.name}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-950 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                  {item.name}
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

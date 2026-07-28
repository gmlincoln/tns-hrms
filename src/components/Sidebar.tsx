import React from 'react';
import { 
  LayoutDashboard, ClipboardCheck, Users, BarChart3, 
  UserCheck, CalendarDays, CalendarX, Clock, 
  Smartphone, Settings, FolderKanban, UserPlus, 
  Car, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { TouchAndSolveLogo } from './TouchAndSolveLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
}) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', name: 'Attendance', icon: ClipboardCheck },
    { id: 'occupancy', name: 'Occupancy', icon: Users },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'employees', name: 'Employees', icon: UserCheck },
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
      className={`fixed top-0 left-0 h-screen bg-[#1E1B3A] text-slate-300 z-30 transition-all duration-300 ease-in-out border-r border-[#2d2854] flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-[#2d2854] h-18">
        <TouchAndSolveLogo isCollapsed={isCollapsed} />
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-lg bg-[#2d2854] hover:bg-indigo-600 text-white transition-colors duration-200 ${isCollapsed ? 'mx-auto mt-2' : ''}`}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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

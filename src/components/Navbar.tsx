import React, { useState } from 'react';
import {
  Search, Phone, Bell, MessageSquare, LayoutGrid, Calendar,
  ChevronDown, User, LogOut, Settings, Moon, Sun, Plus,
  Users, BarChart3, ShieldAlert, CheckCircle2
} from 'lucide-react';


interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  setActiveTab: (tab: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  searchQuery,
  setSearchQuery,
  setActiveTab,
  showToast,
  onLogout,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-07-28');

  // Close all other dropdowns helper
  const closeAllDropdownsExcept = (dropdownSetter: (val: boolean) => void) => {
    setProfileDropdownOpen(false);
    setQuickActionsOpen(false);
    setNotificationsOpen(false);
    setMessagesOpen(false);
    dropdownSetter(true);
  };

  const closeAll = () => {
    setProfileDropdownOpen(false);
    setQuickActionsOpen(false);
    setNotificationsOpen(false);
    setMessagesOpen(false);
  };

  // Mock notifications list
  const [notifications, setNotifications] = useState([
    { id: 'n1', text: 'Julia Akter Lipi signed in', time: '10 mins ago', type: 'info', read: false },
    { id: 'n2', text: 'Md. Golam Maula requested overtime', time: '1 hr ago', type: 'warning', read: false },
    { id: 'n3', text: 'Device Banani-Reader-1 is offline', time: '2 hrs ago', type: 'error', read: false },
    { id: 'n4', text: 'Samia Rahman requested leave', time: '5 hrs ago', type: 'info', read: false },
  ]);

  // Mock messages list
  const [messages, setMessages] = useState([
    { id: 'm1', sender: 'Abul Kalam Azad', text: 'Please approve the monthly audit report.', time: '20m ago', read: false },
    { id: 'm2', sender: 'Firdoushe Sultana', text: 'EVP meeting scheduled at 3 PM today.', time: '1h ago', read: false },
    { id: 'm3', sender: 'Monir Hossain', text: 'Shift schedules have been updated.', time: '3h ago', read: false },
  ]);

  const handleNotificationClick = (id: string, text: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    showToast(`Notification cleared: "${text}"`, 'success');
    closeAll();
  };

  const handleMessageClick = (id: string, sender: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    showToast(`Message from ${sender} marked as read.`, 'success');
    closeAll();
  };

  const handleQuickAction = (tabId: string, actionName: string) => {
    setActiveTab(tabId);
    showToast(`Navigated to ${actionName}.`, 'success');
    closeAll();
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const unreadMessagesCount = messages.filter(m => !m.read).length;

  return (
    <header className="h-18 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between transition-colors duration-300">
      {/* Left Search Bar */}
      <div className="relative w-72 md:w-96">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search employee by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-slate-200 transition-all"
        />
      </div>

      {/* Right Content Options */}
      <div className="flex items-center gap-4">
        {/* Phone Shortcut */}
        <a
          href="tel:+8801958227213"
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100 dark:border-indigo-900/40 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
        >
          <Phone size={14} />
          <span>+88 01958 227213</span>
        </a>


        {/* Quick Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => quickActionsOpen ? setQuickActionsOpen(false) : closeAllDropdownsExcept(setQuickActionsOpen)}
            className={`p-2 rounded-xl transition-all relative ${quickActionsOpen
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            title="Quick Actions"
          >
            <LayoutGrid size={18} />
          </button>

          {quickActionsOpen && (
            <div className="absolute right-0 mt-3.5 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-xl py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-1.5 border-b border-slate-100 dark:border-slate-700/50">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Quick Actions</p>
              </div>
              <button
                onClick={() => handleQuickAction('employees', 'Register Employee')}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5 transition-colors"
              >
                <Plus size={14} className="text-emerald-500" /> Register Employee
              </button>
              <button
                onClick={() => handleQuickAction('shift-management', 'Schedule Shift')}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5 transition-colors"
              >
                <Calendar size={14} className="text-indigo-500" /> Schedule Shift
              </button>
              <button
                onClick={() => handleQuickAction('leave', 'Apply Leave')}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5 transition-colors"
              >
                <Users size={14} className="text-amber-500" /> Apply Leave
              </button>
              <button
                onClick={() => handleQuickAction('reports', 'Generate Report')}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5 transition-colors"
              >
                <BarChart3 size={14} className="text-rose-500" /> Generate Report
              </button>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          title="Toggle Day/Night Mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => notificationsOpen ? setNotificationsOpen(false) : closeAllDropdownsExcept(setNotificationsOpen)}
            className={`p-2 rounded-xl transition-all relative ${notificationsOpen
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center border border-white dark:border-slate-900">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3.5 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-xl py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-1.5 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Notifications</p>
                {notifications.length > 0 && (
                  <button
                    onClick={() => { setNotifications([]); showToast('All notifications cleared.', 'success'); closeAll(); }}
                    className="text-[9px] font-bold text-indigo-600 dark:text-indigo-450 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
                {notifications.length === 0 ? (
                  <div className="px-4 py-4 text-center text-xs text-slate-400 dark:text-slate-500">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(n => (
                    <button
                      key={n.id}
                      onClick={() => handleNotificationClick(n.id, n.text)}
                      className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 flex items-start gap-2.5 transition-colors"
                    >
                      <div className="mt-0.5">
                        {n.type === 'error' ? <ShieldAlert size={14} className="text-rose-500" /> : <CheckCircle2 size={14} className="text-emerald-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 line-clamp-2">{n.text}</p>
                        <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">{n.time}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Messages Dropdown */}
        <div className="relative">
          <button
            onClick={() => messagesOpen ? setMessagesOpen(false) : closeAllDropdownsExcept(setMessagesOpen)}
            className={`p-2 rounded-xl transition-all relative ${messagesOpen
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            title="Messages"
          >
            <MessageSquare size={18} />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border border-white dark:border-slate-900"></span>
            )}
          </button>

          {messagesOpen && (
            <div className="absolute right-0 mt-3.5 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-xl py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-1.5 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Inbox</p>
                {messages.length > 0 && (
                  <button
                    onClick={() => { setMessages([]); showToast('All messages marked as read.', 'success'); closeAll(); }}
                    className="text-[9px] font-bold text-indigo-600 dark:text-indigo-450 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
                {messages.length === 0 ? (
                  <div className="px-4 py-4 text-center text-xs text-slate-400 dark:text-slate-500">
                    No new messages
                  </div>
                ) : (
                  messages.map(m => (
                    <button
                      key={m.id}
                      onClick={() => handleMessageClick(m.id, m.sender)}
                      className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 flex flex-col gap-0.5 transition-colors"
                    >
                      <div className="flex justify-between items-baseline w-full">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{m.sender}</span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500">{m.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{m.text}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

        {/* User Profile Info Dropdown */}
        <div className="relative">
          <button
            onClick={() => profileDropdownOpen ? setProfileDropdownOpen(false) : closeAllDropdownsExcept(setProfileDropdownOpen)}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            title="User Profile"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop"
              alt="Golam Maula Lincoln"
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/40 transition-all"
            />
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                Golam Maula Lincoln
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Admin • Site Admin
              </span>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-3.5 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-xl py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/50 md:hidden">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Golam Maula Lincoln</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Admin • Site Admin</p>
              </div>
              <button
                onClick={() => handleQuickAction('profile', 'My Profile')}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5 transition-colors"
              >
                <User size={14} /> My Profile
              </button>
              <button
                onClick={() => handleQuickAction('settings', 'Settings')}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5 transition-colors"
              >
                <Settings size={14} /> Settings
              </button>
              <hr className="my-1.5 border-slate-100 dark:border-slate-700/50" />
              <button
                onClick={() => { onLogout(); closeAll(); }}
                className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2.5 transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Date Picker Input */}
        <div className="relative flex items-center border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 bg-slate-55 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <Calendar size={14} className="mr-2 text-indigo-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => { setSelectedDate(e.target.value); showToast(`Date updated to: ${e.target.value}`, 'success'); }}
            className="text-xs font-semibold bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};




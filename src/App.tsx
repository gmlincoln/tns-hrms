import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { StatsCards } from './components/StatsCards';
import { DepartmentAttendance } from './components/DepartmentAttendance';
import { AttendanceFeed } from './components/AttendanceFeed';
import type { FeedItem } from './components/AttendanceFeed';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { 
  RecentActivities, UpcomingLeaves, TodaysBirthdays, 
  ShiftOverview, CalendarWidget, QuickActions 
} from './components/DashboardWidgets';
import { 
  CheckCircle, AlertCircle, RefreshCw, X 
} from 'lucide-react';
import {
  AttendancePage, OccupancyPage, ReportsPage, EmployeesPage,
  ShiftManagementPage, LeavePage, OvertimePage, DevicesPage,
  SettingsPage, ProjectManagementPage, VisitorManagementPage,
  ParkingManagementPage
} from './components/WorkablePages';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Centralized employees list as single source of truth
  const [employees, setEmployees] = useState([
    { id: '101', name: 'Golam Maula Lincoln', role: 'Site Administrator', dept: 'HR & Admin', email: 'lincoln@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop' },
    { id: '102', name: 'Kazi Fahmid Hassan Rafi', role: 'System Developer', dept: 'IT Department', email: 'rafi@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&fit=crop' },
    { id: '103', name: 'Prosunjit Roy', role: 'Senior Accountant', dept: 'Finance & Accounts', email: 'prosun@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop' },
    { id: '104', name: 'Samia Rahman', role: 'HR Executive', dept: 'HR & Admin', email: 'samia@touchandsolve.com', status: 'On Leave', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop' },
    { id: '105', name: 'Abul Kalam Azad', role: 'Chief Executive Officer', dept: 'Management', email: 'azad@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&fit=crop' },
    { id: '106', name: 'Firdoushe Sultana', role: 'Executive Vice President', dept: 'Management', email: 'firdoushe@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&fit=crop' },
    { id: '107', name: 'Julia Akter Lipi', role: 'Finince Director', dept: 'Finance & Accounts', email: 'julia@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&fit=crop' },
    { id: '108', name: 'Md. Golam Maula', role: 'Engineering Manager', dept: 'Engineering', email: 'golam@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop' },
    { id: '109', name: 'Monir Hossain', role: 'Asst Manager', dept: 'Management', email: 'monir@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop' },
    { id: '110', name: 'Mohiminul Islam', role: 'Asst Manager', dept: 'Management', email: 'mohiminul@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop' },
    { id: '111', name: 'Md. Akmot Ullah (Sohag)', role: 'Senior Executive', dept: 'HR & Admin', email: 'akmot@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&fit=crop' },
    { id: '112', name: 'Md. Aminur Rahman', role: 'Senior Executive', dept: 'HR & Admin', email: 'aminur@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=256&h=256&fit=crop' },
    { id: '113', name: 'Rifah Tasnia', role: 'Sr. Executive', dept: 'HR & Admin', email: 'rifah@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop' },
    { id: '114', name: 'TTC Admin', role: 'junior executive', dept: 'IT Department', email: 'ttcadmin@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop' },
    { id: '115', name: 'Md. Abdullah Al Mahfuz', role: 'App Developer', dept: 'Software Department', email: 'mahfuz@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&fit=crop' },
    { id: '116', name: 'Ashraful Anam Alve', role: 'Developer', dept: 'Software Department', email: 'alve@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=256&h=256&fit=crop' },
    { id: '117', name: 'Kamrul Islam Niloy', role: 'Developer', dept: 'Software Department', email: 'niloy@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=256&h=256&fit=crop' },
    { id: '118', name: 'Abu Shahadat Md Tanvir', role: 'Support Engineer', dept: 'Support Department', email: 'tanvir@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?q=80&w=256&h=256&fit=crop' },
    { id: '119', name: 'MD Faruk Hosen', role: 'Support Engineers', dept: 'Support Department', email: 'faruk@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?q=80&w=256&h=256&fit=crop' },
    { id: '120', name: 'Md Shariul Islam Sagar', role: 'Teacher', dept: 'Education', email: 'sagar@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=256&h=256&fit=crop' },
    { id: '121', name: 'Monirul Islam', role: 'Teacher', dept: 'Education', email: 'monirul@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop' },
    { id: '122', name: 'Amit Podder', role: 'Graphic Designer', dept: 'Creative', email: 'amit@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=256&h=256&fit=crop' },
    { id: '123', name: 'Md Arafat Hossain', role: 'Trainer', dept: 'Training', email: 'arafat@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&fit=crop' },
    { id: '124', name: 'Md Riyadul Islam Ratul', role: 'Trainer', dept: 'Training', email: 'ratul@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=256&h=256&fit=crop' },
    { id: '125', name: 'Md.Kawsar Uddin', role: 'Communication Officer', dept: 'PR & Communications', email: 'kawsar@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=256&h=256&fit=crop' },
    { id: '126', name: 'Sayad Golam Morshed', role: 'Admission Officer', dept: 'Education', email: 'morshed@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=256&h=256&fit=crop' },
    { id: '127', name: 'Labibul Hasan', role: '', dept: 'HR & Admin', email: 'labibul@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&fit=crop' },
    { id: '128', name: 'Md Abdur Rahim', role: 'Peon', dept: 'Support Department', email: 'rahim@touchandsolve.com', status: 'Active', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&fit=crop' },
  ]);



  // Simulated Live Feed punches based on real employees
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: 'punch-1',
      name: 'Kazi Fahmid Hassan Rafi',
      employeeId: '102',
      department: 'IT Department',
      location: 'Dhaka HQ',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&fit=crop',
      type: 'IN',
      method: 'Face',
      time: '06:37 PM',
      timeAgo: 'moments ago',
    },
    {
      id: 'punch-2',
      name: 'Kazi Fahmid Hassan Rafi',
      employeeId: '102',
      department: 'IT Department',
      location: 'Paribagh',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&fit=crop',
      type: 'OUT',
      method: 'Face',
      time: '06:35 PM',
      timeAgo: 'moments ago',
    },
    {
      id: 'punch-3',
      name: 'Golam Maula Lincoln',
      employeeId: '101',
      department: 'HR & Admin',
      location: 'Dhaka HQ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop',
      type: 'IN',
      method: 'Face',
      time: '06:36 PM',
      timeAgo: 'moments ago',
    },
    {
      id: 'punch-4',
      name: 'Prosunjit Roy',
      employeeId: '103',
      department: 'Finance & Accounts',
      location: 'Dhaka HQ',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop',
      type: 'IN',
      method: 'Face',
      time: '06:35 PM',
      timeAgo: 'moments ago',
    },
    {
      id: 'punch-5',
      name: 'Prosunjit Roy',
      employeeId: '103',
      department: 'Finance & Accounts',
      location: 'Paribagh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop',
      type: 'OUT',
      method: 'Face',
      time: '06:35 PM',
      timeAgo: 'moments ago',
    },
    {
      id: 'punch-6',
      name: 'Julia Akter Lipi',
      employeeId: '107',
      department: 'Finance & Accounts',
      location: 'Paribagh',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&fit=crop',
      type: 'IN',
      method: 'Fingerprint',
      time: '06:32 PM',
      timeAgo: '6 min ago',
    },
  ]);


  // Handle dark mode classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);


  // Simulate incoming live logs based on active employees in roster
  useEffect(() => {
    const methods: Array<'Face' | 'Fingerprint' | 'RFID' | 'GPS'> = ['Face', 'Fingerprint', 'RFID', 'GPS'];
    const types: Array<'IN' | 'OUT'> = ['IN', 'OUT'];
    const locations = ['Dhaka HQ', 'Paribagh', 'Banani Branch', 'Chittagong Office'];

    const interval = setInterval(() => {
      if (employees.length === 0) return;
      const randomEmp = employees[Math.floor(Math.random() * employees.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newPunch: FeedItem = {
        id: `punch-sim-${Date.now()}`,
        name: randomEmp.name,
        employeeId: randomEmp.id,
        department: randomEmp.dept || 'General',
        location: locations[Math.floor(Math.random() * locations.length)],
        avatar: randomEmp.avatar,
        type: types[Math.floor(Math.random() * types.length)],
        method: methods[Math.floor(Math.random() * methods.length)],
        time: timeStr,
        timeAgo: 'moments ago',
      };

      setFeedItems((prev) => [newPunch, ...prev.slice(0, 9)]);
      showToast(`New Punch: ${newPunch.name} punched ${newPunch.type}`, 'info');
    }, 22000); // Trigger punch every 22 seconds

    return () => clearInterval(interval);
  }, [employees]);


  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleBirthdayWish = (name: string) => {
    showToast(`Birthday wish sent to ${name}! 💌`, 'success');
  };

  const handleQuickAction = (title: string) => {
    showToast(`Quick Action: "${title}" triggered successfully!`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex">
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-xl shadow-lg border flex items-center justify-between gap-3 min-w-[280px] animate-in slide-in-from-bottom-5 fade-in duration-200 ${
              toast.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-250 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-900'
                : toast.type === 'warning'
                ? 'bg-amber-50 text-amber-800 border-amber-250 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-900'
                : 'bg-indigo-50 text-indigo-800 border-indigo-250 dark:bg-indigo-950/80 dark:text-indigo-300 dark:border-indigo-900'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold">
              {toast.type === 'success' && <CheckCircle size={16} />}
              {toast.type === 'warning' && <AlertCircle size={16} />}
              {toast.type === 'info' && <RefreshCw size={16} className="animate-spin" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-350"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Top Navbar */}
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          searchQuery={searchQuery}
          setSearchQuery={(val) => {
            setSearchQuery(val);
            if (activeTab !== 'employees' && val !== '') {
              setActiveTab('employees');
            }
          }}
          setActiveTab={setActiveTab}
          showToast={showToast}
        />

        {/* Dashboard Pages */}
        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
          {activeTab === 'dashboard' && (
            <>
              {/* Header Title */}
              <div>
                <h1 className="text-3xl font-extrabold font-manrope text-slate-800 dark:text-white tracking-tight">
                  Attendance
                </h1>
                <p className="text-sm text-slate-550 dark:text-slate-400 mt-1 font-medium">
                  77 employees scheduled today
                </p>
              </div>

              {/* KPI Cards Section */}
              <StatsCards />

              {/* Central Dynamic Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {/* Department-wise Attendance */}
                <div className="lg:col-span-2">
                  <DepartmentAttendance />
                </div>
                {/* Live Attendance Feed */}
                <div className="lg:col-span-1">
                  <AttendanceFeed feedItems={feedItems} />
                </div>
              </div>

              {/* Rich Analytics charts */}
              <AnalyticsCharts />

              {/* Auxiliary Widgets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RecentActivities employees={employees} />
                <UpcomingLeaves employees={employees} />
                <TodaysBirthdays onWishClick={handleBirthdayWish} employees={employees} />
                <ShiftOverview />
                <CalendarWidget />
                <QuickActions onActionClick={handleQuickAction} />
              </div>
            </>
          )}

          {activeTab === 'attendance' && <AttendancePage showToast={showToast} />}
          {activeTab === 'occupancy' && <OccupancyPage showToast={showToast} />}
          {activeTab === 'reports' && <ReportsPage showToast={showToast} />}
          {activeTab === 'employees' && (
            <EmployeesPage 
              showToast={showToast} 
              employees={employees}
              setEmployees={setEmployees}
              externalSearchQuery={searchQuery}
              setExternalSearchQuery={setSearchQuery}
            />
          )}

          {activeTab === 'shift-management' && <ShiftManagementPage showToast={showToast} />}
          {activeTab === 'leave' && <LeavePage showToast={showToast} />}
          {activeTab === 'overtime' && <OvertimePage showToast={showToast} />}
          {activeTab === 'devices' && <DevicesPage showToast={showToast} />}
          {activeTab === 'settings' && <SettingsPage showToast={showToast} />}
          {activeTab === 'project-management' && <ProjectManagementPage showToast={showToast} />}
          {activeTab === 'visitor-management' && <VisitorManagementPage showToast={showToast} />}
          {activeTab === 'parking-management' && <ParkingManagementPage showToast={showToast} />}
        </main>

        {/* Footer */}
        <footer className="py-6 text-center border-t border-slate-100 dark:border-slate-800/85 mt-auto">
          <p className="text-xs text-slate-400 dark:text-slate-550 font-medium">
            &copy; 2026 Touch & Solve. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

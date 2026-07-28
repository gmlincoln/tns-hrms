import React, { useState, useMemo } from 'react';
import { 
  Search, Download, Plus, FileSpreadsheet, Trash, X,
  Mail, Phone, MapPin, Calendar, Camera, Shield, Award
} from 'lucide-react';

/* Helper toast trigger */
interface WorkablePageProps {
  showToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
  externalSearchQuery?: string;
  setExternalSearchQuery?: (val: string) => void;
  employees?: any[];
  setEmployees?: React.Dispatch<React.SetStateAction<any[]>>;
  initialShowAddForm?: boolean;
}



/* ========================================================================== */
/*                           1. ATTENDANCE LOGS                               */
/* ========================================================================== */
export const AttendancePage: React.FC<WorkablePageProps> = ({ showToast, employees = [] }) => {
  const [searchDate, setSearchDate] = useState('2026-07-28');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleExport = () => {
    showToast('Attendance Log exported to Excel (XLSX) successfully!', 'success');
  };

  const handleSearch = () => {
    showToast('Filtered daily attendance records.', 'success');
  };

  const records = useMemo(() => {
    const locations = ['Dhaka HQ', 'Paribagh', 'Remote', 'Banani Branch'];
    const methods = ['Face', 'Fingerprint', 'RFID', 'GPS'];
    
    const getHierarchyWeight = (role: string) => {
      const lowerRole = role.toLowerCase();
      if (lowerRole.includes('chief executive officer') || lowerRole.includes('ceo')) return 1;
      if (lowerRole.includes('executive vice president') || lowerRole.includes('evp')) return 2;
      if (lowerRole.includes('director')) return 3;
      if (lowerRole.includes('manager')) return 4;
      if (lowerRole.includes('administrator') || lowerRole.includes('admin')) return 5;
      if (lowerRole.includes('developer') || lowerRole.includes('engineer')) return 6;
      if (lowerRole.includes('designer') || lowerRole.includes('trainer') || lowerRole.includes('teacher')) return 7;
      if (lowerRole.includes('executive')) return 8;
      if (lowerRole.includes('officer') || lowerRole.includes('assistant')) return 9;
      if (lowerRole.includes('peon')) return 10;
      return 100;
    };

    const sortedEmployees = [...employees].sort((a, b) => {
      return getHierarchyWeight(a.role || '') - getHierarchyWeight(b.role || '');
    });

    return sortedEmployees.map((emp, idx) => {
      let status = 'On Time';
      let time = '08:45 AM';
      let method = methods[idx % methods.length];
      let loc = locations[idx % locations.length];

      if (emp.status === 'On Leave') {
        status = 'On Leave';
        time = '-';
        method = '-';
        loc = '-';
      } else if (emp.status === 'Inactive') {
        status = 'Absent';
        time = '-';
        method = '-';
        loc = '-';
      } else if (idx % 6 === 0) {
        status = 'Late';
        time = '09:15 AM';
      } else if (idx % 11 === 0) {
        status = 'Absent';
        time = '-';
        method = '-';
        loc = '-';
      }

      return {
        id: emp.id,
        empId: emp.id,
        name: emp.name,
        dept: emp.dept || 'HR & Admin',
        role: emp.role || 'Employee',
        time,
        status,
        method,
        loc,
        date: '2026-07-28'
      };
    });
  }, [employees]);

  const filtered = records.filter(r => {
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    const matchesDate = !searchDate || r.date === searchDate;
    return matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6 font-manrope">
      {/* Daily Attendance Report Bar */}
      <div className="w-full bg-[#8B5CF6] text-white text-center py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-sm">
        Daily Attendance Report
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-5">
        {/* Controls / Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Date</label>
            <input 
              type="date" 
              value={searchDate}
              onChange={e => setSearchDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-slate-200 font-semibold"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Status</label>
            <select 
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-slate-200 font-semibold cursor-pointer"
            >
              <option value="All">Select a status</option>
              <option value="On Time">On Time</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
          <button 
            onClick={handleSearch}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 hover:scale-[1.01]"
          >
            Search
          </button>
        </div>

        {/* Action Header */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4 flex-wrap gap-3">
          <p className="text-xs font-bold text-slate-400">Search Results ({filtered.length} found)</p>
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download size={14} /> Export Logs
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 text-slate-400 pb-2 font-semibold">
                <th className="py-3 px-2">Employee ID</th>
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Designation</th>
                <th className="py-3 px-2">Time</th>
                <th className="py-3 px-2">Location</th>
                <th className="py-3 px-2">Method</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-750">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">No attendance records found for this date/status.</td>
                </tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="text-slate-700 dark:text-slate-350 hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                    <td className="py-3 px-2 font-semibold">#{r.empId}</td>
                    <td className="py-3 px-2 font-bold">{r.name}</td>
                    <td className="py-3 px-2 font-semibold text-indigo-600 dark:text-indigo-400">{r.role}</td>
                    <td className="py-3 px-2 font-medium">{r.time}</td>
                    <td className="py-3 px-2">{r.loc}</td>
                    <td className="py-3 px-2">
                      {r.method !== '-' && (
                        <span className="bg-slate-100 dark:bg-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">{r.method}</span>
                      )}
                      {r.method === '-' && '-'}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        r.status === 'On Time' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400' :
                        r.status === 'Late' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400' :
                        r.status === 'Absent' ? 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400' :
                        'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                             2. OCCUPANCY                                   */
/* ========================================================================== */
export const OccupancyPage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const sections = [
    { name: 'Floor 1 - HR & Admin', capacity: 30, occupied: 15, color: 'bg-emerald-500' },
    { name: 'Floor 2 - Engineering', capacity: 50, occupied: 45, color: 'bg-indigo-500' },
    { name: 'Floor 3 - Accounts & Management', capacity: 25, occupied: 12, color: 'bg-amber-500' },
    { name: 'Meeting Room Alpha', capacity: 10, occupied: 8, color: 'bg-rose-500' },
    { name: 'Cafeteria', capacity: 60, occupied: 22, color: 'bg-blue-500' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Occupancy & Floor Plan</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Live workspace seat layouts and floor densities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map((sec, idx) => {
          const percentage = Math.round((sec.occupied / sec.capacity) * 100);
          return (
            <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Zone</span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  percentage > 85 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {percentage > 85 ? 'Crowded' : 'Normal'}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-white">{sec.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sec.occupied} of {sec.capacity} seats occupied</p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-100 dark:bg-slate-750 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${sec.color} rounded-full`} style={{ width: `${percentage}%` }} />
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span>{percentage}% Occupancy</span>
                  <span>{sec.capacity - sec.occupied} Free</span>
                </div>
              </div>

              <button 
                onClick={() => showToast(`Opening interactive desk map for ${sec.name}`)}
                className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition-all text-slate-700 dark:text-slate-300"
              >
                View Seat Plan Map
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                              3. REPORTS                                    */
/* ========================================================================== */
export const ReportsPage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [reportType, setReportType] = useState('attendance_summary');
  const [format, setFormat] = useState('PDF');

  const handleGenerate = () => {
    showToast(`Generating ${reportType.replace('_', ' ')} in ${format} format...`, 'info');
    setTimeout(() => {
      showToast('Report generated! Click download button to retrieve document.', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Reports & Audits</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Compile attendance, overtime and leaves data sheets</p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-sm max-w-xl space-y-5">
        <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Compile Dynamic Report</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Report Type</label>
            <select 
              value={reportType}
              onChange={e => setReportType(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-55 border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium"
            >
              <option value="attendance_summary">Daily Attendance Summary</option>
              <option value="late_punches">Late Punches Register</option>
              <option value="overtime_sheet">Overtime Billing Sheets</option>
              <option value="leave_roster">Annual Leaves Roster</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Output Format</label>
            <select 
              value={format}
              onChange={e => setFormat(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-55 border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium"
            >
              <option value="PDF">Acrobat Document (PDF)</option>
              <option value="CSV">Comma Separated values (CSV)</option>
              <option value="XLSX">Microsoft Excel Sheet (XLSX)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">From Date</label>
            <input type="date" defaultValue="2026-07-01" className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">To Date</label>
            <input type="date" defaultValue="2026-07-28" className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" />
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
        >
          <FileSpreadsheet size={16} /> Compile and Download Document
        </button>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                             4. EMPLOYEES                                   */
/* ========================================================================== */
export const EmployeesPage: React.FC<WorkablePageProps> = ({ 
  showToast, 
  externalSearchQuery = '', 
  setExternalSearchQuery,
  employees: propEmployees,
  setEmployees: propSetEmployees,
  initialShowAddForm = false
}) => {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(initialShowAddForm);

  // Sync local search and external search
  const activeSearch = setExternalSearchQuery ? externalSearchQuery : search;
  const handleSearchChange = (val: string) => {
    if (setExternalSearchQuery) {
      setExternalSearchQuery(val);
    } else {
      setSearch(val);
    }
  };

  // Initial list fallback
  const [localEmployees, setLocalEmployees] = useState([
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


  const employees = propEmployees || localEmployees;
  const setEmployees = propSetEmployees || setLocalEmployees;

  // Form states
  const [newName, setNewName] = useState('');

  const [newRole, setNewRole] = useState('');
  const [newDept, setNewDept] = useState('HR & Admin');
  const [newEmail, setNewEmail] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }
    const newEmp = {
      id: (Date.now() % 1000).toString(),
      name: newName,
      role: newRole,
      dept: newDept,
      email: newEmail,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&fit=crop'
    };
    setEmployees([...employees, newEmp]);
    showToast(`New employee "${newName}" registered successfully!`, 'success');
    setShowAddModal(false);
    // clear form
    setNewName('');
    setNewRole('');
    setNewEmail('');
  };

  const handleDelete = (id: string, name: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    showToast(`Employee "${name}" deleted from roster.`, 'warning');
  };

  // Position rank mapping for sorting (lower numbers indicate higher hierarchy/seniority)
  const positionRank: { [key: string]: number } = {
    'Chief Executive Officer': 1,
    'Site Administrator': 2,
    'Executive Vice President': 3,
    'Finince Director': 4,
    'Engineering Manager': 5,
    'Asst Manager': 6,
    'Senior Accountant': 7,
    'Senior Executive': 8,
    'Sr. Executive': 8,
    'HR Executive': 9,
    'junior executive': 10,
    'App Developer': 11,
    'System Developer': 12,
    'Developer': 13,
    'Support Engineer': 14,
    'Support Engineers': 14,
    'Teacher': 15,
    'Graphic Designer': 16,
    'Trainer': 17,
    'Communication Officer': 18,
    'Admission Officer': 19,
    '': 20, // Blank/intern positions
    'Peon': 21,
  };

  const getRank = (role: string) => {
    const norm = role.trim();
    if (norm in positionRank) return positionRank[norm];
    
    // Fuzzy fallbacks for dynamically added positions
    const lower = norm.toLowerCase();
    if (lower.includes('ceo') || lower.includes('chief')) return 1;
    if (lower.includes('vice president') || lower.includes('vp')) return 3;
    if (lower.includes('director')) return 4;
    if (lower.includes('manager')) return 5;
    if (lower.includes('senior')) return 8;
    if (lower.includes('executive')) return 9;
    if (lower.includes('developer')) return 13;
    if (lower.includes('engineer')) return 14;
    if (lower.includes('teacher')) return 15;
    if (lower.includes('trainer')) return 17;
    return 99;
  };

  const filtered = employees
    .filter(emp => emp.name.toLowerCase().includes(activeSearch.toLowerCase()) || emp.id.includes(activeSearch))
    .sort((a, b) => getRank(a.role) - getRank(b.role));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Employee Directory</h1>
          <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">Manage active personnel, profiles and credentials</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus size={14} /> Add Employee
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by ID or name..."
            value={activeSearch}
            onChange={e => handleSearchChange(e.target.value)}

            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-55 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200"
          />
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(emp => (
            <div key={emp.id} className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-between hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/10" />
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">{emp.name}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{emp.role} • {emp.dept}</p>
                  <p className="text-[10px] text-slate-400 font-semibold">{emp.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20'
                }`}>
                  {emp.status}
                </span>
                <button 
                  onClick={() => handleDelete(emp.id, emp.name)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/55 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
            <h3 className="font-bold text-base text-slate-800 dark:text-white mb-4">Register New Employee</h3>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Full Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                  required
                  placeholder="e.g. Samia Rahman"
                  className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Designation / Role</label>
                <input 
                  type="text" 
                  value={newRole} 
                  onChange={e => setNewRole(e.target.value)} 
                  required
                  placeholder="e.g. HR Manager"
                  className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Department</label>
                  <select 
                    value={newDept} 
                    onChange={e => setNewDept(e.target.value)}
                    className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium"
                  >
                    <option value="HR & Admin">HR & Admin</option>
                    <option value="Finance & Accounts">Finance & Accounts</option>
                    <option value="IT Department">IT Department</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Corporate Email</label>
                  <input 
                    type="email" 
                    value={newEmail} 
                    onChange={e => setNewEmail(e.target.value)} 
                    required
                    placeholder="name@touchandsolve.com"
                    className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" 
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ========================================================================== */
/*                          5. SHIFT MANAGEMENT                               */
/* ========================================================================== */
export const ShiftManagementPage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [selectedShift, setSelectedShift] = useState('Morning');
  
  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Successfully updated rosters for the ${selectedShift} shift!`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Shift Management</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Assign active office rosters and schedule hours</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Assigner */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4 lg:col-span-1">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Roster Allocator</h3>
          <form onSubmit={handleAssign} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Select Target Shift</label>
              <select 
                value={selectedShift}
                onChange={e => setSelectedShift(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-55 border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium"
              >
                <option value="Morning">Morning Shift (06:00 AM - 02:00 PM)</option>
                <option value="Evening">Evening Shift (02:00 PM - 10:00 PM)</option>
                <option value="Night">Night Shift (10:00 PM - 06:00 AM)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Assign Employee ID</label>
              <input type="text" placeholder="e.g. 55702" className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" required />
            </div>

            <button 
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Update Allocation
            </button>
          </form>
        </div>

        {/* Shift roster */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4 lg:col-span-2">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Roster Calendar View</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            <div className="py-3 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">Morning (25 Employees)</span>
              <span className="text-slate-400 font-medium">Samia R, Rafi K, +23 others</span>
            </div>
            <div className="py-3 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">Evening (30 Employees)</span>
              <span className="text-slate-400 font-medium">Asif R, Prosunjit R, +28 others</span>
            </div>
            <div className="py-3 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">Night (22 Employees)</span>
              <span className="text-slate-400 font-medium">Anik B, Zahid K, +20 others</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                                6. LEAVE                                    */
/* ========================================================================== */
export const LeavePage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [balance] = useState({ sick: 8, annual: 14, casual: 6 });
  const [type, setType] = useState('Sick');
  
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Leave application submitted successfully! Pending approval.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Leave Planner</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Submit leave forms and review quota statements</p>
      </div>

      {/* Balance Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Sick Leaves Left</p>
          <span className="text-2xl font-bold font-manrope mt-1 block">{balance.sick} Days</span>
        </div>
        <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Annual Leaves Left</p>
          <span className="text-2xl font-bold font-manrope mt-1 block">{balance.annual} Days</span>
        </div>
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border border-amber-100 dark:border-amber-900/30 rounded-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Casual Leaves Left</p>
          <span className="text-2xl font-bold font-manrope mt-1 block">{balance.casual} Days</span>
        </div>
      </div>

      {/* Leave Application */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm max-w-xl space-y-4">
        <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Apply for Time Off</h3>
        <form onSubmit={handleApply} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Leave Category</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value)}
                className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium"
              >
                <option value="Sick">Sick Leave</option>
                <option value="Annual">Annual Leave</option>
                <option value="Casual">Casual Leave</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Total Days</label>
              <input type="number" defaultValue="1" min="1" className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Start Date</label>
              <input type="date" required className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">End Date</label>
              <input type="date" required className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                                7. OVERTIME                                 */
/* ========================================================================== */
export const OvertimePage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [logs] = useState([
    { id: 1, employee: 'Prosunjit Roy', hours: '4.5 hrs', date: '2026-07-27', status: 'Approved' },
    { id: 2, employee: 'Anik Barua', hours: '2.0 hrs', date: '2026-07-26', status: 'Pending' },
  ]);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Overtime claim logged! Sent to Site Administrator for review.', 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Overtime Roster</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review worked overtime claims and record hourly sheets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Logger */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm lg:col-span-1 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Submit OT claim</h3>
          <form onSubmit={handleClaim} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Employee ID</label>
              <input type="text" placeholder="e.g. 50132" className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Claimed Hours</label>
              <input type="number" step="0.5" placeholder="e.g. 3.5" className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" required />
            </div>
            <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
              Log Hours
            </button>
          </form>
        </div>

        {/* Logs */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm lg:col-span-2 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Overtime Claims Log</h3>
          <div className="space-y-3.5">
            {logs.map(log => (
              <div key={log.id} className="flex items-center justify-between p-3.5 bg-slate-50/70 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-250">{log.employee}</h4>
                  <span className="text-[10px] text-slate-500 font-medium">{log.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{log.hours}</span>
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    log.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                                8. DEVICES                                  */
/* ========================================================================== */
export const DevicesPage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [devices] = useState([
    { name: 'Terminal A - Face Scanner', ip: '192.168.1.101', status: 'Online', loc: 'Dhaka HQ entrance' },
    { name: 'Terminal B - Fingerprint Reader', ip: '192.168.1.102', status: 'Online', loc: 'Paribagh Entry Gate' },
    { name: 'Terminal C - RFID Scanner', ip: '192.168.1.103', status: 'Offline', loc: 'Level-4 Server Room' }
  ]);

  const handlePing = (name: string) => {
    showToast(`Pinging ${name}... Response received (12ms)`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Active Biometric Devices</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Monitor connectivity status of face scans, RFID gateways and logs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {devices.map((dev, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className={`w-2.5 h-2.5 rounded-full ${dev.status === 'Online' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className="text-[10px] text-slate-400 font-semibold">{dev.ip}</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">{dev.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{dev.loc}</p>
            </div>
            <button 
              onClick={() => handlePing(dev.name)}
              className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-750 dark:text-slate-350 transition-colors"
            >
              Ping Terminal Connection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                                9. SETTINGS                                 */
/* ========================================================================== */
export const SettingsPage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [officeStart, setOfficeStart] = useState('09:00 AM');
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('HR Gateways settings saved successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Admin Settings</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Configure workspace attendance buffers, alerts and notifications</p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-sm max-w-xl space-y-5">
        <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Late Buffers & Roster Rules</h3>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Standard Office Start</label>
              <input 
                type="text" 
                value={officeStart}
                onChange={e => setOfficeStart(e.target.value)}
                className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Late Threshold Buffer (mins)</label>
              <input type="number" defaultValue="15" className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-500 uppercase block">Global Alerts</label>
            <div className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
              <span className="text-xs text-slate-700 dark:text-slate-350">Alert Site Admin on terminal connectivity drops</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
              <span className="text-xs text-slate-700 dark:text-slate-350">Send weekly attendance reports to department leads</span>
            </div>
          </div>

          <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
            Save System Settings
          </button>
        </form>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                          10. PROJECT MANAGEMENT                            */
/* ========================================================================== */
export const ProjectManagementPage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [projects] = useState([
    { name: 'Touch & Solve ERP v2', lead: 'Asif Aminur Rashid', progress: 75, status: 'In Progress' },
    { name: 'Biometric Gateway API Integration', lead: 'Kazi Fahmid Hassan Rafi', progress: 90, status: 'Testing' },
    { name: 'Audit & Financial reporting module', lead: 'Prosunjit Roy', progress: 30, status: 'Planning' }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Project Attendance Track</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Logged work hours against client deliverables</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((proj, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Active Project</span>
              <span className="text-[9px] font-extrabold bg-slate-100 dark:bg-slate-750 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">{proj.status}</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">{proj.name}</h3>
              <p className="text-xs text-slate-500 mt-1">Lead: {proj.lead}</p>
            </div>
            {/* Progress */}
            <div className="space-y-1">
              <div className="w-full bg-slate-100 dark:bg-slate-750 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${proj.progress}%` }} />
              </div>
              <div className="flex justify-between text-[9px] font-bold text-slate-400">
                <span>Task Progress</span>
                <span>{proj.progress}% Completed</span>
              </div>
            </div>
            <button 
              onClick={() => showToast(`Opening task board for ${proj.name}`)}
              className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              Open Project Board
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                          11. VISITOR MANAGEMENT                            */
/* ========================================================================== */
export const VisitorManagementPage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [visitors] = useState([
    { id: 1, name: 'Anisur Rahman', company: 'Global Solutions', host: 'Asif Aminur Rashid', inTime: '10:15 AM', outTime: '-', status: 'Checked In' },
    { id: 2, name: 'Tahmid Hasan', company: 'Aventis Ltd.', host: 'Samia Rahman', inTime: '09:30 AM', outTime: '11:15 AM', status: 'Checked Out' }
  ]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Visitor registered and passcode issued.', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Visitor Logs</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Issue passes and log visitor arrivals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Allocator */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm lg:col-span-1 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Register Visitor</h3>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Visitor Name</label>
              <input type="text" placeholder="e.g. Anisur Rahman" className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Host Employee ID</label>
              <input type="text" placeholder="e.g. 55702" className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" required />
            </div>
            <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
              Issue Entry Pass
            </button>
          </form>
        </div>

        {/* Logs */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm lg:col-span-2 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Active Visitor Passes</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {visitors.map(vis => (
              <div key={vis.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{vis.name} ({vis.company})</h4>
                  <p className="text-[10px] text-slate-500">Host: {vis.host} • IN: {vis.inTime} {vis.outTime !== '-' && `• OUT: ${vis.outTime}`}</p>
                </div>
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  vis.status === 'Checked In' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-150 text-slate-500'
                }`}>{vis.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                          12. PARKING MANAGEMENT                            */
/* ========================================================================== */
export const ParkingManagementPage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [slots] = useState([
    { id: 'P-01', type: 'Car', status: 'Occupied', vehicle: 'DHK Metro GA 11-2093', employee: 'Asif Aminur Rashid' },
    { id: 'P-02', type: 'Car', status: 'Free', vehicle: '-', employee: '-' },
    { id: 'P-03', type: 'Bike', status: 'Occupied', vehicle: 'DHK Metro HA 45-1229', employee: 'Kazi Fahmid Hassan Rafi' }
  ]);

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Parking spot allocated successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">Parking Slot Allocator</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage office building basement parking space reservations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Form */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm lg:col-span-1 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Allocate Space</h3>
          <form onSubmit={handleAllocate} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Target Slot</label>
              <select className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium">
                <option value="P-02">Slot P-02 (Free)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Vehicle License plate</label>
              <input type="text" placeholder="e.g. DHK Metro GA 11-2093" className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" required />
            </div>
            <button type="submit" className="w-full py-2 bg-indigo-655 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
              Confirm Reservation
            </button>
          </form>
        </div>

        {/* slots list */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm lg:col-span-2 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Parking Space Status</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {slots.map(s => (
              <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{s.id} ({s.type})</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">{s.vehicle !== '-' ? `Plate: ${s.vehicle} • Assigned: ${s.employee}` : 'Available Slot'}</p>
                </div>
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  s.status === 'Occupied' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                }`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                          13. USER PROFILE PAGE                             */
/* ========================================================================== */
export const ProfilePage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [profile, setProfile] = useState({
    name: 'Golam Maula Lincoln',
    role: 'Site Administrator',
    dept: 'HR & Admin',
    email: 'lincoln@touchandsolve.com',
    phone: '+88 01958 227213',
    location: 'Dhaka HQ, Bangladesh',
    joined: 'January 12, 2023',
    bio: 'Oversees the site operations, user authorization, and system configs for the Touch & Solve HRMS application.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop'
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...formData });
    setEditMode(false);
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-manrope text-slate-800 dark:text-white">My Profile</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage your administrator account details and contact info</p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm overflow-hidden max-w-4xl font-manrope">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative" />

        {/* Profile Card Header */}
        <div className="px-6 pb-6 relative flex flex-col md:flex-row items-center md:items-end gap-5 -mt-10 border-b border-slate-100 dark:border-slate-700/50">
          <div className="relative group">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md"
            />
            <button 
              onClick={() => showToast('Avatar update is managed by the system directory.', 'info')}
              className="absolute inset-0 bg-slate-900/60 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera size={18} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left space-y-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">{profile.name}</h2>
              <span className="self-center md:self-start bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-450 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/40 uppercase">
                {profile.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{profile.dept} • {profile.location}</p>
          </div>

          <button 
            onClick={() => {
              if (editMode) setFormData({ ...profile });
              setEditMode(!editMode);
            }}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            {editMode ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Info Details */}
        <div className="p-6">
          {editMode ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.phone} 
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Office Location</label>
                  <input 
                    type="text" 
                    value={formData.location} 
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Biography</label>
                <textarea 
                  value={formData.bio} 
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium"
                />
              </div>
              <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Bio */}
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">About Me</h3>
                  <p className="text-sm text-slate-750 dark:text-slate-300 leading-relaxed font-medium">{profile.bio}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-750 rounded-xl flex items-center gap-3">
                    <Mail size={18} className="text-indigo-500" />
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Email</p>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-250 truncate">{profile.email}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-750 rounded-xl flex items-center gap-3">
                    <Phone size={18} className="text-emerald-500" />
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Phone</p>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-250 truncate">{profile.phone}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-750 rounded-xl flex items-center gap-3">
                    <MapPin size={18} className="text-rose-500" />
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Location</p>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-250 truncate">{profile.location}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-750 rounded-xl flex items-center gap-3">
                    <Calendar size={18} className="text-amber-500" />
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Joined Date</p>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-250 truncate">{profile.joined}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Stats/Info */}
              <div className="md:col-span-1 space-y-4">
                <div className="p-5 border border-slate-150 dark:border-slate-700/80 rounded-2xl space-y-4">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Access Info</h3>
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-750 dark:text-slate-350">
                      <Shield size={16} className="text-indigo-500" />
                      <span>Role Level: Super Admin</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-750 dark:text-slate-355">
                      <Award size={16} className="text-emerald-500" />
                      <span>Security: Authorized VIP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                      14. INDIVIDUAL ATTENDANCE REPORT                      */
/* ========================================================================== */
export const IndividualReportPage: React.FC<WorkablePageProps> = ({ showToast, employees = [] }) => {
  const [selectedEmp, setSelectedEmp] = useState('101');
  const [dateFrom, setDateFrom] = useState('2026-07-01');
  const [dateTo, setDateTo] = useState('2026-07-28');
  const [reportGenerated, setReportGenerated] = useState(true);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setReportGenerated(true);
    showToast('Generated individual attendance report.', 'success');
  };

  return (
    <div className="space-y-6 font-manrope">
      <div className="w-full bg-[#8B5CF6] text-white text-center py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-sm">
        Individual Attendance Report
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-5">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Employee</label>
            <select
              value={selectedEmp}
              onChange={e => setSelectedEmp(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-xl focus:outline-none dark:text-slate-200 font-semibold"
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name} (#{emp.id})</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">From Date</label>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-xl focus:outline-none dark:text-slate-200 font-semibold"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">To Date</label>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-xl focus:outline-none dark:text-slate-200 font-semibold"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold tracking-wider transition-all shadow-sm"
          >
            Search
          </button>
        </form>

        {reportGenerated && (
          <div className="space-y-6 border-t border-slate-100 dark:border-slate-700/50 pt-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-xl text-center">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">18</span>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Present Days</p>
              </div>
              <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-xl text-center">
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400">2</span>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Late Entries</p>
              </div>
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-xl text-center">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">1</span>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Approved Leaves</p>
              </div>
              <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-xl text-center">
                <span className="text-2xl font-black text-rose-600 dark:text-rose-400">0</span>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Absences</p>
              </div>
            </div>

            {/* Attendance List */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Detailed Punch Records</h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                <div className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">July 28, 2026</p>
                    <p className="text-[10px] text-slate-450">HQ Entrance • Face Scanner</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">IN: 08:50 AM • OUT: 06:05 PM</p>
                    <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">On Time</span>
                  </div>
                </div>
                <div className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">July 27, 2026</p>
                    <p className="text-[10px] text-slate-450">HQ Entrance • Face Scanner</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">IN: 09:12 AM • OUT: 06:10 PM</p>
                    <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-full border border-amber-500/20">Late (12 mins)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                      15. SUMMARY ATTENDANCE REPORT                         */
/* ========================================================================== */
export const SummaryReportPage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [selectedMonth, setSelectedMonth] = useState('2026-07');
  const [filterDept, setFilterDept] = useState('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Filtered summary report.', 'success');
  };

  return (
    <div className="space-y-6 font-manrope">
      <div className="w-full bg-[#8B5CF6] text-white text-center py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-sm">
        Summary Attendance Report
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-5">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Month</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-xl focus:outline-none dark:text-slate-200 font-semibold"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Department</label>
            <select
              value={filterDept}
              onChange={e => setFilterDept(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-xl focus:outline-none dark:text-slate-200 font-semibold"
            >
              <option value="All">All Departments</option>
              <option value="HR & Admin">HR & Admin</option>
              <option value="Finance & Accounts">Finance & Accounts</option>
              <option value="IT Department">IT Department</option>
              <option value="Software Department">Software Department</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold tracking-wider transition-all shadow-sm"
          >
            Search
          </button>
        </form>

        <div className="border-t border-slate-100 dark:border-slate-700/50 pt-5 space-y-4">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Department Summary Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-150 dark:border-slate-750 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250">HR & Admin</h4>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Avg Attendance Rate</span>
                <span className="font-bold text-emerald-500">96.8%</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Avg Late Rate</span>
                <span className="font-bold text-amber-500">3.2%</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-150 dark:border-slate-750 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250">IT Department</h4>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Avg Attendance Rate</span>
                <span className="font-bold text-emerald-500">92.4%</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Avg Late Rate</span>
                <span className="font-bold text-amber-500">7.6%</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-150 dark:border-slate-750 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250">Software Department</h4>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Avg Attendance Rate</span>
                <span className="font-bold text-emerald-500">98.1%</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Avg Late Rate</span>
                <span className="font-bold text-amber-500">1.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                          16. ATTENDANCE SHEET                              */
/* ========================================================================== */
export const AttendanceSheetPage: React.FC<WorkablePageProps> = ({ showToast, employees = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState('2026-07');

  const dateList = useMemo(() => {
    if (!selectedMonth) return [];
    const [yearStr, monthStr] = selectedMonth.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr) - 1; 
    
    const numDays = new Date(year, month + 1, 0).getDate();
    const result = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthName = monthNames[month];

    for (let day = 1; day <= numDays; day++) {
      const d = new Date(year, month, day);
      const dayName = dayNames[d.getDay()];
      result.push({
        day,
        dayName,
        monthName,
        isFriday: d.getDay() === 5
      });
    }
    return result;
  }, [selectedMonth]);

  const records = useMemo(() => {
    return employees.map((emp, idx) => {
      const empStatus = dateList.map((dt, dayIdx) => {
        if (dt.isFriday) return 'Off';
        if (emp.status === 'On Leave') return 'V';
        if (emp.status === 'Inactive') return 'A';
        if ((dayIdx + idx) % 13 === 0) return 'A';
        if ((dayIdx + idx) % 8 === 0) return 'L';
        if ((dayIdx + idx) % 15 === 0) return 'V';
        return 'P';
      });
      return {
        id: emp.id,
        name: emp.name,
        dept: emp.dept || 'HR & Admin',
        status: empStatus
      };
    });
  }, [employees, dateList]);

  return (
    <div className="space-y-6 font-manrope">
      <div className="w-full bg-[#8B5CF6] text-white text-center py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-sm">
        Attendance Sheet View
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/50 pb-4">
          <div className="flex items-center gap-3">
            <input
              type="month"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-755 rounded-xl focus:outline-none dark:text-slate-200 font-semibold"
            />
            <button
              onClick={() => showToast('Attendance Sheet updated.', 'success')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Load Sheet
            </button>
          </div>
          <div className="flex flex-wrap gap-3 text-[10px] font-bold text-slate-400 uppercase">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded flex items-center justify-center text-white text-[9px]">P</span> Present</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-rose-500 rounded flex items-center justify-center text-white text-[9px]">A</span> Absent</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-amber-500 rounded flex items-center justify-center text-white text-[9px]">L</span> Late</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded flex items-center justify-center text-white text-[9px]">V</span> Vacation</span>
            <span className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 bg-rose-50 dark:bg-rose-950/30 text-rose-500 rounded border border-rose-100 dark:border-rose-900/50 text-[8px] font-black">OFF</span> Friday Off
            </span>
          </div>
        </div>

        {/* Sheet Table */}
        <div className="overflow-x-auto relative">
          <table className="w-full text-left text-xs border border-collapse divide-y divide-slate-100 dark:divide-slate-750 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 text-[10px] uppercase">
                <th className="py-2.5 px-3 font-semibold border-r dark:border-slate-700 min-w-[180px] align-middle text-slate-600 dark:text-slate-300 sticky left-0 bg-slate-50 dark:bg-slate-900 z-20">
                  Employee Details
                </th>
                {dateList.map((dt) => (
                  <th 
                    key={dt.day} 
                    className={`py-2.5 px-1.5 text-center font-bold border-r dark:border-slate-700 w-14 min-w-[56px] ${
                      dt.isFriday ? 'bg-rose-50/50 dark:bg-rose-950/15 text-rose-500' : ''
                    }`}
                  >
                    <div className="text-[10px] font-black text-slate-800 dark:text-slate-200 leading-none">Day-{dt.day}</div>
                    <div className="text-[9px] font-bold text-indigo-500 dark:text-indigo-400 mt-1 leading-none">{dt.dayName}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-750">
              {records.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 text-slate-700 dark:text-slate-300">
                  <td className="py-2.5 px-3 border-r dark:border-slate-700 sticky left-0 bg-white dark:bg-slate-800 z-10 whitespace-nowrap shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{r.name}</div>
                    <div className="text-[9px] text-indigo-500 font-semibold mt-0.5">#{r.id}</div>
                  </td>
                  {r.status.map((st, i) => {
                    const dt = dateList[i];
                    return (
                      <td 
                        key={i} 
                        className={`py-2 px-1 text-center border-r dark:border-slate-700 ${
                          dt?.isFriday ? 'bg-rose-50/20 dark:bg-rose-950/5' : ''
                        }`}
                      >
                        {st === 'Off' ? (
                          <span className="inline-block text-[9px] font-black uppercase text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-1.5 py-0.5 rounded leading-none border border-rose-100 dark:border-rose-900/50">
                            Off
                          </span>
                        ) : (
                          <span className={`inline-block w-5 h-5 rounded text-[10px] font-black leading-5 text-white ${
                            st === 'P' ? 'bg-emerald-500' :
                            st === 'A' ? 'bg-rose-500' :
                            st === 'L' ? 'bg-amber-500' : 'bg-blue-500'
                          }`}>
                            {st}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                        17. REQUEST MANUAL ATTENDANCE                       */
/* ========================================================================== */
export const RequestAttendancePage: React.FC<WorkablePageProps> = ({ showToast }) => {
  const [reqDate, setReqDate] = useState('2026-07-28');
  const [reqTime, setReqTime] = useState('09:00');
  const [reqType, setReqType] = useState('IN');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Manual attendance request submitted to HR Administrator.', 'info');
    setReason('');
  };

  return (
    <div className="space-y-6 font-manrope">
      <div className="w-full bg-[#8B5CF6] text-white text-center py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-sm">
        Request Attendance Adjustment
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-sm max-w-xl space-y-5">
        <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-700">Manual Punch Entry Form</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Adjustment Date</label>
              <input
                type="date"
                required
                value={reqDate}
                onChange={e => setReqDate(e.target.value)}
                className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Punched Time</label>
              <input
                type="time"
                required
                value={reqTime}
                onChange={e => setReqTime(e.target.value)}
                className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Punch Action Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-350 cursor-pointer select-none">
                <input
                  type="radio"
                  name="type"
                  checked={reqType === 'IN'}
                  onChange={() => setReqType('IN')}
                  className="text-indigo-650 focus:ring-indigo-500"
                />
                <span>PUNCH IN (Check-In)</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-750 dark:text-slate-355 cursor-pointer select-none">
                <input
                  type="radio"
                  name="type"
                  checked={reqType === 'OUT'}
                  onChange={() => setReqType('OUT')}
                  className="text-indigo-650 focus:ring-indigo-500"
                />
                <span>PUNCH OUT (Check-Out)</span>
              </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Adjustment Reason</label>
            <textarea
              required
              rows={3}
              placeholder="Explain why you are requesting a manual entry adjustment (e.g. Device connectivity issue, forgot card)..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full p-2.5 text-xs border dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-200 font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Submit Request Entry
          </button>
        </form>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                          18. EMPLOYEE ORG CHART                            */
/* ========================================================================== */
export const EmployeeChartPage: React.FC<WorkablePageProps> = ({ employees = [] }) => {
  return (
    <div className="space-y-6 font-manrope">
      <div className="w-full bg-[#8B5CF6] text-white text-center py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-sm">
        Employee Organization Chart
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-sm space-y-6 overflow-x-auto">
        <div className="min-w-[800px] flex flex-col items-center py-4">
          {/* CEO Node */}
          {employees.filter(e => e.role.toLowerCase().includes('chief executive') || e.role.toLowerCase().includes('ceo')).map(ceo => (
            <div key={ceo.id} className="flex flex-col items-center">
              <div className="bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-500 rounded-2xl p-4 text-center w-56 shadow-sm flex flex-col items-center">
                <img src={ceo.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400 mb-2" alt={ceo.name} />
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 leading-tight">{ceo.name}</h4>
                <p className="text-[10px] font-bold text-indigo-500 mt-1 uppercase tracking-wider">{ceo.role}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">{ceo.dept}</p>
              </div>
              
              <div className="h-8 w-0.5 bg-slate-200 dark:bg-slate-700 my-1"></div>
            </div>
          ))}

          {/* EVP and Directors level */}
          <div className="flex gap-8 justify-center relative">
            {employees.filter(e => e.role.toLowerCase().includes('vice president') || e.role.toLowerCase().includes('director')).map(mgr => (
              <div key={mgr.id} className="flex flex-col items-center">
                <div className="bg-purple-50 dark:bg-purple-950/40 border-2 border-purple-500 rounded-2xl p-4 text-center w-52 shadow-sm flex flex-col items-center">
                  <img src={mgr.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-purple-400 mb-2" alt={mgr.name} />
                  <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 leading-tight">{mgr.name}</h4>
                  <p className="text-[9px] font-bold text-purple-500 mt-1 uppercase tracking-wider">{mgr.role}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{mgr.dept}</p>
                </div>
                <div className="h-6 w-0.5 bg-slate-200 dark:bg-slate-700 my-1"></div>
              </div>
            ))}
          </div>

          <div className="w-4/5 h-0.5 bg-slate-200 dark:bg-slate-700 my-2"></div>

          {/* Engineering Manager Level */}
          <div className="flex gap-8 justify-center relative">
            {employees.filter(e => e.role.toLowerCase() === 'engineering manager').map(mgr => (
              <div key={mgr.id} className="flex flex-col items-center">
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500 rounded-2xl p-4 text-center w-52 shadow-sm flex flex-col items-center">
                  <img src={mgr.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400 mb-2" alt={mgr.name} />
                  <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 leading-tight">{mgr.name}</h4>
                  <p className="text-[9px] font-bold text-emerald-500 mt-1 uppercase tracking-wider">{mgr.role}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{mgr.dept}</p>
                </div>
                <div className="h-6 w-0.5 bg-slate-200 dark:bg-slate-700 my-1"></div>
              </div>
            ))}
          </div>

          <div className="w-4/5 h-0.5 bg-slate-200 dark:bg-slate-700 my-2"></div>

          {/* Asst Managers Level */}
          <div className="flex flex-wrap gap-6 justify-center mt-2">
            {employees.filter(e => e.role.toLowerCase().includes('asst manager') || e.role.toLowerCase().includes('assistant manager')).map(mgr => (
              <div key={mgr.id} className="bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700/60 rounded-xl p-3 text-center w-44 shadow-xs flex flex-col items-center">
                <img src={mgr.avatar} className="w-10 h-10 rounded-full object-cover mb-1.5" alt={mgr.name} />
                <h5 className="font-extrabold text-[11px] text-slate-800 dark:text-slate-200 leading-tight">{mgr.name}</h5>
                <p className="text-[9px] font-bold text-amber-600 dark:text-amber-400 mt-0.5 uppercase tracking-wider">{mgr.role}</p>
                <p className="text-[8px] text-slate-450 mt-0.5">{mgr.dept}</p>
              </div>
            ))}
          </div>

          {/* Rest of Team Directory */}
          <div className="mt-8 w-full border-t border-slate-100 dark:border-slate-750 pt-6">
            <h3 className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Staff & Associates</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {employees.filter(e => 
                !e.role.toLowerCase().includes('chief executive') && 
                !e.role.toLowerCase().includes('ceo') && 
                !e.role.toLowerCase().includes('vice president') && 
                !e.role.toLowerCase().includes('director') && 
                !e.role.toLowerCase().includes('manager')
              ).map(emp => (
                <div key={emp.id} className="bg-slate-50 dark:bg-slate-900/30 border border-slate-150 dark:border-slate-750 rounded-xl p-3 text-center flex flex-col items-center">
                  <img src={emp.avatar} className="w-8 h-8 rounded-full object-cover mb-1.5" alt={emp.name} />
                  <h6 className="font-bold text-[10px] text-slate-700 dark:text-slate-300 line-clamp-1 leading-tight">{emp.name}</h6>
                  <p className="text-[8.5px] font-bold text-slate-550 mt-0.5 truncate max-w-full">{emp.role || 'Associate'}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ========================================================================== */
/*                         19. CREATE EMPLOYEE PAGE                           */
/* ========================================================================== */
interface CreateEmployeeProps extends WorkablePageProps {
  setActiveTab?: (tab: string) => void;
}

export const CreateEmployeePage: React.FC<CreateEmployeeProps> = ({ 
  showToast, 
  employees = [], 
  setEmployees,
  setActiveTab
}) => {
  const [empName, setEmpName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [workPhone, setWorkPhone] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Active');
  
  const [empId, setEmpId] = useState('');
  const [department, setDepartment] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [manager, setManager] = useState('');

  // Image Upload Preview State
  const [photoPreview, setPhotoPreview] = useState<string>('');

  // Opening Info
  const [openingBalance, setOpeningBalance] = useState('');
  const openingBalanceDate = '01/01/2022'; 

  // Private Info
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [privateEmail, setPrivateEmail] = useState('');
  const [privatePhone, setPrivatePhone] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [distance, setDistance] = useState('');

  // NID Upload State
  const [nidFileName, setNidFileName] = useState<string>('');
  const [nidPreviewUrl, setNidPreviewUrl] = useState<string>('');

  // Emergency
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Family Status
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [childrenNumber, setChildrenNumber] = useState('');

  // Citizenship
  const [nationality, setNationality] = useState('');
  const [identNo, setIdentNo] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  // Education
  const [certLevel, setCertLevel] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [college, setCollege] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName || !workEmail || !empId) {
      showToast('Please fill in Employee Name, Work Email, and Employee ID.', 'warning');
      return;
    }

    const newEmp = {
      id: empId,
      name: empName,
      role: jobPosition || 'Employee',
      dept: department || 'HR & Admin',
      email: workEmail,
      status: status,
      avatar: photoPreview || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&fit=crop'
    };

    if (setEmployees) {
      setEmployees([...employees, newEmp]);
    }
    
    showToast(`Employee "${empName}" created successfully!`, 'success');
    if (setActiveTab) {
      setActiveTab('employees');
    }
  };

  return (
    <div className="space-y-6 font-manrope max-w-[1200px] mx-auto pb-12 text-left">
      {/* Top Banner Row */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
        <button type="button" className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-black shadow-sm transition-all">
          New Employees
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-205 dark:border-slate-700 rounded-xl shadow-xs">
            <FileSpreadsheet size={16} className="text-purple-600" />
            <div className="text-[10px] text-left">
              <span className="block font-bold text-slate-750 dark:text-slate-250">Documents</span>
              <span className="block font-extrabold text-purple-700 -mt-0.5">
                {nidFileName ? '1' : '0'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-205 dark:border-slate-700 rounded-xl shadow-xs">
            <Mail size={16} className="text-purple-600" />
            <div className="text-[10px] text-left">
              <span className="block font-bold text-slate-755 dark:text-slate-250">Contacts</span>
              <span className="block font-extrabold text-purple-700 -mt-0.5">0</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-6 shadow-md space-y-8">
        
        {/* Main Details Section */}
        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-5">
            {/* Name Input */}
            <div className="space-y-1">
              <input 
                type="text" 
                placeholder="Employees's Name"
                value={empName}
                onChange={e => setEmpName(e.target.value)}
                className="w-full text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white border-b-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 focus:outline-none bg-transparent pb-2 font-manrope placeholder:text-slate-300 dark:placeholder:text-slate-650"
                required
              />
            </div>

            {/* Left and Right Field Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 items-center gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="Work Email" 
                    value={workEmail}
                    onChange={e => setWorkEmail(e.target.value)}
                    className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-205 font-semibold"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Work Phone</label>
                  <input 
                    type="text" 
                    placeholder="Work Phone" 
                    value={workPhone}
                    onChange={e => setWorkPhone(e.target.value)}
                    className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-205 font-semibold"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-205 font-semibold"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                  <select 
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-205 font-semibold cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 items-center gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Employee ID</label>
                  <input 
                    type="text" 
                    placeholder="Enter Employee ID" 
                    value={empId}
                    onChange={e => setEmpId(e.target.value)}
                    className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-205 font-semibold"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
                  <input 
                    type="text" 
                    placeholder="Enter Department" 
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-205 font-semibold"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Job Position</label>
                  <input 
                    type="text" 
                    placeholder="Enter job position" 
                    value={jobPosition}
                    onChange={e => setJobPosition(e.target.value)}
                    className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-205 font-semibold"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Manager</label>
                  <select 
                    value={manager}
                    onChange={e => setManager(e.target.value)}
                    className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-205 font-semibold cursor-pointer"
                  >
                    <option value="">-- Choose a manager --</option>
                    {employees.filter(e => e.role.toLowerCase().includes('manager') || e.role.toLowerCase().includes('ceo') || e.role.toLowerCase().includes('director')).map(mgr => (
                      <option key={mgr.id} value={mgr.name}>{mgr.name} ({mgr.role})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Box Top Right - Workable Picture Upload */}
          <div className="flex flex-col items-center justify-start pt-4 lg:col-span-1">
            <label className="w-28 h-28 bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-350 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all group relative overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview} className="w-full h-full object-cover rounded-2xl" alt="Roster Photo" />
              ) : (
                <>
                  <Camera size={28} className="text-slate-400 group-hover:scale-105 transition-transform" />
                  <div className="absolute bottom-2 right-2 bg-indigo-600 text-white rounded-full p-0.5 shadow">
                    <Plus size={12} />
                  </div>
                </>
              )}
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        setPhotoPreview(event.target.result as string);
                        showToast(`Profile picture "${file.name}" loaded successfully!`, 'success');
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
            <span className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wide">Upload Photo</span>
          </div>
        </div>

        {/* Opening Information Section */}
        <div className="border-t border-slate-100 dark:border-slate-750 pt-5 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200">Opening Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Opening Balance <span className="text-[10px] text-slate-400 font-medium">(optional)</span></label>
              <input 
                type="text" 
                placeholder="Opening Balance" 
                value={openingBalance}
                onChange={e => setOpeningBalance(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-semibold"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Opening Balance Date <span className="text-[10px] text-rose-500 font-medium">(readonly)</span></label>
              <input 
                type="text" 
                readOnly
                value={openingBalanceDate}
                className="w-full px-3 py-2.5 text-xs bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-750 rounded-xl cursor-not-allowed text-slate-400 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Private Information Section */}
        <div className="border-t border-slate-100 dark:border-slate-750 pt-5 space-y-6">
          <div className="border-b border-slate-150 dark:border-slate-750 pb-2">
            <span className="text-xs font-extrabold text-purple-700 border-b-2 border-purple-600 pb-2 px-1 tracking-wider uppercase">
              Private Information
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            {/* Left Box */}
            <div className="space-y-6">
              {/* Private Contact */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b dark:border-slate-700 pb-1">Private Contact</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Private Address</label>
                    <input 
                      type="text" 
                      placeholder="Enter private address..." 
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <select 
                        value={division} 
                        onChange={e => setDivision(e.target.value)} 
                        className="px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none dark:text-slate-350 cursor-pointer"
                      >
                        <option value="">Division</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattogram">Chattogram</option>
                        <option value="Sylhet">Sylhet</option>
                      </select>
                      <select 
                        value={district} 
                        onChange={e => setDistrict(e.target.value)} 
                        className="px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none dark:text-slate-350 cursor-pointer"
                      >
                        <option value="">District</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Feni">Feni</option>
                        <option value="Sylhet">Sylhet</option>
                      </select>
                      <select 
                        value={upazila} 
                        onChange={e => setUpazila(e.target.value)} 
                        className="px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none dark:text-slate-350 cursor-pointer"
                      >
                        <option value="">Upazila</option>
                        <option value="Tejgaon">Tejgaon</option>
                        <option value="Mirpur">Mirpur</option>
                        <option value="Fulgazi">Fulgazi</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Private Email</label>
                    <input 
                      type="email" 
                      placeholder="e.g. myprivateemail@gmail.com" 
                      value={privateEmail}
                      onChange={e => setPrivateEmail(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Private Phone</label>
                    <input 
                      type="text" 
                      placeholder="Private Phone" 
                      value={privatePhone}
                      onChange={e => setPrivatePhone(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Bank Account ?</label>
                    <input 
                      type="text" 
                      placeholder="Enter Account Number" 
                      value={bankAccount}
                      onChange={e => setBankAccount(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Home-Work Distance</label>
                    <div className="col-span-2 flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Distance" 
                        value={distance}
                        onChange={e => setDistance(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                      />
                      <select className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-355 cursor-pointer">
                        <option value="km">km</option>
                        <option value="miles">miles</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b dark:border-slate-700 pb-1">Emergency</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Contact Name</label>
                    <input 
                      type="text" 
                      placeholder="Contact Name" 
                      value={emergencyName}
                      onChange={e => setEmergencyName(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Contact Phone</label>
                    <input 
                      type="text" 
                      placeholder="Contact Phone" 
                      value={emergencyPhone}
                      onChange={e => setEmergencyPhone(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Family Status */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b dark:border-slate-700 pb-1">Family Status</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Marital Status</label>
                    <select 
                      value={maritalStatus} 
                      onChange={e => setMaritalStatus(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-350 cursor-pointer font-semibold"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Children Number</label>
                    <input 
                      type="number" 
                      placeholder="Number of Dependent Children" 
                      value={childrenNumber}
                      onChange={e => setChildrenNumber(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box */}
            <div className="space-y-6">
              {/* Citizenship */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b dark:border-slate-700 pb-1">Citizenship</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Nationality</label>
                    <input 
                      type="text" 
                      placeholder="Enter Country Name" 
                      value={nationality}
                      onChange={e => setNationality(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Identification No</label>
                    <input 
                      type="text" 
                      placeholder="Enter Identification No" 
                      value={identNo}
                      onChange={e => setIdentNo(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Passport No</label>
                    <input 
                      type="text" 
                      placeholder="Enter passport No" 
                      value={passportNo}
                      onChange={e => setPassportNo(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>

                  {/* NID DOCUMENT UPLOAD OPTION */}
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">NID Document</label>
                    <div className="col-span-2">
                      <label className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-55 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Plus size={14} className="text-slate-450" />
                        <span className="text-[11px] font-bold text-slate-550 dark:text-slate-400 truncate max-w-[150px]">
                          {nidFileName || 'Upload NID File'}
                        </span>
                        <input 
                          type="file" 
                          accept="image/*,application/pdf" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setNidFileName(file.name);
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setNidPreviewUrl(event.target.result as string);
                                }
                              };
                              reader.readAsDataURL(file);
                              showToast(`NID Document "${file.name}" uploaded successfully!`, 'success');
                            }
                          }}
                        />
                      </label>
                      {nidPreviewUrl && (
                        <div className="mt-2 text-[10px] text-indigo-500 font-bold flex items-center gap-1">
                          <span>✓ Verified NID: {nidFileName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Gender</label>
                    <select 
                      value={gender} 
                      onChange={e => setGender(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-350 cursor-pointer font-semibold"
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Date of Birth</label>
                    <input 
                      type="date" 
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-semibold cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b dark:border-slate-700 pb-1">Education</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Certificate Level</label>
                    <select 
                      value={certLevel} 
                      onChange={e => setCertLevel(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-350 cursor-pointer font-semibold"
                    >
                      <option value="">Certificate Level</option>
                      <option value="High School">High School</option>
                      <option value="Bachelor">Bachelor Degree</option>
                      <option value="Master">Master Degree</option>
                      <option value="PhD">PhD / Doctorate</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Field of Study</label>
                    <input 
                      type="text" 
                      placeholder="Field of Study" 
                      value={fieldOfStudy}
                      onChange={e => setFieldOfStudy(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">College/University</label>
                    <input 
                      type="text" 
                      placeholder="College/University" 
                      value={college}
                      onChange={e => setCollege(e.target.value)}
                      className="col-span-2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-slate-202 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-black shadow-md hover:scale-[1.01] transition-all tracking-wider uppercase"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

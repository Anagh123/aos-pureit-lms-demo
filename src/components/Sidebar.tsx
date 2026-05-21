import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpenText, BarChart3, Trophy, Users,
  Droplets, ChevronUp, LogOut
} from 'lucide-react';
import { currentUser } from '../data/mockData';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/scenarios', label: 'Scenarios', icon: BookOpenText },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/manager', label: 'Manager View', icon: Users },
  { to: '/reports', label: 'Reports', icon: BarChart3 }
];

export function Sidebar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    sessionStorage.removeItem('lastSessionResult');
    sessionStorage.removeItem('lastSessionScenario');
    navigate('/', { replace: true });
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Droplets className="text-white" size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-bold text-slate-900 leading-tight">AquaCoach</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">AI Sales Trainer</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand-50 text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <item.icon size={18} strokeWidth={2} />
            <span className="flex-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-100 relative" ref={menuRef}>
        {menuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Signed in as</div>
              <div className="text-sm font-semibold text-slate-900 truncate mt-0.5">{currentUser.name}</div>
              <div className="text-xs text-slate-500 truncate">arjun.mehta@aopureit.in</div>
              <div className="text-xs text-slate-500 truncate mt-0.5">{currentUser.role} · {currentUser.region}</div>
            </div>
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(o => !o)}
          className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition ${
            menuOpen ? 'bg-slate-100' : 'hover:bg-slate-50'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-aqua-500 flex items-center justify-center text-lg shrink-0">
            {currentUser.avatar}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-sm font-semibold text-slate-900 truncate">{currentUser.name}</div>
            <div className="text-xs text-slate-500 truncate">{currentUser.store}</div>
          </div>
          <ChevronUp size={14} className={`text-slate-400 transition-transform ${menuOpen ? '' : 'rotate-180'}`} />
        </button>
      </div>
    </aside>
  );
}


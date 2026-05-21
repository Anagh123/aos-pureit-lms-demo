import { Bell, Flame, Sparkles, Trophy, BookOpen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { currentUser } from '../data/mockData';

interface Props {
  title?: string;
  subtitle?: string;
}

const NOTIFICATIONS = [
  {
    id: 1,
    icon: Trophy,
    color: 'bg-emerald-100 text-emerald-700',
    title: 'You moved up to rank #7',
    desc: 'Mumbai West region · keep going!',
    time: '12 min ago'
  },
  {
    id: 2,
    icon: BookOpen,
    color: 'bg-brand-100 text-brand-700',
    title: 'New scenario added: The Solar Geyser Pitch',
    desc: 'Advanced level · 5-7 min · try it now',
    time: '2 hours ago'
  },
  {
    id: 3,
    icon: Sparkles,
    color: 'bg-purple-100 text-purple-700',
    title: 'Weekly coaching report is ready',
    desc: 'Your manager Sanjeev added 3 notes',
    time: 'Yesterday'
  }
];

export function Header({ title, subtitle }: Props) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [unread, setUnread] = useState(NOTIFICATIONS.length);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const openNotif = () => {
    setNotifOpen(o => !o);
    if (!notifOpen) setUnread(0);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div>
        {title && <h1 className="text-xl font-bold text-slate-900">{title}</h1>}
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg">
          <Flame size={15} fill="currentColor" />
          <span className="text-sm font-bold">{currentUser.streak}</span>
          <span className="text-xs">day streak</span>
        </div>

        <div className="relative" ref={notifRef}>
          <button onClick={openNotif} className="relative p-2 hover:bg-slate-50 rounded-lg">
            <Bell size={18} className="text-slate-600" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="font-semibold text-sm text-slate-900">Notifications</div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{NOTIFICATIONS.length} recent</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className="px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}>
                        <n.icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-900 leading-tight">{n.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.desc}</div>
                        <div className="text-[10px] text-slate-400 mt-1.5 uppercase tracking-wider font-semibold">{n.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

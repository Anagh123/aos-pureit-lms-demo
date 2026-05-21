import { useMemo, useState } from 'react';
import {
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
  TrendingUp, AlertTriangle, Award, Users, Search, Download,
  ChevronDown, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { promoters, teamPerformanceData, categoryBreakdown } from '../data/mockData';

const COLORS = ['#1a6ef5', '#06b6d4', '#8b5cf6', '#10b981'];

type Period = '7d' | '30d' | 'q';
const PERIOD_LABEL: Record<Period, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  'q': 'Last quarter'
};

export function ManagerDashboard() {
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState<Period>('30d');
  const [periodOpen, setPeriodOpen] = useState(false);
  const [coachingAssigned, setCoachingAssigned] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (!query.trim()) return promoters;
    const q = query.toLowerCase();
    return promoters.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.store.toLowerCase().includes(q)
    );
  }, [query]);

  const avgScore = Math.round(promoters.reduce((s, p) => s + p.overallScore, 0) / promoters.length);
  const totalSessions = promoters.reduce((s, p) => s + p.sessionsCompleted, 0);
  const topPerformers = [...promoters].sort((a, b) => b.overallScore - a.overallScore).slice(0, 3);
  const needsAttention = promoters.filter(p => p.overallScore < 80).slice(0, 4);

  const exportCsv = () => {
    const rows = [
      ['Name', 'Region', 'Store', 'Sessions', 'Language', 'Score', 'Badge'],
      ...filtered.map(p => [p.name, p.region, p.store, p.sessionsCompleted.toString(), p.language.toUpperCase(), p.overallScore.toString(), p.badge])
    ];
    const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aquacoach-promoters-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const assignCoaching = (id: string) => {
    setCoachingAssigned(prev => new Set(prev).add(id));
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold mb-2">
            Manager View
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Team Performance Overview</h1>
          <p className="text-sm text-slate-500 mt-1">All Regions · {promoters.length} active promoters · Updated 5 min ago</p>
        </div>
        <div className="flex gap-2 items-start">
          <div className="relative">
            <button
              onClick={() => setPeriodOpen(o => !o)}
              className="px-3 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-1.5"
            >
              {PERIOD_LABEL[period]} <ChevronDown size={14} />
            </button>
            {periodOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-30">
                {(Object.keys(PERIOD_LABEL) as Period[]).map(k => (
                  <button
                    key={k}
                    onClick={() => { setPeriod(k); setPeriodOpen(false); }}
                    className={`w-full text-left px-3.5 py-2 text-sm hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg ${
                      period === k ? 'text-brand-600 font-semibold bg-brand-50/50' : 'text-slate-700'
                    }`}
                  >
                    {PERIOD_LABEL[k]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={exportCsv}
            className="px-3 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-1.5"
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Team Avg Score" value={avgScore.toString()} change="+6" positive icon={TrendingUp} />
        <KpiCard label="Total Sessions" value={totalSessions.toLocaleString()} change="+18%" positive icon={Users} />
        <KpiCard label="Top Performer" value={topPerformers[0].name.split(' ')[0]} change={`${topPerformers[0].overallScore}`} positive icon={Award} />
        <KpiCard label="Needs Attention" value={needsAttention.length.toString()} change="-2" positive icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-12 gap-5 mb-6">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900">Team Score Trend</h3>
              <p className="text-xs text-slate-500">Weekly average across all promoters · {PERIOD_LABEL[period]}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={teamPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="#1a6ef5" strokeWidth={3} dot={{ r: 4, fill: '#1a6ef5' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-1">Category Performance</h3>
          <p className="text-xs text-slate-500 mb-4">Average score by scenario type</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                dataKey="score"
                nameKey="category"
                cx="50%" cy="50%"
                innerRadius={45} outerRadius={75}
                paddingAngle={2}
              >
                {categoryBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {categoryBreakdown.map((c, i) => (
              <div key={c.category} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: COLORS[i] }}></div>
                <span className="flex-1 text-slate-700">{c.category}</span>
                <span className="font-bold text-slate-900">{c.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Promoter Roster</h3>
            <p className="text-xs text-slate-500">
              {filtered.length} {filtered.length === 1 ? 'promoter' : 'promoters'}
              {query && ` matching "${query}"`}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg w-72">
            <Search size={14} className="text-slate-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search promoter, region, or store..."
              className="bg-transparent flex-1 text-sm outline-none placeholder:text-slate-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-700 text-xs">✕</button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-3xl mb-2">🔍</div>
            <div className="font-semibold text-slate-700">No promoters match "{query}"</div>
            <div className="text-sm text-slate-500 mt-1">Try a different name, region, or store.</div>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                <th className="text-left py-3 px-5">Promoter</th>
                <th className="text-left py-3">Region / Store</th>
                <th className="text-center py-3">Sessions</th>
                <th className="text-center py-3">Lang</th>
                <th className="text-left py-3">Weekly Trend</th>
                <th className="text-right py-3">Score</th>
                <th className="text-center py-3 pr-5">Badge</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className={`border-t border-slate-100 ${
                  p.name === 'Arjun Mehta' ? 'bg-brand-50/40' : ''
                }`}>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-100 to-aqua-100 flex items-center justify-center text-lg">
                        {p.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-500">#{i + 1} overall</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-slate-900 text-sm">{p.region}</div>
                    <div className="text-xs text-slate-500">{p.store}</div>
                  </td>
                  <td className="text-center">
                    <span className="text-sm font-semibold text-slate-900">{p.sessionsCompleted}</span>
                  </td>
                  <td className="text-center">
                    <span className="text-xs px-2 py-0.5 bg-slate-100 rounded font-mono uppercase">{p.language}</span>
                  </td>
                  <td>
                    <MiniSparkline data={p.weeklyTrend} />
                  </td>
                  <td className="text-right pr-2">
                    <span className={`text-base font-bold ${
                      p.overallScore >= 90 ? 'text-emerald-600' :
                      p.overallScore >= 80 ? 'text-brand-600' :
                      p.overallScore >= 70 ? 'text-amber-600' : 'text-red-600'
                    }`}>{p.overallScore}</span>
                  </td>
                  <td className="text-center pr-5">
                    <BadgePill badge={p.badge} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <div className="bg-white rounded-2xl border border-emerald-200 p-6">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Award size={18} className="text-emerald-600" /> Top performers this month
          </h3>
          <div className="space-y-2">
            {topPerformers.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  i === 0 ? 'bg-yellow-100 text-yellow-700' :
                  i === 1 ? 'bg-slate-200 text-slate-600' :
                  'bg-orange-100 text-orange-700'
                }`}>#{i + 1}</div>
                <div className="text-xl">{p.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-slate-900">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.region}</div>
                </div>
                <div className="text-lg font-bold text-emerald-600">{p.overallScore}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-amber-200 p-6">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-600" /> Promoters needing attention
          </h3>
          <div className="space-y-2">
            {needsAttention.map(p => {
              const assigned = coachingAssigned.has(p.id);
              return (
                <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg">
                  <div className="text-xl">{p.avatar}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-slate-900">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.region} · {p.sessionsCompleted} sessions</div>
                  </div>
                  {assigned ? (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      ✓ Coaching assigned
                    </span>
                  ) : (
                    <button
                      onClick={() => assignCoaching(p.id)}
                      className="text-xs font-semibold text-brand-600 hover:underline"
                    >
                      Assign coaching →
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, change, positive, icon: Icon }: any) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
          <Icon size={16} />
        </div>
        <span className={`text-xs font-bold flex items-center gap-0.5 ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {change}
        </span>
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
    </div>
  );
}

function MiniSparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 60;
    const y = 20 - ((v - min) / range) * 18;
    return `${x},${y}`;
  }).join(' ');
  const trend = data[data.length - 1] > data[0];
  return (
    <svg width="60" height="22" className="overflow-visible">
      <polyline
        fill="none"
        stroke={trend ? '#10b981' : '#ef4444'}
        strokeWidth="1.5"
        points={points}
      />
      <circle
        cx={60}
        cy={20 - ((data[data.length - 1] - min) / range) * 18}
        r="2"
        fill={trend ? '#10b981' : '#ef4444'}
      />
    </svg>
  );
}

function BadgePill({ badge }: { badge: 'Gold' | 'Silver' | 'Bronze' | 'Rising' }) {
  const styles = {
    Gold: 'bg-yellow-100 text-yellow-700',
    Silver: 'bg-slate-200 text-slate-700',
    Bronze: 'bg-orange-100 text-orange-700',
    Rising: 'bg-aqua-100 text-aqua-700'
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${styles[badge]}`}>
      {badge}
    </span>
  );
}

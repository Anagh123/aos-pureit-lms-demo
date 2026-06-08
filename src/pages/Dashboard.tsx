import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { ArrowUpRight, Target, TrendingUp, Award, Flame, BookOpen, Trophy } from 'lucide-react';
import { ScoreGauge } from '../components/ScoreGauge';
import { SessionDrawer } from '../components/SessionDrawer';
import { currentUser, skillRadarData, teamPerformanceData } from '../data/mockData';
import { getAllSessions, isUserSession } from '../data/sessionStore';
import { scenarios } from '../data/scenarios';
import { HistoricalSession } from '../types';

type Period = '7w' | '30d' | 'q';
const PERIOD_LABEL: Record<Period, string> = {
  '7w': 'Last 7 weeks',
  '30d': 'Last 30 days',
  'q': 'Last quarter'
};

export function Dashboard() {
  const sessionsProgress = (currentUser.sessionsThisWeek / currentUser.sessionsTarget) * 100;
  const daysProgress = (currentUser.daysActiveThisWeek / currentUser.daysTarget) * 100;
  const recommended = scenarios.slice(0, 3);
  const [period, setPeriod] = useState<Period>('7w');
  const [selectedSession, setSelectedSession] = useState<HistoricalSession | null>(null);
  const recentMerged = useMemo(() => getAllSessions().slice(0, 5), []);

  const chartData = useMemo(() => {
    if (period === '7w') return teamPerformanceData;
    if (period === '30d') return teamPerformanceData.slice(-4).map((d, i) => ({ ...d, week: `W${i + 1}` }));
    return teamPerformanceData.concat([
      { week: 'W8', avgScore: 85, sessions: 290 },
      { week: 'W9', avgScore: 87, sessions: 305 },
      { week: 'W10', avgScore: 86, sessions: 318 },
      { week: 'W11', avgScore: 88, sessions: 332 },
      { week: 'W12', avgScore: 89, sessions: 346 }
    ]);
  }, [period]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-sm text-slate-500 mb-1">Good morning, {currentUser.name.split(' ')[0]} 👋</div>
          <h1 className="text-2xl font-bold text-slate-900">Let's get sharper today.</h1>
        </div>
        <Link
          to="/scenarios"
          className="flex items-center gap-2 px-4 py-2.5 gradient-brand text-white rounded-lg font-semibold text-sm shadow-lg shadow-brand-500/30 hover:shadow-xl transition-all"
        >
          <BookOpen size={16} /> Browse Scenarios
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-6">
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">Your Score</h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5">
              <ArrowUpRight size={14} /> +4 this week
            </span>
          </div>
          <div className="flex items-center gap-6">
            <ScoreGauge score={currentUser.overallScore} size={130} />
            <div className="flex-1 space-y-2.5">
              <Stat icon={Trophy} label="Rank" value={`#${currentUser.rank} / ${currentUser.totalPromoters}`} />
              <Stat icon={Flame} label="Streak" value={`${currentUser.streak} days`} />
              <Stat icon={Award} label="Badges" value={`${currentUser.badges.length}`} />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">Weekly Goal</h3>
            <Target size={16} className="text-slate-400" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <div className="text-2xl font-bold text-slate-900 leading-none">
                {currentUser.sessionsThisWeek}<span className="text-sm text-slate-400 font-medium"> / {currentUser.sessionsTarget}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">sessions completed</div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                <div className="h-full gradient-brand rounded-full transition-all" style={{ width: `${sessionsProgress}%` }} />
              </div>
            </div>
            <div className="border-l border-slate-100 pl-3">
              <div className="text-2xl font-bold text-slate-900 leading-none">
                {currentUser.daysActiveThisWeek}<span className="text-sm text-slate-400 font-medium"> / {currentUser.daysTarget}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">days active</div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                <div className="h-full bg-aqua-500 rounded-full transition-all" style={{ width: `${daysProgress}%` }} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {[1, 1, 1, 1, 0.7, 0, 0].map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-full h-7 rounded ${v >= 1 ? 'bg-brand-500' : v > 0 ? 'bg-brand-300' : 'bg-slate-100'}`} />
                <span className="text-[10px] text-slate-400 font-medium">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">Skill Profile</h3>
            <TrendingUp size={16} className="text-slate-400" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={skillRadarData} margin={{ top: 0, right: 30, bottom: 0, left: 30 }}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: '#64748b' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="#1a6ef5" fill="#1a6ef5" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-6">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900">Team Performance Trend</h3>
              <p className="text-xs text-slate-500">Average score across all promoters in your region</p>
            </div>
            <select
              value={period}
              onChange={e => setPeriod(e.target.value as Period)}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-700 cursor-pointer hover:bg-slate-50"
            >
              {(Object.keys(PERIOD_LABEL) as Period[]).map(k => (
                <option key={k} value={k}>{PERIOD_LABEL[k]}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="avgScore"
                stroke="#1a6ef5"
                strokeWidth={3}
                dot={{ fill: '#1a6ef5', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#06b6d4"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Recent Sessions</h3>
            <Link to="/reports" className="text-xs text-brand-600 font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentMerged.map(s => {
              const live = isUserSession(s);
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSession(s)}
                  className={`w-full flex items-center gap-3 p-2.5 -mx-2 hover:bg-slate-50 rounded-lg text-left transition ${live ? 'bg-emerald-50/30 border border-emerald-100' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    s.overallScore >= 85 ? 'bg-emerald-100 text-emerald-700' :
                    s.overallScore >= 70 ? 'bg-brand-100 text-brand-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {s.overallScore}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 truncate flex items-center gap-1.5">
                      <span className="truncate">{s.scenarioTitle}</span>
                      {live && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-500 text-white rounded text-[9px] font-bold uppercase tracking-wider shrink-0">
                          <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
                          Live
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span>{s.date} · {s.duration}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        s.language === 'en' ? 'bg-blue-100 text-blue-700' :
                        s.language === 'hi' ? 'bg-orange-100 text-orange-700' :
                        s.language === 'ta' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>{s.language}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <BookOpen size={18} className="text-brand-600" />
              Recommended for you
            </h3>
            <p className="text-xs text-slate-500">Based on your weak areas — Product Knowledge & Closing</p>
          </div>
          <Link to="/scenarios" className="text-xs text-brand-600 font-semibold hover:underline">Browse all scenarios →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommended.map(s => (
            <Link
              key={s.id}
              to={`/simulator?scenario=${s.id}`}
              className="border border-slate-200 hover:border-brand-300 hover:shadow-md rounded-xl p-4 transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{s.customerPersona.avatar}</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                  {s.category}
                </span>
              </div>
              <div className="font-semibold text-sm text-slate-900 mb-1 group-hover:text-brand-600">{s.title}</div>
              <div className="text-xs text-slate-500 mb-3 line-clamp-2">{s.description}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{s.duration} · {s.difficulty}</span>
                <ArrowUpRight size={14} className="text-brand-500 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <SessionDrawer session={selectedSession} onClose={() => setSelectedSession(null)} />
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-slate-400" />
      <div className="flex-1 text-xs">
        <span className="text-slate-500">{label}: </span>
        <span className="font-semibold text-slate-800">{value}</span>
      </div>
    </div>
  );
}

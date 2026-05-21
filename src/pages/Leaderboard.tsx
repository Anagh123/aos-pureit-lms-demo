import { useMemo, useState } from 'react';
import { Trophy, Medal, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { promoters } from '../data/mockData';

type Filter = 'overall' | 'week' | 'region';

const FILTER_LABEL: Record<Filter, string> = {
  overall: 'Overall',
  week: 'This Week',
  region: 'My Region'
};

export function Leaderboard() {
  const [filter, setFilter] = useState<Filter>('overall');

  const sorted = useMemo(() => {
    if (filter === 'week') {
      return [...promoters].sort((a, b) => {
        const aDelta = a.weeklyTrend[a.weeklyTrend.length - 1] - a.weeklyTrend[0];
        const bDelta = b.weeklyTrend[b.weeklyTrend.length - 1] - b.weeklyTrend[0];
        return bDelta - aDelta;
      });
    }
    if (filter === 'region') {
      return [...promoters].filter(p => p.region.toLowerCase().includes('mumbai'))
        .sort((a, b) => b.overallScore - a.overallScore);
    }
    return [...promoters].sort((a, b) => b.overallScore - a.overallScore);
  }, [filter]);

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">National Leaderboard</h1>
        <p className="text-sm text-slate-500">
          Top promoters across all AO Smith + Pureit stores ·{' '}
          {filter === 'overall' && 'Ranked by overall score'}
          {filter === 'week' && 'Ranked by week-over-week improvement'}
          {filter === 'region' && `Filtered to Mumbai region · ${sorted.length} promoters`}
        </p>
      </div>

      {top3.length >= 3 ? (
        <div className="grid grid-cols-3 gap-5 mb-8">
          <PodiumCard p={top3[1]} rank={2} height="h-48" />
          <PodiumCard p={top3[0]} rank={1} height="h-56" featured />
          <PodiumCard p={top3[2]} rank={3} height="h-44" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center mb-6">
          <div className="text-3xl mb-2">📍</div>
          <div className="font-semibold text-slate-700">Only {sorted.length} promoter(s) in your region</div>
          <div className="text-sm text-slate-500 mt-1">Switch to "Overall" or "This Week" to see the full leaderboard.</div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
            {(Object.keys(FILTER_LABEL) as Filter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-md transition ${
                  filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {FILTER_LABEL[f]}
              </button>
            ))}
          </div>
        </div>

        {rest.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">No additional promoters to show.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {rest.map((p, i) => {
              const rank = i + 4;
              const isMe = p.name === 'Arjun Mehta';
              const weekDelta = p.weeklyTrend[p.weeklyTrend.length - 1] - p.weeklyTrend[0];
              return (
                <div key={p.id} className={`flex items-center gap-4 p-4 ${isMe ? 'bg-brand-50/40' : ''}`}>
                  <div className="w-8 text-center text-sm font-bold text-slate-400">#{rank}</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-100 to-aqua-100 flex items-center justify-center text-xl">
                    {p.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                      {p.name}
                      {isMe && <span className="text-[10px] px-1.5 py-0.5 bg-brand-100 text-brand-700 rounded font-bold">YOU</span>}
                    </div>
                    <div className="text-xs text-slate-500">{p.region} · {p.store}</div>
                  </div>
                  <div className="text-xs text-slate-500 hidden md:block">{p.sessionsCompleted} sessions</div>
                  <div className={`text-xs font-bold flex items-center gap-0.5 ${
                    weekDelta > 0 ? 'text-emerald-600' : 'text-red-500'
                  }`}>
                    {weekDelta > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(weekDelta)}
                  </div>
                  <div className="text-xl font-bold text-slate-900 w-12 text-right">
                    {filter === 'week' ? (weekDelta > 0 ? '+' : '') + weekDelta : p.overallScore}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function PodiumCard({ p, rank, height, featured }: any) {
  const colors = {
    1: { bg: 'from-yellow-400 to-yellow-500', shadow: 'shadow-yellow-500/40', rankText: 'text-yellow-700', border: 'border-yellow-300' },
    2: { bg: 'from-slate-300 to-slate-400', shadow: 'shadow-slate-400/40', rankText: 'text-slate-600', border: 'border-slate-300' },
    3: { bg: 'from-orange-400 to-orange-500', shadow: 'shadow-orange-500/40', rankText: 'text-orange-700', border: 'border-orange-300' }
  }[rank as 1 | 2 | 3];

  return (
    <div className={`flex flex-col items-center ${featured ? '-mt-4' : ''}`}>
      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center text-4xl mb-3 shadow-xl ${colors.shadow} relative`}>
        {p.avatar}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          {rank === 1 ? <Trophy size={16} className="text-yellow-500" /> :
           rank === 2 ? <Medal size={16} className="text-slate-400" /> :
           <Medal size={16} className="text-orange-500" />}
        </div>
      </div>
      <div className="font-bold text-slate-900 text-center">{p.name}</div>
      <div className="text-xs text-slate-500 mb-3">{p.region}</div>
      <div className={`text-3xl font-bold ${featured ? 'text-brand-600' : 'text-slate-900'}`}>{p.overallScore}</div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">avg score</div>
      <div className={`relative w-full ${height} rounded-t-2xl mt-3 overflow-hidden border-t-2 ${colors.border}`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${colors.bg} opacity-25`}></div>
        <div className="relative flex items-center justify-center h-full">
          <span className={`text-6xl font-extrabold ${colors.rankText} drop-shadow-sm`}>#{rank}</span>
        </div>
      </div>
    </div>
  );
}

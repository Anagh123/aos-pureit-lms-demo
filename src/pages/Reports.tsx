import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Download, X, Globe, ChevronRight, Calendar, Trash2, Zap, Repeat } from 'lucide-react';
import { SessionDrawer } from '../components/SessionDrawer';
import { HistoricalSession, Language } from '../types';
import { getAllSessions, getUserSessions, clearUserSessions, isUserSession } from '../data/sessionStore';

type ScoreFilter = 'all' | 'high' | 'mid' | 'low';
type LangFilter = 'all' | Language;
type DateRangePreset = 'all' | '7d' | '30d' | '90d' | 'custom';

const SCORE_LABEL: Record<ScoreFilter, string> = {
  all: 'All scores',
  high: '85 and above',
  mid: '70 – 84',
  low: 'Below 70'
};

const DATE_LABEL: Record<DateRangePreset, string> = {
  all: 'All time',
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  custom: 'Custom range'
};

const LANG_LABEL: Record<Language, string> = { en: 'English', hi: 'हिंदी', ta: 'தமிழ்', bn: 'বাংলা' };
const LANG_BADGE: Record<Language, string> = {
  en: 'bg-blue-100 text-blue-700',
  hi: 'bg-orange-100 text-orange-700',
  ta: 'bg-emerald-100 text-emerald-700',
  bn: 'bg-purple-100 text-purple-700'
};

const TODAY = '2026-05-21';

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function resolveDateRange(preset: DateRangePreset, customFrom: string, customTo: string): { from: string; to: string } | null {
  if (preset === 'all') return null;
  if (preset === '7d') return { from: addDays(TODAY, -7), to: TODAY };
  if (preset === '30d') return { from: addDays(TODAY, -30), to: TODAY };
  if (preset === '90d') return { from: addDays(TODAY, -90), to: TODAY };
  if (preset === 'custom' && customFrom && customTo) return { from: customFrom, to: customTo };
  return null;
}

function formatDateShort(d: string): string {
  const date = new Date(d);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function Reports() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>('all');
  const [langFilter, setLangFilter] = useState<LangFilter>('all');
  const [datePreset, setDatePreset] = useState<DateRangePreset>('all');
  const [customFrom, setCustomFrom] = useState('2026-04-01');
  const [customTo, setCustomTo] = useState(TODAY);
  const [selected, setSelected] = useState<HistoricalSession | null>(null);
  const [allSessions, setAllSessions] = useState<HistoricalSession[]>(() => getAllSessions());
  const [liveCount, setLiveCount] = useState<number>(() => getUserSessions().length);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setAllSessions(getAllSessions());
    setLiveCount(getUserSessions().length);
  }, []);

  const dateRange = useMemo(() => resolveDateRange(datePreset, customFrom, customTo), [datePreset, customFrom, customTo]);

  const filtered = useMemo(() => {
    return allSessions.filter(s => {
      if (scoreFilter === 'high' && s.overallScore < 85) return false;
      if (scoreFilter === 'mid' && (s.overallScore < 70 || s.overallScore >= 85)) return false;
      if (scoreFilter === 'low' && s.overallScore >= 70) return false;
      if (langFilter !== 'all' && s.language !== langFilter) return false;
      if (dateRange && (s.date < dateRange.from || s.date > dateRange.to)) return false;
      return true;
    });
  }, [allSessions, scoreFilter, langFilter, dateRange]);

  const handleClearLive = () => {
    clearUserSessions();
    setAllSessions(getAllSessions());
    setLiveCount(0);
    setShowClearConfirm(false);
  };

  const activeFilterCount = (scoreFilter !== 'all' ? 1 : 0) + (langFilter !== 'all' ? 1 : 0) + (datePreset !== 'all' ? 1 : 0);

  const exportCsv = () => {
    const rows = [
      ['Date', 'Scenario', 'Customer', 'Language', 'Duration', 'Score'],
      ...filtered.map(s => [s.date, s.scenarioTitle, s.customerName, LANG_LABEL[s.language], s.duration, s.overallScore.toString()])
    ];
    const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const suffix = dateRange ? `_${dateRange.from}_to_${dateRange.to}` : `_${new Date().toISOString().slice(0, 10)}`;
    a.download = `aquacoach-sessions${suffix}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setScoreFilter('all');
    setLangFilter('all');
    setDatePreset('all');
  };

  const dateChipLabel = (): string => {
    if (datePreset === 'custom' && dateRange) {
      return `${formatDateShort(dateRange.from)} – ${formatDateShort(dateRange.to)}`;
    }
    return DATE_LABEL[datePreset];
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">My Training History</h1>
          <p className="text-sm text-slate-500 flex items-center gap-2 flex-wrap">
            <span>{filtered.length} {filtered.length === 1 ? 'session' : 'sessions'}</span>
            {liveCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Zap size={9} fill="currentColor" /> {liveCount} live
              </span>
            )}
            {activeFilterCount > 0 && <span>· {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>}
            <span className="text-slate-400">· Click any row to view the full transcript & breakdown</span>
          </p>
        </div>
        <div className="flex gap-2 items-start">
          {liveCount > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowClearConfirm(c => !c)}
                className="px-3 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-sm font-medium flex items-center gap-1.5"
                title="Remove sessions you completed in this browser"
              >
                <Trash2 size={14} /> Clear my live sessions
              </button>
              {showClearConfirm && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-xl z-40 p-4">
                  <div className="text-sm font-semibold text-slate-900 mb-1">Clear {liveCount} live session{liveCount > 1 ? 's' : ''}?</div>
                  <div className="text-xs text-slate-500 mb-3">This removes only the sessions you completed in this browser. Demo data stays.</div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowClearConfirm(false)} className="flex-1 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded hover:bg-slate-50">
                      Cancel
                    </button>
                    <button onClick={handleClearLive} className="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded">
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(o => !o)}
              className={`px-3 py-2 border rounded-lg text-sm font-medium flex items-center gap-1.5 ${
                activeFilterCount > 0
                  ? 'bg-brand-50 border-brand-300 text-brand-700'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Filter size={14} /> Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-slate-200 rounded-lg shadow-xl z-30 overflow-hidden">
                <div className="px-3 py-2 border-b border-slate-100 text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1.5">
                  <Calendar size={11} /> Date range
                </div>
                {(Object.keys(DATE_LABEL) as DateRangePreset[]).map(k => (
                  <button
                    key={k}
                    onClick={() => setDatePreset(k)}
                    className={`w-full text-left px-3.5 py-2 text-sm hover:bg-slate-50 ${
                      datePreset === k ? 'text-brand-600 font-semibold bg-brand-50/50' : 'text-slate-700'
                    }`}
                  >
                    {DATE_LABEL[k]}
                  </button>
                ))}
                {datePreset === 'custom' && (
                  <div className="px-3.5 py-3 bg-slate-50/50 border-t border-slate-100 space-y-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">From</label>
                      <input
                        type="date"
                        value={customFrom}
                        max={customTo}
                        onChange={e => setCustomFrom(e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">To</label>
                      <input
                        type="date"
                        value={customTo}
                        min={customFrom}
                        max={TODAY}
                        onChange={e => setCustomTo(e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs"
                      />
                    </div>
                  </div>
                )}

                <div className="px-3 py-2 border-y border-slate-100 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                  Score range
                </div>
                {(Object.keys(SCORE_LABEL) as ScoreFilter[]).map(k => (
                  <button
                    key={k}
                    onClick={() => setScoreFilter(k)}
                    className={`w-full text-left px-3.5 py-2 text-sm hover:bg-slate-50 ${
                      scoreFilter === k ? 'text-brand-600 font-semibold bg-brand-50/50' : 'text-slate-700'
                    }`}
                  >
                    {SCORE_LABEL[k]}
                  </button>
                ))}

                <div className="px-3 py-2 border-y border-slate-100 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                  Language
                </div>
                {(['all', 'en', 'hi', 'ta', 'bn'] as LangFilter[]).map(k => (
                  <button
                    key={k}
                    onClick={() => setLangFilter(k)}
                    className={`w-full text-left px-3.5 py-2 text-sm hover:bg-slate-50 ${
                      langFilter === k ? 'text-brand-600 font-semibold bg-brand-50/50' : 'text-slate-700'
                    }`}
                  >
                    {k === 'all' ? 'All languages' : LANG_LABEL[k]}
                  </button>
                ))}

                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="w-full text-center px-3.5 py-2 text-xs text-slate-500 hover:bg-slate-50 border-t border-slate-100 font-semibold"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
          <button
            onClick={exportCsv}
            className="px-3 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium flex items-center gap-1.5"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          {datePreset !== 'all' && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-700">
              <Calendar size={11} /> <span className="font-semibold">Date:</span> {dateChipLabel()}
              <button onClick={() => setDatePreset('all')} className="hover:text-brand-900"><X size={12} /></button>
            </div>
          )}
          {scoreFilter !== 'all' && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-700">
              <span className="font-semibold">Score:</span> {SCORE_LABEL[scoreFilter]}
              <button onClick={() => setScoreFilter('all')} className="hover:text-brand-900"><X size={12} /></button>
            </div>
          )}
          {langFilter !== 'all' && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-700">
              <Globe size={11} /> <span className="font-semibold">Language:</span> {LANG_LABEL[langFilter]}
              <button onClick={() => setLangFilter('all')} className="hover:text-brand-900"><X size={12} /></button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-3xl mb-2">📭</div>
            <div className="font-semibold text-slate-700">No sessions match the active filters</div>
            <div className="text-sm text-slate-500 mt-1">Try widening the date range, score, or language.</div>
            <button onClick={clearAll} className="mt-4 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg">
              Clear all filters
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                <th className="text-left py-3 px-5">Date</th>
                <th className="text-left py-3">Scenario</th>
                <th className="text-left py-3">Customer</th>
                <th className="text-center py-3">Language</th>
                <th className="text-center py-3">Duration</th>
                <th className="text-center py-3">Score</th>
                <th className="text-center py-3 pr-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const live = isUserSession(s);
                return (
                <tr
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition ${live ? 'bg-emerald-50/30' : ''}`}
                >
                  <td className="py-4 px-5 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span>{formatDateShort(s.date)}</span>
                      {live && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500 text-white rounded text-[9px] font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                          Live
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-sm font-medium text-slate-900">{s.scenarioTitle}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.customerAvatar}</span>
                      <span className="text-sm text-slate-700">{s.customerName}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${LANG_BADGE[s.language]}`}>
                      {s.language}
                    </span>
                  </td>
                  <td className="text-center text-sm font-mono text-slate-600">{s.duration}</td>
                  <td className="text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                      s.overallScore >= 85 ? 'bg-emerald-100 text-emerald-700' :
                      s.overallScore >= 70 ? 'bg-brand-100 text-brand-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{s.overallScore}</span>
                  </td>
                  <td className="text-center pr-5">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        to={`/simulator?scenario=${s.scenarioId}`}
                        onClick={e => e.stopPropagation()}
                        title="Retry this scenario"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-brand-600 border border-brand-200 hover:bg-brand-50 transition"
                      >
                        <Repeat size={12} /> Retry
                      </Link>
                      <ChevronRight size={14} className="text-slate-300" />
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <SessionDrawer session={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

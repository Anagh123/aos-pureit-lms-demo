import { useEffect, useState } from 'react';
import { X, Eye, MessageSquare, TrendingUp, Clock, AlertTriangle, CheckCircle2, Sparkles, Share2, Repeat, Globe, Zap } from 'lucide-react';
import { isUserSession } from '../data/sessionStore';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import { HistoricalSession, Language } from '../types';
import { ScoreGauge } from './ScoreGauge';

// One distinct colour per skill dimension (matches the Feedback scorecard) so
// the six bars are visually separable rather than all the same colour.
const SKILL_COLORS = ['#1a6ef5', '#8b5cf6', '#f59e0b', '#06b6d4', '#ec4899', '#10b981'];

const LANG_LABEL: Record<Language, string> = { en: 'English', hi: 'हिंदी', ta: 'தமிழ்', bn: 'বাংলা' };
const LANG_COLOR: Record<Language, string> = {
  en: 'bg-blue-100 text-blue-700 border-blue-200',
  hi: 'bg-orange-100 text-orange-700 border-orange-200',
  ta: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  bn: 'bg-purple-100 text-purple-700 border-purple-200'
};

interface Props {
  session: HistoricalSession | null;
  onClose: () => void;
}

export function SessionDrawer({ session, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'compare'>('overview');
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setActiveTab('overview');
    setShared(false);
  }, [session?.id]);

  useEffect(() => {
    if (!session) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [session, onClose]);

  if (!session) return null;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const breakdownData = [
    { metric: 'Pitch Quality', value: session.breakdown.pitchQuality },
    { metric: 'Product Knowledge', value: session.breakdown.productKnowledge },
    { metric: 'Objection Handling', value: session.breakdown.objectionHandling },
    { metric: 'Clarity', value: session.breakdown.clarity },
    { metric: 'Empathy', value: session.breakdown.empathy },
    { metric: 'Closing', value: session.breakdown.closingStrength }
  ];

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 4000);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 w-full max-w-3xl bg-white shadow-2xl z-50 flex flex-col">
        <div className="p-5 border-b border-slate-200 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-aqua-100 flex items-center justify-center text-2xl">
              {session.customerAvatar}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="text-xs uppercase tracking-wider font-bold text-slate-500">Session detail</div>
                {isUserSession(session) && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500 text-white rounded text-[9px] font-bold uppercase tracking-wider">
                    <Zap size={8} fill="currentColor" />
                    Your live session
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-slate-900">{session.scenarioTitle}</h2>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                <span>vs. {session.customerName}</span>
                <span>·</span>
                <span>{session.date}</span>
                <span>·</span>
                <span className="font-mono">{formatTime(session.durationSec)}</span>
                <span>·</span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${LANG_COLOR[session.language]}`}>
                  <Globe size={9} /> {LANG_LABEL[session.language]}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="flex border-b border-slate-200 px-5">
          {([
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'transcript', label: 'Full Transcript', icon: MessageSquare },
            { id: 'compare', label: 'Your Response vs. Ideal', icon: Eye }
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3 text-sm font-semibold flex items-center gap-1.5 border-b-2 transition ${
                activeTab === t.id
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-4 bg-gradient-to-br from-brand-50 to-aqua-50 rounded-2xl border border-brand-100 p-5 text-center">
                  <ScoreGauge score={session.overallScore} size={140} thickness={11} />
                  <div className="text-xs text-slate-600 mt-2">Overall session score</div>
                </div>
                <div className="col-span-12 sm:col-span-8 grid grid-cols-2 gap-3">
                  <MetricBlock icon={Clock} label="Duration" value={formatTime(session.durationSec)} />
                  <MetricBlock icon={MessageSquare} label="Talk Ratio" value={`${session.talkTimeRatio}%`} warn={session.talkTimeRatio > 65 || session.talkTimeRatio < 40} />
                  <MetricBlock icon={TrendingUp} label="Words/Min" value={`${session.wordsPerMinute}`} warn={session.wordsPerMinute > 180 || session.wordsPerMinute < 100} />
                  <MetricBlock icon={AlertTriangle} label="Filler Words" value={`${session.fillerWords}`} warn={session.fillerWords > 5} />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Skill breakdown</h4>
                <ResponsiveContainer width="100%" height={170}>
                  <BarChart data={breakdownData} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis type="category" dataKey="metric" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} width={130} />
                    <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={14}>
                      {breakdownData.map((_, i) => (
                        <Cell key={i} fill={SKILL_COLORS[i % SKILL_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    <h4 className="font-bold text-sm text-slate-900">What you did well</h4>
                  </div>
                  <ul className="space-y-1.5">
                    {session.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-slate-700 flex gap-1.5"><span className="text-emerald-600">✓</span>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={15} className="text-amber-600" />
                    <h4 className="font-bold text-sm text-slate-900">Areas to improve</h4>
                  </div>
                  <ul className="space-y-1.5">
                    {session.improvements.map((s, i) => (
                      <li key={i} className="text-xs text-slate-700 flex gap-1.5"><span className="text-amber-600">→</span>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="p-5">
              <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                <Sparkles size={12} className="text-purple-500" />
                Conversation conducted in <span className={`font-bold ${
                  session.language === 'en' ? 'text-blue-700' :
                  session.language === 'hi' ? 'text-orange-700' :
                  session.language === 'ta' ? 'text-emerald-700' :
                  'text-purple-700'
                }`}>{LANG_LABEL[session.language]}</span>
                · {session.transcript.length} messages
              </div>
              <div className="space-y-3">
                {session.transcript.map((t, i) => {
                  const isCustomer = t.speaker === 'customer';
                  return (
                    <div key={i} className={`flex gap-3 ${isCustomer ? '' : 'flex-row-reverse'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm ${
                        isCustomer ? 'bg-slate-200' : 'bg-brand-100'
                      }`}>
                        {isCustomer ? '👤' : '🧑‍💼'}
                      </div>
                      <div className={`max-w-xl ${isCustomer ? '' : 'items-end'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                            {isCustomer ? session.customerName : 'You'}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{formatTime(t.timestamp)}</div>
                        </div>
                        <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          isCustomer
                            ? 'bg-slate-100 border border-slate-200 rounded-tl-sm text-slate-800'
                            : 'bg-brand-500 text-white rounded-tr-sm'
                        }`}>
                          {t.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'compare' && (
            <div className="p-5 space-y-4">
              {session.idealComparisons.map((r, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs uppercase tracking-wider font-bold text-slate-500">Turn {i + 1}</div>
                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                      r.score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                      r.score >= 60 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>Scored {r.score}/100</div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5">Your response</div>
                      <div className="text-xs text-slate-800 leading-relaxed">"{r.you}"</div>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 mb-1.5 flex items-center gap-1">
                        <Sparkles size={9} /> Ideal response
                      </div>
                      <div className="text-xs text-emerald-900 leading-relaxed">"{r.ideal}"</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            {shared && (
              <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-semibold">
                ✓ Shared
              </span>
            )}
            <button
              onClick={handleShare}
              disabled={shared}
              className="px-3 py-2 border border-slate-200 hover:bg-white rounded-lg text-sm font-semibold text-slate-700 flex items-center gap-1.5 disabled:opacity-60"
            >
              <Share2 size={13} /> Share
            </button>
          </div>
          <Link
            to={`/simulator?scenario=${session.scenarioId}`}
            className="px-4 py-2 gradient-brand text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-brand-500/30"
          >
            <Repeat size={13} /> Retry this scenario
          </Link>
        </div>
      </div>
    </>
  );
}

function MetricBlock({ icon: Icon, label, value, warn = false }: { icon: any; label: string; value: string; warn?: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${warn ? 'bg-amber-50 text-amber-600' : 'bg-brand-50 text-brand-600'}`}>
        <Icon size={15} />
      </div>
      <div>
        <div className="text-lg font-bold text-slate-900 leading-tight">{value}</div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{label}</div>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';
import {
  Trophy, TrendingUp, AlertTriangle, CheckCircle2, Repeat, Share2,
  Sparkles, Clock, MessageSquare, Mic2, Eye, ArrowRight
} from 'lucide-react';
import { ScoreGauge } from '../components/ScoreGauge';
import { Scenario, SessionResult } from '../types';

export function Feedback() {
  const navigate = useNavigate();
  const [result, setResult] = useState<SessionResult | null>(null);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [activeTab, setActiveTab] = useState<'breakdown' | 'transcript' | 'compare'>('breakdown');
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 4000);
  };

  useEffect(() => {
    const r = sessionStorage.getItem('lastSessionResult');
    const s = sessionStorage.getItem('lastSessionScenario');
    if (!r || !s) {
      navigate('/scenarios');
      return;
    }
    setResult(JSON.parse(r));
    setScenario(JSON.parse(s));
  }, [navigate]);

  const breakdownData = useMemo(() => {
    if (!result) return [];
    return [
      { metric: 'Pitch Quality', value: result.breakdown.pitchQuality },
      { metric: 'Product Knowledge', value: result.breakdown.productKnowledge },
      { metric: 'Objection Handling', value: result.breakdown.objectionHandling },
      { metric: 'Clarity', value: result.breakdown.clarity },
      { metric: 'Empathy', value: result.breakdown.empathy },
      { metric: 'Closing', value: result.breakdown.closingStrength }
    ];
  }, [result]);

  if (!result || !scenario) {
    return <div className="p-8">Loading...</div>;
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;
  const grade = result.overallScore >= 90 ? 'A+' : result.overallScore >= 80 ? 'A' :
                result.overallScore >= 70 ? 'B' : result.overallScore >= 60 ? 'C' : 'D';

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <Link to="/scenarios" className="text-sm text-slate-500 hover:text-slate-900 mb-3 inline-block">
          ← Back to scenarios
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-brand-500" />
              <span className="text-xs uppercase tracking-wider font-bold text-brand-600">Session Complete</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{scenario.title}</h1>
            <p className="text-sm text-slate-500 mt-1">vs. {scenario.customerPersona.name} · {formatTime(result.durationSec)}</p>
          </div>
          <div className="flex gap-2 items-center">
            {shared && (
              <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                ✓ Shared with Sanjeev
              </span>
            )}
            <button
              onClick={handleShare}
              disabled={shared}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-semibold text-slate-700 flex items-center gap-2 disabled:opacity-60"
            >
              <Share2 size={14} /> Share with Manager
            </button>
            <Link
              to={`/simulator?scenario=${scenario.id}`}
              className="px-4 py-2 gradient-brand text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg shadow-brand-500/30"
            >
              <Repeat size={14} /> Retry Scenario
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-6">
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-x-0 -top-20 h-40 gradient-brand opacity-5"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold mb-4">
              <Trophy size={12} /> Grade {grade}
            </div>
            <ScoreGauge score={result.overallScore} size={170} label="Overall Score" thickness={12} />
            <p className="text-sm text-slate-500 mt-4 max-w-xs mx-auto">
              {result.overallScore >= 85 ? 'Excellent! You handled this scenario like a pro.' :
               result.overallScore >= 70 ? 'Solid effort — a few tweaks will get you to top tier.' :
               'Good attempt. Review the coaching notes and try again.'}
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon={Clock} label="Duration" value={formatTime(result.durationSec)} sub="Total session" color="blue" />
          <MetricCard icon={MessageSquare} label="Talk Ratio" value={`${result.talkTimeRatio}%`} sub="You vs. customer" color="emerald" warn={result.talkTimeRatio > 65 || result.talkTimeRatio < 40} />
          <MetricCard icon={Mic2} label="Words/Min" value={`${result.wordsPerMinute}`} sub="Speech pace" color="purple" warn={result.wordsPerMinute > 180 || result.wordsPerMinute < 100} />
          <MetricCard icon={AlertTriangle} label="Filler Words" value={`${result.fillerWords}`} sub='"um", "like", "uh"' color="amber" warn={result.fillerWords > 5} />

          <div className="col-span-2 md:col-span-4 bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500">Skill Breakdown</h3>
              <span className="text-xs text-slate-400">vs. team average</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={breakdownData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="metric" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} width={130} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}>
                  {breakdownData.map((d, i) => (
                    <Cell key={i} fill={d.value >= 85 ? '#10b981' : d.value >= 70 ? '#1a6ef5' : d.value >= 55 ? '#f59e0b' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-6">
        <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-900">What you did well</h3>
          </div>
          <ul className="space-y-2.5">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/50 to-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <TrendingUp size={16} className="text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-900">Areas to improve</h3>
          </div>
          <ul className="space-y-2.5">
            {result.improvements.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="text-amber-600 mt-0.5">→</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          {([
            { id: 'breakdown', label: 'Performance Detail', icon: TrendingUp },
            { id: 'compare', label: 'Your Response vs. Ideal', icon: Eye },
            { id: 'transcript', label: 'Full Transcript', icon: MessageSquare }
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-6 py-3.5 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
                activeTab === t.id
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'breakdown' && (
            <div className="grid md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={breakdownData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#475569' }} />
                  <Radar dataKey="value" stroke="#1a6ef5" fill="#1a6ef5" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 mb-2">Sentence-level analysis</h4>
                <DetailRow label="Sentence clarity" value={`${result.sentenceClarity}%`} good={result.sentenceClarity > 75} />
                <DetailRow label="Filler word count" value={`${result.fillerWords}`} good={result.fillerWords < 5} />
                <DetailRow label="Words per minute" value={`${result.wordsPerMinute}`} good={result.wordsPerMinute >= 120 && result.wordsPerMinute <= 160} />
                <DetailRow label="Talk-to-listen ratio" value={`${result.talkTimeRatio}% : ${100 - result.talkTimeRatio}%`} good={result.talkTimeRatio >= 40 && result.talkTimeRatio <= 60} />
                <DetailRow label="Turns completed" value={`${result.idealResponses.length} / ${result.idealResponses.length}`} good={true} />
              </div>
            </div>
          )}

          {activeTab === 'compare' && (
            <div className="space-y-5">
              {result.idealResponses.map((r, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs uppercase tracking-wider font-bold text-slate-500">Turn {i + 1}</div>
                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                      r.score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                      r.score >= 60 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>Scored {r.score}/100</div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Your response</div>
                      <div className="text-sm text-slate-800 leading-relaxed">"{r.you}"</div>
                    </div>
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 mb-2 flex items-center gap-1">
                        <Sparkles size={10} /> Ideal response
                      </div>
                      <div className="text-sm text-emerald-900 leading-relaxed">"{r.ideal}"</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="space-y-3">
              {result.transcript.map((t, i) => (
                <div key={i} className="flex gap-3">
                  <div className="text-xs font-mono text-slate-400 w-12 mt-0.5">
                    {`${Math.floor(t.timestamp / 60)}:${(t.timestamp % 60).toString().padStart(2, '0')}`}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-0.5">
                      {t.speaker === 'customer' ? scenario.customerPersona.name : 'You'}
                    </div>
                    <div className="text-sm text-slate-800">{t.text}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-brand-500 to-aqua-500 rounded-2xl p-6 text-white flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider font-bold opacity-80 mb-1">Next up</div>
          <div className="font-bold text-lg mb-1">Ready for a harder challenge?</div>
          <div className="text-sm opacity-90">Try "The TDS Worry" — our advanced product-knowledge scenario.</div>
        </div>
        <Link
          to="/simulator?scenario=tds-concern"
          className="px-5 py-3 bg-white text-brand-600 rounded-lg font-bold text-sm flex items-center gap-2 hover:scale-105 transition"
        >
          Try it now <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon, label, value, sub, color, warn = false
}: {
  icon: any; label: string; value: string; sub: string;
  color: 'blue' | 'emerald' | 'amber' | 'purple'; warn?: boolean;
}) {
  const colors = {
    blue: 'bg-brand-50 text-brand-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600'
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon size={16} />
        </div>
        {warn && <AlertTriangle size={14} className="text-amber-500" />}
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
      <div className="text-[10px] text-slate-400 mt-0.5">{sub}</div>
    </div>
  );
}

function DetailRow({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-600">{label}</span>
      <span className={`text-sm font-bold ${good ? 'text-emerald-600' : 'text-amber-600'}`}>{value}</span>
    </div>
  );
}

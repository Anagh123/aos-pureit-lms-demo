import { Clock, Play, Users, TrendingUp, Languages } from 'lucide-react';
import { Scenario, Language } from '../types';
import { Link } from 'react-router-dom';

const LANG_LABEL: Record<Language, string> = { en: 'EN', hi: 'HI', ta: 'TA', bn: 'BN' };

const CATEGORY_COLORS: Record<string, string> = {
  'Objection Handling': 'bg-orange-100 text-orange-700',
  'Product Knowledge': 'bg-purple-100 text-purple-700',
  'Comparison': 'bg-blue-100 text-blue-700',
  'Closing': 'bg-emerald-100 text-emerald-700'
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-600 border-amber-200',
  Advanced: 'bg-red-50 text-red-600 border-red-200'
};

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-brand-200 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${CATEGORY_COLORS[scenario.category]}`}>
          {scenario.category}
        </span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[scenario.difficulty]}`}>
          {scenario.difficulty}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{scenario.customerPersona.avatar}</span>
        <div className="text-xs text-slate-500">vs. {scenario.customerPersona.name}</div>
      </div>

      <h3 className="font-bold text-slate-900 mb-1.5 group-hover:text-brand-600 transition-colors">
        {scenario.title}
      </h3>
      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
        {scenario.description}
      </p>

      <div className="flex items-center gap-4 mb-3 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          {scenario.duration}
        </div>
        <div className="flex items-center gap-1">
          <Users size={12} />
          {scenario.completions.toLocaleString()}
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp size={12} />
          {scenario.avgScore}% avg
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-4">
        <Languages size={12} className="text-slate-400" />
        {scenario.supportedLanguages.map(l => (
          <span
            key={l}
            className={`text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded ${
              l === 'en' ? 'bg-blue-100 text-blue-700' :
              l === 'hi' ? 'bg-orange-100 text-orange-700' :
              l === 'ta' ? 'bg-emerald-100 text-emerald-700' :
              'bg-purple-100 text-purple-700'
            }`}
          >
            {LANG_LABEL[l]}
          </span>
        ))}
        {scenario.supportedLanguages.length === 1 && (
          <span className="text-[10px] text-slate-400 italic ml-1">English only</span>
        )}
      </div>

      <Link
        to={`/simulator?scenario=${scenario.id}`}
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors"
      >
        <Play size={14} fill="currentColor" /> Start Roleplay
      </Link>
    </div>
  );
}

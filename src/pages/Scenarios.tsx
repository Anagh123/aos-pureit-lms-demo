import { useState } from 'react';
import { Filter, Search, Languages } from 'lucide-react';
import { scenarios } from '../data/scenarios';
import { ScenarioCard } from '../components/ScenarioCard';
import { Language } from '../types';

const CATEGORIES = ['All', 'Objection Handling', 'Product Knowledge', 'Comparison', 'Closing'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const LANG_OPTIONS: { id: 'all' | Language; label: string }[] = [
  { id: 'all', label: 'All Languages' },
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिंदी' },
  { id: 'ta', label: 'தமிழ்' },
  { id: 'bn', label: 'বাংলা' }
];

export function Scenarios() {
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [language, setLanguage] = useState<'all' | Language>('all');
  const [query, setQuery] = useState('');

  const filtered = scenarios.filter(s => {
    if (category !== 'All' && s.category !== category) return false;
    if (difficulty !== 'All' && s.difficulty !== difficulty) return false;
    if (language !== 'all' && !s.supportedLanguages.includes(language)) return false;
    if (query && !s.title.toLowerCase().includes(query.toLowerCase()) &&
        !s.description.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const langCounts = {
    en: scenarios.filter(s => s.supportedLanguages.includes('en')).length,
    hi: scenarios.filter(s => s.supportedLanguages.includes('hi')).length,
    ta: scenarios.filter(s => s.supportedLanguages.includes('ta')).length,
    bn: scenarios.filter(s => s.supportedLanguages.includes('bn')).length
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Scenario Library</h1>
        <p className="text-sm text-slate-500">
          {scenarios.length} scenarios across AO Smith & Pureit product range ·{' '}
          <span className="text-blue-600 font-semibold">{langCounts.en} EN</span> ·{' '}
          <span className="text-orange-600 font-semibold">{langCounts.hi} HI</span> ·{' '}
          <span className="text-emerald-600 font-semibold">{langCounts.ta} TA</span> ·{' '}
          <span className="text-purple-600 font-semibold">{langCounts.bn} BN</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg flex-1 max-w-md">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search scenarios..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-500" />
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Category</span>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition ${
                  category === c ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-2 items-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Level:</span>
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                difficulty === d
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-slate-200"></div>

        <div className="flex gap-2 items-center">
          <Languages size={14} className="text-slate-500" />
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Language:</span>
          {LANG_OPTIONS.map(l => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                language === l.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <div className="font-semibold text-slate-700">No scenarios match your filters</div>
          <div className="text-sm text-slate-500 mt-1">Try adjusting the search or filters.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(s => <ScenarioCard key={s.id} scenario={s} />)}
        </div>
      )}
    </div>
  );
}

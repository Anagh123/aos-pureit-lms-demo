import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, ArrowRight, Sparkles, Mic2, Trophy, BarChart3 } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('arjun.mehta@aopureit.in');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/dashboard'), 800);
  };

  const handleForgot = () => {
    setResetSent(true);
    setTimeout(() => setResetSent(false), 4000);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-brand p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-aqua-400/30 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Droplets className="text-white" size={28} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-white font-bold text-xl leading-tight">AquaCoach AI</div>
              <div className="text-white/70 text-xs uppercase tracking-wider font-medium">Sales Training Platform</div>
            </div>
          </div>
        </div>

        <div className="relative space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur rounded-full text-xs text-white/90 font-medium mb-4">
              <Sparkles size={12} /> Powered by Conversational AI
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-3">
              Train your promoters to<br />sell like top performers.
            </h1>
            <p className="text-white/80 text-base leading-relaxed max-w-lg">
              Realistic AI-driven customer roleplays. Live scoring. Personalized coaching.
              Built for AO Smith + Pureit retail teams across India.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-lg">
            {[
              { icon: Mic2, label: 'AI Roleplay' },
              { icon: BarChart3, label: 'Live Scoring' },
              { icon: Trophy, label: 'Leaderboards' }
            ].map((f, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                <f.icon className="text-white mb-2" size={20} />
                <div className="text-white text-sm font-semibold">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-6 text-white/70 text-xs">
          <div>
            <div className="text-white text-2xl font-bold">4</div>
            <div>Languages supported<br/>EN · HI · TA · BN</div>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div>
            <div className="text-white text-2xl font-bold">Voice-first</div>
            <div>Realistic AI roleplay<br/>directly in your browser</div>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div>
            <div className="text-white text-2xl font-bold">Retail-ready</div>
            <div>Designed for AO Smith<br/>+ Pureit store promoters</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
              <Droplets className="text-white" size={20} />
            </div>
            <div className="font-bold text-slate-900">AquaCoach AI</div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
            <p className="text-sm text-slate-500">Sign in to start your training session</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition text-sm"
                required
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" defaultChecked className="rounded" />
                Remember me
              </label>
              <button type="button" onClick={handleForgot} className="text-brand-600 font-semibold hover:underline cursor-pointer">
                Forgot password?
              </button>
            </div>

            {resetSent && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
                <span>✓</span>
                <span>A password reset link has been sent to <strong>{email}</strong>. Check your inbox in a minute.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 gradient-brand text-white font-semibold rounded-lg shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : (<>Sign in <ArrowRight size={16} /></>)}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
            <div className="flex-1 h-px bg-slate-200"></div>
            OR
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg text-sm transition"
          >
            Continue with SSO (Pureit ID)
          </button>

          <p className="text-center text-xs text-slate-500 mt-8">
            Need access? Contact your zonal manager or<br />
            <a className="text-brand-600 font-semibold hover:underline">training@aopureit.in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

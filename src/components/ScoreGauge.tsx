interface Props {
  score: number;
  size?: number;
  label?: string;
  thickness?: number;
}

export function ScoreGauge({ score, size = 140, label = 'Overall', thickness = 10 }: Props) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? '#10b981' : score >= 70 ? '#1a6ef5' : score >= 55 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-slate-900">{score}</div>
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">{label}</div>
      </div>
    </div>
  );
}

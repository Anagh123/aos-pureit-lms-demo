interface Props {
  active: boolean;
  color?: string;
  bars?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function WaveformAnimation({ active, color = 'bg-brand-500', bars = 5, size = 'md' }: Props) {
  const sizing = {
    sm: { container: 'h-6 gap-0.5', bar: 'w-1' },
    md: { container: 'h-10 gap-1', bar: 'w-1.5' },
    lg: { container: 'h-16 gap-1.5', bar: 'w-2' }
  }[size];

  const animations = ['animate-wave-1', 'animate-wave-2', 'animate-wave-3', 'animate-wave-4', 'animate-wave-5'];

  return (
    <div className={`flex items-center justify-center ${sizing.container}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`${sizing.bar} ${color} rounded-full transition-all ${
            active ? animations[i % 5] : 'h-1.5 opacity-40'
          }`}
          style={active ? { height: '100%' } : {}}
        />
      ))}
    </div>
  );
}

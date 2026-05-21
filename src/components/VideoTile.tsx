import { useEffect, useRef } from 'react';
import { MicOff, VideoOff, Sparkles } from 'lucide-react';
import { WaveformAnimation } from './WaveformAnimation';

interface BaseProps {
  name: string;
  subtitle?: string;
  speaking?: boolean;
  micMuted?: boolean;
  isYou?: boolean;
}

interface VideoTileVideoProps extends BaseProps {
  variant: 'video';
  stream: MediaStream | null;
  cameraOn: boolean;
}

interface VideoTileAvatarProps extends BaseProps {
  variant: 'avatar';
  avatarUrl: string;
  fallbackEmoji: string;
}

type Props = VideoTileVideoProps | VideoTileAvatarProps;

export function VideoTile(props: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (props.variant === 'video' && videoRef.current && props.stream) {
      videoRef.current.srcObject = props.stream;
    }
  }, [props]);

  const ringClass = props.speaking
    ? 'ring-[6px] ring-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.5)]'
    : 'ring-2 ring-slate-700/50';

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 transition-all ${ringClass}`}>
      {props.variant === 'video' ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${!props.cameraOn ? 'opacity-0' : ''} ${props.isYou ? '-scale-x-100' : ''}`}
          />
          {!props.cameraOn && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
              <div className="w-28 h-28 rounded-full bg-slate-700 flex items-center justify-center text-5xl">
                🎥
              </div>
            </div>
          )}
        </>
      ) : (
        <AvatarBackground avatarUrl={props.avatarUrl} fallbackEmoji={props.fallbackEmoji} speaking={!!props.speaking} />
      )}

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {props.variant === 'avatar' && (
        <div className="absolute top-3 left-3 px-2 py-1 bg-purple-500/90 backdrop-blur rounded-md text-[10px] uppercase tracking-wider font-bold text-white flex items-center gap-1">
          <Sparkles size={10} /> AI Customer
        </div>
      )}

      {props.isYou && (
        <div className="absolute top-3 left-3 px-2 py-1 bg-brand-500/90 backdrop-blur rounded-md text-[10px] uppercase tracking-wider font-bold text-white">
          You
        </div>
      )}

      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg">
          <span className="text-white text-sm font-semibold">{props.name}</span>
          {props.micMuted && (
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <MicOff size={11} className="text-white" />
            </div>
          )}
        </div>

        {props.speaking && (
          <div className="px-2.5 py-1.5 bg-emerald-500/90 backdrop-blur rounded-lg flex items-center gap-2">
            <WaveformAnimation active={true} color="bg-white" size="sm" bars={4} />
            <span className="text-[10px] uppercase tracking-wider font-bold text-white">Speaking</span>
          </div>
        )}
      </div>

      {props.subtitle && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur rounded-md text-[10px] text-white/80 font-medium">
          {props.subtitle}
        </div>
      )}
    </div>
  );
}

function AvatarBackground({
  avatarUrl, fallbackEmoji, speaking
}: { avatarUrl: string; fallbackEmoji: string; speaking: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative">
        {speaking && (
          <>
            <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"></div>
            <div className="absolute -inset-4 rounded-full border-2 border-emerald-400/50 animate-pulse"></div>
            <div className="absolute -inset-8 rounded-full border border-emerald-400/30 animate-pulse"></div>
          </>
        )}

        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/95 shadow-2xl overflow-hidden flex items-center justify-center">
          <img
            src={avatarUrl}
            alt="AI customer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent && !parent.querySelector('.emoji-fallback')) {
                const span = document.createElement('span');
                span.className = 'emoji-fallback text-9xl';
                span.textContent = fallbackEmoji;
                parent.appendChild(span);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

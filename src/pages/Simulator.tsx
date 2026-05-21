import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, Send, Lightbulb,
  AlertCircle, Play, Keyboard, Sparkles, Captions, MessageSquare,
  Circle, Volume2, VolumeX, Globe, Lock
} from 'lucide-react';
import { scenarios, getScenarioById } from '../data/scenarios';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useWebcam } from '../hooks/useWebcam';
import { VideoTile } from '../components/VideoTile';
import { generateSessionResult, currentUser } from '../data/mockData';
import { saveUserSession, todayDateString } from '../data/sessionStore';
import { getAiAvatarUrl } from '../data/avatars';
import { TranscriptEntry, getCustomerSays, getIdealResponse, Language, HistoricalSession } from '../types';

const LANG_LABEL: Record<Language, string> = { en: 'English', hi: 'हिंदी', ta: 'தமிழ்', bn: 'বাংলা' };
const LANG_NATIVE: Record<Language, string> = { en: 'English', hi: 'हिंदी', ta: 'தமிழ்', bn: 'বাংলা' };

type Phase = 'briefing' | 'live';

function scoreResponse(response: string, keywords: string[]): number {
  if (!response.trim()) return 0;
  const lower = response.toLowerCase();
  const hits = keywords.filter(k => lower.includes(k.toLowerCase())).length;
  const base = Math.min(100, Math.round((hits / Math.max(1, keywords.length * 0.5)) * 100));
  const lengthBonus = response.length > 80 ? 8 : response.length > 40 ? 4 : 0;
  const fillerPenalty = (lower.match(/\b(um|uh|like|you know)\b/g)?.length || 0) * 3;
  return Math.max(15, Math.min(100, base + lengthBonus - fillerPenalty));
}

export function Simulator() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const scenarioId = params.get('scenario') || scenarios[0].id;
  const scenario = useMemo(() => getScenarioById(scenarioId) || scenarios[0], [scenarioId]);
  const [language, setLanguage] = useState<Language>(scenario.supportedLanguages[0] || 'en');

  useEffect(() => {
    setLanguage(scenario.supportedLanguages[0] || 'en');
  }, [scenario.id]);

  const [phase, setPhase] = useState<Phase>('briefing');
  const [turnIndex, setTurnIndex] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [typingMode, setTypingMode] = useState(false);
  const [typedInput, setTypedInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [audioOn, setAudioOn] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [comparisons, setComparisons] = useState<{ turnId: string; you: string; ideal: string; score: number }[]>([]);
  const [sessionStartTs, setSessionStartTs] = useState<number>(0);
  const [elapsed, setElapsed] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const { speak, cancel: cancelSpeak, speaking } = useSpeechSynthesis();
  const {
    supported: sttSupported, listening, interimTranscript, finalTranscript,
    error: sttError, start: startMic, stop: stopMic, reset: resetMic
  } = useSpeechRecognition();
  const {
    stream: webcamStream, error: webcamError, cameraOn, micOn, starting: webcamStarting,
    start: startWebcam, stop: stopWebcam, toggleCamera, toggleMic
  } = useWebcam();

  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const avatarUrl = useMemo(() => getAiAvatarUrl(scenario.customerPersona.name), [scenario]);
  const currentTurn = scenario.turns[turnIndex];
  const effectiveLanguage: Language = scenario.supportedLanguages.includes(language) ? language : 'en';

  useEffect(() => {
    if (previewVideoRef.current && webcamStream) {
      previewVideoRef.current.srcObject = webcamStream;
    }
  }, [webcamStream]);

  useEffect(() => {
    if (phase !== 'live') return;
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - sessionStartTs) / 1000)), 250);
    return () => clearInterval(id);
  }, [phase, sessionStartTs]);

  const ensureCamera = async () => {
    if (!webcamStream) return await startWebcam({ video: true, audio: false });
    return webcamStream;
  };

  const startSession = async () => {
    await ensureCamera();
    setPhase('live');
    setTurnIndex(0);
    setTranscript([]);
    setComparisons([]);
    setSessionStartTs(Date.now());
    setElapsed(0);

    setTimeout(() => {
      const opening = scenario.turns[0] ? getCustomerSays(scenario.turns[0], effectiveLanguage) : scenario.opening;
      setTranscript([{ speaker: 'customer', text: opening, timestamp: 0 }]);
      if (audioOn) speak(opening, effectiveLanguage);
    }, 600);
  };

  const advanceAfterResponse = (responseText: string) => {
    if (!responseText.trim()) return;
    const turn = scenario.turns[turnIndex];
    const score = scoreResponse(responseText, turn.keywords);
    const newComparisons = [...comparisons, {
      turnId: turn.id, you: responseText, ideal: getIdealResponse(turn, effectiveLanguage), score
    }];
    setComparisons(newComparisons);

    const ts = Math.floor((Date.now() - sessionStartTs) / 1000);
    setTranscript(prev => [...prev, { speaker: 'promoter', text: responseText, timestamp: ts }]);

    setTypedInput('');
    resetMic();
    setShowHint(false);

    const nextIdx = turnIndex + 1;
    if (nextIdx >= scenario.turns.length) {
      setTimeout(() => finishSession(newComparisons), 900);
      return;
    }

    setTimeout(() => {
      const nextCustomer = getCustomerSays(scenario.turns[nextIdx], effectiveLanguage);
      const nextTs = Math.floor((Date.now() - sessionStartTs) / 1000);
      setTranscript(prev => [...prev, { speaker: 'customer', text: nextCustomer, timestamp: nextTs }]);
      setTurnIndex(nextIdx);
      if (audioOn) speak(nextCustomer, effectiveLanguage);
    }, 1100);
  };

  const finishSession = (finalComparisons: { turnId: string; you: string; ideal: string; score: number }[]) => {
    cancelSpeak();
    stopMic();
    if (recorderRef.current && isRecording) {
      recorderRef.current.stop();
    }
    const duration = Math.max(1, Math.floor((Date.now() - sessionStartTs) / 1000));
    const result = generateSessionResult(scenario.id, transcript, duration, finalComparisons, effectiveLanguage);
    sessionStorage.setItem('lastSessionResult', JSON.stringify(result));
    sessionStorage.setItem('lastSessionScenario', JSON.stringify(scenario));

    if (transcript.length > 0 && finalComparisons.length > 0) {
      const live: HistoricalSession = {
        id: `live-${Date.now()}`,
        date: todayDateString(),
        scenarioId: scenario.id,
        scenarioTitle: scenario.title,
        customerName: scenario.customerPersona.name,
        customerAvatar: scenario.customerPersona.avatar,
        duration: `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`,
        durationSec: duration,
        language: effectiveLanguage,
        overallScore: result.overallScore,
        breakdown: result.breakdown,
        transcript: result.transcript,
        idealComparisons: result.idealResponses,
        fillerWords: result.fillerWords,
        wordsPerMinute: result.wordsPerMinute,
        talkTimeRatio: result.talkTimeRatio,
        sentenceClarity: result.sentenceClarity,
        strengths: result.strengths,
        improvements: result.improvements
      };
      saveUserSession(live);
    }

    setTimeout(() => {
      stopWebcam();
      navigate('/feedback');
    }, 400);
  };

  const handleMicToggle = () => {
    if (listening) {
      stopMic();
      setTimeout(() => {
        if (finalTranscript.trim()) advanceAfterResponse(finalTranscript.trim());
      }, 200);
    } else {
      cancelSpeak();
      startMic(effectiveLanguage);
    }
  };

  const handleSubmitTyped = () => {
    if (typedInput.trim()) advanceAfterResponse(typedInput.trim());
  };

  const toggleRecording = () => {
    if (!webcamStream) return;
    if (isRecording) {
      recorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        recordedChunksRef.current = [];
        const rec = new MediaRecorder(webcamStream, { mimeType: 'video/webm' });
        rec.ondataavailable = e => {
          if (e.data.size > 0) recordedChunksRef.current.push(e.data);
        };
        rec.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `roleplay-${scenario.id}-${Date.now()}.webm`;
          a.click();
          URL.revokeObjectURL(url);
        };
        rec.start();
        recorderRef.current = rec;
        setIsRecording(true);
      } catch (_) { /* unsupported */ }
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const liveScore = comparisons.length
    ? Math.round(comparisons.reduce((s, c) => s + c.score, 0) / comparisons.length) : null;
  const lastCustomerLine = [...transcript].reverse().find(t => t.speaker === 'customer');

  if (phase === 'briefing') {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <button onClick={() => navigate('/scenarios')} className="text-sm text-slate-500 hover:text-slate-900 mb-4">
          ← Back to scenarios
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="gradient-brand p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} />
              <span className="text-xs uppercase tracking-wider font-bold opacity-90">AI Video Roleplay</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">{scenario.title}</h1>
            <p className="text-white/85 text-sm">{scenario.description}</p>
          </div>

          <div className="grid md:grid-cols-2">
            <div className="p-6 border-r border-slate-100">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Customer profile</h3>
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100 mb-4">
                <img
                  src={avatarUrl}
                  alt={scenario.customerPersona.name}
                  className="w-16 h-16 rounded-full bg-white shrink-0 border-2 border-white shadow-md"
                />
                <div>
                  <div className="font-bold text-slate-900">{scenario.customerPersona.name}</div>
                  <div className="text-xs text-purple-600 font-semibold mb-2 flex items-center gap-1">
                    <Sparkles size={10} /> AI-generated · realistic voice
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed">{scenario.customerPersona.background}</div>
                </div>
              </div>

              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Product</h3>
              <div className="p-4 bg-brand-50 rounded-xl border border-brand-100">
                <div className="font-semibold text-brand-900">{scenario.product}</div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <Pill label="Duration" value={scenario.duration} />
                  <Pill label="Level" value={scenario.difficulty} />
                  <Pill label="Turns" value={`${scenario.turns.length}`} />
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Camera & mic check</h3>

              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative mb-3">
                {webcamStream ? (
                  <video
                    ref={previewVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover -scale-x-100"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70">
                    <Video size={36} className="mb-2 opacity-50" />
                    <span className="text-sm font-medium">Camera preview will appear here</span>
                  </div>
                )}
                {webcamStream && (
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-emerald-500/90 backdrop-blur rounded text-[10px] uppercase tracking-wider font-bold text-white flex items-center gap-1">
                    <Circle size={6} fill="currentColor" /> Camera Active
                  </div>
                )}
              </div>

              {webcamError && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-3">
                  <AlertCircle size={14} className="text-red-600 mt-0.5 shrink-0" />
                  <div className="text-xs text-red-800">{webcamError}</div>
                </div>
              )}

              {!sttSupported && (
                <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-3">
                  <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
                  <div className="text-xs text-amber-800">
                    Voice input needs Chrome or Edge. Text mode works as fallback.
                  </div>
                </div>
              )}

              <div className="p-3 bg-white border border-slate-200 rounded-lg mb-3">
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                  <Globe size={11} /> Conversation language
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['en', 'hi', 'ta', 'bn'] as Language[]).map(l => {
                    const supported = scenario.supportedLanguages.includes(l);
                    const isActive = l === language;
                    return (
                      <button
                        key={l}
                        onClick={() => supported && setLanguage(l)}
                        disabled={!supported}
                        title={supported ? `Roleplay in ${LANG_LABEL[l]}` : `Not available for this scenario`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-semibold transition ${
                          !supported
                            ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed line-through'
                            : isActive
                              ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300 hover:bg-brand-50/50'
                        }`}
                      >
                        {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
                        <span>{LANG_NATIVE[l]}</span>
                        {!supported && <span className="ml-auto text-[9px] uppercase tracking-wider">N/A</span>}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 text-[11px] text-slate-500 flex items-start gap-1.5">
                  <Lock size={10} className="mt-0.5 shrink-0" />
                  <span>Once you join, language will be locked for this session.</span>
                </div>
              </div>

              {!webcamStream ? (
                <button
                  onClick={() => startWebcam({ video: true, audio: false })}
                  disabled={webcamStarting}
                  className="w-full py-2.5 mb-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  <Video size={16} /> {webcamStarting ? 'Requesting access...' : 'Enable Camera'}
                </button>
              ) : (
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={toggleCamera}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 ${
                      cameraOn ? 'bg-white border border-slate-300 text-slate-800' : 'bg-red-100 text-red-700 border border-red-300'
                    }`}
                  >
                    {cameraOn ? <Video size={14} /> : <VideoOff size={14} />} {cameraOn ? 'Camera on' : 'Camera off'}
                  </button>
                </div>
              )}

              <button
                onClick={startSession}
                disabled={webcamStarting}
                className="w-full py-3 gradient-brand text-white font-bold rounded-lg shadow-lg shadow-brand-500/30 hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Play size={16} fill="currentColor" /> Join Roleplay Call
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2">
                The AI customer will appear on screen and start talking. You respond with your voice or by typing.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LIVE PHASE — video call layout
  return (
    <div className="h-full flex flex-col bg-slate-950 text-white">
      <div className="bg-slate-900/90 backdrop-blur border-b border-slate-800 px-5 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
          <div>
            <div className="font-bold text-white">{scenario.title}</div>
            <div className="text-[10px] text-slate-400">AI Customer · {scenario.customerPersona.name}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 rounded-md" title="Session language (locked)">
            <Globe size={11} className="text-slate-400" />
            <span className="text-xs font-bold text-white">{LANG_NATIVE[effectiveLanguage]}</span>
            <Lock size={9} className="text-slate-500" />
          </div>
          <Stat label="Turn" value={`${Math.min(turnIndex + 1, scenario.turns.length)} / ${scenario.turns.length}`} />
          <Stat label="Time" value={formatTime(elapsed)} mono />
          <Stat label="Live Score" value={liveScore !== null ? `${liveScore}` : '—'} accent={liveScore !== null && liveScore >= 75 ? 'text-emerald-400' : liveScore !== null && liveScore < 60 ? 'text-amber-400' : ''} />

          <button
            onClick={toggleRecording}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold ${
              isRecording ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
            title="Record session"
          >
            <Circle size={8} fill={isRecording ? 'currentColor' : 'none'} className={isRecording ? 'animate-pulse' : ''} />
            {isRecording ? 'Recording' : 'Record'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col p-5 gap-4 overflow-hidden">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
            <VideoTile
              variant="avatar"
              name={scenario.customerPersona.name}
              subtitle={scenario.customerPersona.background.split(',')[0]}
              speaking={speaking}
              avatarUrl={avatarUrl}
              fallbackEmoji={scenario.customerPersona.avatar}
            />
            <VideoTile
              variant="video"
              name={currentUser.name}
              subtitle={currentUser.store}
              speaking={listening}
              micMuted={!micOn || (!listening && !typingMode)}
              stream={webcamStream}
              cameraOn={cameraOn}
              isYou
            />
          </div>

          {showCaptions && lastCustomerLine && (
            <div ref={captionRef} className="bg-black/60 backdrop-blur rounded-xl px-5 py-3 max-w-3xl mx-auto w-full border border-white/10">
              <div className="flex items-start gap-3">
                <div className="text-[10px] uppercase tracking-wider font-bold text-purple-300 shrink-0 mt-0.5">
                  {speaking ? `${scenario.customerPersona.name.split(' ')[0]} —` : 'Last —'}
                </div>
                <div className="text-sm text-white leading-relaxed">{lastCustomerLine.text}</div>
              </div>
              {listening && (interimTranscript || finalTranscript) && (
                <div className="mt-2 pt-2 border-t border-white/10 flex items-start gap-3">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-300 shrink-0 mt-0.5">You —</div>
                  <div className="text-sm text-emerald-100">
                    {finalTranscript}<span className="opacity-60 italic">{interimTranscript}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {showHint && currentTurn?.hint && (
            <div className="bg-amber-500/15 backdrop-blur border border-amber-500/30 rounded-xl px-4 py-3 max-w-3xl mx-auto w-full flex gap-2.5">
              <Lightbulb size={16} className="text-amber-300 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-100">{currentTurn.hint}</div>
            </div>
          )}

          {typingMode && (
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 max-w-3xl mx-auto w-full">
              <div className="flex gap-2">
                <textarea
                  value={typedInput}
                  onChange={e => setTypedInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmitTyped();
                    }
                  }}
                  placeholder="Type your response..."
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg resize-none text-sm outline-none focus:border-brand-400 text-white placeholder:text-slate-500"
                  rows={2}
                  autoFocus
                />
                <button
                  onClick={handleSubmitTyped}
                  disabled={!typedInput.trim()}
                  className="px-4 gradient-brand text-white font-semibold rounded-lg disabled:opacity-40 flex items-center gap-1.5 text-sm"
                >
                  <Send size={14} /> Send
                </button>
              </div>
            </div>
          )}

          {sttError && (
            <div className="text-xs text-red-300 flex items-center justify-center gap-1.5">
              <AlertCircle size={12} /> {sttError}
            </div>
          )}
        </div>

        {showTranscript && (
          <aside className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">Live Transcript</h3>
              <button onClick={() => setShowTranscript(false)} className="text-slate-500 hover:text-white text-xs">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {transcript.map((t, i) => (
                <div key={i} className={`p-2.5 rounded-lg text-xs ${
                  t.speaker === 'customer' ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-brand-500/10 border border-brand-500/20'
                }`}>
                  <div className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${
                    t.speaker === 'customer' ? 'text-purple-300' : 'text-brand-300'
                  }`}>
                    {t.speaker === 'customer' ? scenario.customerPersona.name : 'You'} · {formatTime(t.timestamp)}
                  </div>
                  <div className="text-slate-200 leading-relaxed">{t.text}</div>
                </div>
              ))}
              {comparisons.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Live Scores</h4>
                  {comparisons.map((c, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 text-xs">
                      <span className="text-slate-400">Turn {i + 1}</span>
                      <span className={`font-bold ${
                        c.score >= 80 ? 'text-emerald-400' : c.score >= 60 ? 'text-amber-400' : 'text-red-400'
                      }`}>{c.score}/100</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CtrlButton
            active={micOn}
            onClick={toggleMic}
            iconOn={<Mic size={18} />}
            iconOff={<MicOff size={18} />}
            label={micOn ? 'Mute' : 'Unmute'}
          />
          <CtrlButton
            active={cameraOn}
            onClick={toggleCamera}
            iconOn={<Video size={18} />}
            iconOff={<VideoOff size={18} />}
            label={cameraOn ? 'Stop video' : 'Start video'}
          />
          <CtrlButton
            active={audioOn}
            onClick={() => setAudioOn(o => !o)}
            iconOn={<Volume2 size={18} />}
            iconOff={<VolumeX size={18} />}
            label="AI voice"
          />
          <CtrlButton
            active={showCaptions}
            onClick={() => setShowCaptions(c => !c)}
            iconOn={<Captions size={18} />}
            iconOff={<Captions size={18} />}
            label="Captions"
          />
          <CtrlButton
            active={showTranscript}
            onClick={() => setShowTranscript(s => !s)}
            iconOn={<MessageSquare size={18} />}
            iconOff={<MessageSquare size={18} />}
            label="Transcript"
          />
          <CtrlButton
            active={showHint}
            onClick={() => setShowHint(s => !s)}
            iconOn={<Lightbulb size={18} />}
            iconOff={<Lightbulb size={18} />}
            label="Hint"
            highlight={showHint}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTypingMode(t => !t)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
              typingMode ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Keyboard size={13} /> {typingMode ? 'Voice' : 'Type instead'}
          </button>

          {!typingMode && (
            <button
              onClick={handleMicToggle}
              disabled={speaking}
              className={`relative px-5 h-12 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
                listening
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/40 scale-105'
                  : 'gradient-brand hover:scale-105 shadow-brand-500/40 disabled:opacity-40 disabled:scale-100'
              }`}
            >
              {listening ? (
                <>
                  <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30"></span>
                  <MicOff size={16} /> Stop & Send
                </>
              ) : (
                <><Mic size={16} /> Push to Talk</>
              )}
            </button>
          )}
        </div>

        <button
          onClick={() => finishSession(comparisons)}
          className="flex items-center gap-2 px-4 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-500/30"
        >
          <PhoneOff size={16} /> End Call
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, mono, accent }: { label: string; value: string; mono?: boolean; accent?: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{label}</div>
      <div className={`text-sm font-bold ${mono ? 'font-mono' : ''} ${accent || 'text-white'}`}>{value}</div>
    </div>
  );
}

function CtrlButton({
  active, onClick, iconOn, iconOff, label, highlight
}: {
  active: boolean; onClick: () => void; iconOn: any; iconOff: any; label: string; highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition ${
        highlight ? 'bg-amber-500/20 text-amber-300' :
        active ? 'text-white hover:bg-slate-800' : 'text-red-400 bg-red-500/10 hover:bg-red-500/20'
      }`}
      title={label}
    >
      {active ? iconOn : iconOff}
      <span className="text-[9px] uppercase tracking-wider font-semibold">{label}</span>
    </button>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">{label}</div>
      <div className="text-xs font-bold text-slate-900 mt-0.5">{value}</div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { Language } from '../types';

const LANG_MAP: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  bn: 'bn-IN'
};

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export function useSpeechRecognition() {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const restartGuardRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) setSupported(true);
  }, []);

  const start = useCallback((lang: Language = 'en', onFinal?: (text: string) => void) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = LANG_MAP[lang];

    let aggregated = '';

    rec.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }
      if (final) {
        aggregated += final;
        setFinalTranscript(aggregated.trim());
      }
      setInterimTranscript(interim);
    };

    rec.onerror = (e: any) => {
      if (e.error === 'no-speech') return;
      setError(`Mic error: ${e.error}`);
      setListening(false);
    };

    rec.onend = () => {
      if (restartGuardRef.current) {
        try { rec.start(); } catch (_) { /* ignore */ }
      } else {
        setListening(false);
        if (aggregated.trim()) onFinal?.(aggregated.trim());
      }
    };

    setError(null);
    setInterimTranscript('');
    setFinalTranscript('');
    restartGuardRef.current = true;
    try {
      rec.start();
      recognitionRef.current = rec;
      setListening(true);
    } catch (e) {
      setError('Could not start microphone.');
    }
  }, []);

  const stop = useCallback(() => {
    restartGuardRef.current = false;
    try {
      recognitionRef.current?.stop();
    } catch (_) { /* ignore */ }
    setListening(false);
  }, []);

  const reset = useCallback(() => {
    setInterimTranscript('');
    setFinalTranscript('');
    setError(null);
  }, []);

  return {
    supported,
    listening,
    interimTranscript,
    finalTranscript,
    error,
    start,
    stop,
    reset
  };
}

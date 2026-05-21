import { useCallback, useEffect, useRef, useState } from 'react';
import { Language } from '../types';

const LANG_MAP: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  bn: 'bn-IN'
};

export function useSpeechSynthesis() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
      const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const pickVoice = useCallback((lang: Language): SpeechSynthesisVoice | undefined => {
    const targetLang = LANG_MAP[lang];
    const exact = voices.find(v => v.lang === targetLang);
    if (exact) return exact;
    const partial = voices.find(v => v.lang.startsWith(lang === 'en' ? 'en' : lang));
    if (partial) return partial;
    return voices.find(v => v.default) || voices[0];
  }, [voices]);

  const speak = useCallback((text: string, lang: Language = 'en', onEnd?: () => void) => {
    if (!supported) {
      onEnd?.();
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    const voice = pickVoice(lang);
    if (voice) utt.voice = voice;
    utt.lang = LANG_MAP[lang];
    utt.rate = 0.95;
    utt.pitch = 1.05;
    utt.volume = 1;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => {
      setSpeaking(false);
      onEnd?.();
    };
    utt.onerror = () => {
      setSpeaking(false);
      onEnd?.();
    };
    utteranceRef.current = utt;
    window.speechSynthesis.speak(utt);
  }, [supported, pickVoice]);

  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return { speak, cancel, speaking, supported };
}

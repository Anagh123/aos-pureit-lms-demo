export type Language = 'en' | 'hi' | 'ta' | 'bn';

export interface DialogueTurn {
  id: string;
  customerSays: string;
  customerSaysHi?: string;
  customerSaysTa?: string;
  customerSaysBn?: string;
  idealResponse: string;
  idealResponseHi?: string;
  idealResponseTa?: string;
  idealResponseBn?: string;
  keywords: string[];
  hint?: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: 'Objection Handling' | 'Product Knowledge' | 'Comparison' | 'Closing';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  customerPersona: {
    name: string;
    avatar: string;
    background: string;
    avatarUrl?: string;
  };
  opening: string;
  openingHi?: string;
  openingTa?: string;
  turns: DialogueTurn[];
  product: string;
  completions: number;
  avgScore: number;
  supportedLanguages: Language[];
}

export function getCustomerSays(turn: DialogueTurn, lang: Language): string {
  if (lang === 'hi' && turn.customerSaysHi) return turn.customerSaysHi;
  if (lang === 'ta' && turn.customerSaysTa) return turn.customerSaysTa;
  if (lang === 'bn' && turn.customerSaysBn) return turn.customerSaysBn;
  return turn.customerSays;
}

export function getIdealResponse(turn: DialogueTurn, lang: Language): string {
  if (lang === 'hi' && turn.idealResponseHi) return turn.idealResponseHi;
  if (lang === 'ta' && turn.idealResponseTa) return turn.idealResponseTa;
  if (lang === 'bn' && turn.idealResponseBn) return turn.idealResponseBn;
  return turn.idealResponse;
}

const FILLER_WORDS: Record<Language, RegExp> = {
  en: /\b(um|uh|like|you know|basically|actually|kind of|sort of|i mean)\b/gi,
  hi: /\b(matlab|yaani|bas|woh|achha|haan|haina|thoda|na)\b|मतलब|यानी|बस|वो|अच्छा|थोड़ा|हाँ|हाइना/gi,
  ta: /\b(appro|enna|seri|paaru|adhukku|illa)\b|அப்போ|என்ன|சரி|பாரு|அதுக்கு|இல்ல/gi,
  bn: /\b(mane|jano|bhalo|thik ache|na|tahole)\b|মানে|জানো|ভালো|ঠিক আছে|তাহলে|তো/gi
};

export function countFillerWords(text: string, lang: Language): number {
  const primary = text.match(FILLER_WORDS[lang])?.length || 0;
  // English fillers (um, uh, like, you know, basically...) are universal in
  // Indian Hinglish/Tanglish/Banglish speech — count them in every session
  // unless the session language IS English (already counted above).
  if (lang === 'en') return primary;
  const englishFillers = text.match(FILLER_WORDS.en)?.length || 0;
  return primary + englishFillers;
}

export interface ScoreBreakdown {
  pitchQuality: number;
  productKnowledge: number;
  objectionHandling: number;
  clarity: number;
  empathy: number;
  closingStrength: number;
}

export interface SessionResult {
  scenarioId: string;
  overallScore: number;
  breakdown: ScoreBreakdown;
  talkTimeRatio: number;
  fillerWords: number;
  wordsPerMinute: number;
  sentenceClarity: number;
  transcript: TranscriptEntry[];
  idealResponses: { turnId: string; you: string; ideal: string; score: number }[];
  strengths: string[];
  improvements: string[];
  durationSec: number;
}

export interface TranscriptEntry {
  speaker: 'customer' | 'promoter';
  text: string;
  timestamp: number;
}

export interface HistoricalSession {
  id: string;
  date: string;
  scenarioId: string;
  scenarioTitle: string;
  customerName: string;
  customerAvatar: string;
  duration: string;
  durationSec: number;
  language: Language;
  overallScore: number;
  breakdown: ScoreBreakdown;
  transcript: TranscriptEntry[];
  idealComparisons: { turnId: string; you: string; ideal: string; score: number }[];
  fillerWords: number;
  wordsPerMinute: number;
  talkTimeRatio: number;
  sentenceClarity: number;
  strengths: string[];
  improvements: string[];
}

export interface Promoter {
  id: string;
  name: string;
  avatar: string;
  region: string;
  store: string;
  overallScore: number;
  sessionsCompleted: number;
  badge: 'Gold' | 'Silver' | 'Bronze' | 'Rising';
  language: Language;
  weeklyTrend: number[];
}

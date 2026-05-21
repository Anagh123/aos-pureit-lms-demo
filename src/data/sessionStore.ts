import { HistoricalSession } from '../types';
import { historicalSessions } from './mockData';

const STORAGE_KEY = 'aquacoach.userSessions';

export function saveUserSession(session: HistoricalSession): void {
  try {
    const existing = getUserSessions();
    existing.unshift(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.warn('Could not save session to localStorage', e);
  }
}

export function getUserSessions(): HistoricalSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function clearUserSessions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear sessions', e);
  }
}

export function isUserSession(session: HistoricalSession): boolean {
  return session.id.startsWith('live-');
}

export function getAllSessions(): HistoricalSession[] {
  const user = getUserSessions();
  const merged = [...user, ...historicalSessions];
  return merged.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    const aLive = isUserSession(a);
    const bLive = isUserSession(b);
    if (aLive && !bLive) return -1;
    if (!aLive && bLive) return 1;
    return b.id.localeCompare(a.id);
  });
}

export function todayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

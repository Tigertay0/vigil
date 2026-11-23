import type { AppState, MissionSettings } from './types';

export const STATE_KEY = 'vigil:v1';

export const DEFAULT_SETTINGS: MissionSettings = {
  environment: 'transit',
  scenario: 'sleepDebt',
  currentDay: 30,
  baselineDays: 14,
  seed: 20261114,
};

export type Persisted = Pick<AppState, 'settings' | 'selectedCrewId' | 'manual' | 'acknowledged' | 'routineDone' | 'surgeonNotes'>;

/** Stored JSON is untrusted (hand-edited, or written by an older version), so a wrong-typed field must not reach app state. */
function keyed<T>(v: unknown): Record<string, T> {
  return typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Record<string, T>) : {};
}

export function loadState(): Persisted | null {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<Persisted>;
    if (typeof p.settings !== 'object' || p.settings === null || Array.isArray(p.settings)) return null;
    return {
      settings: { ...DEFAULT_SETTINGS, ...p.settings },
      selectedCrewId: typeof p.selectedCrewId === 'string' ? p.selectedCrewId : 'cdr',
      manual: keyed(p.manual),
      acknowledged: keyed(p.acknowledged),
      routineDone: keyed(p.routineDone),
      surgeonNotes: keyed(p.surgeonNotes),
    };
  } catch {
    return null;
  }
}

export function serializeState(p: Persisted): string {
  return JSON.stringify(p);
}

export function saveState(p: Persisted) {
  try {
    localStorage.setItem(STATE_KEY, serializeState(p));
  } catch {
    /* storage unavailable (private window, etc.) */
  }
}

export function clearState() {
  try {
    localStorage.removeItem(STATE_KEY);
  } catch {
    /* ignore */
  }
}

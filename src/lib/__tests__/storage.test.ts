import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_SETTINGS, loadState, STATE_KEY } from '../storage';

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() { return data.size; },
    clear: () => data.clear(),
    getItem: (k) => data.get(k) ?? null,
    key: (i) => [...data.keys()][i] ?? null,
    removeItem: (k) => { data.delete(k); },
    setItem: (k, v) => { data.set(k, String(v)); },
  };
}

describe('loadState', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', memoryStorage());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns null with nothing stored, unreadable JSON, or no settings object', () => {
    expect(loadState()).toBeNull();
    localStorage.setItem(STATE_KEY, '{ not json');
    expect(loadState()).toBeNull();
    localStorage.setItem(STATE_KEY, JSON.stringify({ settings: 'dark' }));
    expect(loadState()).toBeNull();
  });

  it('replaces wrong-typed fields with empty ones, so bad stored data cannot reach app state', () => {
    localStorage.setItem(STATE_KEY, JSON.stringify({ settings: {}, selectedCrewId: 7, manual: [], acknowledged: 'nope', routineDone: null, surgeonNotes: 3 }));
    expect(loadState()).toEqual({ settings: DEFAULT_SETTINGS, selectedCrewId: 'cdr', manual: {}, acknowledged: {}, routineDone: {}, surgeonNotes: {} });
  });

  it('keeps stored values that have the right shape', () => {
    localStorage.setItem(STATE_KEY, JSON.stringify({ settings: { currentDay: 12 }, selectedCrewId: 'fe1', surgeonNotes: { fe1: 'watch sleep' } }));
    const p = loadState();
    expect(p?.settings.currentDay).toBe(12);
    expect(p?.settings.seed).toBe(DEFAULT_SETTINGS.seed);
    expect(p?.selectedCrewId).toBe('fe1');
    expect(p?.surgeonNotes).toEqual({ fe1: 'watch sleep' });
  });
});

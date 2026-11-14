export type PvtMode = 'quick' | 'full';

/** The two test lengths. The full one is the 3-minute PVT-B that ISS crews run; the quick one is a shortened form for a short demo. */
export const PVT_MODES: Record<PvtMode, { seconds: number; label: string; startLabel: string }> = {
  quick: { seconds: 60, label: '60 s quick test', startLabel: 'Start 60 s quick test' },
  full: { seconds: 180, label: '3 min full PVT-B', startLabel: 'Start 3 min full PVT-B' },
};

/** Lapse threshold of the brief psychomotor vigilance test (Basner, Mollicone and Dinges 2011). */
export const LAPSE_MS = 355;

export interface PvtSummary {
  responses: number;
  mean: number;
  median: number;
  /** Responses at or above the lapse threshold. */
  lapses: number;
  lapsesPerMinute: number;
  /**
   * Lapses as stored in the record: a count per 60 seconds, so a 3-minute test and a 60-second test compare with the
   * same pre-flight baseline and the same alert steps.
   */
  storedLapses: number;
}

export function summarizePvt(rts: number[], seconds: number): PvtSummary {
  const n = rts.length;
  const mean = n ? rts.reduce((a, b) => a + b, 0) / n : 0;
  const median = n ? [...rts].sort((a, b) => a - b)[Math.floor(n / 2)] : 0;
  const lapses = rts.filter((r) => r >= LAPSE_MS).length;
  const lapsesPerMinute = seconds > 0 ? (lapses * 60) / seconds : 0;
  return { responses: n, mean, median, lapses, lapsesPerMinute, storedLapses: Math.round(lapsesPerMinute) };
}

import { describe, expect, it } from 'vitest';
import { LAPSE_MS, PVT_MODES, summarizePvt } from '../pvt';

describe('reaction test scoring', () => {
  it('offers the 60-second quick test and the 3-minute full PVT-B', () => {
    expect(PVT_MODES.quick.seconds).toBe(60);
    expect(PVT_MODES.full.seconds).toBe(180);
    expect(LAPSE_MS).toBe(355);
  });

  it('counts a lapse at exactly 355 ms but not at 354 ms', () => {
    expect(summarizePvt([354], 60).lapses).toBe(0);
    expect(summarizePvt([355], 60).lapses).toBe(1);
  });

  it('computes mean and median from the responses', () => {
    const s = summarizePvt([250, 300, 350, 400], 60);
    expect(s.responses).toBe(4);
    expect(s.mean).toBe(325);
    expect(s.median).toBe(350);
    expect(s.lapses).toBe(1);
  });

  it('stores lapses per 60 seconds so both lengths compare with the same baseline', () => {
    const slow = Array<number>(9).fill(400);
    const quick = summarizePvt(slow, 60);
    const full = summarizePvt(slow, 180);
    expect(quick.storedLapses).toBe(9);
    expect(full.lapses).toBe(9);
    expect(full.lapsesPerMinute).toBe(3);
    expect(full.storedLapses).toBe(3);
  });

  it('handles an empty run without dividing by zero', () => {
    const s = summarizePvt([], 180);
    expect(s).toEqual({ responses: 0, mean: 0, median: 0, lapses: 0, lapsesPerMinute: 0, storedLapses: 0 });
  });
});

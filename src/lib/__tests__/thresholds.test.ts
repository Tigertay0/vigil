import { describe, expect, it } from 'vitest';
import { CREW } from '../../data/crew';
import { evaluate } from '../rules';
import { simulateMember } from '../simulate';
import type { CrewMember, Finding, IndicatorId, Level, MissionSettings } from '../types';

/**
 * One row per boundary: the value one step below a cut-off stays quiet, the value at it fires, and a second
 * level (amber/red) gets its own rows. Every record is overwritten with fixed values, so nothing here depends
 * on the random simulation; simulateMember only supplies the crew member and the day numbers.
 */
const base: MissionSettings = { environment: 'transit', scenario: 'nominal', currentDay: 30, baselineDays: 14, seed: 20261114 };

type Patch = Partial<Record<IndicatorId, number>>;
type Hit = { level: Level; basis: Finding['basis']; notifySurgeon: boolean };
type Want = Hit | null;

/** A clearly normal day for every indicator. Transit radiation is 1.84 mSv/day. */
const CALM: Record<IndicatorId, number> = {
  hr: 60, bpSys: 118, bpDia: 72, spo2: 98, resp: 15, hrv: 60, temp: 36.7, glucose: 88, weight: 80, sleep: 7.5,
  exercise: 150, mood: 4, stress: 2, kss: 3, pvtRt: 300, pvtLapses: 1, radDose: 1.84,
};
const alternate = (day: number, a: number, b: number) => (day % 2 === 0 ? a : b);
/** Pre-flight baseline: heart rate median 60 (spread 2.97), mood median 4.5, stress median 2.5, everything else flat. */
const preDay = (day: number): Record<IndicatorId, number> => ({
  ...CALM, radDose: 0.01, hr: alternate(day, 58, 62), mood: alternate(day, 4, 5), stress: alternate(day, 2, 3),
});

/** The last entry of each list is today (day 30), the one before it is day 29, and so on. */
const dayAt = <T,>(list: T[], day: number): T | undefined => list[list.length - 1 - (base.currentDay - day)];

function scene(values: Patch[] = [], symptoms: string[][] = []): CrewMember {
  const m = simulateMember(CREW[0], base);
  return {
    ...m,
    records: m.records.map((r) => ({
      ...r,
      values: { ...(r.day <= 0 ? preDay(r.day) : CALM), ...dayAt(values, r.day) },
      symptoms: dayAt(symptoms, r.day) ?? [],
      source: 'manual' as const,
    })),
  };
}

const findingFor = (m: CrewMember, key: string) => evaluate(m, base).findings.find((f) => f.id.split(':').pop() === key);

function expectFinding(m: CrewMember, key: string, want: Want) {
  const f = findingFor(m, key);
  if (!want) {
    expect(f, `${key} should stay quiet`).toBeUndefined();
    return;
  }
  expect(f, `${key} should fire`).toBeDefined();
  expect({ level: f?.level, basis: f?.basis, notifySurgeon: f?.notifySurgeon }).toEqual(want);
}

const quiet: Want = null;
const amber = (basis: Hit['basis'], notifySurgeon = false): Hit => ({ level: 'amber', basis, notifySurgeon });
const red = (basis: Hit['basis'] = 'reference'): Hit => ({ level: 'red', basis, notifySurgeon: true });
const week = (...exercise: number[]): Patch[] => exercise.map((x) => ({ exercise: x }));

type Row = [key: string, days: Patch | Patch[], want: Want];

const ROWS: Row[] = [
  // Blood pressure (ACC/AHA 2017): crisis is above 180 or above 120; stage 2 is 140 or 90 and up.
  ['bp-crisis', { bpSys: 180, bpDia: 90 }, quiet],
  ['bp-crisis', { bpSys: 181, bpDia: 90 }, red()],
  ['bp-crisis', { bpSys: 130, bpDia: 120 }, quiet],
  ['bp-crisis', { bpSys: 130, bpDia: 121 }, red()],
  ['bp-stage2', { bpSys: 139, bpDia: 89 }, quiet],
  ['bp-stage2', { bpSys: 140, bpDia: 70 }, amber('reference', true)],
  ['bp-stage2', { bpSys: 120, bpDia: 90 }, amber('reference', true)],

  // Heart rate: typical adult resting range is 60-100 (AHA); above 120 is red.
  ['hr-high', { hr: 120 }, quiet],
  ['hr-high', { hr: 121 }, red()],
  ['hr-above', { hr: 100 }, quiet],
  ['hr-above', { hr: 101 }, amber('reference')],
  ['hr-above', { hr: 121 }, quiet],
  // Baseline spread is 2.97, so 3 typical deviations above 60 is 68.9 bpm.
  ['hr-baseline', { hr: 68 }, quiet],
  ['hr-baseline', { hr: 69 }, amber('baseline')],
  ['hr-baseline', { hr: 101 }, quiet],

  // Oxygen saturation: 95-100 typical, below 90 low (Mayo Clinic).
  ['spo2-low', { spo2: 90 }, quiet],
  ['spo2-low', { spo2: 89 }, red()],
  ['spo2-border', { spo2: 95 }, quiet],
  ['spo2-border', { spo2: 94 }, amber('reference')],
  ['spo2-border', { spo2: 89 }, quiet],

  // Breathing rate: red above 30 or below 8, amber above 20.
  ['resp-red', { resp: 30 }, quiet],
  ['resp-red', { resp: 31 }, red()],
  ['resp-red', { resp: 8 }, quiet],
  ['resp-red', { resp: 7 }, red()],
  ['resp-amber', { resp: 20 }, quiet],
  ['resp-amber', { resp: 21 }, amber('reference')],
  ['resp-amber', { resp: 31 }, quiet],

  // HRV: baseline 60 ms, so a 25% drop is 45 ms, and it has to hold for three nights running.
  ['hrv-low', [{ hrv: 46 }, { hrv: 46 }, { hrv: 46 }], quiet],
  ['hrv-low', [{ hrv: 45 }, { hrv: 45 }, { hrv: 45 }], amber('baseline')],
  ['hrv-low', [{ hrv: 45 }, { hrv: 45 }], quiet],
  ['hrv-low', [{ hrv: 45 }, { hrv: 60 }, { hrv: 45 }], quiet],

  // Temperature: fever is 38.0 (CDC, covered elsewhere); red from 39.4; low below 35.0.
  ['temp-high', { temp: 39.3 }, quiet],
  ['temp-high', { temp: 39.4 }, red()],
  ['temp-low', { temp: 35.0 }, quiet],
  ['temp-low', { temp: 34.9 }, amber('reference')],

  // Glucose (ADA): below 54 level 2, below 70 level 1, 100-125 prediabetes, 126 and up diabetes range, 200 and up red.
  ['glu-low2', { glucose: 54 }, quiet],
  ['glu-low2', { glucose: 53 }, red()],
  ['glu-low1', { glucose: 70 }, quiet],
  ['glu-low1', { glucose: 69 }, amber('reference')],
  ['glu-low1', { glucose: 53 }, quiet],
  ['glu-high1', { glucose: 125 }, quiet],
  ['glu-high1', { glucose: 126 }, amber('reference', true)],
  ['glu-high1', { glucose: 200 }, quiet],
  ['glu-high2', { glucose: 199 }, quiet],
  ['glu-high2', { glucose: 200 }, red()],
  ['glu-pre', [{ glucose: 100 }, { glucose: 100 }, { glucose: 100 }], amber('reference')],
  ['glu-pre', [{ glucose: 125 }, { glucose: 125 }, { glucose: 125 }], amber('reference')],
  ['glu-pre', [{ glucose: 100 }, { glucose: 100 }], quiet],
  ['glu-pre', [{ glucose: 99 }, { glucose: 100 }, { glucose: 100 }], quiet],
  ['glu-pre', [{ glucose: 100 }, { glucose: 100 }, { glucose: 126 }], quiet],

  // Sleep: red below 4 h, or below 5 h for three nights; amber below 6 h for three nights.
  ['sleep-red', { sleep: 4.0 }, quiet],
  ['sleep-red', { sleep: 3.9 }, red()],
  ['sleep-red', [{ sleep: 4.9 }, { sleep: 4.9 }, { sleep: 4.9 }], red()],
  ['sleep-red', [{ sleep: 5.0 }, { sleep: 4.9 }, { sleep: 4.9 }], quiet],
  ['sleep-amber', [{ sleep: 5.9 }, { sleep: 5.9 }, { sleep: 5.9 }], amber('reference')],
  ['sleep-amber', [{ sleep: 6.0 }, { sleep: 5.9 }, { sleep: 5.9 }], quiet],
  ['sleep-amber', [{ sleep: 5.9 }, { sleep: 5.9 }], quiet],
  ['sleep-amber', [{ sleep: 4.9 }, { sleep: 4.9 }, { sleep: 4.9 }], quiet],

  // Reaction test against a 300 ms, 1 lapse baseline: amber from +15% or +3 lapses, red from +35% or +6 lapses.
  ['pvt-amber', { pvtRt: 344 }, quiet],
  ['pvt-amber', { pvtRt: 345 }, amber('baseline')],
  ['pvt-amber', { pvtRt: 404 }, amber('baseline')],
  ['pvt-amber', { pvtRt: 405 }, quiet],
  ['pvt-amber', { pvtLapses: 3 }, quiet],
  ['pvt-amber', { pvtLapses: 4 }, amber('baseline')],
  ['pvt-amber', { pvtLapses: 6 }, amber('baseline')],
  ['pvt-amber', { pvtLapses: 7 }, quiet],
  ['pvt-red', { pvtRt: 404 }, quiet],
  ['pvt-red', { pvtRt: 405 }, red('baseline')],
  ['pvt-red', { pvtLapses: 6 }, quiet],
  ['pvt-red', { pvtLapses: 7 }, red('baseline')],

  // Mood baseline is 4.5, so "1.5 points below" is 3. Four low days also notify the surgeon.
  ['mood-low', [{ mood: 3 }, { mood: 3 }, { mood: 3 }], amber('baseline')],
  ['mood-low', [{ mood: 3 }, { mood: 3 }, { mood: 3 }, { mood: 3 }], amber('baseline', true)],
  ['mood-low', [{ mood: 4 }, { mood: 4 }, { mood: 4 }], quiet],
  ['mood-low', [{ mood: 4 }, { mood: 3 }, { mood: 3 }], quiet],
  ['mood-low', [{ mood: 3 }, { mood: 4 }, { mood: 3 }], quiet],
  ['mood-low', { mood: 1 }, quiet],
  // Stress baseline is 2.5, so "1.5 points above" is 4.
  ['stress-high', [{ stress: 4 }, { stress: 4 }, { stress: 4 }], amber('baseline')],
  ['stress-high', [{ stress: 3 }, { stress: 3 }, { stress: 3 }], quiet],
  ['stress-high', [{ stress: 3 }, { stress: 4 }, { stress: 4 }], quiet],
  ['stress-high', [{ stress: 4 }, { stress: 4 }], quiet],
  ['stress-high', [{ stress: 4 }, { stress: 3 }, { stress: 4 }], quiet],

  // Radiation: amber from 3 times and red from 5 times the 1.84 mSv/day transit rate (5.52 and 9.2 mSv).
  ['rad-amber', { radDose: 5.51 }, quiet],
  ['rad-amber', { radDose: 5.53 }, amber('reference')],
  ['rad-amber', { radDose: 9.1 }, amber('reference')],
  ['rad-amber', { radDose: 9.3 }, quiet],
  ['rad-red', { radDose: 9.1 }, quiet],
  ['rad-red', { radDose: 9.3 }, red()],

  // Body mass 5% below a pre-flight median of 80 kg is 76.0 kg.
  ['weight-loss', { weight: 76.1 }, quiet],
  ['weight-loss', { weight: 76.0 }, amber('baseline')],

  // Exercise: the last seven days averaging under 60 min.
  ['exercise-low', week(60, 60, 60, 60, 60, 60, 60), quiet],
  ['exercise-low', week(60, 60, 60, 60, 60, 60, 55), amber('reference')],
  ['exercise-low', week(0, 0, 0), quiet],
];

const SYMPTOM_ROWS: Array<[key: string, days: string[][], want: Want]> = [
  ['symptom-persist', [['headache'], ['headache'], ['headache']], amber('symptom')],
  ['symptom-persist', [['headache'], ['headache']], quiet],
  ['symptom-persist', [['headache'], [], ['headache']], quiet],
  ['symptom-persist', [['headache'], ['nausea'], ['headache']], quiet],
  ['symptom-persist', [['chestPain'], ['chestPain'], ['chestPain']], quiet],
  ['symptom-persist', [['headache'], ['headache'], ['headache', 'nausea', 'dizziness']], amber('symptom')],
  ['symptom-cluster', [['headache', 'nausea', 'dizziness']], amber('symptom')],
  ['symptom-cluster', [['headache', 'nausea']], quiet],
  ['symptom-cluster', [['headache', 'nausea', 'chestPain']], quiet],
  ['symptom-cluster', [['headache'], ['headache'], ['headache', 'nausea', 'dizziness']], quiet],
];

const asDays = (d: Patch | Patch[]) => (Array.isArray(d) ? d : [d]);
const label = (days: Patch[]) => days.map((p) => Object.entries(p).map(([k, v]) => `${k} ${v}`).join(' ')).join(', ');

describe('measurement rules sit exactly on their cut-offs', () => {
  for (const [key, input, want] of ROWS) {
    const days = asDays(input);
    it(`${key} ${want ? `fires as ${want.level}` : 'stays quiet'} for ${label(days)}`, () => {
      expectFinding(scene(days), key, want);
    });
  }
});

describe('symptom rules', () => {
  for (const [key, days, want] of SYMPTOM_ROWS) {
    const text = days.map((d) => d.join('+') || 'nothing').join(', then ');
    it(`${key} ${want ? 'fires' : 'stays quiet'} for ${text}`, () => {
      expectFinding(scene([], days), key, want);
    });
  }
});

describe('rules that need history or missing data', () => {
  it('exercise-low needs at least five days of entries in the week', () => {
    // Blank out every flight day before the entries so the series is only the days under test.
    const sparse = (entries: number) => {
      const m = scene(week(...Array<number>(entries).fill(0)));
      const records = m.records.map((r) => (r.day >= 1 && r.day <= base.currentDay - entries ? { ...r, values: { ...r.values, exercise: NaN } } : r));
      return { ...m, records };
    };
    expectFinding(sparse(4), 'exercise-low', quiet);
    expectFinding(sparse(5), 'exercise-low', amber('reference'));
  });

  it('routine fires from two missed check-ins, not from one', () => {
    const upTo = (day: number) => ({ ...scene(), records: scene().records.filter((r) => r.day <= day) });
    expectFinding(upTo(29), 'routine', quiet);
    expectFinding(upTo(28), 'routine', { level: 'amber', basis: 'routine', notifySurgeon: false });
  });
});

/**
 * Behaviours that are deliberate and now documented in docs/SOURCES.md and in the alert text. The first review pass
 * found each of these disagreeing with the wording, so the wording or the rule was fixed and the test pins the result.
 */
describe('documented behaviours', () => {
  it('mood-low also fires after two low readings when today is the lowest rating (1 out of 5), and not otherwise', () => {
    expectFinding(scene([{ mood: 3 }, { mood: 1 }]), 'mood-low', amber('baseline'));
    expectFinding(scene([{ mood: 3 }, { mood: 2 }]), 'mood-low', quiet);
  });

  it('rad-amber and rad-red fire at exactly 3 and 5 times the daily rate despite float error', () => {
    expectFinding(scene([{ radDose: 5.52 }]), 'rad-amber', amber('reference'));
    expectFinding(scene([{ radDose: 9.2 }]), 'rad-red', red());
  });

  it('glu-pre counts only readings inside 100-125, not earlier diabetes-range readings', () => {
    expectFinding(scene([{ glucose: 130 }, { glucose: 128 }, { glucose: 110 }]), 'glu-pre', quiet);
  });

  it('symptom-persist counts the last three check-ins in a row, so missed check-ins do not reset the run', () => {
    const symptoms: string[][] = [['headache'], [], [], [], [], [], [], ['headache'], ['headache']]; // days 22 to 30
    const m = scene([], symptoms);
    const withGap = { ...m, records: m.records.filter((r) => r.day < 23 || r.day > 28) };
    expectFinding(withGap, 'symptom-persist', amber('symptom'));
  });

  it('bp-low looks at the systolic number only (under 90), as its alert text says', () => {
    expectFinding(scene([{ bpSys: 100, bpDia: 59 }]), 'bp-low', quiet);
    expectFinding(scene([{ bpSys: 89, bpDia: 70 }]), 'bp-low', amber('reference'));
  });
});

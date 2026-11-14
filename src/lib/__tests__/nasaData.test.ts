import { describe, expect, it } from 'vitest';
import { LINK_PRESETS } from '../../data/comm';
import { CREW } from '../../data/crew';
import { ENVIRONMENTS, INDICATORS } from '../../data/indicators';
import { NASA_DATA_ROWS } from '../../data/nasaData';
import { MSL_RAD_SPE_2012 } from '../../data/radEvent';
import { SOURCES } from '../../data/sources';
import { evaluate } from '../rules';
import { SCENARIOS, simulateMember } from '../simulate';
import type { Environment, MissionSettings } from '../types';

const ids = new Set(SOURCES.map((s) => s.id));
const row = (needle: string) => NASA_DATA_ROWS.find((r) => r.title.includes(needle))!;

describe('NASA data table on the Learn screen', () => {
  it('only points at sources that exist, with unique titles', () => {
    for (const r of NASA_DATA_ROWS) {
      expect(r.sources.length).toBeGreaterThan(0);
      for (const id of r.sources) expect(ids.has(id), `${r.title} -> ${id}`).toBe(true);
    }
    expect(new Set(NASA_DATA_ROWS.map((r) => r.title)).size).toBe(NASA_DATA_ROWS.length);
  });

  it('keeps the real OSDR values and their caveat together', () => {
    const osdr = NASA_DATA_ROWS.find((r) => r.sources.includes('osdr'));
    expect(osdr?.value).toMatch(/Fasting status is not documented/);
    expect(osdr?.usedFor).toMatch(/not used to set any crew parameter/);
  });

  it('quotes the same numbers the app actually uses', () => {
    expect(row('MSL/RAD').value).toContain(String(ENVIRONMENTS.transit.dailyDoseMsv));
    expect(row('MSL/RAD').value).toContain(String(ENVIRONMENTS.rover.dailyDoseMsv));
    expect(row('signal delay').value).toContain(`${LINK_PRESETS.marsNear.oneWaySeconds / 60} minutes`);
    expect(row('signal delay').value).toContain(`${LINK_PRESETS.marsFar.oneWaySeconds / 60} minutes`);
    expect(row('career radiation').value).toContain('600 mSv');
    expect(row('solar particle events').value).toContain('250 mSv');
    for (const n of MSL_RAD_SPE_2012.siliconMicroGrayPerDay) expect(row('March 2012').value).toContain(String(n));
    for (const n of MSL_RAD_SPE_2012.doseEquivalentMsvPerDay) expect(row('March 2012').value).toContain(n.toFixed(1));
  });
});

describe('the solar particle event scenario replays real NASA MSL/RAD data', () => {
  const spe: MissionSettings = { environment: 'transit', scenario: 'spe', currentDay: 27, baselineDays: 14, seed: 20261114 };
  const doseOn = (day: number, crew: (typeof CREW)[number]) =>
    simulateMember(crew, spe).records.find((r) => r.day === day)!.values.radDose;

  it('uses the measured daily doses, exactly, on the four event days for every crew member', () => {
    MSL_RAD_SPE_2012.doseEquivalentMsvPerDay.forEach((expected, i) => {
      for (const member of CREW) expect(doseOn(24 + i, member)).toBe(expected);
    });
  });

  it('turns the whole crew red on the peak day, which is about 8 times the usual rate', () => {
    const peak = Math.max(...MSL_RAD_SPE_2012.doseEquivalentMsvPerDay);
    expect(peak / ENVIRONMENTS.transit.dailyDoseMsv).toBeGreaterThan(7.5);
    const atPeak: MissionSettings = { ...spe, currentDay: 25 };
    for (const member of CREW) {
      const ev = evaluate(simulateMember(member, atPeak), atPeak);
      expect(ev.findings.map((f) => f.id.split(':').pop())).toContain('rad-red');
      expect(ev.overall).toBe('red');
    }
  });
});

describe('every source id shown in the app resolves', () => {
  it('indicators and link presets', () => {
    for (const d of INDICATORS) for (const id of d.sources) expect(ids.has(id), `indicator ${d.id} -> ${id}`).toBe(true);
    for (const [k, p] of Object.entries(LINK_PRESETS)) for (const id of p.sources) expect(ids.has(id), `preset ${k} -> ${id}`).toBe(true);
  });

  it('findings from every scenario in every environment', () => {
    const envs: Environment[] = ['station', 'transit', 'rover', 'base'];
    for (const env of envs) {
      for (const sc of SCENARIOS) {
        const settings: MissionSettings = { environment: env, scenario: sc.id, currentDay: 30, baselineDays: 14, seed: 20261114 };
        for (const member of CREW) {
          for (const f of evaluate(simulateMember(member, settings), settings).findings) {
            for (const id of f.sources) expect(ids.has(id), `${env}/${sc.id}/${member.id}/${f.id} -> ${id}`).toBe(true);
          }
        }
      }
    }
  });
});

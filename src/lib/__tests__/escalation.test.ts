import { describe, expect, it } from 'vitest';
import { LINK_PRESET_IDS, LINK_PRESETS } from '../../data/comm';
import { groundGuidance } from '../escalation';

describe('delay-aware escalation', () => {
  it('tells a crew at Mars not to wait for the ground, with the round trip taken from the link preset', () => {
    expect(groundGuidance('marsFar', true)).toMatch(/48 minutes round trip/);
    expect(groundGuidance('marsFar', true)).toMatch(/without waiting/);
    expect(groundGuidance('marsNear', true)).toMatch(/8 minutes round trip/);
  });

  it('says to call now when the link is near real time (station or Moon)', () => {
    expect(groundGuidance('leo', true)).toMatch(/call the flight surgeon now/);
    expect(groundGuidance('moon', true)).toMatch(/call the flight surgeon now/);
  });

  it('lets a non-urgent finding wait for the next report on any link', () => {
    for (const id of LINK_PRESET_IDS) expect(groundGuidance(id, false)).toMatch(/next report/);
  });

  it('always agrees with the round trip of the preset it is given', () => {
    for (const id of LINK_PRESET_IDS) {
      const roundTrip = LINK_PRESETS[id].oneWaySeconds * 2;
      const text = groundGuidance(id, true);
      if (roundTrip < 60) expect(text).toMatch(/call the flight surgeon now/);
      else expect(text).toContain(`${Math.round(roundTrip / 60)} minutes round trip`);
    }
  });
});

/**
 * Every place a NASA number or document enters Space Vigil, in one list. Shown on the Learn screen so a reader can
 * see how much of the tool rests on NASA material and how each piece is used. Source ids point into sources.ts.
 */
export interface NasaDataRow {
  title: string;
  value: string;
  usedFor: string;
  sources: string[];
}

export const NASA_DATA_ROWS: NasaDataRow[] = [
  {
    title: 'NASA-STD-3001: career radiation limit',
    value: '600 mSv total career effective dose, for all ages and sexes.',
    usedFor: 'The mission dose tracker shows progress toward the limit (this mission only). The 50% and 80% markers are our own convention.',
    sources: ['ochmo-radiation'],
  },
  {
    title: 'NASA-STD-3001: solar particle events',
    value: 'Crews must be protected from the design-reference solar particle event to under 250 mSv effective dose.',
    usedFor: 'Quoted in the radiation spike alert.',
    sources: ['ochmo-radiation'],
  },
  {
    title: 'MSL/RAD measurements (Zeitlin 2013, Hassler 2014)',
    value: 'About 1.84 mSv/day in cruise to Mars and about 0.64 mSv/day on the Mars surface, as dose-equivalent rates measured by the MSL/RAD instrument.',
    usedFor: 'The expected daily dose for each environment, which sets when a day counts as a dose spike (3 times and 5 times the usual rate). Dose equivalent is used here as a stand-in for effective dose.',
    sources: ['rad-cruise', 'rad-surface'],
  },
  {
    title: 'MSL/RAD cruise data, March 2012 solar particle event (NASA PDS)',
    value: 'Real daily silicon-detector dose from the RAD archive for 7 to 10 March 2012: 1395, 9805, 3016 and 799 microgray, which we convert to an estimated dose equivalent of 3.2, 14.8, 5.4 and 2.4 mSv/day.',
    usedFor: 'The solar particle event scenario replays these four days, and the red dose line sits at 5 times the usual rate because the peak day was about 8 times it. The dose was measured inside the Mars-bound spacecraft, and the conversion to dose equivalent is our estimate.',
    sources: ['rad-pds'],
  },
  {
    title: 'NASA Reaction Self Test and the PVT-B',
    value: 'A brief psychomotor vigilance test with a 355 ms lapse threshold.',
    usedFor: 'The reaction test and its alert: a full 3-minute test and a 60-second quick version. Neither has been checked against laboratory equipment.',
    sources: ['reaction-self-test', 'pvt-b'],
  },
  {
    title: 'NASA exercise countermeasure study',
    value: 'About 147 minutes of exercise assigned per day on the ISS.',
    usedFor: 'The exercise prompt in the daily routine, the exercise-minutes rule and one mission patch.',
    sources: ['iss-exercise'],
  },
  {
    title: 'NASA Goddard: signal delay',
    value: 'Mars is about 4 minutes away one way at closest approach and about 24 minutes at greatest distance. A NASA review of delayed communications finds that some responsibility shifts from the ground to the crew as delays grow.',
    usedFor: 'The delay on the crew-to-ground link, and the guidance in every alert that needs the ground: call now on a station, act without waiting at Mars.',
    sources: ['comm-delay', 'ames-delay-review'],
  },
  {
    title: 'NASA Human Research Program: five hazards and risks',
    value: 'Radiation, isolation and confinement, distance from Earth, gravity fields, hostile closed environment.',
    usedFor: 'The hazards on each body-map system, the choice of indicators and the plain-language explanations in Learn.',
    sources: ['hrp-hazards', 'hrp-risks', 'hfbp'],
  },
  {
    title: 'NASA evaluation of the Astroskin (Bio-Monitor) shirt',
    value: 'ECG, breathing, SpO2, skin temperature, activity and sleep from one garment.',
    usedFor: 'The shape of the wearable data path and which check-in values can arrive pre-filled.',
    sources: ['bio-monitor-ntrs'],
  },
  {
    title: 'NASA Open Science Data Repository, OSD-575 (Inspiration4)',
    value: '12 real pre-flight serum glucose values from 4 crew: 56 to 100 mg/dL, mean 75, SD 11. Fasting status is not documented.',
    usedFor: 'A sanity check only: the simulator\'s fasting-glucose set-points (84 to 92 mg/dL) sit inside that real range. It is not used to set any crew parameter.',
    sources: ['osdr'],
  },
];

export const NASA_DATA_LIMIT =
  'We found no OSDR tables for heart rate, blood pressure, temperature, sleep or body mass, so those indicators rely on the clinical references listed under Sources, not on NASA datasets.';

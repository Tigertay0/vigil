# Validation and traceability

What backs Space Vigil's alerts, what has been checked against primary sources, and what has not. Generated from
`src/lib/rules.ts` and the test files; 37 alert rules, 37 of them exercised by a named test.

## How the rules are checked

1. **Every rule carries its sources.** Each alert lists the source ids it relies on (see `docs/SOURCES.md` and the
   Learn screen). A test (`nasaData.test.ts`) walks every scenario in every environment for the whole crew and
   fails if any finding points at a source that does not exist.
2. **Every rule is tested on its boundary.** `thresholds.test.ts` and the older rule tests check each rule where it
   has a cut-off: the value just below stays quiet, the value at it fires, and a second level gets its own rows,
   including the multi-day and baseline-relative rules. Rules without a numeric cut-off (an urgent symptom, a missed
   check-in run) are tested on their trigger instead.
   Finding these boundaries exposed five wording or rounding mismatches, which were fixed (a float error at exactly
   3 times and 5 times the daily radiation rate, a three-day glucose rule that counted diabetes-range days, and
   alert text that said "consecutive days" or "below 90/60" where the rule counted check-ins or systolic only).
3. **The simulator is deterministic.** The same seed gives the same mission, so every demo and test is repeatable.
4. **The camera pulse refuses to guess.** `ppg.test.ts` recovers known heart rates from synthetic signals across
   the physiological range and returns nothing for noise, across many seeds.

## Checked against the primary document on 14 November 2026

- NASA-STD-3001 Volume 1 (Rev B and the current Rev C): career limit 600 mSv [V1 4030]; protect crews from the
  design-reference solar particle event to under 250 mSv effective dose [V1 4031].
- NASA NTRS 20110015001: 146.8 minutes of exercise assigned per day on the ISS.
- NASA Goddard, Space Communications: Mars about 4 minutes one way at closest approach, about 24 at greatest distance.
- Basner, Mollicone and Dinges 2011 (PMC full text): PVT-B is 3 minutes with a 1 to 4 second inter-stimulus interval
  and a 355 ms lapse threshold.
- American Heart Association: hypotension is blood pressure below 90/60 mm Hg.
- Stahn et al. 2017: resting core body temperature about 1 °C higher on the ISS than before flight.
- Dev et al. 2024 (Frontiers in Physiology, full text): in 25 ISS astronauts on 6-month missions, hours of sleep were
  unrelated to any cognitive subtest, and self-rated alertness (0 tired to 10 alert) was related to only one measure,
  weakly and inversely (DSST accuracy, p = .05). This supports the "trust the test, not the feeling" alert. The
  study used a cognitive test battery and a 0 to 10 alertness scale, not the reaction test or the Karolinska scale.
- NASA PDS MSL/RAD cruise data (MSL-M-RAD-3-RDR-V1.0): the 7 to 10 March 2012 event was computed from the 218
  downloaded daily files (silicon-detector dose 1395, 9805, 3016 and 799 microgray per day). Using the published
  conversion factors, the same code gives a quiet-day mean of 1.84 mSv/day and event totals within 5% of the published
  ones (Jan 4.2 against 4.0, Mar 19.1 against 19.5, May 1.2 against 1.2 mSv). Dose equivalent per day for the event is
  our estimate (solar-particle quality factor 1 on the excess), the five-day baseline is our choice, and the dose was
  measured inside the Mars-bound spacecraft, not a crewed vehicle. The Zeitlin 2013 paper itself was not opened.
- NASA OSDR OSD-575 (Inspiration4): 12 pre-flight serum glucose values from 4 crew, computed from the downloaded file:
  56 to 100 mg/dL, mean 75, SD 11. Fasting status is not documented, so it is used only as a sanity check.

## Not validated

- **All crew data is simulated.** No real astronaut records, no real wearable feed, no user trial.
- **The reaction test** comes in a full 3-minute mode and a 60-second quick mode (lapses from the long test are saved
  per minute so both compare with one baseline). The quick mode is a shortened form of the PVT-B, and neither mode has
  been validated against laboratory equipment or against the other on enough people.
  Devices add their own latency, so results are judged against each person's own baseline.
- **The camera pulse** is experimental and labelled so.
- **Thresholds that are our own conventions** (not published cut-offs): body mass 5% below baseline, 50% and 80% of
  the career dose, a robust z-score of 3, three-reading persistence windows, the 15% and 35% reaction-time steps,
  the exercise floor of 60 minutes, the 3 times and 5 times radiation spike ratios (red sits at 5 because the largest real cruise event was about 8
  times the cruise mean), and the heart-rate 120 bpm red
  line. The tests pin them, but nothing published backs those exact numbers. The alert text says when a convention is ours.
- **Blood pressure and temperature cut-offs are Earth-based references.** Both can differ in flight, so the app
  also compares each person with their own baseline and says so in the alert.
- **Environment values for the Moon and base** (the 10 second link allowance and the 0.5 mSv/day base dose) are
  labelled assumptions.
- It is decision support, not a medical device, and it does not diagnose or advise on drugs or doses.

## Rule table

| Rule | Alert title | Level | Basis | Sources | Tests |
| --- | --- | --- | --- | --- | --- |
| `bp-crisis` | Blood pressure in crisis range | red | reference | `aha-bp` | `rules`, `thresholds` |
| `bp-stage2` | Blood pressure in stage 2 range | amber | reference | `aha-bp` | `rules`, `thresholds` |
| `bp-stage1` | Blood pressure in stage 1 range for 3 days | amber | reference | `aha-bp` | `rules` |
| `bp-low` | Low systolic pressure | amber | reference | `aha-low-bp` | `rules`, `thresholds` |
| `hr-high` | Resting heart rate very high | red | reference | `aha-hr` | `thresholds` |
| `hr-above` | Resting heart rate above 100 | amber | reference | `aha-hr` | `thresholds` |
| `hr-baseline` | Resting heart rate above your usual | amber | baseline | `aha-hr` | `thresholds` |
| `spo2-low` | Oxygen saturation below 90% | red | reference | `mayo-spo2` | `thresholds` |
| `spo2-border` | Oxygen saturation below the typical range | amber | reference | `mayo-spo2` | `thresholds` |
| `resp-red` | (varies) | red | reference | `resp-range`, `bio-monitor-csa` | `thresholds` |
| `resp-amber` | Breathing faster than the typical range | amber | reference | `resp-range` | `thresholds` |
| `hrv-low` | Heart rate variability down for several nights | amber | baseline | `hrv-norms`, `bio-monitor-csa` | `thresholds` |
| `temp-high` | High fever | red | reference | `cdc-fever` | `thresholds` |
| `temp-fever` | Fever | amber | reference | `cdc-fever`, `stahn-2017`, `hrp-hazards` | `bodymap`, `comm`, `rules`, `today` |
| `temp-low` | Low body temperature reading | amber | reference | `cdc-fever` | `thresholds` |
| `glu-low2` | Glucose below 54 mg/dL | red | reference | `ada-glucose` | `thresholds` |
| `glu-low1` | Glucose below 70 mg/dL | amber | reference | `ada-glucose` | `thresholds` |
| `glu-high2` | Glucose 200 mg/dL or higher | red | reference | `ada-glucose` | `thresholds` |
| `glu-high1` | Fasting glucose 126 mg/dL or higher | amber | reference | `ada-glucose` | `thresholds` |
| `glu-pre` | Fasting glucose 100-125 for 3 days | amber | reference | `ada-glucose` | `thresholds` |
| `sleep-red` | Severe short sleep | red | reference | `aasm-sleep`, `barger-2014` | `thresholds`, `today` |
| `sleep-amber` | Under 6 hours of sleep for 3 nights | amber | reference | `barger-2014`, `aasm-sleep` | `rules`, `thresholds` |
| `pvt-red` | Reaction time well below your baseline | red | baseline | `pvt-b`, `reaction-self-test` | `thresholds` |
| `pvt-amber` | Reaction time slower than usual | amber | baseline | `pvt-b`, `reaction-self-test` | `thresholds` |
| `kss-high` | Sleepy today | amber | reference | `kaida-2006` | `kss` |
| `kss-mismatch` | You feel alert but your reaction test is slow | amber | baseline | `dev-2024`, `pvt-b` | `kss` |
| `mood-low` | Mood below your usual for several days | amber | baseline | `hrp-hazards`, `hfbp` | `thresholds` |
| `stress-high` | Stress above your usual for several days | amber | baseline | `hfbp` | `thresholds` |
| `rad-red` | Radiation dose spike | red | reference | `ochmo-radiation`, `rad-cruise`, `rad-surface` | `rules`, `thresholds` |
| `rad-amber` | Radiation dose above the usual rate | amber | reference | `ochmo-radiation` | `thresholds` |
| `rad-career` | Mission dose nearing the career limit | red | reference | `ochmo-radiation` | `rules` |
| `weight-loss` | Body mass down 5% or more | amber | baseline | `hrp-hazards` | `thresholds` |
| `exercise-low` | Exercise well below the schedule this week | amber | reference | `iss-exercise`, `hrp-hazards` | `thresholds` |
| `symptom-red` | Urgent symptom reported | red | symptom | `hrp-hazards` | `rules` |
| `symptom-persist` | Symptom present for 3 days or more | amber | symptom | `hrp-hazards` | `thresholds` |
| `symptom-cluster` | Several symptoms today | amber | symptom | `hrp-hazards` | `thresholds` |
| `routine` | (varies) | amber | routine | none (own convention) | `bodymap`, `rules`, `thresholds` |

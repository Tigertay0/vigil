# Space Apps project submission draft

The submission form opens Saturday November 14 at 9:00 local time and closes Sunday November 15 at 23:59
local time (Bethesda's own schedule wraps up submissions around 4:20 pm on Sunday, so submit before that and
confirm the cut-off with the Local Lead). Fields below follow the 2026 Project Submission Guide.
Items marked **[Team: confirm]** are statements only the team can verify.

## Project name

Space Vigil

## High-level project summary

Space Vigil is an offline health self-assessment tool for astronauts on long missions, built for the moment
when the flight surgeon is minutes away by radio, not seconds. Each crew member logs the indicators named in the
challenge (blood pressure, heart rate, glucose, temperature, sleep, mood) plus SpO2, breathing rate, HRV, body
mass, exercise, stress, sleepiness and radiation dose (17 indicators counting systolic and diastolic
separately), a reaction test (3 minutes or a 60-second quick version) and a camera pulse reading. Every value is compared with the person's own 14-day pre-flight
baseline and with published cut-offs from NASA-STD-3001, ACC/AHA, CDC and ADA (or labelled as our own
convention), then shown as a colour-coded
status with its reason. Every alert states the rule that fired, the numbers, the source, a countermeasure
checklist, and what to do about the ground link: on a Mars transit it says to start the checklist and act
without waiting for a reply that can take up to 48 minutes round trip (about 8 at closest approach). A clickable body map groups the results into
seven body systems and the five NASA spaceflight hazards. It runs offline on a tablet or phone and covers station,
transit, rover and base settings. All crew data in the demo is simulated.

## Link to project demo

Slides (7 slides, PDF): https://github.com/Tigertay0/vigil/blob/main/docs/VIGIL-demo.pdf

The rules ask for either a 7-slide deck or a video of 30 seconds or less, so submit the deck as the demo. The
28.8-second video (docs/VIGIL-30s.mp4) is optional: its voice-over still opens with "Halfway to Mars" and says the
reaction test "catches" sleep loss, which the corrected deck and app avoid (see docs/VIDEO_SCRIPT.md). Re-record
it before using it, and disclose the synthetic voice if you do.

The link works only after the `competition-polish` branch is merged into `main`. Open it in a private window
before submitting to check that no login is needed, or upload the PDF to Google Drive with public access and use
that link instead.

## Link to final project

Live app: https://tigertay0.github.io/vigil/ (after GitHub Pages is switched on for the repository; fallback:
https://victor-andiazabal.github.io/victor-andiazabal/)
Source: https://github.com/Tigertay0/vigil

## Detailed project description

**What it does.** A daily check-in (keyboard, touch or values pre-filled from a wearable), a camera-based pulse
measurement (fingertip or face, processed on the device), a psychomotor vigilance reaction test, trend charts
with the baseline band and published cut-offs, an alert list with checklists, a body map that colours seven body
systems from the rule results, a routine with timed prompts, a streak and mission patches for habits, a ground
view for the flight surgeon with a crew-to-ground message link that delivers reports after the one-way
light-time delay (demo time compresses it), CSV import for device data, a Learn section that explains every
indicator and source, and mission settings for the four environments and five scenarios.

**How it works.** Pre-flight days give a median and a median absolute deviation per indicator. In-flight
values are turned into a robust z-score; values beyond about 3 typical deviations, or three-day trends, are
flagged even when inside the population range. Reference rules use published cut-offs. Rules are plain
TypeScript functions, each tied to a source id, so judges and flight surgeons can read exactly what fires.
When an alert needs the ground, the app says what that means for the current environment: near real time on a
station, seconds at the Moon, and up to 48 minutes round trip at Mars.

**Benefits.** Early detection of slow drifts (sleep debt, mood, reaction time) before they become events;
consistent self-measurement through routine prompts; a single packaged message for the ground; a learning
layer so crew without medical training understand what each number means and how to measure it on board. An
alert's rule, numbers and source are two taps from the home screen. When a crew member rates themselves alert but
their reaction test is slow, the app says to trust the test, not the feeling (in ISS astronauts the two showed
little link, Dev et al. 2024). Mission patches reward habits, never readings, so nobody gains by under-reporting.

**Beyond spaceflight.** **[Team: confirm before keeping this paragraph]** The same pattern (personal baselines,
transparent rules, and reports that still work when no doctor can reply in real time) may suit other remote teams,
such as polar stations or ships. We have not tested this.

**Data source.** Space Vigil is designed around the Bio-Monitor (Hexoskin Astroskin) smart shirt that has flown on
the ISS since 2019 and is being adapted for Gateway: ECG and heart rate, heart rate variability, breathing
rate, SpO2, skin temperature, activity and sleep from one garment over Bluetooth to the crew tablet. Cuff,
glucose meter and dosimeter readings are typed or imported. The prototype uses simulated values in that shape.

**Method.** Design thinking: empathize (three users: astronaut, crew medical officer, flight surgeon), define
("understand an alert and the next step in under 30 seconds"), ideate, prototype, test. See docs/DESIGN_PROCESS.md.

**Tools.** React 19, TypeScript, Vite, Recharts, vitest. No backend. GitHub Pages for hosting.

**Validation.** Every one of the 37 alert rules is tested at its boundary, and every
source an alert cites is checked to exist; what was verified against primary documents, and what was not, is in
docs/VALIDATION.md.

**Limits.** A decision-support prototype, not a medical device. It does not diagnose and gives no drug or dose
advice, only lifestyle and procedural checklists. Operational limits on a real mission are set by the flight
surgeon. The reaction test comes in a full 3-minute mode and a 60-second quick mode, neither checked against laboratory equipment, and the camera pulse is
experimental.

**Hopes.** A template that a flight surgeon could configure per crew member and per mission, with real
wearable input.

## Use of Super Intelligence (SI)

Draft answer (this field is for data collection and is not shown to judges, but judges can see the labels inside
the project):

> The team defined the problem, the three users, the concept and the alert logic. **[Team: confirm]** We used
> Anthropic's Claude AI assistant to help write and refactor TypeScript/React code and unit tests, to draft
> documentation, and to review the cited thresholds against their sources. **[Team: confirm that a team member
> reviewed every AI-assisted change.]** Clinical numbers were checked against the primary sources listed in the
> app. The 30-second video voice-over is a synthetic Microsoft neural text-to-speech voice. Crew portraits are
> line icons drawn in code, not AI-generated images. **[Team: list any other AI image, video or audio tools used,
> and watermark any AI-generated image or video.]** All crew data is simulated.

## NASA data and resources used

From the challenge's official Resources tab: NASA HRP 5 Hazards of Human Spaceflight; NASA HRP Risks of Human
Spaceflight; NASA HRP Ongoing Research in Space; CSA Monitoring Radiation for Astronaut Health; CSA Why Do We
Conduct Science Experiments in Space. All five are cited in the app (Learn page and alert sources).

How each NASA number is used (the same table is in the app, on the Learn screen under "Where NASA data enters
Space Vigil"):

- NASA-STD-3001: the 600 mSv career limit (mission dose tracker) and the requirement to protect crews from the
  design-reference solar particle event to under 250 mSv effective dose (radiation spike alert).
- NASA MSL/RAD (Zeitlin 2013, Hassler 2014): 1.84 mSv/day in cruise and 0.64 mSv/day on the Mars surface, as dose
  equivalent used as a stand-in for effective dose. They set the expected daily dose per environment and the 3x
  and 5x dose-spike thresholds.
- NASA Planetary Data System, MSL/RAD cruise data (MSL-M-RAD-3-RDR-V1.0, DOI 10.17189/1519761): the solar
  particle event scenario replays 7 to 10 March 2012. We read the daily silicon-detector dose from the PDS files
  (1395, 9805, 3016 and 799 microgray per day) and estimate dose equivalent (3.2, 14.8, 5.4 and 2.4 mSv/day) with
  published conversion factors. The same method reproduces the published 1.84 mSv/day cruise mean and the published
  event totals within 5%. The dose was measured inside the Mars-bound spacecraft, not a crewed vehicle.
- NASA Reaction Self Test and the PVT-B (NTRS): the 355 ms lapse threshold behind the reaction test (full 3-minute and 60-second quick modes).
- NASA NTRS exercise study: about 147 minutes of exercise assigned per day on the ISS (routine prompt, rule, patch).
- NASA Goddard: Mars is about 4 minutes away one way at closest approach and about 24 at greatest distance (link
  delay and the ground-link guidance in each alert). NASA NTRS (Ames) review of delayed communications: some
  responsibility shifts to the crew as delays grow.
- NASA Human Research Program, five hazards and risks: the hazards on each body-map system, the choice of
  indicators and the Learn explanations.
- NASA NTRS evaluation of the Astroskin (Bio-Monitor) shirt: the shape of the wearable data path.
- NASA Open Science Data Repository, OSD-575 (Inspiration4): 12 real pre-flight serum glucose values from 4 crew
  (56 to 100 mg/dL, mean 75, SD 11; fasting status not documented). Used only as a sanity check that the
  simulator's fasting-glucose set-points (84 to 92 mg/dL) sit in a real range, never to set a crew parameter. We
  found no OSDR tables for heart rate, blood pressure, temperature, sleep or body mass.

## Space agency partner data and other references

Space agency partner material (Canadian Space Agency, a 2026 Space Agency Partner): the Bio-Monitor
documentation used for the wearable data path, plus the two CSA articles on the challenge's Resources tab. No
partner dataset is loaded.

Other data and resources: ACC/AHA 2017 blood pressure guideline; Cleveland Clinic respiratory rate; Shaffer and
Ginsberg 2017 (HRV norms); American Heart Association heart rate reference; ADA Standards of Care; CDC fever
definition; Mayo Clinic SpO2 reference; AASM/SRS sleep recommendation; Barger et al. 2014 (ISS sleep); Basner,
Mollicone and Dinges 2011 (PVT-B); Shavers et al. 2024 (ISS dose rate); Verkruysse et al. 2008 (camera
photoplethysmography); NASA NTRS Astroskin evaluation 20190000238; Hexoskin Gateway announcement (Nov 2024).
Full list with links: docs/SOURCES.md.

Software and assets: React, React DOM, Recharts, Vite, vite-plugin-pwa, TypeScript, vitest and oxlint (open
source, MIT or similar licences); Space Grotesk and IBM Plex Mono fonts via Fontsource (SIL Open Font Licence);
PptxGenJS for the slide deck; the Slidesgo "Earth's Atmosphere Class" look as design inspiration for the deck;
the Microsoft neural voice used for the video narration. App backdrop: NASA astronaut photograph ISS074-E-521637
(NASA Gateway to Astronaut Photography of Earth, taken 13 April 2026), used with NASA acknowledged as the source and
no endorsement implied. **[Team: check docs/logo-sheet.png.]**

All crew data in the demo is simulated.

# Space Vigil demo, 7 slides

Space Apps accepts a project demo of at most 7 slides (title and intro slides included) or a video of 30 seconds
or less. Going over either limit makes a project ineligible for global judging. This deck has exactly 7 slides.
The finished deck is `VIGIL-demo.pptx` in this folder, with a PDF export beside it (`VIGIL-demo.pdf`, 7 pages).
The design follows the Slidesgo "Earth's Atmosphere Class" look: dark sky, atmosphere layers, orbit rings,
condensed caps headings. Fonts are Bebas Neue (headings) and Barlow (body), both free on Google Fonts; install
them before opening the .pptx in PowerPoint, or use the PDF. `SpaceVigil-how-it-works.pptx` is a two-slide
companion on data collection and the dashboard; it is not part of the 7-slide demo. Below is the outline: each
slide has a headline, the visual, and two or three lines of speaker text.

---

## Slide 1. Space Vigil

**Visual:** app logo on the dark dashboard, team name, challenge name.

Crew health self-assessment and decision support for long-duration missions.
Les Tigres de Bethesda. NASA Space Apps 2026, Create Health Monitoring Software for Astronauts on Space Missions.

---

## Slide 2. 24 minutes to Mars

**Visual:** simple diagram, Earth and Mars with the one-way delay; NASA's five hazards as five icons.

On a Mars transit a question to the flight surgeon takes up to 48 minutes round trip (4 to 24 minutes one way,
NASA Goddard). NASA's Human Research Program names five hazards; many show up first as a small shift in an
everyday number. Crews need software that notices those shifts and says what to do.

---

## Slide 3. One screen, one answer

**Visual:** dashboard screenshot, Commander on mission day 30, "Needs action" ring, 17 colour-coded tiles.

Seventeen indicators, six of them straight from the challenge brief (blood pressure, heart rate, glucose,
temperature, sleep, mood), plus SpO2, breathing rate, HRV, mass, exercise, stress, sleepiness, reaction time
and radiation dose.
Green, amber, red at a glance. Each tile shows today's value and the person's own baseline.

---

## Slide 4. Judged against you, not the average

**Visual:** sleep trend chart with the baseline band, launch line, scenario window and the 7 h reference line.

Fourteen pre-flight days give each astronaut a median and a robust spread per indicator.
A resting heart rate of 95 is normal for most adults and abnormal for someone whose baseline is 55.
Published cut-offs (ACC/AHA, CDC, ADA, NASA-STD-3001) are drawn on the same chart.

---

## Slide 5. Every alert explains itself

**Visual:** alert card: "Reaction time well below your baseline", Why, Do, source links, checklist open.

Every alert states the rule, the numbers, the published source, and a checklist, and says what the delay means
right now: at Mars, act without waiting for a reply. The rule, the numbers and the source are two taps from the
home screen.
A one-click message to the flight surgeon bundles the day's values and flags, so one exchange is enough.
The reaction self-test is the PVT-B that ISS crews already run, as a full 3-minute test or a 60-second quick version.

---

## Slide 6. Body map and what is different

**Visual:** body map screenshot (seven systems coloured by the same rules) beside the "You feel alert but your
reaction test is slow" alert from the scenario "Feels fine, reacts slow".

Click a body system to see its hazards, the indicators behind its colour and its checklists.
Three choices set it apart: it says "trust the test, not the feeling" when self-rated alertness and the reaction
test disagree (in ISS astronauts the two showed little link, Dev et al. 2024); the advice changes with the link
delay (call now on a station, act without waiting at Mars); and mission patches reward habits, never readings, so
nobody gains by under-reporting.

---

## Slide 7. What is real and what is next

**Visual:** short "real" and "next" lists; link to the source.

Every threshold cites a published source or is labelled as our own convention; crew data is simulated and
labelled. The Mars delay and dose rates are NASA figures, the solar storm replays NASA's MSL/RAD measurements of
the 7 to 10 March 2012 event, and the Moon and base values are labelled assumptions.
Next: wearable and cuff integration over Bluetooth, baselines from real astronaut data as it is published (OSDR
holds only a small glucose table today), sync between crew tablets and a real ground link, validation of both
reaction-test modes against laboratory PVT-B equipment.
Source: github.com/Tigertay0/vigil

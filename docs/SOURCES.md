# Sources

Everything Space Vigil shows as a number or a claim traces to one of these: agency documents and peer-reviewed
papers first, plus a few clinical reference pages (Mayo Clinic, Cleveland Clinic, American Heart Association) and
the Hexoskin announcement, each named by organisation. The same list is in `src/data/sources.ts` and in the app under Learn.

## NASA

The challenge's official Resources tab (posted 13 November) lists five links; all five are below and cited in the app.

- **NASA Human Research Program, Risks of Human Spaceflight.** https://www.nasa.gov/hrp/risks/
- **NASA Human Research Program, Ongoing HRP Research in Space.** https://www.nasa.gov/hrp/ongoing-hrp-research/
- **Canadian Space Agency, Monitoring radiation for astronaut health (26 Feb 2026).**
  https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp
- **Canadian Space Agency, Why do we conduct science experiments in space?**
  https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp

- **NASA Human Research Program, The 5 Hazards of Human Spaceflight.** https://www.nasa.gov/hrp/hazards/
  Space radiation, isolation and confinement, distance from Earth, gravity fields, hostile/closed environments.
- **NASA Human Research Program, About Human Factors and Behavioral Performance.**
  https://www.nasa.gov/reference/about-human-factors-and-behavioral-performance/
  Sleep, cognition, team cohesion and behavioral health research for long missions.
- **NASA Office of the Chief Health and Medical Officer, Radiation Protection Technical Brief (NASA-STD-3001).**
  https://www.nasa.gov/wp-content/uploads/2023/03/radiation-protection-technical-brief-ochmo.pdf
  Career effective-dose limit of 600 mSv; crews must be protected from the design-reference solar particle event to under a 250 mSv effective dose ([V1 4030], [V1 4031]).
- **NASA NTRS, Reaction Self Test (ISS fatigue monitoring).** https://ntrs.nasa.gov/citations/20090029851
  ISS crews run a brief reaction-time test on a laptop, especially around sleep shifts.
- **NASA NTRS, Inadequate Loading Stimulus on ISS Results in Bone and Muscle Loss.** https://ntrs.nasa.gov/citations/20110015001
  About 146.8 min/day of exercise assigned on ISS schedules.
- **NASA Goddard, Space Communications: 7 Things You Need to Know.**
  https://www.nasa.gov/centers-and-facilities/goddard/space-communications-7-things-you-need-to-know/
  Mars: about 4 min one way at closest approach, about 24 min at greatest distance. The Moon's light time (about
  1.3 s) is simple physics, not from this page; the 10 s Moon preset in the app is our own allowance for relays and
  processing.
- **NASA NTRS (Ames), The Impact of Delayed Communications on NASA's Human-Systems Operations.**
  https://ntrs.nasa.gov/citations/20240006867
  As delays grow, some responsibility shifts from ground experts to the onboard crew.
- **NASA Open Science Data Repository, OSD-575, SpaceX Inspiration4 Blood Serum Metabolic Panel.**
  https://osdr.nasa.gov/bio/repo/data/studies/OSD-575 (DOI 10.26030/mc5d-p710)
  12 pre-flight serum glucose values from 4 crew (file LSDS-8_Comprehensive_Metabolic_Panel_CMP): range 56-100
  mg/dL, mean 75, SD 11. Fasting status is not documented, and the post-flight R+45 values (36-44 mg/dL) look
  implausible, so this is used only as a sanity check on the simulator's fasting-glucose set-points (84-92 mg/dL),
  never to set a crew parameter. OSDR holds no heart-rate, blood-pressure, temperature, sleep or body-mass tables
  for these indicators that we could find.
- **NASA Space Apps Challenge 2026, Create Health Monitoring Software for Astronauts on Space Missions.**
  https://www.spaceappschallenge.org/2026/challenges/health-monitoring-software/

## Canadian Space Agency and industry

- **Canadian Space Agency, Bio-Monitor: keeping an eye on astronauts' vital signs.**
  https://www.csa-asc.gc.ca/eng/sciences/astroskin.asp
  Smart shirt and headband on the ISS since 2019: ECG, breathing, SpO2, skin temperature, activity, blood-pressure estimate.
- **NASA NTRS 20190000238, Wearable biosensor monitor to support autonomous crew health and performance.**
  https://ntrs.nasa.gov/api/citations/20190000238/downloads/20190000238.pdf
  30-day ground evaluation of the Astroskin system: good data quality over 24 h, comfortable, reliable Bluetooth.
- **Hexoskin, contract to bring Astroskin sensors to the Moon (Gateway), November 2024.**
  https://hexoskin.com/blogs/news/hexoskin-wins-contract-to-bring-astroskin-sensors-to-the-moon

## Peer-reviewed

- **Zeitlin et al., Science 340 (2013).** Measurements of energetic particle radiation in transit to Mars on
  the Mars Science Laboratory. https://doi.org/10.1126/science.1235989. About 1.84 mSv/day during cruise.
- **Hassler et al., Science 343 (2014).** Mars' surface radiation environment measured with the Curiosity
  rover. https://doi.org/10.1126/science.1244797. About 0.64 mSv/day on the surface.
- **NASA Planetary Data System (Planetary Plasma Interactions node), MSL/RAD RDR cruise data,
  MSL-M-RAD-3-RDR-V1.0.** https://pds-ppi.igpp.ucla.edu/data/MSL-M-RAD-3-RDR-V1.0/DATA/CRUISE/ (DOI
  10.17189/1519761). The solar particle event scenario replays 7 to 10 March 2012. Daily silicon-detector dose
  (`DOSIMETRY_TOTAL_DOSE_B`, time-weighted UTC days) was computed from the 218 daily cruise files: 1395, 9805, 3016
  and 799 microgray per day. The archive has no dose-equivalent column, so dose equivalent is estimated with
  published conversion factors (x1.38 silicon to water, x3.82 galactic quality factor, quality factor 1 for the
  event excess; Guo et al. 2015 and 2021): 3.2, 14.8, 5.4 and 2.4 mSv/day. The same method gives a cruise mean of
  1.84 mSv/day and event totals within 5% of the published ones (March 19.1 against 19.5 mSv). The dose was
  measured inside the Mars-bound spacecraft, not a crewed vehicle. Citation as asked by the archive: J. Peterson,
  S. Rafkin, C. Zeitlin, B. Ehresmann, E. Weigle, S. Jeffers and D.M. Hassler, MSL Mars Radiation Assessment
  Detector RDR V1.0, NASA Planetary Data System, 2013.
- **Shavers et al., Zeitschrift fuer Medizinische Physik 34 (2024).** Space agency-specific standards for crew
  dose and risk assessment of ionising radiation exposures for the ISS.
  https://doi.org/10.1016/j.zemedi.2023.06.005. ISS effective dose about 0.2-0.5 mSv or more per day.
- **Barger et al., The Lancet Neurology 13 (2014).** Prevalence of sleep deficiency and use of hypnotic drugs
  in astronauts before, during, and after spaceflight. https://doi.org/10.1016/S1474-4422(14)70122-X
  ISS crews scheduled 8.5 h, averaged about 6.1 h; 7 h or more only on 24% of nights.
- **Basner, Mollicone and Dinges, Acta Astronautica 69 (2011).** Validity and sensitivity of a brief
  psychomotor vigilance test (PVT-B) to total and partial sleep deprivation.
  https://doi.org/10.1016/j.actaastro.2011.07.015. 3-minute test, 355 ms lapse threshold.
- **Garrett-Bakelman et al., Science 364 (2019).** The NASA Twins Study.
  https://doi.org/10.1126/science.aau8650. Gene expression, immune, telomere and cognitive changes over a
  340-day mission.
- **Verkruysse, Svaasand and Nelson, Optics Express 16 (2008).** Remote plethysmographic imaging using ambient
  light. https://doi.org/10.1364/OE.16.021434. Heart rate from the green channel of ordinary video of skin.
- **Shaffer and Ginsberg, Frontiers in Public Health 5 (2017).** An overview of heart rate variability metrics and
  norms. https://doi.org/10.3389/fpubh.2017.00258. HRV differs widely between people; compare with the person's own baseline.
- **Watson et al., Sleep 38 (2015).** Recommended amount of sleep for a healthy adult (AASM and SRS consensus).
  https://doi.org/10.5665/sleep.4716. Seven hours or more per night.

## Clinical reference ranges

- **ACC/AHA 2017 high blood pressure guideline.**
  https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings
  Normal <120/80; elevated 120-129/<80; stage 1 130-139 or 80-89; stage 2 ≥140 or ≥90; crisis >180 and/or >120.
- **American Heart Association, All about heart rate.**
  https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse
  Typical adult resting heart rate 60-100 bpm.
- **American Diabetes Association, Standards of Care in Diabetes.**
  https://diabetesjournals.org/care/issue/48/Supplement_1
  Fasting <100 normal, 100-125 prediabetes, ≥126 diabetes range; random ≥200 with symptoms; hypoglycemia
  level 1 <70, level 2 <54 mg/dL.
- **CDC, definition of fever.**
  https://www.cdc.gov/quarantine/air/reporting-deaths-illness/definitions-symptoms-reportable-illnesses.html
  Measured temperature of 100.4 °F (38 °C) or higher.
- **American Heart Association, Low blood pressure: when blood pressure is too low.**
  https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/low-blood-pressure-when-blood-pressure-is-too-low
  Hypotension is blood pressure below 90/60 mm Hg; usually not harmful unless there are symptoms.
- **Stahn et al., Scientific Reports 7 (2017), Increased core body temperature in astronauts during long-duration
  space missions.** https://doi.org/10.1038/s41598-017-15560-w
  Resting core temperature about 1 °C higher on the ISS than before flight. Cited as a caution on the fixed fever line.
- **Cleveland Clinic, Vital signs.** https://my.clevelandclinic.org/health/articles/10881-vital-signs
  Typical adult resting breathing rate 12-20 per minute.
- **Mayo Clinic, Hypoxemia.** https://www.mayoclinic.org/symptoms/hypoxemia/basics/definition/sym-20050930
  Pulse-oximeter readings of 95-100% typical; below 90% low.

## Conventions that are ours, not a standard

Stated in the alert text whenever they apply:

- Body mass 5% below the pre-flight median is flagged as Keep an eye on it.
- Mission dose at 50% and 80% of the 600 mSv career limit is shown as Keep an eye on it and Needs action.
- A robust z-score of 3 or more against the personal baseline (median and MAD) is flagged as Keep an eye on it.
- Three-reading persistence windows for stage 1 blood pressure, prediabetes-range glucose, mood, stress and
  symptoms. They count the last readings in a row, so a missed check-in does not reset the run. Mood also fires
  after two low readings when today's rating is 1 out of 5.
- The low blood pressure check looks at the systolic number only (under 90 mmHg).

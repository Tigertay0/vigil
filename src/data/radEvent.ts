/**
 * The solar particle event the "Solar particle event" scenario replays: 7 to 10 March 2012, measured by NASA's
 * Radiation Assessment Detector (RAD) on the Mars Science Laboratory during its cruise to Mars.
 *
 * Source: NASA Planetary Data System, Planetary Plasma Interactions node, MSL-M-RAD-3-RDR-V1.0 (DOI 10.17189/1519761),
 * silicon detector B, `DOSIMETRY_TOTAL_DOSE_B`, time-weighted UTC daily means (only days with 18 hours or more of data).
 *
 * The archive gives absorbed dose, not dose equivalent. The dose equivalent below is an estimate: a quiet-day baseline
 * (the mean of the five days before the event) times the published galactic-cosmic-ray factors (x1.38 silicon to
 * water, x3.82 quality factor; Guo et al. 2015), plus the excess over that baseline at a solar-particle quality factor
 * of 1 (Guo et al. 2021). With those constants the same code reproduces the published cruise mean of 1.84 mSv/day and
 * the published event totals (March: 19.1 mSv computed against 19.5 published). The dose was measured inside the
 * Mars-bound spacecraft, not in a crewed vehicle, and the five-day baseline is our choice.
 */
export const MSL_RAD_SPE_2012 = {
  dates: ['2012-03-07', '2012-03-08', '2012-03-09', '2012-03-10'],
  /** Daily mean silicon-detector dose, microgray per day, read from the PDS files. */
  siliconMicroGrayPerDay: [1395, 9805, 3016, 799],
  /** Estimated daily dose equivalent, millisievert per day (see the method above). */
  doseEquivalentMsvPerDay: [3.2, 14.81, 5.44, 2.38],
} as const;

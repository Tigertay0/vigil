import { LINK_PRESETS, type LinkPresetId } from '../data/comm';

/** Round trips under a minute count as near real time. */
const NEAR_REAL_TIME_SECONDS = 60;

/**
 * What "tell the flight surgeon" means in practice, given how long a reply takes on the chosen link.
 * `urgent` is true for a red finding; anything else can wait for the next scheduled report.
 */
export function groundGuidance(preset: LinkPresetId, urgent: boolean): string {
  if (!urgent) return 'This does not need an answer right away: send it with the next report.';
  const roundTripSeconds = LINK_PRESETS[preset].oneWaySeconds * 2;
  if (roundTripSeconds < NEAR_REAL_TIME_SECONDS) return 'A reply takes seconds: call the flight surgeon now.';
  const minutes = Math.round(roundTripSeconds / 60);
  return `A reply can take about ${minutes} minutes round trip. Start the checklist now, send the report, and act without waiting for an answer.`;
}

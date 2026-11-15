# src: where things are in the code

React 19 + TypeScript + Vite. No backend: every rule runs on the device. Run the tests with `npm test`.

## Find a feature

| Feature | Where |
| --- | --- |
| The alert rules (what turns amber or red, and why) | [lib/rules.ts](lib/rules.ts) |
| Indicators, units, how to measure them, reference ranges | [data/indicators.ts](data/indicators.ts) |
| Every source cited in an alert or on the Learn screen | [data/sources.ts](data/sources.ts) |
| The table of where NASA data enters the app | [data/nasaData.ts](data/nasaData.ts), shown on the Learn screen |
| The real NASA solar storm that the storm scenario replays | [data/radEvent.ts](data/radEvent.ts) |
| The simulated crew and the demo scenarios | [data/crew.ts](data/crew.ts), [lib/simulate.ts](lib/simulate.ts) |
| Personal baselines (median and spread) | [lib/analytics.ts](lib/analytics.ts) |
| Advice that changes with the link delay | [lib/escalation.ts](lib/escalation.ts), with link delays in [data/comm.ts](data/comm.ts) |
| Crew-to-ground messages with light-time delay | [components/CommLink.tsx](components/CommLink.tsx), [components/Ground.tsx](components/Ground.tsx), [lib/comm.ts](lib/comm.ts) |
| Reaction test (3-minute and 60-second modes) | [components/ReactionTest.tsx](components/ReactionTest.tsx), scoring in [lib/pvt.ts](lib/pvt.ts) |
| Camera pulse | [components/CameraPulse.tsx](components/CameraPulse.tsx), the signal maths in [lib/ppg.ts](lib/ppg.ts) |
| Body map | [components/BodyMap.tsx](components/BodyMap.tsx), [lib/bodymap.ts](lib/bodymap.ts), [data/bodySystems.ts](data/bodySystems.ts) |
| Daily check-in | [components/CheckIn.tsx](components/CheckIn.tsx) and [components/checkin/](components/checkin/) |
| Countermeasure checklists | [data/countermeasures.ts](data/countermeasures.ts) |
| Daily routine, streak and mission patches | [data/routine.ts](data/routine.ts), [lib/badges.ts](lib/badges.ts) |
| CSV import and export, saved data | [lib/csv.ts](lib/csv.ts), [lib/storage.ts](lib/storage.ts) |

## Folders

- `components/`: one file per screen or widget, with its stylesheet next to it. `controls/` holds shared inputs.
- `data/`: fixed content that is not logic.
- `lib/`: logic with no screens. `lib/__tests__/` holds the tests; `thresholds.test.ts` checks every alert rule at its
  boundary.
- `state/`: the app's saved state.
- `styles.css`, `backdrop.css`: global styles and the space backdrop (a NASA photograph, credited in the README).
- `App.tsx`, `main.tsx`: the app shell and its entry point.

For the sources behind the numbers and what was tested, see [../docs/VALIDATION.md](../docs/VALIDATION.md).

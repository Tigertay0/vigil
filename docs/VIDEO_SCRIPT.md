# 30-second video

The finished video is `VIGIL-30s.mp4` in this folder: 1280 by 720, 29.2 seconds, with on-screen captions. The
voice-over is the team's own recording. The picture is screen recordings of the live app at
https://tigertay0.github.io/vigil/ using the simulated crew. Nothing in the video is AI-generated; the end card and
the file's metadata say the crew data is simulated.

It follows the NASA Space Apps demo structure: introduce yourself, lead us in, name your solution, describe your
idea (including how NASA data made it possible), look into the future.

Voice-over as recorded:

1. Hello, we're Victor, Adé and Luca, Les Tigres de Bethesda.
2. Our challenge: astronaut health when the doctor is 48 minutes away.
3. Meet Space Vigil: your health, judged against you.
4. It checks you against your own baseline, then says what to do.
5. NASA data: a real solar storm, measured by Curiosity.
6. Feel fine but test slow? Trust the test.
7. Every Mars crew gets a first look, before the answer arrives.
8. Space Vigil. Try it.

Shot list. Timings are in seconds from the start of the video.

| Time | Template step | On screen | Line |
| --- | --- | --- | --- |
| 0-4.6 | Introduce yourself | Title card: Space Vigil, Victor, Adé, Luca, Les Tigres de Bethesda | 1 |
| 4.6-8.8 | Lead us in | Card: the challenge name and "Mars is up to 24 minutes away one way: up to 48 minutes for a reply" | 2 |
| 8.8-12.3 | Name your solution | Today, Commander, mission day 30 | 3 |
| 12.3-15.2 | Describe your idea | Trends (sleep against the baseline band), then Alerts with the Ground link line | 4 |
| 15.2-19.1 | How NASA data made it possible | Scenario "Solar particle event", mission day 25: every crew tab turns red; source line "NASA MSL/RAD (Curiosity), Planetary Data System, 7-10 March 2012" | 5 |
| 19.1-22.1 | A user's experience | Scenario "Feels fine, reacts slow": the "You feel alert but your reaction test is slow" alert | 6 |
| 22.1-25.5 | Look into the future | Body map, Commander, all systems normal | 7 |
| 25.5-29.2 | End | End card: tigertay0.github.io/vigil, the three names, "Screen recordings of the Space Vigil app. All crew data is simulated." | 8 |

The video was assembled with ffmpeg from the screen clips and the recording; the shots are cut to where each line
starts. The 24 minutes is the one-way delay at Mars' greatest distance, so the card says "up to 48 minutes for a
reply". The storm is a replay of NASA's MSL/RAD measurements, converted to an estimated dose equivalent (method in
`src/data/radEvent.ts`).

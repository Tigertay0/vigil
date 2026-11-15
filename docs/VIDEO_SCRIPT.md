# 30-second video

The finished video is `VIGIL-30s.mp4` in this folder: 1280 by 720, 28 seconds, with on-screen captions and a
synthetic voice-over generated with ElevenLabs text-to-speech (voice "Liam", model eleven_multilingual_v2, sped up
10% to fit). The picture is screen recordings of the live app at https://tigertay0.github.io/vigil/ using the
simulated crew. Because the voice is AI-generated, the file's metadata says so (title, artist, comment and
description tags), the end card says so on screen, and the project page's AI-use field names ElevenLabs.

It follows the NASA Space Apps demo structure: introduce yourself, lead us in, name your solution, describe your
idea (including how NASA data made it possible), look into the future.

Voice-over as recorded:

1. We're Victor, Adé and Luca, from Les Tigres de Bethesda.
2. Our challenge: astronaut health, when the doctor is up to forty-eight minutes away.
3. Meet Space Vigil: your health, judged against you.
4. Daily, it checks you against your own baseline and says what to do.
5. NASA data drives it: a real 2012 solar storm, measured by Curiosity.
6. Feel fine but test slow? Trust the test.
7. Imagine every Mars crew with a first look, before the answer arrives.
8. Space Vigil. Try it.

Shot list. Timings are in seconds from the start of the video.

| Time | Template step | On screen | Line |
| --- | --- | --- | --- |
| 0-4.4 | Introduce yourself | Title card: Space Vigil, Victor, Adé, Luca, Les Tigres de Bethesda | 1 |
| 4.4-8.6 | Lead us in | Card: the challenge name and "Mars is up to 24 minutes away one way: up to 48 minutes for a reply" | 2 |
| 8.6-11.5 | Name your solution | Today, Commander, mission day 30 | 3 |
| 11.5-14.8 | Describe your idea | Trends (sleep against the baseline band), then Alerts with the Ground link line | 4 |
| 14.8-19.7 | How NASA data made it possible | Scenario "Solar particle event", mission day 25: every crew tab turns red; source line "NASA MSL/RAD (Curiosity), Planetary Data System, 7-10 March 2012" | 5 |
| 19.7-22.6 | A user's experience | Scenario "Feels fine, reacts slow": the "You feel alert but your reaction test is slow" alert | 6 |
| 22.6-25.9 | Look into the future | Body map, Commander, all systems normal | 7 |
| 25.9-28.4 | End | End card: tigertay0.github.io/vigil, the three names, "Crew data is simulated. Voice-over: synthetic voice generated with ElevenLabs." | 8 |

The video was assembled with ffmpeg from the screen clips and the eight voice files. The 24 minutes is the one-way
delay at Mars' greatest distance, so the card says "up to 48 minutes for a reply". The storm is a replay of NASA's
MSL/RAD measurements, converted to an estimated dose equivalent (method in `src/data/radEvent.ts`). If the video is
used for the submission, keep the AI-voice note in its description as well as in the file.

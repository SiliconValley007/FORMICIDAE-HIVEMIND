# FORMICIDAE: HIVEMIND

**Thousands of agents. Pheromone-driven AI. One HTML file. No libraries.**

A single-file, zero-dependency Canvas 2D swarm game. You are the Queen: paint pheromone trails, fire four abilities, and hold the nest through 20 waves.

---

## Features

- Title screen with best score/wave; tap/click/key/gamepad starts and unlocks audio
- Four pheromone fields (forage, attack, defend, follow) drive gradient steering
- 9 unit types, wave modifiers, mini-bosses, XP upgrades
- Interactive tutorial (replayable from pause)
- Persistent bests, mute, volume, quality, and FX prefs (`localStorage` with in-memory fallback)
- Procedural Web Audio; fully playable muted or with audio blocked
- Adaptive quality (Auto/High/Low): DPR, particles, glow/shadows
- PWA: installable, offline via service worker, landscape standalone
- Pause menu: Resume, Restart, Mute, Quality, Shake/Flash, Fullscreen, Volume, Tutorial

## Controls

**Keyboard**

| Action                                  | Input                 |
| --------------------------------------- | --------------------- |
| Move                                    | WASD / Arrows         |
| Paint trail                             | Click + drag          |
| Paint mode                              | 1 2 3 4 (H heatmap)   |
| Rally / Overdrive / Blast / Trail Burst | Q / Space / E / Shift |
| Pause                                   | Esc or P              |
| Mute / Fullscreen                       | M / F                 |
| Restart (game over)                     | R / click             |

**Touch**

| Action            | Input                |
| ----------------- | -------------------- |
| Move              | Left joystick        |
| Paint             | Drag elsewhere       |
| Abilities / modes | Bottom-right buttons |
| Pause             | Top-right button     |

**Gamepad**

| Action           | Input                           |
| ---------------- | ------------------------------- |
| Move             | Left stick / d-pad              |
| Paint            | Right stick                     |
| Abilities        | A B X Y (buttons 0-3)           |
| Cycle paint mode | LB / RB                         |
| Pause            | Start / Select                  |
| Start / restart  | Any button on title / game over |

## Quality & accessibility

Pause menu **Quality: Auto / High / Low** scales resolution, particles, and glow. Auto uses a rolling frame-time governor with hysteresis.

**Shake/Flash** can be toggled. `prefers-reduced-motion` disables shake, hit-flash, chromatic pulses, and hit-stop.

Volume slider is persisted. Safe-area insets keep HUD off notches.

## PWA / offline

On HTTPS or localhost the game registers `sw.js` on `window` `load`. Add to Home Screen from the browser menu.

- Android Chrome: menu → Install app / Add to Home screen
- iOS Safari: Share → Add to Home Screen
- Desktop Chrome/Edge: install icon in the address bar

## Project structure

```
index.html              Game (sim + render + input)
manifest.webmanifest    PWA manifest
sw.js                   Service worker
favicon.svg             Favicon
icon-180.png            Apple touch icon
icon-192.png / 512.png  PWA icons (any + maskable)
.nojekyll               GitHub Pages: skip Jekyll
.github/workflows/pages.yml
LICENSE                 MIT
```

## Browser

Current Chromium, Firefox, or WebKit with Canvas 2D. Optional Web Audio and Gamepad. No WebGL, no CDN.

## License

MIT — see LICENSE.

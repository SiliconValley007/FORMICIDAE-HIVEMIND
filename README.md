# 🐜 FORMICIDAE: HIVEMIND

**Thousands of agents. Pheromone-driven AI. One HTML file. No libraries.**

A single-file, zero-dependency browser game built on Canvas 2D. No engine, no build step — a typed-array swarm simulation with a real diffusion-decay pheromone field drives up to ~3,000 autonomous agents, all in one `index.html` you can open by double-clicking it.

You are the Queen. Lead your colony by direct example and by scent, wield four cooldown-based powers, and hold your nest through escalating, procedurally-modified waves and mini-bosses — all the way to wave 20.

---

## Features

- **Title screen** — a lightweight canvas opener ("Enter the Hivemind") shows your best score/wave and a device-aware control hint; nothing simulates until you start, and the same tap/click/key unlocks audio.
- **Pheromone-field AI** — four independent diffusion/decay grids (forage, attack, defend, follow) drive gradient-based steering for every unit. No hardcoded pathfinding.
- **9 unit archetypes** — Workers and Soldiers on your side; Wasps, Termites, Chargers, Splitters, Disruptors, Spitters (ranged), and armored Siege units on theirs, each with distinct movement logic and silhouette.
- **Four player abilities** (Rally, Overdrive, Pheromone Blast, Trail Burst) — each with its own cooldown, visual feedback, and sound — plus a passive Harvest Boost that kicks in when you're collecting food fast.
- **XP-driven upgrades** — XP accrues from score and kills; crossing a rising threshold opens a paused, 1-of-3 upgrade pick (speed, damage, spawn rate, pheromone strength, nest regen, ability cooldowns, or paint radius).
- **Wave modifiers & mini-bosses** — every 3rd wave can roll Fast Enemies / Double Spawn / Tank Wave with an on-screen warning; every 5th wave spawns an oversized mini-boss with its own health bar and an off-screen direction indicator when it's not in view.
- **Interactive, interaction-gated tutorial** — advances only on real movement, forage-painting, attack-painting, and an ability activation (not a timer); replayable from the pause menu.
- **Persistent progress** — best score, best wave, tutorial completion, and your mute preference are saved to `localStorage` (and degrade gracefully if storage is blocked or corrupted).
- **Reactive 3-layer procedural audio** — calm / tension / chaos states crossfade via Web Audio oscillators, with stereo panning and pitch variance. The game is fully playable with audio blocked, muted, or never unlocked — visual feedback never depends on audio state.
- **Game feel** — a critically-damped spring camera with velocity look-ahead and combat-focus bias, layered screen shake, intensity-scaled hit-stop, chromatic pulses on major events, a near-death heartbeat that syncs audio and visuals as the nest's HP falls, and a themed ripple on every upgrade pick.
- **Adaptive rendering quality** — a High/Medium/Low tier (with hysteresis, so it won't flicker) independently throttles the bloom pass, shadow pass, and pheromone diffusion rate under load.

## Controls

**Desktop**

| Action | Input |
| --- | --- |
| Move | `WASD` / Arrow keys |
| Paint a pheromone trail | Click + drag |
| Switch paint mode | `1` `2` `3` `4` (`H` toggles the heatmap) |
| Rally / Overdrive / Pheromone Blast / Trail Burst | `Q` `Space` `E` `Shift` |
| Pause | `Esc` or the ❚❚ button |
| Restart (after a run ends) | `R` / click |

**Mobile / Tablet**

| Action | Input |
| --- | --- |
| Start | Tap the title screen |
| Move | Left-side virtual joystick |
| Paint a pheromone trail | Touch + drag elsewhere |
| Abilities | Button cluster above the paint-mode row |
| Switch paint mode / heatmap | Bottom-right button row |
| Pause | Top-right button |

**Pause menu**: Resume, Restart, Sound On/Off, Replay Tutorial.

## Technical Highlights

- **Zero per-frame allocation at steady state** — every agent, particle, and projectile lives in a preallocated typed-array pool (`Float32Array`/`Uint8Array`); nothing is created or destroyed mid-run.
- **Spatial hash** — a counting-sort grid rebuilt every tick for O(1) neighbor queries, powering separation, combat, food pickup, and projectile collision without any O(n²) pass.
- **Density-based combat** — damage scales with local ally/enemy concentration; outnumbered units get pinned and overwhelmed rather than trading 1-for-1.
- **Audio/visual decoupling** — screen shake, hit-stop, flash, and UI feedback are driven by gameplay state directly, never gated behind the AudioContext being unlocked or running.
- **Safe-area aware layout** — reads `env(safe-area-inset-*)` so controls stay clear of notches and home indicators on supporting devices, and the responsive upgrade-card and HUD layout scale continuously rather than snapping between fixed breakpoints.

## Performance Notes

Targets stable frame pacing on modern desktop and mobile browsers, not a guaranteed frame rate on all hardware. The adaptive quality system exists specifically to keep pacing smooth as load changes.

## Run It

1. Download `index.html`.
2. Open it directly in a browser.

No build step, no dependencies, no server required.

## Browser Requirements

A current Chromium-, Firefox-, or WebKit-based browser with Canvas 2D and (optionally) Web Audio support. No WebGL, no external fonts or assets.

## Limitations

This is a single-player, single-session browser game — no backend, no multiplayer, no analytics.

# MVP Playtest Report

## Build Under Test

Branch: `codex/online-mvp`  
Episode: `Incident 001: Linxia Envelope`  
Date: May 25, 2026

## Acceptance Results

| Scenario | Result | Evidence |
| --- | --- | --- |
| Selectable roles expose distinct motivation and resources | Pass | Investigator, Keeper, and Seeker role cards and briefing flow. |
| Free input is parsed before state mutation | Pass | Board preview dialog appears before commit; covered by browser test. |
| Rules and canon remain deterministic | Pass | Unit tests verify stable seed truth and consistency-safe clue award. |
| Full run produces messages, clues, and replay | Pass | Desktop and mobile Chromium sessions select the true threat, reach `Safe Resolution`, and restart at role selection. |
| Interface reads as situation board rather than chat | Pass | Fixed role/resource status, scene selector, action desk, and tabbed intelligence displayed concurrently. |
| Localization remains usable during a run | Pass | UI navigation test changes to English before play; state is unchanged by language preference. |
| Sound has legal and accessible behavior | Pass | Runtime-only synthesized ambience/cues; opt-in toggle, volume, and mute present. |
| Responsive and motion preferences | Pass | Mobile Chromium session passes; reduced-motion toggle visibly disables pulsing transitions. |

## Validation Commands

- `npm run lint`: passed without warnings.
- `npm run typecheck`: passed.
- `npm run test`: passed, 5 checks.
- `npm run build`: passed.
- `npm run test:e2e`: passed, desktop and mobile full-session flows.

## Playability Notes

- The action desk presents deterministic stakes while keeping typed expression available.
- Public messages establish urgency; private messages and acquired clues make non-player roles feel motivated.
- Four truths make the replay report meaningful without requiring generated canon.
- Desktop and phone landing compositions retain readable hierarchy and a clear primary action.

## Known Low-Priority Limits

- V1 dialogue uses authored local lines rather than emergent language generation.
- Ambient audio is intentionally minimal and procedural rather than cinematic music.
- Sessions reset on refresh; only experience preferences persist locally.

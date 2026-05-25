# Version 2.0 Playtest Report

## Build Under Test

Branch: `codex/v2-ai-story`  
Episode: `Incident 001: Linxia Envelope`  
Date: May 25, 2026

## Acceptance Results

| Scenario | Result | Evidence |
| --- | --- | --- |
| Opening reads as a game, not an operations console | Pass | Original pixel rain CG, cast portraits and dialogue stage replace the default work-board entry. |
| Cast and actionable targets are discoverable | Pass | Six people appear before role choice; scene portraits are selectable targets during play. |
| Live AI is visible and meaningful | Pass | A production Worker request generated target dialogue, gesture and subtext from a player-written challenge; UI displays `AI 即兴回应` and model name. |
| AI cannot rewrite canon | Pass | Deterministic rule engine releases clues and result first; the Worker receives public identity and already known evidence only, not hidden truth or private player goal. |
| Consequences and new evidence are noticeable | Pass | Reaction panel shows exposure/resource deltas and gold `新证据`; notebook tab badge highlights obtained evidence. |
| Mystery prose is more dramatic but still legible | Pass | Action narration now leads with observed behavior and identifies the testable consequence; benchmark documented separately. |
| Responsive layouts remain playable | Pass | Desktop and Pixel 7 automated full-session flows pass; manual mobile review corrected an excessive notebook height. |
| Future multiplayer/authorship can extend structure | Pass | `RoleController`, `RoomSeat`, `MatchTicket` and `EpisodeDraft` contracts plus roadmap are reserved without changing truth ownership. |
| Immediate final-action shortcut is blocked | Pass | Protect/Reveal remain locked until verified clues are obtained from two different people; typed final intents cannot bypass the same engine rule. |

## Validation Results

| Validation | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm run test` | Passed, 6 tests including early final-action rejection |
| `npx wrangler deploy --dry-run --config worker/wrangler.jsonc --outdir worker-dist` | Passed, Workers AI binding validated |
| `npm run build` | Passed |
| `npm run test:e2e` | Passed, desktop and mobile complete sessions plus immediate-protection regression flow |
| Cloudflare live actor endpoint request | Passed, non-empty Chinese performance returned from `@cf/zai-org/glm-4.7-flash` |

## Manual Review

- Desktop: played from rain opening to an AI response; selectable portraits, response badge, subtext and evidence delta were readable at once.
- Mobile: played through the first AI interaction and checked the stacked scene/action/intelligence flow; capped the notebook feed height after review.
- CORS: production-origin request to `https://seventh-district-actor.yunzhixu620.workers.dev/perform` succeeded.

## Known Low-Priority Limits

- 2.0 uses Cloudflare Workers AI for the published live actor. A Qwen provider is reserved behind the same contract but is not compared in this release.
- Live wording is generated and may vary in quality; factual clue and ending authority remain deterministic.
- Human matchmaking, persistent identities and player-authored publishable scenarios are scheduled after 2.0.
- Ambient audio remains original procedural synthesis rather than licensed cinematic recordings.

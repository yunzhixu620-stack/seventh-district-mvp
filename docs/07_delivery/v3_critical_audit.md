# V3.0 Critical Audit: From AI Drama To Urban RP Night Session

## Decision

V2 is a presentable **AI deduction drama**: the player investigates a variable incident, speaks to characters, sees a generated reaction and commits a protected or exposed ending.

V3 must become a **single-player pseudo-multiplayer urban social-roleplay session**: the player enters a street event with a personal agenda, manipulates people and information, watches other participants act for their own goals, and only learns after the session which slots were AI, fixed NPCs, system proxies or future human seats.

This is not a visual polish pass. It changes the primary fantasy from solving an envelope case to surviving and influencing a socially unstable night lobby.

## What Feels Wrong Today

| Current V2 behavior | Why it breaks the V3 fantasy | V3 direction |
| --- | --- | --- |
| Landing page promises live AI characters and a pixel-noir drama. | It sells technology and investigation before roleplay uncertainty. | Introduce a mixed-participant night session; the hook is not knowing who is playing whom. |
| The scene visibly labels generated dialogue as `AI 即兴回应 / LIVE AI RESPONSE`. | It reveals the answer to the central "真人测试" question before the player can form a judgment. | Show diegetic speech, messages and off-screen actions only; reveal control type in the report. |
| Player action mainly produces one target response and an awarded clue. | AI feels like an actor waiting for prompts, not another player seeking advantage. | After player moves, goal-driven role agents initiate public posts, private approaches, movement, suppression, trading and disruption. |
| Roles describe private objectives, but available loops remain largely shared investigation actions. | Choosing a role changes flavor more than strategic play. | Role cards foreground desire, fear, leverage, specialties, dependency and distinct win/failure pressure. |
| Linxia's envelope functions primarily as a truth puzzle. | The fastest interpretation is still "find evidence, pick the right resolution." | Treat the envelope as a contested social object that can be hidden, protected, traded, exposed, suppressed or exploited. |
| Current status emphasizes resources, exposure and clues. | The player cannot read the wider street reaction to social manipulation. | Expose street heat, administrator attention, evidence risk and public opinion shifts. |
| Public/private channels contain pacing messages but do not establish independent agendas strongly enough. | The street feels narrated rather than populated. | Use the supplied message library and autonomous events so roles contradict, approach and pressure one another. |
| Replay reports truth and action trail but not the concealed participant layer. | The product name's promised payoff never lands. | End with identity/control-type reveal, role goal outcomes, misleading actors and player misjudgments. |

## Evidence In The Existing Product

- [LandingPage.tsx](../../src/pages/LandingPage.tsx) and [uiCopy.ts](../../src/data/uiCopy.ts) currently advertise `LIVE AI`.
- [LivePerformance.tsx](../../src/components/LivePerformance.tsx) surfaces the model/AI response badge in play.
- [gameStore.ts](../../src/store/gameStore.ts) requests one expressive reply after an accepted player action.
- [roleAgentEngine.ts](../../src/engine/roleAgentEngine.ts) exists, but its current authored pressure messages do not yet create a legible autonomous social contest.
- [ReportPage.tsx](../../src/pages/ReportPage.tsx) and [replayEngine.ts](../../src/engine/replayEngine.ts) resolve truth and clues without delivering hidden controller identity payoff.

## What Must Change

1. **Positioning and copy:** home, entry, briefing and report copy must state an urban RP night session rather than an AI mystery demo.
2. **Narrative source of truth:** the provided V3 story package must be checked into `docs/02_narrative/v3_narrative_bible.md` in the narrative/data stage and mapped into structured data without casual rewrites.
3. **Role fantasy and data:** at least four roles must offer distinct leverage and risk, not variations on detective work.
4. **Hidden controller identity:** no in-session AI badges, model names or generated labels; reveal control types only after play.
5. **Street and social state:** add heat, admin attention, evidence risk and public opinion, with player and agent actions moving those states.
6. **AI agency:** deterministic role agents decide legal intents and visible consequences; the LLM may phrase legal messages only.
7. **Channels and world reaction:** player actions trigger independent public/private/off-screen activity from multiple slots.
8. **Post-game reveal:** show variable truth, role goals, control types, deception paths and any identity judgments.

## What Must Be Preserved

- The first episode remains **Linxia Envelope** and remains low-violence urban suspense.
- Variable truth remains structured and seed-selected; there is no fixed killer or single fixed mystery answer.
- Rule resolution, clue legality and outcome ownership remain deterministic.
- Free-text input remains parsed into rule actions before changing state.
- The LLM remains an expression provider only and may not decide truth, goals, identity type, holder or ending.
- Existing React/TypeScript/data/engine/provider/store boundaries are extended incrementally rather than rewritten.
- V3 remains single-player pseudo-multiplayer; real matchmaking, accounts and authoring publication are outside this implementation phase.

## Risks To Manage

| Risk | Mitigation |
| --- | --- |
| Hiding AI labels makes the existing LLM value less obvious. | Deliver value through autonomous behavior and the post-game reveal, not a badge. |
| Agent actions may feel arbitrary or contradict canon. | Require rule-selected intent, knowledge boundary and consistency checks before phrasing. |
| Roleplay freedom could become unreadable chaos. | Keep compact street-state indicators, structured channels and report reconstruction. |
| V3 text is diluted during UI fitting. | Treat the supplied narrative package as source material; split text structurally without changing key meaning. |
| Scope expands toward a GTA clone or multiplayer platform. | Keep the browser session social and state-driven; reserve networking/UGC contracts only. |

## Staged Delivery Plan

| Stage / PR | Scope | Validation |
| --- | --- | --- |
| PR 1: Critical audit | This document plus small positioning/workflow updates only. No UI or engine code. | Document review and diff inspection. |
| PR 2: Narrative and role contracts | Commit the supplied narrative bible; add/map V3 role, character, location, message, clue and report data contracts. | Typecheck and data contract tests. |
| PR 3: Street/social state | Add state models and deterministic action effects for heat, attention, evidence risk and opinion. | Unit tests for player/agent state changes. |
| PR 4: Hidden role agency | Expand role-agent/director/guard behavior and expression-provider boundary. | Tests proving autonomous actions and no canon/identity leakage. |
| PR 5: RP UI and copy | Landing, role choice, street-state display, diegetic channels; remove in-session AI disclosure. | Responsive browser QA and no-AI-label assertions. |
| PR 6: Reveal/report and final QA | Controller reveal, misjudgment/goal report, replay hooks, narrative QA and public release readiness. | Full sessions, report assertions and delivery checklist. |

## Acceptance Baseline For Later PRs

V3 is not done until a first-time player can enter as a social role, feel several other participants independently changing the street, use both buttons and free speech, remain uncertain about who is AI throughout play, and receive that answer as part of a meaningful post-session reveal.

## Stage 1 Boundary

This PR deliberately does **not** change UI, game rules, LLM calls, episode data or deployed behavior. The supplied V3 narrative package will be added unchanged as the narrative source of truth in the next reviewed stage, after this direction is accepted.

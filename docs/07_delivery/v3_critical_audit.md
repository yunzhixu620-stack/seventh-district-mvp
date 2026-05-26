# V3.0 Critical Audit: From AI Drama to Urban RP Night Session

## Decision

V2 is a presentable **AI deduction drama**. The player investigates a
variable incident, speaks to characters, sees a generated reaction and
commits a protected or exposed ending.

V3 must become a **single-player pseudo-multiplayer urban social-roleplay
session**. The player enters a street event with a personal agenda,
manipulates people and information, and watches other participants act for
their own goals. Only after the session does the player learn which slots
were AI, fixed NPCs, system proxies or future human seats.

This is not a visual polish pass. It changes the primary fantasy from
solving an envelope case to surviving and influencing a socially unstable
night lobby.

## What Feels Wrong Today

### Positioning

- **Current behavior:** The landing page promises live AI characters and a
  pixel-noir drama.
- **Problem:** It sells technology and investigation before roleplay
  uncertainty.
- **V3 direction:** Introduce a mixed-participant night session. The hook is
  not knowing who is playing whom.

### Exposed AI Identity

- **Current behavior:** The scene labels generated dialogue as an AI response.
- **Problem:** It reveals the answer to the central "real test" question
  before the player can form a judgment.
- **V3 direction:** Show only diegetic speech, messages and off-screen actions.
  Reveal control types in the report.

### Reactive Rather Than Autonomous Characters

- **Current behavior:** A player action mainly produces one target response
  and an awarded clue.
- **Problem:** AI feels like an actor waiting for prompts, rather than another
  player seeking advantage.
- **V3 direction:** After a player move, goal-driven role agents initiate
  public posts, private approaches, movement, suppression, trading or
  disruption.

### Weak Role Fantasy

- **Current behavior:** Roles describe private objectives, but available loops
  remain largely shared investigation actions.
- **Problem:** Selecting a role changes flavor more than strategic play.
- **V3 direction:** Role cards foreground desire, fear, leverage,
  specialties, dependency and distinct win or failure pressure.

### Envelope as a Puzzle Answer

- **Current behavior:** Linxia Envelope primarily functions as a truth puzzle.
- **Problem:** The fastest interpretation is still to collect evidence and
  pick the correct resolution.
- **V3 direction:** Treat the envelope as a contested social object that can
  be hidden, protected, traded, exposed, suppressed or exploited.

### Missing Street Reaction

- **Current behavior:** Status primarily shows resources, exposure and clues.
- **Problem:** The player cannot read the wider social reaction to
  manipulation.
- **V3 direction:** Expose street heat, administrator attention, evidence risk
  and public opinion shifts.

### Passive Channels

- **Current behavior:** Public and private channels contain pacing messages,
  but independent agendas are not strong enough.
- **Problem:** The street feels narrated rather than populated.
- **V3 direction:** Use autonomous events so roles contradict, approach and
  pressure one another.

### Incomplete Post-game Payoff

- **Current behavior:** Replay reports truth and action history but not the
  concealed participant layer.
- **Problem:** The product name's promised payoff never lands.
- **V3 direction:** Reveal control types, role goal outcomes, misleading
  actors and player misjudgments at the end.

## Evidence in the Existing Product

- [LandingPage.tsx](../../src/pages/LandingPage.tsx) and
  [uiCopy.ts](../../src/data/uiCopy.ts) advertise live AI in play.
- [LivePerformance.tsx](../../src/components/LivePerformance.tsx) surfaces an
  AI response badge and model identity during a session.
- [gameStore.ts](../../src/store/gameStore.ts) requests one expressive reply
  after an accepted player action.
- [roleAgentEngine.ts](../../src/engine/roleAgentEngine.ts) exists, but its
  current authored pressure messages do not yet create a legible autonomous
  social contest.
- [ReportPage.tsx](../../src/pages/ReportPage.tsx) and
  [replayEngine.ts](../../src/engine/replayEngine.ts) resolve truth and clues
  without delivering the hidden controller-identity payoff.

## What Must Change

1. **Positioning and copy.** Home, entry, briefing and report copy must state
   an urban RP night session rather than an AI mystery demo.
2. **Narrative source of truth.** The provided V3 story package must enter the
   repository as `docs/02_narrative/v3_narrative_bible.md`.
3. **Role fantasy and data.** At least four roles must offer distinct leverage
   and risk, not variations on detective work.
4. **Hidden controller identity.** No in-session AI badges, model names or
   generated labels are allowed.
5. **Street and social state.** Add heat, admin attention, evidence risk and
   public opinion, with both player and agent actions moving those states.
6. **AI agency.** Deterministic role agents choose legal intents and effects.
   The LLM may phrase legal messages only.
7. **Channels and world reaction.** Player actions trigger independent public,
   private or off-screen activity from multiple slots.
8. **Post-game reveal.** Show variable truth, role goals, control types,
   deception paths and relevant player judgments.

## What Must Be Preserved

- The first episode remains **Linxia Envelope** and remains low-violence
  urban suspense.
- Variable truth remains structured and seed-selected. There is no fixed
  killer or single fixed mystery answer.
- Rule resolution, clue legality and outcome ownership remain deterministic.
- Free-text input remains parsed into rule actions before changing state.
- The LLM remains an expression provider only. It may not decide truth,
  goals, identity type, holder or ending.
- Existing React, TypeScript, data, engine, provider and store boundaries are
  extended incrementally rather than rewritten.
- V3 remains single-player pseudo-multiplayer. Real matchmaking, accounts and
  authoring publication remain outside this implementation phase.

## Risks to Manage

### AI Value Becomes Less Obvious

Hiding AI labels removes a visible technology signal. V3 must deliver value
through autonomous behavior and the post-game reveal instead of a badge.

### Agent Actions Contradict Canon

Agent behavior may feel arbitrary or leak facts. Every expressed action must
pass a rule-selected intent, a knowledge boundary and consistency checks.

### Roleplay Becomes Unreadable Chaos

Additional agency may reduce clarity. Compact street-state indicators,
structured channels and report reconstruction must preserve readability.

### Supplied Narrative Loses Its Voice

UI fitting may dilute the provided prose. Treat the narrative package as the
source of truth and split it structurally without changing its key meaning.

### Scope Drifts Toward a Different Product

The browser session models social pressure, not a GTA-style sandbox or a
multiplayer platform. Networking and user-generated content remain reserved.

## Staged Delivery Plan

### PR 1: Critical Audit

- **Scope:** This document and small positioning or workflow updates only.
- **Not included:** UI and engine changes.
- **Validation:** Document review, Markdown lint and Unicode-control scan.

### PR 2: Narrative and Role Contracts

- **Scope:** Import the owner-provided narrative bible, then add structured
  V3 role, character, location, message, clue and report contracts.
- **Validation:** Type checking and data-contract tests.

### PR 3: Street and Social State

- **Scope:** Add state models and deterministic action effects for heat,
  attention, evidence risk and opinion.
- **Validation:** Unit tests for player and agent state changes.

### PR 4: Hidden Role Agency

- **Scope:** Expand role-agent, director and guard behavior and preserve the
  constrained expression-provider boundary.
- **Validation:** Tests proving autonomous actions and no canon or identity
  leakage.

### PR 5: RP UI and Copy

- **Scope:** Convert landing, role choice, street-state display and diegetic
  channels; remove in-session AI disclosure.
- **Validation:** Responsive browser QA and no-AI-label assertions.

### PR 6: Reveal, Report and Final QA

- **Scope:** Add controller reveal, misjudgment and goal reports, replay hooks
  and release-readiness documentation.
- **Validation:** Full sessions, report assertions and delivery checklist.

## V3 Non-negotiable Acceptance Gate

V3 cannot be considered complete unless all of these conditions are met:

- AI identity is not exposed during play.
- At least three AI-controlled roles act autonomously during a session.
- Street heat, administrator attention, evidence risk and public opinion are
  visible or inspectable.
- Linxia Envelope is treated as a contested social object, not a fixed
  puzzle.
- The post-game report reveals role control types and player misjudgments.

## Narrative Source-of-Truth Rule

The next narrative/data PR must import the owner-provided V3 narrative bible
as the source of truth. It may split that source into structured fields and
display-ready modules, but it must not casually rewrite key story text,
character motives, truth variants, critical messages or endings.

## Acceptance Baseline for Later PRs

V3 is not done until a first-time player can enter as a social role, feel
several other participants independently changing the street, use buttons
and free speech, remain uncertain about who is AI during play, and receive
that answer as part of a meaningful post-session reveal.

## Stage 1 Boundary

This PR deliberately does **not** change UI, game rules, LLM calls, episode
data or deployed behavior. The supplied V3 narrative package will be imported
as the source of truth in the next reviewed narrative/data stage, before any
UI redesign work begins.

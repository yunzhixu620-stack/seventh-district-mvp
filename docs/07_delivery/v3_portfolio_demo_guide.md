# V3 Portfolio Demo Guide

## Purpose

This guide is for a portfolio review or interview demonstration of the
current V3 MVP after PR #16. The recommended showcase language is simplified
Chinese: it is the most fully authored version of the current experience.

**Live demo:**
[第七街区：真人测试](https://yunzhixu620-stack.github.io/seventh-district-mvp/)

**Presenter goal:** in three minutes, show that this is an urban social
roleplay deduction session in which the player reads hidden participants,
changes a living street situation, makes an identity judgment, and receives
a truthful post-game reveal.

## 30-Second Pitch

> 《第七街区：真人测试》是一场单人可玩的都市 RP 夜局。林夏失联后，
> 一封没人承认持有的信封把六名在场者拉进同一场争夺。玩家以有私心的
> 身份入局，观察其他角色如何发言、接触、误导和推动局势，在结算前判断
> 谁可能是 AI、固定 NPC 或系统代理。真正的爽点不是看到一条 AI 回复，
> 而是在局后发现：你信任的人是谁控制的，你为什么被骗，以及这一局的
> 真相是否被你守住。

Short English framing:

> A single-player urban RP night session where hidden participants compete
> over the Linxia Envelope, react autonomously to your moves, and are
> identified only after you commit your own read of the table.

## What To Show First

1. Open the landing page and state the premise: the player is entering a
   hidden-participant night session, not questioning a chatbot.
2. Open role selection and point to different personal motives, fears and
   methods of intervention.
3. Enter the board, then show street pressures, public activity and private
   contact before discussing implementation details.
4. Make one consequential action and let other roles' visible responses be
   the proof of the session fantasy.
5. Finish with identity guessing and the report-only control-type reveal.

Do not begin with the model endpoint, architecture diagram or full lore.
The player-facing loop is the strongest explanation of the product.

## Three-Minute Demo Flow

### 0:00-0:20 - Home

Introduce the Linxia Envelope and enter. State that this is a
hidden-participant urban night session.

### 0:20-0:45 - Role Selection

Choose `外来调查者`, then show desire and risk. A role is an agenda, not a
dialogue skin.

### 0:45-1:10 - Briefing And Board

Read the opening nudge, then inspect channels and meters. The game gives
direction without forcing an answer.

### 1:10-1:45 - Action Preview

Use `询问` or `试探`, select a target and confirm. Free intent becomes a
ruled, risk-bearing action.

### 1:45-2:05 - Board Reaction

Show public or private reactions and street-state movement. Other seats act;
the world does not wait for one reply.

### 2:05-2:25 - Resolution

Obtain clues, then choose `保护` or `公开揭示`. The envelope is a social stake
with consequences.

### 2:25-2:42 - Identity Guess

Read observations and submit or discuss guesses. The player commits before
receiving answers.

### 2:42-3:00 - Report

Show truth, control types and wrong reads. The reveal is the "真人测试"
payoff.

For a short interview slot, it is acceptable to use a prepared seed or a
quick route that reaches resolution cleanly. Do not imply that all routes
take exactly three minutes in regular play.

## Key Design Highlights

### Role Slot

Each seat has a public image, private goal, risk and control policy. The same
structure can later support AI or human control.

### Variable Truth

The Linxia incident changes by seed while canon stays structured. Replay
changes interpretation rather than only changing dialogue.

### Street State

Heat, admin attention, evidence risk and public opinion remain visible.
Social consequences can be read at a glance.

### Autonomous Role Actions

Other seats message, move, spread rumors or apply pressure after actions.
The session feels inhabited rather than request-response only.

### Identity Guessing

The player judges control types from observed behavior before the reveal.
AI presence becomes a playable uncertainty.

### Post-game Reveal

The report exposes truth, role outcomes, misdirection and actual control
types. The session resolves into reflection and replay motivation.

## Why This Is Not A Galgame

A visual novel or Galgame can create atmosphere and relationship tension, but
this MVP is not built around choosing a dialogue branch to read a fixed
ending. The player selects a social role, targets actions at different
participants, changes street pressures, gathers incomplete information and
must judge hidden control types before the answers are shown.

The honest boundary is that dialogue and authored narrative are still
prominent presentation layers. V3 proves the roleplay-deduction loop; it
does not claim the breadth of a full systemic RPG.

## Why This Is Not A Plain AI Chatbot

The game does not ask an unconstrained model to invent the case. Truth
variants, role goals, legal clue access, action costs, pressure changes and
ending conditions remain rule-owned structured data. Character expression
can make an allowed response feel alive, but it cannot rewrite canon or leak
private information.

AI is interesting here because its possible presence must be read through
behavior within a social situation, then tested in the reveal. The current
MVP does not claim production-level emergent social intelligence or long-term
memory.

## Why This Is Not A Fixed Detective Puzzle

The Linxia Envelope is not only an answer to uncover. It is a contested social
object: different roles want to protect it, expose it, trade around it or use
its uncertainty to move public opinion. Seeds select different truth
variants, and the player's social judgment matters alongside factual clues.

The present rules communicate that promise, but envelope transfer, hiding,
seizure and deeper bargaining remain V3.1 opportunities rather than shipped
claims.

## Key Technical Highlights

- The React, TypeScript and Vite client separates authored content, game
  types, rule logic, state orchestration, expression providers and UI.
- V3 narrative text is derived into typed modules from the owner-provided
  narrative bible instead of being embedded in components.
- The rule layer owns seed-selected truth, action resolution, street-state
  changes, autonomous role beats, identity evidence and replay output.
- Free-text intent is parsed into a previewable, confirmable action before it
  can affect session state.
- Provider and worker boundaries allow constrained character expression while
  preserving rule authority over canon and unrevealed knowledge.
- Automated coverage exercises desktop and mobile session completion,
  non-disclosure during play, guessing, reveal behavior and formatting
  hygiene.

## What Not To Overclaim

- This is a single-player pseudo-multiplayer MVP, not live human matchmaking
  or reconnectable online rooms.
- Autonomous activity is present, but current acceptance evidence does not
  yet prove three independently strategic AI-controlled seats in every
  representative run.
- The product demonstrates bounded AI-enhanced social play, not a
  production-level AI social simulation.
- Simplified Chinese is the polished showcase route; English is usable but
  not yet equivalently authored.
- The envelope is socially contested in presentation and resolution, while
  deeper custody and bargaining mechanics are not yet implemented.
- Player-created chapters, reusable human identities and matchmaking remain
  future architecture directions, not current features.

## Current Limitations

- **Multiplayer:** not implemented. Describe the current build as
  pseudo-multiplayer only.
- **AI agency depth:** reactive role activity is visible; deeper strategy is
  unproven. Show actions and reveal, but do not promise emergence.
- **English copy:** playable but less fully polished than Chinese. Demo in
  simplified Chinese.
- **Envelope mechanics:** the stake is readable, but custody depth is
  limited. Discuss this as a V3.1 improvement.
- **Report density:** the payoff is complete but can be information-heavy.
  Direct attention to truth and identity comparison first.

## Next Roadmap

1. Capture portfolio screenshots and a stable three-minute recording so the
   existing MVP is easy to evaluate.
2. Bring English entry and role copy to V3 parity for bilingual public
   presentation.
3. Prove or tune the three-AI/AI-substitute visible-activity gate to make the
   AI differentiation claim precise.
4. Deepen envelope custody, transfer, protection and leverage to strengthen
   the social contest.
5. Improve role-specific strategy and report hierarchy for replay value and
   demonstration clarity.
6. Evaluate bounded Qwen-driven expression or agency improvements without
   surrendering canon authority.

True multiplayer, matching, reusable human roles and player-authored
scenarios should remain later-stage interfaces until the current loop is
stronger and easier to demonstrate.

## Presenter Checklist

Before the demonstration:

- Use the simplified Chinese route and confirm the deployed build loads.
- Have a reliable role and resolution path ready for a short session.
- Keep audio optional and suitable for the interview setting.

During the demonstration:

- Explain the hidden-participant premise before discussing technology.
- Show at least one public response, one private or off-screen reaction and
  one visible street-state change.
- Pause on the identity guess screen to emphasize player judgment.
- End on the reveal report, including one mistaken or uncertain read when
  available.

After the demonstration:

- State the current limitations directly.
- Present V3.1 as strengthening proof, strategy depth and polish rather than
  pretending full multiplayer or limitless AI behavior is already shipped.

## Supporting Materials

- [README](../../README.md)
- [V3 MVP acceptance audit](./v3_mvp_acceptance_audit.md)
- [Experience direction](../00_product/experience_direction.md)
- [V3 narrative bible](../02_narrative/v3_narrative_bible.md)

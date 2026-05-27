# V3 MVP Acceptance Audit

## Audit Decision

**Build audited:** deployed `main` at merge commit `07c8c6c` after PRs #9
through #14.

**Verdict:** V3 now delivers the intended playable loop for a single-player
pseudo-multiplayer urban RP night session: hidden controller identities,
visible street reaction, autonomous role activity, pre-reveal player judgment
and post-game comparison. It is ready to be judged as a V3 MVP candidate, but
two acceptance claims need tightening before calling the whole gate
unqualifiedly passed: proving three AI or AI-substitute seats act in a
representative session, and strengthening the envelope beyond final
protection or reveal resolution.

It is **not yet portfolio-demo complete**. The largest remaining problem is
not another gameplay system: public-facing product framing and some
localization surfaces still describe or present the older V2 product.

## Target Fantasy Assessment

The target fantasy is:

> Enter a socially unstable night session under a role agenda, watch other
> participants change the street without waiting for you, judge who may be
> artificial before the reveal, and discover how your interpretation was
> shaped.

| Goal | Status | Summary |
| --- | --- | --- |
| Urban RP positioning | **Partial** | The game says V3; the README still sells V2. |
| Role selection fantasy | **Partial** | Chinese is authored V3; English is uneven. |
| First-session guidance | **Pass** | A new player receives optional first-step direction. |
| Street state readability | **Pass** | Four pressures are visible and update after action. |
| Autonomous role actions | **Partial** | Roles move, but the three-AI claim needs proof. |
| Identity guessing | **Pass** | Player judgment is collected before answers. |
| Post-game reveal | **Pass** | Truth, control type and misjudgment are revealed. |
| Replay motivation | **Partial** | Seeds and seats vary; routes remain similar. |
| AI hidden during play | **Pass** | Controller labels appear only after the session. |
| Beyond Galgame/chat | **Partial** | Social systems exist; dialogue remains prominent. |

### Assessment Evidence

- [LandingPage.tsx](../../src/pages/LandingPage.tsx) and the V3 narrative data
  establish the Chinese night-session premise.
- [README.md](../../README.md) still describes V2 and says the UI displays
  `LIVE AI RESPONSE`.
- [RoleSelectionPage.tsx](../../src/pages/RoleSelectionPage.tsx) uses V3 role
  copy for Chinese, while English falls back to older role fields.
- [BriefingPage.tsx](../../src/pages/BriefingPage.tsx),
  [ActionDesk.tsx](../../src/components/ActionDesk.tsx),
  [IntelBoard.tsx](../../src/components/IntelBoard.tsx) and
  [StatusCard.tsx](../../src/components/StatusCard.tsx) deliver opening
  guidance and readable empty states.
- [roleAgentEngine.ts](../../src/engine/roleAgentEngine.ts) creates public,
  private and off-screen activity after player actions.
- [IdentityGuessPage.tsx](../../src/pages/IdentityGuessPage.tsx) and
  [identityEvidenceEngine.ts](../../src/engine/identityEvidenceEngine.ts)
  collect guesses using visible observations only.
- [ReportPage.tsx](../../src/pages/ReportPage.tsx) performs report-only
  control-type disclosure and identity-result comparison.

## Non-negotiable Gate Review

| V3 Acceptance Gate | Status | Finding |
| --- | --- | --- |
| AI identity hidden during play | **Pass** | UI and tests keep answers report-only. |
| Three AI roles visibly act | **Partial** | Tests currently prove three non-player roles. |
| Four street meters inspectable | **Pass** | All render and change after actions. |
| Envelope socially contested | **Partial** | Social framing exists; rules remain shallow. |
| Report reveals misjudgments | **Pass** | Guess comparison and skip handling exist. |

## What The Current Build Now Delivers

The V3 loop is coherent:

1. The player enters a night-session premise with concealed participant
   types.
2. A selected social role supplies a private agenda and opening direction.
3. Public and private channels react as the player investigates, trades or
   pressures people.
4. Street state makes consequences legible beyond a single dialogue answer.
5. The player reaches a forced identity-guess checkpoint with observable
   behavior notes, but without answers.
6. The report reveals controller types, truth variant, role outcomes,
   misleading paths and the player's wrong reads.

This achieves the central V3 promise more convincingly than V2: the most
important AI moment is no longer an AI badge beside a reply; it is the
player's uncertainty about the other participants and the later reveal.

## Remaining Gaps

### P0: Public Product Packaging Contradicts V3

[README.md](../../README.md) still opens with V2 positioning and explicitly
states that the interface displays `LIVE AI RESPONSE`. That is no longer the
intended or shipped in-session experience. Anyone evaluating the repository
before launching the demo receives the wrong product story.

**Before the next feature:** update the README, demo script and delivery
language to V3 positioning and its hidden-participant payoff.

### P0: English Presentation Is Not Fully V3-authored

Several visible surfaces use V3 narrative content only in Chinese and revert
to pre-V3 role fields in English, including role selection and briefing.
The English experience communicates the mechanics, but it is not yet an
equivalent authored urban RP version.

**Before a bilingual portfolio demo:** provide reviewed V3 English
presentation data or explicitly label Chinese as the polished showcase
language.

### P1: AI Agency Is Readable, But Still Shallow

Autonomous activity makes the street feel occupied. However, most independent
behavior is selected from authored beats. The live expression path chiefly
enriches direct target response, not strategic role-to-role improvisation.

**Before claiming strong AI differentiation:** add bounded memory,
role-goal-driven choice variation or an evaluated Qwen/provider experiment
behind the existing deterministic authority boundary.

### P1: The Autonomous Gate Needs Precise Proof

The existing automated assertion requires three **non-player** participants
to act. The acceptance gate requires three **AI-controlled** roles. Since
the report distinguishes AI Agents, fixed NPCs and an AI-filled future-human
slot, testing and typical session pacing should be equally precise.

**Before stating the gate is fully passed:** add a representative-flow
assertion, or tune early event selection, so the visible acting set includes
three concealed AI or AI-substitute roles.

### P1: Role Leverage Needs More Mechanical Difference

Roles now feel distinct in presentation and objective, but the shared action
palette and common investigation route still dominate moment-to-moment play.

**Before adding more roles:** tune existing role-specific incentives,
resources and payoffs so a Keeper, Seeker and Investigator pursue visibly
different best moves in the same opening.

### P2: Report And Replay Need Presentation Tuning

The report now contains the right payoff, but it carries many panels:
truth, ending, six role reveals, misdirection, identity comparison, action
trail and missed clues. It is complete, but dense.

**Before public portfolio recording:** tune hierarchy for a quick screenshot
moment and verify mobile readability with longer action histories.

## Portfolio Demo Quality

| Dimension | Status | Finding |
| --- | --- | --- |
| Feature completeness | **Partial, close** | Core loop works; two claims need proof. |
| In-game coherence | **Chinese pass / English partial** | English presentation is uneven. |
| Repository first impression | **Fail** | README markets the retired V2 premise. |
| AI differentiation | **Partial** | Reveal works; deeper agency is unproven. |
| External demo recording | **Partial** | Correct packaging and report polish first. |

## V3.1 Priority Recommendation

Do not add matchmaking, player authoring, additional chapters or new
controller systems yet. V3.1 should strengthen credibility of what already
exists.

| Priority | Recommendation | Boundary |
| --- | --- | --- |
| 1 | Correct README and demo copy to V3. | Documentation only. |
| 2 | Complete or constrain English V3 presentation. | Copy/data display only. |
| 3 | Playtest roles and reveal comprehension. | Targeted polish only. |
| 4 | Prove or tune the three-AI-actor gate. | Existing events/tests only. |
| 5 | Improve role leverage, envelope depth and report hierarchy. | Existing loop only. |
| 6 | Evaluate bounded AI-agency enrichment. | Preserve rule authority. |

Priority 1 removes the public contradiction immediately. Priority 2 prevents
language switching from weakening the fantasy. Priorities 3 through 5
validate and strengthen the existing loop before any feature expansion.
Priority 6 should proceed only with measured evidence of added player value.

## Validation Evidence

The deployed `main` workflow for merge commit `07c8c6c` completed
successfully on May 27, 2026:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- Worker deployment dry-run
- `npm run build`
- `npm run test:e2e`
- GitHub Pages deployment

The latest automated test set covers:

- active-play non-disclosure of AI/controller types;
- street-state updates after player actions;
- autonomous activity from at least three non-player roles;
- completed identity guesses and truthful skip behavior;
- visible observation notes before guessing;
- first-session guidance, private empty state and early role response;
- desktop and mobile full-session completion.

## Final Recommendation

V3 is accepted as a coherent playable MVP candidate. It should not yet be
presented as fully closed against every V3 gate until the three-AI-actor
claim and contested-object depth are addressed or explicitly narrowed. The
next reviewed work should be corrective polish and acceptance tightening,
beginning with public positioning and language coherence, rather than
another expansion of feature scope.

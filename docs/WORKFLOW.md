# Delivery Workflow

V3.0 is delivered as staged, reviewable pull requests. Each PR must be small enough to inspect, revert and validate independently; it must not be merged automatically.

## Required PR Contents

Every V3 pull request includes:

1. Summary and why the stage exists.
2. Changed files and intentionally unchanged areas.
3. Risks and validation performed.
4. Screenshots when UI changes.
5. The next planned stage.

## Stages

1. Critical audit and small product-direction updates only.
2. Narrative bible and structured narrative/role contracts.
3. Street-state and social-state engines.
4. Autonomous hidden role-agent behavior and guarded expression provider.
5. Urban RP UI/copy conversion and in-session AI-label removal.
6. Post-game identity reveal, end-to-end validation and release readiness.

The V3 narrative source supplied by the project owner controls key story, character, message and ending text. Implementation may structure it for display and state handling, but may not casually overwrite its facts or turn it into a fixed mystery.

## Release Guardrails

- The owner reviews and merges each staged PR.
- No deployed behavior changes are included in the critical-audit PR.
- Later code PRs run lint, type checking, tests, production build and desktop/mobile browser coverage appropriate to their surface area.
- Real multiplayer, 3D sandbox mechanics, heavy-violence positioning, accounts, community/UGC publication and paywalls require separate approval.

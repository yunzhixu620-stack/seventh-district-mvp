# Delivery Workflow

V3.0 is delivered as staged, reviewable pull requests. Each PR must be small
enough to inspect, revert and validate independently. It must not be merged
automatically.

## Required PR Contents

Every V3 pull request includes:

1. Summary and why the stage exists.
2. Changed files and intentionally unchanged areas.
3. Risks and validation performed.
4. Screenshots when UI changes.
5. The next planned stage.

## Stages

1. Critical audit and small product-direction updates only.
2. Import the owner-provided narrative bible and create structured narrative
   and role contracts.
3. Add street-state and social-state engines.
4. Add autonomous hidden role-agent behavior and the guarded expression
   provider.
5. Convert to urban RP UI and copy, and remove in-session AI labels.
6. Add post-game identity reveal, end-to-end validation and release
   readiness.

## Narrative/Data PR Rule

The next narrative/data PR must import the owner-provided V3 narrative bible
as the source of truth before UI redesign work begins.

Implementation may structure the text for display and state handling, but it
must not casually rewrite key story text, character motives, truth variants,
pivotal messages or endings.

## Release Guardrails

- The owner reviews and merges each staged PR.
- No deployed behavior changes are included in the critical-audit PR.
- Later code PRs run lint, type checking, tests, production build and
  desktop/mobile browser coverage appropriate to their surface area.
- True multiplayer, a three-dimensional sandbox, heavy-violence positioning,
  accounts, community publication and paywalls require separate approval.

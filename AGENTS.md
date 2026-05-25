# Development Rules

## Product North Star

Build a replayable urban social-roleplay deduction game, not a chat demo or fixed-answer mystery. Canon truth, role goals, secrets, resources, and endings remain structured data.

## Architecture Rules

- Put game types in `src/types`, authored content in `src/data`, rule logic in `src/engine`, providers in `src/providers`, and state orchestration in `src/store`.
- Components consume content and state; they do not contain episode canon.
- Every role slot supports both future AI control and future human control policies.
- Free text must become a rule-rulable action before it changes the world.
- A dialogue provider can phrase allowed information but cannot invent or alter canon.

## Experience Rules

- Maintain Chinese and English player-facing content through localization data.
- Borrow interaction principles from reference games, never their copyrighted copy, visuals, or sound.
- Keep V1 low violence, fully local, single-player pseudo-multiplayer, and suited to a short web demo.

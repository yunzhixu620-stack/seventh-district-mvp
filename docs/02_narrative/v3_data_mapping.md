# V3 Narrative Data Mapping

## Source Of Truth

The owner-provided narrative bible is imported with only non-semantic Markdown
cleanup and without narrative rewrites at
[v3_narrative_bible.md](./v3_narrative_bible.md). It is the controlling
source for the Linxia Envelope story, role motives, variable truth versions,
pivotal messages, action feedback and endings.

Structured data may arrange this material for the application, but it must not
casually change the meaning of key text. New dialogue that changes story facts
requires owner review.

## Stage 2 Scope

This stage creates narrative data contracts only. It does not connect the new
content to the visible interface or change the playable V2 session.

- Home and opening text: `src/data/narrative/v3/homeCopy.ts`
- Chapter setup and variable truths: `src/data/narrative/v3/episode001.ts`
- Role cards and motivations: `src/data/narrative/v3/roles.ts`
- Locations: `src/data/narrative/v3/locations.ts`
- Envelope, clues and red herrings: `src/data/narrative/v3/clues.ts`
- Public messages: `src/data/narrative/v3/publicMessages.ts`
- Private messages: `src/data/narrative/v3/privateMessages.ts`
- Autonomous role beats: `src/data/narrative/v3/autonomousActions.ts`
- Actions: `src/data/narrative/v3/actionFeedback.ts`
- Street-state language: `src/data/narrative/v3/streetStateCopy.ts`
- Endings: `src/data/narrative/v3/endings.ts`
- Report revelation: `src/data/narrative/v3/postGameReveal.ts`
- Extra NPC hook: `src/data/narrative/v3/extraNpc.ts`

## Derived State Copy

The narrative bible supplies text for street heat, administrator attention and
evidence risk. The V3 acceptance gate additionally requires public opinion to
be inspectable. `publicOpinion` labels are therefore marked as derived
interface copy, not as newly authored story facts.

## Runtime Boundary

These modules are deliberately not wired into the current UI or rule engine in
this PR. Later reviewed stages may connect them only while preserving these
requirements:

- AI control types stay hidden during play.
- At least three autonomous role agents act in a session.
- The envelope remains contested and variable, not a fixed puzzle answer.
- The post-game report exposes control types and player misjudgments.

## Character Hygiene Check

Run the repository scan before submitting narrative or data changes:

```bash
npm run check:hidden-unicode
```

The scan checks tracked project files for bidirectional and invisible Unicode
control characters that can cause misleading diffs or GitHub warnings.

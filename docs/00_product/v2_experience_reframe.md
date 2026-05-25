# Version 2.0 Experience Reframe

## Diagnosis

Version 1 proved the structured-truth engine, but its incident-board UI reads like work software. Players see functions before desire: they do not first meet the people, feel the rain-soaked scene, or understand why speaking differently matters.

Version 2 keeps the engine layers and changes the fantasy:

**A pixel-noir interactive drama where every character is visibly present, and an AI actor must answer whatever identity performance the player attempts without being allowed to rewrite the hidden truth.**

## Reference Lessons

| Reference | Lesson used in V2 | Implementation boundary |
| --- | --- | --- |
| [WebGAL](https://github.com/OpenWebGAL/WebGAL) | Visual-novel staging puts scene, character and dialogue ahead of tool panels. | Original pixel scenes and components; no engine or asset copying. |
| [Monogatari](https://github.com/Monogatari/Monogatari) | Web narrative interaction should be responsive and media-forward. | Retain React architecture while adopting stage/dialogue pacing. |
| [Shattered Pixel Dungeon](https://github.com/00-Evan/shattered-pixel-dungeon) | A strong pixel identity makes low-fidelity assets feel like a game world. | Original pixel-noir palette and silhouettes; no borrowed sprites. |
| Social-deduction baseline from V1 | Motives and asymmetric knowledge must stay mechanically legible. | Case notebook remains available as an optional overlay, not the default mood. |

## Player Flow

1. **Cold open CG:** rain, kiosk glow, one sealed envelope; a short playable premise and the AI promise.
2. **Meet the cast:** all six incident participants appear before role selection, with public relation and reason for suspicion. Three can be inhabited in V2; three remain AI-played.
3. **Private briefing:** the chosen role receives a secret objective and first private memory.
4. **Stage conversation:** player chooses a visible character portrait, chooses a tactic or types any line, previews mechanical risk, then hears that character improvise a response.
5. **Notebook reveal:** evidence and public/private logs slide out when needed and flash when new information arrives.
6. **Final accusation/protection and replay:** structured truth explains why the AI characters behaved as they did.

## Why AI Is Not Replaceable

- The player is no longer clicking a fixed action and receiving a fixed line: they may phrase accusations, lies, reassurance or coded bargains in their own words.
- Each role is an AI actor constrained by a motive, permitted memories, current pressure and only the clues that rules have released. It can evade or manipulate without inventing canon.
- A live performance card makes the AI contribution visible: model status, target mood, subtext and spoken response appear after each committed social move.
- The fun loop is experimental: try a persona, read a reaction, adjust trust, then test whether the relationship helped uncover a safe ending.

## V2 Boundaries

- Structured truth, resource costs, clue release and final results remain in the existing engine.
- AI only performs dialogue/body-language/subtext from a server-side allowed context.
- The initial published AI actor is Cloudflare Workers AI `@cf/zai-org/glm-4.7-flash`, selected for fast multilingual dialogue support.
- No human matchmaking or authoring is implemented in V2; contracts are reserved in the roadmap document.

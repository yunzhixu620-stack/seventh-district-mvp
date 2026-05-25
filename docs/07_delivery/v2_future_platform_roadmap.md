# Future Platform Roadmap

The data/engine/provider split stays stable while participation expands.

| Release | Capability | Reserved interface |
| --- | --- | --- |
| 2.0 | Pixel-noir AI actor demo; one player and AI role slots. | `DialogueProvider`, `PerformanceRequest`, `RoleController`. |
| 2.1 | Richer chapters, relationship memory and session export. | `EpisodeTemplate`, `MemoryEvent`, `ReplayReport`. |
| 2.1 | Optional Qwen actor-provider comparison when API credentials are supplied. | `PerformanceRequest`, `ActorPerformance`, provider adapter. |
| 3.0 | Invited human substitutes for selected AI roles in private rooms. | `RoleController = ai | human`, `RoomSeat`, event-log synchronization. |
| 3.1 | Matchmaking and reconnectable sessions. | `MatchTicket`, `Lobby`, authoritative server session store. |
| 4.0 | Reusable human role identities and reputation/fantasy loadouts. | `PlayerRoleProfile`, moderation-ready presentation traits. |
| 4.1 | Player-authored scenario drafts and creation camp. | `EpisodeDraft`, canon validator, safety/moderation review pipeline. |

## Required Principles

- Human players replace AI at role-slot boundaries rather than rewriting episode logic.
- Player-authored stories must be validated into canonical data before play begins.
- Real-time multiplayer and UGC require backend identity, moderation and persistence; they are not hidden inside the V2 frontend.

The linked ChatGPT conversation supplied for planning required authentication when inspected on May 25, 2026, so this roadmap reflects the feature directions stated directly in the project feedback.

# V2 Live Actor Architecture

## Request Boundary

The frontend commits an action through the existing deterministic engine first. It then sends a safe performance request to the AI Worker:

- player role public identity;
- chosen target public identity, posture and social role;
- player utterance and normalized action type;
- scene location, exposure band and round;
- only newly released or already known clues.

The request does **not** send undiscovered truth, unreleased clues, ideal ending targets or hidden role fields.

## Response Contract

The Worker returns:

- `line`: what the chosen character says now;
- `gesture`: a short visual-performance description;
- `subtext`: the player's impression, not a new fact;
- `mood`: one of `guarded`, `shaken`, `warm`, `defiant`, `calculating`;
- `model`: model identifier displayed to prove the live actor path.

The model is instructed to avoid factual revelation unless that fact appears in allowed evidence. A local authored fallback remains available during network failure but is visibly labelled as fallback.

The provider boundary is model-agnostic: a later Alibaba Cloud Qwen adapter can implement the same `PerformanceRequest` / `ActorPerformance` contract without changing the truth engine or game UI.

## Hosting

- Frontend remains on GitHub Pages.
- LLM endpoint runs as a Cloudflare Worker with an `AI` binding. Cloudflare bindings authorize server-side inference without placing an API token in browser JavaScript.
- Published endpoint: `https://seventh-district-actor.yunzhixu620.workers.dev/perform`.
- Production CORS permits only the GitHub Pages origin; development permits local Vite/preview origins.

Sources checked May 25, 2026:

- [Cloudflare Worker bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/)
- [Cloudflare GLM-4.7-Flash model documentation](https://developers.cloudflare.com/workers-ai/models/glm-4.7-flash/)
- [Cloudflare structured JSON output](https://developers.cloudflare.com/workers-ai/features/json-mode/)

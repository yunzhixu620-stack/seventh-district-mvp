# Local Agent Architecture

- **World state:** deterministic session truth, resources, risk, learned facts, messages, and action history.
- **Role agent:** chooses authored public or private reactions according to goal, round, exposure, and known facts.
- **Ruling engine:** validates target and cost, changes state, awards clues, and determines endings.
- **Director engine:** introduces timed public events and keeps the session moving.
- **Narrator / provider:** a local template provider phrases legal reactions; no network or generative API.
- **Consistency guard:** rejects clues or messages a role cannot reveal and verifies report facts against active truth.

Canon facts and truth variants are data. A future AI provider may enrich phrasing only after passing the same guard.

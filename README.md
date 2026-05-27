# 第七街区：真人测试 / Seventh District: Real Test

[在线体验 / Play Online](https://yunzhixu620-stack.github.io/seventh-district-mvp/)

**V3：都市 RP 真人测试夜局。** 林夏失联后，一封没有人承认持有的信
在街区里成为争夺、保护、交易与误导的焦点。你以一个有私心的角色
入场，在局中观察其他参与者如何行动，并在结算前判断他们究竟是
真人位、AI Agent、固定 NPC，还是系统代理。

**V3: an urban social-roleplay night session with hidden participants.**
After Linxia disappears, enter under a private agenda, change what the
street believes, and guess which participants were artificial only before
the post-game reveal.

## 核心体验 / Core Experience

- **选择身份。** 六个在场席位拥有不同公开形象、私人目标与失败风险；
  当前至少三个角色可由玩家进入。
- **影响街区。** 询问、试探、伪装、交易、跟踪、保护与揭示会改变
  街区热度、管理员关注、证据风险与公共舆论。
- **面对主动行动的角色。** 玩家行动后，其他席位可能发布公共消息、
  私下接触、移动、散播说法或触发管理员干预。
- **判断谁在扮演。** 终局揭晓前，身份竞猜页基于本局实际观察记录
  提供判断依据，但不提前公开真实控制类型。
- **在局后获得 payoff。** 复盘报告揭示本局真相、角色控制类型、
  目标成败、误导来源，以及你的判断正确或误判在哪里。
- **新手可进入。** 首局简报与前两步行动有可选引导，帮助理解目标
  与下一步，而不会替玩家执行决定。

## 这不是 AI 标签演示 / AI Boundary

AI 的价值不以局中标签展示。当前体验有意隐藏控制类型，让玩家先
通过发言、行动和局势变化形成判断，随后在报告中看到答案。

- 游戏真相、线索合法性、状态变化与结局由确定性规则引擎拥有。
- 角色表达服务可以润色合法回应，但不能改写真相或偷看未揭示信息。
- 局中不展示 `AI Generated`、模型名称或控制类型作为玩法答案。
- 当前仍是单人伪多人体验，不是真实在线匹配。

## 演示流程 / How To Demo

建议用简体中文体验目前润色最完整的路径：

1. 打开在线体验，从雨夜首页进入，观察六名在场者。
2. 选择 `外来调查者`，阅读私人目标与入场建议。
3. 进入现场后，查看街区状态、公共频道和私信空状态。
4. 使用建议动作或自由输入对一个对象开口，观察角色回应与其他席位
   的独立动向。
5. 至少取得两条线索后，提交 `保护` 或 `公开揭示` 的终局判断。
6. 在身份竞猜页根据观察笔记标记其他席位。
7. 在复盘报告中查看真相、控制类型、误判来源与重玩提示。

**Interview demo focus:** show the transition from observable social
behavior to a player guess, then to the report-only controller reveal. This
is the part that distinguishes the project from a plain chat or visual novel.

## 当前 MVP 状态 / Current MVP Status

| Area | Status | Summary |
| --- | --- | --- |
| Urban RP entry | Implemented | Hidden-participant premise is live. |
| Roles and briefing | Implemented | Chinese is the showcase path. |
| Street and role events | Implemented | Four pressures and channel activity. |
| Guess and reveal | Implemented | Judgment precedes answers. |
| Opening guidance | Implemented | Optional hints and empty states. |
| English presentation | Partial | Playable, less fully authored. |
| Three-AI proof | Partial | Non-player activity proven only. |
| Envelope depth | Partial | Social contest, shallow rules. |

Current partial items are deliberate limitations rather than advertised
features: English is not yet equally polished; the test suite does not claim
three AI-controlled seats act in a representative session; and envelope
transfer or suppression mechanics can be deeper.

Detailed acceptance findings are recorded in
[docs/07_delivery/v3_mvp_acceptance_audit.md](docs/07_delivery/v3_mvp_acceptance_audit.md).

## Known Limitations / 已知限制

- The current release is a single-player pseudo-multiplayer demo; it does
  not include real human matchmaking, accounts or reconnectable rooms.
- AI-controlled participant behavior is legible and reactive, but does not
  yet prove deep emergent social strategy or long-term memory.
- English copy remains less complete than the Chinese showcase route.
- The reveal report is information-rich and still needs hierarchy polish for
  the cleanest portfolio screenshot on small screens.
- Player-authored chapters and reusable human role identities are reserved
  for later architecture stages, not implemented features.

## Visual Reference / Screenshots

The live Pages build is the current visual reference:

- [Open the playable demo](https://yunzhixu620-stack.github.io/seventh-district-mvp/)

Recommended portfolio screenshots to capture from the live build:

1. Rain-night landing screen showing hidden-participant positioning.
2. Role selection screen with six seats and the chosen role fantasy.
3. In-session board showing street state and public/private activity.
4. Identity guess screen with observed-behavior notes.
5. Post-game report showing controller reveal and misjudgment comparison.

## 技术边界 / Architecture

- `src/data/narrative/v3` contains the structured V3 narrative modules derived
  from the owner-provided narrative bible.
- `src/engine` owns seed selection, rule-parsed actions, state changes,
  autonomous role beats, identity evidence derivation and replay reports.
- `src/providers/liveActorProvider.ts` supplies constrained character
  expression after rules have resolved an accepted action.
- `worker/src/index.js` hosts the current live expression endpoint and receives
  only permitted public/session context and already released evidence.
- `src/types/future.ts` reserves later room, matchmaking and authoring
  boundaries without claiming they exist in the current build.

Published expression endpoint:
`https://seventh-district-actor.yunzhixu620.workers.dev/perform`

## 验证 / Validation

```bash
npm install
npm run check:hidden-unicode
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

GitHub Actions executes validation before GitHub Pages deployment. Product
direction, narrative source rules, QA records and future roadmap are in
[`docs/`](docs/).

## 参考边界 / Reference Boundary

V3 studies social deduction, roleplay tension and readable consequence design
from products documented in the benchmark materials, while retaining original
art, code and narrative implementation. It does not copy competitor assets or
present future multiplayer and authoring plans as shipped functionality.

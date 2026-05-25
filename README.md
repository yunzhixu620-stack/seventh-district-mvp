# 第七街区：真人测试 / Seventh District: Real Test

[在线体验 / Play Online](https://yunzhixu620-stack.github.io/seventh-district-mvp/)

一局约 5 分钟的双语都市社会推理 MVP。交通网络短暂中断后，林夏失联，一封密封信在街区流转。玩家扮演具有私密目标的身份，通过询问、试探、伪装、交换、跟踪、揭示与保护，判断谁在保护她，谁在借机取得不该知道的信息。

A bilingual five-minute urban social-deduction MVP. After Linxia goes silent during a transit outage, the player inhabits a motivated role and decides what should happen to one sealed envelope through interpretable, rule-resolved actions.

## Playable Features / 可玩特性

- 三个玩家可选角色、六个可扩展角色槽；每个角色拥有独立动机与胜负条件。
- 四个由 seed 决定的结构化真相变体，同一场景可产生不同正确选择。
- 推荐按钮与自由输入共享裁定引擎：玩家先看到意图解析和风险预览，再确认改变局势。
- 公共频道、私密信息、线索板、风险与资源同时呈现，避免退化为聊天界面。
- 结局回放展示真相、行动轨迹、遗漏线索和角色结果。
- 简体中文 / English 实时切换，以及用户主动开启的原创程序化环境声与反馈音。

## Demo Flow / 演示流程

1. 进入终端，选择 `调查者 / Investigator`，保留默认种子。
2. 进入现场后，向 `何岚 / Keeper` 执行 `试探 / Probe`，确认第一条可核验证据。
3. 将目标切换到 `赵静 / Protector`，在自由输入中写下试探意图并确认解析结果。
4. 打开线索面板查看两条证据，依据本局信息选择 `保护 / Protect` 或 `揭示 / Reveal`。
5. 在复盘报告中查看本局真相，换种子或换角色重玩。

## Architecture / 架构

- `src/data`: bilingual authored roles, actions, locations, messages, and four Linxia truth variants.
- `src/engine`: deterministic seed selection, intent parser, ruling, pacing, role simulation, consistency guard, and replay generation.
- `src/providers`: local dialogue provider boundary for future constrained AI phrasing; V1 makes no LLM request.
- `src/store` and `src/components`: session orchestration and a situation-board interface that consumes structured data.

Canon truth is never created by dialogue. The active variant is fixed at session creation, and the consistency guard permits only clues authored for that truth.

## Local Validation / 本地验证

```bash
npm install
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run dev
```

GitHub Actions repeats type checking, unit/UI tests, production building, and desktop/mobile Chromium full-session tests before deploying `main` to GitHub Pages.

## Design References / 设计参照

The project learns interaction principles without reproducing proprietary content or assets:

- [Retail Mage](https://store.steampowered.com/app/3224380/Retail_Mage/): expressive intent resolved into visible consequences.
- [Suck Up!](https://store.steampowered.com/app/2726370/Suck_Up/): identity performance and exposure pressure.
- [Dead Meat](https://store.steampowered.com/app/2628740/Dead_Meat/): open interrogation constrained by authored responses.
- [Blood on the Clocktower](https://www.bloodontheclocktower.com/): motivated roles, asymmetric information, and revealing post-game review.

Detailed implementation decisions appear in [`docs/00_product/reference_benchmark.md`](docs/00_product/reference_benchmark.md).

## V1 Boundaries / 当前边界

Single-player pseudo-multiplayer only. There is no real LLM integration, online multiplayer, account persistence, voice input, 3D world, combat system, or user-created episode editor. Audio is generated in the browser at runtime; no external media asset is redistributed.

# 第七街区：真人测试 / Seventh District: Real Test

[在线体验 / Play Online](https://yunzhixu620-stack.github.io/seventh-district-mvp/)

**2.0: 像素雨夜 AI 推理互动剧。** 林夏失联后，一封没人承认持有的信在街区流转。你先看见今晚到场的六个人，再选择自己的秘密身份，面对任意角色说出质问、试探、谎言或交换条件。

**V2: a pixel-noir AI deduction drama.** After Linxia disappears, meet the six people in the rain, inhabit a hidden role, and speak freely to characters who improvise their replies live.

## 2.0 亮点 / Highlights

- 原创像素雨夜场景、角色头像和视觉小说式对话舞台，替代 V1 的工作台观感。
- 开场即展示全部六名人物、公开身份与可扮演状态；行动对象通过场景中的人物头像直接选择。
- 玩家可自由输入话术；Cloudflare Workers AI 的实时演员根据对象、压力和已获得证据即兴回应，并在界面标示 `LIVE AI RESPONSE`。
- 真相、线索释放、风险和结局仍由确定性规则引擎裁定；AI 能表演欺骗或动摇，但不能新增事实或偷看未揭示真相。
- 行动之后明确展示暴露变化、资源消耗与 `NEW EVIDENCE`，同时保留公共频道、私信、口袋笔记和复盘报告。
- 简体中文 / English 切换、响应式布局、静音优先声音设置与键盘操作支持。

## 演示流程 / Demo Flow

1. 从雨夜开场进入，浏览六名在场人物，选择 `调查者 / Investigator`。
2. 进入场景后点击任意人物头像，选择 `试探 / Probe` 或输入自己的质问。
3. 确认风险预览，观察 AI 对话、动作暗示、风险变化与高亮新证据。
4. 根据线索选择 `保护 / Protect` 或 `揭示 / Reveal`，在复盘中核对本局真相和遗漏路径。

## 技术边界 / Architecture

- `src/data`：双语角色、事件、地点、线索与四个 truth variants。
- `src/engine`：seed、动作解析、裁定、导演节奏、一致性保护与复盘；这里拥有事实权威。
- `src/providers/liveActorProvider.ts`：调用公开演示用 AI 演员端点，失败时明确显示 authored fallback。
- `worker/src/index.js`：Cloudflare Workers AI 后端，只接收公开身份、玩家说法、现场状态与已获证据；使用严格 JSON 响应约束。
- `src/types/future.ts`：为后续真人替换 AI、房间匹配与玩家编剧草案预留接口。

Live actor endpoint: `https://seventh-district-actor.yunzhixu620.workers.dev/perform`

## 验证 / Validation

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

GitHub Actions 在 Pages 发布前重复执行检查，并预检 AI Worker 构建。产品、AI 边界、推理文案借鉴与未来排期详见 `docs/`。

## 参考边界 / Reference Boundary

2.0 借鉴 WebGAL、Monogatari 与 Shattered Pixel Dungeon 的舞台化和像素辨识度原则，以及 The Case of the Golden Idol、Return of the Obra Dinn、Dead Meat 与 Blood on the Clocktower 的推理可读性和社会张力原则。所有画面、文案、角色和代码资产均为本项目原创实现，不复制竞品内容。

## 当前范围 / Current Scope

2.0 为单人伪多人公开 demo，接入实时 LLM 角色表演；尚不包含真人匹配、账户持久化、玩家自编章节发布、语音输入、3D 或战斗。后续接口与版本节奏记录于 `docs/07_delivery/v2_future_platform_roadmap.md`。

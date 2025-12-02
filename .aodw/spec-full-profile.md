# Spec-Full Profile Specification  
（完整规格驱动开发流程）

Spec-Full Profile 用于处理复杂或高风险的变更，包括：

- 新功能；
- 涉及多个模块的大范围改动；
- 涉及数据模型变更；
- 涉及外部 API / 协议变更；
- 涉及性能 / 安全 / 合规性的重要特性；
- 大规模重构。

---

## 1. 文件结构

在 `RT/RT-XXX/` 目录下，Spec-Full 使用：

```text
RT/RT-XXX/
  spec.md         ← 完整需求说明
  plan.md         ← 技术实现方案
  data-model.md   ← 实体与关系
  contracts/      ← API / 消息 / 数据契约
  research.md     ← 调研与决策记录（如需要）
  tasks.md        ← 按 User Story 和 Phase 拆分的实现任务
  checklists/     ← 质量检查清单
  impact.md       ← 影响分析
  invariants.md   ← 不可破坏行为 / 边界
  tests.md        ← 测试点
  changelog.md    ← 行为变更总结
```

---

## 2. Spec 阶段：spec.md

`spec.md` 由 AI 根据用户描述和澄清问题自动生成，典型结构：

```markdown
# Spec: RT-XXX - <feature name>

## 1. 背景与动机（Background & Motivation）
- 为什么需要这个特性 / 改动？

## 2. 目标与非目标（Goals / Non-goals）
- 明确列出本 RT 的目标范围；
- 明确哪些是本次不处理的内容。

## 3. 用户故事 / 用例（User Stories）
- 角色、目标、场景；
- 主路径与备选路径。

## 4. 功能需求（Functional Requirements）
- 用编号列出可验证的需求。

## 5. 非功能需求（Non-functional Requirements）
- 性能、可用性、可靠性、安全性等。

## 6. 假设与依赖（Assumptions & Dependencies）
- 对外部系统 / 团队 / 前置条件的假设。

## 7. 成功标准（Success Criteria）
- 如何判断本 RT 成功完成。

## 8. 澄清记录（Clarifications）
- Question / Answer 列表（来自 AI 主动提问与用户回答）。
```

Spec 阶段可以融入类似原 Speckit 的 `/speckit.specify` 行为。

---

## 3. Clarification

AI 应对模糊或高影响问题提出有限数量（通常≤5）的澄清问题：

- 每个问题带选项与推荐答案；
- 用户选择后，将问答记录到 `spec.md` 的 Clarifications 部分；
- 同时更新相关需求段落，使 spec 不再依赖上下文对话。

---

## 4. Plan 阶段：plan.md / research.md / data-model.md / contracts/

### 4.1 plan.md

`plan.md` 描述“如何实现”：

```markdown
# Plan: RT-XXX - <feature name>

## 1. 技术背景
- 当前系统相关部分的技术状况。

## 2. 方案概览
- 整体思路与关键设计决策。

## 3. 组件与模块变更
- 哪些模块会被修改 / 新增 / 删除。

## 4. 数据流与控制流
- 请求如何在系统内部流转。

## 5. 风险与缓解策略
- 潜在问题及对应的缓解方案。

## 6. 分阶段计划
- 如果需要分多个阶段实现，说明每阶段目标。
```

### 4.2 research.md（可选）

若需要对比多种实现方案、技术栈或第三方服务，可在 `research.md` 中记录：

- 备选方案；
- 评估维度（性能、成本、复杂度等）；
- 最终选择与理由。

### 4.3 data-model.md

记录本 RT 相关的实体 / 关系 / 字段变更：

- 新增实体；
- 字段语义变更；
- 关系调整。

### 4.4 contracts/

记录对外契约：

- REST / GraphQL / gRPC API；
- 消息格式、事件结构；
- 文件格式等。

---

## 5. tasks.md 和 checklists/

### 5.1 tasks.md

以严格的 checklist 格式列出实现步骤：

```markdown
- [ ] T001 [US1] 在后端添加 X 实体的存储逻辑（apps/api/src/...）
- [ ] T002 [US1] 为 X 实体添加 API 路由（apps/api/src/...）
- [ ] T003 [US1] 在前端页面展示 X 列表（apps/web/src/...）
```

- 可以使用 [P] 标记可并行的任务；
- 任务应按 Phase 编组，使每一阶段都能形成可验证的增量成果。

### 5.2 checklists/

为不同维度的质量提供“English 单元测试”式的 checklist，例如：

- requirements.md：需求是否完整、清晰、一致；
- design.md：方案是否符合架构原则，是否可扩展；
- security.md：安全要求是否明确、是否有相应对策；
- performance.md：性能目标是否量化、是否有测量方案。

AI 在实现前应尽量确保 checklist 通过，或在失败项上记录原因。

---

## 6. impact / invariants / tests / changelog

即使是 Spec-Full，仍需与 Spec-Lite 一样维护这几个文件：

- `impact.md`：在实现前，对影响面进行全面分析；
- `invariants.md`：列出在本次变更中必须保持不变的行为与结构；
- `tests.md`：列出测试点与测试覆盖范围；
- `changelog.md`：总结本 RT 对系统行为带来的变化，便于后续回溯。

---

## 7. 与 RT-Manager / Git Discipline 的关系

- RT-Manager 负责启动 Spec-Full Profile，并为其创建 RT 目录与分支；
- Spec-Full 完成后通过 Git Discipline 进行合并、打 tag、更新状态；
- 在整个过程结束后，AI 与用户应能：

  - 从 `spec.md` + `plan.md` + `tasks.md` + `changelog.md` 理解本 RT 的前因后果；
  - 从 Git 历史与 tag 中定位具体实现提交。

---

## 8. 从 Spec-Lite 升级到 Spec-Full

如果在 Spec-Lite 执行中发现：

- 涉及数据模型变动；
- 涉及对外 API 变动；
- 与 invariants 无法同时满足；

则 AI 应建议将本 RT 升级为 Spec-Full：

1. 补充完整的 `spec.md` 与 `plan.md`；
2. 将已有的 `spec-lite` / `plan-lite` 内容迁移或引用到新的文档；
3. 对数据模型和 contracts 进行补充；
4. 对 tasks 和 checklists 进行补足。

升级过程应在 `changelog.md` 中明确记录。

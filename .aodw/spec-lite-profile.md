# Spec-Lite Profile Specification  
（原 TPCW 第二 / 三阶段的 AODW 化精简版）

Spec-Lite Profile 用于处理小范围变更，例如：

- bug 修复；
- 单个模块的小改进；
- 简单的 UI 或交互调整；
- 不涉及数据结构与 API 契约变更的工作。

Spec-Lite 保持与 Spec-Full 类似的文档结构，但采用更精简的模板和流程。

---

## 1. 文件结构

在 `RT/RT-XXX/` 目录下，Spec-Lite 将使用以下文件：

```text
RT/RT-XXX/
  spec-lite.md     ← 需求与场景描述（精简版 spec）
  plan-lite.md     ← 技术方案（精简版 plan）
  impact.md        ← 影响分析
  invariants.md    ← 不可破坏行为 / 边界
  tests.md         ← 测试点列表
  changelog.md     ← 本次改动对系统行为的总结
```

这些文件由 AI 主导创建与维护。

---

## 2. 流程概览

1. RT-Manager 完成 Intake 与 Profile 决策（Spec-Lite）；
  
2. **创建并切换到 feature 分支**（强制步骤）
   - 生成分支名：`feature/RT-{seq}-{short-name}`
   - 执行：`git checkout -b feature/RT-XXX-xxx`
   - 验证：`git branch` 显示 `* feature/RT-XXX-xxx`
   - **在此步骤完成前，严禁修改任何代码**
  
3. AI 基于 Intake 信息与现有代码结构，自动生成初版：
   - `spec-lite.md`
   - `plan-lite.md`
  
4. 在修改代码前，AI 必须生成或更新：
   - `impact.md`
   - `invariants.md`
  
5. **在 feature 分支上**实现代码修改
   - **开始修改前再次验证**：`git status` 确认在正确的分支上
   - 如果不在 feature 分支，立即停止并切换到正确分支
  
6. 实现完成后，AI 必须更新：
   - `tests.md`
   - `changelog.md`
  
7. 最后通过 Git Discipline 完成合并与收尾。

**分支管理强制要求**：
- 所有代码修改必须在 feature 分支上进行
- 严禁在 master/main 分支直接修改代码
- 在开始修改代码前必须验证当前分支

---

## 3. spec-lite.md 模板

推荐模板结构如下：

```markdown
# Spec-Lite: RT-XXX - <short title>

## 1. 背景（Context）
- 当前存在的问题 / 需求：
- 触发端（用户操作 / 定时任务 / API 调用 等）：

## 2. 目标（Goal）
- 本次改动希望达到的效果（用户视角 / 业务视角）：

## 3. 当前行为（Current Behavior）
- 当前系统在相关场景下的行为说明：

## 4. 期望行为（Desired Behavior）
- 修改后在相同场景下的预期行为：
- 与当前行为的差异（如有）：

## 5. 影响范围（Scope）
- 涉及的模块 / 文件 / API：
- 预期不应受影响的模块 / 功能：
```

AI 在生成 spec-lite 时，应尽量使用清晰且业务友好的描述。

---

## 4. plan-lite.md 模板

推荐结构：

```markdown
# Plan-Lite: RT-XXX - <short title>

## 1. 修改点（Change Points）
- 计划修改的模块 / 文件路径：
  - e.g. apps/api/src/orders/order_service.ts
  - e.g. apps/web/src/features/orders/OrderList.tsx

## 2. 方案描述（Solution Outline）
- 简要描述计划采取的技术方案：
  - 调整哪一层的逻辑（Controller / Service / Repository / UI 等）
  - 是否引入新函数 / 新类 / 新组件
  - 是否删除 / 废弃某些路径

## 3. 风险与注意事项（Risks & Caveats）
- 潜在的边界情况：
- 与其他模块的隐含耦合：
- 需要特别关注的回归场景：
```

---

## 5. impact.md 模板

推荐结构：

```markdown
# Impact Analysis: RT-XXX - <short title>

## 1. 问题触发点（Trigger）
- 用户或系统如何触发问题：
- 典型复现步骤（如已知）：

## 2. 直接影响（Direct Impact）
- 受影响的模块 / 文件：
- 受影响的具体行为：

## 3. 间接影响（Indirect Impact）
- 依赖本模块的上游 / 下游：
- 可能受影响的其他功能：

## 4. 风险评估（Risk Evaluation）
- 数据损坏风险：
- 安全风险：
- 性能风险：
- 用户体验风险：
```

AI 在开始修改代码前，必须填充或更新本文件。

---

## 6. invariants.md 模板

推荐结构：

```markdown
# Invariants: RT-XXX - <short title>

> 本文件列出在本次改动中必须保持不变的行为与约束。

## 1. 业务行为 Invariants
- 不改变的业务规则：
- 不改变的用户流程：

## 2. 接口 Invariants
- 不改变的 API 路径：
- 不改变的请求 / 响应格式：
- 不改变的错误码语义：

## 3. 技术结构 Invariants
- 不允许绕过的中间层：
- 不允许使用的捷径（例如直接访问某些内部接口）：
```

如果在方案设计过程中发现无法同时满足 invariants 与需求，AI 应提示用户考虑：

- 升级为 Spec-Full；
- 或通过新的 RT 对 invariants 本身进行修正。

---

## 7. tests.md 模板

推荐结构：

```markdown
# Tests: RT-XXX - <short title>

## 1. 新增测试用例（New Tests）
- [ ] 用例 1 描述（对应文件路径）
- [ ] 用例 2 描述（对应文件路径）

## 2. 回归测试（Regression）
- [ ] 回归用例 1（原始功能点描述）
- [ ] 回归用例 2

## 3. 手动验证建议（Manual Checks）
- [ ] 手动步骤 1
- [ ] 手动步骤 2
```

AI 负责在实现前后补全这些内容，并在适当情况下生成实际测试代码。

---

## 8. changelog.md 模板

推荐结构：

```markdown
# Changelog: RT-XXX - <short title>

## 1. 变更摘要（Summary）
- 概述本次改动对系统行为带来的变化：

## 2. 用户可感知变化（User-visible Changes）
- UI / 文案 / 流程上的变化：

## 3. 不可见但重要的变化（Non-visible but Important）
- 内部逻辑的重构：
- 性能改善：
- 错误处理方式的调整：

## 4. 与其他 RT / 模块的关系
- 本 RT 依赖的其他 RT：
- 将来可能需要跟进的 RT：
```

完成后，changelog.md 可作为未来调试或审计的重要参考。

---

## 9. 与 Git Discipline 的关系

Spec-Lite 的完成阶段应始终由统一的 Git Discipline 规则约束：

- 在 feature 分支上完成所有工作；
- 提交信息包含 `Refs: RT-XXX`；
- 合并前确保 tests.md 中关键测试已执行；
- 合并后打标签、清理分支；
- RT 状态更新为 `done`。

Spec-Lite 应尽量保持流程轻量，但不牺牲可追踪性和可回滚性。

# ID, Branch & Directory Rules for AODW

本文件定义在 AODW 下的统一命名和组织规则。

---

## 1. RT-ID（Request Ticket ID）

- 格式：`RT-{seq}`；
- `{seq}` 可以为零填充数字（推荐至少 3 位，如 `RT-001`、`RT-023`）；
- RT-ID 必须全局唯一；
- 用途：
  - 文件与目录命名；
  - Git 分支命名的一部分；
  - 提交信息 Refs；
  - Tag 名的一部分；
  - 外部系统（如 issue tracker）中的关联标识。

---

## 2. 目录结构

顶层与 RT 相关的目录：

```text
/RT/
  RT-001/
  RT-002/
  RT-003/
  ...
```

每个 `RT-XXX` 目录下至少包含：

- `intake.md`
- `decision.md`

并根据 Profile（Spec-Full / Spec-Lite）补充其他文件。

示例（Spec-Lite）：

```text
RT/RT-010/
  intake.md
  decision.md
  spec-lite.md
  plan-lite.md
  impact.md
  invariants.md
  tests.md
  changelog.md
```

示例（Spec-Full）：

```text
RT/RT-025/
  intake.md
  decision.md
  spec.md
  plan.md
  data-model.md
  contracts/
  research.md
  tasks.md
  checklists/
  impact.md
  invariants.md
  tests.md
  changelog.md
  docs/                    # 过程文档目录（可选）
    dependency-strategy.md
    technical-research.md
    design-decisions.md
    ...
```

**过程文档目录（`docs/`）**：

在 RT 执行过程中，可能会产生额外的过程文档，用于记录：
- 策略分析（如依赖安装策略、架构选型等）
- 技术调研（如技术方案对比、性能分析等）
- 设计决策（如设计模式选择、接口设计等）
- 问题诊断（如问题根因分析、日志分析等）
- 修复总结（如修复方案总结、验证结果等）
- 其他过程性文档

这些文档应统一存放在 `RT/RT-XXX/docs/` 目录下，与核心文档（`intake.md`、`spec.md` 等）区分开来，便于管理和查找。

**过程文档命名规范**：
- 使用小写字母和连字符：`dependency-installation-strategy.md`
- 描述性命名，清晰表达文档内容
- 避免使用序号前缀（与核心文档区分）

---

## 3. Git 操作规范

关于分支命名、提交信息格式、标签规范等详细规则，请参阅：

👉 **[.aodw/git-discipline.md](./git-discipline.md)**

所有 AODW 流程中的 Git 操作必须严格遵守该文件定义。

---

## 6. 其他可能的命名结构

如果需要与外部系统（如 JIRA / GitHub Issues）集成，可：

- 在 RT-ID 中加前缀映射（例如 `JIRA-123` 映射到某个 `RT-XXX`）；
- 或在 `intake.md` 中注明外部 ID，例如：

```markdown
External IDs:
- JIRA: PROJECT-123
- GitHub Issue: #456
```

命名与目录设计应始终以 **易查找、易追踪、对 AI 友好** 为目标。

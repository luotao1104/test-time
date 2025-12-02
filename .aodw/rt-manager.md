# RT-Manager Specification  
统一请求票编排器（Request Ticket Manager）

RT-Manager 是 AODW 的 Orchestration Layer 核心组件，负责：

- RT 编号管理；
- 立项（Intake）流程；
- Full / Lite（Spec-Full / Spec-Lite）流程分流；
- RT 目录和分支的创建与约束；
- 全局状态机更新。

本文件定义 RT-Manager 的行为规范与文件结构。

---

## 1. RT-ID 命名规则

- 格式：`RT-{seq}`，其中 `{seq}` 为零填充或按团队约定（例如 3 位：`RT-001`）。
- RT-ID 全局唯一，用作：
  - 目录名：`/RT/RT-XXX/`
  - 分支名的一部分：`feature/RT-XXX-short-name`
  - 提交信息中的 Refs 标识：`Refs: RT-XXX`
  - 标签名的一部分：`done-RT-XXX`

---

## 2. 目录与分支创建

当用户提出新需求或问题时：

1. RT-Manager 为其分配新的 RT-ID；
2. 创建对应目录：

```text
/RT/RT-XXX/
  meta.yaml
  intake.md
  decision.md
  docs/                    # 过程文档目录（可选，按需创建）
  (其他文件由后续流程按需创建)
```

**目录结构说明**：
- **核心文档**：位于 RT 目录根目录，包括 `intake.md`、`decision.md`、`spec.md`、`plan.md` 等标准文档
- **过程文档目录**：`docs/` 子目录用于存放执行过程中产生的分析、调研、决策等过程文档


3. 生成 feature 分支名建议，例如：

```text
feature/RT-XXX-{short-name}
```

其中 `{short-name}` 为 2–4 个词组成的短英文标识（例如 `user-auth-bugfix`）。

AI 应：

- 建议一个 `{short-name}`（简短、描述性，使用小写和连字符）；
- 解释命名含义；
- 根据 Profile 创建分支：
  - **Spec-Lite**：自动创建并切换到分支（用户可在后续调整）
  - **Spec-Full**：建议分支名，等待用户确认后创建
- 创建分支后，必须立即切换到该分支
- 验证当前分支：执行 `git branch`，应显示 `* feature/RT-XXX-xxx`

**强制要求**：在进入 `in-progress` 状态前，必须确保已在正确的 feature 分支上。

---

## 3. 状态机

RT 的状态机定义如下：

```text
created → intaking → decided → in-progress → reviewing → done
```

- `created`：刚创建 RT-ID，尚未进行 Intake。
- `intaking`：AI 与用户进行互动提问，补充立项信息。
- `decided`：Spec-Full / Spec-Lite 决策已完成，**feature 分支已创建且已切换**，基础文件已创建。
  - 检查点：
    - ✅ feature 分支存在：`git branch` 列表中有 `feature/RT-XXX-xxx`
    - ✅ 已切换到该分支：`git branch` 显示 `* feature/RT-XXX-xxx`
    - ✅ 基础文档已创建：spec/spec-lite.md, plan/plan-lite.md 等
- `in-progress`：正在实现（包括 Spec 编写、Plan 制定、代码修改等）。
- `reviewing`：实现完成，正在进行代码与文档审查与测试验证。
- `done`：本 RT 正式完成（分支合并 / tag 打上 / 文档更新完毕）。

RT 状态可以记录在：

- 一个集中式索引文件（例如 `RT/index.yaml`），或
- 每个 `RT-XXX` 目录中的元数据文件（如 `meta.yaml`）。

具体实现可根据项目需要定制。

---

## 3.1 状态转换检查点

为确保 AODW 流程的严格执行，在关键状态转换时，AI 必须进行以下检查：

### decided → in-progress

在从 `decided` 进入 `in-progress` 状态前，AI 必须验证以下条件：

1.  **强制分支创建 (Creation Node)**
    - **操作**：必须执行 `git checkout -b feature/RT-XXX-{short-name}`。
    - **验证**：`git branch` 显示 `* feature/RT-XXX-xxx`。

2.  **基础文档已准备**
    - Spec-Lite：spec-lite.md, plan-lite.md
    - Spec-Full：spec.md, plan.md

3.  **计划确认节点 (Plan Confirmation Node)**
    - **触发时机**：Plan 文档编写完成后。
    - **行为**：AI 必须暂停，展示 Plan 的摘要，并询问：“计划已就绪，是否批准执行？”
    - **禁止**：严禁在未获批准前直接开始修改代码。

### 持续分支检查 (Continuous Branch Check)

**规则**：在每一次 `Execution` (写代码) 动作之前，AI 必须执行以下逻辑检查当前分支：

```bash
current_branch=$(git branch --show-current)
if [[ "$current_branch" == "master" || "$current_branch" == "main" ]]; then
    # 自动补救：如果发现还在主分支，立即切回或创建任务分支
    # 注意：此处假设 RT-ID 已知
    git checkout -b feature/RT-XXX-{short-name} || git checkout feature/RT-XXX-{short-name}
fi
```

**严禁**：在 `master` / `main` 分支上直接调用 `write_to_file` 或 `replace_file_content` 修改业务代码（仅允许修改 meta.yaml 或 index.yaml 等管理文件）。

### 提交前确认节点 (Pre-Commit Node)

- **触发时机**：代码修改完成，准备 Git Commit 前。
- **行为**：AI 必须展示 `git status` 和关键 `diff`，询问：“修改已完成，是否提交？”
- **禁止**：严禁在未获用户确认前直接 Commit。

**严格禁止**：在 master/main 分支上直接修改代码。所有代码修改必须在 feature 分支上进行。

---

## 4. Intake（立项）流程

当用户提出自然语言需求时，RT-Manager：

1. 解析需求初步类型：
   - Feature / Bug / Enhancement / Refactor / Research / Other；
2. 提出若干澄清问题，每个问题：
   - 提供 2–5 个选项；
   - 对某个选项给出“推荐理由”，用户可直接接受推荐；
   - 允许短自定义答案（≤ 5 词）；
3. 在 `intake.md` 中记录：
   - 原始描述；
   - 问题与答案摘要；
   - 需求类型、范围、风险等级、影响模块估计。

Intake 完成后，将 RT 状态从 `intakeing` 更新为 `decided`（在流程决策完成后）。

---

## 5. Spec-Full vs Spec-Lite 决策

RT-Manager 根据 Intake 信息进行初步判断：

- 应使用 **Spec-Full** 的典型情况：
  - 影响数据模型；
  - 影响对外 API 或协议；
  - 跨多个子系统或模块；
  - 对性能、安全、合规有显著影响；
  - 大规模重构或新功能。

- 应使用 **Spec-Lite** 的典型情况：
  - 单模块 bug 修复；
  - 小幅度行为调整或 UI 改进；
  - 不改变数据结构或对外接口；
  - 风险低，可快速回滚。

RT-Manager 应：

1. 在 `decision.md` 中记录：
   - AI 的判断与理由；
   - 推荐使用的 Profile（Full / Lite）；
   - 提供备选（如用户强制 Full / Lite 的选项）；
2. 询问用户确认：
   - 用户可选择“使用推荐方案”或显式切换；
3. 决策确认后：
   - 创建 Spec-Full 或 Spec-Lite 所需的基础文件；
   - 创建 feature 分支（或建议用户执行相应命令）。

---

## 6. 与 Execution Layer 的协作

一旦 Profile 决定：

- Spec-Full：
  - 由 Spec-Full 流程接手（见 `spec-full-profile.md`）；
- Spec-Lite：
  - 由 Spec-Lite 流程接手（见 `spec-lite-profile.md`）。

RT-Manager 持续负责：

- 更新 RT 状态；
- 确保 Execution Layer 在正确的 RT 目录和分支下操作；
- 在 Execution 完成后，触发 Git Discipline 完成流程。

---

## 7. 与 Knowledge Layer 的协作

RT-Manager 负责确保：

- 每个 RT 至少有：
  - `intake.md`
  - `decision.md`
- 在流水线结束时，Knowledge Layer 完整：
  - `spec` / `spec-lite`
  - `plan` / `plan-lite`
  - `impact`
  - `invariants`
  - `tests`
  - `changelog`

当 RT-Manager 发现某 RT 的文档不完整时，应提示用户或调用 AI 补全。

---
---

## 8. RT 元数据与全局索引（meta.yaml & RT/index.yaml）

为便于 AI 与人类快速了解所有 RT 的状态与分布，AODW 定义了两层元数据：

1. 每个 RT 自身的元数据文件：`RT/RT-XXX/meta.yaml`
2. 全局 RT 索引文件：`RT/index.yaml`

### 8.1 meta.yaml：单个 RT 的权威来源

- 路径：`RT/RT-XXX/meta.yaml`
- 格式：参考 `.aodw/templates/rt-meta-template.yaml`
- 内容包括：
  - id / title / type / profile / status
  - modules / tool / owner
  - created_at / updated_at / closed_at
  - external_ids / notes

规则：**meta.yaml 是本 RT 的权威来源（single source of truth）。**  
任何关于状态、类型、模块范围等的变更，都必须首先更新 meta.yaml。

### 8.2 index.yaml：全局缩影视图

- 路径：`RT/index.yaml`
- 初始结构：

```yaml
version: 1
last_updated_at: null
items: []
```

- `items` 为数组，每个元素为某个 RT 的摘要信息，字段是 meta.yaml 的子集：
  - id, title, type, profile, status, modules, owner, tool, created_at, closed_at

规则：**index.yaml 是基于各 RT meta.yaml 构建的汇总视图。**  
如 meta.yaml 与 index.yaml 不一致，以 meta.yaml 为准，AI 应尝试用 meta.yaml 修正 index.yaml。

### 8.3 RT-Manager 在不同阶段的职责补充

RT 创建时：

1. 生成 RT-ID（RT-XXX）；
2. 创建目录 `RT/RT-XXX/`；
3. 复制 `.aodw/templates/rt-meta-template.yaml` 为 `RT/RT-XXX/meta.yaml`：
   - 填写：
     - id
     - title（从 intake 中提炼）
     - type（初步判断结果）
     - profile（在 Full / Lite 决策后填写）
     - status = `created`
     - created_at / updated_at（必须使用系统命令或 API 获取真实时间，见第 9 节）
4. 在 `RT/index.yaml` 的 `items` 中新增一条记录，内容与 meta.yaml 对应；
5. 更新 `RT/index.yaml.last_updated_at`（必须使用系统命令或 API 获取真实时间，见第 9 节）。

RT 状态或基本属性变化时（例如：decided → in-progress → reviewing → done）：

1. 更新 `RT/RT-XXX/meta.yaml` 中的：
   - status
   - updated_at（必须使用系统命令或 API 获取真实时间，见第 9 节）
   - 如完成则写入 closed_at（必须使用系统命令或 API 获取真实时间，见第 9 节）
2. 在 `RT/index.yaml.items` 中找到 id = RT-XXX 的条目，并同步修改：
   - status / owner / modules / tool / created_at / closed_at 等必要字段；
3. 更新 `RT/index.yaml.last_updated_at`（必须使用系统命令或 API 获取真实时间，见第 9 节）。

从 Spec-Lite 升级为 Spec-Full 时：

1. 在 `meta.yaml` 中将 `profile` 从 `Spec-Lite` 改为 `Spec-Full`；
2. 在 `RT/index.yaml.items` 中同步修改该 RT 的 profile；
3. 在本 RT 的 `changelog.md` 中记录本次 Profile 变更。

RT-Manager 和所有执行 AODW 的 AI 工具，在处理任何 RT 时，  
应优先读取 `meta.yaml` 来确定当前 RT 的基础信息。

---

### 2. 在 `ai-knowledge-rules.md` 末尾新增一节：**“8. RT 元数据与索引维护规则”**

在 `ai-knowledge-rules.md` 最后追加：

```markdown
---

## 8. RT 元数据与索引维护规则

本节定义 AI 在维护 `RT/RT-XXX/meta.yaml` 与 `RT/index.yaml` 时必须遵守的规则。

### 8.1 元数据优先级

- `RT/RT-XXX/meta.yaml` 是某个 RT 的权威来源；
- `RT/index.yaml` 是基于各 meta.yaml 的全局汇总；
- 如二者不一致，以 `meta.yaml` 为准，AI 应尝试用 meta.yaml 修正 index.yaml。

### 8.2 何时更新 meta.yaml？

在以下情况下，AI 必须更新 `RT/RT-XXX/meta.yaml`：

- RT 创建时（初始化 id/title/type/status/profile 等）；
- RT 类型（type）发生变化时；
- RT Profile（Spec-Full / Spec-Lite）发生变化时；
- RT 状态（status）发生变化时；
- RT 涉及的模块列表（modules）发生变化时；
- 主要执行工具（tool）发生变化时（例如从 cursor 切换为 claude）；
- 负责人（owner）变更时；
- RT 结束时（写入 closed_at）。

### 8.3 何时更新 index.yaml？

在以下情况下，AI 必须更新 `RT/index.yaml`：

- 新建 RT 时：在 `items` 数组中追加一个条目；
- 任何 RT 的 meta.yaml 发生上述变更时：同步修改 index.yaml 中对应条目；
- 定期或在完成多个 RT 后，可执行一次全量“从 meta.yaml 重建 index.yaml”的操作，以保证一致性。

更新时必须：

1. 在 `items` 中用 `id` 匹配对应 RT 条目；
2. 将需要暴露在索引中的字段（id / title / type / profile / status / modules / owner / tool / created_at / closed_at）更新为与 meta.yaml 一致；
3. 将 `last_updated_at` 更新为当前时间（必须使用系统命令或 API 获取真实时间，见第 9 节）。

### 8.4 一致性检查

在 RT 进入 `done` 状态前，AI 应执行一次快速检查：

- `RT/RT-XXX/meta.yaml` 是否存在且字段合理；
- `RT/index.yaml.items` 中是否存在 id = RT-XXX 的条目；
- index 条目中的 status / profile / type / modules / owner / created_at / closed_at 是否与 meta.yaml 一致。

如发现不一致：

- 首先以 meta.yaml 为准修正 index.yaml；
- 如 meta.yaml 本身明显错误（例如 created_at 在未来），应提示用户并请求确认后修正。

---

## 9. 时间字段获取规则（强制要求）

⚠️ **重要**：所有时间字段必须使用系统真实时间，严禁 AI 自行推断或使用假时间。

### 9.1 适用范围

以下时间字段必须遵循本规则：
- `meta.yaml` 中的 `created_at`, `updated_at`, `closed_at`
- `RT/index.yaml` 中的 `created_at`, `closed_at`, `last_updated_at`
- `AODW_Governance/version.md` 中的 `updated_at` 和 changelog 中的 `date`

### 9.2 获取方法

在创建或更新 RT 时，必须通过以下方式之一获取当前时间：

**命令行方式**（推荐）：
```bash
# Unix/Linux/macOS
date -u +"%Y-%m-%dT%H:%M:%SZ"  # UTC 时间
date +"%Y-%m-%dT%H:%M:%S%z"    # 本地时间带时区

# Windows PowerShell
Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
```

**编程方式**：
- Node.js: `new Date().toISOString()`
- Python: `datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')` 或 `datetime.now().astimezone().isoformat()`

### 9.3 时间格式

- 格式：ISO8601 格式
- 示例：`2025-11-28T11:54:45Z` (UTC) 或 `2025-11-28T19:54:45+08:00` (带时区)

### 9.4 禁止行为

❌ 禁止使用 AI 训练数据中的时间  
❌ 禁止使用对话上下文中的时间  
❌ 禁止自行推断或猜测时间  
❌ 禁止使用固定的示例时间  
❌ 禁止使用 `2024-01-01T00:00:00Z` 等占位符时间

### 9.5 执行要求

- 在 RT 创建时，必须通过系统命令或 API 获取 `created_at` 和 `updated_at`
- 在 RT 状态更新时，必须通过系统命令或 API 获取 `updated_at`
- 在 RT 完成时，必须通过系统命令或 API 获取 `closed_at`
- 在更新 `RT/index.yaml` 时，必须通过系统命令或 API 获取 `last_updated_at`

AI 在执行这些操作时，应：
1. 先执行系统命令或调用 API 获取当前时间
2. 将获取到的时间值写入相应字段
3. 不得跳过时间获取步骤，直接写入时间值

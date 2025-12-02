# AI Knowledge Maintenance Rules  
AI 必须确保文档始终与代码一致。

本文件定义“何时更新哪些文档”，以及文档与代码之间的映射方式。

---

## 1. 总原则

1. 文档是系统的一等公民，必须与代码一起演化；
2. 任何重要改动都必须在相关文档中有所体现；
3. AI 在执行任何非琐碎修改后，应主动检查并更新相关文档；
4. 如果文档与代码不一致，AI 应优先尝试修正不一致，而不是忽略。

---

## 2. 文档类别

### 2.1 全局文档（Global）

位于 `.aodw/` 或 `docs/` 下，用于整个系统：

- `.aodw/aodw-constitution.md`  
- `.aodw/ai-overview.md`  
- `.aodw/ai-coding-rules.md`  
- `.aodw/ai-knowledge-rules.md`  
- 模块 README（如 `docs/modules/users.md`、`docs/modules/orders.md` 等）  
- 数据与合约文档（如 `data-model.md`、`contracts/*.md` / `contracts/*.yaml`）

**当发生以下情况时，AI 必须更新相关全局文档：**

- 整体架构变化（例如引入新子系统、拆分服务、替换核心中间件）；
- 模块职责变化（例如将一部分业务从 A 模块迁移到 B 模块）；
- 数据模型变化（增加 / 删除 / 修改实体或字段含义）；
- 对外接口或协议变化（API、消息格式等）；
- AODW 流程规则本身发生修改。

---

### 2.2 RT 专属文档（Local per RT）

每个 RT 都有自己的知识库目录，包括核心文档和过程文档：

**核心文档（Core Documents）**：
位于 RT 目录根目录，是 RT 生命周期的标准文档：

```text
/RT/RT-001/
  meta.yaml              # RT 元数据
  intake.md              # 立项文档
  decision.md             # 决策文档
  spec.md 或 spec-lite.md # 需求规范
  plan.md 或 plan-lite.md # 技术方案
  impact.md              # 影响分析
  invariants.md          # 不可破坏原则
  tests.md               # 测试文档
  changelog.md           # 变更日志
```

**过程文档（Process Documents）**：
位于 `RT/RT-XXX/docs/` 目录，记录执行过程中的分析、调研、决策：

```text
/RT/RT-001/
  docs/                              # 过程文档目录
    dependency-installation-strategy.md  # 策略分析文档
    technical-research.md            # 技术调研文档
    design-decisions.md              # 设计决策文档
    diagnosis.md                     # 问题诊断文档
    fixes-summary.md                 # 修复总结文档
    ...                              # 其他过程性文档
```

**核心文档**记录了本 RT 的全生命周期信息：
- 立项时的需求与背景（intake）；
- 选择 Spec-Full / Spec-Lite 的理由（decision）；
- 需求与设计细节（spec / plan）；
- 影响分析与不可破坏行为（impact / invariants）；
- 测试点（tests）；
- 最终行为改变总结（changelog）。

**过程文档**记录了执行过程中的详细分析、调研和决策：
- 策略分析文档：如依赖安装策略、架构选型等
- 技术调研文档：如技术方案对比、性能分析等
- 设计决策文档：如设计模式选择、接口设计等
- 问题诊断文档：如问题根因分析、日志分析等
- 修复总结文档：如修复方案总结、验证结果等
- 其他过程性文档

**过程文档管理原则**：
- 过程文档应统一存放在 `RT/RT-XXX/docs/` 目录下
- 过程文档命名使用小写字母和连字符，描述性命名
- 避免在项目根目录的 `docs/` 下创建与 RT 相关的过程文档
- 如果过程文档对多个 RT 有参考价值，可以考虑：
  - 在相关 RT 的 `docs/` 目录下各存一份
  - 或在全局 `docs/` 目录下创建，并在相关 RT 的文档中引用

---

## 3. 何时更新哪些文档

### 3.1 Intake 阶段后

在 RT-Manager 完成本 RT 的 Intake（立项）后：

- 必须创建 / 更新：
  - `RT/RT-XXX/intake.md`
  - `RT/RT-XXX/decision.md`

`intake.md` 应包含：

- 原始用户描述；
- AI 提出的问题与用户回答的简要记录；
- 对需求 / 问题的归类（Feature / Bug / Enhancement / Refactor / Research 等）；
- 初步范围与风险评估。

`decision.md` 应包含：

- 为何选择 Spec-Full 或 Spec-Lite；
- 若存在备选流程（如纯 Research），记录为何未采用；
- 如用户强行指定流程，记录 AI 的原始建议与用户的选择。

---

### 3.2 Spec 阶段后（Spec-Full / Spec-Lite）

**Spec-Full：**

- AI 必须创建 / 更新：
  - `RT/RT-XXX/spec.md`
  - `RT/RT-XXX/clarifications`（可在 spec 中以章节形式存在）

Spec 内容应包括：

- 背景与目标；
- 用户故事 / 功能需求；
- 非功能需求（性能、安全、可用性等）；
- 成功标准；
- 需要澄清的历史问题记录（Q&A）。

**Spec-Lite：**

- AI 必须创建 / 更新：
  - `RT/RT-XXX/spec-lite.md`

Spec-Lite 内容应精简，至少包含：

- 当前问题描述；
- 目标行为（修复后 / 改进后的预期效果）；
- 影响范围的文字说明。

---

### 3.3 Plan 阶段后

**Spec-Full：**

- AI 必须创建 / 更新：
  - `RT/RT-XXX/plan.md`
  - `RT/RT-XXX/data-model.md`（如涉及数据模型变更）
  - `RT/RT-XXX/contracts/`（如涉及对外接口变更）
  - `RT/RT-XXX/research.md`（如有前期调研与决策）

**Spec-Lite：**

- AI 必须创建 / 更新：
  - `RT/RT-XXX/plan-lite.md`

Plan-Lite 内容应包含：

- 预期修改的代码位置（文件路径 / 模块）；
- 简单的技术方案；
- 潜在风险与注意事项。

---

### 3.4 修改代码前

在实现前，AI 必须创建 / 更新：

- `RT/RT-XXX/impact.md`  
  - 当前问题是如何触发的；
  - 哪些模块 / 功能直接受到影响；
  - 哪些模块可能被间接影响；
- `RT/RT-XXX/invariants.md`  
  - 在本次改动中必须保持不变的行为；
  - 不允许被破坏的数据与接口约束。

这些文档是 **变更的约束条件**。如之后发现方案与 invariants 冲突，AI 应向用户明确指出，并建议走 Spec-Full 或修订 invariants。

---

### 3.5 修改代码后

在实现完成后，AI 必须：

1. **更新 tests.md**

   - 列出新增的测试用例及其覆盖的场景；
   - 列出建议回归的关键用例；
   - 如存在未自动化但应进行手动验证的场景，也应列出。

2. **更新 changelog.md**

   - 以简洁的方式概述本次 RT 对系统行为的改动；
   - 如有潜在影响范围（例如“可能对历史数据产生影响”），加以说明；
   - 标注与其他 RT 或模块的依赖关系。

3. 如涉及数据模型或对外接口更改，必须更新：

   - `data-model.md`；
   - `contracts/` 中的相关说明；
   - 相关模块 README；
   - 必要时更新 `ai-overview.md`（例如新增了新的核心模块）。

---

## 4. 文档与代码的映射（Frontmatter Mapping）

为了帮助 AI 找到与某段代码相关的文档，建议在文档顶部使用 Frontmatter：

```yaml
---
rt: RT-001
related_files:
  - apps/api/src/orders/**
  - apps/api/src/orders/order_service.ts
  - apps/web/src/features/orders/**
---
```

或在模块 README 中：

```yaml
---
module: orders
files:
  - apps/api/src/orders/**
  - apps/web/src/features/orders/**
---
```

AI 在进行修改时，必须执行 **Mapping Check**：

1.  **查索引**：读取 `.aodw/modules-index.yaml`，获取所有模块的 `root` 路径。
2.  **匹配路径**：检查本次修改的文件路径是否落在某个模块的 `root` 下。
3.  **定位文档**：如果匹配，读取对应的 `path`（即模块 README）。
4.  **验证 Frontmatter**：进一步检查模块 README 中的 `files` 字段是否包含该文件。
5.  **更新文档**：确认匹配后，必须审查该文档，并将本次 RT 的变更同步更新进去。

**如果找不到匹配的模块**：
- 考虑是否需要创建一个新模块？
- 或者该文件属于公共基础设施（需更新全局文档）？

---

## 5. 文档一致性检查

在 RT 实现流程的最后（合并 / 完成之前），AI 应进行一次快速一致性检查：

**核心文档检查**：
- 当前改动是否改变了数据模型？如果是，`data-model.md` 是否反映了这一点？
- 当前改动是否改变了对外接口？如果是，`contracts/` 是否已更新？
- 当前改动是否改变了模块职责？如果是，相关 README 是否已更新？
- 当前 RT 的：
  - `spec` / `spec-lite`
  - `plan` / `plan-lite`
  - `impact`
  - `invariants`
  - `tests`
  - `changelog`

  是否完整地记录了从"问题 → 方案 → 实现 → 测试 → 结果"的过程？

**目录结构检查**：
- 检查 RT 目录根目录下是否有过程文档（非核心文档的 `.md` 文件，如 `CODE_REVIEW.md`、`TIME_COMMAND_VERIFICATION.md` 等）
- 如果有过程文档在根目录，应：
  1. 检查是否存在 `docs/` 目录，如果不存在则创建
  2. 将过程文档移动到 `docs/` 目录
  3. 按照命名规范重命名（使用小写字母和连字符，如 `code-review.md`）
  4. 在 `changelog.md` 中记录此次调整
- 检查过程文档命名是否符合规范（小写字母和连字符，避免使用序号前缀）
- 核心文档列表（不应在 `docs/` 目录下）：
  - `meta.yaml`
  - `intake.md`
  - `decision.md`
  - `spec.md` / `spec-lite.md`
  - `plan.md` / `plan-lite.md`
  - `impact.md`
  - `invariants.md`
  - `tests.md`
  - `changelog.md`

如发现明显不一致，AI 应主动修订文档或提示用户。

---

## 6. 版本控制与标签

所有文档都应纳入 Git 版本控制。

当一个 RT 完成时，推荐在：

- 代码分支合并后打上 tag（例如 `done-RT-XXX`）；
- 在 RT 的 `changelog.md` 中记录最终状态；
- 如果本次 RT 涉及 AODW 制度本身的更新（例如修改了 `aodw-constitution.md`），应特别标注。

---

## 7. 过程文档管理规则

### 7.1 过程文档的定义

过程文档是指在 RT 执行过程中产生的、用于记录分析、调研、决策等过程的文档，包括但不限于：

**技术性过程文档**：
- 策略分析文档（如依赖安装策略、架构选型等）
- 技术调研文档（如技术方案对比、性能分析等）
- 设计决策文档（如设计模式选择、接口设计等）
- 问题诊断文档（如问题根因分析、日志分析等）
- 修复总结文档（如修复方案总结、验证结果等）

**管理性/流程性过程文档**：
- 代码审查报告（如 `code-review.md`）
- 验证测试报告（如 `verification-report.md`、`time-command-verification.md`）
- 完成总结报告（如 `completion-report.md`、`final-summary.md`）
- 提交信息建议（如 `commit-message.md`）
- 状态跟踪文档（如 `final-status.md`、`status-tracking.md`）
- 根因分析文档（如 `root-cause-analysis.md`）
- 改进方案文档（如 `improvement-plan.md`）
- 其他执行过程中的辅助文档

**重要**：所有过程文档必须存放在 `RT/RT-XXX/docs/` 目录下，不能与核心文档混放在根目录。

### 7.2 过程文档的存储位置

**必须遵守**：所有与 RT 相关的过程文档应统一存放在 `RT/RT-XXX/docs/` 目录下。

**禁止**：
- ❌ 在项目根目录的 `docs/` 下创建与 RT 相关的过程文档
- ❌ 将过程文档与核心文档混放在 RT 目录根目录（除非是核心文档的一部分）

**允许**：
- ✅ 在 `RT/RT-XXX/docs/` 目录下创建过程文档
- ✅ 如果过程文档对多个 RT 有参考价值，可以在相关 RT 的 `docs/` 目录下各存一份
- ✅ 或在全局 `docs/` 目录下创建通用文档，并在相关 RT 的文档中引用

### 7.3 过程文档的命名规范

- 使用小写字母和连字符：`dependency-installation-strategy.md`
- 描述性命名，清晰表达文档内容
- 避免使用序号前缀（与核心文档区分）
- 示例：
  - ✅ `dependency-installation-strategy.md`
  - ✅ `technical-research.md`
  - ✅ `design-decisions.md`
  - ❌ `001-dependency-strategy.md`（避免使用序号）

### 7.4 何时创建过程文档

AI 应在以下情况下创建过程文档：

- 进行策略分析时（如依赖安装策略、架构选型等）
- 进行技术调研时（如技术方案对比、性能分析等）
- 做出重要设计决策时（如设计模式选择、接口设计等）
- 进行问题诊断时（如问题根因分析、日志分析等）
- 完成修复总结时（如修复方案总结、验证结果等）

### 7.5 过程文档与核心文档的关系

- **核心文档**（如 `spec.md`、`plan.md`）是 RT 生命周期的标准文档，必须完整
- **过程文档**是对核心文档的补充和细化，提供更详细的分析和决策过程
- 过程文档可以引用核心文档，但不应替代核心文档
- 在 `changelog.md` 中可以引用相关的过程文档

---

## 8. 当信息缺失或不确定时

如果 AI 判断文档中存在以下情况：

- 信息缺失；
- 描述明显过时；
- 与代码行为明显矛盾；

则 AI 应：

1. 在当前 RT 中开辟一小节（可放在 `changelog.md` 或 `docs/` 目录下的单独文档中）记录发现的问题；
2. 尝试基于当前代码自动修正文档；
3. 在不确定时向用户提出明确问题，获取确认后再更新文档。

AI 不应在发现明显不一致时保持沉默。

---
---

## 9. RT 元数据与索引维护规则

本节定义 AI 在维护 `RT/RT-XXX/meta.yaml` 与 `RT/index.yaml` 时必须遵守的规则。

### 9.1 元数据优先级

- `RT/RT-XXX/meta.yaml` 是某个 RT 的权威来源；
- `RT/index.yaml` 是基于各 meta.yaml 的全局汇总；
- 如二者不一致，以 `meta.yaml` 为准，AI 应尝试用 meta.yaml 修正 index.yaml。

### 9.2 何时更新 meta.yaml？

在以下情况下，AI 必须更新 `RT/RT-XXX/meta.yaml`：

- RT 创建时（初始化 id/title/type/status/profile 等）；
- RT 类型（type）发生变化时；
- RT Profile（Spec-Full / Spec-Lite）发生变化时；
- RT 状态（status）发生变化时；
- RT 涉及的模块列表（modules）发生变化时；
- 主要执行工具（tool）发生变化时（例如从 cursor 切换为 claude）；
- 负责人（owner）变更时；
- RT 结束时（写入 closed_at）。

### 9.3 何时更新 index.yaml？

在以下情况下，AI 必须更新 `RT/index.yaml`：

- 新建 RT 时：在 `items` 数组中追加一个条目；
- 任何 RT 的 meta.yaml 发生上述变更时：同步修改 index.yaml 中对应条目；
- 定期或在完成多个 RT 后，可执行一次全量“从 meta.yaml 重建 index.yaml”的操作，以保证一致性。

更新时必须：

1. 在 `items` 中用 `id` 匹配对应 RT 条目；
2. 将需要暴露在索引中的字段（id / title / type / profile / status / modules / owner / tool / created_at / closed_at）更新为与 meta.yaml 一致；
3. 将 `last_updated_at` 更新为当前时间（必须使用系统命令或 API 获取真实时间，见 9.5 节）。

### 9.4 一致性检查

在 RT 进入 `done` 状态前，AI 应执行一次快速检查：

- `RT/RT-XXX/meta.yaml` 是否存在且字段合理；
- `RT/index.yaml.items` 中是否存在 id = RT-XXX 的条目；
- index 条目中的 status / profile / type / modules / owner / created_at / closed_at 是否与 meta.yaml 一致。

如发现不一致：

- 首先以 meta.yaml 为准修正 index.yaml；
- 如 meta.yaml 本身明显错误（例如 created_at 在未来），应提示用户并请求确认后修正。

---

## 9.5 时间字段获取规则（强制要求）

⚠️ **重要**：所有时间字段必须使用系统真实时间，严禁 AI 自行推断或使用假时间。

### 获取方法

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

### 时间格式

- 格式：ISO8601 格式
- 示例：`2025-11-28T11:54:45Z` (UTC) 或 `2025-11-28T19:54:45+08:00` (带时区)

### 禁止行为

❌ 禁止使用 AI 训练数据中的时间  
❌ 禁止使用对话上下文中的时间  
❌ 禁止自行推断或猜测时间  
❌ 禁止使用固定的示例时间  
❌ 禁止使用 `2024-01-01T00:00:00Z` 等占位符时间

### 执行要求

- 在 RT 创建时，必须通过系统命令或 API 获取 `created_at` 和 `updated_at`
- 在 RT 状态更新时，必须通过系统命令或 API 获取 `updated_at`
- 在 RT 完成时，必须通过系统命令或 API 获取 `closed_at`
- 在更新 `RT/index.yaml` 时，必须通过系统命令或 API 获取 `last_updated_at`

AI 在执行这些操作时，应：
1. 先执行系统命令或调用 API 获取当前时间
2. 将获取到的时间值写入相应字段
3. 不得跳过时间获取步骤，直接写入时间值

详细规则见：`.aodw/rt-manager.md` 第 9 节

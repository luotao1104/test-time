# AODW Constitution  
AI-Orchestrated Development Workflow (Version 2.0)

## 1. Purpose

AI-Orchestrated Development Workflow（AODW）定义了一种 **AI 主导、文档驱动、可回溯** 的软件开发范式。

目标：

- 由 AI 负责驱动需求 → 设计 → 实现 → 完成的全过程；
- 用户主要负责回答问题、提供信息、做关键选择与确认；
- 所有改动都有清晰的 RT 编号、文档记录与 Git 历史；
- 文档由 AI 持续维护，始终反映当前系统真实状态；
- 工作流对工具中立，可被 Cursor、Claude、Codeium 等多种 AI 工具共同遵守。

---

## 2. Core Architecture

AODW 由四层组成：

1. **Interaction Layer（交互层）**  
2. **Orchestration Layer（编排层 / RT-Manager）**  
3. **Execution Layer（执行层 / Spec-Full & Spec-Lite Profiles + Git Discipline）**  
4. **Knowledge Layer（知识层 / 文档体系）**

### 2.1 Interaction Layer（交互层）

- 用户以自然语言提出问题、需求或目标（Feature / Bug / Enhancement / Refactor / Research 等）。
- AI 必须主动：
  - 解析意图与类型；
  - 提出澄清问题，每个问题提供多个选项；
  - 为每个问题提供推荐选项与简短理由；
  - 在无明确用户指令时仍能自动推进流程。
- 用户只需：
  - 在选项中做选择（或提供简短自定义答案）；
  - 对关键决策进行确认或否决。

### 2.2 Orchestration Layer（RT-Manager）

RT-Manager 是 AODW 的“大脑”和总控：

- 负责统一的 **请求票编号（RT-ID）**：`RT-{seq}`，如 `RT-001`、`RT-042`；
- 负责统一的 **目录结构**：`/RT/RT-XXX/`；
- 负责统一的 **分支命名**：`feature/RT-XXX-short-name`；
- 执行 **Intake（立项）流程**：
  - 收集原始描述；
  - 通过交互澄清范围、风险、影响模块；
  - 记录立项信息到 `intake.md`；
- 做出 **流程分流决策**：
  - 决定当前 RT 使用 Spec-Full 还是 Spec-Lite profile；
  - 将决策记录在 `decision.md`；
- 初始化 RT 所需的基础文件与分支。

RT-Manager 管理统一状态机：

```text
created → intakeing → decided → in-progress → reviewing → done
```

### 2.3 Execution Layer（执行层）

Execution Layer 由三部分组成：

1. **Spec-Full Profile**：适用复杂功能 / 大改动 / 高风险改动；
2. **Spec-Lite Profile（原 TPCW 精简版）**：适用小范围变更 / bug 修复 / 小增强；
3. **Git Discipline（完成插件）**：统一的完成和收尾规则（参考 TPCW 完成阶段）。

#### 2.3.1 Spec-Full Profile

Spec-Full 涵盖完整规范驱动流程：

- clarification：最多若干高价值澄清问题；
- `spec.md`：用户故事 / 需求 / 成功标准；
- `plan.md`：技术方案、架构、依赖；
- `data-model.md`：实体、字段、关系；
- `contracts/`：API 合约、数据契约；
- `tasks.md`：分阶段、按 Story 组织的实现任务；
- `checklists/`：需求与设计质量检查清单；
- `implement`：按照 tasks 分阶段执行实现与验证。

适用条件（任一满足）：

- 改动涉及数据模型；
- 改动涉及对外 API / 协议；
- 改动跨多个模块 / 子系统；
- 改动影响性能 / 安全 / 合规；
- 改动风险高或不易回滚；
- 功能为新增特性或大规模重构。

#### 2.3.2 Spec-Lite Profile（原 TPCW 精简版）

Spec-Lite 是 Spec-Full 的裁剪版，用于轻量级改动：

- `spec-lite.md`：简化问题描述 / 目标 / 场景；
- `plan-lite.md`：简化技术方案；
- `impact.md`：影响分析；
- `invariants.md`：不可破坏行为 / 边界；
- `tests.md`：需要新增或更新的测试点；
- `changelog.md`：本次改动对系统行为的总结。

Spec-Lite 在实现阶段使用 **Git Discipline 插件** 完成收尾：

- 确保在正确的 feature 分支上；
- 提交前检查未提交变更；
- 确认测试通过；
- 按约定合并到主开发分支；
- 打标签、更新 Refs、清理分支。

适用条件（全部或部分满足）：

- 单模块或小范围改动；
- 主要是 bugfix / 小优化 / UI 或逻辑微调；
- 不改变数据结构或外部 API；
- 风险较低，可快速回退。

#### 2.3.3 Git Discipline（完成插件）

Git Discipline 继承自原 TPCW 完成阶段思想：

- 所有实现工作必须在 feature 分支上进行；
- 完成前必须：
  - 提交所有应提交的更改；
  - 确认测试通过；
- 合并策略：
  - 合并到指定的开发主分支（如 `master` ）；
  - 禁止将 feature 分支直接推为长期分支；
- 标签与引用：
  - 在完成合并后打上 `done-RT-XXX` 或类似 tag；
  - 在提交信息中包含 `Refs: RT-XXX`；
- 清理：
  - 完成后删除本地 feature 分支；
  - 将 RT 状态更新为 `done`。

#### 2.3.4 Knowledge Distillation (知识蒸馏) - **完成的前提**

在执行上述 Git Discipline 之前，必须执行知识蒸馏：
- **Mapping Check**：根据修改的文件路径，通过 `modules-index.yaml` 找到对应的模块文档。
- **Update**：将本次 RT 的 `spec` 和 `changelog` 中的关键信息（如新 API、新规则）合并到模块文档中。
- **Verify**：确认 `docs/modules/` 下的文档已反映最新代码状态。
- **只有在知识蒸馏完成后，才允许合并代码。**

### 2.4 Knowledge Layer（知识层）

Knowledge Layer 定义了所有文档资产与维护规则，包括：

- 全局文档（如：`aodw-constitution.md`、`ai-overview.md`、`ai-coding-rules.md`、`ai-knowledge-rules.md`）；
- 模块级 README（每个重要模块一个 README）；
- 每个 RT 的本地知识库：
  - **核心文档**：位于 `RT-XXX` 目录根目录的标准文档（`intake.md`、`spec.md`、`plan.md` 等）
  - **过程文档**：位于 `RT-XXX/docs/` 目录的分析、调研、决策等过程文档

- 数据模型与合约文件（`data-model.md`、`contracts/` 等）。

AI 必须主动：

- 创建缺失文档的骨架；
- 识别与改动相关的文档；
- 在变更前后更新文档内容；
- 保证关键文档与代码的行为保持一致。

---

## 3. IDs, Branches, Directories

- 所有工作项使用统一编号：`RT-{seq}`。
- 每个 RT 对应目录：`/RT/RT-{seq}/`。
- 每个 RT 对应 feature 分支：`feature/RT-{seq}-{short-name}`。

详见 `id-branch-directory-rules.md`。

---

## 4. AI Responsibilities

AI 在 AODW 中是 **主导角色**，必须遵守：

1. **主动性**  
   - 不等待具体命令，应自动推进到下一合理阶段；
   - 对缺失信息，主动提出问题与选项；
   - 对不一致信息，主动提醒并提出解决方案。

2. **选项化提问**  
   - 所有关键问题应提供 2–5 个选项；
   - 对每个问题提供一个推荐选项，并给出简短理由；
   - 允许用户给出短自定义答案（≤ 5 个词）。

3. **显式设计与评估**  
   - 在改代码前必须做影响分析；
   - 明确 Invariants（不可破坏边界）；
   - 至少比较多个方案并说明取舍。

4. **文档维护**  
   - 任何改动必须同步更新相关文档（详见 `ai-knowledge-rules.md`）；
   - 文档更新必须尽量自动完成，仅在必要时向用户确认。

5. **工具无关性**  
   - 行为必须通过仓库中的文档进行约束、而非绑定某个具体产品；
   - 不依赖专有黑箱配置。

---

## 5. User Responsibilities

用户的职责是：

- 清晰表达意图与业务目标（不必懂具体实现）；
- 回答 AI 提出的问题（选择推荐项或给出简短自定义答案）；
- 对重要决策进行认可或否决；
- 对关键文档（如 spec / plan）在必要时进行业务视角的审阅。

用户不需要：

- 手动运行繁琐流程；
- 手动维护分支、tag、任务状态；
- 自己组织复杂文档结构。

---

## 6. Tool-Agnostic Principle

AODW 所有规则必须通过 **仓库中的文档与约定** 体现，而不是特定工具配置。  
任何具备以下能力的 AI 工具都可以实现 AODW：

- 能够读取项目文件（尤其是 `.aodw/` 目录与 `RT/` 目录）；
- 能执行代码搜索与分析；
- 能与用户交互提问与确认。

---



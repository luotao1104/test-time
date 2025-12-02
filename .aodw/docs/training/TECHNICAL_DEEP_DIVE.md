# AODW 技术内幕与实现原理 (Technical Deep Dive)

> **面向读者**：架构师、高级开发人员、AODW 维护者
> **文档目标**：揭示 AODW "黑盒"内部的运行机制，解释每个流程背后的数据流转和设计哲学。

---

## 1. 核心架构：状态机与数据驱动

AODW 本质上是一个**由文档驱动的分布式状态机**。

### 1.1 分布式状态机 (Distributed State Machine)
传统的 Jira 或 Trello 是中心化的状态机。而 AODW 将状态分散在每个 `RT` (Request Ticket) 目录中。

*   **State Owner**: 每个 `RT` 目录下的 `meta.yaml` 是该任务状态的**唯一真理来源 (Single Source of Truth)**。
*   **Global View**: 根目录下的 `RT/index.yaml` 是所有 RT 状态的**投影 (Projection)**，类似于数据库的索引。

### 1.2 数据驱动 (Data-Driven)
AODW 不依赖 AI 的"记忆"，而是依赖**结构化数据**。
*   AI 不是"记住"了你要做什么，而是"读取"了 `meta.yaml` 和 `spec.md`。
*   **设计哲学**：Context is King。通过强制文件结构，保证 AI 在任何时刻切入任务，都能获得完整的上下文。

---

## 2. RT 生命周期 I/O 详解 (Lifecycle I/O Analysis)

AODW 的每个阶段都可以看作一个**函数**：`Output = Process(Input)`。

### 阶段 1: Intake (需求摄入)
**目标**：将模糊的人类意图转化为结构化的需求边界。

| 要素 | 说明 |
| :--- | :--- |
| **Input** | 用户自然语言描述（如："帮我加个登录功能"）。 |
| **Process** | **交互协议 (Interaction Protocol)**：AI 必须提出 2-5 个决策型问题（Decision Questions），迫使用户明确范围、风险和优先级。 |
| **Output** | 1. **`RT-xxx/` 目录**：物理隔离的工作区。<br>2. **`intake.md`**：包含原始需求、对话记录、最终确认的需求边界。<br>3. **`meta.yaml` (Init)**：状态置为 `intaking`。 |

### 阶段 2: Planning (规划)
**目标**：将需求转化为可执行的工程指令。

| 要素 | 说明 |
| :--- | :--- |
| **Input** | 1. `intake.md`<br>2. 现有代码库 (Codebase Context)<br>3. `.aodw/modules-index.yaml` (模块架构) |
| **Process** | **思维链 (Chain of Thought)**：AI 阅读代码 -> 识别受影响模块 -> 设计接口 -> 制定步骤。 |
| **Output** | 1. **`spec.md` (设计图)**：定义数据结构、API 签名、模块交互。**这是"做什么"**。<br>2. **`plan.md` (施工图)**：原子化的实施步骤列表。**这是"怎么做"**。<br>3. **`impact.md`**：影响范围分析。<br>4. **`meta.yaml` (Planned)**：状态置为 `planning`。 |

### 阶段 3: Execution (执行)
**目标**：将设计无损地转化为代码。

| 要素 | 说明 |
| :--- | :--- |
| **Input** | `spec.md` + `plan.md` |
| **Process** | **TDD / 迭代开发**：AI 严格按照 `plan.md` 的 Checklist 执行。每完成一步，打钩并提交。 |
| **Output** | 1. **代码变更**：实际的 `.ts`, `.py` 等源码文件。<br>2. **`changelog.md`**：记录具体的改动点。<br>3. **`meta.yaml` (In-Progress)**：状态置为 `in-progress`。 |

### 阶段 4: Verification (验证)
**目标**：确保实现符合设计。

| 要素 | 说明 |
| :--- | :--- |
| **Input** | 修改后的代码 + `spec.md` |
| **Process** | **测试驱动**：运行自动化测试，或执行手动验证脚本。 |
| **Output** | 1. **`tests.md`**：包含测试用例、执行结果截图或日志。<br>2. **`meta.yaml` (Done)**：状态置为 `done`。 |

### 阶段 5: Delivery (交付)
**目标**：完成代码合并，并将"临时知识"固化为"长期记忆"。

| 要素 | 说明 |
| :--- | :--- |
| **Input** | `spec.md` + `changelog.md` + `meta.yaml` |
| **Process** | **知识蒸馏 (Knowledge Distillation)**：<br>1. **Git 操作**：Merge & Tag。<br>2. **文档固化**：如果 RT 修改了系统行为，必须更新对应模块的 `README.md` (System Documentation)。<br>3. **状态归档**：更新 `meta.yaml` 和 `index.yaml`。 |
| **Output** | 1. **Git Commit & Tag**。<br>2. **更新后的模块文档** (`docs/modules/*.md`)。<br>3. **Closed RT**。 |

### 2.5 动态同步机制 (The "Living Document" Rule)
**核心原则**：文档不是一次性的，而是**活的 (Living)**。

当在 Execution 阶段遇到需求变更、实现困难或 Bug 时，**严禁直接修改代码**。必须遵循以下回溯流程：

1.  **需求变更** -> 回溯修改 `intake.md` 和 `spec.md`。
2.  **实现受阻** -> 回溯修改 `plan.md`（标记原步骤失败，新增替代步骤）。
3.  **发现 Bug** -> 在 `plan.md` 中新增 "Fix Bug" 步骤，并记录在 `changelog.md`。

**AI 铁律**：Code never leads; Code always follows. (代码永远跟随文档，绝不超前)

---

## 3. 核心工件解密 (Artifacts Decoded)

为什么需要这么多文件？每个文件都有其独特的**架构职责**。

### 3.1 `meta.yaml`
*   **作用**：元数据存储。
*   **关键字段**：
    *   `id`: 唯一标识。
    *   `status`: 当前状态。
    *   `profile`: `Spec-Lite` (轻量) 或 `Spec-Full` (全量)。
    *   `owner`: 责任人。
*   **为什么重要**：它是程序化读取 RT 状态的入口，CLI 工具和统计脚本都依赖它。

### 3.2 `spec.md` vs `plan.md`
*   **`spec.md` (空间维度)**：描述系统的**最终形态**。它关注的是 Interface, Schema, Component。
*   **`plan.md` (时间维度)**：描述到达最终形态的**路径**。它关注的是 Step 1, Step 2, Step 3。
*   **分离的意义**：很多 AI 容易混淆"设计"和"步骤"。强制分离迫使 AI 先想清楚结构（Spec），再规划路径（Plan）。

### 3.3 `invariants.md` (不可变约束)
*   **作用**：定义**绝对不能破坏的规则**。
*   **例子**："支付接口必须幂等"、"用户密码不能明文存储"。
*   **机制**：在 Execution 阶段，AI 被要求反复核对代码是否违反了 `invariants.md`。

### 3.4 双向映射机制 (Two-Way Mapping)
AI 如何精准定位模块文档？依靠两套机制：

1.  **正向索引 (`modules-index.yaml`)**：
    *   系统的"地图"。
    *   逻辑：`Code Path` -> `Module Name` -> `Doc Path`。
    *   *例*：改了 `apps/api/orders` -> 查索引知是 `orders` 模块 -> 找到 `docs/modules/orders.md`。

2.  **反向锚点 (Frontmatter)**：
    *   文档的"触角"。
    *   逻辑：`Doc` -> `files: [glob patterns]` -> `Code Path`。
    *   *例*：打开 `orders.md`，检查 `files` 字段，确认修改的文件在范围内。

**强制规则**：在 Delivery 阶段，AI 必须执行 **Mapping Check**，确保代码变更被同步到对应的模块文档中。

---

## 4. 适配器机制 (Adapter Mechanism)

AODW 如何让不同的 AI (Cursor, Gemini, Claude) 都能听懂指挥？

### 4.1 原理：Prompt Injection
适配器本质上是一组**预置的 System Prompts**。

### 4.2 实现方式
*   **Cursor**: 使用 `.cursor/rules` 目录。Cursor IDE 会自动索引这些文件，并在 AI 对话时作为 Context 注入。
*   **Gemini / Claude**: 使用 `GEMINI.md` / `CLAUDE.md`。这是一个巨大的 Prompt 文件，包含了 AODW 的所有核心规则。用户在会话开始时手动发送给 AI。

### 4.3 "薄适配器" (Thin Adapter)
为了维护方便，我们尽量将核心规则放在 `.aodw/` (Runtime Kernel) 中，适配器只负责**引用**和**桥接**，不包含具体的业务规则。

---

## 5. 总结

AODW 的设计核心在于：**用显式的、结构化的文档，填补人类意图与 AI 实现之间的鸿沟。**

*   **显式**：不说"你懂的"，而是写在 `spec.md` 里。
*   **结构化**：不用自然语言长篇大论，而是用 `yaml` 和 `markdown` 列表。
*   **解耦**：设计 (Spec) 与实现 (Code) 解耦，规划 (Plan) 与执行 (Execute) 解耦。

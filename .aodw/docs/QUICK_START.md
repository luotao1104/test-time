# AODW 快速开始指南

## 📖 本指南适用对象

- 首次使用 AODW 的开发者
- 需要在 Cursor / Gemini / Claude 中配置 AODW 的团队成员
- 希望了解如何与 AI 正确协作的工程师

---

## 🎯 目标

完成本指南后，您将能够：

✅ 在项目中安装和配置 AODW  
✅ 理解 AODW 的核心工作流  
✅ 创建并完成第一个 RT（Request Ticket）  
✅ 确保 AI 工具严格遵守 AODW 规范

---

## 📚 前置知识

**必需**：
- 了解 Git 基本操作
- 熟悉命令行工具

**推荐**：
- 了解 Cursor IDE 或其他 AI 编程工具
- 阅读过 [AODW 白皮书](docs/training/TRAINING.md)（可选）

---

## 🚀 第一部分：安装与配置

### 1.1 系统要求

- **Node.js**: >= 14.x
- **Git**: >= 2.x
- **AI 工具**（至少选择一个）：
  - Cursor IDE（推荐）
  - Google Gemini
  - Anthropic Claude

### 1.2 安装 AODW

#### 步骤 1：进入项目目录

```bash
cd /path/to/your/project
```

#### 步骤 2：运行安装命令

```bash
npx aodw init
```

#### 步骤 3：选择 AI 工具

系统会提示您选择使用的 AI 工具：

```
? Which AI tool(s) are you using? (Press <space> to select)
❯ ◯ Cursor
  ◯ Gemini  
  ◯ Claude
  ◯ All (install all adapters)
```

**推荐**：如果您使用 Cursor，选择 `Cursor`。

#### 步骤 4：验证安装

安装完成后，项目目录应包含：

```
your-project/
├── .aodw/                    ← 核心规范文件
│   ├── aodw-constitution.md
│   ├── rt-manager.md
│   ├── ai-knowledge-rules.md
│   └── templates/
├── .cursor/                  ← Cursor 适配器（如果选择了 Cursor）
│   ├── rules/
│   │   └── aodw.mdc
│   └── commands/
│       ├── aodw.md
│       ├── aodw-new.md
│       └── ...
└── RT/                       ← 任务目录
    └── index.yaml
```

**验证命令**：
```bash
ls -la .aodw
ls -la .cursor  # 如果选择了 Cursor
```

---

## 🔧 第二部分：Cursor IDE 配置

### 2.1 Cursor 自动识别规则

Cursor 会自动读取 `.cursor/rules/aodw.mdc`，无需额外配置。

**验证方式**：

1. 打开 Cursor IDE
2. 打开项目
3. 按 `Cmd+K`（Mac）或 `Ctrl+K`（Windows）
4. 输入 `aodw`
5. 应该看到命令列表

### 2.2 常用 Cursor 命令

| 命令 | 快捷键 | 用途 |
|------|--------|------|
| 打开命令面板 | `Cmd+K` / `Ctrl+K` | 调用 AODW 命令 |
| 聊天窗口 | `Cmd+L` / `Ctrl+L` | 与 AI 对话 |
| Composer | `Cmd+I` / `Ctrl+I` | 多文件编辑 |

### 2.3 确认 AI 已加载 AODW 规则

**测试步骤**：

1. 打开 Cursor 聊天窗口（`Cmd+L`）
2. 输入：
   ```
   你好，请确认你是否已经加载了 AODW 规范？
   ```
3. AI 应该回复类似内容：
   ```
   是的，我已经加载了 AODW 规范。我会遵守以下规则：
   - RT（Request Ticket）管理
   - 文档先行（Spec-First）
   - 交互协议
   ...
   ```

**如果 AI 没有识别**：

- 检查 `.cursor/rules/aodw.mdc` 是否存在
- 重启 Cursor IDE
- 确认 Cursor 版本 >= 0.39（建议）

---

## 📝 第三部分：创建第一个 RT

### 3.1 什么是 RT？

**RT（Request Ticket）** 是 AODW 的核心概念：

- 每个功能、Bug 修复、重构都应创建一个独立的 RT
- RT 包含完整的需求、设计、实现、测试记录
- RT 编号格式：`RT-001`、`RT-002`...

### 3.2 使用 Cursor 命令创建 RT

#### 步骤 1：调用命令

1. 按 `Cmd+K`
2. 输入 `aodw-new`
3. 回车

#### 步骤 2：回答 AI 的问题

AI 会按照交互协议提问（每轮 3-5 个问题）：

**示例问题 1：类型选择**

```
Q1. 请选择本次任务的类型：

A. Feature（新功能）
B. Bug（Bug 修复）
C. Enhancement（改进）
D. Refactor（重构）
E. Research（调研）

Recommended: A（基于您的描述，这是一个新功能）

请回复：A/B/C/D/E 或 custom:<你的答案>
```

**回答示例**：`A`

**示例问题 2：影响模块**

```
Q2. 本次修改会影响哪些模块？

示例：
- orders（订单模块）
- users（用户模块）
- payment（支付模块）

请列出模块名称，用逗号分隔，≤10 个词
```

**回答示例**：`orders, payment`

#### 步骤 3：确认 Profile

AI 会根据您的回答推荐 Profile（Spec-Lite 或 Spec-Full）：

```
Q3. 根据上述信息，推荐使用哪种 Profile？

A. Spec-Lite（局部小改动，单模块）
B. Spec-Full（跨模块、涉及数据模型或 API 变更）

Recommended: B（因为涉及 2 个模块和支付逻辑）

请回复：A/B
```

**回答示例**：`B`

#### 步骤 4：AI 自动创建 RT

AI 会：

1. 生成 RT-ID（如 `RT-001`）
2. 创建目录：`RT/RT-001/`
3. 生成文档：
   - `meta.yaml`：RT 元数据
   - `intake.md`：需求摄入
   - `decision.md`：决策记录
   - `spec.md`：规格说明
   - `plan.md`：实施计划
   - `invariants.md`：不变量
   - `impact.md`：影响分析
   - `tests.md`：测试计划
   - `changelog.md`：变更日志

### 3.3 查看生成的 RT

```bash
ls RT/RT-001/
```

应看到：

```
RT/RT-001/
├── meta.yaml
├── intake.md
├── decision.md
├── spec.md
├── plan.md
├── invariants.md
├── impact.md
├── tests.md
└── changelog.md
```

---

## 🤖 第四部分：与 AI 正确交互

### 4.1 AODW 交互协议

AI 必须遵守的提问规范：

#### 决策型问题

- **格式**：提供 2-5 个选项（A/B/C/D/E）
- **必须**：标注推荐选项和理由
- **允许**：`custom:<答案>`（≤5 个词）

**示例**：

```
Q. 本次改动是否需要升级到 Spec-Full？

A. 是，升级到 Spec-Full
B. 否，保持 Spec-Lite

Recommended: A（因为涉及数据库 schema 变更）

请回复：A/B 或 custom:<你的答案>
```

#### 信息型问题

- **格式**：说明需要什么信息
- **提供**：2-3 个示例答案
- **要求**：回答 ≤10 个词

**示例**：

```
Q. 该功能的优先级是什么？

示例：
- 高（影响核心业务）
- 中（常规功能）
- 低（可延后）

请回复（≤10 个词）
```

### 4.2 如果 AI 没有遵守协议

**症状**：

- AI 一次性问了超过 5 个问题
- AI 没有提供选项，而是开放式提问
- AI 没有给出推荐选项

**解决方式**：

提醒 AI：

```
请按照 .aodw/ai-interaction-rules.md 中的交互协议提问。
每轮最多 3-5 个问题，决策型问题必须提供选项和推荐理由。
```

### 4.3 强制 AI 遵守规范的技巧

**技巧 1：引用规范文件**

```
请遵守 .cursor/rules/aodw.mdc 第 11 章的完成检查清单。
```

**技巧 2：要求 AI 自查**

```
在继续之前，请先确认：
1. 是否已阅读模块 README？
2. 是否已检查 invariants.md？
3. 是否已更新 RT/index.yaml？
```

**技巧 3：暂停流程**

如果 AI 行为异常，可以暂停 AODW 流程：

```
暂停 AODW
```

或使用命令：按 `Cmd+K`，输入 `aodw-pause`

---

## ✅ 第五部分：完成 RT

### 5.1 完成检查清单

在完成 RT 前，AI 必须确认以下清单（按 `Cmd+K`，输入 `aodw-done`）：

```
RT 完成检查清单

□ meta.yaml 已更新
□ RT/index.yaml 已更新
□ spec/spec-lite 已完成
□ plan/plan-lite 已完成
□ invariants.md 已验证
□ impact.md 已验证
□ tests.md 已完成
□ 模块 README 已更新 (Knowledge Distillation) ← 重要！
□ 治理规则已满足
□ 所有功能已实现
□ 所有测试已通过

是否完成此 RT？
A. 是（推荐）
B. 否
```

### 5.2 Knowledge Distillation（知识蒸馏）

**这是 AODW 的核心机制**，确保代码变更同步到文档。

**AI 必须执行的步骤**：

1. **Mapping Check**（映射检查）：
   - 读取 `.aodw/modules-index.yaml`
   - 找到被修改代码对应的模块 README
   - 验证 README 的 `files` 字段是否包含修改的文件

2. **Update**（更新）：
   - 将 RT 中的行为变更、新增的 Invariants 合并到模块 README
   - 更新模块的 `related_rts` 列表

3. **Verify**（验证）：
   - 确认模块 README 准确反映当前代码行为

**如果 AI 跳过了这一步**：

```
请执行 Knowledge Distillation：
1. 检查 .aodw/modules-index.yaml 找到相关模块文档
2. 更新 docs/modules/<module>.md 的 Responsibilities 和 Invariants
3. 在 related_rts 中添加 RT-XXX
```

### 5.3 Git 操作（自动）

完成 RT 后，AI 会自动执行 Git 操作（根据 `.aodw/git-discipline.md`）：

```bash
# 1. 提交所有改动
git add .
git commit -m "feat(RT-001): 实现支付模块

- 新增支付接口
- 更新订单状态逻辑
- 更新模块文档

Refs: RT-001"

# 2. 合并到 master
git checkout master
git pull origin master
git merge --no-ff feature/RT-001-payment

# 3. 推送
git push origin master

# 4. 删除功能分支
git branch -d feature/RT-001-payment
```

---

## 🛠️ 第六部分：常见问题

### Q1: AI 没有读取 AODW 规则怎么办？

**答**：

1. **重启 Cursor IDE**
2. **确认文件存在**：
   ```bash
   ls .cursor/rules/aodw.mdc
   ```
3. **手动提醒 AI**：
   ```
   请加载 .cursor/rules/aodw.mdc 文件，这是你必须遵守的规范。
   ```

### Q2: 如何让 AI 严格执行 Knowledge Distillation？

**答**：

在 `aodw-done` 命令执行前，明确提醒：

```
在完成 RT 前，你必须：
1. 检查 modules-index.yaml
2. 定位相关模块 README
3. 更新模块文档
4. 验证文档与代码一致

请现在执行这些步骤。
```

### Q3: 如何切换 Profile（Lite → Full）？

**答**：

使用命令：`aodw-upgrade`

或直接告诉 AI：

```
本次 RT 需要升级到 Spec-Full，因为涉及数据库 schema 变更。
请更新 meta.yaml.profile 为 Spec-Full，并补充完整的 spec.md 和 plan.md。
```

### Q4: 多个开发者如何协作？

**答**：

1. **RT 归属**：在 `meta.yaml` 中设置 `owner` 字段
2. **分支命名**：遵循 `feature/RT-XXX-description` 格式
3. **文档共享**：RT 文档是唯一真理来源，所有人基于文档协作
4. **冲突解决**：如果多人修改同一 RT，通过 `decision.md` 记录决策

### Q5: 如何更新 AODW 规范？

**答**：

```bash
npx aodw update
```

这会从 NPM 获取最新版本的 `.aodw/` 和适配器文件。

---

## 📊 第七部分：工作流总结

### 完整流程图

```
用户提出需求
    ↓
创建 RT (aodw-new)
    ↓
AI 提问（交互协议）
    ↓
生成 spec.md / plan.md
    ↓
用户 Review 并批准
    ↓
AI 实现代码
    ↓
AI 执行 Knowledge Distillation
    ↓
AI 运行测试
    ↓
完成检查清单 (aodw-done)
    ↓
Git 自动合并和推送
    ↓
RT 标记为 done
```

### 关键检查点

| 阶段 | 检查点 | 负责人 |
|------|--------|--------|
| 创建 RT | `meta.yaml` 正确填写 | AI |
| 规划 | `spec.md` 和 `plan.md` 完整 | 人类 Review |
| 实现 | 代码符合 `plan.md` | AI |
| 验证 | `tests.md` 中的测试通过 | AI |
| 交付 | Knowledge Distillation 完成 | AI（强制） |
| 完成 | 所有清单项勾选 | 人类确认 |

---

## 🎓 第八部分：最佳实践

### 1. 文档先行

**反例**：
```
用户："帮我加一个登录功能"
AI：（直接开始写代码）
```

**正例**：
```
用户："帮我加一个登录功能"
AI："让我先创建一个 RT 并生成 spec.md，请确认需求..."
```

### 2. 小步迭代

- **Spec-Lite**：优先使用，快速迭代
- **Spec-Full**：仅在必要时使用（跨模块、数据库变更）

### 3. 强制文档更新

每次完成 RT 都必须检查：

```bash
# 查看模块文档是否更新
git diff docs/modules/
```

如果没有变更，说明 Knowledge Distillation 可能被跳过。

### 4. 定期同步

团队内定期（如每周）同步：

- 哪些 RT 已完成
- 哪些模块发生了变化
- 是否需要更新 AODW 规范

---

## 📚 附录：更多资源

### 核心文档

- [AODW 白皮书](docs/training/TRAINING.md)：企业内部培训材料
- [技术深度解析](docs/training/TECHNICAL_DEEP_DIVE.md)：架构和内部机制
- [AODW 宪法](.aodw/aodw-constitution.md)：核心规范

### 命令参考

| 命令 | 用途 |
|------|------|
| `aodw` | 显示所有可用命令 |
| `aodw-new` | 创建新 RT |
| `aodw-open` | 打开现有 RT |
| `aodw-done` | 完成 RT |
| `aodw-check` | RT 一致性检查 |
| `aodw-lite` | 切换到 Spec-Lite |
| `aodw-full` | 切换到 Spec-Full |
| `aodw-upgrade` | 升级到 Spec-Full |
| `aodw-pause` | 暂停 AODW |
| `aodw-resume` | 恢复 AODW |
| `aodw-module` | 更新模块文档 |
| `aodw-governance` | 治理检查 |

### 获取帮助

- **查看规范**：直接阅读 `.aodw/` 目录下的 Markdown 文件
- **CLI 帮助**：`npx aodw --help`
- **社区讨论**：（待定）

---

## ✨ 结语

恭喜您完成了 AODW 快速开始指南！

**记住三个核心原则**：

1. **一切皆 RT** - 没有"随便改改"
2. **文档先行** - 先想清楚，再写代码
3. **知识蒸馏** - 代码变更必须同步到文档

现在，开始您的第一个 RT 吧！

如有疑问，随时查阅本指南或核心文档。

Happy Coding with AODW! 🚀

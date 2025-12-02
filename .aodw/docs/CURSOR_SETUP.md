# Cursor IDE 配置检查清单

## 📋 本清单用途

确保 Cursor IDE 正确加载 AODW 规范，并能够严格执行 AODW 工作流。

---

## ✅ 安装后检查（5 分钟）

### 1. 文件结构验证

在项目根目录执行：

```bash
# 检查核心规范文件
ls -la .aodw/aodw-constitution.md
ls -la .aodw/rt-manager.md
ls -la .aodw/ai-knowledge-rules.md

# 检查 Cursor 适配器
ls -la .cursor/rules/aodw.mdc
ls -la .cursor/commands/aodw.md
```

**预期结果**：所有文件都存在，无报错

---

### 2. Cursor 命令测试

1. 打开 Cursor IDE
2. 按 `Cmd+K`（Mac）或 `Ctrl+K`（Windows）
3. 输入 `aodw`
4. 按回车

**预期结果**：显示 AODW 命令列表

**如果失败**：
- 重启 Cursor IDE
- 确认 Cursor 版本 >= 0.39

---

### 3. AI 规则加载测试

1. 打开 Cursor 聊天窗口（`Cmd+L`）
2. 输入以下测试问题：

```
你好！请确认：
1. 你是否已加载 AODW 规范？
2. 你知道什么是 RT（Request Ticket）吗？
3. 你知道 Knowledge Distillation 是什么吗？
```

**预期回复**：

AI 应该明确回复：
- 已加载 AODW 规范
- 知道 RT 是任务管理单元
- 知道 Knowledge Distillation 是文档同步机制

**如果 AI 回复"不知道"**：

执行强制加载：

```
请阅读以下文件：
- .cursor/rules/aodw.mdc
- .aodw/aodw-constitution.md
- .aodw/ai-knowledge-rules.md

这些是你必须遵守的规范。
```

---

### 4. 交互协议测试

在聊天窗口中输入：

```
我想添加一个用户登录功能。
```

**预期行为**：

AI 应该：
1. **不直接写代码**
2. **询问是否创建 RT**
3. **按照交互协议提问**（提供选项 A/B/C/D，标注推荐）

**错误示例**：

如果 AI 直接回复类似内容：
```
好的，我来帮你写登录功能的代码...
```

这说明 AI **没有遵守 AODW 规范**。

**纠正方式**：

```
请停止。你必须先按照 AODW 流程：
1. 询问我是否创建一个 RT
2. 按照 .aodw/ai-interaction-rules.md 提问
3. 生成 spec.md 和 plan.md
4. 等待我批准后再写代码

现在重新开始。
```

---

### 5. Knowledge Distillation 检查

创建一个测试 RT（可以是虚拟的），然后要求 AI 完成：

```
假设我们刚完成了 RT-TEST-001，修改了 `src/orders/service.ts`。

请执行 Knowledge Distillation：
1. 查找 .aodw/modules-index.yaml
2. 定位 orders 模块的文档
3. 说明你会如何更新文档
```

**预期回复**：

AI 应该：
1. 读取 `modules-index.yaml`
2. 找到 `orders` 模块对应的文档路径（如 `docs/modules/orders.md`）
3. 说明会更新文档的 Responsibilities、Invariants 和 related_rts

**如果 AI 说"不需要更新文档"**：

这是**严重错误**，说明 AI 不理解 Knowledge Distillation。

**纠正方式**：

```
错误！根据 .aodw/ai-knowledge-rules.md 和 .aodw/git-discipline.md，
Knowledge Distillation 是强制性的，必须在完成 RT 前执行。

请重新阅读：
- .aodw/ai-knowledge-rules.md（第 243-253 行）
- .aodw/git-discipline.md（第 88-101 行）
- .cursor/rules/aodw.mdc（第 697-718 行）
```

---

## 🔧 常见问题排查

### 问题 1：Cursor 没有识别 `.cursor/rules/aodw.mdc`

**排查步骤**：

1. **确认文件存在**：
   ```bash
   cat .cursor/rules/aodw.mdc | head -20
   ```

2. **检查文件权限**：
   ```bash
   ls -l .cursor/rules/aodw.mdc
   ```
   应该是可读的（`-rw-r--r--`）

3. **重启 Cursor IDE**

4. **清除 Cursor 缓存**（macOS）：
   ```bash
   rm -rf ~/Library/Application\ Support/Cursor/Cache
   ```

5. **检查 Cursor 版本**：
   - 打开 Cursor
   - Help → About
   - 确认版本 >= 0.39

---

### 问题 2：AI 一次性问了很多问题（超过 5 个）

**原因**：AI 没有遵守交互协议

**解决**：

```
请停止。根据 .aodw/ai-interaction-rules.md，你每轮最多只能问 3-5 个问题。

请重新开始，每轮最多 3 个问题。
```

---

### 问题 3：AI 没有提供选项（A/B/C/D）

**原因**：AI 没有遵守决策型问题格式

**解决**：

```
你的提问格式不符合规范。

决策型问题必须：
1. 提供 2-5 个选项（A/B/C/D/E）
2. 标注推荐选项
3. 给出推荐理由

请按照此格式重新提问。
```

---

### 问题 4：AI 直接开始写代码，没有创建 RT

**原因**：AI 跳过了 AODW 流程

**解决**：

```
停止！你必须先创建 RT。

请按照以下流程：
1. 使用 aodw-new 命令创建 RT
2. 生成 spec.md 和 plan.md
3. 等待我批准
4. 再开始写代码

现在重新开始。
```

---

## 📊 验收标准

完成以上所有检查后，您的 Cursor IDE 应该：

✅ **自动识别 AODW 规范**
- 聊天时 AI 知道 RT、Profile、Knowledge Distillation

✅ **遵守交互协议**
- 每轮最多 3-5 个问题
- 决策型问题提供选项和推荐

✅ **文档先行**
- 不直接写代码
- 先生成 spec.md 和 plan.md

✅ **强制 Knowledge Distillation**
- 完成 RT 前必须更新模块文档
- 检查 modules-index.yaml

✅ **Git 规范**
- 分支命名：`feature/RT-XXX-description`
- 提交信息包含 `Refs: RT-XXX`

---

## 🎯 快速验证命令

将以下脚本保存为 `verify-aodw.sh`，一键验证：

```bash
#!/bin/bash

echo "🔍 AODW 安装验证"
echo "===================="

# 1. 检查核心文件
echo -n "✓ 核心规范文件... "
if [ -f ".aodw/aodw-constitution.md" ]; then
    echo "OK"
else
    echo "FAIL"
    exit 1
fi

# 2. 检查 Cursor 适配器
echo -n "✓ Cursor 适配器... "
if [ -f ".cursor/rules/aodw.mdc" ]; then
    echo "OK"
else
    echo "FAIL"
    exit 1
fi

# 3. 检查命令文件
echo -n "✓ Cursor 命令... "
if [ -f ".cursor/commands/aodw.md" ]; then
    echo "OK"
else
    echo "FAIL"
    exit 1
fi

# 4. 检查 RT 目录
echo -n "✓ RT 索引... "
if [ -f "RT/index.yaml" ]; then
    echo "OK"
else
    echo "FAIL"
    exit 1
fi

echo ""
echo "✅ 所有文件检查通过！"
echo ""
echo "📋 下一步："
echo "1. 打开 Cursor IDE"
echo "2. 按 Cmd+K 输入 'aodw' 验证命令"
echo "3. 在聊天窗口测试 AI 是否加载规范"
```

运行：

```bash
chmod +x verify-aodw.sh
./verify-aodw.sh
```

---

## 📚 相关文档

- [快速开始指南](QUICK_START.md)：完整使用教程
- [AODW 白皮书](training/TRAINING.md)：企业内部培训
- [技术深度解析](training/TECHNICAL_DEEP_DIVE.md)：架构说明

---

## 💡 提示

如果以上所有检查都通过，但 AI 仍然不遵守规范：

**终极解决方案**：

在每次对话开始时，明确要求：

```
从现在开始，你必须严格遵守 AODW 规范。

请先阅读：
- .cursor/rules/aodw.mdc

然后确认你理解了以下规则：
1. RT 管理
2. 文档先行
3. 交互协议
4. Knowledge Distillation
5. Git Discipline

请回复"已确认"后，我们再开始工作。
```

这会强制 AI 重新加载并确认规范。

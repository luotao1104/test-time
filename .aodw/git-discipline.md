# Git Discipline for AODW

本文件定义 AODW 工作流中必须遵守的 Git 操作规范。
这些规则旨在确保代码历史清晰、可回溯，并便于自动化工具检查。

---

## 1. 分支命名 (Branch Naming)

所有开发工作必须在 Feature 分支上进行，禁止直接在主分支（master/main）提交。

### 1.1 命名格式
```text
feature/RT-{seq}-{short-name}
```

- **RT-{seq}**: 关联的 RT ID，必须与 `RT/` 目录下的 ID 一致（如 `RT-001`）。
- **{short-name}**: 简短描述，使用小写英文和连字符（kebab-case），建议 2-4 个单词。

### 1.2 示例
- ✅ `feature/RT-001-login-fix`
- ✅ `feature/RT-023-export-csv`
- ❌ `feature/login-fix` (缺少 RT ID)
- ❌ `RT-001/login` (格式错误)

---

## 2. 提交信息 (Commit Message)

提交信息必须遵循 Conventional Commits 规范，并包含 RT 引用。

### 2.1 格式模板
```text
<type>(<scope>): <subject>

[optional body]

Refs: <RT-ID>
```

### 2.2 字段说明
- **type**:
  - `feat`: 新功能
  - `fix`: 修复 bug
  - `docs`: 文档变更
  - `style`: 代码格式（不影响逻辑）
  - `refactor`: 重构（既不是新增功能也不是修改 bug）
  - `perf`: 性能优化
  - `test`: 增加测试
  - `chore`: 构建过程或辅助工具的变动
- **scope**: (可选) 影响范围，如 `auth`, `api`, `ui`。
- **subject**: 简短描述，使用祈使句，不加句号。
- **Refs**: (必须) 关联的 RT ID，用于链接 Git 历史与需求文档。

### 2.3 示例
```text
fix(auth): handle token expiration gracefully

Update the interceptor to refresh token on 401 error.

Refs: RT-001
```

---

## 3. 标签 (Tagging)

当一个 RT 完成并合并到主分支后，必须打标签以标记里程碑。

### 3.1 命名格式
```text
done-<RT-ID>
```

### 3.2 示例
- ✅ `done-RT-001`
- ✅ `done-RT-042`

---

## 4. 合并策略 (Merge Strategy)

- **禁止 Fast-forward**: 合并 Feature 分支时应使用 `--no-ff`，以保留分支历史。
- **Squash**: 对于琐碎的提交（如 "fix typo", "update"），建议在合并前进行 Squash，但保留关键的逻辑提交。

---

## 5. 自动化检查 (Automation)

AI 或 CI 工具应检查：

### Step 0: Knowledge Distillation (知识蒸馏) - **必须优先执行**
在合并代码前，必须检查：
1.  **模块文档更新**：本次改动是否修改了系统行为？如果是，对应的 `docs/modules/*.md` 是否已更新？
2.  **索引一致性**：`modules-index.yaml` 是否准确反映了当前的模块结构？

### Step 1: Git 规范检查
1.  当前分支名是否符合 `feature/RT-*` 格式。
2.  提交信息是否包含 `Refs: RT-*`。
3.  RT 完成时是否已创建对应的 `done-*` 标签。

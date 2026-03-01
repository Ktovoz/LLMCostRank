<div align="center">

# 💰 LLM Cost Rank

**一站式 LLM API 成本对比平台**

帮助开发者快速了解各大 LLM 提供商的价格与功能特性，做出明智的选择

[![Website](https://img.shields.io/badge/🌐_网站-llmcostrank.com-blue?style=flat-square)](https://www.llmcostrank.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-green?style=flat-square)](LICENSE)

[🌐 在线访问](https://www.llmcostrank.com/) · [📝 提交 Issue](https://github.com/ktovoz/LLMCostRank/issues) · [🚀 功能建议](https://github.com/ktovoz/LLMCostRank/discussions)

</div>

---

## ✨ 功能特性

| 功能 | 描述 |
|:----:|------|
| 📊 **Token 计费列表** | 展示主流 LLM 模型的 API 价格对比，支持多维度排序和智能筛选 |
| 💻 **编码套餐对比** | 为开发者优化的 LLM 编码订阅套餐价格对比（Cursor、Copilot 等） |
| 🔖 **书签导航** | 个人常用服务和工具的快捷导航，提升工作效率 |
| 🌓 **深色/浅色主题** | 支持主题自由切换，保护眼睛，跟随系统设置 |
| 📱 **响应式设计** | 完美适配桌面端和移动端，随时随地查看 |

---

## 🖼️ 页面预览

| 页面 | 路径 | 说明 |
|:----:|:----:|------|
| 🏠 首页 | `/` | LLM API Token 计费列表，支持按价格、上下文等排序 |
| 💻 编码套餐 | `/coding` | 编码助手订阅套餐对比（Cursor、Windsurf 等） |
| 🎯 更多 | `/more` | 更多功能和实用工具 |
| 🔖 书签 | `/bookmarks` | 个人书签收藏 |

---

## 🛠️ 技术栈

<table>
<tr>
<td width="50%">

**核心框架**
- ⚛️ [Next.js 16](https://nextjs.org/) - React 19 全栈框架
- 🔷 [TypeScript](https://www.typescriptlang.org/) - 类型安全
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS

</td>
<td width="50%">

**UI & 数据**
- 🧩 [shadcn/ui](https://ui.shadcn.com/) - 高质量 UI 组件
- 📊 [TanStack Table](https://tanstack.com/table) - 强大的数据表格
- 📄 [PapaParse](https://www.papaparse.com/) - CSV 解析

</td>
</tr>
<tr>
<td colspan="2">

**其他**
- 🎭 [Lucide React](https://lucide.dev/) - 精美图标
- 🌓 [next-themes](https://github.com/pacocoursey/next-themes) - 主题切换

</td>
</tr>
</table>

---

## 🚀 快速开始

### 📋 环境要求

- Node.js 20+
- npm / yarn / pnpm / bun（任选其一）

### 📦 安装

```bash
# 克隆仓库
git clone https://github.com/ktovoz/LLMCostRank.git
cd LLMCostRank

# 安装依赖
npm install
```

### 🔧 开发

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 🏗️ 构建

```bash
npm run build
npm run start
```

---

## 🐳 Docker 部署

### 标准版

```bash
# 构建镜像
docker build -t llm-costrank .

# 运行容器
docker run -p 80:80 llm-costrank
```

### 精简版

```bash
docker build -f Dockerfile.slim -t llm-costrank:slim .
docker run -p 80:80 llm-costrank:slim
```

---

## 📂 项目结构

```
📁 LLMCostRank/
├── 📁 app/                    # Next.js App Router 页面
│   ├── 📄 page.tsx            # 首页 (Token 计费列表)
│   ├── 📁 coding/             # 编码套餐页面
│   ├── 📁 ai/                 # AI 助手页面
│   ├── 📁 bookmarks/          # 书签页面
│   ├── 📁 more/               # 更多页面
│   ├── 📄 layout.tsx          # 根布局
│   └── 📄 globals.css         # 全局样式
├── 📁 components/             # React 组件
│   ├── 📁 ui/                 # UI 基础组件 (shadcn/ui)
│   ├── 📄 navbar.tsx          # 导航栏
│   └── 📄 theme-toggle.tsx    # 主题切换
├── 📁 public/                 # 静态资源
│   ├── 📄 models.csv          # LLM 模型数据
│   └── 📄 codingplan.csv      # 编码套餐数据
├── 📁 lib/                    # 工具函数
├── 📄 Dockerfile              # Docker 配置
├── 📄 nginx.conf              # Nginx 配置
└── 📄 package.json            # 项目配置
```

---

## 📊 数据结构

### LLM 模型数据 (`models.csv`)

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 模型唯一标识 |
| `name` | string | 模型名称 |
| `provider` | string | 提供商 |
| `inputPrice` | number | 输入价格 ($/1M tokens) |
| `cachedInputPrice` | number | 缓存命中价格 ($/1M tokens) |
| `outputPrice` | number | 输出价格 ($/1M tokens) |
| `contextWindow` | number | 上下文长度 |
| `features` | string | 功能标签 |

### 编码套餐数据 (`codingplan.csv`)

包含各平台编码助手的订阅套餐信息，如月费、季费、年费、调用限额等。

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助完善数据或改进功能！

```bash
# 1. Fork 本仓库
# 2. 创建特性分支
git checkout -b feature/amazing-feature

# 3. 提交更改
git commit -m 'feat: add amazing feature'

# 4. 推送到分支
git push origin feature/amazing-feature

# 5. 创建 Pull Request
```

---

## 👤 作者

<table>
<tr>
<td width="80">

[![ktovoz](https://github.com/ktovoz.png?size=60)](https://github.com/ktovoz)

</td>
<td>

**ktovoz**

[![Website](https://img.shields.io/badge/网站-ktovoz.com-blue?style=flat-square)](https://www.ktovoz.com)
[![GitHub](https://img.shields.io/badge/GitHub-@ktovoz-black?style=flat-square&logo=github)](https://github.com/ktovoz)

</td>
</tr>
</table>

---

## 📄 许可证

本项目基于 [Apache License 2.0](LICENSE) 开源。

---

<div align="center">

**[⬆ 返回顶部](#-llm-cost-rank)**

---

*数据更新日期: 2026-03-01*

</div>

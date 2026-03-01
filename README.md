# LLM Cost Rank

一个用于对比和排行 LLM API 成本的 Web 应用，帮助开发者快速了解各大 LLM 提供商的价格与功能特性。

## 功能特性

- **Token 计费列表** - 展示主流 LLM 模型的 API 价格对比，支持排序和筛选
- **编码套餐对比** - 为开发者优化的 LLM 编码订阅套餐价格对比
- **书签导航** - 个人常用服务和工具的快捷导航
- **深色/浅色主题** - 支持主题切换，保护眼睛
- **响应式设计** - 完美适配桌面端和移动端

## 页面导航

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | LLM API Token 计费列表 |
| 编码套餐 | `/coding` | 编码助手订阅套餐对比 |
| 更多 | `/more` | 更多功能和工具 |
| 书签 | `/bookmarks` | 个人书签收藏 |

## 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (React 19)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 组件**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **数据表格**: [TanStack Table](https://tanstack.com/table)
- **CSV 解析**: [PapaParse](https://www.papaparse.com/)
- **图标**: [Lucide React](https://lucide.dev/)
- **主题**: [next-themes](https://github.com/pacocoursey/next-themes)

## 快速开始

### 环境要求

- Node.js 20+
- npm / yarn / pnpm / bun

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

### 开发模式

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm run start
```

## Docker 部署

项目支持 Docker 容器化部署：

```bash
# 构建镜像
docker build -t llm-costrank .

# 运行容器
docker run -p 80:80 llm-costrank
```

或使用精简版 Dockerfile：

```bash
docker build -f Dockerfile.slim -t llm-costrank:slim .
```

## 数据结构

### LLM 模型数据 (`models.csv`)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 模型唯一标识 |
| name | string | 模型名称 |
| provider | string | 提供商 |
| inputPrice | number | 输入价格 ($/1M tokens) |
| cachedInputPrice | number | 缓存命中价格 ($/1M tokens) |
| outputPrice | number | 输出价格 ($/1M tokens) |
| contextWindow | number | 上下文长度 |
| features | string | 功能标签 (prefix_cache, vision, tool_calls, reasoning) |

### 编码套餐数据 (`codingplan.csv`)

包含各平台编码助手的订阅套餐信息，如月费、季费、年费、调用限额等。

## 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页 (Token 计费列表)
│   ├── coding/            # 编码套餐页面
│   ├── ai/                # AI 助手页面
│   ├── bookmarks/         # 书签页面
│   ├── more/              # 更多页面
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── ui/               # UI 基础组件 (shadcn/ui)
│   ├── navbar.tsx        # 导航栏
│   └── theme-toggle.tsx  # 主题切换
├── public/               # 静态资源
│   ├── models.csv        # LLM 模型数据
│   └── codingplan.csv    # 编码套餐数据
├── lib/                  # 工具函数
├── Dockerfile            # Docker 配置
├── nginx.conf            # Nginx 配置
└── package.json          # 项目配置
```

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助完善数据或改进功能。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 作者

**ktovoz**

- 网站: [ktovoz.com](https://www.ktovoz.com)
- GitHub: [@ktovoz](https://github.com/ktovoz)

## 许可证

本项目基于 [Apache License 2.0](LICENSE) 开源。

## 数据更新

价格数据会定期更新，更新日期显示在页面上。如发现数据有误或需要更新，欢迎提交 Issue 或 PR。

---

**最后更新**: 2026-03-01

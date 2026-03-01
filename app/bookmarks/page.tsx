'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  Book, GitBranch, HardDrive, Activity, Container,
  Server, Cloud, Shield, Gauge, Github, Languages
} from "lucide-react"

interface Site {
  name: string
  desc: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

export default function BookmarksPage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  const sites: Site[] = [
    { name: "博客", desc: "技术文章与生活记录", url: "https://www.ktovoz.com", icon: Book },
    { name: "代码仓库", desc: "Git 代码托管服务", url: "https://git.ktovoz.com", icon: GitBranch },
    { name: "存储空间", desc: "文件存储与分享", url: "https://openlist.ktovoz.com", icon: HardDrive },
    { name: "服务器监控", desc: "实时状态监控面板", url: "https://nezha.ktovoz.com", icon: Activity },
    { name: "镜像仓库", desc: "Docker 容器镜像服务", url: "https://dockerweb.ktovoz.com", icon: Container },
    { name: "认证中心", desc: "Logto 统一身份认证", url: "https://admin.ktovoz.com/console/get-started", icon: Shield },
    { name: "阿里云 1Panel", desc: "阿里云服务器运维面板", url: "https://alipanel.ktovoz.cn/5CkthYMAzM", icon: Server },
    { name: "京东云 1Panel", desc: "京东云服务器运维面板", url: "https://jdpanel.ktovoz.cn/j3EmzyWGdd", icon: Server },
    { name: "华为云 1Panel", desc: "华为云服务器运维面板", url: "https://huawei.ktovoz.cn/2SBaQ73r4R", icon: Server },
    { name: "FRP Dashboard", desc: "内网穿透控制台", url: "http://117.72.49.197:7500/static/#/", icon: Gauge },
    { name: "阿里云控制台", desc: "阿里云服务管理", url: "https://home.console.aliyun.com/home/dashboard/ProductAndService", icon: Cloud },
    { name: "京东云控制台", desc: "京东云服务管理", url: "https://console.jdcloud.com/next-overview", icon: Cloud },
    { name: "华为云控制台", desc: "华为云服务管理", url: "https://console.huaweicloud.com", icon: Cloud },
    { name: "GitHub", desc: "全球最大代码托管平台", url: "https://github.com", icon: Github },
    { name: "百度翻译", desc: "在线翻译服务", url: "https://fanyi.baidu.com", icon: Languages },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 pt-36">
      <h1 className={`mb-10 text-4xl font-bold tracking-tight sm:text-5xl ${
        isDark ? "text-gray-50" : "text-gray-900"
      }`}>
        <span className={isDark ? "text-sky-400" : "text-sky-500"}>Kto</span> 书签
      </h1>

      <div className="max-w-6xl w-full">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => {
            const Icon = site.icon
            return (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-start gap-4 rounded-2xl p-5 transition-all duration-200 ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                    : "bg-white/50 hover:bg-white/80 border border-black/5 hover:border-black/10 shadow-sm"
                }`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isDark
                    ? "bg-sky-500/20 text-sky-400 group-hover:bg-sky-500/30"
                    : "bg-sky-500/10 text-sky-600 group-hover:bg-sky-500/20"
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className={`font-semibold mb-1 ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}>
                    {site.name}
                  </h3>
                  <p className={`text-sm truncate ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {site.desc}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

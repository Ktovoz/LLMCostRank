'use client'

import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Mail, Globe, ArrowUpRight, Map, Database, ExternalLink, Github } from "lucide-react"

// 用于避免 SSR 水合问题的 store
const getServerSnapshot = () => false
const getClientSnapshot = () => true
const subscribe = () => () => {}

export default function MorePage() {
  const { resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  const links = [
    {
      icon: Github,
      description: "开源项目仓库",
      link: "https://github.com/Ktovoz/LLMCostRank",
      linkText: "LLMCostRank",
      external: true,
    },
    {
      icon: Mail,
      description: "需要更新数据？请联系",
      link: "mailto:ktovozz@qq.com",
      linkText: "ktovozz@qq.com",
    },
    {
      icon: Globe,
      description: "访问博客获取更多精彩内容",
      link: "https://ktovoz.com",
      linkText: "ktovoz.com",
      external: true,
    },
  ]

  const roadmapItems = [
    {
      title: "接入更多模型数据源",
      status: "planned" as const,
      description: "整合更多平台的模型价格数据，提供更全面的对比",
      sources: [
        { name: "OpenRouter", url: "https://openrouter.ai/", description: "统一的 LLM API 网关" },
        { name: "AIHubMix", url: "https://aihubmix.com/", description: "AI 模型聚合平台" },
      ],
    },
  ]

  return (
    <main className="flex flex-col">
      <section className="flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12 min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-8rem)]">
        {/* 路线图 */}
        <div className="w-full max-w-2xl mb-6 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
            <div className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl ${
              isDark ? "bg-violet-500/20" : "bg-violet-500/10"
            }`}>
              <Map className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ${isDark ? "text-violet-400" : "text-violet-500"}`} />
            </div>
            <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
              路线图
            </h2>
          </div>

          <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 ${
                  isDark
                    ? "bg-white/[0.03] border border-white/10"
                    : "bg-white/40 border border-black/5 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between mb-1.5 sm:mb-2 md:mb-3 gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Database className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isDark ? "text-violet-400" : "text-violet-500"}`} />
                    <h3 className={`font-semibold text-xs sm:text-sm md:text-base ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                      {item.title}
                    </h3>
                  </div>
                  <span className={`px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 text-xs font-medium rounded-full shrink-0 ${
                    isDark
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-amber-500/10 text-amber-600"
                  }`}>
                    计划中
                  </span>
                </div>
                <p className={`text-xs sm:text-sm mb-2.5 sm:mb-3 md:mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {item.description}
                </p>
                <div className="space-y-1.5 sm:space-y-2">
                  {item.sources.map((source, sIndex) => (
                    <a
                      key={sIndex}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl transition-all group ${
                        isDark
                          ? "bg-white/[0.03] hover:bg-white/[0.06] border border-white/5"
                          : "bg-white/50 hover:bg-black/[0.04] border border-black/5"
                      }`}
                    >
                      <div>
                        <span className={`text-xs sm:text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                          {source.name}
                        </span>
                        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                          {source.description}
                        </p>
                      </div>
                      <ExternalLink className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all shrink-0 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      } group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 联系方式 */}
        <div className="w-full max-w-md mt-4 sm:mt-6 md:mt-8 lg:mt-0">
          <div className={`rounded-xl sm:rounded-2xl p-1 sm:p-1.5 md:p-2 ${
            isDark
              ? "bg-white/[0.03] border border-white/10"
              : "bg-white/40 border border-black/5 shadow-sm"
          }`}>
            {links.map((item, index) => (
              <a
                key={item.description}
                href={item.link}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group flex items-center justify-between rounded-lg sm:rounded-xl px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-3.5 transition-all ${
                  isDark
                    ? "hover:bg-white/[0.06] text-gray-300 hover:text-gray-100"
                    : "hover:bg-black/[0.06] text-gray-600 hover:text-gray-900"
                } ${index !== links.length - 1 ? (isDark ? "border-b border-white/5" : "border-b border-black/5") : ""}`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                  <item.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  } group-hover:text-emerald-400 transition-colors`} />
                  <span className={`text-xs sm:text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {item.description}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                  <span className={`text-xs sm:text-sm font-medium ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}>
                    {item.linkText}
                  </span>
                  {item.external && (
                    <ArrowUpRight className={`h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 transition-all ${
                      isDark ? "text-gray-600" : "text-gray-400"
                    } group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400`} />
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

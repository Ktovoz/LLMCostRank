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
    <main className="flex-1 flex flex-col min-h-0 pt-20 sm:pt-28 md:pt-36 relative z-10">
      {/* 装饰性光晕 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 标题区域 */}
      <div className="text-center mb-10 sm:mb-16 px-4 relative z-10">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 ${
          isDark 
            ? "bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent" 
            : "bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent"
        }`}>
          更多与关于
        </h1>
        <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          探索项目的未来规划，或是与我们取得联系
        </p>
      </div>

      <section className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 max-w-7xl mx-auto w-full relative z-10">
        {/* 左侧：路线图 */}
        <div className="w-full lg:w-[60%] flex flex-col">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
              isDark ? "bg-violet-500/20 text-violet-400 border border-violet-500/20" : "bg-violet-100 text-violet-600 border border-violet-200"
            }`}>
              <Map className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight ${isDark ? "text-gray-100" : "text-gray-900"}`}>
              路线图
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 transition-all duration-300 hover:shadow-xl ${
                  isDark
                    ? "bg-[#0a0a0a]/60 border border-white/10 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]"
                    : "bg-white/80 border border-black/5 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                  <div className="flex items-center gap-2.5">
                    <Database className={`h-5 w-5 ${isDark ? "text-violet-400" : "text-violet-500"}`} />
                    <h3 className={`font-semibold text-lg sm:text-xl tracking-tight ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                      {item.title}
                    </h3>
                  </div>
                  <span className={`self-start sm:self-auto px-3 py-1 text-xs sm:text-sm font-semibold rounded-full shrink-0 ${
                    isDark
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-amber-50 text-amber-600 border border-amber-200"
                  }`}>
                    计划中
                  </span>
                </div>
                <p className={`text-sm sm:text-base mb-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {item.description}
                </p>
                <div className="space-y-2.5">
                  {item.sources.map((source, sIndex) => (
                    <a
                      key={sIndex}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all group ${
                        isDark
                          ? "bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10"
                          : "bg-black/[0.02] hover:bg-white border border-black/5 hover:border-black/10 hover:shadow-sm"
                      }`}
                    >
                      <div>
                        <span className={`text-sm sm:text-base font-semibold ${isDark ? "text-gray-200" : "text-gray-800"} group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors`}>
                          {source.name}
                        </span>
                        <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                          {source.description}
                        </p>
                      </div>
                      <div className={`p-2 rounded-full transition-colors ${
                        isDark ? "bg-white/5 group-hover:bg-violet-500/20" : "bg-black/5 group-hover:bg-violet-50"
                      }`}>
                        <ExternalLink className={`h-4 w-4 transition-all shrink-0 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        } group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：联系方式 */}
        <div className="w-full lg:w-[40%] flex flex-col mt-4 lg:mt-0">
          <div className={`rounded-2xl sm:rounded-3xl p-2 sm:p-3 transition-all duration-300 ${
            isDark
              ? "bg-[#0a0a0a]/60 border border-white/10 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]"
              : "bg-white/80 border border-black/5 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)]"
          }`}>
            {links.map((item, index) => (
              <a
                key={item.description}
                href={item.link}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group flex items-center justify-between rounded-xl sm:rounded-2xl px-4 py-4 sm:py-5 transition-all ${
                  isDark
                    ? "hover:bg-white/[0.08]"
                    : "hover:bg-black/[0.03]"
                } ${index !== links.length - 1 ? (isDark ? "border-b border-white/5" : "border-b border-black/5") : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors ${
                    isDark ? "bg-white/5 group-hover:bg-emerald-500/20" : "bg-black/5 group-hover:bg-emerald-50"
                  }`}>
                    <item.icon className={`h-5 w-5 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    } group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors`} />
                  </div>
                  <span className={`text-sm sm:text-base font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {item.description}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0 ml-11 sm:ml-0">
                  <span className={`text-sm sm:text-base font-semibold ${
                    isDark ? "text-gray-100 group-hover:text-emerald-400" : "text-gray-900 group-hover:text-emerald-600"
                  } transition-colors`}>
                    {item.linkText}
                  </span>
                  {item.external && (
                    <ArrowUpRight className={`h-4 w-4 transition-all ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    } group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500 dark:group-hover:text-emerald-400`} />
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

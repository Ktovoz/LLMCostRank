'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Mail, Globe, ArrowUpRight } from "lucide-react"

export default function MorePage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  const links = [
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

  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        {/* 主要内容 */}
        <div className="w-full max-w-md">
          <div className={`rounded-2xl p-2 ${
            isDark
              ? "bg-white/[0.03] border border-white/10"
              : "bg-white/40 border border-black/5 shadow-sm"
          }`}>
            {links.map((item, index) => (
              <a
                key={item.description}
                href={item.link}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all ${
                  isDark
                    ? "hover:bg-white/[0.06] text-gray-300 hover:text-gray-100"
                    : "hover:bg-black/[0.06] text-gray-600 hover:text-gray-900"
                } ${index !== links.length - 1 ? (isDark ? "border-b border-white/5" : "border-b border-black/5") : ""}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`h-5 w-5 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  } group-hover:text-emerald-400 transition-colors`} />
                  <span className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {item.description}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}>
                    {item.linkText}
                  </span>
                  {item.external && (
                    <ArrowUpRight className={`h-4 w-4 transition-all ${
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

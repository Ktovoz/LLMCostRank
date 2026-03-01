'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Bot, Sparkles } from "lucide-react"

export default function AIPage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 ${
          isDark
            ? "bg-gradient-to-br from-violet-400 to-purple-600"
            : "bg-gradient-to-br from-violet-500 to-purple-600"
        }`}>
          <Bot className="h-10 w-10 text-white" />
        </div>
        <h1 className={`mb-4 text-4xl font-bold tracking-tight ${
          isDark ? "text-gray-50" : "text-gray-900"
        }`}>
          AI 助手
        </h1>
        <p className={`mb-12 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          探索智能工具与服务
        </p>

        <div className={`rounded-2xl p-8 max-w-md text-center ${
          isDark
            ? "bg-white/5 border border-white/10"
            : "bg-white/50 border border-black/5 shadow-sm"
        }`}>
          <Sparkles className={`h-8 w-8 mx-auto mb-4 ${isDark ? "text-violet-400" : "text-violet-500"}`} />
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            敬请期待...
          </p>
        </div>
      </section>
    </main>
  )
}

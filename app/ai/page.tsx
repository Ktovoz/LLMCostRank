'use client'

import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Bot, Sparkles } from "lucide-react"

// 用于避免 SSR 水合问题的 store
const getServerSnapshot = () => false
const getClientSnapshot = () => true
const subscribe = () => () => {}

export default function AIPage() {
  const { resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 pt-20 md:py-20">
        <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl mb-4 md:mb-6 ${
          isDark
            ? "bg-gradient-to-br from-violet-400 to-purple-600"
            : "bg-gradient-to-br from-violet-500 to-purple-600"
        }`}>
          <Bot className="h-8 w-8 md:h-10 md:w-10 text-white" />
        </div>
        <h1 className={`mb-3 md:mb-4 text-3xl md:text-4xl font-bold tracking-tight ${
          isDark ? "text-gray-50" : "text-gray-900"
        }`}>
          AI 助手
        </h1>
        <p className={`mb-8 md:mb-12 text-base md:text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          探索智能工具与服务
        </p>

        <div className={`rounded-2xl p-6 md:p-8 max-w-sm md:max-w-md text-center ${
          isDark
            ? "bg-white/5 border border-white/10"
            : "bg-white/50 border border-black/5 shadow-sm"
        }`}>
          <Sparkles className={`h-6 w-6 md:h-8 md:w-8 mx-auto mb-3 md:mb-4 ${isDark ? "text-violet-400" : "text-violet-500"}`} />
          <p className={`text-sm md:text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            敬请期待...
          </p>
        </div>
      </section>
    </main>
  )
}

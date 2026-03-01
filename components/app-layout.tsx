'use client'

import { Navbar } from "@/components/navbar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentYear, setCurrentYear] = useState(2025)

  useEffect(() => {
    setMounted(true)
    setCurrentYear(new Date().getFullYear())
  }, [])

  if (!mounted) {
    return (
      <div className="animate-gradient h-screen bg-gradient-to-r from-stone-900 via-zinc-900 to-slate-900">
        {children}
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"
  const yearRange = currentYear === 2025 ? "2025" : `2025-${currentYear}`

  return (
    <div className={`animate-gradient min-h-screen flex flex-col bg-gradient-to-r ${
      isDark
        ? "from-stone-900 via-zinc-900 to-slate-900"
        : "from-indigo-50 via-purple-50 to-pink-50"
    }`}>
      <Navbar />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* 内容区域 */}
      <div className="flex-1">
        {children}
      </div>

      {/* 页脚 */}
      <footer className={`py-4 text-center ${
        isDark ? "text-gray-500" : "text-gray-400"
      }`}>
        <p className="text-sm">© {yearRange} Powered by Kto. All rights reserved.</p>
      </footer>
    </div>
  )
}

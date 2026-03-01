"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

// 用于 SSR 的默认快照
const getServerSnapshot = () => false
const getClientSnapshot = () => true
const subscribe = () => () => {}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  // 使用 useSyncExternalStore 替代 useState + useEffect 模式
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`p-2 rounded-full transition-all duration-200 border hover:scale-105 active:scale-95 flex items-center justify-center ${
        isDark
          ? "bg-[#161618] border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
          : "bg-white border-black/5 text-gray-700 hover:bg-black/5 hover:text-gray-900"
      }`}
      aria-label="切换主题"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <span className={`absolute transition-all duration-300 ease-out ${isDark ? 'opacity-0 scale-50 -rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
          <Sun className="h-5 w-5 text-amber-500" />
        </span>
        <span className={`absolute transition-all duration-300 ease-out ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'}`}>
          <Moon className="h-5 w-5 text-sky-400" />
        </span>
      </div>
    </button>
  )
}

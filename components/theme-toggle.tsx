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
      className={`p-2 rounded-xl transition-all hover:scale-110 active:scale-95 ${
        isDark
          ? "bg-white/10 hover:bg-white/15"
          : "bg-black/5 hover:bg-black/10"
      }`}
      aria-label="切换主题"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-sky-400" />
      ) : (
        <Sun className="h-5 w-5 text-amber-500" />
      )}
    </button>
  )
}

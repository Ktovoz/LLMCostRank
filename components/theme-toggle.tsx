"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-4 right-4 z-50 transition-all hover:scale-110"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-6 w-6 text-sky-400" />
      ) : (
        <Sun className="h-6 w-6 text-amber-500" />
      )}
    </button>
  )
}

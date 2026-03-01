'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef, useCallback } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { label: "首页", href: "/" },
  { label: "编码套餐", href: "/coding" },
  { label: "更多", href: "/more" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const mounted = typeof window !== 'undefined'
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 关闭移动菜单当路由变化时
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // 键盘快捷键切换菜单
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = navItems.findIndex(item => {
        if (item.href === "/") {
          return pathname === "/"
        }
        return pathname.startsWith(item.href)
      })

      if (e.key === "ArrowLeft" && currentIndex > 0) {
        router.push(navItems[currentIndex - 1].href)
      } else if (e.key === "ArrowRight" && currentIndex < navItems.length - 1) {
        router.push(navItems[currentIndex + 1].href)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [pathname, router])

  // 获取当前激活的索引 - 使用 useCallback 缓存
  const getActiveIndex = useCallback(() => {
    return navItems.findIndex(item => {
      if (item.href === "/") {
        return pathname === "/"
      }
      return pathname.startsWith(item.href)
    })
  }, [pathname])

  // 更新指示器位置
  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : getActiveIndex()

    if (targetIndex !== -1 && itemRefs.current[targetIndex]) {
      const item = itemRefs.current[targetIndex]
      if (item) {
        setIndicatorStyle({
          width: item.offsetWidth,
          left: item.offsetLeft,
        })
      }
    }
  }, [pathname, mounted, hoveredIndex, getActiveIndex])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"
  const activeIndex = getActiveIndex()

  return (
    <>
      {/* 桌面端导航栏 - md 及以上显示 */}
      <nav
        className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 nav-capsule transition-all duration-300 ease-out ${
          scrolled
            ? isDark
              ? "bg-white/[0.08] shadow-lg shadow-black/20 backdrop-blur-lg"
              : "bg-white/50 shadow-lg shadow-black/10 backdrop-blur-lg"
            : isDark
              ? "bg-white/[0.06] backdrop-blur-md"
              : "bg-white/40 backdrop-blur-md"
        } ${
          isDark
            ? scrolled ? "border border-white/10" : "border border-white/5"
            : scrolled ? "border border-black/5" : "border border-black/5"
        }`}
      >
        <div ref={navRef} className="relative flex items-center gap-2 px-3 py-2">
          {/* 滑动指示器 - 凹陷效果 */}
          <div
            className={`absolute top-2 h-[calc(100%-16px)] transition-all duration-300 ease-out rounded-xl ${
              isDark
                ? "bg-black/[0.25] border border-black/[0.15] shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]"
                : "bg-black/[0.04] border border-black/[0.06] shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]"
            }`}
            style={{
              width: indicatorStyle.width,
              transform: `translateX(${indicatorStyle.left - 12}px)`,
            }}
          />

          {navItems.map((item, index) => {
            const isActive = index === activeIndex

            return (
              <Link
                key={item.href}
                ref={(el) => { itemRefs.current[index] = el }}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative z-10 px-6 py-1.5 text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? isDark ? "text-white" : "text-gray-900"
                    : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* 移动端导航栏 - md 以下显示 */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? isDark
              ? "bg-[#0a0a0a]/95 shadow-lg shadow-black/20 backdrop-blur-lg"
              : "bg-white/95 shadow-lg shadow-black/10 backdrop-blur-lg"
            : isDark
              ? "bg-[#0a0a0a]/80 backdrop-blur-md"
              : "bg-white/80 backdrop-blur-md"
        } ${
          isDark ? "border-b border-white/10" : "border-b border-black/5"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            className={`text-lg font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            LLMCostRank
          </Link>

          <div className="flex items-center gap-2">
            {/* 主题切换按钮 */}
            <ThemeToggle />

            {/* 汉堡菜单按钮 */}
            <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "text-gray-300 hover:bg-white/10"
                : "text-gray-700 hover:bg-black/5"
            }`}
            aria-label="切换菜单"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          </div>
        </div>

        {/* 移动端菜单下拉 */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className={`px-4 pb-4 space-y-1 border-t ${
            isDark ? "border-white/10" : "border-black/5"
          }`}>
            {navItems.map((item, index) => {
              const isActive = index === activeIndex

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive
                      ? isDark
                        ? "bg-white/10 text-white"
                        : "bg-black/5 text-gray-900"
                      : isDark
                        ? "text-gray-400 hover:bg-white/5 hover:text-white"
                        : "text-gray-600 hover:bg-black/[0.02] hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* 移动端菜单打开时的遮罩 */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

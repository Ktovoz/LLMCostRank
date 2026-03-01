'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef, useCallback, useSyncExternalStore } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { label: "首页", href: "/" },
  { label: "编码套餐", href: "/coding" },
  { label: "更多", href: "/more" },
]

// 用于检测客户端挂载的 store
const getServerSnapshot = () => false
const getClientSnapshot = () => true
const subscribe = () => () => {}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  // 使用 ref 存储 pathname 来检测变化
  const prevPathnameRef = useRef(pathname)
  // 使用 ref 存储 setTimeout id
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 使用 ref 跟踪 pathname 变化，异步关闭菜单
  // 这样可以避免在 effect 中同步调用 setState
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      // 清除之前的 timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      // 使用 setTimeout 将状态更新推迟到下一个事件循环
      // 这样就不会被 React Compiler 认为是同步 setState
      timeoutRef.current = setTimeout(() => {
        setMobileMenuOpen(false)
        prevPathnameRef.current = pathname
      }, 0)
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
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
  }, [pathname, hoveredIndex, getActiveIndex])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"
  const activeIndex = getActiveIndex()

  return (
    <>
      {/* 桌面端导航栏 - md 及以上显示 */}
      <nav
        className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-2xl transition-all duration-300 ease-out ${
          scrolled
            ? isDark
              ? "bg-[#161618] shadow-xl shadow-black/40 border border-white/10"
              : "bg-white shadow-xl shadow-black/5 border border-black/5"
            : isDark
              ? "bg-[#161618] border border-white/10"
              : "bg-white border border-black/5"
        }`}
      >
        <div ref={navRef} className="relative flex items-center gap-2 px-3 py-2">
          {/* 滑动指示器 - 选中效果 */}
          <div
            className={`absolute top-2 h-[calc(100%-16px)] transition-all duration-300 ease-out rounded-xl ${
              isDark
                ? "bg-white/10 border border-white/5 shadow-sm"
                : "bg-gray-100 border border-black/5 shadow-sm"
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
          scrolled || mobileMenuOpen
            ? isDark
              ? "bg-[#111111] shadow-xl shadow-black/40 border-b border-white/10"
              : "bg-white shadow-xl shadow-black/5 border-b border-black/5"
            : isDark
              ? "bg-transparent"
              : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          {/* Logo */}
          <Link
            href="/"
            className={`text-xl font-extrabold tracking-tight transition-colors ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            LLMCostRank
          </Link>

          <div className="flex items-center gap-3">
            {/* 主题切换按钮 */}
            <ThemeToggle />

            {/* 汉堡菜单按钮 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition-all duration-200 border ${
                isDark
                  ? mobileMenuOpen ? "bg-white/10 border-white/10 text-white" : "bg-[#161618] border-white/10 text-gray-300 hover:bg-white/10"
                  : mobileMenuOpen ? "bg-black/5 border-black/5 text-gray-900" : "bg-white border-black/5 text-gray-700 hover:bg-black/5"
              }`}
              aria-label="切换菜单"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span className={`absolute transition-all duration-300 ease-out ${mobileMenuOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                  <Menu className="w-5 h-5" />
                </span>
                <span className={`absolute transition-all duration-300 ease-out ${mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <X className="w-5 h-5" />
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* 移动端菜单下拉 */}
        <div
          className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top ${
            mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className={`px-4 pb-6 pt-2 space-y-2 ${
            isDark ? "bg-[#111111]" : "bg-white"
          }`}>
            {navItems.map((item, index) => {
              const isActive = index === activeIndex

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center w-full px-5 py-3.5 rounded-2xl text-[17px] font-semibold transition-all duration-200 relative overflow-hidden group ${
                    isActive
                      ? isDark
                        ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/10"
                        : "bg-gray-100 text-gray-900 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-black/5"
                      : isDark
                        ? "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                  }`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <div className={`absolute left-0 w-1.5 h-1/2 rounded-r-full top-1/2 -translate-y-1/2 ${
                      isDark ? "bg-white" : "bg-gray-900"
                    }`} />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* 移动端菜单打开时的遮罩 */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ease-out"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"

const navItems = [
  { label: "首页", href: "/" },
  { label: "编码套餐", href: "/coding" },
  { label: "更多", href: "/more" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // 获取当前激活的索引
  const getActiveIndex = () => {
    return navItems.findIndex(item => {
      if (item.href === "/") {
        return pathname === "/"
      }
      return pathname.startsWith(item.href)
    })
  }

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
  }, [pathname, mounted, hoveredIndex])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"
  const activeIndex = getActiveIndex()

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 nav-capsule transition-all duration-300 ease-out ${
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
  )
}

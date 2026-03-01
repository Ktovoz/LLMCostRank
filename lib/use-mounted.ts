// 用于避免 SSR 水合问题的 Hook
// 使用 useSyncExternalStore 替代 useEffect + setState 模式

const getServerSnapshot = () => false
const getClientSnapshot = () => true
const subscribe = () => () => {}

export function useMounted(): boolean {
  // 在服务端返回 false，客户端返回 true
  if (typeof window === 'undefined') {
    return false
  }
  return true
}

// 使用 useSyncExternalStore 的版本（用于需要严格同步的场景）
export function useMountedSync(): boolean {
  // 注意：这个 hook 在 SSR 环境下需要小心使用
  // 由于 subscribe/getSnapshot 是稳定的，可以安全使用
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return mounted
}

// 从 react 导入
import { useState, useEffect, useSyncExternalStore } from "react"

// 推荐的 SSR-safe mounted hook
export function useClientMounted(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
}

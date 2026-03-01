// 用于避免 SSR 水合问题的 Hook
// 提供多种策略来处理客户端挂载检测

import { useSyncExternalStore } from "react"

const getServerSnapshot = () => false
const getClientSnapshot = () => true
const subscribe = () => () => {}

/**
 * 推荐的 SSR-safe mounted hook
 * 使用 useSyncExternalStore 避免在 effect 中调用 setState
 */
export function useClientMounted(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
}

/**
 * 简化的服务端/客户端检测
 * 在服务端返回 false，在浏览器返回 true
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
}

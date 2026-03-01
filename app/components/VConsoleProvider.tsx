'use client'

import { useEffect } from 'react'

export function VConsoleProvider() {
  useEffect(() => {
    // 只在开发环境启用 VConsole
    if (process.env.NODE_ENV === 'development') {
      import('vconsole').then(({ default: VConsole }) => {
        new VConsole({
          theme: 'light',
        })
      })
    }
  }, [])

  return null
}

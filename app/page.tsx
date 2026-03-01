'use client'

import { useTheme } from "next-themes"
import { useEffect, useState, useSyncExternalStore } from "react"
import Papa from "papaparse"
import { LLMModel } from "./columns"
import { DataTable } from "./data-table"

// 用于避免 SSR 水合问题的 store
const getServerSnapshot = () => true
const getClientSnapshot = () => true
const subscribe = () => () => {}

// CSV 行数据类型
interface CSVRow {
  id: string
  name: string
  provider: string
  inputPrice: string
  cachedInputPrice?: string
  outputPrice: string
  contextWindow: string
  features?: string
}

export default function Home() {
  const { resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const [data, setData] = useState<LLMModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 加载 CSV 数据
    fetch('/models_real.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = (results.data as CSVRow[]).map((row) => ({
              id: row.id,
              name: row.name,
              provider: row.provider,
              inputPrice: parseFloat(row.inputPrice),
              cachedInputPrice: row.cachedInputPrice ? parseFloat(row.cachedInputPrice) : undefined,
              outputPrice: parseFloat(row.outputPrice),
              contextWindow: parseInt(row.contextWindow),
              features: row.features ? row.features.split('|').filter((f: string) => f.trim()) : [],
            }))
            setData(parsedData)
            setLoading(false)
          },
          error: (error: Error) => {
            console.error('CSV 解析错误:', error)
            setLoading(false)
          },
        })
      })
      .catch((error) => {
        console.error('加载 CSV 失败:', error)
        setLoading(false)
      })
  }, [])

  if (!mounted || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
        <p className="mt-4 text-gray-500">加载数据中...</p>
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="flex flex-col items-center px-4 py-8 pt-20 md:pt-36">
      {/* 主标题区域 */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 md:mb-4 ${
          isDark ? "text-gray-50" : "text-gray-900"
        }`}>
          Token 计费列表
        </h1>
        <p className={`text-base sm:text-lg md:text-xl ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          LLM API 成本对比与排行
        </p>
        <p className={`text-xs sm:text-sm mt-2 ${
          isDark ? "text-gray-500" : "text-gray-400"
        }`}>
          更新时间：2026-03-01
        </p>
      </div>

      {/* 数据表格 */}
      <div className={`w-full max-w-6xl p-3 sm:p-4 md:p-6 rounded-2xl backdrop-blur-sm ${
        isDark
          ? "bg-black/30 border border-white/10"
          : "bg-white/70 border border-black/10 shadow-lg shadow-black/5"
      }`}>
        <DataTable columns={[]} data={data} />
      </div>
    </div>
  )
}

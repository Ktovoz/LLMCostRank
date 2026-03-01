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
    <div className="flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 pt-20 sm:pt-28 md:pt-36">
      {/* 主标题区域 */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16 relative z-10">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 ${
          isDark 
            ? "bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-sm" 
            : "bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent drop-shadow-sm"
        }`}>
          Token 计费列表
        </h1>
        <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium mb-3 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          LLM API 成本全网对比，找到最具性价比的模型
        </p>
        <p className={`text-xs sm:text-sm font-mono ${
          isDark ? "text-gray-600" : "text-gray-400"
        }`}>
          Updated: 2026-03-01
        </p>
      </div>

      {/* 数据表格 */}
      <div className={`w-full max-w-7xl p-3 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl relative z-10 transition-all duration-500 hover:shadow-2xl ${
        isDark
          ? "bg-[#0a0a0a]/60 border border-white/10 shadow-[0_0_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          : "bg-white/70 border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl"
      }`}>
        <DataTable columns={[]} data={data} />
      </div>
    </div>
  )
}

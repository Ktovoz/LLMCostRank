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
      <div className="text-center mb-10 sm:mb-16 md:mb-20 relative z-10">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tight mb-6 sm:mb-8 leading-tight ${
          isDark 
            ? "bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" 
            : "bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
        }`}>
          Token 计费列表
        </h1>
        <p className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-medium mb-4 tracking-wide ${
          isDark ? "text-neutral-400" : "text-slate-600"
        }`}>
          LLM API 成本全网对比，找到最具性价比的模型
        </p>
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border bg-opacity-50 backdrop-filter-none">
          <span className={`text-xs sm:text-sm font-mono tracking-wider font-medium ${
            isDark ? "text-neutral-500 border-neutral-800" : "text-slate-500 border-slate-200"
          }`}>
            UPDATED: 2026-03-01
          </span>
        </div>
      </div>

      {/* 数据表格 */}
      <div className={`w-full max-w-7xl p-3 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl relative z-10 transition-all duration-500 hover:shadow-2xl ${
        isDark
          ? "bg-[#0a0a0a]/95 border border-white/10 shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)]"
          : "bg-white/95 border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]"
      }`}>
        <DataTable columns={[]} data={data} />
      </div>
    </div>
  )
}

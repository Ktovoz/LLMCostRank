'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Papa from "papaparse"
import { codingColumns, LLMModel } from "./columns"
import { DataTable } from "./data-table"

export default function CodingPage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<LLMModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // 从 codingplan.csv 加载数据
    fetch('/codingplan.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data.map((row: any) => ({
              id: row.id,
              rank: parseInt(row.rank),
              name: row.name,
              plan: row.plan,
              provider: row.provider,
              monthly: row.monthly,
              quarterly: row.quarterly,
              yearly: row.yearly,
              limit: row.limit,
              calculationMethod: row.calculationMethod,
              supportModel: row.supportModel,
              inputPrice: parseFloat(row.inputPrice),
              outputPrice: parseFloat(row.outputPrice),
              contextWindow: parseInt(row.contextWindow),
              category: row.category as "flagship" | "advanced" | "standard" | "budget",
              windowQuota: row.windowQuota,
              monthlyToken: row.monthlyToken,
              quarterlyToken: row.quarterlyToken,
              yearlyToken: row.yearlyToken,
              weeklyLimit: row.weeklyLimit,
              monthlyLimit: row.monthlyLimit,
              remark: row.remark,
            }))
            setData(parsedData)
            setLoading(false)
          },
          error: (error) => {
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
    <div className="flex flex-col items-center px-4 py-8 pt-36">
      {/* 主标题区域 */}
      <div className="text-center mb-8">
        <h1 className={`text-5xl sm:text-6xl font-bold tracking-tight mb-4 ${
          isDark ? "text-gray-50" : "text-gray-900"
        }`}>
          编码套餐
        </h1>
        <p className={`text-lg sm:text-xl ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          为开发者优化的 LLM 成本对比
        </p>
        <p className={`text-sm mt-2 ${
          isDark ? "text-gray-500" : "text-gray-400"
        }`}>
          更新时间：2026-03-01
        </p>
      </div>

      {/* 数据表格 */}
      <div className={`w-full max-w-[1800px] p-6 rounded-2xl backdrop-blur-sm ${
        isDark
          ? "bg-black/30 border border-white/10"
          : "bg-white/70 border border-black/10 shadow-lg shadow-black/5"
      }`}>
        <DataTable columns={codingColumns} data={data} initialSorting={[{ id: "id", desc: false }]} />
      </div>
    </div>
  )
}

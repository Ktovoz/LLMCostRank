"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type LLMModel = {
  id: string
  name: string
  provider: string
  inputPrice: number  // $/1M tokens
  cachedInputPrice?: number // 缓存命中价格 $/1M tokens
  outputPrice: number // $/1M tokens
  contextWindow: number
  features: string[] // 功能列表: prefix_cache, vision, tool_calls, reasoning
}

// 功能配置 - 移动端使用更短的标签
export const featureConfig: Record<string, { label: string; shortLabel: string; className: string }> = {
  prefix_cache: {
    label: "前缀缓存",
    shortLabel: "缓存",
    className: "bg-blue-500/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300"
  },
  vision: {
    label: "视觉",
    shortLabel: "视觉",
    className: "bg-purple-500/15 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300"
  },
  tool_calls: {
    label: "工具调用",
    shortLabel: "工具",
    className: "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300"
  },
  reasoning: {
    label: "推理",
    shortLabel: "推理",
    className: "bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300"
  },
}

export const columns: ColumnDef<LLMModel>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 px-2 sm:px-4"
        >
          <span className="text-xs sm:text-sm">模型</span>
          <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium text-xs sm:text-sm">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "provider",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 px-2 sm:px-4"
        >
          <span className="text-xs sm:text-sm">提供商</span>
          <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-xs sm:text-sm">{row.getValue("provider")}</div>
    },
  },
  {
    accessorKey: "inputPrice",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2 px-2 sm:px-4"
          >
            <span className="text-xs sm:text-sm">输入<span className="hidden sm:inline">价格</span></span>
            <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const price = row.getValue("inputPrice") as number
      const cachedPrice = row.original.cachedInputPrice
      return (
        <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">
          ${price.toFixed(2)}
          {cachedPrice !== undefined && cachedPrice < price && (
            <span className="ml-0.5 sm:ml-1 text-green-500">
              <span className="sm:hidden">({cachedPrice.toFixed(1)})</span>
              <span className="hidden sm:inline">(${cachedPrice.toFixed(2)})</span>
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "outputPrice",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2 px-2 sm:px-4"
          >
            <span className="text-xs sm:text-sm">输出<span className="hidden sm:inline">价格</span></span>
            <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const price = row.getValue("outputPrice") as number
      return <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">${price.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "contextWindow",
    header: () => <div className="text-right text-xs sm:text-sm">上下文</div>,
    cell: ({ row }) => {
      const ctx = row.getValue("contextWindow") as number
      return <div className="text-right pr-2 sm:pr-4 text-xs sm:text-sm">{(ctx / 1000).toFixed(0)}K</div>
    },
  },
  {
    accessorKey: "features",
    header: () => <span className="text-xs sm:text-sm">功能</span>,
    cell: ({ row }) => {
      const features = row.getValue("features") as string[]
      if (!features || features.length === 0) return null

      return (
        <div className="flex flex-wrap gap-0.5 sm:gap-1">
          {features.map((feature) => {
            const config = featureConfig[feature]
            if (!config) return null
            return (
              <span
                key={feature}
                className={`px-1 sm:px-1.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
              >
                <span className="sm:hidden">{config.shortLabel}</span>
                <span className="hidden sm:inline">{config.label}</span>
              </span>
            )
          })}
        </div>
      )
    },
  },
]

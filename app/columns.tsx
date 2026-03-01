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

// 功能配置
export const featureConfig: Record<string, { label: string; className: string }> = {
  prefix_cache: { label: "前缀缓存", className: "bg-blue-500/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300" },
  vision: { label: "视觉", className: "bg-purple-500/15 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300" },
  tool_calls: { label: "工具调用", className: "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300" },
  reasoning: { label: "推理", className: "bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300" },
}

export const columns: ColumnDef<LLMModel>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          模型名称
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "provider",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          提供商
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
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
            className="-mr-2"
          >
            输入价格 (缓存命中)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const price = row.getValue("inputPrice") as number
      const cachedPrice = row.original.cachedInputPrice
      return (
        <div className="text-right font-mono pr-4">
          ${price.toFixed(2)}
          {cachedPrice !== undefined && cachedPrice < price && (
            <span className="ml-1">
              (${cachedPrice.toFixed(2)})
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
            className="-mr-2"
          >
            输出价格
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const price = row.getValue("outputPrice") as number
      return <div className="text-right font-mono pr-4">${price.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "contextWindow",
    header: () => <div className="text-right">上下文长度</div>,
    cell: ({ row }) => {
      const ctx = row.getValue("contextWindow") as number
      return <div className="text-right pr-4">{(ctx / 1000).toFixed(0)}K</div>
    },
  },
  {
    accessorKey: "features",
    header: "功能",
    cell: ({ row }) => {
      const features = row.getValue("features") as string[]
      if (!features || features.length === 0) return null

      return (
        <div className="flex flex-wrap gap-1">
          {features.map((feature) => {
            const config = featureConfig[feature]
            if (!config) return null
            return (
              <span
                key={feature}
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}
              >
                {config.label}
              </span>
            )
          })}
        </div>
      )
    },
  },
]

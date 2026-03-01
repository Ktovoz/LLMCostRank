"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type LLMModel = {
  id: string
  rank: number
  name: string
  plan: string
  provider: string
  monthly: string
  quarterly: string
  yearly: string
  limit: string
  calculationMethod: string
  supportModel: string
  inputPrice: number
  outputPrice: number
  contextWindow: number
  category: "flagship" | "advanced" | "standard" | "budget"
  windowQuota: string
  monthlyToken: string
  quarterlyToken: string
  yearlyToken: string
  weeklyLimit: string
  monthlyLimit: string
  remark: string
}

export const codingColumns: ColumnDef<LLMModel>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2 px-2 sm:px-4"
          >
            <span className="hidden sm:inline">ID</span>
            <span className="sm:hidden">#</span>
            <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string
      return <div className="text-center font-bold text-sm">{id}</div>
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 px-2 sm:px-4"
        >
          <span className="text-xs sm:text-sm">套餐</span>
          <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return <div className="font-medium text-xs sm:text-sm">{name}</div>
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
      const provider = row.getValue("provider") as string
      return <div className="text-xs sm:text-sm">{provider}</div>
    },
  },
  {
    accessorKey: "monthly",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2 px-2 sm:px-4"
          >
            <span className="text-xs sm:text-sm">月度</span>
            <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("monthly") as string
      if (value === "-") return <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">-</div>

      // 支持 "正价|优惠价" 格式
      if (value.includes("|")) {
        const [original, discount] = value.split("|")
        return (
          <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">
            <span className="text-gray-500 line-through hidden sm:inline">￥{original}</span>
            <span className="text-red-500 sm:ml-1">￥{discount}</span>
          </div>
        )
      }

      return <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">￥{value}</div>
    },
  },
  {
    accessorKey: "quarterly",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2 px-2 sm:px-4"
          >
            <span className="text-xs sm:text-sm">季度</span>
            <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("quarterly") as string
      if (value === "-") return <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">-</div>

      // 支持 "正价|优惠价" 格式
      if (value.includes("|")) {
        const [original, discount] = value.split("|")
        return (
          <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">
            <span className="text-gray-500 line-through hidden sm:inline">￥{original}</span>
            <span className="text-red-500 sm:ml-1">￥{discount}</span>
          </div>
        )
      }

      return <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">￥{value}</div>
    },
  },
  {
    accessorKey: "yearly",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2 px-2 sm:px-4"
          >
            <span className="text-xs sm:text-sm">年度</span>
            <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("yearly") as string
      if (value === "-") return <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">-</div>

      // 支持 "正价|优惠价" 格式
      if (value.includes("|")) {
        const [original, discount] = value.split("|")
        return (
          <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">
            <span className="text-gray-500 line-through hidden sm:inline">￥{original}</span>
            <span className="text-red-500 sm:ml-1">￥{discount}</span>
          </div>
        )
      }

      return <div className="text-right font-mono pr-2 sm:pr-4 text-xs sm:text-sm">￥{value}</div>
    },
  },
  {
    accessorKey: "limit",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2 px-2 sm:px-4"
          >
            <span className="text-xs sm:text-sm">限额</span>
            <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("limit") as string
      const [weekly, monthly] = value.split("/")

      const hasWeekly = weekly && weekly !== "无限额" && weekly !== "无"
      const hasMonthly = monthly && monthly !== "无限额" && monthly !== "无"

      if (!hasWeekly && !hasMonthly) {
        return (
          <div className="text-center">
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-500/15 text-gray-600 dark:bg-gray-400/20 dark:text-gray-300">
              无
            </span>
          </div>
        )
      }

      return (
        <div className="text-center flex justify-center gap-0.5 sm:gap-1">
          {hasWeekly && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
              周
            </span>
          )}
          {hasMonthly && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-purple-500/15 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300">
              月
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "calculationMethod",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 px-2 sm:px-4"
        >
          <span className="text-xs sm:text-sm">计算</span>
          <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const method = row.getValue("calculationMethod") as string
      return <div className="font-medium text-xs sm:text-sm">{method}</div>
    },
  },
  {
    accessorKey: "windowQuota",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 px-2 sm:px-4"
        >
          <span className="text-xs sm:text-sm">窗口</span>
          <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const windowQuota = row.getValue("windowQuota") as string
      return <div className="font-medium text-xs sm:text-sm">{windowQuota}</div>
    },
  },
  {
    accessorKey: "remark",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 px-2 sm:px-4"
        >
          <span className="text-xs sm:text-sm">备注</span>
          <ArrowUpDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const remark = row.getValue("remark") as string
      return <div className="font-medium text-xs sm:text-sm max-w-[100px] sm:max-w-none truncate">{remark}</div>
    },
  },
]

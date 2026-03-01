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
            className="-mr-2"
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string
      return <div className="text-center font-bold">{id}</div>
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          套餐名称
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return <div className="font-medium">{name}</div>
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
    accessorKey: "monthly",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2"
          >
            月度
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("monthly") as string
      if (value === "-") return <div className="text-right font-mono pr-4">-</div>
      
      // 支持 "正价|优惠价" 格式
      if (value.includes("|")) {
        const [original, discount] = value.split("|")
        return (
          <div className="text-right font-mono pr-4">
            <span className="text-gray-500 line-through">￥{original}</span>
            <span className="text-red-500 ml-1">(￥{discount})</span>
          </div>
        )
      }
      
      return <div className="text-right font-mono pr-4">￥{value}</div>
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
            className="-mr-2"
          >
            季度
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("quarterly") as string
      if (value === "-") return <div className="text-right font-mono pr-4">-</div>
      
      // 支持 "正价|优惠价" 格式
      if (value.includes("|")) {
        const [original, discount] = value.split("|")
        return (
          <div className="text-right font-mono pr-4">
            <span className="text-gray-500 line-through">￥{original}</span>
            <span className="text-red-500 ml-1">(￥{discount})</span>
          </div>
        )
      }
      
      return <div className="text-right font-mono pr-4">￥{value}</div>
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
            className="-mr-2"
          >
            年度
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("yearly") as string
      if (value === "-") return <div className="text-right font-mono pr-4">-</div>
      
      // 支持 "正价|优惠价" 格式
      if (value.includes("|")) {
        const [original, discount] = value.split("|")
        return (
          <div className="text-right font-mono pr-4">
            <span className="text-gray-500 line-through">￥{original}</span>
            <span className="text-red-500 ml-1">(￥{discount})</span>
          </div>
        )
      }
      
      return <div className="text-right font-mono pr-4">￥{value}</div>
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
            className="-mr-2"
          >
            限额
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-500/15 text-gray-600 dark:bg-gray-400/20 dark:text-gray-300">
              无
            </span>
          </div>
        )
      }
      
      return (
        <div className="text-center flex justify-center gap-1">
          {hasWeekly && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
              周
            </span>
          )}
          {hasMonthly && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/15 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300">
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
          className="-ml-4"
        >
          计算方式
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const method = row.getValue("calculationMethod") as string
      return <div className="font-medium">{method}</div>
    },
  },
  {
    accessorKey: "windowQuota",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          窗口额度
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const windowQuota = row.getValue("windowQuota") as string
      return <div className="font-medium">{windowQuota}</div>
    },
  },
  {
    accessorKey: "remark",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          备注
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const remark = row.getValue("remark") as string
      return <div className="font-medium text-sm">{remark}</div>
    },
  },
]

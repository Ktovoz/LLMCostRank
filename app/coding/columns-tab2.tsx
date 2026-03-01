"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// 使用与主页面相同的类型定义
export type LLMModelTab2 = {
  id: string
  rank: number
  name: string
  plan: string
  provider: string
  monthly: string
  quarterly: string
  yearly: string
  quota: string
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
}

// 额度对比标签页的列配置
export const codingColumnsTab2: ColumnDef<LLMModelTab2>[] = [
  {
    accessorKey: "rank",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2"
          >
            排名
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const rank = row.getValue("rank") as number
      return <div className="text-center font-bold">{rank}</div>
    },
  },
  {
    accessorKey: "plan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          套餐
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const plan = row.getValue("plan") as string
      return <div className="font-medium">{plan}</div>
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
      const value = row.getValue("windowQuota") as string
      return <div className="font-medium text-sm">{value}</div>
    },
  },
  {
    accessorKey: "monthlyToken",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2"
          >
            月额度
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("monthlyToken") as string
      return <div className="text-right font-mono pr-4">{value}</div>
    },
  },
  {
    accessorKey: "quarterlyToken",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2"
          >
            季额度
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("quarterlyToken") as string
      return <div className="text-right font-mono pr-4">{value}</div>
    },
  },
  {
    accessorKey: "yearlyToken",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2"
          >
            年额度
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("yearlyToken") as string
      return <div className="text-right font-mono pr-4">{value}</div>
    },
  },
  {
    accessorKey: "weeklyLimit",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2"
          >
            周限额
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("weeklyLimit") as string
      return <div className="text-right font-mono pr-4">{value}</div>
    },
  },
  {
    accessorKey: "monthlyLimit",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-2"
          >
            月限额
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("monthlyLimit") as string
      return <div className="text-right font-mono pr-4">{value}</div>
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
]

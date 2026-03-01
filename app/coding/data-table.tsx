"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useTheme } from "next-themes"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Search, ChevronsRightLeft } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  initialSorting?: SortingState
  unitLabel?: string // 单位名称，默认为"模型"
}

export function DataTable<TData, TValue>({
  columns,
  data,
  initialSorting = [],
  unitLabel = "模型",
}: DataTableProps<TData, TValue>) {
  const { resolvedTheme } = useTheme()
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const isDark = resolvedTheme === "dark"

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full space-y-4">
      {/* 搜索栏 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`} />
          <Input
            placeholder="搜索提供商..."
            value={(table.getColumn("provider")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("provider")?.setFilterValue(event.target.value)
            }
            className={`pl-9 ${
              isDark
                ? "bg-white/5 border-white/10 focus:border-sky-500/50"
                : "bg-black/[0.03] border-black/10 focus:border-sky-500/60"
            }`}
          />
        </div>
      </div>

      {/* 水平滚动提示 */}
      <div className={`flex items-center justify-center gap-1.5 py-2 text-xs sm:hidden ${
        isDark ? "text-gray-500" : "text-gray-400"
      }`}>
        <ChevronsRightLeft className="h-3.5 w-3.5 animate-pulse" />
        <span>左右滑动查看完整内容</span>
      </div>

      {/* 表格容器 - 带渐变边缘提示 */}
      <div className="relative rounded-xl sm:overflow-hidden overflow-visible">
        {/* 移动端左侧渐变遮罩 */}
        <div className={`sm:hidden absolute left-0 top-0 bottom-0 w-4 z-10 pointer-events-none ${
          isDark
            ? "bg-gradient-to-r from-black/60 to-transparent"
            : "bg-gradient-to-r from-white/80 to-transparent"
        }`} />

        {/* 移动端右侧渐变遮罩 */}
        <div className={`sm:hidden absolute right-0 top-0 bottom-0 w-4 z-10 pointer-events-none ${
          isDark
            ? "bg-gradient-to-l from-black/60 to-transparent"
            : "bg-gradient-to-l from-white/80 to-transparent"
        }`} />

        {/* 表格 */}
        <div className={`rounded-xl overflow-x-auto border ${
          isDark ? "border-white/10" : "border-black/5"
        }`}>
          <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={
                  isDark
                    ? "border-b border-white/10 bg-white/[0.04] hover:bg-white/[0.06] backdrop-blur-sm"
                    : "border-b border-black/5 bg-black/[0.02] hover:bg-black/[0.04] backdrop-blur-sm"
                }
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`h-12 px-4 whitespace-nowrap ${isDark ? "text-gray-300 font-semibold" : "text-gray-700 font-semibold"}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`transition-colors border-b ${
                    isDark
                      ? "border-white/5 hover:bg-white/[0.06]"
                      : "border-black/5 hover:bg-black/[0.03]"
                  } ${index % 2 === 0 ? "bg-transparent" : isDark ? "bg-white/[0.02]" : "bg-black/[0.015]"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`px-4 py-3 sm:py-4 ${isDark ? "text-gray-200" : "text-gray-800"}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={`h-32 text-center text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  暂无数据。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </div>

      {/* 分页 */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-2 px-1`}>
        <div className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          共 <span className="font-medium">{table.getFilteredRowModel().rows.length}</span> 个{unitLabel}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`gap-1 h-8 sm:h-9 ${
              isDark
                ? "border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30"
                : "border-black/10 bg-white hover:bg-black/[0.02] disabled:opacity-30"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">上一页</span>
          </Button>
          <div className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm ${
            isDark ? "bg-white/5 text-gray-300" : "bg-black/[0.05] text-gray-600"
          }`}>
            <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span>
            <span className={isDark ? "text-gray-500" : "text-gray-400"}>/</span>
            <span>{table.getPageCount()}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`gap-1 h-8 sm:h-9 ${
              isDark
                ? "border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30"
                : "border-black/10 bg-white hover:bg-black/[0.02] disabled:opacity-30"
            }`}
          >
            <span className="hidden sm:inline">下一页</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

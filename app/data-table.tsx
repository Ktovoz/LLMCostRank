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
  FilterFn,
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
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Toggle } from "@/components/ui/toggle"
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { LLMModel, featureConfig } from "./columns"

// 汇率：1 USD = 7.2 CNY
const EXCHANGE_RATE = 7.2

// 货币类型
export type Currency = "USD" | "CNY"

// 生成列定义
function createColumns(currency: Currency): ColumnDef<LLMModel>[] {
  const formatPrice = (price: number) => {
    const convertedPrice = currency === "CNY" ? price * EXCHANGE_RATE : price
    return convertedPrice.toFixed(2)
  }

  const currencySymbol = currency === "CNY" ? "¥" : "$"

  return [
    {
      id: "rowNumber",
      header: () => <div className="text-center">编号</div>,
      cell: ({ row }) => {
        return <div className="text-center font-bold">{row.index + 1}</div>
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
            {currencySymbol}{formatPrice(price)}
            {cachedPrice !== undefined && cachedPrice < price && (
              <span className="ml-1">
                ({currencySymbol}{formatPrice(cachedPrice)})
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
        return <div className="text-right font-mono pr-4">{currencySymbol}{formatPrice(price)}</div>
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
}

// 自定义价格区间筛选函数
const priceRangeFilter: FilterFn<LLMModel> = (row, columnId, value) => {
  const price = row.getValue(columnId) as number
  const [min, max] = value as [number, number]
  return price >= min && price <= max
}

interface DataTableProps<TData, TValue> {
  columns?: ColumnDef<TData, TValue>[]
  data: TData[]
  initialSorting?: SortingState
}

export function DataTable<TData, TValue>({
  columns: _columns,
  data,
  initialSorting = [],
}: DataTableProps<TData, TValue>) {
  const { resolvedTheme } = useTheme()
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  // 货币状态
  const [currency, setCurrency] = React.useState<Currency>("USD")

  // 根据货币动态生成列（如果外部没有传入 columns）
  const columns = React.useMemo(() => {
    if (_columns && _columns.length > 0) {
      return _columns as ColumnDef<TData, TValue>[]
    }
    return createColumns(currency) as ColumnDef<TData, TValue>[]
  }, [_columns, currency])

  // 计算价格最大值
  const priceLimits = React.useMemo(() => {
    const models = data as LLMModel[]
    if (models.length === 0) {
      return { inputMax: 100, outputMax: 100 }
    }
    // 过滤掉非数字值
    const inputPrices = models.map(m => m.inputPrice).filter(p => typeof p === 'number' && !isNaN(p))
    const outputPrices = models.map(m => m.outputPrice).filter(p => typeof p === 'number' && !isNaN(p))

    const maxInput = inputPrices.length > 0 ? Math.max(...inputPrices) : 0
    const maxOutput = outputPrices.length > 0 ? Math.max(...outputPrices) : 0
    // 最高值加 20%
    return {
      inputMax: maxInput > 0 ? Math.ceil(maxInput * 1.2 * 10) / 10 : 100,
      outputMax: maxOutput > 0 ? Math.ceil(maxOutput * 1.2 * 10) / 10 : 100,
    }
  }, [data])

  // 价格区间状态（始终使用 USD）
  const [inputPriceRange, setInputPriceRange] = React.useState([0, 100])
  const [outputPriceRange, setOutputPriceRange] = React.useState([0, 100])

  // 当 priceLimits 变化时更新价格范围
  React.useEffect(() => {
    setInputPriceRange([0, priceLimits.inputMax])
    setOutputPriceRange([0, priceLimits.outputMax])
  }, [priceLimits.inputMax, priceLimits.outputMax])

  // Dialog 状态
  const [dialogOpen, setDialogOpen] = React.useState(false)

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
    filterFns: {
      priceRange: priceRangeFilter,
    },
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

  // 应用价格筛选
  const applyPriceFilters = () => {
    table.getColumn("inputPrice")?.setFilterValue(inputPriceRange)
    table.getColumn("outputPrice")?.setFilterValue(outputPriceRange)
    setDialogOpen(false)
  }

  // 重置价格筛选
  const resetPriceFilters = () => {
    setInputPriceRange([0, priceLimits.inputMax])
    setOutputPriceRange([0, priceLimits.outputMax])
    table.getColumn("inputPrice")?.setFilterValue(undefined)
    table.getColumn("outputPrice")?.setFilterValue(undefined)
  }

  // 检查是否有筛选条件
  const hasActiveFilters =
    (table.getColumn("inputPrice")?.getFilterValue() !== undefined) ||
    (table.getColumn("outputPrice")?.getFilterValue() !== undefined)

  // 格式化显示价格
  const formatDisplayPrice = (price: number) => {
    const convertedPrice = currency === "CNY" ? price * EXCHANGE_RATE : price
    return convertedPrice.toFixed(2)
  }

  const currencySymbol = currency === "CNY" ? "¥" : "$"

  // 检查列是否存在（通过检查原始列配置）
  const hasNameColumn = columns.some((col: ColumnDef<TData, TValue>) => (col as { accessorKey?: string; id?: string }).accessorKey === "name" || (col as { accessorKey?: string; id?: string }).id === "name")
  const hasProviderColumn = columns.some((col: ColumnDef<TData, TValue>) => (col as { accessorKey?: string; id?: string }).accessorKey === "provider" || (col as { accessorKey?: string; id?: string }).id === "provider")

  return (
    <div className="w-full space-y-4">
      {/* 搜索栏和价格筛选 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {hasNameColumn && (
          <div className="relative flex-1 max-w-sm">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`} />
            <Input
              placeholder="搜索模型名称..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className={`pl-9 ${
                isDark
                  ? "bg-white/5 border-white/10 focus:border-sky-500/50"
                  : "bg-black/[0.03] border-black/10 focus:border-sky-500/60"
              }`}
            />
          </div>
        )}
        {hasProviderColumn && (
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
        )}

        {/* 货币切换 */}
        <Toggle
          pressed={currency === "CNY"}
          onPressedChange={(pressed) => setCurrency(pressed ? "CNY" : "USD")}
          aria-label="切换货币单位"
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
            isDark
              ? "bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] data-[state=on]:bg-white/[0.12] data-[state=on]:border-white/20 data-[state=on]:text-white"
              : "bg-white border border-black/10 hover:bg-gray-50 data-[state=on]:bg-gray-100 data-[state=on]:border-black/20 data-[state=on]:text-gray-900"
          }`}
        >
          <span>{currency === "CNY" ? "¥ 人民币" : "$ 美元"}</span>
        </Toggle>

        {/* 价格筛选按钮 */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={`gap-2 ${
                hasActiveFilters
                  ? isDark
                    ? "border-white/30 bg-white/10 text-gray-200"
                    : "border-black/30 bg-black/[0.08] text-gray-800"
                  : isDark
                    ? "border-white/10 bg-white/5 hover:bg-white/10"
                    : "border-black/10 bg-white hover:bg-black/[0.02]"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              价格筛选
              {hasActiveFilters && (
                <span className={`flex h-2 w-2 rounded-full ${
                  isDark ? "bg-white/70" : "bg-black/60"
                }`} />
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className={`sm:max-w-[425px] p-0 overflow-hidden ${
            isDark
              ? "bg-[#0a0a0a] border-white/10"
              : "bg-white border-black/10"
          }`}>
            {/* 标题区域 - 带背景色 */}
            <div className={`px-6 py-5 border-b ${
              isDark
                ? "bg-white/[0.03] border-white/10"
                : "bg-black/[0.02] border-black/10"
            }`}>
              <DialogHeader className="space-y-2">
                <DialogTitle className={`text-lg font-semibold ${
                  isDark ? "text-gray-100" : "text-gray-900"
                }`}>
                  价格筛选
                </DialogTitle>
                <DialogDescription className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}>
                  设置价格区间筛选条件 (按{currency === "CNY" ? "人民币" : "美元"}计价)
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* 内容区域 */}
            <div className="flex flex-col gap-6 px-6 py-5">
              {/* 输入价格筛选 */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Label className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    输入价格 ({currencySymbol}/1M tokens)
                  </Label>
                  <span className={`text-sm font-mono px-2.5 py-1 rounded-md ${
                    isDark
                      ? "bg-white/[0.08] text-gray-200 border border-white/10"
                      : "bg-black/[0.05] text-gray-700 border border-black/10"
                  }`}>
                    {currencySymbol}{formatDisplayPrice(inputPriceRange[0])} - {currencySymbol}{formatDisplayPrice(inputPriceRange[1])}
                  </span>
                </div>
                <div className={`py-2 px-1 rounded-lg ${
                  isDark ? "bg-white/[0.02]" : "bg-black/[0.02]"
                }`}>
                  <Slider
                    value={inputPriceRange}
                    onValueChange={(value) => setInputPriceRange(value as [number, number])}
                    min={0}
                    max={priceLimits.inputMax}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div className={`flex justify-between text-xs ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}>
                  <span className="font-mono">{currencySymbol}0</span>
                  <span className="font-mono">{currencySymbol}{formatDisplayPrice(priceLimits.inputMax)}</span>
                </div>
              </div>

              <Separator className={isDark ? "bg-white/10" : "bg-black/10"} />

              {/* 输出价格筛选 */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Label className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    输出价格 ({currencySymbol}/1M tokens)
                  </Label>
                  <span className={`text-sm font-mono px-2.5 py-1 rounded-md ${
                    isDark
                      ? "bg-white/[0.08] text-gray-200 border border-white/10"
                      : "bg-black/[0.05] text-gray-700 border border-black/10"
                  }`}>
                    {currencySymbol}{formatDisplayPrice(outputPriceRange[0])} - {currencySymbol}{formatDisplayPrice(outputPriceRange[1])}
                  </span>
                </div>
                <div className={`py-2 px-1 rounded-lg ${
                  isDark ? "bg-white/[0.02]" : "bg-black/[0.02]"
                }`}>
                  <Slider
                    value={outputPriceRange}
                    onValueChange={(value) => setOutputPriceRange(value as [number, number])}
                    min={0}
                    max={priceLimits.outputMax}
                    step={0.5}
                    className="w-full"
                  />
                </div>
                <div className={`flex justify-between text-xs ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}>
                  <span className="font-mono">{currencySymbol}0</span>
                  <span className="font-mono">{currencySymbol}{formatDisplayPrice(priceLimits.outputMax)}</span>
                </div>
              </div>
            </div>

            {/* 底部按钮区域 - 带背景色 */}
            <div className={`px-6 py-4 border-t flex flex-row gap-3 ${
              isDark
                ? "bg-white/[0.03] border-white/10"
                : "bg-black/[0.02] border-black/10"
            }`}>
              <Button
                variant="outline"
                className={`flex-1 ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-gray-100"
                    : "bg-white border-black/10 text-gray-700 hover:bg-black/[0.03]"
                }`}
                onClick={resetPriceFilters}
              >
                重置
              </Button>
              <Button
                className={`flex-1 ${
                  isDark
                    ? "bg-white/[0.15] hover:bg-white/20 text-white border border-white/20"
                    : "bg-black/[0.08] hover:bg-black/[0.12] text-gray-900 border border-black/10"
                }`}
                onClick={applyPriceFilters}
              >
                应用筛选
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 表格 */}
      <div className={`rounded-xl overflow-hidden border ${
        isDark ? "border-white/10" : "border-black/10"
      }`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={
                  isDark
                    ? "border-white/10 bg-white/[0.06] hover:bg-white/[0.08]"
                    : "border-black/10 bg-black/[0.03] hover:bg-black/[0.05]"
                }
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={isDark ? "text-gray-300" : "text-gray-600"}
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
                  className={`transition-colors ${
                    isDark
                      ? "border-white/5 hover:bg-white/[0.04]"
                      : "border-black/5 hover:bg-black/[0.03]"
                  } ${index % 2 === 0 ? "" : isDark ? "bg-white/[0.02]" : "bg-black/[0.015]"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={isDark ? "text-gray-200" : "text-gray-700"}
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
                  className={`h-24 text-center ${
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

      {/* 分页 */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-2 px-1`}>
        <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          共 <span className="font-medium">{table.getFilteredRowModel().rows.length}</span> 个模型
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`gap-1 ${
              isDark
                ? "border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30"
                : "border-black/10 bg-white hover:bg-black/[0.02] disabled:opacity-30"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            上一页
          </Button>
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm ${
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
            className={`gap-1 ${
              isDark
                ? "border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30"
                : "border-black/10 bg-white hover:bg-black/[0.02] disabled:opacity-30"
            }`}
          >
            下一页
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

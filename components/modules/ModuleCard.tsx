"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TaskModule } from "./types"
import { GripVertical } from "lucide-react"

interface ModuleCardProps {
  module: TaskModule
  onRemove: (id: string) => void
  onParamsChange: (id: string, params: Record<string, any>) => void
  index: number
  dragHandleProps: any
}

export function ModuleCard({ module, onRemove, onParamsChange, index, dragHandleProps }: ModuleCardProps) {
  const renderForm = () => {
    switch (module.type) {
      case "approve":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tokenAddress">Token 地址</Label>
              <Input
                id="tokenAddress"
                value={module.params.tokenAddress || ""}
                onChange={(e) => onParamsChange(module.id, { tokenAddress: e.target.value })}
                placeholder="0x..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spenderAddress">Spender 地址</Label>
              <Input
                id="spenderAddress"
                value={module.params.spenderAddress || ""}
                onChange={(e) => onParamsChange(module.id, { spenderAddress: e.target.value })}
                placeholder="0x..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">授权数量</Label>
              <Input
                id="amount"
                type="number"
                value={module.params.amount || ""}
                onChange={(e) => onParamsChange(module.id, { amount: e.target.value })}
                placeholder="输入数量"
              />
            </div>
          </div>
        )
      case "transfer":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tokenAddress">Token 地址</Label>
              <Input
                id="tokenAddress"
                value={module.params.tokenAddress || ""}
                onChange={(e) => onParamsChange(module.id, { tokenAddress: e.target.value })}
                placeholder="0x..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toAddress">接收地址</Label>
              <Input
                id="toAddress"
                value={module.params.toAddress || ""}
                onChange={(e) => onParamsChange(module.id, { toAddress: e.target.value })}
                placeholder="0x..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">转账数量</Label>
              <Input
                id="amount"
                type="number"
                value={module.params.amount || ""}
                onChange={(e) => onParamsChange(module.id, { amount: e.target.value })}
                placeholder="输入数量"
              />
            </div>
          </div>
        )
      case "swap":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tokenIn">输入 Token</Label>
              <Input
                id="tokenIn"
                value={module.params.tokenIn || ""}
                onChange={(e) => onParamsChange(module.id, { tokenIn: e.target.value })}
                placeholder="0x..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenOut">输出 Token</Label>
              <Input
                id="tokenOut"
                value={module.params.tokenOut || ""}
                onChange={(e) => onParamsChange(module.id, { tokenOut: e.target.value })}
                placeholder="0x..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amountIn">输入数量</Label>
              <Input
                id="amountIn"
                type="number"
                value={module.params.amountIn || ""}
                onChange={(e) => onParamsChange(module.id, { amountIn: e.target.value })}
                placeholder="输入数量"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg border p-4 mb-4 relative">
      

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div {...dragHandleProps} className="cursor-move">
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
            {index + 1}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">{module.icon}</span>
            <h3 className="font-medium">{module.title}</h3>
          </div>
          <div className="text-xs text-gray-400">{module.description}</div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onRemove(module.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          删除
        </Button>
      </div>
      {renderForm()}
    </div>
  )
} 
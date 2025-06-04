import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TaskModule } from "./types"

interface SwapFormProps {
  module: TaskModule
  onParamsChange: (params: Record<string, any>) => void
}

export function SwapForm({ module, onParamsChange }: SwapFormProps) {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`${module.id}-tokenIn`}>Input Token</Label>
        <Select
          value={module.params.tokenIn}
          onValueChange={(value) => onParamsChange({ tokenIn: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USDC">USDC</SelectItem>
            <SelectItem value="USDT">USDT</SelectItem>
            <SelectItem value="ETH">ETH</SelectItem>
            <SelectItem value="WBTC">WBTC</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor={`${module.id}-tokenOut`}>Output Token</Label>
        <Select
          value={module.params.tokenOut}
          onValueChange={(value) => onParamsChange({ tokenOut: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USDC">USDC</SelectItem>
            <SelectItem value="USDT">USDT</SelectItem>
            <SelectItem value="ETH">ETH</SelectItem>
            <SelectItem value="WBTC">WBTC</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor={`${module.id}-amountIn`}>Input Amount</Label>
        <Input
          id={`${module.id}-amountIn`}
          placeholder="100"
          value={module.params.amountIn}
          onChange={(e) => onParamsChange({ amountIn: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor={`${module.id}-slippage`}>Slippage (%)</Label>
        <Input
          id={`${module.id}-slippage`}
          placeholder="0.5"
          value={module.params.slippage}
          onChange={(e) => onParamsChange({ slippage: e.target.value })}
        />
      </div>
    </div>
  )
} 
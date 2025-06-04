import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { TaskModule } from "./types"

interface ApproveFormProps {
  module: TaskModule
  onParamsChange: (params: Record<string, any>) => void
}

export function ApproveForm({ module, onParamsChange }: ApproveFormProps) {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`${module.id}-token`}>Token Address</Label>
        <Input
          id={`${module.id}-token`}
          placeholder="0x..."
          value={module.params.tokenAddress}
          onChange={(e) => onParamsChange({ tokenAddress: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor={`${module.id}-spender`}>Spender Address</Label>
        <Input
          id={`${module.id}-spender`}
          placeholder="0x..."
          value={module.params.spenderAddress}
          onChange={(e) => onParamsChange({ spenderAddress: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor={`${module.id}-amount`}>Approve Amount</Label>
        <Input
          id={`${module.id}-amount`}
          placeholder="1000"
          value={module.params.amount}
          onChange={(e) => onParamsChange({ amount: e.target.value })}
        />
      </div>
    </div>
  )
} 
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { TaskModule } from "./types"

interface TransferFormProps {
  module: TaskModule
  onParamsChange: (params: Record<string, any>) => void
}

export function TransferForm({ module, onParamsChange }: TransferFormProps) {
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
        <Label htmlFor={`${module.id}-to`}>Recipient Address</Label>
        <Input
          id={`${module.id}-to`}
          placeholder="0x..."
          value={module.params.toAddress}
          onChange={(e) => onParamsChange({ toAddress: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor={`${module.id}-amount`}>Transfer Amount</Label>
        <Input
          id={`${module.id}-amount`}
          placeholder="100"
          value={module.params.amount}
          onChange={(e) => onParamsChange({ amount: e.target.value })}
        />
      </div>
    </div>
  )
} 
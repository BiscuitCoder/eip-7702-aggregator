import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, GripVertical } from "lucide-react"
import { TaskModule } from "./types"
import { ApproveForm } from "./ApproveForm"
import { TransferForm } from "./TransferForm"
import { SwapForm } from "./SwapForm"

interface ModuleCardProps {
  module: TaskModule
  onRemove: (id: string) => void
  onParamsChange: (id: string, params: Record<string, any>) => void
  index: number
  dragHandleProps?: any
}

export function ModuleCard({ module, onRemove, onParamsChange, index, dragHandleProps }: ModuleCardProps) {
  const renderForm = () => {
    switch (module.type) {
      case "approve":
        return <ApproveForm module={module} onParamsChange={(params) => onParamsChange(module.id, params)} />
      case "transfer":
        return <TransferForm module={module} onParamsChange={(params) => onParamsChange(module.id, params)} />
      case "swap":
        return <SwapForm module={module} onParamsChange={(params) => onParamsChange(module.id, params)} />
      default:
        return null
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div {...dragHandleProps} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <CardTitle className="text-lg">{module.title}</CardTitle>
            <CardDescription>{module.description}</CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onRemove(module.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>{renderForm()}</CardContent>
    </Card>
  )
} 
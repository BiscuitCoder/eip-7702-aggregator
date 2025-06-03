import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AVAILABLE_MODULES } from "./types"

interface ModuleSelectorProps {
  onAddModule: (moduleType: string) => void
}

export function ModuleSelector({ onAddModule }: ModuleSelectorProps) {
  return (
    <div className="space-y-2">
      {AVAILABLE_MODULES.map((module) => (
        <div
          key={module.id}
          className="w-full justify-start h-auto py-3 px-4 cursor-default border border-gray-200 rounded-md"
        >
          <div className="flex items-center space-x-3 w-full justify-between">
            <span className="text-xl">{module.icon}</span>
            <div className="text-left flex-1">
              <div className="font-medium">{module.title}</div>
              <div className="text-sm text-muted-foreground">{module.description}</div>
            </div>
            <div className="flex items-center space-x-2 opacity-50 hover:opacity-100"  onClick={() => onAddModule(module.id)} >
              <Plus className="h-6 w-6 !cursor-pointer"/>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 
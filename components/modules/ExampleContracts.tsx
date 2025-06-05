import { Button } from "@/components/ui/button"
import { truncateString } from "@/lib/utils"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useTaskStore } from "@/lib/store"

interface ExampleContractsProps {
  onSelect: (address: string) => Promise<void>
}

export function ExampleContracts({ onSelect }: ExampleContractsProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const customContracts = useTaskStore(state => state.customContracts)
  const removeCustomContract = useTaskStore(state => state.removeCustomContract)

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Custom Contracts</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      {isExpanded && (
        <div className="space-y-4 mt-4">
          {customContracts.length > 0 ? (
            customContracts.map((contract) => (
              <div 
                key={contract.address} 
                className="flex items-start justify-between rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex flex-col space-y-2">
                  <span className="font-medium text-md">{contract.name}</span>
                  <span className="text-gray-500 text-xs">{truncateString(contract.address)}</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 px-2 text-blue-500 hover:text-blue-600"
                    onClick={() => onSelect(contract.address)}
                  >
                    Select
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 px-2 text-red-500 hover:text-red-600"
                    onClick={() => removeCustomContract(contract.address)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-4 text-gray-400">
              <span className="text-2xl">📝</span>
              <span className="ml-2 text-sm">No custom contracts yet</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 
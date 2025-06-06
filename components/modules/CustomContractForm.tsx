import { useState } from "react"
import { ContractMethod } from "./types"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTaskStore } from "@/lib/store"
import { v4 as uuidv4 } from "uuid"
import { truncateString } from "@/lib/utils"

interface CustomContractFormProps {
  contractAddress: string
  methods: ContractMethod[]
  contractName: string
  onMethodSelect: (method: ContractMethod, params: Record<string, any>) => void
}

function MethodIcon({ name }: { name: string }) {
  const firstLetter = name.charAt(0).toUpperCase()
  return (
    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
      {firstLetter}
    </div>
  )
}

export function CustomContractForm({ contractAddress, methods, contractName }: CustomContractFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<ContractMethod | null>(null)
  const [params, setParams] = useState<Record<string, any>>({})
  const addModule = useTaskStore((state) => state.addModule)

  const handleParamChange = (paramName: string, value: string) => {
    setParams(prev => ({
      ...prev,
      [paramName]: value
    }))
  }

  const handleMethodClick = (method: ContractMethod) => {
    const firstLetter = method.name.charAt(0).toUpperCase()
    const isPayable = method.payable || method.stateMutability === "payable"
    const initialParams = method.inputs.reduce((acc: any, input: any) => {
      acc[input.name] = ""
      return acc
    }, {})

    if(isPayable) {
      initialParams.payValue = undefined
    }

    addModule({
      name: contractName,
      id: uuidv4(),
      type: "custom",
      title: method.name,
      description: `${contractName} | ${truncateString(contractAddress)}`,
      icon: firstLetter,
      method: method,
      params: initialParams,
      contractAddress: contractAddress,
      isPayable
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {methods.map((method, index) => (
          <div
            key={index}
            className="w-full justify-start h-auto py-3 px-4 cursor-pointer border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3 w-full justify-between">
              <MethodIcon name={method.name} />
              <div className="text-left flex-1">
                <div className="font-medium wordBreak: break-all">{method.name}</div>
                <div className="flex gap-2 mt-1">
                  {method.payable && (
                    <Badge variant="default">
                      <small>Can receive ETH</small>
                    </Badge>
                  )}
                  {method.inputs.length > 0 && (
                    <Badge variant="outline">
                      <small>{method.inputs.length} parameters</small>
                    </Badge>
                  )}
                </div>
              </div>
              <Plus className="h-6 w-6 opacity-50" onClick={() => handleMethodClick(method)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
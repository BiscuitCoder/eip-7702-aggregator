import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ContractMethod } from "./types"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTaskStore } from "@/lib/store"
import { v4 as uuidv4 } from "uuid"

interface CustomContractFormProps {
  contractAddress: string
  methods: ContractMethod[]
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

export function CustomContractForm({ contractAddress, methods, onMethodSelect }: CustomContractFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<ContractMethod | null>(null)
  const [params, setParams] = useState<Record<string, any>>({})
  const addModule = useTaskStore((state) => state.addModule)

  const handleParamChange = (paramName: string, value: string) => {
    setParams(prev => ({
      ...prev,
      [paramName]: value
    }))
  }

  const renderParamInput = (param: ContractMethod["inputs"][0]) => {
    return (
      <div key={param.name} className="space-y-2">
        <Label htmlFor={param.name}>
          {param.name} ({param.type})
        </Label>
        <Input
          id={param.name}
          placeholder={`输入 ${param.type} 类型的 ${param.name}`}
          value={params[param.name] || ""}
          onChange={(e) => handleParamChange(param.name, e.target.value)}
        />
      </div>
    )
  }

  const handleMethodClick = (method: ContractMethod) => {
    const firstLetter = method.name.charAt(0).toUpperCase()
    const isPayable = method.payable || method.stateMutability === "payable"
    const initialParams = method.inputs.reduce((acc: any, input: any) => {
      acc[input.name] = ""
      return acc
    }, {})

    addModule({
      id: uuidv4(),
      type: "custom",
      title: method.name,
      description: `${isPayable ? "可接收 ETH" : "不可接收 ETH"} · ${method.inputs.length} 个参数`,
      icon: firstLetter,
      method: method,
      params: initialParams,
      contractAddress: contractAddress
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {methods.map((method) => (
          <div
            key={method.name}
            className="w-full justify-start h-auto py-3 px-4 cursor-pointer border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => handleMethodClick(method)}
          >
            <div className="flex items-center space-x-3 w-full justify-between">
              <MethodIcon name={method.name} />
              <div className="text-left flex-1">
                <div className="font-medium">{method.name}</div>
                <div className="flex gap-2 mt-1">
                  {method.payable && (
                    <Badge variant="default">
                      <small>可接收 ETH</small>
                    </Badge>
                  )}
                  {method.inputs.length > 0 && (
                    <Badge variant="outline">
                      <small>{method.inputs.length} 个参数</small>
                    </Badge>
                  )}
                </div>
              </div>
              <Plus className="h-6 w-6 opacity-50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
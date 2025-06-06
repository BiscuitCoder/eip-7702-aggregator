import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AVAILABLE_MODULES, ContractMethod } from "./types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { CustomContractForm } from "./CustomContractForm"
import { useTaskStore } from "@/lib/store"
import { v4 as uuidv4 } from 'uuid'
import { toast } from "sonner"
import { ExampleContracts } from "./ExampleContracts"
import { mockAArr, MockAbi } from "@/app/api/mock"
import { truncateString } from "@/lib/utils"

export function ModuleSelector() {
  const [contractAddress, setContractAddress] = useState("")
  const [contractName, setContractName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [contractMethods, setContractMethods] = useState<ContractMethod[]>([])

  const addModule = useTaskStore(state => state.addModule)
  const addCustomContract = useTaskStore(state => state.addCustomContract)

  const handleContractSubmit = async (address?: string) => {
    const targetAddress = address || contractAddress
    if (!targetAddress) return toast.error("Please enter a contract address")
    setIsLoading(true)
    try {
      const response = await fetch(`/api/getabi?address=${targetAddress}`)    
      const data = await response.json().then(res => res.data) as MockAbi
      console.log(data)
      
      // 过滤出可写入的方法（非 view 和 pure 类型）
      const writeMethods = data.abi.filter((method: any) => 
        method.type === "function" && 
        method.stateMutability !== "view" && 
        method.stateMutability !== "pure"
      ).sort((a: any, b: any) => a.name.localeCompare(b.name))
      
      console.log("Write methods:", writeMethods)
      setContractMethods(writeMethods)
      // 添加合约地址到 store
      addCustomContract(targetAddress, data.name)
      setContractName(data.name)
    } catch (error) {
      console.error("Error fetching contract ABI:", error)
      toast.error("Failed to get contract ABI")
    } finally {
      setIsLoading(false)
    }
  }

  const selectEgContract = async (address: string) => {
    setContractAddress(address)
    await handleContractSubmit(address)
  }

  const handlePresetModuleSelect = (module: typeof AVAILABLE_MODULES[0]) => {
    console.log("module===>",module)
    addModule({
      name: module.title,
      id: uuidv4(),
      type: module.type,
      title: module.title,
      description: module.description,
      icon: module.icon,
      method: module.method,
      params: {},
      customComponent: module.customComponent
    })
  }

  const handleCustomMethodSelect = (method: ContractMethod, params: Record<string, any>) => {
    addModule({
      name: contractName,
      id: uuidv4(),
      type: "custom",
      title: method.name,
      description: "Custom Contract Method",
      icon: method.name.charAt(0).toUpperCase(),
      contractAddress,
      method,
      params
    })
  }

  return (
    <Tabs defaultValue="preset" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="preset">Preset Modules</TabsTrigger>
        <TabsTrigger value="custom">Custom Contract</TabsTrigger>
      </TabsList>
      
      <TabsContent value="preset" className="mt-4">
        <div className="space-y-2">
          {AVAILABLE_MODULES.map((module) => (
            <div
              key={module.id}
              className="w-full justify-start h-auto py-3 px-4 cursor-pointer border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 w-full justify-between">
                <span className="text-xl">{module.icon}</span>
                <div className="text-left flex-1">
                  <div className="font-medium">{module.title}</div>
                  <div className="text-sm text-muted-foreground">{module.description}</div>
                </div>
                <Plus className="h-6 w-6 opacity-50" onClick={() => handlePresetModuleSelect(module)}/>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="custom" className="mt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contract-address">Contract Address</Label>
            <div className="flex space-x-2">
              <Input
                id="contract-address"
                placeholder="0x..."
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
              <Button 
                onClick={() => handleContractSubmit()}
                disabled={!contractAddress || isLoading}
              >
                {isLoading ? "Loading..." : "Get"}
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto">
            <small>eg:</small>
            <div className="flex items-center text-xs gap-2">
              {
                mockAArr.map((item) => (
                  <div className="cursor-pointer border border-gray-200 rounded-md px-2 py-1 opacity-50 hover:opacity-100" key={item.address} onClick={() => selectEgContract(item.address)}>
                    <span>{item.name}</span>
                  </div>
                ))
              }
            </div>
          </div>

          <ExampleContracts onSelect={selectEgContract} />
          
          {contractMethods.length > 0 ? (
            <>
              <div className="flex justify-between !mt-8">
                <span className="text-md font-bold text-red-400">👇 {contractName}</span>
                <span className="text-xs text-gray-500">{truncateString(contractAddress)}</span>
              </div>
              <CustomContractForm
                contractAddress={contractAddress}
                methods={contractMethods}
                contractName={contractName}
                onMethodSelect={handleCustomMethodSelect}
              />
            </>
          ) : (
            <div className="text-sm text-muted-foreground">
              <p>After entering the contract address, the system will automatically retrieve the contract ABI and generate an interactive form.</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
} 
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AVAILABLE_MODULES, ContractMethod } from "./types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { CustomContractForm } from "./CustomContractForm"
import { useToast } from "@/components/ui/use-toast"
import { useTaskStore } from "@/lib/store"
import { v4 as uuidv4 } from 'uuid'

export function ModuleSelector() {
  const [contractAddress, setContractAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [contractMethods, setContractMethods] = useState<ContractMethod[]>([])
  const { toast } = useToast()
  const addModule = useTaskStore(state => state.addModule)

  const handleContractSubmit = async () => {
    if (!contractAddress) return
    setIsLoading(true)
    try {
      const response = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`)
      const dataString = await response.json().then(res => res.result)
      const data = JSON.parse(dataString) as ContractMethod[]
      
      // 过滤出可写入的方法（非 view 和 pure 类型）
      const writeMethods = data.filter(method => 
        method.type === "function" && 
        method.stateMutability !== "view" && 
        method.stateMutability !== "pure"
      ).sort((a, b) => a.name.localeCompare(b.name))
      
      console.log("Write methods:", writeMethods)
      setContractMethods(writeMethods)
      toast({
        title: "Success",
        description: `Retrieved ${writeMethods.length} writable methods`,
      })
    } catch (error) {
      console.error("Error fetching contract ABI:", error)
      toast({
        title: "Error",
        description: "Failed to get contract ABI",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePresetModuleSelect = (module: typeof AVAILABLE_MODULES[0]) => {
    addModule({
      id: uuidv4(),
      type: module.type,
      title: module.title,
      description: module.description,
      icon: module.icon,
      method: module.method,
      params: {}
    })
  }

  const handleCustomMethodSelect = (method: ContractMethod, params: Record<string, any>) => {
    addModule({
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
              onClick={() => handlePresetModuleSelect(module)}
            >
              <div className="flex items-center space-x-3 w-full justify-between">
                <span className="text-xl">{module.icon}</span>
                <div className="text-left flex-1">
                  <div className="font-medium">{module.title}</div>
                  <div className="text-sm text-muted-foreground">{module.description}</div>
                </div>
                <Plus className="h-6 w-6 opacity-50" />
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
                onClick={handleContractSubmit}
                disabled={!contractAddress || isLoading}
              >
                {isLoading ? "Loading..." : "Get"}
              </Button>
            </div>
          </div>
          
          {contractMethods.length > 0 ? (
            <CustomContractForm
              contractAddress={contractAddress}
              methods={contractMethods}
              onMethodSelect={handleCustomMethodSelect}
            />
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
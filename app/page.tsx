"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ModuleSelector } from "@/components/modules/ModuleSelector"
import { WalletConnect } from "@/components/WalletConnect"
import { useAccount } from "wagmi"
import { useTaskStore } from "@/lib/store"
import { TaskList } from "@/components/modules/TaskList"
import { useBatchCallContract } from "@/contracts/useContract"

export default function Home() {
  const modules = useTaskStore(state => state.modules)
  const { toast } = useToast()
  const { isConnected } = useAccount()

  const { write } = useBatchCallContract()

  const handleExecute = async () => {
    write()
    return;
    if (modules.length === 0) {
      toast({
        title: "错误",
        description: "请先添加至少一个模块",
        variant: "destructive",
      })
      return
    }

    // 收集所有模块的参数
    const transactionData = modules.map((module, index) => ({
      index,
      type: module.type,
      title: module.title,
      params: module.params,
      contractAddress: module.contractAddress,
      method: module.method
    }))

    console.log("Transaction data:", transactionData)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">EVM-7702 交易聚合器</h1>
            <p className="text-gray-600">
              通过拖拽方式组合多个交易模块，构建复杂的链上交易流程。
            </p>
          </div>
          <WalletConnect />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* 左侧模块选择区 */}
        <div className="col-span-3">
          <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
            <div className="flex items-center py-4 space-x-2">
              <h2 className="text-lg font-semibold">可用模块</h2>
            </div>
            <ModuleSelector />
          </div>
        </div>

        {/* 右侧表单区域 */}
        <div className="col-span-9">
          <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold">任务链</h2>
                <span className="text-sm text-gray-500">
                  {modules.length > 0 && `(${modules.length})`}
                </span>
              </div>
              {modules.length > 0 && isConnected && (
                <Button
                  onClick={handleExecute}
                >
                  执行交易
                </Button>
              )}
            </div>
          </div>

          <TaskList />
        </div>
      </div>
    </div>
  )
}

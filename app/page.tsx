"use client"

import { Button } from "@/components/ui/button"
import { ModuleSelector } from "@/components/modules/ModuleSelector"
import { WalletConnect } from "@/components/WalletConnect"
import { useAccount } from "wagmi"
import { useTaskStore } from "@/lib/store"
import { TaskList } from "@/components/modules/TaskList"
import { useBatchCallContract } from "@/contracts/useContract"
import { toast } from "sonner"
import { encodeFunctionData } from 'viem'

export default function Home() {
  const modules = useTaskStore(state => state.modules)
  const { isConnected } = useAccount()

  const { write,status } = useBatchCallContract()

  const handleExecute = async () => {
    if (modules.length === 0) {
      toast.error("Please add at least one module")
      return
    }
    write()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">EIP-7702 Transaction Aggregator</h1>
            <p className="text-gray-600">
              Build complex on-chain transaction flows by combining multiple transaction modules through drag and drop.
            </p>
          </div>
          <WalletConnect />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left module selection area */}
        <div className="col-span-3">
          <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
            <div className="flex items-center py-4 space-x-2">
              <h2 className="text-lg font-semibold">Available Modules</h2>
            </div>
            <ModuleSelector />
          </div>
        </div>

        {/* Right form area */}
        <div className="col-span-9">
          <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold">Task Chain</h2>
                <span className="text-sm text-gray-500">
                  {modules.length > 0 && `(${modules.length})`}
                </span>
              </div>
              {modules.length > 0 && isConnected && (
                <Button
                  onClick={handleExecute}
                  loading={status === 'pending'}
                >
                  {status === 'pending' ? 'Executing...' : 'Execute Transaction'}
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

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
import Records from "@/components/history/Records"
import Footer from "@/components/Footer"

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
            <img src="/logo.svg" alt="logo" width={200} className="mb-4" />
            <div className="text-xl font-bold mb-2 flex items-center space-x-4">
              <span>Use EIP-7702 to build and send multiple transactions.</span>
              <a href="https://github.com/BiscuitCoder/eip-7702-aggregator" target="_blank" rel="noopener noreferrer">
                <img src="/github.svg" alt="Github" width={20} height={20} />
              </a>
            </div>
            <p className="text-gray-600">
              <small className="text-gray-400">
                <i className="ri-error-warning-fill mr-1 text-red-400"></i> 
                Note:You need to use the MetaMask and set account as a EIP-7702 smart account.
                (Currently only support BSC)
                <a href="https://support.metamask.io/configure/accounts/switch-to-or-revert-from-a-smart-account/" 
                  target="_blank" rel="noopener noreferrer" className="text-yellow-600 ml-2 underline">
                  Learn more 👉
                </a> 
              </small>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <WalletConnect />
            <Records />
          </div>
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
      <Footer />  
    </div>
  )
}

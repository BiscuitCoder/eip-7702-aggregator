import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { toast } from 'sonner'

export interface TaskModule {
  id: string
  type: string
  title: string
  description: string
  icon: string
  method?: any
  params: Record<string, any>
  contractAddress?: string
}

interface TaskStore {
  modules: TaskModule[]
  customContracts: { address: string; name: string }[]
  addModule: (module: TaskModule) => void
  removeModule: (id: string) => void
  updateModule: (id: string, data: Partial<TaskModule>) => void
  reorderModules: (modules: TaskModule[]) => void
  addCustomContract: (address: string, name: string) => void
  removeCustomContract: (address: string) => void
}

export const useTaskStore = create<TaskStore>()(devtools((set) => ({
  modules: [],
  customContracts: [],
  addModule: (module) => set((state) => ({
    modules: [...state.modules, module]
  })),
  removeModule: (id) => set((state) => ({
    modules: state.modules.filter(m => m.id !== id)
  })),
  updateModule: (id, data) => set((state) => ({
    modules: state.modules.map(m => 
      m.id === id ? { ...m, ...data } : m
    )
  })),
  reorderModules: (modules) => set({ modules }),
  addCustomContract: (address, name) => set((state) => {
    // 检查地址是否已存在
    const isAddressExists = state.customContracts.some(
      contract => contract.address.toLowerCase() === address.toLowerCase()
    )
    
    if (isAddressExists) {
      return state
    }

    return {
      customContracts: [...state.customContracts, { address, name }]
    }
  }),
  removeCustomContract: (address) => set((state) => ({
    customContracts: state.customContracts.filter(c => c.address !== address)
  }))
}))) 
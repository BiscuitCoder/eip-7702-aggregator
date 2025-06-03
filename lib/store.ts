import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { ContractMethod } from '@/components/modules/types'

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
  addModule: (module: TaskModule) => void
  removeModule: (id: string) => void
  updateModule: (id: string, data: Partial<TaskModule>) => void
  reorderModules: (modules: TaskModule[]) => void
}

export const useTaskStore = create<TaskStore>()(devtools((set) => ({
  modules: [],
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
  reorderModules: (modules) => set({ modules })
}))) 
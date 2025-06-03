import { create } from 'zustand'
import { ContractMethod } from '@/components/modules/types'
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

export interface TaskModule {
  id: string
  type: string
  title: string
  description: string
  icon: string
  contractAddress?: string
  method?: ContractMethod
  params: Record<string, any>
}

interface TaskStore {
  modules: TaskModule[]
  addModule: (module: TaskModule) => void
  removeModule: (id: string) => void
  updateModule: (id: string, data: Partial<TaskModule>) => void
  reorderModules: (modules: TaskModule[]) => void
}

export const useTaskStore = create<TaskStore>()(devtools(persist((set) => ({
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
}), {
  name: 'task-store',
  storage: createJSONStorage(() => localStorage)
}))) 
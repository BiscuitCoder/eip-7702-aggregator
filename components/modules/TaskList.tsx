import { useTaskStore } from "@/lib/store"
import { ModuleCard } from "./ModuleCard"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { EmptyState } from "./EmptyState"
import { Button } from "@/components/ui/button"
import { useAccount } from "wagmi"
import { toast } from "sonner"

export function TaskList() {
  const modules = useTaskStore(state => state.modules)
  const reorderModules = useTaskStore(state => state.reorderModules)
  const { isConnected } = useAccount()

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(modules)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    reorderModules(items)
  }

  const handleExecute = async () => {
    // 检查所有必填字段是否已填写
    const hasEmptyParams = modules.some(module => {
      if (!module.method?.inputs) return false
      return module.method.inputs.some((input: { name: string | number }) => {
        const value = module.params[input.name]
        return !value || value.trim() === ""
      })
    })

    if (hasEmptyParams) {
      toast.error("请填写所有必填参数")
      return
    }

    try {
      // 收集所有模块的数据
      const transactions = modules.map(module => ({
        contractAddress: module.contractAddress,
        method: module.method,
        params: module.params
      }))

      // TODO: 调用合约执行交易
      console.log("执行交易:", transactions)
      toast.success("交易已提交")
    } catch (error) {
      console.error("执行交易失败:", error)
      toast.error("执行交易失败")
    }
  }

  if (modules.length === 0) {
    return (
      <EmptyState />
    )
  }

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {modules.map((module, index) => (
                <Draggable
                  key={module.id}
                  draggableId={module.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={snapshot.isDragging ? "opacity-50" : ""}
                    >
                      <ModuleCard
                        module={module}
                        index={index}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
} 
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
    // Check if all required fields are filled
    const hasEmptyParams = modules.some(module => {
      if (!module.method?.inputs) return false
      return module.method.inputs.some((input: { name: string | number }) => {
        const value = module.params[input.name]
        return !value || value.trim() === ""
      })
    })

    if (hasEmptyParams) {
      toast.error("Please fill in all required parameters")
      return
    }

    try {
      // Collect all module data
      const transactions = modules.map(module => ({
        contractAddress: module.contractAddress,
        method: module.method,
        params: module.params
      }))

      // TODO: Execute contract transaction
      console.log("Executing transaction:", transactions)
      toast.success("Transaction submitted")
    } catch (error) {
      console.error("Transaction execution failed:", error)
      toast.error("Transaction execution failed")
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
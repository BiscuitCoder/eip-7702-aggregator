import { useTaskStore } from "@/lib/store"
import { ModuleCard } from "./ModuleCard"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { EmptyState } from "./EmptyState"

export function TaskList() {
  const modules = useTaskStore(state => state.modules)
  const reorderModules = useTaskStore(state => state.reorderModules)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(modules)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    reorderModules(items)
  }

  if (modules.length === 0) {
    return (
      <EmptyState />
    )
  }

  return (
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
  )
} 
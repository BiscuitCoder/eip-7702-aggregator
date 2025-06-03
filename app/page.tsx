"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, AlertCircle } from "lucide-react"
import { TaskModule, AVAILABLE_MODULES } from "@/components/modules/types"
import { ModuleCard } from "@/components/modules/ModuleCard"
import { ModuleSelector } from "@/components/modules/ModuleSelector"
import { EmptyState } from "@/components/modules/EmptyState"

export default function Component() {
  const [selectedModules, setSelectedModules] = useState<TaskModule[]>([])
  const [buildStatus, setBuildStatus] = useState<"idle" | "building" | "success" | "error">("idle")
  const [buildError, setBuildError] = useState<string>("")
  const { toast } = useToast()

  const addModule = (moduleType: string) => {
    const template = AVAILABLE_MODULES.find((m) => m.id === moduleType)
    if (!template) return

    const newModule: TaskModule = {
      id: `${moduleType}-${Date.now()}`,
      type: template.type,
      title: template.title,
      description: template.description,
      icon: template.icon,
      params: { ...template.defaultParams },
    }

    setSelectedModules([...selectedModules, newModule])
    setBuildStatus("idle")
  }

  const removeModule = (moduleId: string) => {
    setSelectedModules(selectedModules.filter((m) => m.id !== moduleId))
    setBuildStatus("idle")
  }

  const updateModuleParams = (moduleId: string, params: Record<string, any>) => {
    setSelectedModules(
      selectedModules.map((m) => (m.id === moduleId ? { ...m, params: { ...m.params, ...params } } : m)),
    )
    setBuildStatus("idle")
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(selectedModules)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSelectedModules(items)
    setBuildStatus("idle")
  }

  const validateModule = (module: TaskModule): string | null => {
    switch (module.type) {
      case "approve":
        if (!module.params.tokenAddress) return "Token地址不能为空"
        if (!module.params.spenderAddress) return "Spender地址不能为空"
        if (!module.params.amount) return "授权数量不能为空"
        break
      case "transfer":
        if (!module.params.tokenAddress) return "Token地址不能为空"
        if (!module.params.toAddress) return "接收地址不能为空"
        if (!module.params.amount) return "转账数量不能为空"
        break
      case "swap":
        if (!module.params.tokenIn) return "输入Token不能为空"
        if (!module.params.tokenOut) return "输出Token不能为空"
        if (!module.params.amountIn) return "输入数量不能为空"
        break
    }
    return null
  }

  const executeTransaction = async () => {
    setBuildStatus("building")
    setBuildError("")

    // 验证所有模块
    for (const module of selectedModules) {
      const error = validateModule(module)
      if (error) {
        toast({
          variant: "destructive",
          title: "验证失败",
          description: `${module.title}: ${error}`,
        })
        setBuildStatus("error")
        return
      }
    }

    if (selectedModules.length === 0) {
      toast({
        variant: "destructive",
        title: "验证失败",
        description: "请至少添加一个功能模块",
      })
      setBuildStatus("error")
      return
    }

    // 模拟构建过程
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 这里会与7702代理合约交互
    console.log("执行聚合交易:", selectedModules)
    toast({
      title: "交易已发送",
      description: "交易已发送到7702代理合约！",
    })
    setBuildStatus("success")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">EVM-7702 交易聚合器</h1>
        <p className="text-gray-600">
          通过拖拽方式组合多个交易模块，构建复杂的链上交易流程。
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* 左侧模块选择区 */}
        <div className="col-span-3">
          <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
            <h2 className="text-lg font-semibold py-4">可用模块</h2>
            <ModuleSelector onAddModule={addModule} />
          </div>
        </div>

        {/* 右侧表单区域 */}
        <div className="col-span-9">
          <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">任务链</h2>
              {selectedModules.length > 0 && (
                <Button
                  onClick={executeTransaction}
                  disabled={buildStatus === "building"}
                >
                  {buildStatus === "building" ? "交易处理中..." : "执行交易"}
                </Button>
              )}
            </div>
          </div>

          {selectedModules.length === 0 ? (
            <EmptyState />
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="modules">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {selectedModules.map((module, index) => (
                      <Draggable key={module.id} draggableId={module.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={snapshot.isDragging ? "opacity-50" : ""}
                          >
                            <ModuleCard
                              module={module}
                              onRemove={removeModule}
                              onParamsChange={updateModuleParams}
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
          )}
        </div>
      </div>
    </div>
  )
}

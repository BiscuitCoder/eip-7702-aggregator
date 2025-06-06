"use client";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskModule, useTaskStore } from "@/lib/store";
import { useMemo } from "react";

interface ModuleCardProps {
  module: TaskModule;
  index: number;
  dragHandleProps?: any;
}

export function ModuleCard({
  module,
  index,
  dragHandleProps,
}: ModuleCardProps) {
  const updateModule = useTaskStore((state) => state.updateModule);
  const removeModule = useTaskStore((state) => state.removeModule);

  const handleParamChange = (paramName: string, value: string) => {
    updateModule(module.id, {
      params: {
        ...module.params,
        [paramName]: value,
      },
    });
  };

  const renderParamInput = (param: { name: string; type: string }) => {
    return (
      <div key={param.name} className="space-y-2">
        <Label htmlFor={param.name}>
          {param.name} ({param.type})
        </Label>
        <Input
          id={param.name}
          placeholder={`Enter ${param.type} for ${param.name}`}
          value={module.params[param.name] || ""}
          onChange={(e) => handleParamChange(param.name, e.target.value)}
        />
      </div>
    );
  };

  const customFormInputs = module.isPayable ? [...(module.method?.inputs || []), {
    name: "payValue",
    type: "uint256"
  }] : module.method?.inputs || []
  

  return (
    <div className="relative border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
            {index + 1}
          </div>
          {/* {isLetter ? (
            <MethodIcon letter={module.icon} />
          ) : (
            <span className="text-xl">{module.icon}</span>
          )} */}
          <div className="space-y-2">
            <h3 className="font-medium text-2xl">{module.title}</h3>
            <p className="text-sm text-muted-foreground">
              {module.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div {...dragHandleProps} className="cursor-move">
            <DragHandleDots2Icon className="h-5 w-5 text-gray-400" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => removeModule(module.id)}
          >
            ×
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        { module.customComponent ? module.customComponent(module) : customFormInputs.map(renderParamInput) }
      </div>
    </div>
  );
}

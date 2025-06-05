export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-center border-2 border-dashed border-gray-200 rounded-md">
      <span className="text-4xl mb-3">📝</span>
      <p className="text-gray-600 font-medium mb-2">No tasks</p>
      <p className="text-sm text-gray-500">Select a module from the left to start building your transaction chain</p>
    </div>
  )
} 
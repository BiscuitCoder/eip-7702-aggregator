export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-center border-2 border-dashed border-gray-200 rounded-md">
      <span className="text-4xl mb-3">📝</span>
      <p className="text-gray-600 font-medium mb-2">暂无任务</p>
      <p className="text-sm text-gray-500">从左侧选择一个模块开始构建您的交易链</p>
    </div>
  )
} 
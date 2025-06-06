import { Alert } from "@/components/ui/alert"

const NotOpenAlert = ({message}: {message: string}) => {
  return (
    <Alert className="bg-yellow-50 text-yellow-700 border-yellow-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          <span>{message}</span>
        </div>
      </Alert>
  )
}

export default NotOpenAlert
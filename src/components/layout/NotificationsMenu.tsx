
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { useTaskContext } from "@/contexts/TaskContext"
import { useNavigate } from "react-router-dom"

export function NotificationsMenu() {
  const { tasks } = useTaskContext()
  const navigate = useNavigate()
  
  const urgentTasks = tasks.filter(task => 
    task.status === 'pending' && 
    task.priority === 'high'
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          {urgentTasks.length > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {urgentTasks.length > 0 ? (
          urgentTasks.map(task => (
            <DropdownMenuItem 
              key={task.id}
              onClick={() => navigate("/tasks")}
            >
              <div className="flex flex-col">
                <span className="font-medium">Urgent Task: {task.title}</span>
                <span className="text-xs text-muted-foreground">
                  High priority task pending
                </span>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="px-2 py-4 text-center text-sm text-muted-foreground">
            No urgent notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

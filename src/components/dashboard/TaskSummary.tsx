
import React from 'react';
import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTaskContext } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { MiniCalendar } from '@/components/calendar/MiniCalendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TaskSummaryProps {
  className?: string;
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ className }) => {
  const { tasks, toggleTaskStatus, deleteTask, categories } = useTaskContext();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  
  // Get today's tasks
  const getTodayTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

    return tasks.filter(task => {
      const dueDate = task.due_date ? new Date(task.due_date) : null;
      return dueDate && dueDate >= today && dueDate < tomorrow;
    });
  };

  // Get long-term tasks
  const getLongTermTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

    return tasks.filter(task => {
      const dueDate = task.due_date ? new Date(task.due_date) : null;
      return dueDate && dueDate >= tomorrow;
    });
  };

  const todayTasks = getTodayTasks();
  const longTermTasks = getLongTermTasks();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Here you would typically filter tasks for the selected date
    // This would require modifying the task data structure to include proper date fields
  };

  const getStatusIcon = (status: 'completed' | 'pending', taskId: string) => {
    return (
      <div 
        className="cursor-pointer" 
        onClick={() => toggleTaskStatus(taskId)}
      >
        {status === 'completed' ? (
          <CheckCircle2 size={16} className="text-emerald-500" />
        ) : (
          <Circle size={16} className="text-gray-300 dark:text-gray-500" />
        )}
      </div>
    );
  };

  const getPriorityBadge = (priority?: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-rose-50 text-rose-700 dark:bg-rose-500/40 dark:text-rose-200 font-medium">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-amber-50 text-amber-700 dark:bg-amber-500/40 dark:text-amber-200 font-medium">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/40 dark:text-emerald-200 font-medium">
            Low
          </span>
        );
      default:
        return null;
    }
  };

  const renderTaskList = (taskList: typeof tasks) => {
    return taskList.length === 0 ? (
      <div className="px-5 py-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
      </div>
    ) : (
      taskList.map((task) => (
        <div key={task.id} className={cn(
          "px-5 py-3 flex items-center hover:bg-gray-50/50 dark:hover:bg-gray-800/70 transition-colors",
          task.status === 'completed' && "opacity-70"
        )}>
          <div className="mr-3 flex-shrink-0">
            {getStatusIcon(task.status, task.id)}
          </div>
          
          <div className="flex-1 min-w-0 mr-2">
            <p className={cn(
              "text-sm font-medium text-gray-800 dark:text-gray-200 truncate",
              task.status === 'completed' && "line-through text-gray-500 dark:text-gray-400"
            )}>
              {task.title}
            </p>
            
            {task.due_date && (
              <div className="flex items-center mt-1">
                <Clock size={12} className="text-gray-400 dark:text-gray-500 mr-1 flex-shrink-0" />
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {new Date(task.due_date).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {getPriorityBadge(task.priority)}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full"
              onClick={() => deleteTask(task.id)}
              title="Delete task"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      ))
    );
  };

  return (
    <div className={cn("rounded-xl overflow-hidden card-shadow animate-scale-in dark:bg-gray-800/50 dark:border-gray-700 gradient-border", className)}>
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Tasks</h2>
        <a href="/tasks" className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
          View All
        </a>
      </div>
      
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="w-full justify-start px-5 border-b border-gray-100 dark:border-gray-700">
          <TabsTrigger value="today" className="text-sm">Today's Tasks</TabsTrigger>
          <TabsTrigger value="long-term" className="text-sm">Long-term Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="mt-0 divide-y divide-gray-100 dark:divide-gray-700">
          {renderTaskList(todayTasks)}
        </TabsContent>
        <TabsContent value="long-term" className="mt-0 divide-y divide-gray-100 dark:divide-gray-700">
          <div className="px-5 py-3">
            <MiniCalendar
              onDateSelect={handleDateSelect}
              className="mb-4"
            />
          </div>
          {renderTaskList(longTermTasks)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskSummary;

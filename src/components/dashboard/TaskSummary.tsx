
import React from 'react';
import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTaskContext } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';

interface TaskSummaryProps {
  className?: string;
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ className }) => {
  const { tasks, toggleTaskStatus, deleteTask, categories } = useTaskContext();
  
  // Get today's tasks first, then upcoming tasks
  const todayTasks = tasks.filter(task => {
    const dueDate = task.dueDate?.toLowerCase();
    return dueDate?.includes('today');
  });
  
  const upcomingTasks = tasks.filter(task => {
    const dueDate = task.dueDate?.toLowerCase();
    return dueDate?.includes('tomorrow') || 
           (!dueDate?.includes('today') && task.status === 'pending');
  }).slice(0, 4 - Math.min(todayTasks.length, 2)); // Fill up to 4 tasks
  
  // Combine tasks, with priority given to today's tasks
  const displayTasks = [...todayTasks.slice(0, 2), ...upcomingTasks].slice(0, 4);

  const getStatusIcon = (status: 'completed' | 'pending') => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'pending':
        return <Circle size={16} className="text-gray-300 dark:text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority?: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-rose-50 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 font-medium">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 font-medium">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-medium">
            Low
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("glass rounded-xl overflow-hidden card-shadow animate-scale-in dark:bg-gray-800/40 dark:border-gray-700", className)}>
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Upcoming Tasks</h2>
        <a href="/tasks" className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
          View All
        </a>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {displayTasks.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No upcoming tasks</p>
          </div>
        ) : (
          displayTasks.map((task, index) => (
            <div key={task.id} className={cn(
              "px-5 py-3.5 flex items-center hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors",
              task.status === 'completed' && "opacity-70"
            )}>
              <div className="mr-3 flex-shrink-0">
                <div 
                  onClick={() => toggleTaskStatus(task.id)}
                  className="cursor-pointer"
                >
                  {getStatusIcon(task.status)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium text-gray-800 dark:text-gray-200 truncate",
                  task.status === 'completed' && "line-through text-gray-500 dark:text-gray-500"
                )}>
                  {task.title}
                </p>
                
                {task.dueDate && (
                  <div className="flex items-center mt-1">
                    <Clock size={12} className="text-gray-400 dark:text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{task.dueDate}</span>
                  </div>
                )}
              </div>
              
              <div className="ml-2 flex items-center">
                <div className="mr-2">
                  {getPriorityBadge(task.priority)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full"
                  onClick={() => deleteTask(task.id)}
                  title="Delete task"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/60">
        <a href="/tasks" className="w-full text-sm text-primary font-medium hover:text-primary/80 transition-colors block text-center">
          View all tasks
        </a>
      </div>
    </div>
  );
};

export default TaskSummary;

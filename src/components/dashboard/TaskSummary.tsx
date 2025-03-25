
import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  priority: 'high' | 'medium' | 'low';
  time?: string;
}

interface TaskSummaryProps {
  className?: string;
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ className }) => {
  // Mock tasks data
  const tasks: Task[] = [
    { 
      id: '1', 
      title: 'Prepare weekly project report', 
      status: 'completed', 
      priority: 'high' 
    },
    { 
      id: '2', 
      title: 'Team meeting with design department', 
      status: 'in-progress', 
      priority: 'medium',
      time: '11:30 AM'
    },
    { 
      id: '3', 
      title: 'Review client proposal', 
      status: 'upcoming', 
      priority: 'high',
      time: '2:00 PM'
    },
    { 
      id: '4', 
      title: 'Update task management system', 
      status: 'upcoming', 
      priority: 'low',
      time: '4:30 PM'
    }
  ];

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'in-progress':
        return <Circle size={16} className="text-amber-500 fill-amber-500/30" />;
      case 'upcoming':
        return <Circle size={16} className="text-gray-300 dark:text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: Task['priority']) => {
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
    }
  };

  return (
    <div className={cn("glass rounded-xl overflow-hidden card-shadow animate-scale-in dark:bg-gray-800/40 dark:border-gray-700", className)}>
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Today's Tasks</h2>
        <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
          Add Task
        </button>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {tasks.map((task, index) => (
          <div key={task.id} className={cn(
            "px-5 py-3.5 flex items-center hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors",
            task.status === 'completed' && "opacity-70"
          )}>
            <div className="mr-3 flex-shrink-0">
              {getStatusIcon(task.status)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm font-medium text-gray-800 dark:text-gray-200 truncate",
                task.status === 'completed' && "line-through text-gray-500 dark:text-gray-500"
              )}>
                {task.title}
              </p>
              
              {task.time && (
                <div className="flex items-center mt-1">
                  <Clock size={12} className="text-gray-400 dark:text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{task.time}</span>
                </div>
              )}
            </div>
            
            <div className="ml-4">
              {getPriorityBadge(task.priority)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/60">
        <button className="w-full text-sm text-primary font-medium hover:text-primary/80 transition-colors">
          View all tasks
        </button>
      </div>
    </div>
  );
};

export default TaskSummary;

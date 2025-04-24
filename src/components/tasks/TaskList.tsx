
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useTaskContext, Task } from '@/contexts/TaskContext';
import { Tag } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const { toggleTaskStatus, deleteTask, categories } = useTaskContext();

  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-xs">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {tasks.map((task) => {
        const category = categories.find(c => c.id === task.category);
        const categoryColor = category?.color || '#9ca3af';
        
        return (
          <div 
            key={task.id} 
            className={`py-2.5 flex items-start gap-2 ${task.status === 'completed' ? 'opacity-70' : ''}`}
          >
            <Checkbox 
              id={`task-${task.id}`}
              checked={task.status === 'completed'}
              onCheckedChange={() => toggleTaskStatus(task.id)}
              className="mt-0.5"
            />
            
            <div className="flex-1 min-w-0">
              <label 
                htmlFor={`task-${task.id}`}
                className={`font-medium text-gray-800 dark:text-gray-200 mb-0.5 block text-sm truncate ${
                  task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-500' : ''
                }`}
              >
                {task.title}
              </label>
              
              {task.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">
                  {task.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-1.5 mt-1">
                {task.dueDate && (
                  <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <CalendarIcon size={10} className="mr-1" />
                    {task.dueDate}
                  </span>
                )}
                
                <span 
                  className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${categoryColor}20`,
                    color: categoryColor,
                  }}
                >
                  <Tag size={8} className="mr-0.5" />
                  {category?.name || task.category}
                </span>
                
                {task.priority && (
                  <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                    task.priority === 'high'
                      ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/40 dark:text-rose-200'
                      : task.priority === 'medium'
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/40 dark:text-amber-200'
                        : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/40 dark:text-emerald-200'
                  } font-medium`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => deleteTask(task.id)}
                title="Delete task"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;

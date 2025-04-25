import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Calendar as CalendarIcon, CheckCircle, Clock, Tag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTaskContext } from '@/contexts/TaskContext';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const Calendar = () => {
  const { tasks, categories, toggleTaskStatus, deleteTask } = useTaskContext();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Format date display
  const formattedDate = date ? format(date, 'MMMM d, yyyy') : 'Select a date';
  
  // Get tasks for the selected date
  const getTasksForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter(task => {
      if (!task.due_date) return false;

      if (task.due_date.toLowerCase() === 'today') {
        return selectedDate.getTime() === today.getTime();
      }

      if (task.due_date.toLowerCase() === 'tomorrow') {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return selectedDate.getTime() === tomorrow.getTime();
      }

      try {
        if (task.due_date.includes('T')) {
          const taskDate = new Date(task.due_date);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate.getTime() === selectedDate.getTime();
        }

        const taskDate = new Date(task.due_date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === selectedDate.getTime();
      } catch (e) {
        console.error('Error parsing date:', e);
        return false;
      }
    });
  };
  
  const tasksForSelectedDate = getTasksForDate(date);
  
  const handleToggleTask = (taskId: string) => {
    toggleTaskStatus(taskId);
    toast.success("Task status updated");
  };
  
  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast.success("Task deleted successfully");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Calendar" />
      
      <main className="flex-1 p-3 sm:p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Calendar View</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Card className="md:col-span-1 dark:bg-gray-800/60 dark:border-gray-700">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 dark:text-gray-100 text-base sm:text-lg">
                <CalendarIcon size={18} className="text-primary" />
                Date Picker
              </CardTitle>
              <CardDescription className="dark:text-gray-300 text-sm">Select a date to view tasks</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <div className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow dark:border-gray-700 w-full max-w-[300px] touch-manipulation"
                  classNames={{
                    day_today: "bg-primary/20 text-primary font-bold dark:bg-blue-600/30 dark:text-blue-100 dark:font-bold",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700",
                    day: "h-9 w-9 sm:h-10 sm:w-10 p-0 font-normal aria-selected:opacity-100",
                    cell: "h-9 w-9 sm:h-10 sm:w-10 p-0 relative focus-within:relative focus-within:z-20"
                  }}
                />
              </div>
              <div className="mt-3 sm:mt-4 text-center">
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Current date:</span>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">{formattedDate}</h2>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 dark:bg-gray-800/60 dark:border-gray-700">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 dark:text-gray-100 text-base sm:text-lg">
                <Clock size={18} className="text-primary" />
                Tasks for {formattedDate}
              </CardTitle>
              <CardDescription className="dark:text-gray-300 text-sm">
                {tasksForSelectedDate.length > 0 
                  ? `You have ${tasksForSelectedDate.length} task(s) scheduled`
                  : 'No tasks scheduled for this date'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {tasksForSelectedDate.length === 0 ? (
                  <div className="py-6 sm:py-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No tasks scheduled for this date</p>
                    <Button 
                      className="mt-3 sm:mt-4 text-sm sm:text-base" 
                      variant="outline"
                      onClick={() => window.location.href = '/tasks'}
                    >
                      Add a task
                    </Button>
                  </div>
                ) : (
                  tasksForSelectedDate.map(task => {
                    const category = categories.find(c => c.id === task.category || c.name.toLowerCase() === task.category.toLowerCase());
                    const categoryColor = category?.color || '#9ca3af';
                    
                    return (
                      <div 
                        key={task.id} 
                        className={`p-3 sm:p-4 rounded-lg border ${
                          task.status === 'completed' 
                            ? 'bg-gray-50 dark:bg-gray-800/70 border-gray-100 dark:border-gray-700' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/40 border-gray-100 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="flex-shrink-0">
                            <Checkbox 
                              checked={task.status === 'completed'}
                              onCheckedChange={() => handleToggleTask(task.id)}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-medium text-sm sm:text-base ${
                              task.status === 'completed' 
                                ? 'text-gray-500 line-through dark:text-gray-400' 
                                : 'text-gray-800 dark:text-gray-200'
                            }`}>
                              {task.title}
                            </h3>
                            
                            {task.description && (
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{task.description}</p>
                            )}
                            
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock size={12} className="mr-1" />
                                {task.due_date}
                              </span>
                              
                              <span 
                                className="inline-flex items-center px-1.5 sm:px-2 py-0.5 text-xs font-medium rounded-full"
                                style={{
                                  backgroundColor: `${categoryColor}30`,
                                  color: categoryColor,
                                }}
                              >
                                <Tag size={10} className="mr-1" />
                                {category?.name || task.category}
                              </span>
                              
                              {task.priority && (
                                <span className={`px-1.5 sm:px-2 py-0.5 text-xs rounded-full ${
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
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full flex-shrink-0"
                            onClick={() => handleDeleteTask(task.id)}
                            title="Delete task"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Calendar;

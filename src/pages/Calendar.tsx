
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
    
    const dateStr = format(date, 'yyyy-MM-dd');
    return tasks.filter(task => {
      // Check if the task has a due date
      if (!task.dueDate) return false;
      
      // Check for today's tasks
      if (task.dueDate.toLowerCase().includes('today')) {
        const today = format(new Date(), 'yyyy-MM-dd');
        return today === dateStr;
      }
      
      // Check for tomorrow's tasks
      if (task.dueDate.toLowerCase().includes('tomorrow')) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = format(tomorrow, 'yyyy-MM-dd');
        return tomorrowStr === dateStr;
      }
      
      // Try to parse other date formats
      try {
        if (task.dueDate.includes(',')) {
          // Parse date like "May 20, 2023"
          const taskDate = new Date(task.dueDate);
          return format(taskDate, 'yyyy-MM-dd') === dateStr;
        }
      } catch (e) {
        // Parsing failed, return false
        return false;
      }
      
      return false;
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
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Calendar View</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 dark:bg-gray-800/60 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-gray-100">
                <CalendarIcon size={18} className="text-primary" />
                Date Picker
              </CardTitle>
              <CardDescription className="dark:text-gray-300">Select a date to view tasks</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow dark:border-gray-700"
                  classNames={{
                    day_today: "bg-primary/20 text-primary font-bold dark:bg-blue-600/30 dark:text-blue-100 dark:font-bold",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Current date:</span>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{formattedDate}</h2>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 dark:bg-gray-800/60 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-gray-100">
                <Clock size={18} className="text-primary" />
                Tasks for {formattedDate}
              </CardTitle>
              <CardDescription className="dark:text-gray-300">
                {tasksForSelectedDate.length > 0 
                  ? `You have ${tasksForSelectedDate.length} task(s) scheduled`
                  : 'No tasks scheduled for this date'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasksForSelectedDate.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No tasks scheduled for this date</p>
                    <Button 
                      className="mt-4" 
                      variant="outline"
                      onClick={() => window.location.href = '/tasks'}
                    >
                      Add a task
                    </Button>
                  </div>
                ) : (
                  tasksForSelectedDate.map(task => {
                    // Find the category object to get the color
                    const category = categories.find(c => c.id === task.category || c.name.toLowerCase() === task.category.toLowerCase());
                    const categoryColor = category?.color || '#9ca3af'; // Default gray if not found
                    
                    return (
                      <div 
                        key={task.id} 
                        className={`p-4 rounded-lg border ${
                          task.status === 'completed' 
                            ? 'bg-gray-50 dark:bg-gray-800/70 border-gray-100 dark:border-gray-700' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/40 border-gray-100 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3 mt-1">
                            <Checkbox 
                              checked={task.status === 'completed'}
                              onCheckedChange={() => handleToggleTask(task.id)}
                              className="mt-0.5"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-medium ${
                              task.status === 'completed' 
                                ? 'text-gray-500 line-through dark:text-gray-400' 
                                : 'text-gray-800 dark:text-gray-200'
                            }`}>
                              {task.title}
                            </h3>
                            
                            {task.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
                            )}
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock size={12} className="mr-1" />
                                {task.dueDate}
                              </span>
                              
                              <span 
                                className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
                                style={{
                                  backgroundColor: `${categoryColor}30`, // 30% opacity
                                  color: categoryColor,
                                }}
                              >
                                <Tag size={10} className="mr-1" />
                                {category?.name || task.category}
                              </span>
                              
                              {task.priority && (
                                <span className={`px-2 py-0.5 text-xs rounded-full ${
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
                            className="h-8 w-8 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full"
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

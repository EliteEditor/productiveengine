
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Calendar as CalendarIcon, Clock, Tag, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, addMonths, subMonths, isToday, isSameDay, parseISO } from 'date-fns';
import { useTaskContext } from '@/contexts/TaskContext';

const Calendar = () => {
  const { tasks, categories } = useTaskContext();
  const [date, setDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Helper function to navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(direction === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1));
  };
  
  // Helper function to format date for display
  const formatDateToDisplay = (date: Date) => {
    return format(date, 'MMMM yyyy');
  };
  
  // Convert task due dates to actual Date objects where possible
  const getTaskDate = (task: any): Date | null => {
    const dueDate = task.dueDate?.toLowerCase();
    
    if (!dueDate) return null;
    
    if (dueDate.includes('today')) {
      return new Date();
    } else if (dueDate.includes('tomorrow')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    } else if (dueDate.includes('yesterday')) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    }
    
    // Try to parse a date string (this is simplified)
    try {
      // Handle various date formats
      if (dueDate.match(/^\d{4}-\d{2}-\d{2}/)) {
        return parseISO(dueDate);
      }
      
      // For simplicity, we'll just return null for other formats
      return null;
    } catch (e) {
      return null;
    }
  };
  
  // Get tasks for the selected date
  const getTasksForDate = (selectedDate: Date) => {
    return tasks.filter(task => {
      const taskDate = getTaskDate(task);
      return taskDate && isSameDay(taskDate, selectedDate);
    });
  };
  
  // Get the selected day's tasks
  const selectedDayTasks = getTasksForDate(date);
  
  // Get dates with tasks for highlighting in the calendar
  const datesWithTasks = tasks.reduce((acc: Date[], task) => {
    const taskDate = getTaskDate(task);
    if (taskDate) {
      acc.push(taskDate);
    }
    return acc;
  }, []);
  
  // Format the day string (e.g., "Monday, April 15")
  const dayString = format(date, 'EEEE, MMMM d');
  
  // Determine if the selected date is today
  const isSelectedToday = isToday(date);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Calendar" />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Calendar View</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Visualize your tasks and goals on a timeline</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar navigation */}
          <div className="glass rounded-xl p-5 card-shadow animate-scale-in lg:col-span-1 dark:bg-gray-800/40 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium flex items-center text-gray-800 dark:text-gray-100">
                <CalendarIcon size={18} className="mr-2 text-primary" />
                <span>{formatDateToDisplay(currentMonth)}</span>
              </h2>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => navigateMonth('prev')}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => navigateMonth('next')}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              modifiersStyles={{
                today: { fontWeight: 'bold' },
              }}
              modifiers={{
                highlighted: (date) => 
                  datesWithTasks.some(taskDate => isSameDay(taskDate, date)),
              }}
              styles={{
                highlighted: { 
                  color: 'var(--primary)', 
                  background: 'var(--primary-light)',
                },
              }}
            />
          </div>
          
          {/* Daily events */}
          <div className="glass rounded-xl p-5 card-shadow animate-scale-in animate-delay-200 lg:col-span-2 dark:bg-gray-800/40 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 flex items-center">
                  {isSelectedToday ? (
                    <Badge variant="outline" className="mr-2 bg-primary text-primary-foreground">Today</Badge>
                  ) : null}
                  {dayString}
                </h2>
                {selectedDayTasks.length > 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedDayTasks.length} task{selectedDayTasks.length !== 1 ? 's' : ''} scheduled
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    No tasks scheduled
                  </p>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setDate(new Date())}
                className="h-8"
              >
                Today
              </Button>
            </div>
            
            {selectedDayTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                <CalendarIcon size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No tasks scheduled for this day</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Select a different date or add a new task</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDayTasks.map((task) => {
                  // Find the category object to get the color
                  const category = categories.find(c => c.id === task.category || c.name.toLowerCase() === task.category.toLowerCase());
                  const categoryColor = category?.color || '#9ca3af'; // Default gray if not found
                  
                  const isPriority = task.priority === 'high';
                  
                  return (
                    <div 
                      key={task.id} 
                      className={`flex items-start p-3 border border-gray-100 dark:border-gray-700 rounded-lg 
                        ${task.status === 'completed' ? 'bg-gray-50/50 dark:bg-gray-800/30' : 'hover:bg-gray-50 dark:hover:bg-gray-800/20'}
                        ${isPriority ? 'border-l-4' : ''}
                        transition-colors`}
                      style={{
                        borderLeftColor: isPriority ? '#ef4444' : '',
                      }}
                    >
                      <div className={`${isPriority ? 'pl-2' : ''} flex-shrink-0 mr-3 mt-1`}>
                        {task.status === 'completed' ? (
                          <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium text-gray-800 dark:text-gray-200 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
                        )}
                        <div className="flex items-center mt-2 gap-2">
                          {task.dueDate && task.dueDate.includes(',') && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <Clock size={12} className="mr-1" />
                              {task.dueDate.split(',')[1].trim()}
                            </span>
                          )}
                          
                          <span 
                            className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: `${categoryColor}20`, // 20% opacity
                              color: categoryColor,
                            }}
                          >
                            <Tag size={10} className="mr-1" />
                            {category?.name || task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                          </span>
                          
                          {isPriority && (
                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-rose-50 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
                              High Priority
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;


import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import ProductivityMetrics from '@/components/dashboard/ProductivityMetrics';
import TaskSummary from '@/components/dashboard/TaskSummary';
import { Plus, CheckCircle, Target, Calendar as CalendarIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTaskContext } from '@/contexts/TaskContext';
import { useGoalContext } from '@/contexts/GoalContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Index = () => {
  const { goals } = useGoalContext();
  const { tasks, addTask, toggleTaskStatus, categories } = useTaskContext();
  const [greeting, setGreeting] = useState('Hello');
  
  // Get greeting based on time of day
  useEffect(() => {
    const getCurrentGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning';
      if (hour < 18) return 'Good Afternoon';
      return 'Good Evening';
    };
    
    setGreeting(getCurrentGreeting());
  }, []);
  
  // State for add task dialog
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState(categories[0]?.id || 'work');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('Today');
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low' | 'none'>('none');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      return;
    }

    // Format the due date
    let dueDateString = taskDueDate;
    if (dueDate) {
      dueDateString = format(dueDate, 'PPP');
    }

    addTask({
      title: taskTitle,
      status: 'pending',
      category: taskCategory,
      description: taskDescription || undefined,
      dueDate: dueDateString || 'Today',
      priority: taskPriority !== 'none' ? taskPriority : undefined
    });
    
    // Reset form and close dialog
    setTaskTitle('');
    setTaskCategory(categories[0]?.id || 'work');
    setTaskDescription('');
    setTaskDueDate('Today');
    setDueDate(undefined);
    setTaskPriority('none');
    setIsAddTaskOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100 mb-1">{greeting}!</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Welcome to your productivity dashboard</p>
            </div>
            <Button onClick={() => setIsAddTaskOpen(true)} className="mt-3 sm:mt-0">
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </div>

          <ProductivityMetrics />

          <div className="grid gap-6 md:grid-cols-2">
            {/* Today's Tasks with Mini Calendar */}
            <TaskSummary />

            {/* Goal Progress */}
            <div className="rounded-xl overflow-hidden card-shadow animate-scale-in dark:bg-gray-800/50 dark:border-gray-700 gradient-border">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Goal Progress</h2>
                <a href="/goals" className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
                  View All
                </a>
              </div>
              <div className="p-5 space-y-6">
                {goals.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No goals set</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => window.location.href = '/goals'}
                    >
                      <Target className="mr-2 h-4 w-4" />
                      Set your first goal
                    </Button>
                  </div>
                ) : (
                  goals.slice(0, 3).map(goal => (
                    <div key={goal.id} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-[70%]">{goal.title}</span>
                        <span className="text-sm text-primary font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      {goal.priority && (
                        <div className="mt-2">
                          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            goal.priority === 'high' ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/40 dark:text-rose-200' :
                            goal.priority === 'medium' ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/40 dark:text-amber-200' :
                            'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/40 dark:text-emerald-200'
                          }`}>
                            {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task with a title, category, and optional details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="task-title" className="dark:text-gray-200 text-xs">Title</Label>
              <Input 
                id="task-title" 
                value={taskTitle} 
                onChange={(e) => setTaskTitle(e.target.value)} 
                placeholder="Enter task title" 
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-8 text-xs"
              />
            </div>
            
            <div className="grid gap-1.5">
              <Label htmlFor="task-category" className="dark:text-gray-200 text-xs">Category</Label>
              <Select value={taskCategory} onValueChange={setTaskCategory}>
                <SelectTrigger id="task-category" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-8 text-xs">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id} className="text-xs">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-1.5">
              <Label htmlFor="task-description" className="dark:text-gray-200 text-xs">Description (Optional)</Label>
              <Input 
                id="task-description" 
                value={taskDescription} 
                onChange={(e) => setTaskDescription(e.target.value)} 
                placeholder="Enter task description" 
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-8 text-xs"
              />
            </div>
            
            <div className="grid gap-1.5">
              <Label htmlFor="task-due-date" className="dark:text-gray-200 text-xs">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal h-8 text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-1.5">
              <Label htmlFor="task-priority" className="dark:text-gray-200 text-xs">Priority (Optional)</Label>
              <Select value={taskPriority} onValueChange={(value) => setTaskPriority(value as 'high' | 'medium' | 'low' | 'none')}>
                <SelectTrigger id="task-priority" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-8 text-xs">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="none" className="text-xs">None</SelectItem>
                  <SelectItem value="high" className="text-xs">High</SelectItem>
                  <SelectItem value="medium" className="text-xs">Medium</SelectItem>
                  <SelectItem value="low" className="text-xs">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

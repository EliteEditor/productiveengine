import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import ProductivityMetrics from '@/components/dashboard/ProductivityMetrics';
import CoachingInsights from '@/components/dashboard/CoachingInsights';
import TaskSummary from '@/components/dashboard/TaskSummary';
import { Plus, CheckCircle, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTaskContext } from '@/contexts/TaskContext';
import { useGoalContext } from '@/contexts/GoalContext';

const Index = () => {
  const { goals } = useGoalContext();
  const { tasks, addTask, categories } = useTaskContext();
  
  // State for add task dialog
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState(categories[0]?.id || 'work');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('Today');

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      return;
    }

    addTask({
      title: taskTitle,
      status: 'pending',
      category: taskCategory,
      description: taskDescription || undefined,
      dueDate: taskDueDate || undefined
    });
    
    // Reset form and close dialog
    setTaskTitle('');
    setTaskCategory(categories[0]?.id || 'work');
    setTaskDescription('');
    setTaskDueDate('Today');
    setIsAddTaskOpen(false);
  };

  // Get today's tasks
  const todayTasks = tasks.filter(task => {
    const dueDate = task.dueDate?.toLowerCase();
    return dueDate?.includes('today');
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="mb-8 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-sm text-gray-500 dark:text-gray-400 font-medium">Good afternoon, Alex</h2>
            <div className="flex flex-wrap items-center justify-between mt-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Your Productivity Dashboard</h1>
              
              <div className="flex gap-3 mt-4 sm:mt-0">
                <Button variant="outline" className="flex items-center" onClick={() => setIsAddTaskOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  <span className="font-medium">Add Task</span>
                </Button>
              </div>
            </div>
          </div>
          
          <ProductivityMetrics />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="glass rounded-xl p-5 card-shadow animate-scale-in mb-6 dark:bg-gray-800/40 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Today's Tasks</h2>
                  <a href="/tasks" className="text-sm text-primary font-medium hover:underline">View All</a>
                </div>
                
                <div className="space-y-3">
                  {todayTasks.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks scheduled for today</p>
                  ) : (
                    todayTasks.map(task => {
                      // Find the category color
                      const category = categories.find(c => c.id === task.category || c.name.toLowerCase() === task.category.toLowerCase());
                      const categoryColor = category?.color || '#9ca3af'; // Default gray if not found
                      
                      return (
                        <div 
                          key={task.id} 
                          className={`flex items-center p-3 rounded-lg border ${
                            task.status === 'completed' 
                              ? 'bg-gray-50 dark:bg-gray-800/60 border-gray-100 dark:border-gray-700' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800/30 border-gray-100 dark:border-gray-700'
                          } transition-colors`}
                        >
                          <div className="flex-shrink-0 mr-3">
                            <CheckCircle 
                              size={18} 
                              className={task.status === 'completed' ? 'text-green-500 fill-green-500' : 'text-gray-300 dark:text-gray-600'} 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium ${
                              task.status === 'completed' 
                                ? 'text-gray-500 line-through dark:text-gray-400' 
                                : 'text-gray-800 dark:text-gray-200'
                            }`}>
                              {task.title}
                            </p>
                          </div>
                          <span 
                            className="px-2 py-0.5 text-xs rounded-full font-medium"
                            style={{
                              backgroundColor: `${categoryColor}20`, // 20% opacity
                              color: categoryColor,
                            }}
                          >
                            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              
              <CoachingInsights className="mb-6" />
              
              <div className="glass rounded-xl p-5 card-shadow animate-scale-in animate-delay-500 dark:bg-gray-800/40 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Focus Graph</h2>
                <div className="h-[240px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-100 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Focus productivity trends visualization</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass rounded-xl p-5 card-shadow animate-scale-in mb-6 dark:bg-gray-800/40 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 flex items-center">
                    <Target size={18} className="mr-2 text-primary" />
                    Goal Progress
                  </h2>
                  <a href="/goals" className="text-sm text-primary font-medium hover:underline">View All</a>
                </div>
                
                <div className="space-y-4">
                  {goals.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No goals added yet</p>
                  ) : (
                    goals.slice(0, 3).map(goal => (
                      <div key={goal.id} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{goal.title}</span>
                          <span className="text-sm text-primary font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <TaskSummary className="h-full" />
            </div>
          </div>
        </div>
      </main>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task to track your progress
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input 
                id="task-title" 
                value={taskTitle} 
                onChange={(e) => setTaskTitle(e.target.value)} 
                placeholder="Enter task title" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-category">Category</Label>
              <Select value={taskCategory} onValueChange={setTaskCategory}>
                <SelectTrigger id="task-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center">
                        <span 
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        ></span>
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-description">Description (Optional)</Label>
              <Input
                id="task-description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-due-date">Due Date</Label>
              <Input
                id="task-due-date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                placeholder="e.g., Today, Tomorrow, etc."
              />
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

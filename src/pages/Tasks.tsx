
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { ListPlus, Filter, Tag, Calendar as CalendarIcon, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useTaskContext, TaskCategory } from '@/contexts/TaskContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Tasks = () => {
  const { tasks, toggleTaskStatus, addTask, deleteTask, categories, addCategory } = useTaskContext();

  // State for filtering
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Filter tasks based on the active filter
  const filteredTasks = activeFilter 
    ? tasks.filter(task => task.category === activeFilter) 
    : tasks;

  // State for add task dialog
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState<TaskCategory>(categories[0]?.id || 'work');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low' | 'none'>('none');
  
  // Date picker for due date
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [customDueDate, setCustomDueDate] = useState('');
  const [useDatePicker, setUseDatePicker] = useState(true);

  // State for add category dialog
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#3b82f6');

  // Handle adding new task
  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      toast.error('Task title cannot be empty');
      return;
    }

    // Format the due date
    let dueDateString: string | undefined = undefined;
    
    if (useDatePicker && dueDate) {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      
      if (dueDate.toDateString() === today.toDateString()) {
        dueDateString = 'Today';
      } else if (dueDate.toDateString() === tomorrow.toDateString()) {
        dueDateString = 'Tomorrow';
      } else {
        dueDateString = format(dueDate, 'MMMM d, yyyy');
      }
    } else if (!useDatePicker && customDueDate) {
      dueDateString = customDueDate;
    }

    addTask({
      title: taskTitle,
      status: 'pending',
      category: taskCategory,
      description: taskDescription || undefined,
      dueDate: dueDateString,
      priority: taskPriority !== 'none' ? taskPriority : undefined
    });
    
    // Reset form and close dialog
    setTaskTitle('');
    setTaskCategory(categories[0]?.id || 'work');
    setTaskDescription('');
    setDueDate(undefined);
    setCustomDueDate('');
    setTaskPriority('none');
    setIsAddTaskOpen(false);
  };

  // Handle adding new category
  const handleAddCategory = () => {
    if (categoryName.trim() === '') {
      toast.error('Category name cannot be empty');
      return;
    }

    addCategory({
      name: categoryName,
      color: categoryColor,
    });
    
    // Reset form and close dialog
    setCategoryName('');
    setCategoryColor('#3b82f6');
    setIsAddCategoryOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Tasks" />
      
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-4 flex flex-wrap items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Task Management</h1>
          
          <div className="flex items-center mt-2 sm:mt-0 space-x-2">
            <button 
              className="flex items-center px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs"
              onClick={() => setActiveFilter(null)}
            >
              <Filter size={14} className="mr-1.5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-700 dark:text-gray-300">All Tasks</span>
            </button>
            
            <Button className="flex items-center text-xs h-8" onClick={() => setIsAddTaskOpen(true)}>
              <ListPlus size={14} className="mr-1.5" />
              <span className="font-medium">New Task</span>
            </Button>
          </div>
        </div>
        
        <div className="glass rounded-lg p-3 card-shadow animate-scale-in dark:bg-gray-800/50 dark:border-gray-700">
          <div className="mb-3 flex flex-wrap gap-1.5 items-center">
            <span 
              className={`px-2 py-0.5 text-xs font-medium rounded-full cursor-pointer ${
                activeFilter === null
                  ? 'bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-foreground'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setActiveFilter(null)}
            >
              All
            </span>
            
            {categories.map(category => (
              <span 
                key={category.id}
                className={`px-2 py-0.5 text-xs font-medium rounded-full cursor-pointer`}
                style={{
                  backgroundColor: activeFilter === category.id 
                    ? `${category.color}30` // 30% opacity for active
                    : `${category.color}15`, // 15% opacity for inactive
                  color: category.color
                }}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.name}
              </span>
            ))}
            
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-6 rounded-full px-2"
              onClick={() => setIsAddCategoryOpen(true)}
            >
              <Plus size={10} className="mr-1" />
              Add
            </Button>
          </div>
          
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredTasks.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-xs">No tasks found</p>
                <Button 
                  className="mt-3 text-xs h-7" 
                  variant="outline"
                  onClick={() => setIsAddTaskOpen(true)}
                >
                  <Plus size={14} className="mr-1.5" />
                  Add a new task
                </Button>
              </div>
            ) : (
              filteredTasks.map((task) => {
                // Find the category object to get the color
                const category = categories.find(c => c.id === task.category || c.name.toLowerCase() === task.category.toLowerCase());
                const categoryColor = category?.color || '#9ca3af'; // Default gray if not found
                
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
                        className={`font-medium text-gray-800 dark:text-gray-200 mb-0.5 block text-sm truncate ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-500' : ''}`}
                      >
                        {task.title}
                      </label>
                      
                      {task.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">{task.description}</p>
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
                            backgroundColor: `${categoryColor}20`, // 20% opacity
                            color: categoryColor,
                          }}
                        >
                          <Tag size={8} className="mr-0.5" />
                          {category?.name || task.category.charAt(0).toUpperCase() + task.category.slice(1)}
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
              })
            )}
          </div>
        </div>
      </main>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[400px] dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100 text-base">Add New Task</DialogTitle>
            <DialogDescription className="dark:text-gray-300 text-xs">Create a new task to track your progress</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-3">
            <div className="grid gap-1.5">
              <Label htmlFor="task-title" className="dark:text-gray-200 text-xs">Task Title</Label>
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
              <Select value={taskCategory} onValueChange={(value) => setTaskCategory(value as TaskCategory)}>
                <SelectTrigger id="task-category" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-8 text-xs">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id} className="text-xs">
                      <div className="flex items-center">
                        <span 
                          className="w-2 h-2 rounded-full mr-1.5"
                          style={{ backgroundColor: category.color }}
                        ></span>
                        {category.name}
                      </div>
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
            <div className="grid gap-1.5">
              <div className="flex justify-between">
                <Label className="dark:text-gray-200 text-xs">Due Date (Optional)</Label>
                <div className="flex gap-2 items-center">
                  <Label 
                    htmlFor="use-date-picker" 
                    className="text-[10px] cursor-pointer dark:text-gray-300"
                    onClick={() => setUseDatePicker(true)}
                  >
                    <span className={`${useDatePicker ? 'text-primary font-medium' : ''}`}>Date Picker</span>
                  </Label>
                  <span className="dark:text-gray-400">|</span>
                  <Label 
                    htmlFor="use-custom-date" 
                    className="text-[10px] cursor-pointer dark:text-gray-300"
                    onClick={() => setUseDatePicker(false)}
                  >
                    <span className={`${!useDatePicker ? 'text-primary font-medium' : ''}`}>Custom</span>
                  </Label>
                </div>
              </div>
              
              {useDatePicker ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-8 text-xs",
                        !dueDate && "text-muted-foreground dark:text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3 w-3" />
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
              ) : (
                <Input 
                  value={customDueDate} 
                  onChange={(e) => setCustomDueDate(e.target.value)} 
                  placeholder="e.g., Today, Tomorrow, Next week" 
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-8 text-xs"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)} className="dark:border-gray-600 dark:text-gray-200 text-xs h-8">Cancel</Button>
            <Button onClick={handleAddTask} className="text-xs h-8">Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-[400px] dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100 text-base">Add New Category</DialogTitle>
            <DialogDescription className="dark:text-gray-300 text-xs">Create a custom category with a color</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-3">
            <div className="grid gap-1.5">
              <Label htmlFor="category-name" className="dark:text-gray-200 text-xs">Category Name</Label>
              <Input 
                id="category-name" 
                value={categoryName} 
                onChange={(e) => setCategoryName(e.target.value)} 
                placeholder="Enter category name" 
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 h-8 text-xs"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="category-color" className="dark:text-gray-200 text-xs">Category Color</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: categoryColor }}
                ></div>
                <Input 
                  id="category-color" 
                  type="color"
                  value={categoryColor} 
                  onChange={(e) => setCategoryColor(e.target.value)} 
                  className="w-20 h-8 p-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-8 gap-1.5 mt-1">
              {[
                '#ef4444', // red
                '#f97316', // orange
                '#f59e0b', // amber
                '#10b981', // emerald
                '#3b82f6', // blue
                '#8b5cf6', // violet
                '#d946ef', // pink
                '#64748b', // slate
              ].map(color => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 ${categoryColor === color ? 'ring-1 ring-offset-1 ring-gray-500 dark:ring-gray-300' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCategoryColor(color)}
                  type="button"
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)} className="dark:border-gray-600 dark:text-gray-200 text-xs h-8">Cancel</Button>
            <Button onClick={handleAddCategory} className="text-xs h-8">Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;

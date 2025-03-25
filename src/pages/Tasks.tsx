
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { ListPlus, Filter, Tag, Calendar, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useTaskContext, TaskCategory } from '@/contexts/TaskContext';

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
  const [taskDueDate, setTaskDueDate] = useState('');

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
    setTaskDueDate('');
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
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6 flex flex-wrap items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Task Management</h1>
          
          <div className="flex items-center mt-4 sm:mt-0 space-x-3">
            <button 
              className="flex items-center px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setActiveFilter(null)}
            >
              <Filter size={16} className="mr-2 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">All Tasks</span>
            </button>
            
            <Button className="flex items-center" onClick={() => setIsAddTaskOpen(true)}>
              <ListPlus size={16} className="mr-2" />
              <span className="text-sm font-medium">New Task</span>
            </Button>
          </div>
        </div>
        
        <div className="glass rounded-xl p-5 card-shadow animate-scale-in dark:bg-gray-800/40 dark:border-gray-700">
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <span 
              className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer ${
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
                className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer`}
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
              className="text-xs rounded-full"
              onClick={() => setIsAddCategoryOpen(true)}
            >
              <Plus size={12} className="mr-1" />
              Add Category
            </Button>
          </div>
          
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredTasks.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
                <Button 
                  className="mt-4" 
                  variant="outline"
                  onClick={() => setIsAddTaskOpen(true)}
                >
                  <Plus size={16} className="mr-2" />
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
                    className={`py-4 flex items-start gap-3 ${task.status === 'completed' ? 'opacity-70' : ''}`}
                  >
                    <Checkbox 
                      id={`task-${task.id}`}
                      checked={task.status === 'completed'}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <label 
                        htmlFor={`task-${task.id}`}
                        className={`font-medium text-gray-800 dark:text-gray-200 mb-1 block ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-500' : ''}`}
                      >
                        {task.title}
                      </label>
                      
                      {task.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{task.description}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {task.dueDate && (
                          <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar size={12} className="mr-1" />
                            {task.dueDate}
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
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => deleteTask(task.id)}
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
        </div>
      </main>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Create a new task to track your progress</DialogDescription>
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
              <Select value={taskCategory} onValueChange={(value) => setTaskCategory(value as TaskCategory)}>
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
              <Label htmlFor="task-due-date">Due Date (Optional)</Label>
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

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a custom category with a color</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input 
                id="category-name" 
                value={categoryName} 
                onChange={(e) => setCategoryName(e.target.value)} 
                placeholder="Enter category name" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-color">Category Color</Label>
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: categoryColor }}
                ></div>
                <Input 
                  id="category-color" 
                  type="color"
                  value={categoryColor} 
                  onChange={(e) => setCategoryColor(e.target.value)} 
                  className="w-24 h-10 p-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 mt-2">
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
                  className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${categoryColor === color ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCategoryColor(color)}
                  type="button"
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;

import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTaskContext } from '@/contexts/TaskContext';

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTaskDialog = ({ open, onOpenChange }: AddTaskDialogProps) => {
  const { addTask, categories } = useTaskContext();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState(categories[0]?.id || 'work');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low' | 'none'>('none');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [useDatePicker, setUseDatePicker] = useState(true);
  const [customDueDate, setCustomDueDate] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Select value={taskCategory} onValueChange={(value) => setTaskCategory(value as any)}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)} className="dark:border-gray-600 dark:text-gray-200 text-xs h-8">Cancel</Button>
          <Button onClick={handleAddTask} className="text-xs h-8">Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;

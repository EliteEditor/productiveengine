
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Target, Filter, Plus, Calendar as CalendarIcon, Tag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGoalContext } from '@/contexts/GoalContext';
import { useTaskContext } from '@/contexts/TaskContext';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Goals = () => {
  const { goals, addGoal, deleteGoal, toggleMilestone } = useGoalContext();
  const { categories, addCategory } = useTaskContext();
  
  // State for filtering
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Filter goals based on the active filter
  const filteredGoals = activeFilter 
    ? goals.filter(goal => goal.category === activeFilter) 
    : goals;
  
  // State for add goal dialog
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');
  const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(undefined);
  const [goalCategory, setGoalCategory] = useState(categories[0]?.id || 'work');
  const [milestones, setMilestones] = useState<{ title: string }[]>([{ title: '' }]);
  
  // State for add category dialog
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#3b82f6');

  // Add empty milestone field
  const addMilestoneField = () => {
    setMilestones([...milestones, { title: '' }]);
  };

  // Update milestone title
  const updateMilestoneTitle = (index: number, title: string) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index].title = title;
    setMilestones(updatedMilestones);
  };

  // Remove milestone field
  const removeMilestoneField = (index: number) => {
    if (milestones.length === 1) {
      return; // Keep at least one milestone
    }
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  // Handle adding new goal
  const handleAddGoal = () => {
    if (goalTitle.trim() === '') {
      toast.error('Goal title cannot be empty');
      return;
    }

    // Use date from date picker if available, otherwise use text input
    let deadline = goalDeadline;
    if (deadlineDate) {
      deadline = format(deadlineDate, 'MMMM d, yyyy');
    }

    if (deadline.trim() === '') {
      toast.error('Please set a deadline');
      return;
    }

    // Filter out empty milestones
    const validMilestones = milestones
      .filter(m => m.title.trim() !== '')
      .map((m, index) => ({
        id: `m${index + 1}`,
        title: m.title,
        completed: false
      }));

    if (validMilestones.length === 0) {
      toast.error('Add at least one milestone');
      return;
    }

    addGoal({
      title: goalTitle,
      deadline: deadline,
      progress: 0,
      milestones: validMilestones,
      category: goalCategory
    });

    // Reset form and close dialog
    setGoalTitle('');
    setGoalDeadline('');
    setDeadlineDate(undefined);
    setGoalCategory(categories[0]?.id || 'work');
    setMilestones([{ title: '' }]);
    setIsAddGoalOpen(false);
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
      <Header title="Goals" />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6 flex flex-wrap items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Goal Tracking</h1>
          
          <div className="flex items-center mt-4 sm:mt-0 space-x-3">
            <button 
              className="flex items-center px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setActiveFilter(null)}
            >
              <Filter size={16} className="mr-2 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">All Goals</span>
            </button>
            
            <Button className="flex items-center" onClick={() => setIsAddGoalOpen(true)}>
              <Plus size={16} className="mr-2" />
              <span className="text-sm font-medium">New Goal</span>
            </Button>
          </div>
        </div>
        
        <div className="glass rounded-xl p-5 card-shadow animate-scale-in dark:bg-gray-800/50 dark:border-gray-700">
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

          {filteredGoals.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-500 dark:text-gray-400">No goals found</p>
              <Button 
                className="mt-4" 
                variant="outline"
                onClick={() => setIsAddGoalOpen(true)}
              >
                <Plus size={16} className="mr-2" />
                Add a new goal
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredGoals.map((goal) => {
                // Find the category object to get the color
                const category = categories.find(c => c.id === goal.category || c.name?.toLowerCase() === goal.category?.toLowerCase());
                const categoryColor = category?.color || '#9ca3af'; // Default gray if not found
                
                return (
                  <div key={goal.id} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Target size={18} className="text-primary mr-2" />
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">{goal.title}</h3>
                      </div>
                      <div className="flex items-center space-x-3">
                        {goal.category && (
                          <span 
                            className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: `${categoryColor}30`, // 30% opacity
                              color: categoryColor,
                            }}
                          >
                            <Tag size={10} className="mr-1" />
                            {category?.name || goal.category}
                          </span>
                        )}
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <CalendarIcon size={14} className="mr-1" />
                          {goal.deadline}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => deleteGoal(goal.id)}
                          title="Delete goal"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-primary font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Milestones</h4>
                      <div className="space-y-2">
                        {goal.milestones.map((milestone) => (
                          <div key={milestone.id} className="flex items-center">
                            <Checkbox 
                              id={milestone.id} 
                              className="mr-2" 
                              checked={milestone.completed}
                              onCheckedChange={() => toggleMilestone(goal.id, milestone.id)} 
                            />
                            <label 
                              htmlFor={milestone.id} 
                              className={`text-sm ${
                                milestone.completed 
                                  ? 'text-gray-500 dark:text-gray-500 line-through' 
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {milestone.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Add Goal Dialog */}
      <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
        <DialogContent className="sm:max-w-[500px] dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">Add New Goal</DialogTitle>
            <DialogDescription className="dark:text-gray-300">Create a new goal with milestones to track your progress</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="goal-title" className="dark:text-gray-200">Goal Title</Label>
              <Input 
                id="goal-title" 
                value={goalTitle} 
                onChange={(e) => setGoalTitle(e.target.value)} 
                placeholder="Enter goal title" 
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-deadline" className="dark:text-gray-200">Deadline</Label>
                <div className="flex flex-col gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100",
                          !deadlineDate && "text-muted-foreground dark:text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deadlineDate ? format(deadlineDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={deadlineDate}
                        onSelect={setDeadlineDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Or manually enter:</span>
                  </div>
                  
                  <Input 
                    id="goal-deadline" 
                    value={goalDeadline} 
                    onChange={(e) => setGoalDeadline(e.target.value)} 
                    placeholder="e.g., June 30, 2023" 
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="goal-category" className="dark:text-gray-200">Category</Label>
                <Select value={goalCategory} onValueChange={setGoalCategory}>
                  <SelectTrigger id="goal-category" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
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
                
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setIsAddGoalOpen(false);
                    setTimeout(() => setIsAddCategoryOpen(true), 100);
                  }}
                  className="mt-1 text-xs dark:border-gray-600 dark:text-gray-200"
                >
                  <Plus size={12} className="mr-1" />
                  Add New Category
                </Button>
              </div>
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label className="dark:text-gray-200">Milestones</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addMilestoneField}
                  className="text-xs h-7 dark:border-gray-600 dark:text-gray-200"
                >
                  <Plus size={12} className="mr-1" />
                  Add Milestone
                </Button>
              </div>
              
              <div className="space-y-2">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      value={milestone.title}
                      onChange={(e) => updateMilestoneTitle(index, e.target.value)}
                      placeholder={`Milestone ${index + 1}`}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeMilestoneField(index)}
                      disabled={milestones.length === 1}
                      className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Target size={14} className="rotate-45" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddGoalOpen(false)} className="dark:border-gray-600 dark:text-gray-200">Cancel</Button>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">Add New Category</DialogTitle>
            <DialogDescription className="dark:text-gray-300">Create a custom category with a color</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name" className="dark:text-gray-200">Category Name</Label>
              <Input 
                id="category-name" 
                value={categoryName} 
                onChange={(e) => setCategoryName(e.target.value)} 
                placeholder="Enter category name" 
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-color" className="dark:text-gray-200">Category Color</Label>
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
                  className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${categoryColor === color ? 'ring-2 ring-offset-2 ring-gray-500 dark:ring-gray-300' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCategoryColor(color)}
                  type="button"
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)} className="dark:border-gray-600 dark:text-gray-200">Cancel</Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Goals;

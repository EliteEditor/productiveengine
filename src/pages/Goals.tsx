
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Target, Filter, Plus, Calendar, Tag } from 'lucide-react';
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

const Goals = () => {
  const { goals, addGoal, toggleMilestone } = useGoalContext();
  const { categories } = useTaskContext();
  
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
  const [goalCategory, setGoalCategory] = useState(categories[0]?.id || 'work');
  const [milestones, setMilestones] = useState<{ title: string }[]>([{ title: '' }]);

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

    if (goalDeadline.trim() === '') {
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
      deadline: goalDeadline,
      progress: 0,
      milestones: validMilestones,
      category: goalCategory
    });

    // Reset form and close dialog
    setGoalTitle('');
    setGoalDeadline('');
    setGoalCategory(categories[0]?.id || 'work');
    setMilestones([{ title: '' }]);
    setIsAddGoalOpen(false);
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
                              backgroundColor: `${categoryColor}20`, // 20% opacity
                              color: categoryColor,
                            }}
                          >
                            <Tag size={10} className="mr-1" />
                            {category?.name || goal.category}
                          </span>
                        )}
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {goal.deadline}
                        </span>
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
            <DialogDescription>Create a new goal with milestones to track your progress</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input 
                id="goal-title" 
                value={goalTitle} 
                onChange={(e) => setGoalTitle(e.target.value)} 
                placeholder="Enter goal title" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-deadline">Deadline</Label>
                <Input 
                  id="goal-deadline" 
                  value={goalDeadline} 
                  onChange={(e) => setGoalDeadline(e.target.value)} 
                  placeholder="e.g., June 30, 2023" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal-category">Category</Label>
                <Select value={goalCategory} onValueChange={setGoalCategory}>
                  <SelectTrigger id="goal-category">
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
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Milestones</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addMilestoneField}
                  className="text-xs h-7"
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
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeMilestoneField(index)}
                      disabled={milestones.length === 1}
                      className="h-8 w-8 text-gray-400 hover:text-gray-600"
                    >
                      <Target size={14} className="rotate-45" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Goals;

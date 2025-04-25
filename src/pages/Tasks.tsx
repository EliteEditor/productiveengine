import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { ListPlus, Filter, Tag, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTaskContext } from '@/contexts/TaskContext';
import TaskList from '@/components/tasks/TaskList';
import AddTaskDialog from '@/components/tasks/AddTaskDialog';
import AddCategoryDialog from '@/components/tasks/AddCategoryDialog';

const Tasks = () => {
  const { tasks, categories } = useTaskContext();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'today' | 'long-term'>('today');
  
  // Filter tasks based on due date and category
  const getTodayTasks = (categoryFilter: string | null = null) => {
    return tasks.filter(task => {
      const dueDate = task.dueDate?.toLowerCase();
      const isToday = dueDate?.includes('today');
      const matchesCategory = !categoryFilter || task.category === categoryFilter;
      return isToday && matchesCategory;
    });
  };

  const getLongTermTasks = (categoryFilter: string | null = null) => {
    return tasks.filter(task => {
      const dueDate = task.dueDate?.toLowerCase();
      const isNotToday = !dueDate?.includes('today');
      const matchesCategory = !categoryFilter || task.category === categoryFilter;
      return isNotToday && matchesCategory;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Tasks" />
      
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-4 flex flex-wrap items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Task Management</h1>
          
          <div className="flex items-center mt-2 sm:mt-0 space-x-2">
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
                    ? `${category.color}30`
                    : `${category.color}15`,
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
          
          <Tabs defaultValue="today" className="w-full" onValueChange={(value) => setActiveTab(value as 'today' | 'long-term')}>
            <TabsList className="mb-4">
              <TabsTrigger value="today">Today's Tasks</TabsTrigger>
              <TabsTrigger value="long-term">Long-term Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today">
              <TaskList tasks={getTodayTasks(activeFilter)} />
            </TabsContent>
            
            <TabsContent value="long-term">
              <TaskList tasks={getLongTermTasks(activeFilter)} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <AddTaskDialog 
        open={isAddTaskOpen} 
        onOpenChange={setIsAddTaskOpen}
        taskType={activeTab === 'today' ? 'today' : 'longterm'}
      />

      <AddCategoryDialog 
        open={isAddCategoryOpen} 
        onOpenChange={setIsAddCategoryOpen}
      />
    </div>
  );
};

export default Tasks;

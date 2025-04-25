
import React, { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { ThemeToggle } from '@/components/theme-toggle';
import { useTaskContext } from '@/contexts/TaskContext';
import { useGoalContext } from '@/contexts/GoalContext';
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem,
  CommandSeparator 
} from "@/components/ui/command";
import { useNavigate } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { NotificationsMenu } from './NotificationsMenu';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [open, setOpen] = useState(false);
  const { tasks } = useTaskContext();
  const { goals } = useGoalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearchClick = () => {
    setOpen(true);
  };

  const handleSelect = (item: string) => {
    setOpen(false);
    
    if (item.startsWith('task:')) {
      navigate(`/tasks`);
    } else if (item.startsWith('goal:')) {
      navigate(`/goals`);
    } else if (item === 'page:dashboard') {
      navigate('/');
    } else if (item === 'page:tasks') {
      navigate('/tasks');
    } else if (item === 'page:goals') {
      navigate('/goals');
    } else if (item === 'page:calendar') {
      navigate('/calendar');
    } else if (item === 'page:insights') {
      navigate('/insights');
    } else if (item === 'page:settings') {
      navigate('/settings');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {title && (
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h1>
          )}
          
          <div className="flex-1 max-w-md mx-4">
            <div className="relative" onClick={handleSearchClick}>
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search... (Press Ctrl+K)" 
                className="pl-8 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full cursor-pointer"
                readOnly
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center space-x-1">
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-xs font-medium text-muted-foreground">
                  <span className="text-xs">Ctrl</span>K
                </kbd>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <NotificationsMenu />
            <UserMenu />
          </div>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search across tasks, goals, and pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => handleSelect('page:dashboard')}>
              <Command className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('page:tasks')}>
              <Command className="mr-2 h-4 w-4" />
              <span>Tasks</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('page:goals')}>
              <Command className="mr-2 h-4 w-4" />
              <span>Goals</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('page:calendar')}>
              <Command className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('page:insights')}>
              <Command className="mr-2 h-4 w-4" />
              <span>Insights</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('page:settings')}>
              <Command className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Tasks">
            {tasks.slice(0, 5).map((task) => (
              <CommandItem 
                key={task.id} 
                onSelect={() => handleSelect(`task:${task.id}`)}
              >
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    task.priority === 'high' ? 'bg-red-500' : 
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span>{task.title}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Goals">
            {goals.slice(0, 5).map((goal) => (
              <CommandItem 
                key={goal.id} 
                onSelect={() => handleSelect(`goal:${goal.id}`)}
              >
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    goal.priority === 'high' ? 'bg-red-500' : 
                    goal.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span>{goal.title}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Header;

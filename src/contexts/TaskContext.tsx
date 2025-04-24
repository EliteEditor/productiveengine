import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Task status types
export type TaskStatus = 'pending' | 'completed';

// Task category types
export type TaskCategory = 'work' | 'personal' | 'urgent' | 'learning' | string;

// Task interface
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  category: TaskCategory;
  dueDate?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
}

// Category interface with color
export interface Category {
  id: string;
  name: string;
  color: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  // Initialize with empty tasks array instead of sample tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Initialize with default categories
  const [categories, setCategories] = useState<Category[]>([
    { id: 'work', name: 'Work', color: '#3b82f6' },
    { id: 'personal', name: 'Personal', color: '#10b981' },
    { id: 'urgent', name: 'Urgent', color: '#ef4444' },
    { id: 'learning', name: 'Learning', color: '#8b5cf6' },
  ]);

  // Add a new task
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    toast.success(`Task "${task.title}" added successfully!`);
  };

  // Update an existing task
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
    toast.success('Task updated successfully!');
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast.success('Task deleted successfully!');
  };

  // Toggle task completion status
  const toggleTaskStatus = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
      )
    );
  };

  // Add a new category
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
    toast.success(`Category "${category.name}" added successfully!`);
  };

  // Delete a category
  const deleteCategory = (id: string) => {
    // Don't allow deletion of default categories
    if (['work', 'personal', 'urgent', 'learning'].includes(id)) {
      toast.error("Can't delete default categories");
      return;
    }
    
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast.success('Category deleted successfully!');
  };

  // Provide the context value
  const value: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    categories,
    addCategory,
    deleteCategory
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

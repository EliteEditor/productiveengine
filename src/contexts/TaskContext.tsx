import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Task status types
export type TaskStatus = 'pending' | 'completed';

// Task category types
export type TaskCategory = 'work' | 'personal' | 'urgent' | 'learning' | string;

// Task interface
export interface Task {
  id: string;
  user_id: string;
  title: string;
  status: TaskStatus;
  category: TaskCategory;
  due_date?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
}

// Category interface with color
export interface Category {
  id: string;
  name: string;
  color: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => void;
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: 'work', name: 'Work', color: '#3b82f6' },
    { id: 'personal', name: 'Personal', color: '#10b981' },
    { id: 'urgent', name: 'Urgent', color: '#ef4444' },
    { id: 'learning', name: 'Learning', color: '#8b5cf6' },
  ]);

  // Load user's tasks when component mounts or auth state changes
  useEffect(() => {
    const loadUserTasks = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: userTasks, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          // Type cast the data to match our interface
          const typedTasks = (userTasks || []).map(task => ({
            ...task,
            status: task.status as TaskStatus,
            category: task.category as TaskCategory
          }));
          setTasks(typedTasks);
        } else {
          setTasks([]); // Clear tasks if no user
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        toast.error('Failed to load tasks');
      }
    };

    // Initial load
    loadUserTasks();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserTasks();
      } else {
        setTasks([]); // Clear tasks on logout
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Add a new task
  const addTask = async (task: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to add tasks');
        return;
      }

      // Set today's date for new tasks if no due_date is provided
      const today = new Date();
      today.setHours(23, 59, 59, 999); // Set to end of today

      // Ensure the task has all required fields and correct format
      const newTask = {
        title: task.title,
        status: task.status || 'pending',
        category: task.category,
        description: task.description || null,
        due_date: task.due_date ? new Date(task.due_date).toISOString() : today.toISOString(), // Default to today
        priority: task.priority || null,
        user_id: user.id
      };

      console.log('Attempting to add task:', newTask);

      const { data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      if (data) {
        // Type cast the returned data
        const typedTask: Task = {
          ...data,
          status: data.status as TaskStatus,
          category: data.category as TaskCategory
        };
        setTasks(prevTasks => [typedTask, ...prevTasks]);
        toast.success(`Task "${task.title}" added successfully!`);
      }
    } catch (error: any) {
      console.error('Error adding task:', error.message, error);
      toast.error(`Failed to add task: ${error.message}`);
    }
  };

  // Update an existing task
  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updatedTask)
        .eq('id', id);

      if (error) throw error;

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  // Toggle task completion status
  const toggleTaskStatus = async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error toggling task status:', error);
      toast.error('Failed to update task status');
    }
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

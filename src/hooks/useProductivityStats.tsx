
import { useEffect, useState } from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { useGoalContext } from '@/contexts/GoalContext';

interface ProductivityStats {
  completedTasks: number;
  totalTasks: number;
  completionRate: number;
  tasksToday: number;
  completedToday: number;
  goalProgress: number;
  dailyData: Array<{
    date: string;
    completed: number;
    total: number;
  }>;
}

export const useProductivityStats = (): ProductivityStats => {
  const { tasks } = useTaskContext();
  const { goals } = useGoalContext();
  const [stats, setStats] = useState<ProductivityStats>({
    completedTasks: 0,
    totalTasks: 0,
    completionRate: 0,
    tasksToday: 0,
    completedToday: 0,
    goalProgress: 0,
    dailyData: []
  });

  useEffect(() => {
    // Count tasks
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    // Get today's date in a format that matches our stored dates
    const today = new Date().toLocaleDateString('en-US');
    
    // Count today's tasks
    const todayTasks = tasks.filter(task => {
      const dueDate = task.dueDate?.toLowerCase();
      return dueDate?.includes('today') || dueDate?.includes(today);
    });
    
    const tasksToday = todayTasks.length;
    const completedToday = todayTasks.filter(task => task.status === 'completed').length;
    
    // Calculate average goal progress
    const goalProgress = goals.length > 0
      ? goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length
      : 0;
    
    // Generate daily data for the last 7 days
    const dailyData = generateDailyData(tasks);
    
    setStats({
      completedTasks,
      totalTasks,
      completionRate,
      tasksToday,
      completedToday,
      goalProgress,
      dailyData
    });
  }, [tasks, goals]);
  
  return stats;
};

// Helper function to generate daily data for the chart
const generateDailyData = (tasks: any[]) => {
  // Generate dates for the last 7 days
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
  }
  
  // Initialize data array
  const data = dates.map(date => ({
    date,
    completed: Math.floor(Math.random() * 5), // Simulate random completed tasks
    total: Math.floor(Math.random() * 10) + 5  // Simulate random total tasks
  }));
  
  return data;
};

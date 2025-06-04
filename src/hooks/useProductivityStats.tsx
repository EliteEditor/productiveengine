
import { useEffect, useState } from 'react';
import { useTaskContext, Task as ContextTask } from '@/contexts/TaskContext';
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
    
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    // Count today's tasks
    const todayTasks = tasks.filter(task => {
      if (!task.due_date) return false;
      
      // Parse the due date
      const dueDate = new Date(task.due_date);
      dueDate.setHours(0, 0, 0, 0); // Start of due date
      
      // Check if the due date is today
      return dueDate.getTime() === today.getTime();
    });
    
    const tasksToday = todayTasks.length;
    const completedToday = todayTasks.filter(task => task.status === 'completed').length;
    
    // Calculate average goal progress
    const goalProgress = goals.length > 0
      ? goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length
      : 0;
    
    // Generate daily data using actual task data when possible
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
const generateDailyData = (tasks: ContextTask[]) => {
  // Get current date and find the most recent Monday
  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1; // Adjust to make Monday the start
  
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysFromMonday);
  monday.setHours(0, 0, 0, 0);

  // Generate dates for the week starting from Monday
  const dates = [];
  const tasksByDate: Record<string, { completed: number, total: number }> = {};
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    date.setHours(0, 0, 0, 0);
    
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' });
    dates.push(dateStr);
    
    // Initialize counts for this date
    tasksByDate[dateStr] = { completed: 0, total: 0 };
    
    // Count tasks for this date
    tasks.forEach(task => {
      if (!task.due_date) return;
      
      const taskDate = new Date(task.due_date);
      taskDate.setHours(0, 0, 0, 0);
      
      if (taskDate.getTime() === date.getTime()) {
        tasksByDate[dateStr].total++;
        if (task.status === 'completed') {
          tasksByDate[dateStr].completed++;
        }
      }
    });
  }
  
  // Convert to array format
  const data = dates.map(date => ({
    date,
    completed: tasksByDate[date].completed,
    total: tasksByDate[date].total
  }));
  
  return data;
};

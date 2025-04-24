
import { useTaskContext } from '@/contexts/TaskContext';

export const useWeeklyPerformance = () => {
  const { tasks } = useTaskContext();
  
  // Get tasks completed in the last 7 days
  const getWeeklyCompletionRate = () => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklyTasks = tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = task.dueDate.toLowerCase();
      // Check if the task was completed in the last 7 days
      return dueDate.includes('today') || 
             dueDate.includes('tomorrow') || 
             dueDate.includes(today.toLocaleDateString()) ||
             dueDate.includes(lastWeek.toLocaleDateString());
    });
    
    const completedTasks = weeklyTasks.filter(task => task.status === 'completed').length;
    const totalTasks = weeklyTasks.length;
    
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  return {
    weeklyCompletionRate: getWeeklyCompletionRate()
  };
};

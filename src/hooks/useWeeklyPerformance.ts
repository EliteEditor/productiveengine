
import { useTaskContext } from '@/contexts/TaskContext';
import { useGoalContext } from '@/contexts/GoalContext';

export const useWeeklyPerformance = () => {
  const { tasks } = useTaskContext();
  const { goals } = useGoalContext();
  
  // Get tasks and goals progress in the last 7 days
  const getWeeklyPerformance = () => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Calculate task completion rate
    const weeklyTasks = tasks.filter(task => {
      if (!task.due_date) return false;
      const dueDate = new Date(task.due_date);
      return dueDate >= lastWeek && dueDate <= today;
    });
    
    const completedTasks = weeklyTasks.filter(task => task.status === 'completed').length;
    const totalTasks = weeklyTasks.length;
    const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    // Calculate average goal progress for the week
    const weeklyGoalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / Math.max(goals.length, 1);
    
    // Combined performance metric (50% tasks, 50% goals)
    const weeklyPerformance = Math.round((taskCompletionRate + weeklyGoalProgress) / 2);
    
    return {
      weeklyCompletionRate: weeklyPerformance,
      taskCompletionRate,
      goalProgress: weeklyGoalProgress
    };
  };

  return getWeeklyPerformance();
};


import React from 'react';
import { CalendarCheck, Target, Activity } from 'lucide-react';
import StatCard from '../ui/StatCard';
import { useTaskContext } from '@/contexts/TaskContext';
import { useGoalContext } from '@/contexts/GoalContext';
import { useProductivityStats } from '@/hooks/useProductivityStats';
import { useWeeklyPerformance } from '@/hooks/useWeeklyPerformance';

const ProductivityMetrics = () => {
  const { tasks } = useTaskContext();
  const { goals } = useGoalContext();
  const stats = useProductivityStats();
  const { weeklyCompletionRate } = useWeeklyPerformance();
  
  // Calculate today's tasks completion rate
  const getTodayTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

    return tasks.filter(task => {
      const dueDate = task.due_date ? new Date(task.due_date) : null;
      return dueDate && dueDate >= today && dueDate < tomorrow;
    });
  };

  const todayTasks = getTodayTasks();
  const completedTodayTasks = todayTasks.filter(task => task.status === 'completed').length;
  const totalTodayTasks = todayTasks.length;
  const todayTasksRatio = `${completedTodayTasks}/${totalTodayTasks}`;
  
  // Calculate average goal progress
  const goalProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
    : 0;
  
  // Calculate trends
  const taskTrend = { 
    value: Math.round((completedTodayTasks / Math.max(totalTodayTasks, 1)) * 100), 
    isPositive: completedTodayTasks > 0
  };
  
  const goalTrend = {
    value: goalProgress,
    isPositive: goalProgress > 50
  };
  
  const weeklyTrend = {
    value: weeklyCompletionRate,
    isPositive: weeklyCompletionRate > 50
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard
        title="Today's Tasks Completed"
        value={todayTasksRatio}
        icon={<CalendarCheck size={18} className="dark:text-blue-300" />}
        trend={taskTrend}
        className="animate-delay-200 gradient-border"
      />
      
      <StatCard
        title="Goal Progress"
        value={`${goalProgress}%`}
        icon={<Target size={18} className="dark:text-blue-300" />}
        trend={goalTrend}
        className="animate-delay-300 gradient-border"
      />
      
      <StatCard
        title="Weekly Performance"
        value={`${weeklyCompletionRate}%`}
        icon={<Activity size={18} className="dark:text-blue-300" />}
        trend={weeklyTrend}
        className="animate-delay-400 gradient-border"
      />
    </div>
  );
};

export default ProductivityMetrics;

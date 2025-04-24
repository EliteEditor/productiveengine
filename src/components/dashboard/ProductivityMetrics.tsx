
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
  
  // Calculate completion rate for display
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const tasksRatio = `${completedTasks}/${totalTasks}`;
  
  // Calculate average goal progress
  const goalProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
    : 0;
  
  // Calculate trends
  const taskTrend = { 
    value: 4, 
    isPositive: completedTasks > 0
  };
  
  const goalTrend = {
    value: 2,
    isPositive: goalProgress > 50
  };
  
  const weeklyTrend = {
    value: 5,
    isPositive: weeklyCompletionRate > 50
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard
        title="Tasks Completed"
        value={tasksRatio}
        icon={<CalendarCheck size={18} className="dark:text-blue-300" />}
        trend={taskTrend}
        className="animate-delay-200"
      />
      
      <StatCard
        title="Goal Progress"
        value={`${goalProgress}%`}
        icon={<Target size={18} className="dark:text-blue-300" />}
        trend={goalTrend}
        className="animate-delay-300"
      />
      
      <StatCard
        title="Weekly Performance"
        value={`${weeklyCompletionRate}%`}
        icon={<Activity size={18} className="dark:text-blue-300" />}
        trend={weeklyTrend}
        className="animate-delay-400"
      />
    </div>
  );
};

export default ProductivityMetrics;

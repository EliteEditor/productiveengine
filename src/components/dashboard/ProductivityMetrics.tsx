
import React from 'react';
import { CalendarCheck, Target, BrainCircuit } from 'lucide-react';
import StatCard from '../ui/StatCard';
import { useTaskContext } from '@/contexts/TaskContext';
import { useGoalContext } from '@/contexts/GoalContext';
import { useProductivityStats } from '@/hooks/useProductivityStats';

const ProductivityMetrics = () => {
  const { tasks } = useTaskContext();
  const { goals } = useGoalContext();
  const stats = useProductivityStats();
  
  // Calculate completion rate for display
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const tasksRatio = `${completedTasks}/${totalTasks}`;
  
  // Calculate average goal progress
  const goalProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
    : 0;
  
  // Calculate focus score based on completed tasks and goal progress
  const focusScore = Math.round((stats.completionRate * 0.6) + (goalProgress * 0.4));
  
  // Calculate trends (using the stats from the hook)
  const taskTrend = { 
    value: 4, 
    isPositive: completedTasks > 0
  };
  
  const goalTrend = {
    value: 2,
    isPositive: goalProgress > 50
  };
  
  const focusTrend = {
    value: 8,
    isPositive: focusScore > 70
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
        title="Focus Score"
        value={focusScore}
        icon={<BrainCircuit size={18} className="dark:text-blue-300" />}
        trend={focusTrend}
        className="animate-delay-400"
      />
    </div>
  );
};

export default ProductivityMetrics;

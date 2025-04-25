import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

// Milestone interface
export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

// Goal interface
export interface Goal {
  id: string;
  title: string;
  deadline: string;
  progress: number;
  milestones: Milestone[];
  category?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface GoalContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
  calculateProgress: (goalId: string) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const useGoalContext = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoalContext must be used within a GoalProvider');
  }
  return context;
};

interface GoalProviderProps {
  children: ReactNode;
}

export const GoalProvider: React.FC<GoalProviderProps> = ({ children }) => {
  // Initialize with empty goals array
  const [goals, setGoals] = useState<Goal[]>([]);

  // Add a new goal
  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    };
    setGoals(prevGoals => [...prevGoals, newGoal]);
    toast.success(`Goal "${goal.title}" added successfully!`);
  };

  // Update an existing goal
  const updateGoal = (id: string, updatedGoal: Partial<Goal>) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === id ? { ...goal, ...updatedGoal } : goal
      )
    );
    toast.success('Goal updated successfully!');
  };

  // Delete a goal
  const deleteGoal = (id: string) => {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
    toast.success('Goal deleted successfully!');
  };

  // Toggle milestone completion
  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prevGoals =>
      prevGoals.map(goal => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.map(milestone =>
            milestone.id === milestoneId
              ? { ...milestone, completed: !milestone.completed }
              : milestone
          );
          return { ...goal, milestones: updatedMilestones };
        }
        return goal;
      })
    );
    
    // Recalculate progress after toggling a milestone
    calculateProgress(goalId);
  };

  // Calculate goal progress based on milestones
  const calculateProgress = (goalId: string) => {
    setGoals(prevGoals =>
      prevGoals.map(goal => {
        if (goal.id === goalId) {
          const totalMilestones = goal.milestones.length;
          const completedMilestones = goal.milestones.filter(m => m.completed).length;
          const progress = totalMilestones > 0
            ? Math.round((completedMilestones / totalMilestones) * 100)
            : 0;
          return { ...goal, progress };
        }
        return goal;
      })
    );
  };

  // Provide the context value
  const value: GoalContextType = {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleMilestone,
    calculateProgress
  };

  return (
    <GoalContext.Provider value={value}>
      {children}
    </GoalContext.Provider>
  );
};

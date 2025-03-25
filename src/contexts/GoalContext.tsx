
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
  // Initialize with sample goals
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      deadline: 'May 20, 2023',
      progress: 75,
      milestones: [
        { id: 'm1', title: 'Research competitors', completed: true },
        { id: 'm2', title: 'Create outline', completed: true },
        { id: 'm3', title: 'Draft proposal', completed: true },
        { id: 'm4', title: 'Final review', completed: false }
      ],
      category: 'work'
    },
    {
      id: '2',
      title: 'Learn new programming language',
      deadline: 'August 15, 2023',
      progress: 30,
      milestones: [
        { id: 'm1', title: 'Complete basic syntax', completed: true },
        { id: 'm2', title: 'Build simple application', completed: false },
        { id: 'm3', title: 'Complete online course', completed: false }
      ],
      category: 'learning'
    },
    {
      id: '3',
      title: 'Improve productivity habits',
      deadline: 'Ongoing',
      progress: 50,
      milestones: [
        { id: 'm1', title: 'Morning routine optimization', completed: true },
        { id: 'm2', title: 'Time-blocking implementation', completed: true },
        { id: 'm3', title: 'Digital detox weekends', completed: false },
        { id: 'm4', title: 'Weekly review process', completed: false }
      ],
      category: 'personal'
    }
  ]);

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

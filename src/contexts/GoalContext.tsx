import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Milestone interface
export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  subMilestones?: Milestone[];
}

// Goal interface
export interface Goal {
  id: string;
  title: string;
  deadline?: string;
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
  addSubMilestone: (goalId: string, parentMilestoneId: string, subMilestone: Omit<Milestone, 'id'>) => void;
  toggleSubMilestone: (goalId: string, parentMilestoneId: string, subMilestoneId: string) => void;
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
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load user's goals when component mounts or auth state changes
  useEffect(() => {
    const loadUserGoals = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: userGoals, error } = await supabase
            .from('goals')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          setGoals(userGoals || []);
        } else {
          setGoals([]); // Clear goals if no user
        }
      } catch (error) {
        console.error('Error loading goals:', error);
        toast.error('Failed to load goals');
      }
    };

    // Initial load
    loadUserGoals();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserGoals();
      } else {
        setGoals([]); // Clear goals on logout
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Add a new goal
  const addGoal = async (goal: Omit<Goal, 'id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      const newGoal = {
        ...goal,
        user_id: user.id,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('goals')
        .insert([newGoal])
        .select()
        .single();

      if (error) throw error;

      setGoals(prevGoals => [...prevGoals, data]);
      toast.success(`Goal "${goal.title}" added successfully!`);
    } catch (error) {
      console.error('Error adding goal:', error);
      toast.error('Failed to add goal');
    }
  };

  // Update an existing goal
  const updateGoal = async (id: string, updatedGoal: Partial<Goal>) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update(updatedGoal)
        .eq('id', id);

      if (error) throw error;

      setGoals(prevGoals =>
        prevGoals.map(goal =>
          goal.id === id ? { ...goal, ...updatedGoal } : goal
        )
      );
      toast.success('Goal updated successfully!');
    } catch (error) {
      console.error('Error updating goal:', error);
      toast.error('Failed to update goal');
    }
  };

  // Delete a goal
  const deleteGoal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
      toast.success('Goal deleted successfully!');
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.error('Failed to delete goal');
    }
  };

  // Toggle milestone completion
  const toggleMilestone = async (goalId: string, milestoneId: string) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) return;

      const updatedMilestones = goal.milestones.map(milestone =>
        milestone.id === milestoneId
          ? { ...milestone, completed: !milestone.completed }
          : milestone
      );

      // Calculate progress using the updated milestones
      const totalMilestones = updatedMilestones.length;
      const completedMilestones = updatedMilestones.filter(m => m.completed).length;
      const progress = totalMilestones > 0
        ? Math.round((completedMilestones / totalMilestones) * 100)
        : 0;

      const { error } = await supabase
        .from('goals')
        .update({ 
          milestones: updatedMilestones,
          progress
        })
        .eq('id', goalId);

      if (error) throw error;

      setGoals(prevGoals =>
        prevGoals.map(goal => {
          if (goal.id === goalId) {
            return { ...goal, milestones: updatedMilestones, progress };
          }
          return goal;
        })
      );
    } catch (error) {
      console.error('Error toggling milestone:', error);
      toast.error('Failed to update milestone');
    }
  };

  // Add a sub-milestone
  const addSubMilestone = async (goalId: string, parentMilestoneId: string, subMilestone: Omit<Milestone, 'id'>) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) return;

      const updatedMilestones = goal.milestones.map(milestone => {
        if (milestone.id === parentMilestoneId) {
          const newSubMilestone = {
            ...subMilestone,
            id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          };
          return {
            ...milestone,
            subMilestones: [...(milestone.subMilestones || []), newSubMilestone],
          };
        }
        return milestone;
      });

      const { error } = await supabase
        .from('goals')
        .update({ milestones: updatedMilestones })
        .eq('id', goalId);

      if (error) throw error;

      setGoals(prevGoals =>
        prevGoals.map(g =>
          g.id === goalId ? { ...g, milestones: updatedMilestones } : g
        )
      );

      toast.success('Sub-milestone added successfully!');
    } catch (error) {
      console.error('Error adding sub-milestone:', error);
      toast.error('Failed to add sub-milestone');
    }
  };

  // Toggle sub-milestone completion
  const toggleSubMilestone = async (goalId: string, parentMilestoneId: string, subMilestoneId: string) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) return;

      const updatedMilestones = goal.milestones.map(milestone => {
        if (milestone.id === parentMilestoneId && milestone.subMilestones) {
          return {
            ...milestone,
            subMilestones: milestone.subMilestones.map(sub =>
              sub.id === subMilestoneId ? { ...sub, completed: !sub.completed } : sub
            ),
          };
        }
        return milestone;
      });

      // Calculate progress including sub-milestones
      const totalMilestones = updatedMilestones.reduce((acc, m) => {
        const subMilestonesCount = m.subMilestones?.length || 0;
        return acc + 1 + subMilestonesCount;
      }, 0);

      const completedMilestones = updatedMilestones.reduce((acc, m) => {
        const completedSubMilestones = m.subMilestones?.filter(sub => sub.completed).length || 0;
        return acc + (m.completed ? 1 : 0) + completedSubMilestones;
      }, 0);

      const progress = totalMilestones > 0
        ? Math.round((completedMilestones / totalMilestones) * 100)
        : 0;

      const { error } = await supabase
        .from('goals')
        .update({ 
          milestones: updatedMilestones,
          progress 
        })
        .eq('id', goalId);

      if (error) throw error;

      setGoals(prevGoals =>
        prevGoals.map(g =>
          g.id === goalId ? { ...g, milestones: updatedMilestones, progress } : g
        )
      );
    } catch (error) {
      console.error('Error toggling sub-milestone:', error);
      toast.error('Failed to update sub-milestone');
    }
  };

  // Update calculateProgress to include sub-milestones
  const calculateProgress = async (goalId: string) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) return;

      const totalMilestones = goal.milestones.reduce((acc, m) => {
        const subMilestonesCount = m.subMilestones?.length || 0;
        return acc + 1 + subMilestonesCount;
      }, 0);

      const completedMilestones = goal.milestones.reduce((acc, m) => {
        const completedSubMilestones = m.subMilestones?.filter(sub => sub.completed).length || 0;
        return acc + (m.completed ? 1 : 0) + completedSubMilestones;
      }, 0);

      const progress = totalMilestones > 0
        ? Math.round((completedMilestones / totalMilestones) * 100)
        : 0;

      const { error } = await supabase
        .from('goals')
        .update({ progress })
        .eq('id', goalId);

      if (error) throw error;

      setGoals(prevGoals =>
        prevGoals.map(g =>
          g.id === goalId ? { ...g, progress } : g
        )
      );
    } catch (error) {
      console.error('Error calculating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  // Provide the context value
  const value: GoalContextType = {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleMilestone,
    calculateProgress,
    addSubMilestone,
    toggleSubMilestone
  };

  return (
    <GoalContext.Provider value={value}>
      {children}
    </GoalContext.Provider>
  );
};

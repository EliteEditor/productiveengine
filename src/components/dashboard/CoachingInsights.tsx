
import React from 'react';
import { LightbulbIcon, Zap, Coffee, LineChart, Clock } from 'lucide-react';
import CoachingCard from '../ui/CoachingCard';
import { cn } from '@/lib/utils';

interface CoachingInsightsProps {
  className?: string;
}

const CoachingInsights: React.FC<CoachingInsightsProps> = ({ className }) => {
  // Mock coaching insights
  const insights = [
    {
      title: "Try time blocking",
      description: "Allocate specific time blocks for related tasks to improve focus and minimize context switching.",
      icon: <Clock size={18} />,
      actionLabel: "Learn more",
      variant: 'highlight' as const
    },
    {
      title: "Your peak productivity hours",
      description: "Data shows you're most productive between 9-11 AM. Schedule important tasks during this time.",
      icon: <LineChart size={18} />,
      actionLabel: "View analysis",
      variant: 'default' as const
    },
    {
      title: "Take strategic breaks",
      description: "A 5-minute break every 50 minutes can improve overall focus and prevent burnout.",
      icon: <Coffee size={18} />,
      actionLabel: "Set reminders",
      variant: 'default' as const
    },
    {
      title: "Batch similar tasks",
      description: "Group similar tasks together to reduce context switching and improve efficiency.",
      icon: <Zap size={18} />,
      actionLabel: "Try it today",
      variant: 'default' as const
    }
  ];

  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <LightbulbIcon size={20} className="text-primary mr-2" />
          <h2 className="text-lg font-medium text-gray-800">Coaching Insights</h2>
        </div>
        <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
          View all
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <CoachingCard
            key={index}
            title={insight.title}
            description={insight.description}
            icon={insight.icon}
            actionLabel={insight.actionLabel}
            variant={insight.variant}
            className={`animate-delay-${(index + 1) * 100}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CoachingInsights;

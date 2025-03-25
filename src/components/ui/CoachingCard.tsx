
import React from 'react';
import { cn } from '@/lib/utils';

interface CoachingCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  variant?: 'default' | 'highlight';
}

const CoachingCard: React.FC<CoachingCardProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
  variant = 'default'
}) => {
  return (
    <div 
      className={cn(
        "glass rounded-xl p-5 transition-all duration-300 group animate-scale-in card-shadow",
        variant === 'highlight' && "border-primary/20 bg-primary/5",
        className
      )}
    >
      <div className="flex items-start space-x-4">
        {icon && (
          <div className={cn(
            "p-2.5 rounded-full flex-shrink-0",
            variant === 'default' ? "bg-primary/10 text-primary" : "bg-white text-primary"
          )}>
            {icon}
          </div>
        )}
        
        <div className="flex-1">
          <h3 className={cn(
            "font-medium text-base",
            variant === 'default' ? "text-gray-800" : "text-primary"
          )}>
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 mt-1 text-balance">{description}</p>
          
          {actionLabel && (
            <button
              onClick={onAction}
              className={cn(
                "mt-3 text-sm font-medium transition-all duration-200",
                variant === 'default' 
                  ? "text-primary hover:text-primary/80" 
                  : "text-primary hover:text-primary/80"
              )}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachingCard;

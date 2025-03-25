
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  className 
}) => {
  return (
    <div className={cn(
      "glass rounded-xl p-5 overflow-hidden relative animate-scale-in card-shadow",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1 text-gray-900">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-1">
              <div className={cn(
                "text-xs font-medium rounded-full px-1.5 py-0.5 flex items-center",
                trend.isPositive ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
              )}>
                <span>{trend.isPositive ? '↑' : '↓'}</span>
                <span className="ml-0.5">{Math.abs(trend.value)}%</span>
              </div>
              <span className="text-xs text-gray-500 ml-1.5">vs last week</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      
      <div className="absolute -bottom-1 -right-1 w-16 h-16 rounded-full bg-primary/5 z-0"></div>
    </div>
  );
};

export default StatCard;

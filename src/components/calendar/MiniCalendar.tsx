import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MiniGrid } from './MiniGrid';
import { useLocalStorage } from '@/hooks/use-local-storage';
import styles from './MiniCalendar.module.css';

interface MiniCalendarProps {
  onDateSelect?: (date: Date) => void;
  className?: string;
}

export function MiniCalendar({ onDateSelect, className }: MiniCalendarProps) {
  const [isCollapsed, setIsCollapsed] = useLocalStorage('mini-calendar-collapsed', false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  return (
    <div className={cn(
      styles.miniCalendar,
      isCollapsed && styles.miniCalendarCollapsed,
      'rounded-lg border bg-card shadow-sm',
      className
    )}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex w-full items-center justify-between p-2 hover:bg-accent"
        aria-label={isCollapsed ? 'Expand calendar' : 'Collapse calendar'}
      >
        <span className="text-sm font-medium">Mini Calendar</span>
        {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </button>
      
      {!isCollapsed && (
        <div className="p-2">
          <MiniGrid
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
} 
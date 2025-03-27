import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { format, startOfWeek, addDays, isToday, isSameDay } from 'date-fns';
import styles from './MiniCalendar.module.css';

interface MiniGridProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function MiniGrid({ selectedDate, onDateSelect }: MiniGridProps) {
  const weekStart = useMemo(() => startOfWeek(selectedDate, { weekStartsOn: 1 }), [selectedDate]);
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  return (
    <div className={styles.grid}>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
        <div
          key={day}
          className={styles.dayLabel}
        >
          {day}
        </div>
      ))}
      
      {weekDays.map((date) => {
        const isCurrentDay = isToday(date);
        const isSelected = isSameDay(date, selectedDate);
        
        return (
          <button
            key={date.toISOString()}
            onClick={() => onDateSelect(date)}
            className={cn(
              styles.dateButton,
              isCurrentDay && styles.dateButtonToday,
              isSelected && !isCurrentDay && styles.dateButtonSelected
            )}
            aria-label={`Select ${format(date, 'MMMM d, yyyy')}`}
          >
            {format(date, 'd')}
          </button>
        );
      })}
    </div>
  );
} 
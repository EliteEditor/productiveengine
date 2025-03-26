
import React from 'react';
import { CalendarCheck, Target, BrainCircuit } from 'lucide-react';
import StatCard from '../ui/StatCard';

const ProductivityMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard
        title="Tasks Completed"
        value="8/12"
        icon={<CalendarCheck size={18} />}
        trend={{ value: 4, isPositive: true }}
        className="animate-delay-200"
      />
      
      <StatCard
        title="Goal Progress"
        value="68%"
        icon={<Target size={18} />}
        trend={{ value: 2, isPositive: false }}
        className="animate-delay-300"
      />
      
      <StatCard
        title="Focus Score"
        value="86"
        icon={<BrainCircuit size={18} />}
        trend={{ value: 8, isPositive: true }}
        className="animate-delay-400"
      />
    </div>
  );
};

export default ProductivityMetrics;


import React from 'react';
import Header from '@/components/layout/Header';
import { Target, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';

const Goals = () => {
  // Sample goals data
  const goals = [
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
      ]
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
      ]
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
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Goals" />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6 flex flex-wrap items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Goal Tracking</h1>
          
          <div className="flex items-center mt-4 sm:mt-0 space-x-3">
            <button className="flex items-center px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Filter size={16} className="mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter</span>
            </button>
            
            <Button className="flex items-center">
              <Plus size={16} className="mr-2" />
              <span className="text-sm font-medium">New Goal</span>
            </Button>
          </div>
        </div>
        
        <div className="glass rounded-xl p-5 card-shadow animate-scale-in space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Target size={18} className="text-primary mr-2" />
                  <h3 className="font-medium text-gray-800">{goal.title}</h3>
                </div>
                <span className="text-sm text-gray-500">Due: {goal.deadline}</span>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-primary font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Milestones</h4>
                <div className="space-y-2">
                  {goal.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center">
                      <Checkbox id={milestone.id} className="mr-2" defaultChecked={milestone.completed} />
                      <label htmlFor={milestone.id} className={`text-sm ${milestone.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                        {milestone.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Goals;


import React from 'react';
import Header from '@/components/layout/Header';
import ProductivityMetrics from '@/components/dashboard/ProductivityMetrics';
import CoachingInsights from '@/components/dashboard/CoachingInsights';
import TaskSummary from '@/components/dashboard/TaskSummary';
import { Play, Plus, CheckCircle, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Sample goals data for progress tracking
  const goals = [
    { id: '1', title: 'Complete project proposal', progress: 75 },
    { id: '2', title: 'Learn new programming language', progress: 30 },
    { id: '3', title: 'Improve productivity habits', progress: 50 }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="mb-8 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-sm text-gray-500 font-medium">Good afternoon, Alex</h2>
            <div className="flex flex-wrap items-center justify-between mt-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Your Productivity Dashboard</h1>
              
              <div className="flex gap-3 mt-4 sm:mt-0">
                <Button variant="outline" className="flex items-center">
                  <Plus size={16} className="mr-2" />
                  <span className="font-medium">Add Task</span>
                </Button>
                
                <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg transition-all hover:bg-primary/90 animate-pulse-subtle">
                  <Play size={16} className="mr-2" />
                  <span className="font-medium">Start Coaching Session</span>
                </button>
              </div>
            </div>
          </div>
          
          <ProductivityMetrics />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="glass rounded-xl p-5 card-shadow animate-scale-in mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Today's Tasks</h2>
                  <a href="/tasks" className="text-sm text-primary font-medium hover:underline">View All</a>
                </div>
                
                <div className="space-y-3">
                  {[
                    { id: '1', title: 'Finalize project proposal', completed: false, urgent: true },
                    { id: '2', title: 'Team meeting with design department', completed: false, urgent: false },
                    { id: '3', title: 'Fix critical bug in production', completed: false, urgent: true },
                    { id: '4', title: 'Submit weekly report', completed: true, urgent: false }
                  ].map(task => (
                    <div key={task.id} className={`flex items-center p-3 rounded-lg border border-gray-100 ${task.completed ? 'bg-gray-50' : 'hover:bg-gray-50'} transition-colors`}>
                      <div className="flex-shrink-0 mr-3">
                        <CheckCircle 
                          size={18} 
                          className={task.completed ? 'text-green-500 fill-green-500' : 'text-gray-300'} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                          {task.title}
                        </p>
                      </div>
                      {task.urgent && !task.completed && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-rose-50 text-rose-700 font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <CoachingInsights className="mb-6" />
              
              <div className="glass rounded-xl p-5 card-shadow animate-scale-in animate-delay-500">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Focus Graph</h2>
                <div className="h-[240px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-500 text-sm">Focus productivity trends visualization</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass rounded-xl p-5 card-shadow animate-scale-in mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800 flex items-center">
                    <Target size={18} className="mr-2 text-primary" />
                    Goal Progress
                  </h2>
                  <a href="/goals" className="text-sm text-primary font-medium hover:underline">View All</a>
                </div>
                
                <div className="space-y-4">
                  {goals.map(goal => (
                    <div key={goal.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800">{goal.title}</span>
                        <span className="text-sm text-primary font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
              
              <TaskSummary className="h-full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

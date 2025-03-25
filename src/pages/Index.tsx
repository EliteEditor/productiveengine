
import React from 'react';
import Header from '@/components/layout/Header';
import ProductivityMetrics from '@/components/dashboard/ProductivityMetrics';
import CoachingInsights from '@/components/dashboard/CoachingInsights';
import TaskSummary from '@/components/dashboard/TaskSummary';
import { Play } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="mb-8 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-sm text-gray-500 font-medium">Good afternoon, Alex</h2>
            <div className="flex flex-wrap items-center justify-between mt-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Your Productivity Dashboard</h1>
              
              <button className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg transition-all hover:bg-primary/90 animate-pulse-subtle">
                <Play size={16} className="mr-2" />
                <span className="font-medium">Start Coaching Session</span>
              </button>
            </div>
          </div>
          
          <ProductivityMetrics />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CoachingInsights className="mb-6" />
              
              <div className="glass rounded-xl p-5 card-shadow animate-scale-in animate-delay-500">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Focus Graph</h2>
                <div className="h-[240px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-500 text-sm">Focus productivity trends visualization</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <TaskSummary className="h-full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

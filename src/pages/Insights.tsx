
import React from 'react';
import Header from '@/components/layout/Header';

const Insights = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Insights" />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Productivity Insights</h1>
          <p className="text-gray-500 mt-2">Analyze your productivity patterns and receive personalized recommendations</p>
        </div>
        
        <div className="glass rounded-xl p-5 card-shadow animate-scale-in">
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-gray-500">Detailed insights and analytics will be implemented here</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Insights;

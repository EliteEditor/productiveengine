
import React from 'react';
import Header from '@/components/layout/Header';
import { ListPlus, Filter } from 'lucide-react';

const Tasks = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Tasks" />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6 flex flex-wrap items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Task Management</h1>
          
          <div className="flex items-center mt-4 sm:mt-0 space-x-3">
            <button className="flex items-center px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Filter size={16} className="mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter</span>
            </button>
            
            <button className="flex items-center px-3 py-2 bg-primary text-white rounded-lg transition-all hover:bg-primary/90">
              <ListPlus size={16} className="mr-2" />
              <span className="text-sm font-medium">New Task</span>
            </button>
          </div>
        </div>
        
        <div className="glass rounded-xl p-5 card-shadow animate-scale-in">
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-gray-500">Task management interface will be implemented here</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tasks;

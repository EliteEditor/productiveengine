
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { ListPlus, Filter, Tag, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

// Task status types
type TaskStatus = 'pending' | 'completed';

// Task category types
type TaskCategory = 'work' | 'personal' | 'urgent' | 'learning';

// Task interface
interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  category: TaskCategory;
  dueDate?: string;
  description?: string;
}

const Tasks = () => {
  // Sample tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finalize project proposal',
      status: 'pending',
      category: 'work',
      dueDate: 'Today, 5:00 PM',
      description: 'Complete the final draft and send it to the client for review'
    },
    {
      id: '2',
      title: 'Grocery shopping',
      status: 'pending',
      category: 'personal',
      dueDate: 'Tomorrow'
    },
    {
      id: '3',
      title: 'Fix critical bug in production',
      status: 'pending',
      category: 'urgent',
      dueDate: 'Today, 12:00 PM'
    },
    {
      id: '4',
      title: 'Complete online course module',
      status: 'pending',
      category: 'learning',
      dueDate: 'Friday'
    },
    {
      id: '5',
      title: 'Update portfolio website',
      status: 'completed',
      category: 'personal'
    }
  ]);

  // Toggle task completion
  const toggleTaskStatus = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
      )
    );
  };

  // Get category styles
  const getCategoryStyles = (category: TaskCategory) => {
    switch (category) {
      case 'work':
        return 'bg-blue-50 text-blue-700';
      case 'personal':
        return 'bg-green-50 text-green-700';
      case 'urgent':
        return 'bg-rose-50 text-rose-700';
      case 'learning':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

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
            
            <Button className="flex items-center">
              <ListPlus size={16} className="mr-2" />
              <span className="text-sm font-medium">New Task</span>
            </Button>
          </div>
        </div>
        
        <div className="glass rounded-xl p-5 card-shadow animate-scale-in">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">All</span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">Work</span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">Personal</span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-rose-50 text-rose-700">Urgent</span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700">Learning</span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`py-4 flex items-start gap-3 ${task.status === 'completed' ? 'opacity-70' : ''}`}
              >
                <Checkbox 
                  id={`task-${task.id}`}
                  checked={task.status === 'completed'}
                  onCheckedChange={() => toggleTaskStatus(task.id)}
                  className="mt-1"
                />
                
                <div className="flex-1 min-w-0">
                  <label 
                    htmlFor={`task-${task.id}`}
                    className={`font-medium text-gray-800 mb-1 block ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}
                  >
                    {task.title}
                  </label>
                  
                  {task.description && (
                    <p className="text-sm text-gray-500 mb-2">{task.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.dueDate && (
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        {task.dueDate}
                      </span>
                    )}
                    
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryStyles(task.category)}`}>
                      <Tag size={10} className="mr-1" />
                      {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tasks;

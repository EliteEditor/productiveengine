
import React from 'react';
import Header from '@/components/layout/Header';
import { Calendar as CalendarIcon, Clock, Tag } from 'lucide-react';

const Calendar = () => {
  // Sample calendar events data
  const events = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM - 11:30 AM', category: 'Work', color: 'bg-blue-500' },
    { id: 2, title: 'Project Deadline', time: '2:00 PM', category: 'Work', color: 'bg-rose-500' },
    { id: 3, title: 'Gym Session', time: '5:30 PM - 7:00 PM', category: 'Personal', color: 'bg-emerald-500' },
    { id: 4, title: 'Weekly Review', time: '8:00 PM - 9:00 PM', category: 'Personal', color: 'bg-amber-500' },
  ];
  
  // Mock data for calendar days
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Calendar" />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Calendar View</h1>
          <p className="text-gray-500 mt-2">Visualize your tasks and goals on a timeline</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar navigation */}
          <div className="glass rounded-xl p-5 card-shadow animate-scale-in lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium flex items-center">
                <CalendarIcon size={18} className="mr-2 text-primary" />
                <span>May 2023</span>
              </h2>
              <div className="flex space-x-2">
                <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50">
                  <span className="sr-only">Previous Month</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50">
                  <span className="sr-only">Next Month</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => (
                <div 
                  key={day} 
                  className={`aspect-square flex items-center justify-center rounded-md text-sm ${
                    day === today ? 'bg-primary text-white font-medium' : 'hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          
          {/* Daily events */}
          <div className="glass rounded-xl p-5 card-shadow animate-scale-in animate-delay-200 lg:col-span-3">
            <h2 className="text-lg font-medium mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`${event.color} w-1 self-stretch rounded-full mr-3`}></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{event.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center">
                      <Tag size={12} className="mr-1" />
                      {event.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;

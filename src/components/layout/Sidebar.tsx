
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListTodo, LineChart, Settings, Calendar, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard
  },
  {
    name: 'Tasks',
    path: '/tasks',
    icon: ListTodo
  },
  {
    name: 'Goals',
    path: '/goals',
    icon: Target
  },
  {
    name: 'Calendar',
    path: '/calendar',
    icon: Calendar
  },
  {
    name: 'Insights',
    path: '/insights',
    icon: LineChart
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings
  }
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div 
      className={cn(
        "h-screen sticky top-0 flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ease-in-out z-30",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center">
            <span className="ml-2 text-lg font-semibold text-primary animate-fade-in">Focus</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-full bg-secondary hover:bg-gray-100 transition-all duration-200"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <div className="flex-1 py-8">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-primary/5 text-primary font-medium" 
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon size={20} className={cn(
                  "transition-all",
                  isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-600"
                )} />
                {!collapsed && (
                  <span className="ml-3 whitespace-nowrap">{item.name}</span>
                )}
                {isActive && !collapsed && (
                  <div className="w-1 h-5 bg-primary rounded-full ml-auto"/>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        {!collapsed ? (
          <div className="px-3 py-3 rounded-lg bg-primary/5 text-primary/90 text-sm">
            <p className="font-medium">Focus Coach</p>
            <p className="text-xs text-gray-500 mt-1">Here to help you stay productive</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Settings size={16} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

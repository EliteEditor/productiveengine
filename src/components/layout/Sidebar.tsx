
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
        "h-screen sticky top-0 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out z-30",
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
          className="p-1.5 rounded-full bg-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
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
                    ? "bg-primary/5 text-primary font-medium dark:bg-primary/10" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                )}
              >
                <item.icon size={20} className={cn(
                  "transition-all",
                  isActive ? "text-primary" : "text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400"
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
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListTodo, LineChart, Settings, Calendar, Target, ChevronLeft, ChevronRight, Workflow, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(isMobile);
  const location = useLocation();

  // Update collapsed state when device type changes
  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-[#E94444] rounded-[12px] w-10 h-10 p-1">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L18.5 6.5V14.5L12 18L5.5 14.5V6.5L12 3Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-lg font-semibold text-primary animate-fade-in">FlowPath</span>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <Menu size={24} />
          </button>
        </div>
      )}

      {/* Backdrop for mobile */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-20 transition-opacity lg:hidden",
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => setCollapsed(true)}
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-screen flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out z-30",
          collapsed ? "translate-x-[-100%] lg:translate-x-0 lg:w-[80px]" : "translate-x-0 w-[280px]",
          isMobile ? "top-16" : "top-0",
          "lg:translate-x-0" // Always show on desktop
        )}
      >
        {/* Desktop Header */}
        {!isMobile && (
          <div className="flex items-center justify-between p-4">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center bg-[#E94444] rounded-[12px] w-10 h-10 p-1">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L18.5 6.5V14.5L12 18L5.5 14.5V6.5L12 3Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold text-primary animate-fade-in">FlowPath</span>
              </div>
            )}
            {collapsed && (
              <div className="flex items-center justify-center bg-[#E94444] rounded-[12px] w-10 h-10 p-1">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L18.5 6.5V14.5L12 18L5.5 14.5V6.5L12 3Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-full bg-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => isMobile && setCollapsed(true)}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-primary/5 text-primary font-medium dark:bg-primary/10" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                  )}
                >
                  <item.icon size={isMobile ? 24 : 22} className={cn(
                    "transition-all flex-shrink-0",
                    isActive ? "text-primary" : "text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400"
                  )} />
                  {(!collapsed || isMobile) && (
                    <span className="ml-3 text-base whitespace-nowrap truncate">{item.name}</span>
                  )}
                  {isActive && (!collapsed || isMobile) && (
                    <div className="w-1 h-6 bg-primary rounded-full ml-auto"/>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      
      {/* Add margin and padding to main content */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        !isMobile && (collapsed ? "ml-[80px]" : "ml-[280px]"),
        isMobile && "mt-16" // Add top margin for mobile header
      )}></div>
    </>
  );
};

export default Sidebar;

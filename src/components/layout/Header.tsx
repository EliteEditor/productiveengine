
import React from 'react';
import { Bell, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const location = useLocation();
  
  // Determine title based on current route if not provided
  const pageTitle = title || (() => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/tasks':
        return 'Tasks';
      case '/insights':
        return 'Insights';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  })();

  return (
    <header className="w-full px-6 py-4 bg-white border-b border-gray-100 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-800">{pageTitle}</h1>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <User size={18} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

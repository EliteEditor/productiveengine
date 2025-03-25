
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from '@/components/theme-toggle';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="sticky top-0 z-20 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {title && (
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h1>
        )}
        
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-8 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import Header from '@/components/layout/Header';

const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Settings" />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">Account Settings</h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">Manage your account preferences and integrations</p>
        </div>
        
        <div className="glass rounded-xl p-5 card-shadow animate-scale-in">
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-gray-500 dark:text-gray-300">Settings interface will be implemented here</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

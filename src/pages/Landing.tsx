
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Auth } from '@/components/auth/Auth';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CalendarCheck, Target, BarChart2, Bell, Clock, Shield } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  const features = [
    {
      icon: <CalendarCheck className="w-12 h-12 text-primary mb-4" />,
      title: "Task Management",
      description: "Organize and track your daily tasks with ease. Set priorities, deadlines, and categories."
    },
    {
      icon: <Target className="w-12 h-12 text-primary mb-4" />,
      title: "Goal Setting",
      description: "Set and achieve your goals with milestone tracking and progress visualization."
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-primary mb-4" />,
      title: "Productivity Analytics",
      description: "Get detailed insights into your productivity patterns and task completion rates."
    },
    {
      icon: <Bell className="w-12 h-12 text-primary mb-4" />,
      title: "Smart Notifications",
      description: "Stay on top of urgent tasks with intelligent notifications and reminders."
    },
    {
      icon: <Clock className="w-12 h-12 text-primary mb-4" />,
      title: "Time Management",
      description: "Track time spent on tasks and optimize your daily schedule."
    },
    {
      icon: <Shield className="w-12 h-12 text-primary mb-4" />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with industry-standard security measures."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">FlowPath</span>
          </div>
          <div className="flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="px-6">Log in</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-0">
                <Auth view="sign_in" onSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-6">Sign up</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-0">
                <Auth view="sign_up" onSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mt-20 mb-32">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Stay Organized, <span className="text-primary">Achieve More</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
            Transform your productivity with FlowPath's intuitive task management and goal tracking. Your journey to better organization starts here.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8 py-6 text-lg">
                Get Started Free
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0">
              <Auth view="sign_up" onSuccess={handleLoginSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* App Preview Section */}
        <div className="text-center mb-32">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Your Productivity Dashboard
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Get a clear overview of your tasks, goals, and progress all in one place.
          </p>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800">
              {/* You can add a screenshot or demo of your app here */}
              <div className="p-8 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">App Preview</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who have transformed their workflow with FlowPath.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8 py-6 text-lg">
                Start Your Journey
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0">
              <Auth view="sign_up" onSuccess={handleLoginSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Landing;

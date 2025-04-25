
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Auth } from '@/components/auth/Auth';
import { CalendarCheck, Target, BarChart2, Bell, Clock, Shield, ArrowRight, Mail } from 'lucide-react';

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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">FlowPath</span>
          </div>
          <div className="flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Log in</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-0">
                <Auth view="sign_in" onSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Sign up</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-0">
                <Auth view="sign_up" onSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Stay Organized, <span className="text-primary">Achieve More</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Transform your productivity with FlowPath's intuitive task management and goal tracking. Your journey to better organization starts here.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8 py-6 text-lg">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0">
              <Auth view="sign_up" onSuccess={handleLoginSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose FlowPath?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need to stay organized and productive</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
        </div>
      </div>

      {/* App Preview Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your Productivity Dashboard</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Get a clear overview of your tasks, goals, and progress all in one place</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/f045fe8f-f678-4135-8664-577b1c556930.png" 
                alt="FlowPath Dashboard" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their workflow with FlowPath.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8 py-6 text-lg">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0">
              <Auth view="sign_up" onSuccess={handleLoginSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xl font-bold text-gray-900 dark:text-white">FlowPath</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Empowering productivity through intelligent task management and goal tracking.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-primary">Features</a></li>
                <li><a href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary">Pricing</a></li>
                <li><a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-primary">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#help" className="text-gray-600 dark:text-gray-400 hover:text-primary">Help Center</a></li>
                <li><a href="#terms" className="text-gray-600 dark:text-gray-400 hover:text-primary">Terms of Service</a></li>
                <li><a href="#privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
              <div className="space-y-2">
                <a href="mailto:contact@flowpath.app" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary">
                  <Mail className="h-4 w-4 mr-2" />
                  contact@flowpath.app
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} FlowPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;


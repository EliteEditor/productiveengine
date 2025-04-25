import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Auth } from '@/components/auth/Auth';
import { 
  CalendarCheck, 
  Target, 
  BarChart2, 
  Bell, 
  Clock, 
  Shield, 
  ArrowRight, 
  Mail, 
  CheckCircle,
  ChevronRight,
  Zap,
  Users,
  Calendar,
  Star
} from 'lucide-react';
import TaskCompletionChart from '@/components/charts/TaskCompletionChart';

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

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals getting started",
    features: [
      "Up to 10 tasks",
      "Basic task management",
      "Calendar view",
      "Mobile app access"
    ],
    buttonText: "Get Started",
    highlighted: false
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "For professionals who need more",
    features: [
      "Unlimited tasks",
      "Advanced analytics",
      "Goal tracking",
      "Team collaboration",
      "Priority support"
    ],
    buttonText: "Try Pro Free",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large teams with advanced needs",
    features: [
      "Everything in Pro",
      "Admin controls",
      "Custom integrations",
      "Dedicated account manager",
      "Premium security features"
    ],
    buttonText: "Contact Sales",
    highlighted: false
  }
];

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <div className="bg-white dark:bg-gray-950 w-full overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">FlowPath</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">FAQ</a>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="flex">Log in</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-0">
                <Auth view="sign_in" onSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">Sign up</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-0">
                <Auth view="sign_up" onSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section with gradient background */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95 dark:from-gray-950/95 dark:to-gray-900/95 z-0"></div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/0af50631-05fb-4b6d-8732-fb84e724a6df.png')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto mb-10">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold bg-primary/10 text-primary rounded-full uppercase tracking-wider">Productivity Simplified</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Stay Organized, <span className="text-primary/90">Achieve More</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your productivity with FlowPath's intuitive task management and goal tracking. Your journey to better organization starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="px-8 py-6 text-lg bg-primary/90 hover:bg-primary/80">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-0">
                  <Auth view="sign_up" onSuccess={handleLoginSuccess} />
                </DialogContent>
              </Dialog>
              <a href="#demo" className="flex items-center text-white/90 hover:text-primary/90 transition-colors">
                <span className="mr-2">Watch demo</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-16 max-w-5xl mx-auto relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-primary rounded-xl blur-lg opacity-50"></div>
            <div className="relative bg-gray-900/95 dark:bg-gray-900/95 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
              <div className="flex items-center gap-2 p-2 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-400 text-sm ml-2">FlowPath Dashboard</span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-white text-lg mb-2">Today's Tasks</h3>
                    <div className="text-3xl font-bold text-white">0/1</div>
                    <div className="text-red-400 text-sm">↓ 4% vs last week</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-white text-lg mb-2">Goal Progress</h3>
                    <div className="text-3xl font-bold text-white">50%</div>
                    <div className="text-red-400 text-sm">↓ 2% vs last week</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-white text-lg mb-2">Weekly Performance</h3>
                    <div className="text-3xl font-bold text-white">25%</div>
                    <div className="text-red-400 text-sm">↓ 5% vs last week</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white">Tasks</h3>
                      <a href="#" className="text-blue-400 text-sm">View All</a>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                        <span className="text-gray-300">Learning new language</span>
                        <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">High Priority</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white">Goal Progress</h3>
                      <a href="#" className="text-blue-400 text-sm">View All</a>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Learning new language</span>
                        <span className="text-blue-400">50%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full uppercase tracking-wider">Why Choose FlowPath?</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Everything you need to stay organized</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Powerful features designed to boost your productivity and help you achieve your goals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Simple, yet powerful workflow</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Get started in minutes and see the impact on your productivity right away.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <CheckCircle className="h-12 w-12 text-primary" />,
                step: "Step 1",
                title: "Create Tasks",
                description: "Add your tasks, set priorities and deadlines to keep track of all your work."
              },
              {
                icon: <Target className="h-12 w-12 text-primary" />,
                step: "Step 2",
                title: "Set Goals",
                description: "Define your short and long-term goals and link related tasks to them."
              },
              {
                icon: <BarChart2 className="h-12 w-12 text-primary" />,
                step: "Step 3", 
                title: "Track Progress",
                description: "Monitor your productivity and celebrate achievements as you complete tasks."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-6">{item.icon}</div>
                <div className="mb-3 text-sm font-semibold text-primary">{item.step}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-6 py-5 text-base bg-primary hover:bg-primary/90">
                  Try FlowPath For Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-0">
                <Auth view="sign_up" onSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section id="demo" className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full uppercase tracking-wider">See It In Action</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Productivity Insights</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">Get detailed analytics and insights to optimize your productivity</p>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-primary rounded-xl blur-lg opacity-50"></div>
              <div className="relative bg-gray-900/95 dark:bg-gray-900/95 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="flex items-center gap-2 p-2 border-b border-gray-800">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-400 text-sm ml-2">Productivity Insights</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-gray-400 text-sm">Completion Rate</h3>
                        <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-white">50%</div>
                      <div className="text-xs text-gray-500">Task completion rate this week</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-gray-400 text-sm">Tasks Completed</h3>
                        <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-white">1</div>
                      <div className="text-xs text-gray-500">Out of 2 total tasks</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-gray-400 text-sm">Today's Tasks</h3>
                        <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-white">1/1</div>
                      <div className="text-xs text-gray-500">Tasks completed today</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-gray-400 text-sm">Goal Progress</h3>
                        <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14.7519 2.62664L16.2019 5.54664C16.3619 5.87164 16.7819 6.17164 17.1419 6.22664L19.7619 6.67664C21.1219 6.89664 21.4919 7.86664 20.5019 8.84664L18.4719 10.8766C18.1919 11.1566 18.0419 11.6866 18.1319 12.0766L18.7119 14.6366C19.0819 16.2666 18.2419 16.8766 16.7919 16.0166L14.3819 14.6666C14.0219 14.4566 13.4219 14.4566 13.0619 14.6666L10.6519 16.0166C9.20186 16.8766 8.36186 16.2666 8.73186 14.6366L9.31186 12.0766C9.40186 11.6866 9.25186 11.1566 8.97186 10.8766L6.94186 8.84664C5.95186 7.86664 6.32186 6.89664 7.68186 6.67664L10.3019 6.22664C10.6619 6.17164 11.0819 5.87164 11.2419 5.54664L12.6919 2.62664C13.3219 1.36664 14.1319 1.36664 14.7519 2.62664Z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-white">50%</div>
                      <div className="text-xs text-gray-500">Average across all goals</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg h-[300px]">
                      <TaskCompletionChart
                        data={[
                          { day: 'Sat', value: 35 },
                          { day: 'Sun', value: 20 },
                          { day: 'Mon', value: 45 },
                          { day: 'Tue', value: 30 },
                          { day: 'Wed', value: 60 },
                          { day: 'Thu', value: 25 },
                          { day: 'Fri', value: 40 }
                        ]}
                        className="h-full"
                      />
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg h-[300px] flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-gray-700"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-blue-500"
                            strokeWidth="10"
                            strokeDasharray={`${50 * 2.51327} 251.327`}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-white">50%</span>
                          <span className="text-sm text-gray-400">Work</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Choose the right plan for you</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">No complicated contracts. No surprises. Simple and transparent pricing.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div 
                key={i} 
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden border ${
                  plan.highlighted 
                    ? 'border-primary shadow-lg ring-2 ring-primary/20 dark:border-primary relative' 
                    : 'border-gray-200 dark:border-gray-700 shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
                  </div>
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className={`w-full ${
                          plan.highlighted 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] p-0">
                      <Auth view="sign_up" onSuccess={handleLoginSuccess} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-3 text-xs font-semibold bg-primary/10 text-primary rounded-full uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Find answers to common questions about FlowPath and how it can help you.</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What is FlowPath?",
                a: "FlowPath is a productivity platform designed to help individuals and teams manage tasks, track goals, and boost overall productivity through intuitive workflows and data-driven insights."
              },
              {
                q: "Is there a free version available?",
                a: "Yes, FlowPath offers a free tier with essential features for individuals. You can upgrade to premium plans for additional features as your needs grow."
              },
              {
                q: "Can I use FlowPath with my team?",
                a: "Absolutely! Our Pro and Enterprise plans include collaboration features that make it easy to work with your team, assign tasks, and track progress together."
              },
              {
                q: "How secure is my data?",
                a: "We take security seriously. All data is encrypted in transit and at rest, and we employ industry best practices to ensure your information remains private and secure."
              },
              {
                q: "Can I integrate FlowPath with other tools?",
                a: "Yes, FlowPath integrates with popular productivity tools, calendars, and messaging platforms to create a seamless workflow experience."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{item.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.a}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6">Still have questions?</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500/90 via-primary/90 to-blue-600/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have transformed their workflow with FlowPath.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8 py-6 text-lg bg-white text-primary hover:bg-gray-100">
                Start Your Journey Free <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0">
              <Auth view="sign_up" onSuccess={handleLoginSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xl font-bold">FlowPath</span>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering productivity through intelligent task management and goal tracking.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'linkedin'].map(platform => (
                  <a key={platform} href={`#${platform}`} className="text-gray-400 hover:text-primary transition-colors">
                    <span className="sr-only">{platform}</span>
                    <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center">
                      <span className="w-4 h-4 block bg-gray-400"></span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Product */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#integrations" className="text-gray-400 hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="#roadmap" className="text-gray-400 hover:text-primary transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#blog" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#docs" className="text-gray-400 hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#guides" className="text-gray-400 hover:text-primary transition-colors">User Guides</a></li>
                <li><a href="#api" className="text-gray-400 hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#careers" className="text-gray-400 hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
                <li>
                  <a href="mailto:contact@flowpath.app" className="flex items-center text-gray-400 hover:text-primary transition-colors">
                    <Mail className="h-4 w-4 mr-2" />
                    contact@flowpath.app
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} FlowPath. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</a>
              <a href="#terms" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</a>
              <a href="#cookies" className="text-gray-400 hover:text-primary transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

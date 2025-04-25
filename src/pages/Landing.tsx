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
                <Button variant="ghost" className="hidden sm:flex">Log in</Button>
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-600/90 z-0"></div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/0af50631-05fb-4b6d-8732-fb84e724a6df.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto mb-10">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold bg-primary/10 text-primary rounded-full uppercase tracking-wider">Productivity Simplified</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Stay Organized, <span className="text-primary">Achieve More</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your productivity with FlowPath's intuitive task management and goal tracking. Your journey to better organization starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="px-8 py-6 text-lg bg-primary hover:bg-primary/90">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-0">
                  <Auth view="sign_up" onSuccess={handleLoginSuccess} />
                </DialogContent>
              </Dialog>
              <a href="#demo" className="flex items-center text-white hover:text-primary transition-colors">
                <span className="mr-2">Watch demo</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-16 max-w-5xl mx-auto relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-lg blur opacity-50"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
              <img 
                src="/lovable-uploads/f045fe8f-f678-4135-8664-577b1c556930.png" 
                alt="FlowPath Dashboard" 
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Trusted by individuals and teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            ))}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Your Productivity Dashboard</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">Get a clear overview of your tasks, goals, and progress all in one place</p>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-primary rounded-xl blur-lg opacity-50"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
                <img 
                  src="/lovable-uploads/386ba8e1-5813-47f7-af09-493cad35bfb2.png" 
                  alt="FlowPath Dashboard Preview" 
                  className="w-full rounded-lg"
                />
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
      <section className="py-20 bg-gradient-to-br from-primary/90 to-blue-600/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
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


import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Bell, 
  Laptop, 
  Moon, 
  Clock, 
  Globe, 
  Lock, 
  Check, 
  X, 
  ChevronDown, 
  Calendar as CalendarIcon, 
  Mail, 
  MessageSquare
} from 'lucide-react';

const Settings = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('profile');
  
  // Toggle states
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [syncCalendar, setSyncCalendar] = useState(false);
  const [syncGoogleTasks, setSyncGoogleTasks] = useState(false);
  const [autoArchive, setAutoArchive] = useState(true);
  
  // Connected apps mock data
  const connectedApps = [
    { name: 'Google Calendar', connected: false, icon: CalendarIcon },
    { name: 'Microsoft Outlook', connected: true, icon: Mail },
    { name: 'Slack', connected: true, icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Settings" />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">Account Settings</h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">Manage your account preferences and integrations</p>
        </div>
        
        {/* Settings Tabs */}
        <div className="glass rounded-xl overflow-hidden card-shadow animate-scale-in">
          <div className="border-b border-gray-100 dark:border-gray-700">
            <ToggleGroup type="single" value={activeTab} onValueChange={(value) => value && setActiveTab(value)} className="p-1 w-full sm:w-auto">
              <ToggleGroupItem value="profile" className="rounded-md flex items-center gap-2 px-4 py-2.5 text-sm font-medium">
                <User size={16} />
                <span className="hidden sm:inline">Profile</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="notifications" className="rounded-md flex items-center gap-2 px-4 py-2.5 text-sm font-medium">
                <Bell size={16} />
                <span className="hidden sm:inline">Notifications</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="integrations" className="rounded-md flex items-center gap-2 px-4 py-2.5 text-sm font-medium">
                <Globe size={16} />
                <span className="hidden sm:inline">Integrations</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="appearance" className="rounded-md flex items-center gap-2 px-4 py-2.5 text-sm font-medium">
                <Laptop size={16} />
                <span className="hidden sm:inline">Appearance</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="privacy" className="rounded-md flex items-center gap-2 px-4 py-2.5 text-sm font-medium">
                <Lock size={16} />
                <span className="hidden sm:inline">Privacy</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Profile Settings</h2>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User size={32} className="text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                        <input 
                          id="name" 
                          type="text" 
                          className="mt-1 w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          defaultValue="Alex Johnson"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
                        <input 
                          id="email" 
                          type="email" 
                          className="mt-1 w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          defaultValue="alex@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="timezone" className="text-gray-700 dark:text-gray-300">Timezone</Label>
                        <select 
                          id="timezone" 
                          className="mt-1 w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          defaultValue="America/New_York"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="language" className="text-gray-700 dark:text-gray-300">Language</Label>
                        <select 
                          id="language" 
                          className="mt-1 w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          defaultValue="en-US"
                        >
                          <option value="en-US">English (US)</option>
                          <option value="en-GB">English (UK)</option>
                          <option value="fr-FR">French</option>
                          <option value="es-ES">Spanish</option>
                          <option value="de-DE">German</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Email Notifications</h3>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <div>
                        <Label htmlFor="email-tasks" className="text-gray-700 dark:text-gray-300">Task Reminders</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails for upcoming and overdue tasks</p>
                      </div>
                      <Switch 
                        id="email-tasks" 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <div>
                        <Label htmlFor="email-goals" className="text-gray-700 dark:text-gray-300">Goal Updates</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly progress reports on your goals</p>
                      </div>
                      <Switch id="email-goals" checked={true} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Push Notifications</h3>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <div>
                        <Label htmlFor="push-tasks" className="text-gray-700 dark:text-gray-300">Task Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about upcoming tasks and deadlines</p>
                      </div>
                      <Switch 
                        id="push-tasks" 
                        checked={pushNotifications} 
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <div>
                        <Label htmlFor="achievements" className="text-gray-700 dark:text-gray-300">Achievements</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when you reach milestones</p>
                      </div>
                      <Switch id="achievements" checked={true} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Connected Services</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Calendar & Task Sync</h3>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <div>
                        <Label htmlFor="sync-calendar" className="text-gray-700 dark:text-gray-300">Sync with Calendar</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add tasks to your calendar app automatically</p>
                      </div>
                      <Switch 
                        id="sync-calendar" 
                        checked={syncCalendar} 
                        onCheckedChange={setSyncCalendar} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <div>
                        <Label htmlFor="google-tasks" className="text-gray-700 dark:text-gray-300">Google Tasks</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Sync tasks with Google Tasks</p>
                      </div>
                      <Switch 
                        id="google-tasks" 
                        checked={syncGoogleTasks} 
                        onCheckedChange={setSyncGoogleTasks} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Connected Apps</h3>
                    
                    <div className="space-y-2">
                      {connectedApps.map((app) => (
                        <div key={app.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              <app.icon size={16} className="text-gray-600 dark:text-gray-300" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{app.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            {app.connected ? (
                              <div className="flex items-center space-x-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                  <Check size={12} className="mr-1" />
                                  Connected
                                </span>
                                <button className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                                  Disconnect
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                  <X size={12} className="mr-1" />
                                  Not Connected
                                </span>
                                <button className="text-sm text-primary hover:text-primary/90">
                                  Connect
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <Label htmlFor="dark-mode" className="text-gray-700 dark:text-gray-300">Dark Mode</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-gray-700 dark:text-gray-300">Theme Color</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-sm transition-all",
                            color === '#3b82f6' ? 'ring-2 ring-offset-2 ring-primary dark:ring-offset-gray-900' : ''
                          )}
                          style={{ backgroundColor: color }}
                          aria-label={`Set theme color to ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <Collapsible className="border border-gray-100 dark:border-gray-700 rounded-md overflow-hidden">
                    <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left focus:outline-none text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <span className="font-medium">Advanced Display Options</span>
                      <ChevronDown size={16} className="transition-transform duration-200 ease-in-out" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-t border-gray-100 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/30 space-y-4">
                      <div>
                        <Label htmlFor="density" className="text-gray-700 dark:text-gray-300">Display Density</Label>
                        <select 
                          id="density" 
                          className="mt-1 w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          defaultValue="comfortable"
                        >
                          <option value="compact">Compact</option>
                          <option value="comfortable">Comfortable</option>
                          <option value="spacious">Spacious</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label className="text-gray-700 dark:text-gray-300">Font Size</Label>
                        <div className="mt-1">
                          <Progress value={60} className="h-2" />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            )}
            
            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Privacy & Data</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Data Management</h3>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <div>
                        <Label htmlFor="auto-archive" className="text-gray-700 dark:text-gray-300">Auto-archive Completed Tasks</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Automatically archive tasks after 30 days</p>
                      </div>
                      <Switch 
                        id="auto-archive" 
                        checked={autoArchive} 
                        onCheckedChange={setAutoArchive}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <button className="text-sm font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 flex items-center">
                        <Clock size={14} className="mr-1" />
                        Clear Task History
                      </button>
                      
                      <button className="text-sm font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 flex items-center">
                        <Clock size={14} className="mr-1" />
                        Export Your Data
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Your data is stored securely and is never shared with third parties. 
                      For more information, please read our <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

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
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';
import { Separator } from '@/components/ui/separator';

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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">
                Manage your app settings and preferences.
              </p>
            </div>
            
            <Separator />
            
            <AppearanceSettings />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

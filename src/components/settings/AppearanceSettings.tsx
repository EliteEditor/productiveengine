import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const themeColors = [
  { name: 'blue', color: '#3b82f6' },
  { name: 'green', color: '#16a34a' },
  { name: 'orange', color: '#f97316' },
  { name: 'red', color: '#ef4444' },
  { name: 'purple', color: '#9333ea' },
] as const;

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [themeColor, setThemeColor] = useThemeColor();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Dark Mode</Label>
            <div className="text-sm text-muted-foreground">
              Switch between light and dark themes
            </div>
          </div>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-base">Theme Color</Label>
            <div className="text-sm text-muted-foreground">
              Choose your preferred accent color
            </div>
          </div>
          <div className="flex gap-2">
            {themeColors.map(({ name, color }) => (
              <button
                key={name}
                onClick={() => setThemeColor(name as typeof themeColor)}
                className={cn(
                  'w-8 h-8 rounded-full transition-all',
                  themeColor === name ? 'ring-2 ring-offset-2 ring-offset-background' : 'hover:scale-110'
                )}
                style={{ backgroundColor: color }}
                title={name.charAt(0).toUpperCase() + name.slice(1)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
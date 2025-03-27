import { useState, useEffect } from 'react';

type ThemeColor = 'blue' | 'green' | 'orange' | 'red' | 'purple';

const themeColors = {
  blue: {
    primary: '221.2 83.2% 53.3%',
    'primary-rgb': '59, 130, 246',
    ring: '221.2 83.2% 53.3%',
  },
  green: {
    primary: '142.1 76.2% 36.3%',
    'primary-rgb': '22, 163, 74',
    ring: '142.1 76.2% 36.3%',
  },
  orange: {
    primary: '24.6 95% 53.1%',
    'primary-rgb': '249, 115, 22',
    ring: '24.6 95% 53.1%',
  },
  red: {
    primary: '0 84.2% 60.2%',
    'primary-rgb': '239, 68, 68',
    ring: '0 84.2% 60.2%',
  },
  purple: {
    primary: '262.1 83.3% 57.8%',
    'primary-rgb': '147, 51, 234',
    ring: '262.1 83.3% 57.8%',
  },
};

export function useThemeColor() {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme-color') as ThemeColor) || 'blue';
    }
    return 'blue';
  });

  useEffect(() => {
    const root = document.documentElement;
    const colors = themeColors[themeColor];

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    localStorage.setItem('theme-color', themeColor);
  }, [themeColor]);

  return [themeColor, setThemeColor] as const;
} 
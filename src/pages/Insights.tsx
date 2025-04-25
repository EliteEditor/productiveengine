import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { ChartContainer } from '@/components/ui/chart';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell, Area 
} from 'recharts';
import { Calendar, Clock, TrendingUp, ListChecks, BarChart as BarChartIcon, Trophy, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProductivityStats } from '@/hooks/useProductivityStats';
import { useTaskContext } from '@/contexts/TaskContext';
import { useGoalContext } from '@/contexts/GoalContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

const chartConfig = {
  score: { color: "#3b82f6" },
  efficiency: { color: "#10b981" },
  completed: { color: "#10b981" },
  pending: { color: "#6366f1" },
  progress: { color: "#8b5cf6" },
};

const Insights = () => {
  const stats = useProductivityStats();
  const { tasks } = useTaskContext();
  const { goals } = useGoalContext();
  const [timeRange, setTimeRange] = useState('week');
  const isMobile = useIsMobile();

  // Calculate tasks by category
  const tasksByCategory = tasks.reduce((acc: Record<string, number>, task) => {
    const category = task.category || 'uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const tasksByCategoryData = Object.entries(tasksByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate task completion rate by day
  const completionRateData = stats.dailyData.map(day => ({
    name: day.date,
    rate: day.total > 0 ? Math.round((day.completed / day.total) * 100) : 0,
  }));

  // Colors for pie chart
  const COLORS = ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b', '#64748b'];

  // Calculate task status distribution
  const taskStatusData = [
    { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length },
    { name: 'Pending', value: tasks.filter(t => t.status === 'pending').length },
  ];

  // Calculate goal progress
  const goalProgressData = goals.map(goal => ({
    name: goal.title.substring(0, 15) + (goal.title.length > 15 ? '...' : ''),
    progress: goal.progress,
  }));

  // Configure pie chart dimensions based on device
  const pieChartConfig = {
    outerRadius: isMobile ? 60 : 80,
    innerRadius: isMobile ? 0 : 0,
    labelFontSize: isMobile ? 8 : 12,
    labelLine: !isMobile,
  };
  
  // Configure label rendering for pie charts
  const renderPieLabel = isMobile 
    ? null 
    : ({ name, percent }: { name: string, percent: number }) => 
        `${name.substring(0, 8)}${name.length > 8 ? '..' : ''}: ${(percent * 100).toFixed(0)}%`;

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Insights" />
      
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="mb-6 flex flex-wrap items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Productivity Insights</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Analyze your productivity patterns and receive personalized recommendations</p>
          </div>
          
          <div className="flex items-center mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Time Range:</span>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-background border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-primary">Completion Rate</CardTitle>
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{Math.round(stats.completionRate)}%</div>
              <p className="text-xs text-muted-foreground mt-1">Task completion rate {timeRange === 'week' ? 'this week' : timeRange === 'month' ? 'this month' : 'this quarter'}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-background border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-primary">Tasks Completed</CardTitle>
              <ListChecks className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.completedTasks}</div>
              <p className="text-xs text-muted-foreground mt-1">Out of {stats.totalTasks} total tasks</p>
            </CardContent>
          </Card>
          
          <Card className="bg-background border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-primary">Today's Tasks</CardTitle>
              <Calendar className="h-5 w-5 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.completedToday}/{stats.tasksToday}</div>
              <p className="text-xs text-muted-foreground mt-1">Tasks completed today</p>
            </CardContent>
          </Card>
          
          <Card className="bg-background border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-primary">Goal Progress</CardTitle>
              <Trophy className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{Math.round(stats.goalProgress)}%</div>
              <p className="text-xs text-muted-foreground mt-1">Average progress across all goals</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Chart Section - Mobile optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Task Progress Chart */}
          <Card className="bg-background border border-border">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center text-primary">
                <Zap size={20} className="mr-2 text-primary" />
                Weekly Task Progress
              </CardTitle>
              <CardDescription className="text-muted-foreground">Your task completion over the week</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] p-6">
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stats.dailyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
                    <XAxis
                      dataKey="date"
                      stroke="#888888"
                      tick={{ fill: '#888888', fontSize: isMobile ? 10 : 12 }}
                    />
                    <YAxis
                      stroke="#888888"
                      tick={{ fill: '#888888', fontSize: isMobile ? 10 : 12 }}
                      width={isMobile ? 35 : 40}
                      domain={[0, 10]}
                      ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                      allowDecimals={false}
                      label={{ 
                        value: 'Tasks', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fill: '#888888' }
                      }}
                    />
                    <Tooltip />
                    <Line 
                      type="monotone"
                      dataKey="completed"
                      name="Completed Tasks"
                      stroke={chartConfig.completed.color}
                      strokeWidth={2}
                      dot={{ fill: chartConfig.completed.color }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Tasks by Category Chart */}
          <Card className="bg-background border border-border">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center text-primary">
                <BarChartIcon size={20} className="mr-2 text-primary" />
                Tasks by Category
              </CardTitle>
              <CardDescription className="text-muted-foreground">Distribution of tasks across categories</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] p-6">
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tasksByCategoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={pieChartConfig.outerRadius}
                      fill="#8884d8"
                      dataKey="value"
                      label={renderPieLabel}
                      labelLine={pieChartConfig.labelLine}
                    >
                      {tasksByCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Status Distribution */}
          <Card className="bg-background border border-border">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center text-primary">
                <BarChartIcon size={20} className="mr-2 text-primary" />
                Task Status
              </CardTitle>
              <CardDescription className="text-muted-foreground">Distribution of tasks by status</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] p-6">
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={pieChartConfig.outerRadius}
                      fill="#8884d8"
                      dataKey="value"
                      label={renderPieLabel}
                      labelLine={pieChartConfig.labelLine}
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.name === 'Completed' ? chartConfig.completed.color : chartConfig.pending.color} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Goal Progress Chart */}
          <Card className="bg-background border border-border">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center text-primary">
                <BarChartIcon size={20} className="mr-2 text-primary" />
                Goal Progress
              </CardTitle>
              <CardDescription className="text-muted-foreground">Progress across your goals</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[250px] p-6">
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={goalProgressData}
                    margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]} 
                      stroke="#888888"
                      tick={{ fill: '#888888', fontSize: isMobile ? 10 : 12 }}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={isMobile ? 60 : 80}
                      stroke="#888888"
                      tick={{ fill: '#888888', fontSize: isMobile ? 10 : 12 }}
                    />
                    <Tooltip />
                    <Bar 
                      dataKey="progress" 
                      name="Progress" 
                      fill={chartConfig.progress.color}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Insights;

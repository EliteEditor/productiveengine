
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { Calendar, Clock, TrendingUp, ListChecks, BarChart as BarChartIcon, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProductivityStats } from '@/hooks/useProductivityStats';
import { useTaskContext } from '@/contexts/TaskContext';
import { useGoalContext } from '@/contexts/GoalContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const chartConfig = {
  completed: { color: "#10b981" }, // emerald
  pending: { color: "#6366f1" }, // indigo
  goal: { color: "#8b5cf6" }, // violet
  success: { color: "#10b981" }, // emerald
  info: { color: "#3b82f6" }, // blue
  warning: { color: "#f59e0b" }, // amber
  danger: { color: "#ef4444" }, // red
};

const Insights = () => {
  const stats = useProductivityStats();
  const { tasks } = useTaskContext();
  const { goals } = useGoalContext();
  const [timeRange, setTimeRange] = useState('week');

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Insights" />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in">
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.completionRate)}%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Task completion rate {timeRange === 'week' ? 'this week' : timeRange === 'month' ? 'this month' : 'this quarter'}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Tasks Completed</CardTitle>
              <ListChecks className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTasks}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Out of {stats.totalTasks} total tasks</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Tasks</CardTitle>
              <Calendar className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedToday}/{stats.tasksToday}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tasks completed today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Goal Progress</CardTitle>
              <Trophy className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.goalProgress)}%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Average progress across all goals</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Daily Completion Rate Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChartIcon size={18} className="mr-2 text-primary" />
                Task Completion Rate
              </CardTitle>
              <CardDescription>Daily completion rate over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={chartConfig}>
                <LineChart
                  data={completionRateData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    name="Completion Rate" 
                    stroke={chartConfig.success.color}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          {/* Tasks by Category Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChartIcon size={18} className="mr-2 text-primary" />
                Tasks by Category
              </CardTitle>
              <CardDescription>Distribution of tasks across categories</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={chartConfig}>
                <PieChart>
                  <Pie
                    data={tasksByCategoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {tasksByCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChartIcon size={18} className="mr-2 text-primary" />
                Task Status
              </CardTitle>
              <CardDescription>Distribution of task completion status</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={chartConfig}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#10b981" /> {/* Completed */}
                    <Cell fill="#ef4444" /> {/* Pending */}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          {/* Goal Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChartIcon size={18} className="mr-2 text-primary" />
                Goal Progress
              </CardTitle>
              <CardDescription>Progress across your goals</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={chartConfig}>
                <BarChart
                  data={goalProgressData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="progress" name="Progress" fill={chartConfig.goal.color} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Insights;

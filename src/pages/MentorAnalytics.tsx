/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { BarChart, LineChart, PieChart, CartesianGrid, XAxis, YAxis, 
  Tooltip, Legend, Bar, Line, Pie, Cell, 
  ResponsiveContainer} from 'recharts';
import { Clock, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalyticsData {
    overview: {
      totalMentees: number;
      activePaths: number;
      avgProgress: number;
      completionRate: number;
    };
    engagement: {
      weeklyActivity: { date: string; sessions: number; resources: number }[];
      menteeComparison: { mentee: string; progress: number; attendance: number }[];
    };
    sessionStats: {
      typeDistribution: { type: 'video' | 'quiz'; count: number }[];
      ratingTrends: { month: string; avgRating: number }[];
    };
    resourceUsage: {
      popularResources: { title: string; type: string; accesses: number }[];
      completionRates: { resource: string; completed: number }[];
    };
}

const mockAnalyticsData = {
  overview: {
    totalMentees: 8,
    activePaths: 12,
    avgProgress: 65,
    completionRate: 40
  },
  engagement: [
    { week: '2023-W01', sessions: 12, resources: 45 },
    { week: '2023-W02', sessions: 18, resources: 62 },
    { week: '2023-W03', sessions: 15, resources: 58 }
  ],
  sessionStats: {
    types: [
      { type: 'video', count: 25 },
      { type: 'quiz', count: 15 }
    ],
    ratings: [
      { month: 'Jan', avg: 4.2 },
      { month: 'Feb', avg: 4.5 },
      { month: 'Mar', avg: 4.7 }
    ]
  }
};

export default function MentorAnalytics() {
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Learning Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          icon={<Users />} 
          title="Active Mentees"
          value={mockAnalyticsData.overview.totalMentees}
          trend="+2 from last month"
        />
        <MetricCard 
          icon={<BookOpen />} 
          title="Avg Progress"
          value={`${mockAnalyticsData.overview.avgProgress}%`}
          trend="+5.2% improvement"
        />
        <MetricCard 
          icon={<Clock />} 
          title="Session Hours"
          value="23.5h"
          trend="4h weekly average"
        />
        <MetricCard 
          icon={<TrendingUp />} 
          title="Completion Rate"
          value={`${mockAnalyticsData.overview.completionRate}%`}
          trend="Meeting 80% of goals"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ChartCard title="Engagement Trends">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart width={500} height={300} data={mockAnalyticsData.engagement}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sessions" stroke="#2563eb" />
                    <Line type="monotone" dataKey="resources" stroke="#16a34a" />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Session Distribution">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={500} height={300}>
                    <Pie
                    data={mockAnalyticsData.sessionStats.types}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    >
                    {mockAnalyticsData.sessionStats.types.map((entry, index) => (
                        <Cell key={index} fill={entry.type === 'video' ? '#2563eb' : '#16a34a'} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="Session Ratings Over Time">
            <ResponsiveContainer width="100%" height={300}>
            <BarChart width={800} height={300} data={mockAnalyticsData.sessionStats.ratings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avg" fill="#2563eb" />
            </BarChart>
            </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend: string;
}

const MetricCard = ({ icon, title, value, trend }: MetricCardProps) => (
  <Card>
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">{icon}</div>
        <div>
          <p className="text-xs sm:text-sm text-gray-600">{title}</p>
          <p className="text-lg sm:text-2xl font-semibold">{value}</p>
          <span className="text-xs sm:text-sm text-green-600">{trend}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard = ({ title, children }: ChartCardProps) => (
  <Card>
    <CardHeader className="p-4 sm:p-6">
      <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-4 sm:p-6">{children}</CardContent>
  </Card>
);
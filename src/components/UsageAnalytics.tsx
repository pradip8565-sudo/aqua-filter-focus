
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Droplets, Calendar, Activity } from "lucide-react";

export const UsageAnalytics = () => {
  const weeklyUsage = [
    { day: "Mon", liters: 35 },
    { day: "Tue", liters: 42 },
    { day: "Wed", liters: 38 },
    { day: "Thu", liters: 45 },
    { day: "Fri", liters: 52 },
    { day: "Sat", liters: 60 },
    { day: "Sun", liters: 48 }
  ];

  const monthlyTrend = [
    { month: "Jan", usage: 1250, quality: 92 },
    { month: "Feb", usage: 1180, quality: 94 },
    { month: "Mar", usage: 1320, quality: 91 },
    { month: "Apr", usage: 1280, quality: 93 },
    { month: "May", usage: 1450, quality: 89 },
    { month: "Jun", usage: 1380, quality: 95 }
  ];

  const stats = [
    {
      label: "Total Filtered",
      value: "8,240 L",
      change: "+12%",
      icon: Droplets,
      period: "This month"
    },
    {
      label: "Daily Average",
      value: "45.2 L",
      change: "+8%",
      icon: Activity,
      period: "This week"
    },
    {
      label: "Peak Usage",
      value: "68 L",
      change: "Saturday",
      icon: TrendingUp,
      period: "This week"
    },
    {
      label: "System Uptime",
      value: "99.8%",
      change: "Excellent",
      icon: Calendar,
      period: "This month"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.period}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Water Usage</CardTitle>
            <CardDescription>Daily consumption pattern</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="liters" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Usage and quality over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="quality" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, Zap, Activity } from "lucide-react";

export const WaterQualityDashboard = () => {
  const qualityMetrics = [
    {
      label: "TDS Level",
      value: "45 ppm",
      status: "excellent",
      icon: Droplets,
      description: "Total Dissolved Solids"
    },
    {
      label: "pH Level",
      value: "7.2",
      status: "good",
      icon: Activity,
      description: "Acidity/Alkalinity"
    },
    {
      label: "Temperature",
      value: "22°C",
      status: "normal",
      icon: Thermometer,
      description: "Water Temperature"
    },
    {
      label: "Pressure",
      value: "65 PSI",
      status: "good",
      icon: Zap,
      description: "System Pressure"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-500/10 text-green-700 border-green-200";
      case "good": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "normal": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-600" />
          Water Quality Metrics
        </CardTitle>
        <CardDescription>Real-time water quality monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {qualityMetrics.map((metric) => (
            <div key={metric.label} className="p-4 border rounded-lg bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{metric.label}</span>
                </div>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

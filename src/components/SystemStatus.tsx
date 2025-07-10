
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Power, Wifi, AlertTriangle, CheckCircle } from "lucide-react";

export const SystemStatus = () => {
  const systemComponents = [
    {
      name: "RO Membrane",
      status: "active",
      health: 85,
      icon: CheckCircle
    },
    {
      name: "Pre-Filter",
      status: "active",
      health: 92,
      icon: CheckCircle
    },
    {
      name: "Post-Filter",
      status: "warning",
      health: 65,
      icon: AlertTriangle
    },
    {
      name: "UV Sterilizer",
      status: "active",
      health: 88,
      icon: CheckCircle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-700 border-green-200";
      case "warning": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "error": return "bg-red-500/10 text-red-700 border-red-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5 text-green-600" />
            System Status
          </CardTitle>
          <CardDescription>Overall system health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">System Online</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600">Active</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Network Status</span>
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-600">Connected</span>
            </div>
          </div>

          <div className="space-y-3">
            {systemComponents.map((component) => (
              <div key={component.name} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <component.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{component.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{component.health}%</span>
                  <Badge className={getStatusColor(component.status)}>
                    {component.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

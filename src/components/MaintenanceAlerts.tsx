
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Wrench, AlertTriangle } from "lucide-react";

export const MaintenanceAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: "urgent",
      title: "Carbon Pre-Filter Replacement Due",
      description: "Stage 2 carbon filter needs replacement within 2 weeks",
      dueDate: "2024-02-15",
      priority: "high"
    },
    {
      id: 2,
      type: "scheduled",
      title: "System Sanitization",
      description: "Quarterly system cleaning and sanitization scheduled",
      dueDate: "2024-03-01",
      priority: "medium"
    },
    {
      id: 3,
      type: "reminder",
      title: "TDS Meter Calibration",
      description: "Annual TDS meter calibration recommended",
      dueDate: "2024-04-15",
      priority: "low"
    }
  ];

  const upcomingMaintenance = [
    {
      task: "RO Membrane Inspection",
      date: "2024-03-15",
      type: "inspection"
    },
    {
      task: "Pressure Tank Check",
      date: "2024-03-30",
      type: "maintenance"
    },
    {
      task: "UV Lamp Replacement",
      date: "2024-05-01",
      type: "replacement"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-700 border-red-200";
      case "medium": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "low": return "bg-blue-500/10 text-blue-700 border-blue-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-600" />
            Active Alerts
          </CardTitle>
          <CardDescription>Maintenance items requiring attention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 border rounded-lg bg-card">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                </div>
                <Badge className={getPriorityColor(alert.priority)}>
                  {alert.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {alert.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Due: {alert.dueDate}
                </div>
                <Button size="sm" variant="outline">
                  Mark Complete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-600" />
            Upcoming Maintenance
          </CardTitle>
          <CardDescription>Scheduled maintenance tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingMaintenance.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-card">
              <div>
                <div className="font-medium text-sm">{item.task}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {item.type} • {item.date}
                </div>
              </div>
              <Button size="sm" variant="ghost">
                Schedule
              </Button>
            </div>
          ))}
          
          <Button className="w-full mt-4" variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View Full Schedule
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

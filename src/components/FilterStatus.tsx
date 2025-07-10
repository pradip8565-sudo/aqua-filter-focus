
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Calendar, AlertCircle } from "lucide-react";

export const FilterStatus = () => {
  const filters = [
    {
      name: "Sediment Pre-Filter",
      type: "Stage 1",
      lifespan: 6,
      used: 4,
      status: "good",
      lastChanged: "2024-01-15",
      nextChange: "2024-03-15"
    },
    {
      name: "Carbon Pre-Filter",
      type: "Stage 2",
      lifespan: 6,
      used: 5,
      status: "warning",
      lastChanged: "2024-01-15",
      nextChange: "2024-02-15"
    },
    {
      name: "RO Membrane",
      type: "Stage 3",
      lifespan: 24,
      used: 18,
      status: "good",
      lastChanged: "2023-06-01",
      nextChange: "2025-06-01"
    },
    {
      name: "Post Carbon Filter",
      type: "Stage 4",
      lifespan: 12,
      used: 8,
      status: "good",
      lastChanged: "2023-07-01",
      nextChange: "2024-07-01"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500/10 text-green-700 border-green-200";
      case "warning": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "critical": return "bg-red-500/10 text-red-700 border-red-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getUsagePercentage = (used: number, lifespan: number) => {
    return (used / lifespan) * 100;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Filter Status Overview
          </CardTitle>
          <CardDescription>Monitor and manage your RO system filters</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filters.map((filter) => (
          <Card key={filter.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{filter.name}</CardTitle>
                  <CardDescription>{filter.type}</CardDescription>
                </div>
                <Badge className={getStatusColor(filter.status)}>
                  {filter.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Usage</span>
                  <span>{filter.used}/{filter.lifespan} months</span>
                </div>
                <Progress value={getUsagePercentage(filter.used, filter.lifespan)} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Calendar className="h-3 w-3" />
                    Last Changed
                  </div>
                  <div className="font-medium">{filter.lastChanged}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <AlertCircle className="h-3 w-3" />
                    Next Change
                  </div>
                  <div className="font-medium">{filter.nextChange}</div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                Schedule Replacement
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

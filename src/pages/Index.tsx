
import { WaterQualityDashboard } from "@/components/WaterQualityDashboard";
import { SystemStatus } from "@/components/SystemStatus";
import { FilterStatus } from "@/components/FilterStatus";
import { MaintenanceAlerts } from "@/components/MaintenanceAlerts";
import { UsageAnalytics } from "@/components/UsageAnalytics";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AquaPure RO System</h1>
            <p className="text-muted-foreground">Water Filtration Management</p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WaterQualityDashboard />
              </div>
              <div>
                <SystemStatus />
              </div>
            </div>
            <MaintenanceAlerts />
          </TabsContent>

          <TabsContent value="filters" className="mt-6">
            <FilterStatus />
          </TabsContent>

          <TabsContent value="maintenance" className="mt-6">
            <MaintenanceAlerts />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <UsageAnalytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

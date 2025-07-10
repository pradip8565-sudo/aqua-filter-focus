
import { InventoryDashboard } from "@/components/InventoryDashboard";
import { CustomerManagement } from "@/components/CustomerManagement";
import { OrderManagement } from "@/components/OrderManagement";
import { SalesAnalytics } from "@/components/SalesAnalytics";
import { SupplierManagement } from "@/components/SupplierManagement";
import { BusinessOverview } from "@/components/BusinessOverview";
import { Package, Users, ShoppingCart, TrendingUp, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AquaPure Wholesale</h1>
            <p className="text-muted-foreground">RO Filter Wholesale Business Management</p>
          </div>
          <Button variant="outline" size="sm">
            <Package className="h-4 w-4 mr-2" />
            Quick Order
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <BusinessOverview />
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <InventoryDashboard />
          </TabsContent>

          <TabsContent value="customers" className="mt-6">
            <CustomerManagement />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="suppliers" className="mt-6">
            <SupplierManagement />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <SalesAnalytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

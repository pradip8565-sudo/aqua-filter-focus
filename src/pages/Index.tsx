
import { InventoryDashboard } from "@/components/InventoryDashboard";
import { CustomerManagement } from "@/components/CustomerManagement";
import { OrderManagement } from "@/components/OrderManagement";
import { SalesAnalytics } from "@/components/SalesAnalytics";
import { SupplierManagement } from "@/components/SupplierManagement";
import { BusinessOverview } from "@/components/BusinessOverview";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('app.title')}</h1>
            <p className="text-muted-foreground">{t('app.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Package className="h-4 w-4 mr-2" />
              {t('quick.order')}
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">{t('nav.dashboard')}</TabsTrigger>
            <TabsTrigger value="inventory">{t('nav.inventory')}</TabsTrigger>
            <TabsTrigger value="customers">{t('nav.customers')}</TabsTrigger>
            <TabsTrigger value="orders">{t('nav.orders')}</TabsTrigger>
            <TabsTrigger value="suppliers">{t('nav.suppliers')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('nav.analytics')}</TabsTrigger>
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

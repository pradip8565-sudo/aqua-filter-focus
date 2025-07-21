
import { InventoryDashboard } from "@/components/InventoryDashboard";
import { CustomerManagement } from "@/components/CustomerManagement";
import { OrderManagement } from "@/components/OrderManagement";
import { SalesAnalytics } from "@/components/SalesAnalytics";
import { SupplierManagement } from "@/components/SupplierManagement";
import { BusinessOverview } from "@/components/BusinessOverview";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import LogoutButton from "@/components/LogoutButton";
import { ShopImageUpload } from "@/components/ShopImageUpload";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Package, ExternalLink, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const { t } = useLanguage();
  const [shopImageUrl, setShopImageUrl] = useState<string>("");
  const [isShopSettingsOpen, setIsShopSettingsOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-7xl mx-auto gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Mahadev Enterprise</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Business Management System</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Dialog open={isShopSettingsOpen} onOpenChange={setIsShopSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Shop Settings</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Shop Settings</DialogTitle>
                    <DialogDescription>
                      Upload or manage your shop image for the public catalog
                    </DialogDescription>
                  </DialogHeader>
                  <ShopImageUpload
                    currentImageUrl={shopImageUrl}
                    onImageUploaded={(imageUrl) => {
                      setShopImageUrl(imageUrl);
                      setIsShopSettingsOpen(false);
                    }}
                    onImageRemoved={() => {
                      setShopImageUrl("");
                      setIsShopSettingsOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">{t('quick.order')}</span>
                <span className="sm:hidden">Order</span>
              </Button>
              <Link to="/inventory-app">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden sm:inline">Public Catalog</span>
                  <span className="sm:hidden">Catalog</span>
                </Button>
              </Link>
              <LanguageSwitcher />
              <LogoutButton />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 sm:p-6">
          <Tabs defaultValue="dashboard" className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-6 min-w-[600px]">
                <TabsTrigger value="dashboard" className="text-xs sm:text-sm">{t('nav.dashboard')}</TabsTrigger>
                <TabsTrigger value="inventory" className="text-xs sm:text-sm">{t('nav.inventory')}</TabsTrigger>
                <TabsTrigger value="customers" className="text-xs sm:text-sm">{t('nav.customers')}</TabsTrigger>
                <TabsTrigger value="orders" className="text-xs sm:text-sm">{t('nav.orders')}</TabsTrigger>
                <TabsTrigger value="suppliers" className="text-xs sm:text-sm">{t('nav.suppliers')}</TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs sm:text-sm">{t('nav.analytics')}</TabsTrigger>
              </TabsList>
            </div>

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
    </ProtectedRoute>
  );
};

export default Index;

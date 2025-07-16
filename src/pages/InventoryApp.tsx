
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Phone, Mail, MapPin, Globe, Package, Star } from "lucide-react";
import { useState } from "react";

interface InventoryItem {
  id: string;
  product_id: string;
  name: string;
  description?: string;
  unit_price: number;
  selling_price: number;
  stock_quantity: number;
  minimum_stock: number;
  unit?: string;
  hsn_code?: string;
  gst_rate?: number;
  status?: string;
  categories?: { name: string };
  suppliers?: { name: string };
}

const InventoryApp = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: inventory, isLoading } = useQuery({
    queryKey: ['inventory-display', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('inventory')
        .select(`
          *,
          categories (name),
          suppliers (name)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,product_id.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as InventoryItem[];
    }
  });

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (current <= minimum) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  const contactInfo = {
    businessName: "AquaPure Water Solutions",
    tagline: "Premium Water Filtration Systems & Solutions",
    phone: "+91 98765 43210",
    email: "info@aquapure.com",
    address: "123 Industrial Area, Phase-2, Sector 45, Gurgaon, Haryana 122003",
    website: "www.aquapure.com"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">{contactInfo.businessName}</h1>
            <p className="text-lg text-muted-foreground mb-4">{contactInfo.tagline}</p>
          </div>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-foreground">{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-foreground">{contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-foreground">{contactInfo.website}</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-foreground text-sm">Gurgaon, Haryana</span>
            </div>
          </div>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Our Product Catalog</h2>
          <p className="text-muted-foreground">Premium water filtration products for your needs</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground mt-4">Loading products...</p>
          </div>
        ) : inventory?.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {inventory?.map((item) => {
              const stockStatus = getStockStatus(item.stock_quantity, item.minimum_stock);
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {item.product_id}
                      </Badge>
                      <Badge className={`text-xs ${stockStatus.color}`}>
                        {stockStatus.label}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{item.name}</CardTitle>
                    {item.categories?.name && (
                      <CardDescription className="text-sm">
                        {item.categories.name}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.description}
                      </p>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Price:</span>
                        <span className="text-lg font-bold text-primary">
                          ₹{item.selling_price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      {item.unit_price !== item.selling_price && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Cost:</span>
                          <span className="text-sm text-muted-foreground">
                            ₹{item.unit_price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Stock:</span>
                        <span className="text-sm font-medium">
                          {item.stock_quantity} {item.unit}
                        </span>
                      </div>
                      
                      {item.hsn_code && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">HSN:</span>
                          <span className="text-sm">{item.hsn_code}</span>
                        </div>
                      )}
                      
                      {item.gst_rate && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">GST:</span>
                          <span className="text-sm">{item.gst_rate}%</span>
                        </div>
                      )}
                    </div>
                    
                    {item.suppliers?.name && (
                      <div className="pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-muted-foreground">
                            Supplier: {item.suppliers.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">{contactInfo.businessName}</h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                {contactInfo.address}
              </p>
              <div className="flex items-center justify-center gap-6">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {contactInfo.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {contactInfo.email}
                </p>
              </div>
              <p className="flex items-center justify-center gap-2">
                <Globe className="h-4 w-4" />
                {contactInfo.website}
              </p>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                © 2024 {contactInfo.businessName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InventoryApp;

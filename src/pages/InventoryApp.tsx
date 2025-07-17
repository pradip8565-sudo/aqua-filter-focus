
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Phone, Mail, MapPin, Globe, Package, LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  selling_price: number;
  categories?: { name: string };
  image_url?: string;
}

const InventoryApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shopImageUrl, setShopImageUrl] = useState<string>("");

  const { data: inventory, isLoading } = useQuery({
    queryKey: ['inventory-display', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('inventory')
        .select(`
          id,
          name,
          description,
          selling_price,
          image_url,
          categories (name)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as InventoryItem[];
    }
  });

  const contactInfo = {
    businessName: "Mahadev Enterprise",
    tagline: "Premium Water Filtration Systems & Solutions",
    phone: "+91 9429466454",
    email: "info@mahadeventerprises.com",
    address: "Jila Panchayat Road, Market Yard, Shop 123, Amreli",
    website: "www.mahadeventerprises.com"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex justify-between items-start mb-6">
            <div className="text-center flex-1">
              {shopImageUrl && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={shopImageUrl}
                    alt="Mahadev Enterprise"
                    className="h-20 w-auto object-contain rounded-lg"
                  />
                </div>
              )}
              <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">{contactInfo.businessName}</h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-4">{contactInfo.tagline}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <Link to="/admin-login">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin Login</span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="text-foreground text-sm sm:text-base">{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="text-foreground text-sm sm:text-base truncate">{contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="text-foreground text-sm sm:text-base">{contactInfo.website}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="text-foreground text-sm sm:text-base">Amreli, Gujarat</span>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Our Product Catalog</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Premium water filtration products for your needs</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {inventory?.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
                {/* Product Image */}
                {item.image_url ? (
                  <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg line-clamp-2">{item.name}</CardTitle>
                  {item.categories?.name && (
                    <CardDescription className="text-sm">
                      {item.categories.name}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-3 sm:space-y-4">
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="text-base sm:text-lg font-bold text-primary">
                        ₹{item.selling_price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">{contactInfo.businessName}</h3>
            <div className="space-y-3 sm:space-y-2 text-muted-foreground">
              <p className="flex items-center justify-center gap-2 text-sm sm:text-base">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-center">{contactInfo.address}</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <p className="flex items-center gap-2 text-sm sm:text-base">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  {contactInfo.phone}
                </p>
                <p className="flex items-center gap-2 text-sm sm:text-base">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  {contactInfo.email}
                </p>
              </div>
              <p className="flex items-center justify-center gap-2 text-sm sm:text-base">
                <Globe className="h-4 w-4 flex-shrink-0" />
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


import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { ProductHeader } from "@/components/ProductHeader";
import { ProductSearch } from "@/components/ProductSearch";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFooter } from "@/components/ProductFooter";

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
      <ProductHeader contactInfo={contactInfo} />

      {/* Products Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Our Product Catalog</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Premium water filtration products for your needs</p>
        </div>

        <ProductSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ProductGrid inventory={inventory || []} isLoading={isLoading} />
      </main>

      <ProductFooter contactInfo={contactInfo} />
    </div>
  );
};

export default InventoryApp;

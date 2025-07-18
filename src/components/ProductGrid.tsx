
import { Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  selling_price: number;
  categories?: { name: string };
  image_url?: string;
}

interface ProductGridProps {
  inventory: InventoryItem[];
  isLoading: boolean;
}

export const ProductGrid = ({ inventory, isLoading }: ProductGridProps) => {
  const handleQuickOrder = (item: InventoryItem) => {
    console.log('Handling quick order for:', item);
    
    // Create WhatsApp message with product details
    const message = `Hi! I'm interested in ordering:\n\nProduct: ${item.name}\nPrice: ₹${item.selling_price.toLocaleString('en-IN')}\n\nPlease let me know about availability and delivery details.`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "919429466454"; // Remove the + for WhatsApp API
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    console.log('WhatsApp URL:', whatsappUrl);
    
    // Open WhatsApp in a new tab/window
    const newWindow = window.open(whatsappUrl, '_blank');
    
    if (newWindow) {
      toast.success("Opening WhatsApp to place your order!");
    } else {
      // Fallback: try direct navigation
      window.location.href = whatsappUrl;
      toast.success("Redirecting to WhatsApp...");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground mt-4">Loading products...</p>
      </div>
    );
  }

  if (inventory?.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-xl text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
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
              <Button 
                onClick={() => handleQuickOrder(item)}
                className="w-full"
                size="sm"
              >
                Quick Order via WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};


import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { InventoryTable } from "./InventoryTable";
import { InventoryForm } from "./InventoryForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { handleInventoryError } from "./InventoryErrorHandler";

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
  category_id?: string;
  supplier_id?: string;
  image_url?: string;
  created_at: string;
}

const InventoryDashboard = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: inventory, isLoading } = useQuery({
    queryKey: ['inventory', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,product_id.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as InventoryItem[];
    }
  });

  const deleteInventory = async (id: string) => {
    try {
      console.log('Attempting to delete inventory item:', id);
      
      const { error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        handleInventoryError(error, 'delete product');
        return;
      }

      console.log('Successfully deleted inventory item');
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    } catch (error) {
      console.error('Unexpected error during delete:', error);
      handleInventoryError(error, 'delete product');
    }
  };

  const filteredInventory = inventory || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header Section with Border */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
      </div>

      {/* Search and Add Section with Border */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-input"
            />
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Create a new product in your inventory.
                </DialogDescription>
              </DialogHeader>
              <InventoryForm setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-card rounded-lg border">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <InventoryTable data={filteredInventory} onDelete={deleteInventory} />
        )}
      </div>
    </div>
  );
};

export { InventoryDashboard };

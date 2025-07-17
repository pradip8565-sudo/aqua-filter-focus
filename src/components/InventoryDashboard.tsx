import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { InventoryTable } from "./InventoryTable";
import { InventoryForm } from "./InventoryForm";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";
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
  const queryClient = useQueryClient();

  const { data: inventory, isLoading, refetch } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false });
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Inventory Dashboard</h2>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {isLoading ? "Refreshing..." : "Refresh"}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
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
      {inventory && (
        <InventoryTable data={inventory} onDelete={deleteInventory} />
      )}
    </div>
  );
};

export { InventoryDashboard };

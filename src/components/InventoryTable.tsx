
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Edit, Package } from "lucide-react";

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

interface InventoryTableProps {
  data: InventoryItem[];
  onDelete: (id: string) => void;
}

export const InventoryTable = ({ data, onDelete }: InventoryTableProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">inactive</Badge>;
      case 'discontinued':
        return <Badge variant="destructive">discontinued</Badge>;
      default:
        return <Badge variant="outline">unknown</Badge>;
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead className="text-muted-foreground font-medium">Image</TableHead>
            <TableHead className="text-muted-foreground font-medium">Product ID</TableHead>
            <TableHead className="text-muted-foreground font-medium">Name</TableHead>
            <TableHead className="text-muted-foreground font-medium">Unit Price</TableHead>
            <TableHead className="text-muted-foreground font-medium">Selling Price</TableHead>
            <TableHead className="text-muted-foreground font-medium">Stock</TableHead>
            <TableHead className="text-muted-foreground font-medium">Min Stock</TableHead>
            <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="border-b border-border/50 hover:bg-muted/50">
              <TableCell className="py-4">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </TableCell>
              <TableCell className="py-4 font-medium text-foreground">{item.product_id}</TableCell>
              <TableCell className="py-4">
                <div>
                  <div className="font-medium text-foreground">{item.name}</div>
                  {item.description && (
                    <div className="text-sm text-muted-foreground truncate max-w-xs">
                      {item.description}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-4 text-foreground">₹{item.unit_price.toFixed(2)}</TableCell>
              <TableCell className="py-4 text-foreground">₹{item.selling_price.toFixed(2)}</TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-2">
                  <span className="text-foreground">{item.stock_quantity}</span>
                  {item.stock_quantity <= item.minimum_stock && (
                    <Badge variant="destructive" className="text-xs">Low</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-4 text-foreground">{item.minimum_stock}</TableCell>
              <TableCell className="py-4">{getStatusBadge(item.status)}</TableCell>
              <TableCell className="py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{item.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item.id)}
                          className="bg-destructive text-destructive-foreground"
                          disabled={deletingId === item.id}
                        >
                          {deletingId === item.id ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                No products found. Add your first product to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

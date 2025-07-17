
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { handleInventoryError } from "./InventoryErrorHandler";
import { Upload, X } from "lucide-react";

interface InventoryFormProps {
  setOpen: (open: boolean) => void;
}

interface FormData {
  product_id: string;
  name: string;
  description: string;
  unit_price: string;
  selling_price: string;
  stock_quantity: string;
  minimum_stock: string;
  unit: string;
  hsn_code: string;
  gst_rate: string;
  status: string;
  image_url: string;
}

export const InventoryForm = ({ setOpen }: InventoryFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    product_id: '',
    name: '',
    description: '',
    unit_price: '',
    selling_price: '',
    stock_quantity: '',
    minimum_stock: '',
    unit: 'piece',
    hsn_code: '',
    gst_rate: '18',
    status: 'active',
    image_url: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  const queryClient = useQueryClient();

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, WebP, or GIF)");
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setFormData(prev => ({ ...prev, image_url: imageUrl }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  const createInventory = useMutation({
    mutationFn: async (data: FormData) => {
      const { error } = await supabase
        .from('inventory')
        .insert([{
          product_id: data.product_id,
          name: data.name,
          description: data.description || null,
          unit_price: parseFloat(data.unit_price),
          selling_price: parseFloat(data.selling_price),
          stock_quantity: parseInt(data.stock_quantity),
          minimum_stock: parseInt(data.minimum_stock),
          unit: data.unit,
          hsn_code: data.hsn_code || null,
          gst_rate: parseFloat(data.gst_rate),
          status: data.status,
          image_url: data.image_url || null
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      setOpen(false);
      setFormData({
        product_id: '',
        name: '',
        description: '',
        unit_price: '',
        selling_price: '',
        stock_quantity: '',
        minimum_stock: '',
        unit: 'piece',
        hsn_code: '',
        gst_rate: '18',
        status: 'active',
        image_url: ''
      });
    },
    onError: (error) => {
      handleInventoryError(error, 'add product');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.product_id || !formData.name || !formData.unit_price || !formData.selling_price) {
      toast.error("Please fill in all required fields");
      return;
    }

    createInventory.mutate(formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="product_id">Product ID *</Label>
          <Input
            id="product_id"
            value={formData.product_id}
            onChange={(e) => handleInputChange('product_id', e.target.value)}
            placeholder="Enter product ID"
            required
          />
        </div>
        <div>
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter product description"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="image">Product Image</Label>
        <div className="space-y-4">
          {formData.image_url ? (
            <div className="relative inline-block">
              <img
                src={formData.image_url}
                alt="Product preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm text-muted-foreground mb-2">
                Upload product image (Max 5MB)
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="max-w-xs mx-auto"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="unit_price">Unit Price *</Label>
          <Input
            id="unit_price"
            type="number"
            step="0.01"
            value={formData.unit_price}
            onChange={(e) => handleInputChange('unit_price', e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <Label htmlFor="selling_price">Selling Price *</Label>
          <Input
            id="selling_price"
            type="number"
            step="0.01"
            value={formData.selling_price}
            onChange={(e) => handleInputChange('selling_price', e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="stock_quantity">Stock Quantity</Label>
          <Input
            id="stock_quantity"
            type="number"
            value={formData.stock_quantity}
            onChange={(e) => handleInputChange('stock_quantity', e.target.value)}
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="minimum_stock">Minimum Stock</Label>
          <Input
            id="minimum_stock"
            type="number"
            value={formData.minimum_stock}
            onChange={(e) => handleInputChange('minimum_stock', e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="unit">Unit</Label>
          <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="piece">Piece</SelectItem>
              <SelectItem value="kg">Kilogram</SelectItem>
              <SelectItem value="liter">Liter</SelectItem>
              <SelectItem value="meter">Meter</SelectItem>
              <SelectItem value="box">Box</SelectItem>
              <SelectItem value="set">Set</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="hsn_code">HSN Code</Label>
          <Input
            id="hsn_code"
            value={formData.hsn_code}
            onChange={(e) => handleInputChange('hsn_code', e.target.value)}
            placeholder="Enter HSN code"
          />
        </div>
        <div>
          <Label htmlFor="gst_rate">GST Rate (%)</Label>
          <Input
            id="gst_rate"
            type="number"
            step="0.01"
            value={formData.gst_rate}
            onChange={(e) => handleInputChange('gst_rate', e.target.value)}
            placeholder="18.00"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="discontinued">Discontinued</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={createInventory.isPending || isUploading}>
          {createInventory.isPending ? "Adding..." : "Add Product"}
        </Button>
      </div>
    </form>
  );
};

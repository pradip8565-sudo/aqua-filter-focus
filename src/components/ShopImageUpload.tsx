
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Building2 } from "lucide-react";
import { toast } from "sonner";

interface ShopImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (imageUrl: string) => void;
  onImageRemoved: () => void;
}

export const ShopImageUpload = ({ currentImageUrl, onImageUploaded, onImageRemoved }: ShopImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, WebP, or GIF)");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5242880) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      // Create unique filename for shop image
      const fileExt = file.name.split('.').pop();
      const fileName = `shop-${Date.now()}.${fileExt}`;

      console.log('Uploading shop image:', fileName, 'Size:', file.size);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      console.log('Upload successful:', data);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path);

      console.log('Public URL:', publicUrl);

      setPreviewUrl(publicUrl);
      onImageUploaded(publicUrl);
      toast.success("Shop image uploaded successfully!");
    } catch (error) {
      console.error('Error uploading shop image:', error);
      toast.error("Failed to upload shop image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageRemoved();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="hidden"
          id="shop-image-upload"
        />
        <label htmlFor="shop-image-upload">
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="flex items-center gap-2 cursor-pointer"
            asChild
          >
            <span>
              <Upload className="h-4 w-4" />
              {uploading ? "Uploading..." : "Upload Shop Image"}
            </span>
          </Button>
        </label>
        {previewUrl && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemoveImage}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Remove
          </Button>
        )}
      </div>

      {previewUrl ? (
        <div className="relative w-full max-w-sm h-32 border rounded-lg overflow-hidden bg-gray-50">
          <img
            src={previewUrl}
            alt="Shop image"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full max-w-sm h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Building2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No shop image</p>
          </div>
        </div>
      )}
    </div>
  );
};


import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ProductSearch = ({ searchTerm, onSearchChange }: ProductSearchProps) => {
  return (
    <div className="max-w-md mx-auto mb-6 sm:mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};

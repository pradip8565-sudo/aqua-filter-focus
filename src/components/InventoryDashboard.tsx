
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Package, AlertTriangle } from "lucide-react";

export const InventoryDashboard = () => {
  const inventoryItems = [
    {
      id: "RO-001",
      name: "5-Stage RO System Complete",
      category: "Complete Systems",
      stock: 25,
      minimum: 10,
      price: "$180.00",
      supplier: "AquaTech Corp",
      status: "in-stock"
    },
    {
      id: "MEM-001",
      name: "75GPD RO Membrane",
      category: "Membranes",
      stock: 5,
      minimum: 10,
      price: "$25.00",
      supplier: "FilterPro Ltd",
      status: "low-stock"
    },
    {
      id: "FIL-001",
      name: "Sediment Pre-Filter 5 Micron",
      category: "Filters",
      stock: 45,
      minimum: 20,
      price: "$8.50",
      supplier: "Pure Water Inc",
      status: "in-stock"
    },
    {
      id: "FIL-002",
      name: "Carbon Block Filter",
      category: "Filters",
      stock: 12,
      minimum: 15,
      price: "$12.00",
      supplier: "FilterPro Ltd",
      status: "low-stock"
    },
    {
      id: "TANK-001",
      name: "3.2 Gallon Storage Tank",
      category: "Tanks",
      stock: 18,
      minimum: 8,
      price: "$35.00",
      supplier: "TankMax Co",
      status: "in-stock"
    },
    {
      id: "PUMP-001",
      name: "Booster Pump 50GPD",
      category: "Pumps",
      stock: 8,
      minimum: 5,
      price: "$65.00",
      supplier: "PumpTech Solutions",
      status: "in-stock"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock": return "bg-green-500/10 text-green-700 border-green-200";
      case "low-stock": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "out-of-stock": return "bg-red-500/10 text-red-700 border-red-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const categories = ["All", "Complete Systems", "Membranes", "Filters", "Tanks", "Pumps"];

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Inventory Management</h2>
          <p className="text-muted-foreground">Manage your RO filter products and stock levels</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name or ID..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Inventory
          </CardTitle>
          <CardDescription>Current stock levels and product information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.stock < item.minimum && (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      )}
                      <span>{item.stock} units</span>
                      <span className="text-sm text-muted-foreground">
                        (Min: {item.minimum})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.price}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Truck, Mail, Phone, Star } from "lucide-react";

export const SupplierManagement = () => {
  const suppliers = [
    {
      id: "SUP-001",
      name: "AquaTech Corp",
      email: "supply@aquatechcorp.com",
      phone: "+1 (800) 123-4567",
      products: ["RO Systems", "Membranes", "Filters"],
      rating: 4.8,
      orders: 45,
      totalSpent: "$125,000",
      status: "active",
      lastOrder: "2024-01-15",
      paymentTerm: "Net 30"
    },
    {
      id: "SUP-002",
      name: "FilterPro Ltd",
      email: "orders@filterpro.com",
      phone: "+1 (800) 234-5678",
      products: ["Membranes", "Carbon Filters"],
      rating: 4.5,
      orders: 32,
      totalSpent: "$89,500",
      status: "active",
      lastOrder: "2024-01-12",
      paymentTerm: "Net 15"
    },
    {
      id: "SUP-003",
      name: "Pure Water Inc",
      email: "sales@purewater.com",
      phone: "+1 (800) 345-6789",
      products: ["Pre-Filters", "Post-Filters"],
      rating: 4.2,
      orders: 28,
      totalSpent: "$67,800",
      status: "active",
      lastOrder: "2024-01-10",
      paymentTerm: "Net 30"
    },
    {
      id: "SUP-004",
      name: "TankMax Co",
      email: "info@tankmax.com",
      phone: "+1 (800) 456-7890",
      products: ["Storage Tanks", "Pressure Tanks"],
      rating: 4.6,
      orders: 18,
      totalSpent: "$45,200",
      status: "active",
      lastOrder: "2024-01-08",
      paymentTerm: "Net 45"
    },
    {
      id: "SUP-005",
      name: "PumpTech Solutions",
      email: "contact@pumptech.com",
      phone: "+1 (800) 567-8901",
      products: ["Booster Pumps", "Pressure Pumps"],
      rating: 4.4,
      orders: 15,
      totalSpent: "$38,900",
      status: "active",
      lastOrder: "2024-01-05",
      paymentTerm: "Net 30"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-700 border-green-200";
      case "inactive": return "bg-red-500/10 text-red-700 border-red-200";
      case "pending": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Supplier Management</h2>
          <p className="text-muted-foreground">Manage your supplier relationships and procurement</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers by name or product type..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="outline" size="sm">Active</Button>
              <Button variant="outline" size="sm">Top Rated</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Supplier Directory
          </CardTitle>
          <CardDescription>Your trusted suppliers and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier ID</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{supplier.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Last order: {supplier.lastOrder}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {supplier.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {supplier.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {supplier.products.map((product, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {renderStars(supplier.rating)}
                      <span className="text-sm ml-1">{supplier.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.orders}</TableCell>
                  <TableCell className="font-medium">{supplier.totalSpent}</TableCell>
                  <TableCell>{supplier.paymentTerm}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(supplier.status)}>
                      {supplier.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Order
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

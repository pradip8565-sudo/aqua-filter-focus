
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Users, Mail, Phone, MapPin } from "lucide-react";

export const CustomerManagement = () => {
  const customers = [
    {
      id: "CUST-001",
      name: "AquaTech Solutions",
      email: "contact@aquatech.com",
      phone: "+1 (555) 123-4567",
      address: "123 Water St, Miami, FL",
      totalOrders: 15,
      totalSpent: "$12,450",
      status: "active",
      lastOrder: "2024-01-15"
    },
    {
      id: "CUST-002",
      name: "Clean Water Co.",
      email: "orders@cleanwater.com",
      phone: "+1 (555) 234-5678",
      address: "456 Pure Ave, Orlando, FL",
      totalOrders: 8,
      totalSpent: "$8,920",
      status: "active",
      lastOrder: "2024-01-10"
    },
    {
      id: "CUST-003",
      name: "Pure H2O Systems",
      email: "info@pureh2o.com",
      phone: "+1 (555) 345-6789",
      address: "789 Filter Rd, Tampa, FL",
      totalOrders: 22,
      totalSpent: "$18,750",
      status: "vip",
      lastOrder: "2024-01-18"
    },
    {
      id: "CUST-004",
      name: "FilterMax Ltd.",
      email: "sales@filtermax.com",
      phone: "+1 (555) 456-7890",
      address: "321 RO Blvd, Jacksonville, FL",
      totalOrders: 5,
      totalSpent: "$4,200",
      status: "new",
      lastOrder: "2024-01-12"
    },
    {
      id: "CUST-005",
      name: "Hydro Solutions Inc.",
      email: "contact@hydrosolutions.com",
      phone: "+1 (555) 567-8901",
      address: "654 Water Way, Fort Lauderdale, FL",
      totalOrders: 12,
      totalSpent: "$9,800",
      status: "active",
      lastOrder: "2024-01-08"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip": return "bg-purple-500/10 text-purple-700 border-purple-200";
      case "active": return "bg-green-500/10 text-green-700 border-green-200";
      case "new": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "inactive": return "bg-red-500/10 text-red-700 border-red-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Customer Management</h2>
          <p className="text-muted-foreground">Manage your wholesale customers and relationships</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="outline" size="sm">VIP</Button>
              <Button variant="outline" size="sm">Active</Button>
              <Button variant="outline" size="sm">New</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customer Directory
          </CardTitle>
          <CardDescription>Complete list of your wholesale customers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Last order: {customer.lastOrder}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      {customer.address}
                    </div>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
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

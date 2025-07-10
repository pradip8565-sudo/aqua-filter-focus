
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, ShoppingCart, Eye, Truck } from "lucide-react";

export const OrderManagement = () => {
  const orders = [
    {
      id: "ORD-001",
      customer: "AquaTech Solutions",
      date: "2024-01-18",
      items: 5,
      total: "$2,450.00",
      status: "processing",
      priority: "high",
      estimatedDelivery: "2024-01-22"
    },
    {
      id: "ORD-002",
      customer: "Clean Water Co.",
      date: "2024-01-17",
      items: 3,
      total: "$1,890.00",
      status: "shipped",
      priority: "medium",
      estimatedDelivery: "2024-01-20"
    },
    {
      id: "ORD-003",
      customer: "Pure H2O Systems",
      date: "2024-01-16",
      items: 8,
      total: "$3,200.00",
      status: "delivered",
      priority: "high",
      estimatedDelivery: "2024-01-19"
    },
    {
      id: "ORD-004",
      customer: "FilterMax Ltd.",
      date: "2024-01-15",
      items: 2,
      total: "$950.00",
      status: "pending",
      priority: "low",
      estimatedDelivery: "2024-01-25"
    },
    {
      id: "ORD-005",
      customer: "Hydro Solutions Inc.",
      date: "2024-01-14",
      items: 6,
      total: "$2,180.00",
      status: "confirmed",
      priority: "medium",
      estimatedDelivery: "2024-01-21"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-500/10 text-green-700 border-green-200";
      case "shipped": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "processing": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "confirmed": return "bg-purple-500/10 text-purple-700 border-purple-200";
      case "pending": return "bg-red-500/10 text-red-700 border-red-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-700 border-red-200";
      case "medium": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-500/10 text-green-700 border-green-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Order Management</h2>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer, or date..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="outline" size="sm">Pending</Button>
              <Button variant="outline" size="sm">Processing</Button>
              <Button variant="outline" size="sm">Shipped</Button>
              <Button variant="outline" size="sm">Delivered</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order List
          </CardTitle>
          <CardDescription>All customer orders and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(order.priority)}>
                      {order.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{order.estimatedDelivery}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Truck className="h-3 w-3" />
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

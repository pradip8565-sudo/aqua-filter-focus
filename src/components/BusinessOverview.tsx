
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package, Users, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react";

export const BusinessOverview = () => {
  const businessMetrics = [
    {
      title: "Monthly Revenue",
      value: "$45,230",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Active Orders",
      value: "23",
      change: "+5",
      trend: "up",
      icon: ShoppingCart
    },
    {
      title: "Total Customers",
      value: "156",
      change: "+8",
      trend: "up",
      icon: Users
    },
    {
      title: "Inventory Items",
      value: "89",
      change: "-3",
      trend: "down",
      icon: Package
    }
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "AquaTech Solutions", amount: "$2,450", status: "processing" },
    { id: "ORD-002", customer: "Clean Water Co.", amount: "$1,890", status: "shipped" },
    { id: "ORD-003", customer: "Pure H2O Systems", amount: "$3,200", status: "delivered" },
    { id: "ORD-004", customer: "FilterMax Ltd.", amount: "$950", status: "pending" }
  ];

  const lowStockItems = [
    { name: "5-Stage RO Membrane", current: 5, minimum: 10 },
    { name: "Carbon Pre-Filter", current: 8, minimum: 15 },
    { name: "Sediment Filter", current: 12, minimum: 20 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-500/10 text-green-700 border-green-200";
      case "shipped": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "processing": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "pending": return "bg-red-500/10 text-red-700 border-red-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {businessMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className={`h-3 w-3 mr-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <metric.icon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.amount}</div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Low Stock Alert
            </CardTitle>
            <CardDescription>Items running low in inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded bg-yellow-50">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Current: {item.current} | Min: {item.minimum}
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                    Low Stock
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

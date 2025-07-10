
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

export const SalesAnalytics = () => {
  const salesMetrics = [
    {
      title: "Monthly Revenue",
      value: "$45,230",
      change: "+12.5%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Total Orders",
      value: "156",
      change: "+8.2%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Average Order Value",
      value: "$290",
      change: "+4.1%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Active Customers",
      value: "89",
      change: "-2.3%",
      trend: "down",
      period: "vs last month"
    }
  ];

  const topProducts = [
    { name: "5-Stage RO System Complete", sales: 45, revenue: "$8,100", growth: "+15%" },
    { name: "75GPD RO Membrane", sales: 128, revenue: "$3,200", growth: "+22%" },
    { name: "Sediment Pre-Filter 5 Micron", sales: 89, revenue: "$756", growth: "+8%" },
    { name: "3.2 Gallon Storage Tank", sales: 34, revenue: "$1,190", growth: "+12%" },
    { name: "Carbon Block Filter", sales: 67, revenue: "$804", growth: "+5%" }
  ];

  const topCustomers = [
    { name: "Pure H2O Systems", orders: 22, spent: "$18,750" },
    { name: "AquaTech Solutions", orders: 15, spent: "$12,450" },
    { name: "Hydro Solutions Inc.", orders: 12, spent: "$9,800" },
    { name: "Clean Water Co.", orders: 8, spent: "$8,920" },
    { name: "FilterMax Ltd.", orders: 5, spent: "$4,200" }
  ];

  const monthlyData = [
    { month: "Sep", revenue: 32000, orders: 124 },
    { month: "Oct", revenue: 38000, orders: 142 },
    { month: "Nov", revenue: 42000, orders: 158 },
    { month: "Dec", revenue: 45000, orders: 167 },
    { month: "Jan", revenue: 45230, orders: 156 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Sales Analytics</h2>
        <p className="text-muted-foreground">Track your business performance and growth</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                    )}
                    <span className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">{metric.period}</span>
                  </div>
                </div>
                <div className="h-8 w-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                  {index === 0 && <DollarSign className="h-4 w-4 text-blue-600" />}
                  {index === 1 && <ShoppingCart className="h-4 w-4 text-blue-600" />}
                  {index === 2 && <TrendingUp className="h-4 w-4 text-blue-600" />}
                  {index === 3 && <Users className="h-4 w-4 text-blue-600" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Top Selling Products
            </CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.sales} units sold
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{product.revenue}</div>
                    <Badge className="bg-green-500/10 text-green-700 border-green-200 text-xs">
                      {product.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Customers
            </CardTitle>
            <CardDescription>Highest value customers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium text-sm">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {customer.orders} orders
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{customer.spent}</div>
                    {index === 0 && (
                      <Badge className="bg-purple-500/10 text-purple-700 border-purple-200 text-xs">
                        VIP
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue and order volume over the last 5 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded">
                <div className="font-medium">{data.month} 2024</div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Revenue</div>
                    <div className="font-medium">${data.revenue.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Orders</div>
                    <div className="font-medium">{data.orders}</div>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(data.revenue / Math.max(...monthlyData.map(d => d.revenue))) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

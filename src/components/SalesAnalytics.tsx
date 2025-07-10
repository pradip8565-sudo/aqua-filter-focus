
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

export const SalesAnalytics = () => {
  const salesMetrics = [
    {
      title: "માસિક આવક",
      value: "₹45,230",
      change: "+12.5%",
      trend: "up",
      period: "પાછલા મહિને સરખામણીમાં"
    },
    {
      title: "કુલ ઓર્ડર",
      value: "156",
      change: "+8.2%",
      trend: "up",
      period: "પાછલા મહિને સરખામણીમાં"
    },
    {
      title: "સરેરાશ ઓર્ડર વેલ્યુ",
      value: "₹2,900",
      change: "+4.1%",
      trend: "up",
      period: "પાછલા મહિને સરખામણીમાં"
    },
    {
      title: "સક્રિય ગ્રાહકો",
      value: "89",
      change: "-2.3%",
      trend: "down",
      period: "પાછલા મહિને સરખામણીમાં"
    }
  ];

  const topProducts = [
    { name: "5-સ્ટેજ આરઓ સિસ્ટમ કમ્પ્લીટ", sales: 45, revenue: "₹81,000", growth: "+15%" },
    { name: "75GPD આરઓ મેમ્બ્રેન", sales: 128, revenue: "₹32,000", growth: "+22%" },
    { name: "સેડિમેન્ટ પ્રી-ફિલ્ટર 5 માઇક્રોન", sales: 89, revenue: "₹7,560", growth: "+8%" },
    { name: "3.2 ગેલન સ્ટોરેજ ટાંકી", sales: 34, revenue: "₹11,900", growth: "+12%" },
    { name: "કાર્બન બ્લોક ફિલ્ટર", sales: 67, revenue: "₹8,040", growth: "+5%" }
  ];

  const topCustomers = [
    { name: "પ્યુર H2O સિસ્ટમ્સ", orders: 22, spent: "₹1,87,500" },
    { name: "એક્વાટેક સોલ્યુશન્સ", orders: 15, spent: "₹1,24,500" },
    { name: "હાઇડ્રો સોલ્યુશન્સ ઇન્ક.", orders: 12, spent: "₹98,000" },
    { name: "ક્લીન વોટર કો.", orders: 8, spent: "₹89,200" },
    { name: "ફિલ્ટરમેક્સ લિમિટેડ", orders: 5, spent: "₹42,000" }
  ];

  const monthlyData = [
    { month: "સપ્ટે", revenue: 320000, orders: 124 },
    { month: "ઓક્ટો", revenue: 380000, orders: 142 },
    { month: "નવે", revenue: 420000, orders: 158 },
    { month: "ડિસે", revenue: 450000, orders: 167 },
    { month: "જાન્યુ", revenue: 452300, orders: 156 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">વેચાણ વિશ્લેષણ</h2>
        <p className="text-muted-foreground">તમારી બિઝનેસ પર્ફોર્મન્સ અને વૃદ્ધિને ટ્રેક કરો</p>
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
              સૌથી વધુ વેચાતા પ્રોડક્ટ્સ
            </CardTitle>
            <CardDescription>આ મહિને શ્રેષ્ઠ પર્ફોર્મિંગ પ્રોડક્ટ્સ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.sales} યુનિટ વેચાયા
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
              ટોપ ગ્રાહકો
            </CardTitle>
            <CardDescription>આ મહિને સૌથી વધુ વેલ્યુ ગ્રાહકો</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium text-sm">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {customer.orders} ઓર્ડર
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{customer.spent}</div>
                    {index === 0 && (
                      <Badge className="bg-purple-500/10 text-purple-700 border-purple-200 text-xs">
                        વીઆઈપી
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
          <CardTitle>આવકનો ટ્રેન્ડ</CardTitle>
          <CardDescription>છેલ્લા 5 મહિનામાં માસિક આવક અને ઓર્ડર વોલ્યુમ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded">
                <div className="font-medium">{data.month} 2024</div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">આવક</div>
                    <div className="font-medium">₹{data.revenue.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">ઓર્ડર</div>
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

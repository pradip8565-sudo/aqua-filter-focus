
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
      customer: "એક્વાટેક સોલ્યુશન્સ",
      date: "2024-01-18",
      items: 5,
      total: "₹24,500",
      status: "processing",
      priority: "high",
      estimatedDelivery: "2024-01-22"
    },
    {
      id: "ORD-002",
      customer: "ક્લીન વોટર કો.",
      date: "2024-01-17",
      items: 3,
      total: "₹18,900",
      status: "shipped",
      priority: "medium",
      estimatedDelivery: "2024-01-20"
    },
    {
      id: "ORD-003",
      customer: "પ્યુર H2O સિસ્ટમ્સ",
      date: "2024-01-16",
      items: 8,
      total: "₹32,000",
      status: "delivered",
      priority: "high",
      estimatedDelivery: "2024-01-19"
    },
    {
      id: "ORD-004",
      customer: "ફિલ્ટરમેક્સ લિમિટેડ",
      date: "2024-01-15",
      items: 2,
      total: "₹9,500",
      status: "pending",
      priority: "low",
      estimatedDelivery: "2024-01-25"
    },
    {
      id: "ORD-005",
      customer: "હાઇડ્રો સોલ્યુશન્સ ઇન્ક.",
      date: "2024-01-14",
      items: 6,
      total: "₹21,800",
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered": return "પહોંચાડેલ";
      case "shipped": return "મોકલાયેલ";
      case "processing": return "પ્રોસેસિંગ";
      case "confirmed": return "પુષ્ટિ";
      case "pending": return "બાકી";
      default: return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "ઉચ્ચ";
      case "medium": return "મધ્યમ";
      case "low": return "નીચું";
      default: return priority;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">ઓર્ડર મેનેજમેન્ટ</h2>
          <p className="text-muted-foreground">ગ્રાહક ઓર્ડરનું ટ્રેકિંગ અને સંચાલન કરો</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          નવો ઓર્ડર
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ID, ગ્રાહક અથવા તારીખ દ્વારા ઓર્ડર શોધો..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">બધા</Button>
              <Button variant="outline" size="sm">બાકી</Button>
              <Button variant="outline" size="sm">પ્રોસેસિંગ</Button>
              <Button variant="outline" size="sm">મોકલાયેલ</Button>
              <Button variant="outline" size="sm">પહોંચાડેલ</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            ઓર્ડર યાદી
          </CardTitle>
          <CardDescription>બધા ગ્રાહક ઓર્ડર અને તેમની વર્તમાન સ્થિતિ</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ઓર્ડર ID</TableHead>
                <TableHead>ગ્રાહક</TableHead>
                <TableHead>તારીખ</TableHead>
                <TableHead>આઇટમ</TableHead>
                <TableHead>કુલ</TableHead>
                <TableHead>પ્રાથમિકતા</TableHead>
                <TableHead>સ્થિતિ</TableHead>
                <TableHead>ડિલિવરી</TableHead>
                <TableHead>ક્રિયાઓ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items} આઇટમ</TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(order.priority)}>
                      {getPriorityText(order.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
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

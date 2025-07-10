
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
      name: "5-સ્ટેજ આરઓ સિસ્ટમ કમ્પ્લીટ",
      category: "કમ્પ્લીટ સિસ્ટમ્સ",
      stock: 25,
      minimum: 10,
      price: "₹18,000",
      supplier: "એક્વાટેક કોર્પ",
      status: "in-stock"
    },
    {
      id: "MEM-001",
      name: "75GPD આરઓ મેમ્બ્રેન",
      category: "મેમ્બ્રેન",
      stock: 5,
      minimum: 10,
      price: "₹2,500",
      supplier: "ફિલ્ટરપ્રો લિમિટેડ",
      status: "low-stock"
    },
    {
      id: "FIL-001",
      name: "સેડિમેન્ટ પ્રી-ફિલ્ટર 5 માઇક્રોન",
      category: "ફિલ્ટર",
      stock: 45,
      minimum: 20,
      price: "₹850",
      supplier: "પ્યુર વોટર ઇન્ક",
      status: "in-stock"
    },
    {
      id: "FIL-002",
      name: "કાર્બન બ્લોક ફિલ્ટર",
      category: "ફિલ્ટર",
      stock: 12,
      minimum: 15,
      price: "₹1,200",
      supplier: "ફિલ્ટરપ્રો લિમિટેડ",
      status: "low-stock"
    },
    {
      id: "TANK-001",
      name: "3.2 ગેલન સ્ટોરેજ ટાંકી",
      category: "ટાંકી",
      stock: 18,
      minimum: 8,
      price: "₹3,500",
      supplier: "ટાંકમેક્સ કો",
      status: "in-stock"
    },
    {
      id: "PUMP-001",
      name: "બૂસ્ટર પંપ 50GPD",
      category: "પંપ",
      stock: 8,
      minimum: 5,
      price: "₹6,500",
      supplier: "પંપટેક સોલ્યુશન્સ",
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-stock": return "સ્ટોકમાં";
      case "low-stock": return "ઓછો સ્ટોક";
      case "out-of-stock": return "સ્ટોક આઉટ";
      default: return status;
    }
  };

  const categories = ["બધા", "કમ્પ્લીટ સિસ્ટમ્સ", "મેમ્બ્રેન", "ફિલ્ટર", "ટાંકી", "પંપ"];

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">ઇન્વેન્ટરી મેનેજમેન્ટ</h2>
          <p className="text-muted-foreground">તમારા આરઓ ફિલ્ટર પ્રોડક્ટ્સ અને સ્ટોક લેવલનું સંચાલન કરો</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          પ્રોડક્ટ ઉમેરો
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="નામ અથવા ID દ્વારા પ્રોડક્ટ્સ શોધો..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={index === 0 ? "default" : "outline"}
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
            પ્રોડક્ટ ઇન્વેન્ટરી
          </CardTitle>
          <CardDescription>વર્તમાન સ્ટોક લેવલ અને પ્રોડક્ટની માહિતી</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>પ્રોડક્ટ ID</TableHead>
                <TableHead>પ્રોડક્ટનું નામ</TableHead>
                <TableHead>કેટેગરી</TableHead>
                <TableHead>સ્ટોક</TableHead>
                <TableHead>યુનિટ કિંમત</TableHead>
                <TableHead>સપ્લાયર</TableHead>
                <TableHead>સ્થિતિ</TableHead>
                <TableHead>ક્રિયાઓ</TableHead>
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
                      <span>{item.stock} યુનિટ</span>
                      <span className="text-sm text-muted-foreground">
                        (લઘુત્તમ: {item.minimum})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.price}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        સંપાદિત કરો
                      </Button>
                      <Button variant="outline" size="sm">
                        રિઓર્ડર
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

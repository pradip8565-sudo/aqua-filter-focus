
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
      name: "એક્વાટેક કોર્પ",
      email: "supply@aquatechcorp.com",
      phone: "+91 99999 00001",
      products: ["આરઓ સિસ્ટમ્સ", "મેમ્બ્રેન", "ફિલ્ટર"],
      rating: 4.8,
      orders: 45,
      totalSpent: "₹12,50,000",
      status: "active",
      lastOrder: "2024-01-15",
      paymentTerm: "30 દિવસ"
    },
    {
      id: "SUP-002",
      name: "ફિલ્ટરપ્રો લિમિટેડ",
      email: "orders@filterpro.com",
      phone: "+91 88888 00002",
      products: ["મેમ્બ્રેન", "કાર્બન ફિલ્ટર"],
      rating: 4.5,
      orders: 32,
      totalSpent: "₹8,95,000",
      status: "active",
      lastOrder: "2024-01-12",
      paymentTerm: "15 દિવસ"
    },
    {
      id: "SUP-003",
      name: "પ્યુર વોટર ઇન્ક",
      email: "sales@purewater.com",
      phone: "+91 77777 00003",
      products: ["પ્રી-ફિલ્ટર", "પોસ્ટ-ફિલ્ટર"],
      rating: 4.2,
      orders: 28,
      totalSpent: "₹6,78,000",
      status: "active",
      lastOrder: "2024-01-10",
      paymentTerm: "30 દિવસ"
    },
    {
      id: "SUP-004",
      name: "ટાંકમેક્સ કો",
      email: "info@tankmax.com",
      phone: "+91 66666 00004",
      products: ["સ્ટોરેજ ટાંકી", "પ્રેશર ટાંકી"],
      rating: 4.6,
      orders: 18,
      totalSpent: "₹4,52,000",
      status: "active",
      lastOrder: "2024-01-08",
      paymentTerm: "45 દિવસ"
    },
    {
      id: "SUP-005",
      name: "પંપટેક સોલ્યુશન્સ",
      email: "contact@pumptech.com",
      phone: "+91 55555 00005",
      products: ["બૂસ્ટર પંપ", "પ્રેશર પંપ"],
      rating: 4.4,
      orders: 15,
      totalSpent: "₹3,89,000",
      status: "active",
      lastOrder: "2024-01-05",
      paymentTerm: "30 દિવસ"
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "સક્રિય";
      case "inactive": return "નિષ્ક્રિય";
      case "pending": return "બાકી";
      default: return status;
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
          <h2 className="text-2xl font-bold text-foreground">સપ્લાયર મેનેજમેન્ટ</h2>
          <p className="text-muted-foreground">તમારા સપ્લાયર સંબંધો અને પ્રોક્યોરમેન્ટનું સંચાલન કરો</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          સપ્લાયર ઉમેરો
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="નામ અથવા પ્રોડક્ટ પ્રકાર દ્વારા સપ્લાયર શોધો..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">બધા</Button>
              <Button variant="outline" size="sm">સક્રિય</Button>
              <Button variant="outline" size="sm">ટોપ રેટેડ</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            સપ્લાયર ડિરેક્ટરી
          </CardTitle>
          <CardDescription>તમારા વિશ્વસનીય સપ્લાયર અને તેમની કામગીરી</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>સપ્લાયર ID</TableHead>
                <TableHead>કંપનીનું નામ</TableHead>
                <TableHead>સંપર્ક માહિતી</TableHead>
                <TableHead>પ્રોડક્ટ્સ</TableHead>
                <TableHead>રેટિંગ</TableHead>
                <TableHead>ઓર્ડર</TableHead>
                <TableHead>કુલ ખર્ચ</TableHead>
                <TableHead>પેમેન્ટ ટર્મ</TableHead>
                <TableHead>સ્થિતિ</TableHead>
                <TableHead>ક્રિયાઓ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{supplier.name}</div>
                    <div className="text-sm text-muted-foreground">
                      છેલ્લો ઓર્ડર: {supplier.lastOrder}
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
                      {getStatusText(supplier.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        જુઓ
                      </Button>
                      <Button variant="outline" size="sm">
                        ઓર્ડર
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

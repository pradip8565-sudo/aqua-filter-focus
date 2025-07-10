
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
      name: "એક્વાટેક સોલ્યુશન્સ",
      email: "contact@aquatech.com",
      phone: "+91 98765 43210",
      address: "123 વોટર સ્ટ્રીટ, અમદાવાદ, ગુજરાત",
      totalOrders: 15,
      totalSpent: "₹1,24,500",
      status: "active",
      lastOrder: "2024-01-15"
    },
    {
      id: "CUST-002",
      name: "ક્લીન વોટર કો.",
      email: "orders@cleanwater.com",
      phone: "+91 87654 32109",
      address: "456 પ્યુર એવન્યુ, સુરત, ગુજરાત",
      totalOrders: 8,
      totalSpent: "₹89,200",
      status: "active",
      lastOrder: "2024-01-10"
    },
    {
      id: "CUST-003",
      name: "પ્યુર H2O સિસ્ટમ્સ",
      email: "info@pureh2o.com",
      phone: "+91 76543 21098",
      address: "789 ફિલ્ટર રોડ, વડોદરા, ગુજરાત",
      totalOrders: 22,
      totalSpent: "₹1,87,500",
      status: "vip",
      lastOrder: "2024-01-18"
    },
    {
      id: "CUST-004",
      name: "ફિલ્ટરમેક્સ લિમિટેડ",
      email: "sales@filtermax.com",
      phone: "+91 65432 10987",
      address: "321 આરઓ બુલેવાર્ડ, રાજકોટ, ગુજરાત",
      totalOrders: 5,
      totalSpent: "₹42,000",
      status: "new",
      lastOrder: "2024-01-12"
    },
    {
      id: "CUST-005",
      name: "હાઇડ્રો સોલ્યુશન્સ ઇન્ક.",
      email: "contact@hydrosolutions.com",
      phone: "+91 54321 09876",
      address: "654 વોટર વે, ભાવનગર, ગુજરાત",
      totalOrders: 12,
      totalSpent: "₹98,000",
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "vip": return "વીઆઈપી";
      case "active": return "સક્રિય";
      case "new": return "નવા";
      case "inactive": return "નિષ્ક્રિય";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">ગ્રાહક મેનેજમેન્ટ</h2>
          <p className="text-muted-foreground">તમારા હોલસેલ ગ્રાહકો અને સંબંધોનું સંચાલન કરો</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          ગ્રાહક ઉમેરો
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="નામ, ઇમેઇલ અથવા ફોન દ્વારા ગ્રાહકો શોધો..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">બધા</Button>
              <Button variant="outline" size="sm">વીઆઈપી</Button>
              <Button variant="outline" size="sm">સક્રિય</Button>
              <Button variant="outline" size="sm">નવા</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            ગ્રાહક ડિરેક્ટરી
          </CardTitle>
          <CardDescription>તમારા હોલસેલ ગ્રાહકોની સંપૂર્ણ યાદી</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ગ્રાહક ID</TableHead>
                <TableHead>કંપનીનું નામ</TableHead>
                <TableHead>સંપર્ક માહિતી</TableHead>
                <TableHead>સરનામું</TableHead>
                <TableHead>ઓર્ડર</TableHead>
                <TableHead>કુલ ખર્ચ</TableHead>
                <TableHead>સ્થિતિ</TableHead>
                <TableHead>ક્રિયાઓ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      છેલ્લો ઓર્ડર: {customer.lastOrder}
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
                      {getStatusText(customer.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        જુઓ
                      </Button>
                      <Button variant="outline" size="sm">
                        સંપાદિત કરો
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

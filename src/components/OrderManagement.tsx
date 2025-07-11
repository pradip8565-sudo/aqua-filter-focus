import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, Edit, Trash2, Package, Minus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  status: string;
  priority: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  payment_status: string;
  payment_method?: string;
  notes?: string;
  shipping_address?: string;
  estimated_delivery_date?: string;
  created_at: string;
  customers?: { name: string; email: string };
}

interface Product {
  id: string;
  product_id: string;
  name: string;
  selling_price: number;
  stock_quantity: number;
  unit: string;
}

interface OrderItem {
  inventory_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<OrderItem[]>([]);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      customer_id: "",
      status: "pending",
      priority: "medium",
      payment_status: "pending",
      payment_method: "",
      notes: "",
      shipping_address: "",
      estimated_delivery_date: "",
      discount_amount: 0
    }
  });

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('orders')
        .select(`
          *,
          customers (name, email)
        `)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`order_number.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Order[];
    }
  });

  const { data: customers } = useQuery({
    queryKey: ['customers-list'],
    queryFn: async () => {
      const { data, error } = await supabase.from('customers').select('id, name, email');
      if (error) throw error;
      return data;
    }
  });

  const { data: products } = useQuery({
    queryKey: ['products-list', productSearchTerm],
    queryFn: async () => {
      let query = supabase
        .from('inventory')
        .select('id, product_id, name, selling_price, stock_quantity, unit')
        .eq('status', 'active')
        .gt('stock_quantity', 0);

      if (productSearchTerm) {
        query = query.or(`name.ilike.%${productSearchTerm}%,product_id.ilike.%${productSearchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Product[];
    }
  });

  const addMutation = useMutation({
    mutationFn: async (data: any) => {
      // Generate order number
      const orderNumber = `ORD-${Date.now()}`;
      
      // Calculate totals
      const subtotal = selectedProducts.reduce((sum, item) => sum + item.total_price, 0);
      const taxAmount = subtotal * 0.18; // 18% GST
      const discountAmount = data.discount_amount || 0;
      const totalAmount = subtotal + taxAmount - discountAmount;
      
      const orderData = { 
        ...data, 
        order_number: orderNumber,
        subtotal,
        tax_amount: taxAmount,
        discount_amount: discountAmount,
        total_amount: totalAmount
      };
      
      // Insert order
      const { data: orderResult, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();
      
      if (orderError) throw orderError;

      // Insert order items
      if (selectedProducts.length > 0) {
        const orderItems = selectedProducts.map(item => ({
          order_id: orderResult.id,
          inventory_id: item.inventory_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);
          
        if (itemsError) throw itemsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setIsAddDialogOpen(false);
      setSelectedProducts([]);
      form.reset();
      toast.success("Order created successfully!");
    },
    onError: () => {
      toast.error("Failed to create order");
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from('orders').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setEditingOrder(null);
      form.reset();
      toast.success("Order updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update order");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('orders').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success("Order deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete order");
    }
  });

  const addProductToOrder = (product: Product) => {
    const existingItem = selectedProducts.find(item => item.inventory_id === product.id);
    
    if (existingItem) {
      // Increase quantity if product already selected
      setSelectedProducts(prev => prev.map(item => 
        item.inventory_id === product.id 
          ? { ...item, quantity: item.quantity + 1, total_price: (item.quantity + 1) * item.unit_price }
          : item
      ));
    } else {
      // Add new product
      const newItem: OrderItem = {
        inventory_id: product.id,
        product_name: product.name,
        quantity: 1,
        unit_price: product.selling_price,
        total_price: product.selling_price
      };
      setSelectedProducts(prev => [...prev, newItem]);
    }
  };

  const updateProductQuantity = (inventoryId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProductFromOrder(inventoryId);
      return;
    }
    
    setSelectedProducts(prev => prev.map(item => 
      item.inventory_id === inventoryId 
        ? { ...item, quantity, total_price: quantity * item.unit_price }
        : item
    ));
  };

  const removeProductFromOrder = (inventoryId: string) => {
    setSelectedProducts(prev => prev.filter(item => item.inventory_id !== inventoryId));
  };

  const onSubmit = (data: any) => {
    if (editingOrder) {
      updateMutation.mutate({ id: editingOrder.id, data });
    } else {
      if (selectedProducts.length === 0) {
        toast.error("Please add at least one product to the order");
        return;
      }
      addMutation.mutate(data);
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    form.reset({
      customer_id: order.customer_id,
      status: order.status,
      priority: order.priority,
      payment_status: order.payment_status,
      payment_method: order.payment_method || "",
      notes: order.notes || "",
      shipping_address: order.shipping_address || "",
      estimated_delivery_date: order.estimated_delivery_date || "",
      discount_amount: order.discount_amount
    });
  };

  const resetForm = () => {
    setIsAddDialogOpen(false);
    setEditingOrder(null);
    setSelectedProducts([]);
    setProductSearchTerm("");
    form.reset();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateOrderSummary = () => {
    const subtotal = selectedProducts.reduce((sum, item) => sum + item.total_price, 0);
    const taxAmount = subtotal * 0.18;
    const discountAmount = form.watch('discount_amount') || 0;
    const totalAmount = subtotal + taxAmount - discountAmount;
    
    return { subtotal, taxAmount, discountAmount, totalAmount };
  };

  const orderSummary = calculateOrderSummary();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Manage customer orders and track delivery status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Dialog open={isAddDialogOpen || !!editingOrder} onOpenChange={(open) => {
              if (!open) {
                resetForm();
              }
            }}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Order
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingOrder ? 'Edit Order' : 'Create New Order'}</DialogTitle>
                  <DialogDescription>
                    {editingOrder ? 'Update order information' : 'Enter order details and select products'}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column - Order Details */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Order Information</h3>
                        
                        <FormField
                          control={form.control}
                          name="customer_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Customer</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select customer" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {customers?.map((customer) => (
                                    <SelectItem key={customer.id} value={customer.id}>
                                      {customer.name} ({customer.email})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="payment_status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Payment Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="partial">Partial</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="overdue">Overdue</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="payment_method"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="e.g., Cash, Card, UPI" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="estimated_delivery_date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated Delivery Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="shipping_address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Shipping Address</FormLabel>
                              <FormControl>
                                <Textarea {...field} placeholder="Enter shipping address" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notes</FormLabel>
                              <FormControl>
                                <Textarea {...field} placeholder="Order notes or special instructions" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Right Column - Product Selection */}
                      {!editingOrder && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Select Products</h3>
                          
                          {/* Product Search */}
                          <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search products..."
                              value={productSearchTerm}
                              onChange={(e) => setProductSearchTerm(e.target.value)}
                              className="pl-10"
                            />
                          </div>

                          {/* Available Products */}
                          <div className="border rounded-lg max-h-60 overflow-y-auto">
                            {products?.map((product) => (
                              <div key={product.id} className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50">
                                <div className="flex-1">
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-sm text-gray-500">
                                    ID: {product.product_id} • Stock: {product.stock_quantity} {product.unit}
                                  </div>
                                  <div className="text-sm font-medium text-green-600">
                                    ₹{product.selling_price.toLocaleString('en-IN')}
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => addProductToOrder(product)}
                                  disabled={product.stock_quantity <= 0}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          {/* Selected Products */}
                          {selectedProducts.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-medium">Selected Products</h4>
                              <div className="border rounded-lg max-h-40 overflow-y-auto">
                                {selectedProducts.map((item) => (
                                  <div key={item.inventory_id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                                    <div className="flex-1">
                                      <div className="font-medium text-sm">{item.product_name}</div>
                                      <div className="text-xs text-gray-500">
                                        ₹{item.unit_price.toLocaleString('en-IN')} each
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateProductQuantity(item.inventory_id, item.quantity - 1)}
                                      >
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateProductQuantity(item.inventory_id, item.quantity + 1)}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => removeProductFromOrder(item.inventory_id)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Order Summary */}
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <h4 className="font-medium">Order Summary</h4>
                                <div className="flex justify-between text-sm">
                                  <span>Subtotal:</span>
                                  <span>₹{orderSummary.subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Tax (18%):</span>
                                  <span>₹{orderSummary.taxAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Discount:</span>
                                  <FormField
                                    control={form.control}
                                    name="discount_amount"
                                    render={({ field }) => (
                                      <Input
                                        type="number"
                                        step="0.01"
                                        className="w-24 h-8 text-sm"
                                        placeholder="0"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                      />
                                    )}
                                  />
                                </div>
                                <div className="flex justify-between font-medium text-lg border-t pt-2">
                                  <span>Total:</span>
                                  <span>₹{orderSummary.totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <DialogFooter>
                      <Button 
                        type="submit" 
                        disabled={addMutation.isPending || updateMutation.isPending}
                        className="w-full sm:w-auto"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {editingOrder ? 'Update Order' : 'Create Order'}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : orders?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">No orders found</TableCell>
                  </TableRow>
                ) : (
                  orders?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          {order.order_number}
                        </div>
                      </TableCell>
                      <TableCell>{order.customers?.name || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentStatusColor(order.payment_status)}>
                          {order.payment_status}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{order.total_amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell>{format(new Date(order.created_at), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(order)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteMutation.mutate(order.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

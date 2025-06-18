
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Package, Calendar, MapPin, Phone, Mail, User, Trash2, Edit, Eye } from 'lucide-react';
import { RootState } from '@/store/store';
import { updateOrderStatus } from '@/store/slices/ordersSlice';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/Navbar';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { orders } = useSelector((state: RootState) => state.orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'ממתין לאישור';
      case 'confirmed': return 'אושר';
      case 'delivered': return 'נמסר';
      default: return 'לא ידוע';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: 'pending' | 'confirmed' | 'delivered') => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
    toast({
      title: "סטטוס עודכן",
      description: `סטטוס ההזמנה עודכן ל: ${getStatusText(newStatus)}`,
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ניהול הזמנות</h1>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">סך הכל הזמנות</p>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ממתינות לאישור</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">הזמנות שנמסרו</p>
                    <p className="text-2xl font-bold text-green-600">{deliveredOrders}</p>
                  </div>
                  <Package className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">סך הכנסות</p>
                    <p className="text-2xl font-bold text-emerald-600">₪{totalRevenue.toLocaleString()}</p>
                  </div>
                  <Package className="w-8 h-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="חפש לפי שם לקוח, אימייל או מספר הזמנה..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="סנן לפי סטטוס" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הסטטוסים</SelectItem>
                <SelectItem value="pending">ממתין לאישור</SelectItem>
                <SelectItem value="confirmed">אושר</SelectItem>
                <SelectItem value="delivered">נמסר</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold">הזמנה #{order.id.slice(-6)}</h3>
                      <Badge className={`${getStatusColor(order.status)} text-white`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{order.customerInfo.fullName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{order.customerInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{order.customerInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{order.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(order.orderDate).toLocaleDateString('he-IL')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span className="font-semibold">₪{order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                          <Eye className="w-4 h-4 mr-2" />
                          צפה
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>פרטי הזמנה #{selectedOrder?.id.slice(-6)}</DialogTitle>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">פרטי לקוח</h4>
                                <p><strong>שם:</strong> {selectedOrder.customerInfo.fullName}</p>
                                <p><strong>אימייל:</strong> {selectedOrder.customerInfo.email}</p>
                                <p><strong>טלפון:</strong> {selectedOrder.customerInfo.phone}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">פרטי הזמנה</h4>
                                <p><strong>תאריך הזמנה:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString('he-IL')}</p>
                                <p><strong>תאריך מסירה:</strong> {new Date(selectedOrder.deliveryDate).toLocaleDateString('he-IL')}</p>
                                <p><strong>כתובת מסירה:</strong> {selectedOrder.deliveryAddress}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">פריטים בהזמנה</h4>
                              <div className="space-y-2">
                                {selectedOrder.items.map((item: any) => (
                                  <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <span>{item.name}</span>
                                    <span>₪{item.price.toLocaleString()} × {item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 text-right">
                                <strong>סה"כ: ₪{selectedOrder.totalAmount.toLocaleString()}</strong>
                              </div>
                            </div>
                            
                            {selectedOrder.notes && (
                              <div>
                                <h4 className="font-semibold mb-2">הערות</h4>
                                <p className="text-gray-700">{selectedOrder.notes}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Select value={order.status} onValueChange={(value: 'pending' | 'confirmed' | 'delivered') => handleStatusUpdate(order.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">ממתין</SelectItem>
                        <SelectItem value="confirmed">אושר</SelectItem>
                        <SelectItem value="delivered">נמסר</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">אין הזמנות</h3>
              <p className="text-gray-600">לא נמצאו הזמנות המתאימות לחיפוש שלך.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;

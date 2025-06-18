
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { addOrder } from '@/store/slices/ordersSlice';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/store/store';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getTotalPrice, clearCart } = useCart();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert CartItem to OrderItem format
    const orderItems = items.map(item => ({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const newOrder = {
      id: Date.now().toString(),
      userId: currentUser?.id || '',
      items: orderItems,
      totalAmount: getTotalPrice(),
      orderDate: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryAddress: formData.address,
      status: 'pending' as const,
      customerInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone
      },
      notes: formData.notes
    };

    dispatch(addOrder(newOrder));
    clearCart();
    
    toast({
      title: "הזמנה בוצעה בהצלחה! 🎉",
      description: "ההזמנה שלך התקבלה ונשלחה לעיבוד",
    });

    navigate('/my-orders');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          סיום הזמנה
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">פרטי הזמנה</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">שם מלא</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">אימייל</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">טלפון</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">כתובת משלוח</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="notes">הערות (אופציונלי)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="הערות מיוחדות להזמנה..."
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                אשר הזמנה
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">סיכום הזמנה</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">כמות: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₪{item.price * item.quantity}</p>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>סה״כ לתשלום:</span>
                  <span>₪{getTotalPrice()}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>זמן משלוח:</strong> 7-10 ימי עסקים
                </p>
                <p className="text-sm text-blue-700">
                  <strong>משלוח:</strong> חינם להזמנות מעל ₪200
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;

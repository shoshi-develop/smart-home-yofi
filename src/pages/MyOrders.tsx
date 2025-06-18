
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, CreditCard } from 'lucide-react';
import { RootState } from '@/store/store';

const MyOrders = () => {
  const { currentUser, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const orders = useSelector((state: RootState) => state.orders.orders);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            יש להתחבר כדי לצפות בהזמנות
          </h1>
          <Link to="/login">
            <Button>התחבר</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const userOrders = orders.filter(order => order.userId === currentUser?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Package className="w-8 h-8 text-blue-600 ml-3" />
          <h1 className="text-4xl font-bold text-gray-900">ההזמנות שלי</h1>
        </div>

        {userOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              אין לך הזמנות עדיין
            </h2>
            <p className="text-gray-600 mb-8">
              כשתבצע הזמנות, הן יופיעו כאן
            </p>
            <Link to="/products">
              <Button>התחל לקנות</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      הזמנה #{order.id}
                    </h3>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 ml-1" />
                        {new Date(order.orderDate).toLocaleDateString('he-IL')}
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 ml-1" />
                        ₪{order.totalAmount}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    className={
                      order.status === 'completed' ? 'bg-green-500' :
                      order.status === 'pending' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }
                  >
                    {order.status === 'completed' ? 'הושלמה' :
                     order.status === 'pending' ? 'בהמתנה' :
                     'בעיבוד'}
                  </Badge>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">פריטים בהזמנה:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>₪{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.deliveryAddress && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">כתובת משלוח:</h4>
                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;

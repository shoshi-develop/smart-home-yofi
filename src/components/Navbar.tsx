
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Menu, X, Home, Package, BookOpen, Settings, LogIn, LogOut, User, FileText, Plus, Users, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isLoggedIn, isAdmin } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items.length);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  // Admin navigation
  const adminNavigation = [
    { name: 'רשימת מוצרים', href: '/products', icon: Package },
    { name: 'הוספת מוצר', href: '/add-product', icon: Plus },
    { name: 'הזמנות', href: '/orders', icon: ShoppingBag },
    { name: 'משתמשים', href: '/users', icon: Users },
    { name: 'פוסטים', href: '/posts', icon: FileText },
  ];

  // User navigation
  const userNavigation = [
    { name: 'רשימת מוצרים', href: '/products', icon: Package },
    { name: 'ההזמנות שלי', href: '/my-orders', icon: ShoppingBag },
    { name: 'סל קניות', href: '/cart', icon: ShoppingCart },
    { name: 'פוסטים', href: '/posts', icon: FileText },
  ];

  // Guest navigation
  const guestNavigation = [
    { name: 'בית', href: '/', icon: Home },
    { name: 'מוצרים', href: '/products', icon: Package },
    { name: 'מדריכים', href: '/guides', icon: BookOpen },
    { name: 'התאמה אישית', href: '/custom-service', icon: Settings },
    { name: 'פוסטים', href: '/posts', icon: FileText },
  ];

  const navigation = isLoggedIn ? (isAdmin ? adminNavigation : userNavigation) : guestNavigation;
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              בית חכם פלוס
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {isLoggedIn && !isAdmin && (
              <Button variant="outline" size="sm" className="relative" asChild>
                <Link to="/cart">
                  <ShoppingCart className="w-4 h-4" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600">
                      {cartItems}
                    </Badge>
                  )}
                </Link>
              </Button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user?.fullName}</span>
                  {isAdmin && (
                    <Badge variant="destructive" className="text-xs">מנהל</Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  <span className="mr-2">יציאה</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="w-4 h-4" />
                    <span className="mr-2">כניסה</span>
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">הרשמה</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {!isLoggedIn && (
                <div className="pt-4 border-t space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>כניסה</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>הרשמה</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

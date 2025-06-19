
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
    toast({
      title: "הוסר מרשימת המשאלות",
      description: "המוצר הוסר בהצלחה",
    });
  };

  const handleAddToCart = (product: any) => {
    // This would normally add to cart
    toast({
      title: "נוסף לסל",
      description: `${product.name} נוסף לסל הקניות`,
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">רשימת המשאלות שלי</h1>
            <p className="text-gray-600 mb-6">אנא התחבר כדי לצפות ברשימת המשאלות שלך</p>
            <Button asChild>
              <Link to="/login">התחבר</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-4xl font-bold text-gray-900">רשימת המשאלות שלי</h1>
          <Badge className="bg-red-100 text-red-800">
            {items.length} מוצרים
          </Badge>
        </div>

        {items.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              רשימת המשאלות ריקה
            </h2>
            <p className="text-gray-600 mb-6">
              עדיין לא הוספת מוצרים לרשימת המשאלות שלך
            </p>
            <Button asChild>
              <Link to="/products">עבור לקטלוג המוצרים</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-white/80"
                    onClick={() => handleRemove(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ₪{product.price.toLocaleString()}
                    </span>
                    <Badge variant={product.inStock ? "default" : "secondary"}>
                      {product.inStock ? "זמין" : "אזל מהמלאי"}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="flex-1"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      הוסף לסל
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemove(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;

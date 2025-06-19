
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const products = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch(addToCart({ product, quantity: 1 }));
      toast({
        title: "נוסף לסל הקניות",
        description: `${product.name} נוסף לסל הקניות`,
      });
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
    toast({
      title: "הוסר מרשימת המשאלות",
      description: "המוצר הוסר מרשימת המשאלות שלך",
    });
  };

  const wishlistProducts = items.map(item => {
    const product = products.find(p => p.id === item.id);
    return product ? { ...product, addedAt: item.addedAt } : null;
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            רשימת המשאלות שלי
          </h1>
          <p className="text-gray-600">
            כל המוצרים שחיבבת ושמרת לעתיד
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              רשימת המשאלות שלך ריקה
            </h2>
            <p className="text-gray-500 mb-8">
              התחל לחקור את המוצרים שלנו והוסף את מה שמעניין אותך
            </p>
            <Button asChild>
              <Link to="/products">
                <Plus className="w-4 h-4 mr-2" />
                עיין במוצרים
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <Card key={product?.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={product?.image || '/placeholder.svg'}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
                    onClick={() => handleRemoveFromWishlist(product?.id || '')}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product?.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ₪{product?.price}
                    </span>
                    <Badge variant={product?.inStock ? 'default' : 'secondary'}>
                      {product?.inStock ? 'במלאי' : 'אזל מהמלאי'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product?.description}
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product?.id || '')}
                    disabled={!product?.inStock}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {product?.inStock ? 'הוסף לסל' : 'אזל מהמלאי'}
                  </Button>
                </CardContent>
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

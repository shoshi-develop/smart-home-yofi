
import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Filter } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';

interface ProductGridProps {
  selectedCategory: string;
  priceRange: number[];
}

export const ProductGrid = ({ selectedCategory, priceRange }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState('popular');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const allProducts = [
    {
      id: 1,
      name: 'מצלמת אבטחה חכמה Pro',
      category: 'security',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      badge: 'פופולרי',
      badgeColor: 'bg-red-500',
      inStock: true
    },
    {
      id: 2,
      name: 'נורה חכמה RGB',
      category: 'lighting',
      price: 89,
      originalPrice: 129,
      rating: 4.9,
      reviews: 243,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      badge: 'חדש',
      badgeColor: 'bg-green-500',
      inStock: true
    },
    {
      id: 3,
      name: 'תרמוסטט חכם WiFi',
      category: 'climate',
      price: 199,
      originalPrice: 249,
      rating: 4.6,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      badge: 'חיסכון',
      badgeColor: 'bg-blue-500',
      inStock: true
    },
    {
      id: 4,
      name: 'חיישן תנועה חכם',
      category: 'security',
      price: 79,
      originalPrice: 99,
      rating: 4.5,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      badge: 'מבצע',
      badgeColor: 'bg-orange-500',
      inStock: false
    },
    {
      id: 5,
      name: 'רמקול חכם Amazon Echo',
      category: 'audio',
      price: 159,
      originalPrice: null,
      rating: 4.7,
      reviews: 201,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      badge: null,
      badgeColor: '',
      inStock: true
    },
    {
      id: 6,
      name: 'מתג תאורה חכם',
      category: 'lighting',
      price: 45,
      originalPrice: 59,
      rating: 4.4,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      badge: 'בסיסי',
      badgeColor: 'bg-gray-500',
      inStock: true
    }
  ];

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products = products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products = products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products = products.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        products = products.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return products;
  }, [selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "הוספת מוצר לעגלה",
      description: `${product.name} נוסף לעגלה בהצלחה!`,
    });
  };

  const toggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "הוסר מרשימת המשאלות",
        description: `${product.name} הוסר מרשימת המשאלות`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "נוסף לרשימת המשאלות",
        description: `${product.name} נוסף לרשימת המשאלות`,
      });
    }
  };

  return (
    <div>
      {/* Sort and Filter Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600">
            נמצאו {filteredProducts.length} מוצרים
          </span>
        </div>
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="popular">הכי פופולריים</option>
          <option value="rating">דירוג הגבוה ביותר</option>
          <option value="price-low">מחיר: נמוך לגבוה</option>
          <option value="price-high">מחיר: גבוה לנמוך</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {product.badge && (
                <Badge className={`absolute top-2 right-2 ${product.badgeColor} text-white`}>
                  {product.badge}
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
                    אזל מהמלאי
                  </span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className={`absolute top-2 left-2 w-8 h-8 rounded-full p-0 bg-white/80 hover:bg-white ${
                  isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'
                }`}
                onClick={() => toggleWishlist(product)}
              >
                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 mr-2">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-2xl font-bold text-gray-900">
                    ₪{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₪{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-primary hover:bg-gradient-primary-hover text-white font-semibold"
                disabled={!product.inStock}
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="w-4 h-4 ml-2" />
                {product.inStock ? 'הוסף לעגלה' : 'אזל מהמלאי'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            לא נמצאו מוצרים
          </h3>
          <p className="text-gray-600">
            נסה לשנות את הפילטרים או לחפש משהו אחר
          </p>
        </div>
      )}
    </div>
  );
};

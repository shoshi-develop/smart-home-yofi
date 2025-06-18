
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
  selectedBrands?: string[];
  selectedFeatures?: string[];
}

export const ProductGrid = ({ 
  selectedCategory, 
  priceRange, 
  selectedBrands = [], 
  selectedFeatures = [] 
}: ProductGridProps) => {
  const [sortBy, setSortBy] = useState('popular');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const allProducts = [
    // Security Category
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
      inStock: true,
      brand: 'xiaomi',
      features: ['wifi', 'night-vision', 'app']
    },
    {
      id: 2,
      name: 'מצלמת אבטחה אלחוטית 4K',
      category: 'security',
      price: 449,
      originalPrice: 549,
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      badge: 'חדש',
      badgeColor: 'bg-green-500',
      inStock: true,
      brand: 'amazon',
      features: ['wifi', 'night-vision', 'app', 'waterproof']
    },
    {
      id: 3,
      name: 'מערכת אבטחה חכמה 8 מצלמות',
      category: 'security-systems',
      price: 1299,
      originalPrice: 1599,
      rating: 4.7,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop',
      badge: 'מבצע',
      badgeColor: 'bg-orange-500',
      inStock: true,
      brand: 'xiaomi',
      features: ['wifi', 'night-vision', 'app']
    },
    
    // Lighting Category
    {
      id: 4,
      name: 'נורה חכמה RGB',
      category: 'lighting',
      price: 89,
      originalPrice: 129,
      rating: 4.9,
      reviews: 243,
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
      badge: 'חדש',
      badgeColor: 'bg-green-500',
      inStock: true,
      brand: 'philips',
      features: ['wifi', 'voice', 'app']
    },
    {
      id: 5,
      name: 'רצועת LED חכמה 5 מטר',
      category: 'lighting',
      price: 159,
      originalPrice: 199,
      rating: 4.6,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      badge: null,
      badgeColor: '',
      inStock: true,
      brand: 'philips',
      features: ['wifi', 'app']
    },
    {
      id: 6,
      name: 'מתג תאורה חכם',
      category: 'lighting',
      price: 45,
      originalPrice: 59,
      rating: 4.4,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      badge: 'בסיסי',
      badgeColor: 'bg-gray-500',
      inStock: true,
      brand: 'xiaomi',
      features: ['wifi', 'app']
    },
    
    // Climate Category
    {
      id: 7,
      name: 'תרמוסטט חכם WiFi',
      category: 'climate',
      price: 199,
      originalPrice: 249,
      rating: 4.6,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      badge: 'חיסכון',
      badgeColor: 'bg-blue-500',
      inStock: true,
      brand: 'google',
      features: ['wifi', 'voice', 'app']
    },
    {
      id: 8,
      name: 'מזגן חכם 12000 BTU',
      category: 'climate',
      price: 1599,
      originalPrice: 1899,
      rating: 4.8,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1631545806603-0c531302f40b?w=400&h=300&fit=crop',
      badge: 'פופולרי',
      badgeColor: 'bg-red-500',
      inStock: true,
      brand: 'xiaomi',
      features: ['wifi', 'voice', 'app']
    },
    
    // Audio Category
    {
      id: 9,
      name: 'רמקול חכם Amazon Echo',
      category: 'audio',
      price: 159,
      originalPrice: null,
      rating: 4.7,
      reviews: 201,
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
      badge: null,
      badgeColor: '',
      inStock: true,
      brand: 'amazon',
      features: ['wifi', 'voice', 'app']
    },
    {
      id: 10,
      name: 'רמקול Google Home Mini',
      category: 'audio',
      price: 129,
      originalPrice: 159,
      rating: 4.5,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      badge: 'מבצע',
      badgeColor: 'bg-orange-500',
      inStock: true,
      brand: 'google',
      features: ['wifi', 'voice', 'app']
    },
    
    // Entertainment Category
    {
      id: 11,
      name: 'Apple TV 4K',
      category: 'entertainment',
      price: 599,
      originalPrice: 699,
      rating: 4.9,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
      badge: 'פרימיום',
      badgeColor: 'bg-purple-500',
      inStock: true,
      brand: 'apple',
      features: ['wifi', 'app']
    },
    {
      id: 12,
      name: 'טלוויזיה חכמה 55 אינץ',
      category: 'entertainment',
      price: 2199,
      originalPrice: 2599,
      rating: 4.6,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
      badge: 'גדול',
      badgeColor: 'bg-indigo-500',
      inStock: true,
      brand: 'xiaomi',
      features: ['wifi', 'voice', 'app']
    },
    
    // Security Systems Category
    {
      id: 13,
      name: 'חיישن תנועה חכם',
      category: 'security-systems',
      price: 79,
      originalPrice: 99,
      rating: 4.5,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=300&fit=crop',
      badge: 'מבצע',
      badgeColor: 'bg-orange-500',
      inStock: false,
      brand: 'xiaomi',
      features: ['wifi', 'app']
    },
    {
      id: 14,
      name: 'מערכת אזעקה חכמה',
      category: 'security-systems',
      price: 399,
      originalPrice: 499,
      rating: 4.7,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      badge: 'אמין',
      badgeColor: 'bg-green-600',
      inStock: true,
      brand: 'amazon',
      features: ['wifi', 'app']
    }
  ];

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const featureMatch = selectedFeatures.length === 0 || 
        selectedFeatures.some(feature => product.features.includes(feature));
      
      return categoryMatch && priceMatch && brandMatch && featureMatch;
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
  }, [selectedCategory, priceRange, sortBy, selectedBrands, selectedFeatures]);

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

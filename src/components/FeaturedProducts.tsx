
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';

export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const products = [
    {
      id: 1,
      name: 'מצלמת אבטחה חכמה Pro',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      badge: 'פופולרי',
      badgeColor: 'bg-red-500',
      features: ['ראיית לילה', 'זיהוי פנים', 'התראות חכמות']
    },
    {
      id: 2,
      name: 'נורה חכמה RGB',
      price: 89,
      originalPrice: 129,
      rating: 4.9,
      reviews: 243,
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
      badge: 'חדש',
      badgeColor: 'bg-green-500',
      features: ['16 מיליון צבעים', 'שליטה קולית', 'חיסכון באנרגיה']
    },
    {
      id: 3,
      name: 'מערכת אבטחה כוללת',
      price: 899,
      originalPrice: 1199,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      badge: 'מבצע',
      badgeColor: 'bg-orange-500',
      features: ['4 מצלמות', 'מערכת אזעקה', 'אפליקציה חכמה']
    },
    {
      id: 4,
      name: 'תרמוסטט חכם WiFi',
      price: 199,
      originalPrice: 249,
      rating: 4.6,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      badge: 'חיסכון',
      badgeColor: 'bg-blue-500',
      features: ['למידה אוטומטית', 'שליטה מרחוק', 'חיסכון 20%']
    }
  ];

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
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            מוצרים מובילים
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            המוצרים הטובים ביותר שלנו עם ביקורות מעולות ומחירים אטרקטיביים
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className={`absolute top-2 right-2 ${product.badgeColor} text-white`}>
                  {product.badge}
                </Badge>
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

                <div className="mb-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="text-xs text-gray-600 mb-1">
                      • {feature}
                    </div>
                  ))}
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
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 ml-2" />
                  הוסף לעגלה
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

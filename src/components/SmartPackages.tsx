
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users } from 'lucide-react';

export const SmartPackages = () => {
  const packages = [
    {
      id: 1,
      name: 'חבילת מתחיל',
      description: 'מושלם לאלו שמתחילים בעולם הבית החכם',
      price: 599,
      originalPrice: 799,
      rating: 4.7,
      reviews: 89,
      badge: 'פופולרי',
      badgeColor: 'bg-blue-500',
      features: [
        'נורה חכמה RGB',
        'חיישן תנועה',
        'מתג חכם',
        'אפליקציה חכמה',
        'התקנה בסיסית',
        'הדרכה אישית'
      ],
      includes: 4,
      installation: 'כלולה'
    },
    {
      id: 2,
      name: 'חבילת אבטחה חכמה',
      description: 'הגנה מקיפה על הבית עם טכנולוגיה מתקדמת',
      price: 1299,
      originalPrice: 1699,
      rating: 4.9,
      reviews: 156,
      badge: 'מומלץ',
      badgeColor: 'bg-green-500',
      features: [
        '2 מצלמות אבטחה 4K',
        'מערכת אזעקה חכמה',
        '4 חיישני דלתות',
        'חיישן תנועה חכם',
        'התראות בזמן אמת',
        'אחסון ענן חינם לשנה'
      ],
      includes: 8,
      installation: 'מקצועית כלולה'
    },
    {
      id: 3,
      name: 'הבית החכם המלא',
      description: 'פתרון מקיף לבית חכם ברמה המקצועית',
      price: 2499,
      originalPrice: 3299,
      rating: 5.0,
      reviews: 67,
      badge: 'פרימיום',
      badgeColor: 'bg-purple-500',
      features: [
        '4 מצלמות אבטחה 4K',
        'תאורה חכמה לכל הבית',
        'מערכת אבטחה מלאה',
        'בקרת אקלים חכמה',
        'רמקולים חכמים',
        'מערכת השקיה חכמה',
        'שירות תמיכה VIP',
        'אחריות מורחבת 3 שנים'
      ],
      includes: 15,
      installation: 'התקנה מקצועית + הדרכה'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            חבילות חכמות למתחילים
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            חבילות מוכנות ומותאמות לכל רמה, עם התקנה מקצועית והדרכה אישית
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((package_item, index) => (
            <Card 
              key={package_item.id} 
              className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                index === 1 ? 'scale-105 border-2 border-green-500' : 'hover:scale-105'
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-2 text-sm font-semibold">
                  הכי פופולרי! 🔥
                </div>
              )}
              
              <div className={`p-6 ${index === 1 ? 'pt-12' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${package_item.badgeColor} text-white`}>
                    {package_item.badge}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 ml-1" />
                    {package_item.includes} מוצרים
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {package_item.name}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {package_item.description}
                </p>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(package_item.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 mr-2">
                    {package_item.rating} ({package_item.reviews} ביקורות)
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ₪{package_item.price}
                    </span>
                    <span className="text-xl text-gray-500 line-through mr-2">
                      ₪{package_item.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 font-semibold">
                    חיסכון של ₪{package_item.originalPrice - package_item.price}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">כלול בחבילה:</h4>
                  <ul className="space-y-2">
                    {package_item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-semibold">
                    {package_item.installation}
                  </p>
                </div>

                <Button 
                  className={`w-full font-semibold ${
                    index === 1 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  } text-white`}
                >
                  בחר חבילה זו
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

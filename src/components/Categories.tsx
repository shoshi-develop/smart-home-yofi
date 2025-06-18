
import { Card } from '@/components/ui/card';
import { Camera, Lightbulb, Thermometer, Shield, Speaker, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Categories = () => {
  const categories = [
    {
      id: 'security',
      name: 'מצלמות אבטחה',
      icon: Camera,
      description: 'מערכות אבטחה חכמות לבית',
      color: 'from-red-500 to-red-600',
      products: 2
    },
    {
      id: 'lighting',
      name: 'תאורה חכמה',
      icon: Lightbulb,
      description: 'נורות וגופי תאורה חכמים',
      color: 'from-yellow-500 to-orange-500',
      products: 3
    },
    {
      id: 'climate',
      name: 'בקרת אקלים',
      icon: Thermometer,
      description: 'מזגנים וחימום חכם',
      color: 'from-blue-500 to-cyan-500',
      products: 2
    },
    {
      id: 'security-systems',
      name: 'מערכות אבטחה',
      icon: Shield,
      description: 'אזעקות וחיישנים',
      color: 'from-green-500 to-emerald-500',
      products: 3
    },
    {
      id: 'audio',
      name: 'אודיו חכם',
      icon: Speaker,
      description: 'רמקולים ומערכות שמע',
      color: 'from-purple-500 to-violet-500',
      products: 2
    },
    {
      id: 'entertainment',
      name: 'בידור חכם',
      icon: Tv,
      description: 'טלוויזיות ומדיה',
      color: 'from-indigo-500 to-blue-600',
      products: 2
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            קטגוריות מוצרים
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            חקור את המגוון הרחב של מוצרי בית חכם המותאמים לכל צורך
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} to={`/products`} state={{ category: category.id }}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className={`h-32 bg-gradient-to-r ${category.color} relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-sm font-medium">
                        {category.products} מוצרים
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

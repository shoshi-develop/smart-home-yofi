
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Smartphone, Shield, Lightbulb, Thermometer } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'שליטה חכמה',
      description: 'בקרה מלאה מהטלפון'
    },
    {
      icon: Shield,
      title: 'אבטחה מתקדמת',
      description: 'הגנה 24/7 על הבית'
    },
    {
      icon: Lightbulb,
      title: 'תאורה חכמה',
      description: 'אווירה מושלמת בכל חדר'
    },
    {
      icon: Thermometer,
      title: 'בקרת אקלים',
      description: 'טמפרטורה אידיאלית תמיד'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-800"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-emerald-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-sky-300/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            הבית החכם
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              של העתיד
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
            גלה את האוסף המקיף ביותר של מוצרי בית חכם בישראל. 
            טכנולוגיה מתקדמת, התקנה פשוטה, שירות מקצועי.
          </p>
          <div className="flex justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 text-lg">
                צפה במוצרים
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-emerald-100 text-sm">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};


import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, BookOpen, Play, Download } from 'lucide-react';

export const GuidesList = () => {
  const guides = [
    {
      id: 1,
      title: 'התקנת מצלמת אבטחה חכמה',
      description: 'מדריך שלב אחר שלב להתקנה וקביעת תצורה של מצלמת אבטחה',
      category: 'אבטחה',
      difficulty: 'קל',
      duration: '15 דקות',
      rating: 4.8,
      views: 2340,
      image: '/placeholder.svg',
      hasVideo: true,
      hasDownload: true,
      tags: ['התקנה', 'מצלמה', 'WiFi']
    },
    {
      id: 2,
      title: 'הגדרת תאורה חכמה עם Philips Hue',
      description: 'איך להגדיר מערכת תאורה חכמה מלאה עם נורות Philips Hue',
      category: 'תאורה',
      difficulty: 'בינוני',
      duration: '25 דקות',
      rating: 4.9,
      views: 1890,
      image: '/placeholder.svg',
      hasVideo: true,
      hasDownload: true,
      tags: ['תאורה', 'Philips', 'אפליקציה']
    },
    {
      id: 3,
      title: 'חיבור רמקול חכם Amazon Echo',
      description: 'הגדרה מלאה של רמקול חכם וחיבור לכל מכשירי הבית החכם',
      category: 'אודיו',
      difficulty: 'קל',
      duration: '10 דקות',
      rating: 4.7,
      views: 3120,
      image: '/placeholder.svg',
      hasVideo: true,
      hasDownload: false,
      tags: ['אודיו', 'Alexa', 'קול']
    },
    {
      id: 4,
      title: 'הגדרת מערכת אזעקה חכמה',
      description: 'התקנה והגדרה של מערכת אזעקה חכמה כוללת חיישנים ומצלמות',
      category: 'אבטחה',
      difficulty: 'מתקדם',
      duration: '45 דקות',
      rating: 4.6,
      views: 1560,
      image: '/placeholder.svg',
      hasVideo: true,
      hasDownload: true,
      tags: ['אזעקה', 'חיישנים', 'מקצועי']
    },
    {
      id: 5,
      title: 'בקרת אקלים חכמה - תרמוסטט WiFi',
      description: 'התקנה והגדרה של תרמוסטט חכם לחיסכון באנרגיה',
      category: 'אקלים',
      difficulty: 'בינוני',
      duration: '30 דקות',
      rating: 4.5,
      views: 987,
      image: '/placeholder.svg',
      hasVideo: false,
      hasDownload: true,
      tags: ['תרמוסטט', 'חיסכון', 'אנרגיה']
    },
    {
      id: 6,
      title: 'אוטומציות חכמות עם Google Home',
      description: 'יצירת אוטומציות מתקדמות לבית חכם עם Google Assistant',
      category: 'כללי',
      difficulty: 'מתקדם',
      duration: '35 דקות',
      rating: 4.8,
      views: 2156,
      image: '/placeholder.svg',
      hasVideo: true,
      hasDownload: false,
      tags: ['Google', 'אוטומציה', 'מתקדם']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'קל': return 'bg-green-500';
      case 'בינוני': return 'bg-yellow-500';
      case 'מתקדם': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const categories = ['הכל', 'אבטחה', 'תאורה', 'אודיו', 'אקלים', 'כללי'];

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(category => (
          <Button 
            key={category}
            variant={category === 'הכל' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map(guide => (
          <Card key={guide.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="relative">
              <img 
                src={guide.image} 
                alt={guide.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className={`${getDifficultyColor(guide.difficulty)} text-white`}>
                  {guide.difficulty}
                </Badge>
                <Badge className="bg-blue-500 text-white">
                  {guide.category}
                </Badge>
              </div>
              {guide.hasVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-black/80 transition-colors">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {guide.title}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm">
                {guide.description}
              </p>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {guide.duration}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {guide.views.toLocaleString()} צפיות
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {guide.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <BookOpen className="w-4 h-4 ml-2" />
                  קרא מדריך
                </Button>
                {guide.hasDownload && (
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

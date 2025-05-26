
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, BookOpen, Play, Download, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export const GuidesList = () => {
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const { toast } = useToast();

  const guides = [
    {
      id: 1,
      title: 'התקנת מצלמת אבטחה חכמה',
      description: 'מדריך שלב אחר שלב להתקנה וקביעת תצורה של מצלמת אבטחה',
      category: 'אבטחה',
      difficulty: 'קל',
      duration: '12 דקות',
      rating: 4.8,
      views: 2340,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      hasVideo: true,
      hasDownload: true,
      tags: ['התקנה', 'מצלמה', 'WiFi'],
      content: `
# התקנת מצלמת אבטחה חכמה

## שלב 1: הכנה
1. בדוק שיש לך חיבור WiFi יציב
2. הכן את הכלים הנדרשים: מברג, מקדח
3. בחר מיקום מתאים למצלמה

## שלב 2: התקנה פיזית
1. קבע את הבסיס במיקום הנבחר
2. חבר את המצלמה לבסיס
3. וודא שהזווית נכונה

## שלב 3: חיבור לרשת
1. הורד את האפליקציה של היצרן
2. סרוק את קוד ה-QR על המצלמה
3. הזן את פרטי הרשת

## שלב 4: הגדרות
1. קבע איזורי זיהוי
2. הגדר התראות
3. בדוק את איכות התמונה
      `
    },
    {
      id: 2,
      title: 'הגדרת תאורה חכמה עם Philips Hue',
      description: 'איך להגדיר מערכת תאורה חכמה מלאה עם נורות Philips Hue',
      category: 'תאורה',
      difficulty: 'בינוני',
      duration: '18 דקות',
      rating: 4.9,
      views: 1890,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      hasVideo: true,
      hasDownload: true,
      tags: ['תאורה', 'Philips', 'אפליקציה'],
      content: `
# הגדרת תאורה חכמה עם Philips Hue

## שלב 1: התקנת הגשר
1. חבר את הגשר לנתב
2. הורד את אפליקציית Philips Hue
3. צור חשבון משתמש

## שלב 2: הוספת נורות
1. החלף נורות רגילות בנורות Hue
2. הדלק את התאורה
3. הוסף נורות חדשות באפליקציה

## שלב 3: הגדרת חדרים
1. חלק את הנורות לחדרים
2. צור סצנות תאורה
3. הגדר תזמונים

## שלב 4: אוטומציות
1. הגדר חיישני תנועה
2. צור כללי אוטומציה
3. חבר לעוזרים קוליים
      `
    },
    {
      id: 3,
      title: 'חיבור רמקול חכם Amazon Echo',
      description: 'הגדרה מלאה של רמקול חכם וחיבור לכל מכשירי הבית החכם',
      category: 'אודיו',
      difficulty: 'קל',
      duration: '8 דקות',
      rating: 4.7,
      views: 3120,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      hasVideo: true,
      hasDownload: false,
      tags: ['אודיו', 'Alexa', 'קול'],
      content: `
# חיבור רמקול חכם Amazon Echo

## שלב 1: הכנה ראשונית
1. חבר את הרמקול לחשמל
2. הורד את אפליקציית Alexa
3. צור חשבון Amazon

## שלב 2: חיבור לרשת
1. פתח את האפליקציה
2. בחר "הוסף מכשיר"
3. עקוב אחר ההוראות לחיבור WiFi

## שלב 3: הגדרות בסיסיות
1. בחר את המיקום
2. הגדר את הקול המועדף
3. תרגל פקודות בסיסיות

## שלב 4: חיבור מכשירים נוספים
1. גלה מכשירים חכמים
2. הגדר קבוצות
3. צור רוטינות
      `
    },
    {
      id: 4,
      title: 'הגדרת מערכת אזעקה חכמה',
      description: 'התקנה והגדרה של מערכת אזעקה חכמה כוללת חיישנים ומצלמות',
      category: 'אבטחה',
      difficulty: 'מתקדם',
      duration: '35 דקות',
      rating: 4.6,
      views: 1560,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      hasVideo: true,
      hasDownload: true,
      tags: ['אזעקה', 'חיישנים', 'מקצועי'],
      content: `
# הגדרת מערכת אזעקה חכמה

## שלב 1: תכנון המערכת
1. זהה נקודות כניסה
2. בחר מיקומים לחיישנים
3. תכנן את מיקום הפאנל

## שלב 2: התקנת חיישנים
1. התקן חיישני דלתות וחלונות
2. הרכב חיישני תנועה
3. בדוק קליטה וטווח

## שלב 3: הגדרת הפאנל
1. חבר לרשת האינטרנט
2. הגדר קודי גישה
3. רשום מספרי חירום

## שלב 4: בדיקות ואימות
1. בדוק כל חיישן בנפרד
2. תרגל הפעלה וכיבוי
3. וודא קבלת התראות
      `
    },
    {
      id: 5,
      title: 'בקרת אקלים חכמה - תרמוסטט WiFi',
      description: 'התקנה והגדרה של תרמוסטט חכם לחיסכון באנרגיה',
      category: 'אקלים',
      difficulty: 'בינוני',
      duration: '22 דקות',
      rating: 4.5,
      views: 987,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      hasVideo: false,
      hasDownload: true,
      tags: ['תרמוסטט', 'חיסכון', 'אנרגיה'],
      content: `
# בקרת אקלים חכמה - תרמוסטט WiFi

## שלב 1: הכנה לעבודה
1. נתק את החשמל למזגן
2. צלם את החיווט הקיים
3. הכן כלי עבודה

## שלב 2: הסרת התרמוסטט הישן
1. הסר את הכיסוי הקדמי
2. נתק את החוטים בזהירות
3. הסר את הבסיס מהקיר

## שלב 3: התקנת התרמוסטט החדש
1. הרכב את הבסיס החדש
2. חבר את החוטים לפי הסכמה
3. הרכב את היחידה הראשית

## שלב 4: הגדרה וכיול
1. הפעל את החשמל
2. הגדר חיבור WiFi
3. כייל טמפרטורה ולוח זמנים
      `
    },
    {
      id: 6,
      title: 'אוטומציות חכמות עם Google Home',
      description: 'יצירת אוטומציות מתקדמות לבית חכם עם Google Assistant',
      category: 'כללי',
      difficulty: 'מתקדם',
      duration: '28 דקות',
      rating: 4.8,
      views: 2156,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      hasVideo: true,
      hasDownload: false,
      tags: ['Google', 'אוטומציה', 'מתקדם'],
      content: `
# אוטומציות חכמות עם Google Home

## שלב 1: הכנת המכשירים
1. וודא שכל המכשירים מחוברים
2. עדכן את אפליקציית Google Home
3. סנכרן את כל החשבונות

## שלב 2: יצירת רוטינות בסיסיות
1. פתח תפריט "רוטינות"
2. צור רוטינת "בוקר טוב"
3. הגדר פעולות אוטומטיות

## שלב 3: אוטומציות מתקדמות
1. הגדר תנאים מורכבים
2. צור רוטינות לפי מיקום
3. הגדר תזמונים דינמיים

## שלב 4: אופטימיזציה
1. נטר ביצועים
2. התאם לפי השימוש
3. עדכן רוטינות בהתאם
      `
    }
  ];

  const categories = ['הכל', 'אבטחה', 'תאורה', 'אודיו', 'אקלים', 'כללי'];

  const filteredGuides = selectedCategory === 'הכל' 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'קל': return 'bg-green-500';
      case 'בינוני': return 'bg-yellow-500';
      case 'מתקדם': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDownload = (guide: any) => {
    const element = document.createElement('a');
    const file = new Blob([guide.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${guide.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "המדריך הורד בהצלחה!",
      description: `המדריך "${guide.title}" נשמר למחשב שלך`,
    });
  };

  const playVideo = (guide: any) => {
    toast({
      title: "מפעיל וידאו...",
      description: `מפעיל הדרכת וידאו עבור "${guide.title}"`,
    });
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(category => (
          <Button 
            key={category}
            variant={category === selectedCategory ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.map(guide => (
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
                <Badge className="bg-emerald-500 text-white">
                  {guide.category}
                </Badge>
              </div>
              {guide.hasVideo && (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => playVideo(guide)}
                >
                  <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-black/80 transition-colors">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                      <BookOpen className="w-4 h-4 ml-2" />
                      קרא מדריך
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-right">{guide.title}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 text-right leading-relaxed whitespace-pre-line">
                      {guide.content}
                    </div>
                  </DialogContent>
                </Dialog>
                
                {guide.hasDownload && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(guide)}
                  >
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

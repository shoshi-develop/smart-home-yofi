
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            מדיניות עוגיות
          </h1>
          
          <div className="space-y-6 text-right leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. מה הן עוגיות?</h2>
              <p className="text-gray-600">
                עוגיות הן קבצי טקסט קטנים הנשמרים במחשב או במכשיר הנייד שלך כאשר אתה מבקר באתר שלנו. הן עוזרות לנו לשפר את חוויית השימוש שלך.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. סוגי עוגיות שאנו משתמשים בהן</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">עוגיות חיוניות</h3>
                  <p className="text-gray-600">נדרשות לתפעול בסיסי של האתר, כולל עגלת קניות והזדהות משתמשים.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">עוגיות ביצועים</h3>
                  <p className="text-gray-600">עוזרות לנו להבין כיצד משתמשים מתנהגים באתר כדי לשפר את הביצועים.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">עוגיות פונקציונליות</h3>
                  <p className="text-gray-600">שומרות על העדפותיך כמו שפה, מיקום ופריטים במועדפים.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">עוגיות שיווק</h3>
                  <p className="text-gray-600">מאפשרות לנו להציג פרסומות רלוונטיות ולמדוד את יעילות הקמפיינים שלנו.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. עוגיות של צדדים שלישיים</h2>
              <p className="text-gray-600 mb-2">אנו משתמשים בשירותים של צדדים שלישיים שעלולים להציב עוגיות, כולל:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mr-4">
                <li>Google Analytics - לניתוח תנועת אתר</li>
                <li>Facebook Pixel - לשיווק ממוקד</li>
                <li>שירותי תשלום - לעיבוד בטוח של תשלומים</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. ניהול עוגיות</h2>
              <p className="text-gray-600 mb-2">אתה יכול לשלוט בעוגיות בדרכים הבאות:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mr-4">
                <li>הגדרות הדפדפן - רוב הדפדפנים מאפשרים לחסום או למחוק עוגיות</li>
                <li>כלי ניהול העדפות באתר שלנו</li>
                <li>הסרת הסכמה לעוגיות לא חיוניות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. השפעת מחיקת עוגיות</h2>
              <p className="text-gray-600">
                מחיקת עוגיות עלולה להשפיע על חוויית השימוש באתר, כולל איבוד העדפות אישיות ופריטים בעגלת הקניות.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. עדכונים למדיניות</h2>
              <p className="text-gray-600">
                אנו עלולים לעדכן מדיניות עוגיות זו מעת לעת. נודיע על שינויים משמעותיים באמצעות הודעה באתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. יצירת קשר</h2>
              <p className="text-gray-600">
                לשאלות לגבי מדיניות העוגיות שלנו, ניתן לפנות אלינו בכתובת: cookies@smart-home.co.il
              </p>
            </section>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CookiesPolicy;

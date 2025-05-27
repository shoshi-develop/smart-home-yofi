
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            מדיניות פרטיות
          </h1>
          
          <div className="space-y-6 text-right leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. מבוא</h2>
              <p className="text-gray-600">
                בית חכם פלוס מתחייבת להגן על פרטיותך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. איסוף מידע</h2>
              <p className="text-gray-600 mb-2">אנו אוספים מידע בדרכים הבאות:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mr-4">
                <li>מידע שאתה מספק בעת הרשמה או הזמנה</li>
                <li>מידע על השימוש באתר שלנו</li>
                <li>מידע טכני כגון כתובת IP ופרטי דפדפן</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. שימוש במידע</h2>
              <p className="text-gray-600 mb-2">אנו משתמשים במידע שלך עבור:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mr-4">
                <li>עיבוד הזמנות ומתן שירותים</li>
                <li>שיפור חוויית המשתמש באתר</li>
                <li>תקשורת לגבי הזמנות וחידושי מוצרים</li>
                <li>מילוי חובות חוקיות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. הגנה על מידע</h2>
              <p className="text-gray-600">
                אנו משתמשים באמצעי אבטחה מתקדמים כדי להגן על המידע האישי שלך, כולל הצפנה, חומות אש ובקרת גישה מוגבלת.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. שיתוף מידע</h2>
              <p className="text-gray-600">
                אנו לא מוכרים או משתפים את המידע האישי שלך עם צדדים שלישיים, למעט במקרים המפורטים במדיניות זו או כאשר נדרש על פי חוק.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. זכויותיך</h2>
              <p className="text-gray-600 mb-2">יש לך זכות:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mr-4">
                <li>לקבל מידע על השימוש במידע האישי שלך</li>
                <li>לתקן מידע שגוי</li>
                <li>למחוק את המידע שלך</li>
                <li>להתנגד לעיבוד מידע</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. צור קשר</h2>
              <p className="text-gray-600">
                לשאלות בנוגע למדיניות הפרטיות, ניתן לפנות אלינו בכתובת: privacy@smart-home.co.il או בטלפון: 03-1234567
              </p>
            </section>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

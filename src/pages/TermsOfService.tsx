
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            תנאי שימוש
          </h1>
          
          <div className="space-y-6 text-right leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. הסכמה לתנאים</h2>
              <p className="text-gray-600">
                השימוש באתר מהווה הסכמה מלאה לתנאי השימוש המפורטים להלן. אם אינך מסכים לתנאים אלו, אנא הימנע משימוש באתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. שירותים</h2>
              <p className="text-gray-600">
                אנו מספקים מוצרי בית חכם, שירותי התקנה, ייעוץ טכני ותמיכה. כל השירותים ניתנים בכפוף לזמינות ולתנאים המפורטים בהצעת המחיר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. הזמנות ותשלומים</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mr-4">
                <li>כל הזמנה מהווה הצעה לרכישה הכפופה לאישורנו</li>
                <li>המחירים באתר כוללים מע"ם אלא אם כן צוין אחרת</li>
                <li>התשלום יבוצע בהתאם לתנאי התשלום המוצגים בהזמנה</li>
                <li>אנו שומרים לעצמנו הזכות לבטל הזמנות חריגות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. משלוחים והתקנה</h2>
              <p className="text-gray-600">
                זמני האספקה והתקנה הם אומדנים בלבד ואינם מהווים התחייבות מחייבת. נעשה כל מאמץ לעמוד בלוחות הזמנים המוצגים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. אחריות</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mr-4">
                <li>אחריות על מוצרים לפי תנאי היצרן</li>
                <li>אחריות על שירותי התקנה - שנה אחת</li>
                <li>האחריות לא כוללת נזקים הנובעים משימוש לא נכון</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. החזרות וביטולים</h2>
              <p className="text-gray-600">
                ניתן לבטל הזמנה עד 14 יום מיום הרכישה, בכפוף לתנאים המפורטים במדיניות ההחזרות שלנו.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. הגבלת אחריות</h2>
              <p className="text-gray-600">
                אחריותנו מוגבלת לערך המוצר או השירות שנרכש. איננו אחראים לנזקים עקיפים או תוצאתיים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. שינויים בתנאים</h2>
              <p className="text-gray-600">
                אנו רשאים לעדכן תנאי שימוש אלו מעת לעת. השינויים ייכנסו לתוקף מיום פרסומם באתר.
              </p>
            </section>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;


import { Link } from 'react-router-dom';
import { Home, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'דף הבית', href: '/' },
    { name: 'מוצרים', href: '/products' },
    { name: 'מדריכים', href: '/guides' },
    { name: 'התאמה אישית', href: '/custom-service' }
  ];

  const categories = [
    { name: 'מצלמות אבטחה', href: '/products', state: { category: 'security' } },
    { name: 'תאורה חכמה', href: '/products', state: { category: 'lighting' } },
    { name: 'בקרת אקלים', href: '/products', state: { category: 'climate' } },
    { name: 'אודיו חכם', href: '/products', state: { category: 'audio' } }
  ];

  const support = [
    { name: 'שירות לקוחות', href: '/customer-service' },
    { name: 'אחריות', href: '/warranty' },
    { name: 'החזרות', href: '/returns' },
    { name: 'שאלות נפוצות', href: '/faq' }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">בית חכם פלוס</span>
            </div>
            <p className="text-gray-300 mb-4">
              המקום הטוב ביותר למוצרי בית חכם בישראל. טכנולוגיה מתקדמת, שירות מקצועי, מחירים הוגנים.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">קטגוריות</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.name}>
                  <Link 
                    to={category.href}
                    state={category.state}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">צור קשר</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-emerald-400" />
                <a href="tel:03-1234567" className="text-gray-300 hover:text-white transition-colors">03-1234567</a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-5 h-5 text-emerald-400" />
                <a href="mailto:info@smart-home.co.il" className="text-gray-300 hover:text-white transition-colors">info@smart-home.co.il</a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">תל אביב, ישראל</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} בית חכם פלוס. כל הזכויות שמורות.
          </p>
          <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              תנאי שימוש
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              מדיניות פרטיות
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              עוגיות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

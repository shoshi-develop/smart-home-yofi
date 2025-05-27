
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, CheckCircle, Star, Calendar } from 'lucide-react';

export const CustomServiceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    homeSize: '',
    budget: '',
    services: [] as string[],
    timeline: '',
    description: ''
  });

  const services = [
    { id: 'security', name: 'מערכת אבטחה מלאה', price: 'החל מ-₪1,200' },
    { id: 'lighting', name: 'תאורה חכמה לכל הבית', price: 'החל מ-₪800' },
    { id: 'climate', name: 'בקרת אקלים חכמה', price: 'החל מ-₪600' },
    { id: 'audio', name: 'מערכת אודיו רב-חדרית', price: 'החל מ-₪900' },
    { id: 'automation', name: 'אוטומציות מתקדמות', price: 'החל מ-₪400' },
    { id: 'consultation', name: 'ייעוץ והתאמה אישית', price: 'החל מ-₪200' }
  ];

  const timelineOptions = [
    'מיידי (תוך שבוע)',
    'גמיש (2-4 שבועות)',
    'לא דחוף (חודש ומעלה)'
  ];

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here would be the actual form submission logic
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Service Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">ייעוץ חינם</h3>
          <p className="text-gray-600 text-sm">ייעוץ מקצועי ללא עלות לתכנון הבית החכם שלך</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">מקצועיות מוכחת</h3>
          <p className="text-gray-600 text-sm">מעל 1000 לקוחות מרוצים ואחריות מלאה על השירות</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">התקנה מהירה</h3>
          <p className="text-gray-600 text-sm">התקנה מקצועית תוך 24-48 שעות מאישור ההזמנה</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">בקש התאמה אישית</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">פרטים אישיים</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם מלא *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="הכנס את שמך המלא"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    טלפון *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="050-1234567"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    אימייל
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  כתובת *
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="רחוב, מספר בית, עיר"
                  required
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">פרטי הפרויקט</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    גודל הבית (מ"ר)
                  </label>
                  <Input
                    value={formData.homeSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, homeSize: e.target.value }))}
                    placeholder="כמה מטרים רבועים"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תקציב משוער
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  >
                    <option value="">בחר תקציב</option>
                    <option value="1000-3000">₪1,000 - ₪3,000</option>
                    <option value="3000-5000">₪3,000 - ₪5,000</option>
                    <option value="5000-10000">₪5,000 - ₪10,000</option>
                    <option value="10000+">מעל ₪10,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  לוח זמנים מועדף
                </label>
                <div className="space-y-2">
                  {timelineOptions.map(option => (
                    <label key={option} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <input
                        type="radio"
                        name="timeline"
                        value={option}
                        checked={formData.timeline === option}
                        onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">שירותים רצויים</h3>
              <div className="grid grid-cols-1 gap-3">
                {services.map(service => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.services.includes(service.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Checkbox 
                          checked={formData.services.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                        />
                        <div>
                          <span className="font-medium text-gray-900">{service.name}</span>
                          <p className="text-sm text-gray-600">{service.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                פרטים נוספים
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="תאר את הצרכים הספציפיים שלך, חדרים שברצונך לחבר, או כל דרישה מיוחדת..."
                rows={4}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
            >
              שלח בקשה לייעוץ חינם
            </Button>
          </form>
        </Card>

        {/* Contact Info & Benefits */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">צור קשר ישיר</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">טלפון</p>
                  <p className="text-gray-600">03-1234567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">אימייל</p>
                  <p className="text-gray-600">info@smart-home.co.il</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">כתובת</p>
                  <p className="text-gray-600">תל אביב, ישראל</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">למה לבחור בנו?</h3>
            <div className="space-y-3">
              {[
                'מעל 5 שנות ניסיון בתחום',
                'אחריות מלאה על כל המוצרים והשירותים',
                'תמיכה טכנית 24/7',
                'התקנה מקצועית על ידי טכנאים מוסמכים',
                'ייעוץ והתאמה אישית לכל לקוח',
                'מחירים תחרותיים ושקיפות מלאה'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, CheckCircle, Star, Calendar, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CustomServiceForm = () => {
  const { toast } = useToast();
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedServicesTotal, setSelectedServicesTotal] = useState(0);
  const [budgetExceeded, setBudgetExceeded] = useState(false);

  const services = [
    { id: 'security', name: 'מערכת אבטחה מלאה', price: 1200, displayPrice: 'החל מ-₪1,200' },
    { id: 'lighting', name: 'תאורה חכמה לכל הבית', price: 800, displayPrice: 'החל מ-₪800' },
    { id: 'climate', name: 'בקרת אקלים חכמה', price: 600, displayPrice: 'החל מ-₪600' },
    { id: 'audio', name: 'מערכת אודיו רב-חדרית', price: 900, displayPrice: 'החל מ-₪900' },
    { id: 'automation', name: 'אוטומציות מתקדמות', price: 400, displayPrice: 'החל מ-₪400' },
    { id: 'consultation', name: 'ייעוץ והתאמה אישית', price: 200, displayPrice: 'החל מ-₪200' }
  ];

  const timelineOptions = [
    'מיידי (תוך שבוע)',
    'גמיש (2-4 שבועות)',
    'לא דחוף (חודש ומעלה)'
  ];

  const budgetRanges = {
    '1000-3000': { min: 1000, max: 3000 },
    '3000-5000': { min: 3000, max: 5000 },
    '5000-10000': { min: 5000, max: 10000 },
    '10000+': { min: 10000, max: Infinity }
  };

  useEffect(() => {
    const total = formData.services.reduce((sum, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return sum + (service ? service.price : 0);
    }, 0);
    setSelectedServicesTotal(total);

    if (formData.budget && formData.budget !== '') {
      const budgetRange = budgetRanges[formData.budget as keyof typeof budgetRanges];
      if (budgetRange && total > budgetRange.max) {
        setBudgetExceeded(true);
      } else {
        setBudgetExceeded(false);
      }
    }
  }, [formData.services, formData.budget]);

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'שם מלא הוא שדה חובה';
        } else if (value.trim().length < 2) {
          newErrors.name = 'שם חייב להכיל לפחות 2 תווים';
        } else {
          delete newErrors.name;
        }
        break;
      
      case 'phone':
        const phoneRegex = /^0\d{1,2}-?\d{7}$/;
        if (!value.trim()) {
          newErrors.phone = 'מספר טלפון הוא שדה חובה';
        } else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'מספר טלפון לא תקין (דוגמה: 050-1234567)';
        } else {
          delete newErrors.phone;
        }
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          newErrors.email = 'כתובת אימייל לא תקינה';
        } else {
          delete newErrors.email;
        }
        break;
      
      case 'address':
        if (!value.trim()) {
          newErrors.address = 'כתובת היא שדה חובה';
        } else if (value.trim().length < 5) {
          newErrors.address = 'כתובת חייבת להכיל לפחות 5 תווים';
        } else {
          delete newErrors.address;
        }
        break;
      
      case 'homeSize':
        const size = parseInt(value);
        if (value && (isNaN(size) || size < 10 || size > 1000)) {
          newErrors.homeSize = 'גודל הבית חייב להיות בין 10 ל-1000 מ"ר';
        } else {
          delete newErrors.homeSize;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'phone', 'address'];
    const newErrors: Record<string, string> = {};

    requiredFields.forEach(field => {
      const fieldValue = formData[field as keyof typeof formData];
      if (typeof fieldValue === 'string' && !fieldValue.trim()) {
        newErrors[field] = 'שדה זה הוא חובה';
      }
    });

    if (formData.services.length === 0) {
      newErrors.services = 'יש לבחור לפחות שירות אחד';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "שגיאה בטופס",
        description: "אנא תקן את השגיאות בטופס ונסה שוב",
        variant: "destructive"
      });
      return;
    }

    // Form submission success
    toast({
      title: "הבקשה נשלחה בהצלחה! 🎉",
      description: "נחזור אליך תוך 24 שעות עם הצעת מחיר מפורטת. תודה שבחרת בנו!",
    });

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      homeSize: '',
      budget: '',
      services: [],
      timeline: '',
      description: ''
    });
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
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">מקצועיות מוכחת</h3>
          <p className="text-gray-600 text-sm">מעל 1000 לקוחות מרוצים ואחריות מלאה על השירות</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-teal-600" />
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="הכנס את שמך המלא"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    טלפון *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="050-1234567"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    אימייל
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  כתובת *
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="רחוב, מספר בית, עיר"
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
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
                    name="homeSize"
                    value={formData.homeSize}
                    onChange={handleInputChange}
                    placeholder="כמה מטרים רבועים"
                    type="number"
                    className={errors.homeSize ? 'border-red-500' : ''}
                  />
                  {errors.homeSize && <p className="text-red-500 text-sm mt-1">{errors.homeSize}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תקציב משוער
                  </label>
                  <select 
                    name="budget"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.budget}
                    onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        className="w-4 h-4 text-emerald-600"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">שירותים רצויים</h3>
                {selectedServicesTotal > 0 && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    סה"כ: ₪{selectedServicesTotal.toLocaleString()}
                  </Badge>
                )}
              </div>
              
              {budgetExceeded && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-800 text-sm">
                    השירותים שבחרת חורגים מהתקציב שהגדרת. נוכל להתאים הצעה בהתאם לתקציב שלך.
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-3">
                {services.map(service => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.services.includes(service.id)
                        ? 'border-emerald-500 bg-emerald-50'
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
                          <p className="text-sm text-gray-600">{service.displayPrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.services && <p className="text-red-500 text-sm">{errors.services}</p>}
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                פרטים נוספים
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="תאר את הצרכים הספציפיים שלך, חדרים שברצונך לחבר, או כל דרישה מיוחדת..."
                rows={4}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3"
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

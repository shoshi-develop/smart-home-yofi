
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Home, Shield, Lightbulb, Thermometer, Volume2, Tv } from 'lucide-react';
import { addRequest } from '@/store/slices/customServiceSlice';

export const CustomServiceForm = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    homeSize: '',
    budget: '',
    services: [] as string[],
    description: '',
    urgency: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    { id: 'security', name: 'מערכת אבטחה', icon: Shield },
    { id: 'lighting', name: 'תאורה חכמה', icon: Lightbulb },
    { id: 'climate', name: 'בקרת אקלים', icon: Thermometer },
    { id: 'audio', name: 'מערכת אודיו', icon: Volume2 },
    { id: 'entertainment', name: 'בידור ובינה', icon: Tv },
    { id: 'automation', name: 'אוטומציה מלאה', icon: Home },
  ];

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "שגיאה",
        description: "אנא מלא את כל השדות הדרושים",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save to Redux store
      dispatch(addRequest(formData));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "בקשה נשלחה בהצלחה!",
        description: "נחזור אליך תוך 24 שעות",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        homeSize: '',
        budget: '',
        services: [],
        description: '',
        urgency: ''
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בשליחת הבקשה",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-900">
            בקש התאמה אישית
          </CardTitle>
          <p className="text-center text-gray-600">
            מלא את הפרטים והשאיר לנו לתכנן עבורך את הבית החכם המושלם
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">שם מלא *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="הכנס את שמך המלא"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">אימייל *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">טלפון *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="050-1234567"
                  required
                />
              </div>
              <div>
                <Label htmlFor="homeSize">גודל הבית (מ"ר)</Label>
                <Input
                  id="homeSize"
                  value={formData.homeSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, homeSize: e.target.value }))}
                  placeholder="למשל: 120"
                />
              </div>
            </div>

            {/* Budget and Urgency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">תקציב מתוכנן</Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר טווח תקציב" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000-10000">₪5,000 - ₪10,000</SelectItem>
                    <SelectItem value="10000-25000">₪10,000 - ₪25,000</SelectItem>
                    <SelectItem value="25000-50000">₪25,000 - ₪50,000</SelectItem>
                    <SelectItem value="50000+">₪50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="urgency">דחיפות הפרויקט</Label>
                <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר דחיפות" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">לא דחוף</SelectItem>
                    <SelectItem value="medium">בינוני</SelectItem>
                    <SelectItem value="high">דחוף</SelectItem>
                    <SelectItem value="urgent">דחוף מאוד</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Services Selection */}
            <div>
              <Label className="text-base font-semibold">אילו שירותים מעניינים אותך?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                {serviceOptions.map((service) => {
                  const Icon = service.icon;
                  return (
                    <label
                      key={service.id}
                      className={`flex items-center space-x-2 rtl:space-x-reverse p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.services.includes(service.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Checkbox
                        checked={formData.services.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <Icon className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">{service.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">תאור נוסף</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="ספר לנו על הצרכים והדרישות הייחודיות שלך..."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'שולח...' : 'שלח בקשה'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

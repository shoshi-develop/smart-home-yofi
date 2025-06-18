
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Image as ImageIcon } from 'lucide-react';
import { addProduct } from '@/store/slices/productsSlice';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    inStock: true
  });

  const categories = [
    { value: 'security', label: 'מצלמות אבטחה' },
    { value: 'security-systems', label: 'מערכות אבטחה' },
    { value: 'lighting', label: 'תאורה חכמה' },
    { value: 'climate', label: 'בקרת אקלים' },
    { value: 'audio', label: 'אודיو חכם' },
    { value: 'entertainment', label: 'בידור' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      if (!formData.name || !formData.price || !formData.category) {
        toast({
          title: "שגיאה בטופס",
          description: "אנא מלא את כל השדות הנדרשים",
          variant: "destructive"
        });
        return;
      }

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        image: formData.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
        inStock: formData.inStock
      };

      dispatch(addProduct(productData));

      toast({
        title: "מוצר נוסף בהצלחה! 🎉",
        description: `המוצר "${formData.name}" נוסף לקטלוג`,
      });

      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
        inStock: true
      });
    } catch (error) {
      toast({
        title: "שגיאה בהוספת המוצר",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">גישה נדחית</h1>
            <p className="text-gray-600">אין לך הרשאה לצפות בדף זה</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900">הוספת מוצר חדש</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם המוצר *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="הכנס את שם המוצר"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    מחיר *
                  </label>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    קטגוריה *
                  </label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="בחר קטגוריה" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תיאור המוצר
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="תאר את המוצר, תכונות מיוחדות וכדומה..."
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  קישור לתמונה
                </label>
                <div className="flex gap-2">
                  <Input
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="הכנס קישור לתמונת המוצר"
                    disabled={isSubmitting}
                  />
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    העלה
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  אם לא תכניס תמונה, תשתמש תמונת ברירת מחדל
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-600"
                  disabled={isSubmitting}
                />
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                  המוצר במלאי
                </label>
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
                >
                  {isSubmitting ? 'מוסיף...' : 'הוסף מוצר'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setFormData({
                    name: '',
                    price: '',
                    description: '',
                    category: '',
                    image: '',
                    inStock: true
                  })}
                  disabled={isSubmitting}
                >
                  נקה טופס
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;

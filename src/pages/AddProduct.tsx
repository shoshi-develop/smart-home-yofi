
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Save } from 'lucide-react';
import { addProduct } from '@/store/slices/productsSlice';
import { useToast } from '@/hooks/use-toast';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    inStock: true,
    featured: false,
    specifications: '',
    warranty: '',
    brand: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'תאורה חכמה',
    'אבטחה ובטיחות',
    'בקרת אקלים',
    'מערכות אודיו וידאו',
    'אוטומציה ובקרה',
    'חיישנים וגלאים',
    'שערים וחניה',
    'גינה חכמה'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.description || !formData.category) {
      toast({
        title: "שגיאה",
        description: "אנא מלא את כל השדות הדרושים",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newProduct = {
        id: Date.now().toString(),
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image || '/placeholder.svg',
        category: formData.category,
        inStock: formData.inStock,
        featured: formData.featured,
        specifications: formData.specifications.split('\n').filter(s => s.trim()),
        warranty: formData.warranty,
        brand: formData.brand,
        rating: 5,
        reviews: 0
      };

      dispatch(addProduct(newProduct));
      
      toast({
        title: "מוצר נוסף בהצלחה!",
        description: `${formData.name} נוסף לרשימת המוצרים`,
      });
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        image: '',
        category: '',
        inStock: true,
        featured: false,
        specifications: '',
        warranty: '',
        brand: ''
      });
      
      // Navigate to products page
      setTimeout(() => {
        navigate('/products');
      }, 1000);
      
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהוספת המוצר",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Plus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            הוספת מוצר חדש
          </h1>
          <p className="text-gray-600">
            הוסף מוצר חדש לרשימת המוצרים
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">פרטי המוצר</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">שם המוצר *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="הכנס שם המוצר"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">מחיר (₪) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">מותג</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      placeholder="שם המותג"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">קטגוריה *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר קטגוריה" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">תיאור המוצר *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="תאר את המוצר בפירוט..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">קישור לתמונה</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="specifications">מפרט טכני (שורה לכל פרט)</Label>
                  <Textarea
                    id="specifications"
                    value={formData.specifications}
                    onChange={(e) => setFormData(prev => ({ ...prev, specifications: e.target.value }))}
                    placeholder="תאורת LED חסכונית בחשמל&#10;בקרה באמצעות אפליקציה&#10;תמיכה בוויפי"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="warranty">אחריות</Label>
                  <Input
                    id="warranty"
                    value={formData.warranty}
                    onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                    placeholder="למשל: שנתיים"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col space-y-3">
                  <label className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      checked={formData.inStock}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked as boolean }))}
                    />
                    <span>במלאי</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked as boolean }))}
                    />
                    <span>מוצר מומלץ</span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'שומר...' : 'שמור מוצר'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/products')}
                  >
                    ביטול
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;


import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}

export const ProductFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  priceRange, 
  setPriceRange 
}: ProductFiltersProps) => {
  const categories = [
    { id: 'all', name: 'כל המוצרים', count: 106 },
    { id: 'security', name: 'מצלמות אבטחה', count: 24 },
    { id: 'lighting', name: 'תאורה חכמה', count: 18 },
    { id: 'climate', name: 'בקרת אקלים', count: 15 },
    { id: 'audio', name: 'אודיו חכם', count: 12 },
    { id: 'entertainment', name: 'בידור חכם', count: 16 },
    { id: 'security-systems', name: 'מערכות אבטחה', count: 21 }
  ];

  const brands = [
    { id: 'xiaomi', name: 'Xiaomi', count: 23 },
    { id: 'philips', name: 'Philips Hue', count: 18 },
    { id: 'amazon', name: 'Amazon', count: 15 },
    { id: 'google', name: 'Google', count: 12 },
    { id: 'apple', name: 'Apple', count: 8 }
  ];

  const features = [
    { id: 'wifi', name: 'WiFi', count: 67 },
    { id: 'voice', name: 'שליטה קולית', count: 45 },
    { id: 'app', name: 'אפליקציה', count: 89 },
    { id: 'night-vision', name: 'ראיית לילה', count: 23 },
    { id: 'waterproof', name: 'עמיד למים', count: 34 }
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-4">קטגוריות</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div
              key={category.id}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="text-sm font-medium">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Price Range */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-4">טווח מחירים</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₪{priceRange[0]}</span>
            <span>₪{priceRange[1]}</span>
          </div>
        </div>
      </Card>

      {/* Brands */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-4">מותגים</h3>
        <div className="space-y-3">
          {brands.map(brand => (
            <div key={brand.id} className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox id={brand.id} />
              <label htmlFor={brand.id} className="text-sm font-medium cursor-pointer flex-1">
                {brand.name}
              </label>
              <span className="text-xs text-gray-500">({brand.count})</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Features */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-4">תכונות</h3>
        <div className="space-y-3">
          {features.map(feature => (
            <div key={feature.id} className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox id={feature.id} />
              <label htmlFor={feature.id} className="text-sm font-medium cursor-pointer flex-1">
                {feature.name}
              </label>
              <span className="text-xs text-gray-500">({feature.count})</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Clear Filters */}
      <button 
        className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
        onClick={() => {
          setSelectedCategory('all');
          setPriceRange([0, 5000]);
        }}
      >
        נקה את כל הפילטרים
      </button>
    </div>
  );
};

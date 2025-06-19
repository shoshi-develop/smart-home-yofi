
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedFeatures: string[];
  setSelectedFeatures: (features: string[]) => void;
}

export const ProductFilters = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedFeatures,
  setSelectedFeatures
}: ProductFiltersProps) => {
  const categories = [
    { id: 'all', name: 'כל הקטגוריות', count: 15 },
    { id: 'security', name: 'מצלמות אבטחה', count: 2 },
    { id: 'security-systems', name: 'מערכות אבטחה', count: 3 },
    { id: 'lighting', name: 'תאורה חכמה', count: 4 },
    { id: 'climate', name: 'בקרת אקלים', count: 2 },
    { id: 'audio', name: 'אודיו חכם', count: 2 },
    { id: 'entertainment', name: 'בידור', count: 2 }
  ];

  const brands = [
    { id: 'xiaomi', name: 'Xiaomi', count: 5 },
    { id: 'philips', name: 'Philips', count: 3 },
    { id: 'amazon', name: 'Amazon', count: 3 },
    { id: 'google', name: 'Google', count: 2 },
    { id: 'apple', name: 'Apple', count: 1 }
  ];

  const features = [
    { id: 'wifi', name: 'WiFi', count: 14 },
    { id: 'voice', name: 'בקרה קולית', count: 7 },
    { id: 'app', name: 'אפליקציה', count: 15 },
    { id: 'night-vision', name: 'ראיית לילה', count: 3 },
    { id: 'waterproof', name: 'עמיד למים', count: 1 }
  ];

  const handleBrandToggle = (brandId: string) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter(id => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 3000]);
    setSelectedBrands([]);
    setSelectedFeatures([]);
  };

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + 
    selectedBrands.length + selectedFeatures.length +
    (priceRange[0] !== 0 || priceRange[1] !== 3000 ? 1 : 0);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">מסננים</h3>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
              נקה הכל
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">קטגוריות</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <label 
                key={category.id}
                className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm text-gray-700">{category.name}</span>
                </div>
                <span className="text-xs text-gray-500">({category.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">טווח מחירים</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={3000}
              min={0}
              step={50}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₪{priceRange[0]}</span>
              <span>₪{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Brands */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">מותגים</h4>
          <div className="space-y-2">
            {brands.map(brand => (
              <label 
                key={brand.id}
                className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={() => handleBrandToggle(brand.id)}
                  />
                  <span className="text-sm text-gray-700">{brand.name}</span>
                </div>
                <span className="text-xs text-gray-500">({brand.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">תכונות</h4>
          <div className="space-y-2">
            {features.map(feature => (
              <label 
                key={feature.id}
                className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox
                    checked={selectedFeatures.includes(feature.id)}
                    onCheckedChange={() => handleFeatureToggle(feature.id)}
                  />
                  <span className="text-sm text-gray-700">{feature.name}</span>
                </div>
                <span className="text-xs text-gray-500">({feature.count})</span>
              </label>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

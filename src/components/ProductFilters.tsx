
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

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
    { id: 'all', name: 'כל המוצרים', count: 14 },
    { id: 'security', name: 'מצלמות אבטחה', count: 2 },
    { id: 'lighting', name: 'תאורה חכמה', count: 3 },
    { id: 'climate', name: 'בקרת אקלים', count: 2 },
    { id: 'audio', name: 'אודיו חכם', count: 2 },
    { id: 'entertainment', name: 'בידור חכם', count: 2 },
    { id: 'security-systems', name: 'מערכות אבטחה', count: 3 }
  ];

  const brands = [
    { id: 'xiaomi', name: 'Xiaomi', count: 6 },
    { id: 'philips', name: 'Philips Hue', count: 2 },
    { id: 'amazon', name: 'Amazon', count: 3 },
    { id: 'google', name: 'Google', count: 2 },
    { id: 'apple', name: 'Apple', count: 1 }
  ];

  const features = [
    { id: 'wifi', name: 'WiFi', count: 14 },
    { id: 'voice', name: 'שליטה קולית', count: 6 },
    { id: 'app', name: 'אפליקציה', count: 14 },
    { id: 'night-vision', name: 'ראיית לילה', count: 2 },
    { id: 'waterproof', name: 'עמיד למים', count: 1 }
  ];

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 5000]);
    setSelectedBrands([]);
    setSelectedFeatures([]);
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(
      selectedBrands.includes(brandId)
        ? selectedBrands.filter(id => id !== brandId)
        : [...selectedBrands, brandId]
    );
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(
      selectedFeatures.includes(featureId)
        ? selectedFeatures.filter(id => id !== featureId)
        : [...selectedFeatures, featureId]
    );
  };

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
                  ? 'bg-emerald-100 text-emerald-700' 
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
            max={3000}
            min={0}
            step={50}
            className="w-full"
            dir="ltr"
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
              <Checkbox 
                id={brand.id}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
              />
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
              <Checkbox 
                id={feature.id}
                checked={selectedFeatures.includes(feature.id)}
                onCheckedChange={() => toggleFeature(feature.id)}
              />
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
        className="w-full text-center text-sm text-emerald-600 hover:text-emerald-800 font-medium py-2 px-4 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
        onClick={handleClearFilters}
      >
        נקה את כל הפילטרים
      </button>
    </div>
  );
};

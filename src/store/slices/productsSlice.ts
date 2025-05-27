
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
}

interface ProductsState {
  products: Product[];
  categories: string[];
  filters: {
    category: string;
    priceRange: [number, number];
    searchTerm: string;
  };
}

const initialState: ProductsState = {
  products: [
    {
      id: '1',
      name: 'מצלמת אבטחה חכמה',
      price: 299,
      description: 'מצלמת אבטחה עם ראייה בלילה ותיעוד לענן',
      image: '/placeholder.svg',
      category: 'אבטחה',
      inStock: true,
    },
    {
      id: '2',
      name: 'נורת LED חכמה',
      price: 89,
      description: 'נורה חכמה עם שליטה מהטלפון',
      image: '/placeholder.svg',
      category: 'תאורה',
      inStock: true,
    },
    {
      id: '3',
      name: 'מזגן חכם',
      price: 1299,
      description: 'מזגן עם בקרת WiFi ובינה מלאכותית',
      image: '/placeholder.svg',
      category: 'אקלים',
      inStock: false,
    },
  ],
  categories: ['אבטחה', 'תאורה', 'אקלים', 'אודיו'],
  filters: {
    category: '',
    priceRange: [0, 2000],
    searchTerm: '',
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newProduct: Product = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.products.push(newProduct);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, setFilters } = productsSlice.actions;
export default productsSlice.reducer;

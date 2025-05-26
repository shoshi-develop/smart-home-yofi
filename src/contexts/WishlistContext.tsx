
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: any) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: any) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (!existingItem) {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          rating: product.rating,
          reviews: product.reviews
        }];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

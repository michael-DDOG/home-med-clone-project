import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  currentPrice?: number;
  originalPrice?: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  isLoading: boolean;
  addToCart: (product: {
    id: string;
    name: string;
    currentPrice?: number;
    originalPrice?: number;
    image?: string;
  }) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

// Create context with a default value to prevent undefined errors
const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  isLoading: false,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  console.log('🛒 useCart called, context:', context);
  
  // Extra safety check with detailed error
  if (!context || context.addToCart === undefined) {
    console.error('❌ Cart context is undefined or incomplete!');
    // Return a safe fallback instead of throwing
    return {
      items: [],
      itemCount: 0,
      isLoading: false,
      addToCart: async () => console.warn('Cart not ready'),
      updateQuantity: async () => console.warn('Cart not ready'),
      removeFromCart: async () => console.warn('Cart not ready'),
      clearCart: async () => console.warn('Cart not ready'),
    };
  }
  
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('🛒 CartProvider RENDERING - This should show up!');
  
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize cart immediately on mount
  useEffect(() => {
    console.log('🛒 CartProvider useEffect triggered');
    initializeCart();
  }, []);

  const initializeCart = async () => {
    console.log('🛒 STARTING cart initialization...');
    
    try {
      // Get or create session ID
      let sessionId = localStorage.getItem('cart_session_id');
      if (!sessionId) {
        sessionId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('cart_session_id', sessionId);
        console.log('🆕 Created new session:', sessionId);
      } else {
        console.log('🔍 Using existing session:', sessionId);
      }
      
      setSessionId(sessionId);
      
      // Load existing cart items
      const savedItems = localStorage.getItem(`cart_items_${sessionId}`);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        setItems(parsedItems);
        console.log('📦 Loaded', parsedItems.length, 'items from storage');
      }
      
      console.log('✅ Cart initialization complete');
      
    } catch (error) {
      console.error('❌ Cart initialization failed:', error);
    } finally {
      setIsLoading(false);
      console.log('🛒 Cart loading finished');
    }
  };

  const addToCart = async (product: {
    id: string;
    name: string;
    currentPrice?: number;
    originalPrice?: number;
    image?: string;
  }) => {
    console.log('🛒 Adding to cart:', product.name);
    
    if (!sessionId) {
      console.error('❌ No session ID available');
      return;
    }

    const priceToUse = product.currentPrice ?? 1.00;
    
    // Check if item already exists
    const existingItem = items.find(item => item.productId === product.id);
    
    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + 1);
      return;
    }

    // Create new cart item
    const newItem: CartItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      currentPrice: priceToUse,
      originalPrice: product.originalPrice,
      quantity: 1
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(updatedItems));
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to cart!`
    });
    
    console.log('✅ Item added to cart successfully');
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setItems(updatedItems);
    if (sessionId) {
      localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(updatedItems));
    }
  };

  const removeFromCart = async (itemId: string) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    
    if (sessionId) {
      localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(updatedItems));
    }
    
    toast({
      title: "Item removed",
      description: "Item removed from cart"
    });
  };

  const clearCart = async () => {
    setItems([]);
    if (sessionId) {
      localStorage.removeItem(`cart_items_${sessionId}`);
    }
    
    toast({
      title: "Cart cleared",
      description: "All items removed from cart"
    });
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const contextValue: CartContextType = {
    items,
    itemCount,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  console.log('🛒 CartProvider rendering with context:', contextValue);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
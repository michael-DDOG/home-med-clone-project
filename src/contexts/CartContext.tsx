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

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  console.log('🛒 useCart called, context available:', !!context);
  if (context === undefined) {
    console.error('❌ useCart called outside CartProvider!');
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('🛒 CartProvider rendering');
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log('🛒 CartProvider useEffect triggered');
    initializeSession();
  }, []);

  const initializeSession = async () => {
    console.log('🛒 STARTING cart initialization...');
    try {
      setIsLoading(true);
      console.log('🛒 Set loading to true');
      
      let sessionId = localStorage.getItem('cart_session_id');
      console.log('🛒 Retrieved sessionId from localStorage:', sessionId);
      
      if (!sessionId) {
        console.log('🆕 Creating new local session...');
        // Always use local session for simplicity
        sessionId = `local_${crypto.randomUUID()}`;
        console.log('✅ Local session created:', sessionId);
        localStorage.setItem('cart_session_id', sessionId);
      } else {
        console.log('🔍 Using existing session:', sessionId);
      }
      
      setSessionId(sessionId);
      console.log('🛒 Set sessionId state to:', sessionId);
      await loadCartItems(sessionId);
      console.log('🎉 Cart session initialized successfully');
      
    } catch (error) {
      console.error('❌ Session initialization failed:', error);
      // Create emergency local session
      const emergencySession = `local_${crypto.randomUUID()}`;
      setSessionId(emergencySession);
      localStorage.setItem('cart_session_id', emergencySession);
      setItems([]);
      console.log('🚨 Using emergency session:', emergencySession);
      toast({
        variant: "destructive",
        title: "Cart Notice",
        description: "Cart initialized in local mode."
      });
    } finally {
      console.log('🛒 Setting loading to false');
      setIsLoading(false);
    }
  };

  const loadCartItems = async (sessionId: string) => {
    try {
      console.log('📦 Loading cart items for session:', sessionId);
      
      // Always use local storage for cart items
      const localCart = localStorage.getItem(`cart_items_${sessionId}`);
      const items = localCart ? JSON.parse(localCart) : [];
      console.log('✅ Loaded cart items from local storage:', items.length, 'items');
      setItems(items);
      
    } catch (err) {
      console.error('❌ Error loading cart items:', err);
      setItems([]);
    }
  };

  const addToCart = async (product: {
    id: string;
    name: string;
    currentPrice?: number;
    originalPrice?: number;
    image?: string;
  }) => {
    if (!sessionId) {
      console.error('❌ No session ID available for cart operation');
      toast({
        variant: "destructive",
        title: "Cart Error",
        description: "Cart not ready. Please wait a moment and try again."
      });
      return;
    }

    console.log('🛒 Adding to cart:', product.name);
    
    // Use default price of $1.00 if not provided
    const priceToUse = product.currentPrice ?? 1.00;
    console.log('💰 Using price:', priceToUse);
    
    const existingItem = items.find(item => item.productId === product.id);
    
    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + 1);
      return;
    }

    try {
      // Always use local storage for cart operations
      const localItem: CartItem = {
        id: crypto.randomUUID(),
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        currentPrice: priceToUse,
        originalPrice: product.originalPrice,
        quantity: 1
      };
      
      const updatedItems = [...items, localItem];
      setItems(updatedItems);
      localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(updatedItems));
      toast({
        title: "Added to cart",
        description: `${product.name} added to cart!`
      });
      console.log('✅ Added to cart:', product.name);
      
    } catch (err) {
      console.error('❌ Failed to add to cart:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add to cart. Please try again."
      });
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      // Always use local storage
      const updatedItems = items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setItems(updatedItems);
      localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(updatedItems));
      
    } catch (err) {
      console.error('❌ Failed to update quantity:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update quantity. Please try again."
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      // Always use local storage
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
      localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(updatedItems));
      toast({
        title: "Item removed",
        description: "Item removed from cart"
      });
      
    } catch (err) {
      console.error('❌ Failed to remove item:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item. Please try again."
      });
    }
  };

  const clearCart = async () => {
    if (!sessionId) return;

    try {
      // Always use local storage
      setItems([]);
      localStorage.removeItem(`cart_items_${sessionId}`);
      toast({
        title: "Cart cleared",
        description: "All items removed from cart"
      });
      
    } catch (err) {
      console.error('❌ Failed to clear cart:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to clear cart. Please try again."
      });
    }
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
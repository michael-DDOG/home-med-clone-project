import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  currentPrice: number;
  originalPrice?: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  isLoading: boolean;
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize session
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      let storedSessionId = localStorage.getItem('cart_session_id');
      
      if (!storedSessionId) {
        const { data: newSession, error } = await supabase
          .from('user_sessions')
          .insert({})
          .select()
          .single();
        
        if (error) throw error;
        
        storedSessionId = newSession.id;
        localStorage.setItem('cart_session_id', storedSessionId);
      }
      
      setSessionId(storedSessionId);
      await loadCartItems(storedSessionId);
    } catch (error) {
      console.error('Error initializing session:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initialize cart session"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCartItems = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('session_id', sessionId);
      
      if (error) throw error;
      
      const cartItems: CartItem[] = data.map(item => ({
        id: item.id,
        productId: item.product_id,
        productName: item.product_name,
        productImage: item.product_image,
        currentPrice: parseFloat(item.current_price.toString()),
        originalPrice: item.original_price ? parseFloat(item.original_price.toString()) : undefined,
        quantity: item.quantity
      }));
      
      setItems(cartItems);
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const addToCart = async (newItem: Omit<CartItem, 'id'>) => {
    if (!sessionId) return;
    
    try {
      // Check if item already exists
      const existingItem = items.find(item => item.productId === newItem.productId);
      
      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + newItem.quantity);
      } else {
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            session_id: sessionId,
            product_id: newItem.productId,
            product_name: newItem.productName,
            product_image: newItem.productImage,
            current_price: newItem.currentPrice,
            original_price: newItem.originalPrice,
            quantity: newItem.quantity
          })
          .select()
          .single();
        
        if (error) throw error;
        
        const cartItem: CartItem = {
          id: data.id,
          productId: data.product_id,
          productName: data.product_name,
          productImage: data.product_image,
          currentPrice: parseFloat(data.current_price.toString()),
          originalPrice: data.original_price ? parseFloat(data.original_price.toString()) : undefined,
          quantity: data.quantity
        };
        
        setItems(prev => [...prev, cartItem]);
      }
      
      toast({
        title: "Added to cart",
        description: `${newItem.productName} has been added to your cart.`
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add item to cart"
      });
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', id);
      
      if (error) throw error;
      
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update quantity"
      });
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart."
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item"
      });
    }
  };

  const clearCart = async () => {
    if (!sessionId) return;
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('session_id', sessionId);
      
      if (error) throw error;
      
      setItems([]);
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart."
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to clear cart"
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
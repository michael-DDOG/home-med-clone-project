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
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      setIsLoading(true);
      console.log('🛒 Initializing cart session...');
      
      let sessionId = localStorage.getItem('cart_session_id');
      
      if (!sessionId) {
        console.log('🆕 Creating new session...');
        
        // Try to create session in database first
        const { data, error } = await supabase
          .from('user_sessions')
          .insert({})
          .select('id')
          .single();
        
        if (error) {
          console.warn('⚠️ Database session creation failed:', error.message);
          // Use local session as fallback
          sessionId = `local_${crypto.randomUUID()}`;
          console.log('🔄 Using local session fallback:', sessionId);
        } else {
          sessionId = data.id;
          console.log('✅ Database session created:', sessionId);
        }
        
        localStorage.setItem('cart_session_id', sessionId);
      } else {
        console.log('🔍 Using existing session:', sessionId);
      }
      
      setSessionId(sessionId);
      await loadCartItems(sessionId);
      console.log('🎉 Cart session initialized successfully');
      
    } catch (error) {
      console.error('❌ Session initialization failed:', error);
      // Create emergency local session
      const emergencySession = `emergency_${crypto.randomUUID()}`;
      setSessionId(emergencySession);
      localStorage.setItem('cart_session_id', emergencySession);
      setItems([]);
      toast({
        variant: "destructive",
        title: "Cart Error",
        description: "Using offline cart mode. Items will be saved locally."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCartItems = async (sessionId: string) => {
    try {
      console.log('📦 Loading cart items for session:', sessionId);
      
      // Skip database operations for local sessions
      if (sessionId.startsWith('local_') || sessionId.startsWith('emergency_')) {
        console.log('🏠 Local session detected, using local storage');
        const localCart = localStorage.getItem(`cart_items_${sessionId}`);
        const items = localCart ? JSON.parse(localCart) : [];
        setItems(items);
        return;
      }
      
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('session_id', sessionId);

      if (error) {
        console.warn('⚠️ Failed to load from database:', error.message);
        // Try to load from local storage as fallback
        const localCart = localStorage.getItem(`cart_items_${sessionId}`);
        const items = localCart ? JSON.parse(localCart) : [];
        setItems(items);
      } else {
        console.log('✅ Loaded cart items from database:', data?.length || 0, 'items');
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
      }
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
      // Handle local sessions
      if (sessionId.startsWith('local_') || sessionId.startsWith('emergency_')) {
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
        console.log('✅ Added to local cart:', product.name);
        return;
      }

      // Try database first
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          session_id: sessionId,
          product_id: product.id,
          product_name: product.name,
          product_image: product.image,
          current_price: priceToUse,
          original_price: product.originalPrice,
          quantity: 1
        })
        .select()
        .single();

      if (error) {
        console.warn('⚠️ Database insert failed, using local fallback:', error.message);
        // Fallback to local storage
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
        return;
      }

      console.log('✅ Added to database cart:', product.name);
      const cartItem: CartItem = {
        id: data.id,
        productId: data.product_id,
        productName: data.product_name,
        productImage: data.product_image,
        currentPrice: parseFloat(data.current_price.toString()),
        originalPrice: data.original_price ? parseFloat(data.original_price.toString()) : undefined,
        quantity: data.quantity
      };
      setItems(prevItems => [...prevItems, cartItem]);
      toast({
        title: "Added to cart",
        description: `${product.name} added to cart!`
      });
      
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
      // Handle local sessions
      if (sessionId?.startsWith('local_') || sessionId?.startsWith('emergency_')) {
        const updatedItems = items.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setItems(updatedItems);
        localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(updatedItems));
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) {
        console.warn('⚠️ Database update failed, using local fallback');
        // Fallback to local update
        const updatedItems = items.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setItems(updatedItems);
        localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(updatedItems));
        return;
      }
      
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
      
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
      // Handle local sessions
      if (sessionId?.startsWith('local_') || sessionId?.startsWith('emergency_')) {
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
        localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(updatedItems));
        toast({
          title: "Item removed",
          description: "Item removed from cart"
        });
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.warn('⚠️ Database delete failed, using local fallback');
        // Fallback to local removal
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
        localStorage.setItem(`cart_items_${sessionId}`, JSON.stringify(updatedItems));
        toast({
          title: "Item removed",
          description: "Item removed from cart"
        });
        return;
      }
      
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
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
      // Handle local sessions
      if (sessionId.startsWith('local_') || sessionId.startsWith('emergency_')) {
        setItems([]);
        localStorage.removeItem(`cart_items_${sessionId}`);
        toast({
          title: "Cart cleared",
          description: "All items removed from cart"
        });
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('session_id', sessionId);

      if (error) {
        console.warn('⚠️ Database clear failed, using local fallback');
        // Fallback to local clear
        setItems([]);
        localStorage.removeItem(`cart_items_${sessionId}`);
        toast({
          title: "Cart cleared",
          description: "All items removed from cart"
        });
        return;
      }
      
      setItems([]);
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
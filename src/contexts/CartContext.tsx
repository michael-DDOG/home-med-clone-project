import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  quantity: number;
  brand?: string;
  isFsaEligible?: boolean;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const total = newItems.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: newItems, total, itemCount };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: newItems, total, itemCount };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const total = newItems.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: newItems, total, itemCount };
    }
    
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0, itemCount: 0 };
    
    case 'SET_CART': {
      const total = action.payload.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: action.payload, total, itemCount };
    }
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  syncCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Generate or get session ID for guest users
const getSessionId = () => {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: false,
  });

  // Sync cart with database and localStorage
  const syncCart = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Authenticated user - sync with database
        const { data: cartItems, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        const items: CartItem[] = cartItems?.map(item => ({
          id: item.product_id,
          name: item.product_name,
          image: item.product_image,
          currentPrice: parseFloat(item.product_price.toString()),
          quantity: item.quantity,
        })) || [];
        
        dispatch({ type: 'SET_CART', payload: items });
      } else {
        // Guest user - use localStorage
        const savedCart = localStorage.getItem('shopping_cart');
        if (savedCart) {
          const items = JSON.parse(savedCart);
          dispatch({ type: 'SET_CART', payload: items });
        }
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Save cart to database or localStorage
  const saveCart = async (items: CartItem[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Clear existing cart items
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
        
        // Insert new cart items
        if (items.length > 0) {
          const cartData = items.map(item => ({
            user_id: user.id,
            product_id: item.id,
            product_name: item.name,
            product_image: item.image,
            product_price: item.currentPrice,
            quantity: item.quantity,
          }));
          
          await supabase.from('cart_items').insert(cartData);
        }
      } else {
        // Guest user - save to localStorage
        localStorage.setItem('shopping_cart', JSON.stringify(items));
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Save cart whenever items change
  useEffect(() => {
    saveCart(state.items);
  }, [state.items]);

  // Load cart on mount and auth changes
  useEffect(() => {
    syncCart();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      syncCart();
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    syncCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
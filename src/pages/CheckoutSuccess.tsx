
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [orderCleared, setOrderCleared] = useState(false);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear the cart after successful checkout
    if (sessionId && !orderCleared) {
      clearCart();
      setOrderCleared(true);
      console.log('✅ Cart cleared after successful checkout');
    }
  }, [sessionId, clearCart, orderCleared]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
          </p>
          
          {sessionId && (
            <div className="bg-gray-100 p-3 rounded-md">
              <p className="text-sm text-gray-500">Order Reference:</p>
              <p className="font-mono text-sm text-gray-800 break-all">
                {sessionId.slice(0, 20)}...
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <Link to="/">
              <Button className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Back to Store
              </Button>
            </Link>
          </div>
          
          <p className="text-xs text-gray-500 pt-4">
            You will receive a confirmation email shortly with your order details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;

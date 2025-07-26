
import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CheckoutCancel = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-orange-800">
            Checkout Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Your checkout was cancelled. No payment was processed and your items are still in your cart.
          </p>
          
          <div className="bg-orange-50 p-4 rounded-md">
            <p className="text-sm text-orange-800">
              💡 Your cart items have been saved. You can continue shopping or try checking out again.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link to="/">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 pt-4">
            Need help? Contact our customer support team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutCancel;

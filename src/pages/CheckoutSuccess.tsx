import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContextFallback';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        navigate('/');
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId }
        });

        if (error) throw error;

        setOrderDetails(data);
        
        // Clear cart on successful payment
        if (data.status === 'paid') {
          clearCart();
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, navigate, clearCart]);

  const handleCategorySelect = (category: string) => {
    navigate(category === 'all' ? '/' : `/category/${category}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCategorySelect={handleCategorySelect} />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!orderDetails || orderDetails.status !== 'paid') {
    return (
      <div className="min-h-screen bg-background">
        <Header onCategorySelect={handleCategorySelect} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
          <p className="text-muted-foreground mb-6">
            There was an issue with your payment. Please try again.
          </p>
          <Button onClick={() => navigate('/cart')}>Return to Cart</Button>
        </div>
      </div>
    );
  }

  const order = orderDetails.order;
  const session = orderDetails.session;

  return (
    <div className="min-h-screen bg-background">
      <Header onCategorySelect={handleCategorySelect} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been successfully processed.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{session.customer_email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-bold">${(session.amount_total / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="text-green-600 font-medium">Paid</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.order_items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.currentPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-green-500" />
                  <span>Payment confirmed and processed</span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-blue-500" />
                  <span>Order is being prepared for shipment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <span>You'll receive tracking information via email</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <Button onClick={() => navigate('/')} size="lg">
              Continue Shopping
            </Button>
            <p className="text-sm text-muted-foreground">
              Questions about your order? Contact us at (855) 466-3633
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
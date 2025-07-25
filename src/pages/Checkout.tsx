import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, CreditCard, User, UserCheck } from 'lucide-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const handleCategorySelect = (category: string) => {
    navigate(category === 'all' ? '/' : `/category/${category}`);
  };

  const handleCheckout = async (asGuest = false) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (asGuest && !guestEmail) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          cartItems: items,
          guestEmail: asGuest ? guestEmail : null,
          shippingInfo,
        }
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to create checkout session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkAuthStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  };

  useState(() => {
    checkAuthStatus();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCategorySelect={handleCategorySelect} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add some items to your cart before checking out.
          </p>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCategorySelect={handleCategorySelect} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Tabs defaultValue={isAuthenticated ? "authenticated" : "guest"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="guest" className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Guest Checkout
                </TabsTrigger>
                <TabsTrigger value="authenticated" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sign In
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="guest">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      Guest Checkout
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="guest-email">Email Address *</Label>
                        <Input
                          id="guest-email"
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="authenticated">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Sign In for Better Experience
                    </h2>
                    {!isAuthenticated ? (
                      <div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Sign in to save your order history and track shipments.
                        </p>
                        <Auth
                          supabaseClient={supabase}
                          appearance={{ theme: ThemeSupa }}
                          providers={[]}
                          view="sign_in"
                          showLinks={true}
                        />
                      </div>
                    ) : (
                      <p className="text-green-600">✓ You're signed in and ready to checkout!</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Shipping Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                      placeholder="NY"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
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

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{total >= 99 ? 'FREE' : '$9.99'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total >= 99 ? total.toFixed(2) : (total + 9.99).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {isAuthenticated ? (
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={() => handleCheckout(false)}
                      disabled={loading}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {loading ? 'Processing...' : 'Proceed to Payment'}
                    </Button>
                  ) : (
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={() => handleCheckout(true)}
                      disabled={loading || !guestEmail}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {loading ? 'Processing...' : 'Checkout as Guest'}
                    </Button>
                  )}
                  
                  <p className="text-xs text-muted-foreground text-center">
                    You'll be redirected to Stripe to complete your payment securely.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <CartSidebar />
    </div>
  );
};

export default Checkout;
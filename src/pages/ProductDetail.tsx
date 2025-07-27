import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  Heart, 
  Minus, 
  Plus, 
  ShoppingCart,
  ArrowLeft,
  Share2,
  Truck,
  Shield,
  Check,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  subcategory?: string;
  original_price?: number;
  current_price: number;
  discount_percentage?: number;
  image?: string;
  brand?: string;
  rating?: number;
  review_count?: number;
  in_stock?: boolean;
  free_shipping?: boolean;
  fsa_eligible?: boolean;
  patient_profile?: string[];
  features?: string[];
  specifications?: any;
}

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product data from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('No product ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        console.log('🔍 ProductDetail: Fetching product with ID:', productId);
        
        // Fetch the specific product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .maybeSingle();

        console.log('📦 ProductDetail: Supabase response:', { productData, productError });

        if (productError) {
          console.error('❌ Error fetching product:', productError);
          setError('Failed to load product');
          setLoading(false);
          return;
        }

        if (!productData) {
          setError('Product not found');
          setLoading(false);
          return;
        }

        setProduct(productData);

        // Fetch related products from the same category
        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('category', productData.category)
          .neq('id', productId)
          .limit(4);

        if (relatedError) {
          console.error('Error fetching related products:', relatedError);
        } else {
          setRelatedProducts(relatedData || []);
        }

      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCategorySelect={(category) => navigate(category === 'all' ? '/' : `/category/${category}`)} />
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  // Handle error or product not found
  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCategorySelect={(category) => navigate(category === 'all' ? '/' : `/category/${category}`)} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error === 'Product not found' ? 'Product Not Found' : 'Error Loading Product'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {error || 'The product you\'re looking for doesn\'t exist.'}
          </p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Product link copied to clipboard!');
  };

  // Generate product images (demo purposes)
  const productImages = [product.image, product.image, product.image, product.image];

  // Use actual pricing data from Supabase
  const currentPrice = product.current_price;
  const originalPrice = product.original_price || currentPrice;

  return (
    <div className="min-h-screen bg-background">
      <Header onCategorySelect={(category) => navigate(category === 'all' ? '/' : `/category/${category}`)} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="p-0 h-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-primary' : 'border-muted'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-4">by {product.brand || 'Medical Supply Co.'}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                   <span className="ml-2 text-sm text-muted-foreground">
                     ({product.review_count || 0} reviews)
                   </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">
                  ${currentPrice.toFixed(2)}
                </span>
                {originalPrice && originalPrice > currentPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="secondary">
                      Save ${(originalPrice - currentPrice).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>

              <div className="flex gap-2 mb-6">
                {product.fsa_eligible && (
                  <Badge className="bg-primary text-primary-foreground">FSA/HSA Eligible</Badge>
                )}
                {product.free_shipping && (
                  <Badge variant="outline">Free Shipping</Badge>
                )}
                <Badge className="bg-green-100 text-green-800">
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1" 
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlist}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free shipping on orders over $99</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                <span>FDA approved and certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.review_count || 0})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="mb-4">
                    {product.description || `${product.name} is a high-quality medical device designed to provide comfort, 
                    safety, and reliability for patients and caregivers. This product meets all 
                    FDA standards and is manufactured using premium materials.`}
                  </p>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    {product.features && product.features.length > 0 ? (
                      product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))
                    ) : (
                      <>
                        <li>Premium quality construction</li>
                        <li>Easy to use and maintain</li>
                        <li>Durable and long-lasting</li>
                        <li>FDA approved and certified</li>
                      </>
                    )}
                    {product.fsa_eligible && <li>FSA/HSA eligible purchase</li>}
                  </ul>
                  {product.patient_profile && product.patient_profile.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-2">Recommended for:</h4>
                      <p>{product.patient_profile.join(', ')}</p>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Product Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Brand:</span>
                        <span>{product.brand || 'Medical Supply Co.'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SKU:</span>
                        <span>{product.id.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Shipping & Returns</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Free Shipping:</span>
                        <span>{product.free_shipping ? 'Yes' : 'On orders $99+'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Return Policy:</span>
                        <span>30 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Warranty:</span>
                        <span>1 year manufacturer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{product.rating}</div>
                      <div className="flex items-center justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                       <div className="text-sm text-muted-foreground mt-1">
                         Based on {product.review_count || 0} reviews
                       </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        author: "Sarah M.",
                        rating: 5,
                        date: "2024-01-15",
                        title: "Excellent quality and fast delivery",
                        content: "This product exceeded my expectations. Great build quality and exactly as described."
                      },
                      {
                        id: 2,
                        author: "Robert K.",
                        rating: 4,
                        date: "2024-01-10", 
                        title: "Good value for money",
                        content: "Works well for my needs. Shipping was quick and packaging was secure."
                      }
                    ].map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.author}</span>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <h5 className="font-medium mb-1">{review.title}</h5>
                        <p className="text-muted-foreground">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  image={relatedProduct.image}
                  originalPrice={relatedProduct.original_price}
                  currentPrice={relatedProduct.current_price}
                  rating={relatedProduct.rating}
                  reviewCount={relatedProduct.review_count}
                  isStaffPick={false}
                  isFsaEligible={relatedProduct.fsa_eligible}
                  badges={[]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
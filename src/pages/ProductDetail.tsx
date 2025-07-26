import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  Shield, 
  Truck, 
  Heart, 
  Minus, 
  Plus, 
  ShoppingCart,
  ArrowLeft,
  Share2,
  Check
} from 'lucide-react';
import { allProducts } from '@/data/products';
import { toast } from 'sonner';

const ProductDetail = () => {
  console.log('🚨 ProductDetail component is rendering!');
  
  // Safely get URL parameters
  const params = useParams();
  const productId = params.productId;
  const navigate = useNavigate();
  
  console.log('🔗 Raw params:', params);
  console.log('🔗 Product ID from URL:', productId);
  console.log('📊 All products array length:', allProducts.length);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // CRITICAL FIX: Add error boundaries and detailed logging
  const product = useMemo(() => {
    try {
      console.log('🔍 Starting product lookup...');
      console.log('🔍 Looking for product with ID:', productId);
      console.log('🔍 ProductId type:', typeof productId);
      
      if (!productId) {
        console.log('❌ No productId provided in URL params');
        return null;
      }
      
      if (!allProducts || !Array.isArray(allProducts)) {
        console.log('❌ allProducts is not a valid array:', allProducts);
        return null;
      }
      
      console.log('🔍 Total products available:', allProducts.length);
      
      if (allProducts.length > 0) {
        console.log('🔍 First 10 product IDs:', allProducts.slice(0, 10).map(p => p.id));
        console.log('🔍 Sample product structure:', {
          id: allProducts[0].id,
          name: allProducts[0].name,
          keys: Object.keys(allProducts[0])
        });
      } else {
        console.log('❌ No products found in allProducts array!');
        return null;
      }
      
      // Search for exact match
      const foundProduct = allProducts.find(p => p.id === productId);
      console.log('🔍 Found exact match:', foundProduct ? 'YES' : 'NO');
      
      if (foundProduct) {
        console.log('✅ Product details:', {
          id: foundProduct.id,
          name: foundProduct.name,
          category: foundProduct.category
        });
      } else {
        console.log('❌ Product not found. Searching for similar IDs...');
        const similarIds = allProducts
          .map(p => p.id)
          .filter(id => id.includes(productId) || productId.includes(id))
          .slice(0, 5);
        console.log('🔍 Similar product IDs found:', similarIds);
      }
      
      return foundProduct || null;
      
    } catch (error) {
      console.error('💥 Error in product lookup:', error);
      return null;
    }
  }, [productId]);

  // Get related products safely
  const relatedProducts = useMemo(() => {
    try {
      if (!product || !allProducts || allProducts.length === 0) return [];
      
      return allProducts
        .filter(p => 
          p.id !== product.id && 
          (p.category === product.category || p.brand === product.brand)
        )
        .slice(0, 4);
    } catch (error) {
      console.error('Error getting related products:', error);
      return [];
    }
  }, [product]);

  // If no product found, show 404 with debugging info
  if (!product) {
    console.log('🚨 Rendering NotFound - Product is null/undefined');
    return (
      <div className="min-h-screen bg-background">
        <Header onCategorySelect={(category) => navigate(category === 'all' ? '/' : `/category/${category}`)} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product with ID "{productId}" doesn't exist.
          </p>
          <div className="text-sm text-muted-foreground mb-6">
            <p>Debug Info:</p>
            <p>Product ID: {productId}</p>
            <p>Total Products: {allProducts?.length || 0}</p>
            <p>URL Params: {JSON.stringify(params)}</p>
          </div>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  console.log('✅ Rendering product details for:', product.name);

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

  // Generate additional product images (for demo purposes)
  const productImages = [
    product.image,
    product.image, // In real app, these would be different angles
    product.image,
    product.image
  ];

  const reviews = [
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
    },
    {
      id: 3,
      author: "Maria L.",
      rating: 5,
      date: "2024-01-05",
      title: "Highly recommended",
      content: "Perfect for my daily use. The customer service was also very helpful."
    }
  ];

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
                    selectedImageIndex === index ? 'border-primary' : 'border-gray-200'
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
                        i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {(product.currentPrice || product.originalPrice) && (
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ${product.currentPrice ? product.currentPrice.toFixed(2) : '1.00'}
                  </span>
                  {product.originalPrice && product.originalPrice > (product.currentPrice || 0) && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <Badge variant="secondary">
                        Save ${((product.originalPrice - (product.currentPrice || 0))).toFixed(2)}
                      </Badge>
                    </>
                  )}
                </div>
              )}

              <div className="flex gap-2 mb-6">
                {product.isFsaEligible && (
                  <Badge className="bg-medical-blue text-white">FSA/HSA Eligible</Badge>
                )}
                {product.freeShipping && (
                  <Badge variant="outline">Free Shipping</Badge>
                )}
                <Badge className="bg-green-100 text-green-800">In Stock</Badge>
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
                <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="mb-4">
                    {product.name} is a high-quality medical device designed to provide comfort, 
                    safety, and reliability for patients and caregivers. This product meets all 
                    FDA standards and is manufactured using premium materials.
                  </p>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li>Premium quality construction</li>
                    <li>Easy to use and maintain</li>
                    <li>Durable and long-lasting</li>
                    <li>FDA approved and certified</li>
                    {product.isFsaEligible && <li>FSA/HSA eligible purchase</li>}
                  </ul>
                  {product.conditionsHelped && product.conditionsHelped.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-2">Helps with:</h4>
                      <p>{product.conditionsHelped.join(', ')}</p>
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
                        <span>{product.freeShipping ? 'Yes' : 'On orders $99+'}</span>
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
                              i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Based on {product.reviewCount} reviews
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.title}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          By {review.author} on {new Date(review.date).toLocaleDateString()}
                        </div>
                        <p className="text-sm">{review.content}</p>
                        <Separator />
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
                <ProductCard key={relatedProduct.id} {...relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
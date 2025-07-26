import { useState, useMemo } from 'react';
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
  Check
} from 'lucide-react';
import { allProducts } from '@/data/products';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find the product
  const product = useMemo(() => {
    console.log('ProductDetail: Looking for productId:', productId);
    console.log('ProductDetail: allProducts length:', allProducts.length);
    console.log('ProductDetail: Sample product IDs:', allProducts.slice(0, 5).map(p => p.id));
    
    if (!productId || !allProducts.length) {
      console.log('ProductDetail: No productId or empty allProducts');
      return null;
    }
    
    const foundProduct = allProducts.find(p => p.id === productId);
    console.log('ProductDetail: Found product:', foundProduct ? foundProduct.name : 'NOT FOUND');
    
    return foundProduct || null;
  }, [productId]);

  // Get related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCategorySelect={(category) => navigate(category === 'all' ? '/' : `/category/${category}`)} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
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

  // Generate pricing data
  const basePrice = Math.floor(Math.random() * 500) + 50;
  const discountPercent = Math.floor(Math.random() * 30) + 10;
  const currentPrice = basePrice * (1 - discountPercent / 100);

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
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">
                  ${currentPrice.toFixed(2)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${basePrice.toFixed(2)}
                </span>
                <Badge variant="secondary">
                  Save ${(basePrice - currentPrice).toFixed(2)}
                </Badge>
              </div>

              <div className="flex gap-2 mb-6">
                {product.isFsaEligible && (
                  <Badge className="bg-primary text-primary-foreground">FSA/HSA Eligible</Badge>
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
                              i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Based on {product.reviewCount} reviews
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
                  originalPrice={relatedProduct.originalPrice}
                  currentPrice={relatedProduct.currentPrice}
                  rating={relatedProduct.rating}
                  reviewCount={relatedProduct.reviewCount}
                  isStaffPick={relatedProduct.isStaffPick}
                  isFsaEligible={relatedProduct.isFsaEligible}
                  badges={relatedProduct.badges}
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  originalPrice?: number;
  currentPrice: number;
  rating: number;
  reviewCount: number;
  isStaffPick?: boolean;
  isFsaEligible?: boolean;
  badges?: string[];
}

export const ProductCard = ({
  id,
  name,
  image,
  originalPrice,
  currentPrice,
  rating,
  reviewCount,
  isStaffPick = false,
  isFsaEligible = false,
  badges = []
}: ProductCardProps) => {
  const navigate = useNavigate();
  
  // Use try-catch to handle potential context issues
  let addToCart;
  try {
    const cart = useCart();
    addToCart = cart.addToCart;
  } catch (error) {
    console.error('Cart context not available in ProductCard:', error);
    // Fallback function
    addToCart = async () => {
      toast.success(`${name} would be added to cart (cart not ready)`);
    };
  }
  
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    if (addToCart) {
      await addToCart({
        productId: id,
        productName: name,
        productImage: image,
        currentPrice: currentPrice,
        originalPrice: originalPrice,
        quantity: 1
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={image} 
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isStaffPick && (
              <Badge variant="destructive" className="bg-price-red">
                STAFF PICK
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="bg-price-red">
                -{discount}%
              </Badge>
            )}
            {badges.map((badge, index) => (
              <Badge key={index} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>

          {isFsaEligible && (
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-medical-light text-medical-blue border-medical-blue">
                FSA/HSA Eligible
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-primary">
              ${currentPrice.toFixed(2)}
            </span>
          </div>

          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
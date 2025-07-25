import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  image: string;
  title: string;
  onClick: () => void;
  className?: string;
}

export const CategoryCard = ({ image, title, onClick, className = "" }: CategoryCardProps) => {
  return (
    <Card 
      className={`group cursor-pointer overflow-hidden border-2 border-transparent hover:border-medical-blue transition-all duration-300 hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        </div>
        <div className="p-4 text-center bg-white">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-medical-blue transition-colors duration-300">
            {title}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};
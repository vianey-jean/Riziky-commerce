
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/mockData';
import { useShop } from '@/context/ShopContext';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, toggleFavorite, favorites } = useShop();
  const isFavorite = favorites.includes(product.id);

  return (
    <div className="product-card bg-background border rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <Link to={`/produit/${product.id}`}>
          <div className="h-64 bg-accent/30 flex items-center justify-center overflow-hidden">
            {/* Image placeholder - replace with actual product image */}
            <div className="text-sm text-muted-foreground">Image du produit</div>
          </div>
        </Link>

        {product.stock <= 0 && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            Rupture de stock
          </Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm ${
            isFavorite ? 'text-primary' : 'text-muted-foreground'
          }`}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </Button>
      </div>

      <div className="p-4">
        <Link to={`/produit/${product.id}`} className="block">
          <h3 className="text-lg font-medium line-clamp-1 mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(product.stars) ? 'text-yellow-500' : 'text-muted-foreground'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviews.length})
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
          
          <Button
            variant="outline"
            size="sm"
            className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => addToCart(product.id)}
            disabled={product.stock <= 0}
          >
            <ShoppingCart size={16} className="mr-1" />
            <span>Ajouter</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

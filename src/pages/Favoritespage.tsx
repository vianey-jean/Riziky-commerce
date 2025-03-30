
import { useNavigate } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, getProductById, addToCart, toggleFavorite } = useShop();
  
  const favoriteProducts = favorites
    .map(id => getProductById(id))
    .filter(product => product !== undefined);
  
  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-accent/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Aucun favori</h1>
          <p className="text-muted-foreground mb-8">
            Vous n'avez pas encore ajouté de produits à vos favoris.
          </p>
          <Button onClick={() => navigate('/produits')}>
            Parcourir les produits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mes Favoris</h1>
          <p className="text-muted-foreground">
            {favorites.length} produit(s) dans vos favoris
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteProducts.map((product) => {
          if (!product) return null;
          
          return (
            <Card key={product.id} className="relative overflow-hidden">
              <div 
                className="absolute top-2 right-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
              >
                <Button variant="ghost" size="icon" className="text-primary">
                  <Heart size={18} fill="currentColor" />
                </Button>
              </div>
              
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/produit/${product.id}`)}
              >
                <div className="h-48 bg-accent/30 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Image du produit</span>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                  <CardDescription>
                    <div className="flex text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.floor(product.stars) ? 'text-yellow-500' : 'text-muted-foreground'}>
                          ★
                        </span>
                      ))}
                      <span className="ml-1 text-muted-foreground">
                        ({product.reviews.length})
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="text-lg font-bold mb-2">
                    {product.price.toFixed(2)} €
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {product.description}
                  </p>
                </CardContent>
              </div>
              
              <CardFooter className="flex justify-between pt-0">
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
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Trash2 size={16} className="mr-1" />
                      <span>Retirer</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Retirer des favoris?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Voulez-vous vraiment retirer ce produit de vos favoris?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={() => toggleFavorite(product.id)}>
                        Retirer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesPage;

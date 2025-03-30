
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
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

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    getProductById, 
    updateCartQuantity, 
    removeFromCart,
    getCartTotal,
    getCartItemsCount
  } = useShop();
  
  const cartItemsCount = getCartItemsCount();
  const cartTotal = getCartTotal();
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-8">
            Vous n'avez pas encore ajouté de produits à votre panier.
          </p>
          <Button onClick={() => navigate('/produits')}>
            Parcourir les produits
          </Button>
        </div>
      </div>
    );
  }

  const handleDecrementQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity <= 1) {
      // Ne pas mettre à jour tout de suite, l'AlertDialog s'en chargera si l'utilisateur confirme
      return;
    }
    updateCartQuantity(productId, currentQuantity - 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => {
            const product = getProductById(item.id);
            if (!product) return null;
            
            return (
              <div key={item.id} className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                {/* Product Image */}
                <div className="w-full sm:w-24 h-24 bg-accent/30 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Image</span>
                </div>
                
                {/* Product Details */}
                <div className="flex-grow">
                  <Link to={`/produit/${product.id}`} className="font-medium hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                  <div className="text-sm text-muted-foreground mt-1">
                    Catégorie: {product.category}
                  </div>
                  <div className="font-bold mt-2">
                    {product.price.toFixed(2)} €
                  </div>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center">
                  {item.quantity <= 1 ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                        >
                          <Minus size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer ce produit?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Voulez-vous vraiment supprimer ce produit de votre panier?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeFromCart(item.id)}>
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleDecrementQuantity(item.id, item.quantity)}
                    >
                      <Minus size={14} />
                    </Button>
                  )}
                  
                  <span className="w-10 text-center">{item.quantity}</span>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={14} />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 ml-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer ce produit?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Voulez-vous vraiment supprimer ce produit de votre panier?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => removeFromCart(item.id)}>
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 bg-accent/10 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total ({cartItemsCount} articles)</span>
                <span>{cartTotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Livraison</span>
                <span>Gratuit</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{cartTotal.toFixed(2)} €</span>
              </div>
            </div>
            
            <Button className="w-full" onClick={() => navigate('/paiement')}>
              Passer à la caisse
              <ArrowRight size={16} className="ml-2" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full mt-4"
              onClick={() => navigate('/produits')}
            >
              Continuer mes achats
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

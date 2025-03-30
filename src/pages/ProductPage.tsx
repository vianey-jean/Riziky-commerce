
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import LoadingSpinner from '@/components/ui/loading-spinner';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, products, addToCart, toggleFavorite, favorites, isLoading, error } = useShop();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id || '');
  
  // Afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Afficher un message d'erreur
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Erreur</h2>
        <p className="mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Réessayer
        </Button>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="text-muted-foreground mb-6">
          Le produit que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
      </div>
    );
  }
  
  const isFavorite = favorites.includes(product.id);
  
  // Produits similaires de la même catégorie
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} className="mr-2" />
        Retour
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="bg-accent/30 rounded-lg p-4 flex items-center justify-center h-[400px] md:h-[500px]">
          <div className="text-muted-foreground">Image du produit</div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.floor(product.stars) ? 'text-yellow-500' : 'text-muted-foreground'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {product.stars.toFixed(1)} ({product.reviews.length} avis)
            </span>
          </div>
          
          <div className="text-2xl font-bold mb-6">
            {product.price.toFixed(2)} €
          </div>
          
          <p className="text-muted-foreground mb-6">
            {product.description}
          </p>
          
          <div className="mb-8">
            <div className="text-sm font-medium mb-2">Catégorie:</div>
            <Link 
              to={`/categorie/${product.category}`}
              className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm hover:bg-accent/80 transition-colors"
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
          </div>
          
          <div className="mb-8">
            <div className="text-sm font-medium mb-2">Quantité:</div>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="w-16 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={increaseQuantity}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              className="flex-1" 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart size={18} className="mr-2" />
              {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className={isFavorite ? 'text-primary' : ''}
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </Button>
          </div>
          
          {product.stock <= 5 && product.stock > 0 && (
            <div className="mt-4 text-sm text-amber-600">
              Il ne reste plus que {product.stock} article(s) en stock !
            </div>
          )}
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Spécifications</TabsTrigger>
          <TabsTrigger value="reviews">Avis ({product.reviews.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="pt-4">
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="pt-4">
          <ul className="space-y-2">
            {product.specifications.map((spec, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                {spec}
              </li>
            ))}
          </ul>
        </TabsContent>
        
        <TabsContent value="reviews" className="pt-4">
          {product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map(review => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{review.userName}</div>
                    <div className="text-sm text-muted-foreground">{review.date}</div>
                  </div>
                  <div className="flex text-yellow-500 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-muted-foreground'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucun avis pour ce produit</p>
              <Button variant="outline" className="mt-4">
                Laisser un avis
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <ProductGrid 
          products={similarProducts} 
          title="Produits similaires" 
        />
      )}
    </div>
  );
};

export default ProductPage;

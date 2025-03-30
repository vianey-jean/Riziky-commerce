
import { useParams } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner';

const categoryNames: Record<string, string> = {
  'perruque': 'Perruques',
  'tissage': 'Tissages',
  'peigne': 'Peignes Chauffants',
  'queue-de-cheval': 'Queues de Cheval'
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { getProductsByCategory, isLoading, error } = useShop();
  
  const products = getProductsByCategory(category || '');
  const categoryName = categoryNames[category || ''] || 'Produits';
  
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
          <p className="text-muted-foreground">
            Découvrez notre sélection de {categoryName.toLowerCase()}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <span className="text-sm text-muted-foreground mr-2">Trier par:</span>
          <Button variant="outline" size="sm">
            Prix croissant
          </Button>
        </div>
      </div>
      
      <ProductGrid products={products} />
    </div>
  );
};

export default CategoryPage;

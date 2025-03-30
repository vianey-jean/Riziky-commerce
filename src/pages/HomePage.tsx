
import { useShop } from '@/context/ShopContext';
import ProductGrid from '@/components/product/ProductGrid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/loading-spinner';

const HomePage = () => {
  const { getFeaturedProducts, products, isLoading, error } = useShop();
  const featuredProducts = getFeaturedProducts();

  const categories = [
    { name: "Perruques", slug: "perruque", description: "Des perruques naturelles de qualité supérieure" },
    { name: "Tissages", slug: "tissage", description: "Tissages en cheveux naturels ou synthétiques" },
    { name: "Peignes Chauffants", slug: "peigne", description: "Accessoires pour un coiffage rapide et efficace" },
    { name: "Queues de Cheval", slug: "queue-de-cheval", description: "Extensions pour un look élégant sans effort" },
  ];

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
    <div>
      {/* Hero Section */}
      <section className="bg-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <Badge variant="outline" className="mb-4">
              Nouvelle Collection
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sublimez Votre Beauté Naturelle
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Découvrez notre sélection de perruques, tissages et accessoires capillaires de haute qualité pour révéler votre beauté naturelle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/produits">Voir les produits</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/a-propos">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <ProductGrid products={featuredProducts} title="Produits Populaires" />
      </section>

      {/* Categories */}
      <section className="bg-accent/50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Nos Catégories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.slug}
                to={`/categorie/${category.slug}`}
                className="bg-background p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-medium">Icon</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{category.name}</h3>
                <p className="text-muted-foreground text-sm">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary">✓</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Produits de Qualité</h3>
            <p className="text-muted-foreground">
              Des produits soigneusement sélectionnés pour leur qualité et leur durabilité.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary">✓</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Livraison Rapide</h3>
            <p className="text-muted-foreground">
              Livraison sous 48h pour que vous puissiez profiter rapidement de vos produits.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary">✓</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Service Client Premium</h3>
            <p className="text-muted-foreground">
              Une équipe à votre écoute pour vous conseiller et répondre à vos questions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

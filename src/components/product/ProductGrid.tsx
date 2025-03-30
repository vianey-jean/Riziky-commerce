
import ProductCard from './ProductCard';
import { Product } from '@/data/mockData';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl font-medium mb-4">Aucun produit trouvé</h2>
        <p className="text-muted-foreground">
          Aucun produit ne correspond à votre recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

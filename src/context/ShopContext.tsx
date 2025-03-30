
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, User } from '@/data/mockData';
import { toast } from 'sonner';
import { productService, authService } from '@/services/api';

export interface CartItem {
  id: string;
  quantity: number;
}

interface ShopContextType {
  products: Product[];
  currentUser: User | null;
  cart: CartItem[];
  favorites: string[];
  searchResults: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: () => Product[];
  isLoading: boolean;
  error: string | null;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les produits depuis l'API au démarrage
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des produits:', err);
        setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
        // Fallback aux données mockées en cas d'erreur
        import('@/data/mockData').then(module => {
          setProducts(module.products);
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Simuler une recherche de produits
  useEffect(() => {
    if (searchQuery.length >= 3) {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  // Fonctions du panier
  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (product.stock <= 0) {
      toast.error("Ce produit est en rupture de stock");
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
    
    toast.success("Produit ajouté au panier");
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.info("Produit retiré du panier");
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Fonctions des favoris
  const toggleFavorite = (productId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        toast.info("Retiré des favoris");
        return prevFavorites.filter(id => id !== productId);
      } else {
        toast.success("Ajouté aux favoris");
        return [...prevFavorites, productId];
      }
    });
  };

  // Authentification avec l'API
  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setCurrentUser(user);
      setFavorites(user.favorites);
      toast.success(`Bienvenue, ${user.firstName}!`);
      return true;
    } catch (error) {
      toast.error("Email ou mot de passe incorrect");
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setFavorites([]);
    toast.info("Vous êtes déconnecté");
  };

  // Fonctions des produits
  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  // Correction de la fonction getFeaturedProducts pour s'assurer qu'elle fonctionne même si products n'est pas un tableau
  const getFeaturedProducts = () => {
    if (!Array.isArray(products)) {
      console.error('products is not an array:', products);
      return []; // Retourner un tableau vide en cas d'erreur
    }
    return products.filter(product => product.featured === true);
  };

  const value = {
    products,
    currentUser,
    cart,
    favorites,
    searchResults,
    searchQuery,
    setSearchQuery,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleFavorite,
    getCartTotal,
    getCartItemsCount,
    login,
    logout,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    isLoading,
    error
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

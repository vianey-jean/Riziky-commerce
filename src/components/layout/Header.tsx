
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import { Search, ShoppingCart, Heart, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { 
    cart, 
    getCartItemsCount, 
    favorites, 
    currentUser, 
    logout,
    searchQuery,
    setSearchQuery,
    searchResults
  } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();

  const cartCount = getCartItemsCount();
  
  // Fermer la recherche si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById('search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Beauté Riziky
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-8`}>
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <div className="relative group">
              <span className="text-foreground hover:text-primary transition-colors cursor-pointer">
                Catégories
              </span>
              <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg hidden group-hover:block animate-fade-in min-w-[200px] z-10">
                <Link to="/categorie/perruque" className="block px-4 py-2 hover:bg-accent transition-colors">
                  Perruques
                </Link>
                <Link to="/categorie/tissage" className="block px-4 py-2 hover:bg-accent transition-colors">
                  Tissages
                </Link>
                <Link to="/categorie/peigne" className="block px-4 py-2 hover:bg-accent transition-colors">
                  Peignes Chauffants
                </Link>
                <Link to="/categorie/queue-de-cheval" className="block px-4 py-2 hover:bg-accent transition-colors">
                  Queues de Cheval
                </Link>
              </div>
            </div>
            <Link to="/a-propos" className="text-foreground hover:text-primary transition-colors">
              À Propos
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div id="search-container" className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className="text-foreground hover:text-primary transition-colors"
              >
                <Search size={20} />
              </button>
              
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-background border border-border rounded-md shadow-lg p-2 z-10 animate-fade-in">
                  <div className="flex items-center border rounded-md p-1">
                    <Search size={18} className="text-muted-foreground ml-1" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher..."
                      className="ml-2 flex-1 outline-none bg-transparent"
                      autoFocus
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSearchQuery('')}
                        className="h-6 w-6"
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                  
                  {searchQuery.length >= 3 && searchResults.length > 0 && (
                    <div className="search-results mt-2">
                      {searchResults.map(product => (
                        <Link 
                          key={product.id}
                          to={`/produit/${product.id}`}
                          className="flex items-center p-2 hover:bg-accent rounded-md"
                          onClick={() => setSearchOpen(false)}
                        >
                          <div className="w-10 h-10 bg-accent rounded-md flex-shrink-0"></div>
                          <div className="ml-2 truncate">{product.name}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {searchQuery.length >= 3 && searchResults.length === 0 && (
                    <div className="p-2 text-sm text-muted-foreground">
                      Aucun produit trouvé
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User */}
            <div className="relative group">
              <Link to={currentUser ? "/profil" : "/connexion"} className="text-foreground hover:text-primary transition-colors">
                <User size={20} />
              </Link>
              {currentUser && (
                <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-md shadow-lg hidden group-hover:block animate-fade-in min-w-[150px] z-10">
                  <div className="px-4 py-2 text-sm font-medium border-b">
                    {currentUser.firstName} {currentUser.lastName}
                  </div>
                  <Link to="/profil" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                    Mon Profil
                  </Link>
                  {currentUser.isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                      Administration
                    </Link>
                  )}
                  <button 
                    onClick={logout} 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors text-destructive"
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>

            {/* Favorites */}
            <Link to="/favoris" className="text-foreground hover:text-primary transition-colors relative">
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/panier" className="text-foreground hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-foreground hover:text-primary transition-colors" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-3 border-t pt-3 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <div className="relative">
                <span className="text-foreground font-medium">Catégories</span>
                <div className="ml-4 mt-2 flex flex-col space-y-2">
                  <Link 
                    to="/categorie/perruque" 
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Perruques
                  </Link>
                  <Link 
                    to="/categorie/tissage" 
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Tissages
                  </Link>
                  <Link 
                    to="/categorie/peigne" 
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Peignes Chauffants
                  </Link>
                  <Link 
                    to="/categorie/queue-de-cheval" 
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Queues de Cheval
                  </Link>
                </div>
              </div>
              <Link 
                to="/a-propos" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                À Propos
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;


import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Link to="/" className="text-2xl font-bold mb-4 block">
              Beauté Riziky
            </Link>
            <p className="text-sm opacity-90 mb-4">
              Votre boutique spécialisée en perruques, tissages, peignes chauffants et queues de cheval de haute qualité.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-primary-foreground hover:opacity-80 transition-opacity">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-foreground hover:opacity-80 transition-opacity">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-foreground hover:opacity-80 transition-opacity">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Catégories</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/categorie/perruque" className="hover:opacity-100 transition-opacity">
                  Perruques
                </Link>
              </li>
              <li>
                <Link to="/categorie/tissage" className="hover:opacity-100 transition-opacity">
                  Tissages
                </Link>
              </li>
              <li>
                <Link to="/categorie/peigne" className="hover:opacity-100 transition-opacity">
                  Peignes Chauffants
                </Link>
              </li>
              <li>
                <Link to="/categorie/queue-de-cheval" className="hover:opacity-100 transition-opacity">
                  Queues de Cheval
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/a-propos" className="hover:opacity-100 transition-opacity">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/livraison" className="hover:opacity-100 transition-opacity">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/conditions-generales" className="hover:opacity-100 transition-opacity">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="hover:opacity-100 transition-opacity">
                  Politique de Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>contact@beaute-riziky.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Beauté Riziky. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

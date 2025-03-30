
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const OrderConfirmationPage = () => {
  const orderNumber = `BR${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Commande Confirmée!</h1>
        
        <p className="text-muted-foreground mb-6">
          Merci pour votre commande. Un e-mail de confirmation a été envoyé à votre adresse email.
        </p>
        
        <div className="bg-accent/30 p-4 rounded-lg mb-6">
          <p className="text-sm font-medium">Numéro de commande:</p>
          <p className="text-lg font-bold">{orderNumber}</p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/suivi-commande">Suivre ma commande</Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

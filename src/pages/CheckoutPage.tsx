
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, AlertTriangle } from 'lucide-react';
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
import { toast } from 'sonner';
import PaymentMethodForm from '@/components/checkout/PaymentMethodForm';

type PaymentMethod = 'card' | 'paypal' | 'other';
type CheckoutStep = 'details' | 'payment';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getProductById, getCartTotal, clearCart } = useShop();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('details');
  
  const cartTotal = getCartTotal();
  
  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!firstName || !lastName || !email || !address || !city || !zip) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    // Passer à l'étape de paiement
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    // Commande finalisée
    clearCart();
    navigate('/confirmation');
  };

  const handleBackToDetails = () => {
    setCurrentStep('details');
  };

  const handleCancelPayment = () => {
    // Le panier reste intact, retour à l'accueil
    navigate('/');
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-8">
          Vous devez ajouter des produits à votre panier avant de procéder au paiement.
        </p>
        <Button onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => currentStep === 'details' ? navigate('/panier') : handleBackToDetails()}
      >
        <ArrowLeft size={16} className="mr-2" />
        {currentStep === 'details' ? 'Retour au panier' : 'Retour aux informations'}
      </Button>
      
      <h1 className="text-3xl font-bold mb-8">
        {currentStep === 'details' ? 'Finaliser votre commande' : 'Procéder au paiement'}
      </h1>
      
      {currentStep === 'details' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de paiement */}
          <div className="lg:col-span-2">
            <form onSubmit={handleDetailsSubmit}>
              <div className="space-y-6">
                {/* Informations personnelles */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>
                      Entrez vos informations de contact et de livraison
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input 
                        id="firstName" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input 
                        id="lastName" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input 
                        id="address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Ville *</Label>
                      <Input 
                        id="city" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">Code postal *</Label>
                      <Input 
                        id="zip" 
                        value={zip} 
                        onChange={(e) => setZip(e.target.value)} 
                        required 
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Méthode de paiement */}
                <Card>
                  <CardHeader>
                    <CardTitle>Méthode de paiement</CardTitle>
                    <CardDescription>
                      Choisissez votre méthode de paiement préférée
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center">
                          <CreditCard size={16} className="mr-2" />
                          Carte bancaire
                        </Label>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Autre méthode (Orange Money, Western Union)</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">Annuler le paiement</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Annuler le paiement?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Voulez-vous vraiment annuler le paiement? Les produits resteront dans votre panier.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Non, continuer</AlertDialogCancel>
                          <AlertDialogAction onClick={handleCancelPayment}>
                            Oui, annuler
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button type="submit">Continuer vers le paiement</Button>
                  </CardFooter>
                </Card>
              </div>
            </form>
          </div>
          
          {/* Récapitulatif de commande */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map(item => {
                  const product = getProductById(item.id);
                  if (!product) return null;
                  
                  return (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x {product.price.toFixed(2)} €
                        </p>
                      </div>
                      <p className="font-medium">
                        {(product.price * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  );
                })}
                
                <Separator />
                
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Sous-total</p>
                  <p>{cartTotal.toFixed(2)} €</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Livraison</p>
                  <p>Gratuit</p>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>{cartTotal.toFixed(2)} €</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PaymentMethodForm 
                paymentMethod={paymentMethod}
                onBack={handleBackToDetails}
                onSuccess={handlePaymentSuccess}
              />
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Informations client</p>
                    <p className="text-sm">{firstName} {lastName}</p>
                    <p className="text-sm">{email}</p>
                    <p className="text-sm">{address}</p>
                    <p className="text-sm">{zip} {city}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>{cartTotal.toFixed(2)} €</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

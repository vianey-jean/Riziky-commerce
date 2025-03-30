
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArrowLeft, CreditCard, AlertCircle } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface PaymentMethodFormProps {
  paymentMethod: 'card' | 'paypal' | 'other';
  onBack: () => void;
  onSuccess: () => void;
}

const PaymentMethodForm = ({ paymentMethod, onBack, onSuccess }: PaymentMethodFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Schéma de validation différent selon la méthode de paiement
  const getValidationSchema = () => {
    switch (paymentMethod) {
      case 'card':
        return z.object({
          cardNumber: z.string().min(16, 'Numéro de carte invalide').max(19),
          cardName: z.string().min(3, 'Nom du titulaire requis'),
          expiryDate: z.string().min(5, 'Date d\'expiration invalide').max(5),
          cvv: z.string().min(3, 'CVV invalide').max(4),
        });
      case 'paypal':
        return z.object({
          email: z.string().email('Email PayPal invalide'),
          password: z.string().min(8, 'Mot de passe requis'),
        });
      case 'other':
        return z.object({
          transactionId: z.string().min(5, 'ID de transaction requis'),
          contactPhone: z.string().min(10, 'Numéro de téléphone requis'),
        });
      default:
        return z.object({});
    }
  };

  const form = useForm({
    resolver: zodResolver(getValidationSchema()),
    defaultValues: 
      paymentMethod === 'card' 
        ? { cardNumber: '', cardName: '', expiryDate: '', cvv: '' }
        : paymentMethod === 'paypal'
        ? { email: '', password: '' }
        : { transactionId: '', contactPhone: '' }
  });

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simulation d'un appel API de paiement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Paiement réussi
      toast.success('Paiement traité avec succès!');
      onSuccess();
    } catch (error) {
      toast.error('Erreur lors du traitement du paiement');
      console.error('Erreur de paiement:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCardForm = () => (
    <>
      <FormField
        control={form.control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de carte</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="1234 5678 9012 3456" 
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="cardName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom du titulaire</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Jean Dupont" 
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date d'expiration</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="MM/YY" 
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="password" 
                  placeholder="123" 
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );

  const renderPaypalForm = () => (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email PayPal</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="email" 
                placeholder="exemple@email.com" 
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mot de passe PayPal</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="password" 
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const renderOtherForm = () => (
    <>
      <FormField
        control={form.control}
        name="transactionId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID de transaction (Orange Money, Western Union)</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="TR123456789" 
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="contactPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de téléphone de contact</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="+33 6 12 34 56 78" 
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  const getFormTitle = () => {
    switch (paymentMethod) {
      case 'card': return 'Paiement par Carte Bancaire';
      case 'paypal': return 'Paiement via PayPal';
      case 'other': return 'Paiement Alternatif';
      default: return 'Paiement';
    }
  };

  const getFormIcon = () => {
    switch (paymentMethod) {
      case 'card': return <CreditCard className="text-primary mr-2" size={20} />;
      case 'paypal': return <span className="text-primary font-bold mr-2">P</span>;
      case 'other': return <AlertCircle className="text-primary mr-2" size={20} />;
      default: return null;
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          {getFormIcon()}
          {getFormTitle()}
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            {paymentMethod === 'card' && renderCardForm()}
            {paymentMethod === 'paypal' && renderPaypalForm()}
            {paymentMethod === 'other' && renderOtherForm()}
            
            {isSubmitting && (
              <div className="flex justify-center my-4">
                <LoadingSpinner size="md" />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              disabled={isSubmitting}
            >
              <ArrowLeft size={16} className="mr-2" />
              Retour
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              Confirmer le paiement
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PaymentMethodForm;

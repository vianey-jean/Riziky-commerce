
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Product, products as initialProducts } from '@/data/mockData';
import { PencilLine, Plus, Trash2 } from 'lucide-react';
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const AdminPage = () => {
  const { currentUser } = useShop();
  
  // Redirect if not admin
  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/connexion" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Administration</h1>
      
      <Tabs defaultValue="products">
        <TabsList className="mb-8">
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="customers">Clients</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        
        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>
        
        <TabsContent value="customers">
          <CustomersTab />
        </TabsContent>
        
        <TabsContent value="messages">
          <MessagesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Products Management Tab
const ProductsTab = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success('Produit supprimé avec succès');
  };
  
  const handleEditClick = (product: Product) => {
    setEditProduct({ ...product });
    setIsDialogOpen(true);
  };
  
  const handleAddNewClick = () => {
    setEditProduct({
      id: `p${products.length + 1}`,
      name: '',
      price: 0,
      description: '',
      category: 'perruque',
      stock: 0,
      images: [],
      specifications: [],
      stars: 0,
      reviews: []
    });
    setIsDialogOpen(true);
  };
  
  const handleSaveProduct = () => {
    if (!editProduct) return;
    
    if (editProduct.name.trim() === '') {
      toast.error('Le nom du produit est requis');
      return;
    }
    
    if (editProduct.price <= 0) {
      toast.error('Le prix doit être supérieur à 0');
      return;
    }
    
    // Check if it's a new product or an update
    const isNewProduct = !products.some(p => p.id === editProduct.id);
    
    if (isNewProduct) {
      setProducts([...products, editProduct]);
      toast.success('Produit ajouté avec succès');
    } else {
      setProducts(products.map(p => p.id === editProduct.id ? editProduct : p));
      toast.success('Produit mis à jour avec succès');
    }
    
    setIsDialogOpen(false);
    setEditProduct(null);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestion des Produits</h2>
        <Button onClick={handleAddNewClick}>
          <Plus size={16} className="mr-2" />
          Ajouter un produit
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <span className="capitalize">{product.category}</span>
                </TableCell>
                <TableCell>{product.price.toFixed(2)} €</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? 'En stock' : 'Rupture'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditClick(product)}
                    >
                      <PencilLine size={16} />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer ce produit?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer ce produit? Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit/Add Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editProduct && products.some(p => p.id === editProduct.id) 
                ? 'Modifier le produit' 
                : 'Ajouter un produit'
              }
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du produit ci-dessous.
            </DialogDescription>
          </DialogHeader>
          
          {editProduct && (
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit</Label>
                  <Input 
                    id="name" 
                    value={editProduct.name}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (€)</Label>
                  <Input 
                    id="price" 
                    type="number"
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select 
                    value={editProduct.category}
                    onValueChange={(value) => setEditProduct({ 
                      ...editProduct, 
                      category: value as any
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perruque">Perruque</SelectItem>
                      <SelectItem value="tissage">Tissage</SelectItem>
                      <SelectItem value="peigne">Peigne Chauffant</SelectItem>
                      <SelectItem value="queue-de-cheval">Queue de Cheval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input 
                    id="stock" 
                    type="number"
                    value={editProduct.stock}
                    onChange={(e) => setEditProduct({ ...editProduct, stock: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  rows={3}
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specifications">Spécifications (une par ligne)</Label>
                <Textarea 
                  id="specifications" 
                  rows={3}
                  value={editProduct.specifications.join('\n')}
                  onChange={(e) => setEditProduct({ 
                    ...editProduct, 
                    specifications: e.target.value.split('\n').filter(spec => spec.trim() !== '')
                  })}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="featured"
                  checked={editProduct.featured || false}
                  onCheckedChange={(checked) => setEditProduct({ ...editProduct, featured: checked })}
                />
                <Label htmlFor="featured">Produit mis en avant</Label>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveProduct}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Orders Management Tab (Simplified)
const OrdersTab = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Gestion des Commandes</h2>
      <div className="text-center py-12 border rounded-md">
        <p className="text-muted-foreground">Aucune commande à afficher.</p>
      </div>
    </div>
  );
};

// Customers Management Tab (Simplified)
const CustomersTab = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Gestion des Clients</h2>
      <div className="text-center py-12 border rounded-md">
        <p className="text-muted-foreground">Aucun client à afficher.</p>
      </div>
    </div>
  );
};

// Messages Management Tab (Simplified)
const MessagesTab = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Messages des Clients</h2>
      <div className="text-center py-12 border rounded-md">
        <p className="text-muted-foreground">Aucun message à afficher.</p>
      </div>
    </div>
  );
};

export default AdminPage;

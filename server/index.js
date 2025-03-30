
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { products, users } = require('./data');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'https://id-preview--2c59c1d2-7bb2-4a83-af92-f09b9382f9b0.lovable.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

// Stockage en mémoire des commandes
let orders = [];

// Routes
// Get all products
app.get('/api/products', (req, res) => {
  console.log('GET /api/products - Sending', products.length, 'products');
  res.json(products);
});

// Get featured products - Déplacer cette route avant celle avec le paramètre :id
app.get('/api/products/featured', (req, res) => {
  const featuredProducts = products.filter(product => product.featured);
  console.log('GET /api/products/featured - Sending', featuredProducts.length, 'featured products');
  res.json(featuredProducts);
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  const categoryProducts = products.filter(product => product.category === category);
  console.log(`GET /api/products/category/${category} - Sending`, categoryProducts.length, 'products');
  res.json(categoryProducts);
});

// Get product by id
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    console.log(`GET /api/products/${id} - Product not found`);
    return res.status(404).json({ message: 'Produit non trouvé' });
  }
  
  console.log(`GET /api/products/${id} - Sending product:`, product.name);
  res.json(product);
});

// Process payment
app.post('/api/payment', (req, res) => {
  const { paymentMethod, paymentDetails, order } = req.body;
  
  // Simuler un temps de traitement
  setTimeout(() => {
    // Générer un ID de transaction
    const transactionId = uuidv4();
    
    // Simuler une réussite 90% du temps, échec 10% du temps
    const success = Math.random() > 0.1;
    
    if (success) {
      // Enregistrer la commande
      const newOrder = {
        id: uuidv4(),
        ...order,
        paymentMethod,
        transactionId,
        status: 'confirmed',
        date: new Date().toISOString()
      };
      
      orders.push(newOrder);
      
      console.log(`POST /api/payment - Payment successful: Order #${newOrder.id}`);
      res.json({ 
        success: true, 
        transactionId, 
        orderId: newOrder.id,
        message: 'Paiement traité avec succès'
      });
    } else {
      console.log(`POST /api/payment - Payment failed with ${paymentMethod}`);
      res.status(400).json({ 
        success: false, 
        error: 'payment_failed',
        message: 'Paiement refusé. Veuillez vérifier vos informations et réessayer.'
      });
    }
  }, 1500); // Simuler une latence de 1,5 secondes
});

// Basic user authentication (for demo)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (user) {
    // In a real app, you would verify the password
    console.log(`POST /api/auth/login - User authenticated: ${user.firstName} ${user.lastName}`);
    res.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        favorites: user.favorites
      },
      token: 'demo-token'
    });
  } else {
    console.log(`POST /api/auth/login - Authentication failed for email: ${email}`);
    res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port: ${PORT}`);
  console.log(`API accessible à l'adresse: http://localhost:${PORT}/api`);
});

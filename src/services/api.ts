
import axios from 'axios';
import { Product, User } from '@/data/mockData';

// Définir l'URL de l'API en fonction de l'environnement
const API_URL = import.meta.env.PROD 
  ? '/api' // En production, utiliser un chemin relatif
  : 'http://localhost:3001/api'; // En développement, utiliser localhost

// Configuration d'Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Services pour les produits
export const productService = {
  // Récupérer tous les produits
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');
      // Vérifier que la réponse est bien un tableau
      if (!Array.isArray(response.data)) {
        console.error('La réponse API n\'est pas un tableau:', response.data);
        return [];
      }
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      throw error;
    }
  },

  // Récupérer un produit par ID
  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du produit ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les produits par catégorie
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/category/${category}`);
      // Vérifier que la réponse est bien un tableau
      if (!Array.isArray(response.data)) {
        console.error('La réponse API n\'est pas un tableau:', response.data);
        return [];
      }
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des produits de la catégorie ${category}:`, error);
      throw error;
    }
  },

  // Récupérer les produits mis en avant
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products/featured');
      // Vérifier que la réponse est bien un tableau
      if (!Array.isArray(response.data)) {
        console.error('La réponse API n\'est pas un tableau:', response.data);
        return [];
      }
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits en vedette:', error);
      throw error;
    }
  },
};

// Services d'authentification
export const authService = {
  // Connexion
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
  },
};

export default api;

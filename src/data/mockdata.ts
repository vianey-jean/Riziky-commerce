
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'perruque' | 'tissage' | 'peigne' | 'queue-de-cheval';
  stock: number;
  images: string[];
  specifications: string[];
  featured?: boolean;
  stars: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  isAdmin: boolean;
  favorites: string[];
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Perruque Lace Front Brésilienne",
    price: 149.99,
    description: "Perruque lace front de qualité supérieure, cheveux brésiliens 100% naturels. Densité 150%, longueur 18 pouces.",
    category: "perruque",
    stock: 15,
    images: ["/images/perruque1.jpg", "/images/perruque1-2.jpg", "/images/perruque1-3.jpg"],
    specifications: ["Densité: 150%", "Longueur: 18 pouces", "Type: Lace Front", "Origine: Brésil", "Couleur: Noir naturel"],
    featured: true,
    stars: 4.7,
    reviews: [
      {
        id: "r1",
        userId: "u2",
        userName: "Marie L.",
        rating: 5,
        comment: "Qualité exceptionnelle, je suis très satisfaite de mon achat!",
        date: "2023-09-15"
      },
      {
        id: "r2",
        userId: "u3",
        userName: "Sophia K.",
        rating: 4,
        comment: "Très belle perruque, mais la livraison a pris plus de temps que prévu.",
        date: "2023-08-30"
      }
    ]
  },
  {
    id: "p2",
    name: "Tissage Ondulé Péruvien",
    price: 89.99,
    description: "Tissage ondulé de cheveux péruviens, texture douce et naturelle. Longueur 20 pouces.",
    category: "tissage",
    stock: 20,
    images: ["/images/tissage1.jpg", "/images/tissage1-2.jpg"],
    specifications: ["Longueur: 20 pouces", "Texture: Ondulée", "Origine: Pérou", "Poids: 100g/paquet", "Qualité: Premium"],
    featured: true,
    stars: 4.5,
    reviews: [
      {
        id: "r3",
        userId: "u4",
        userName: "Carine T.",
        rating: 5,
        comment: "Ce tissage est incroyable, tellement naturel!",
        date: "2023-09-20"
      }
    ]
  },
  {
    id: "p3",
    name: "Peigne Chauffant Céramique Pro",
    price: 59.99,
    description: "Peigne chauffant professionnel avec plaques en céramique, réglage de température précis et affichage digital.",
    category: "peigne",
    stock: 8,
    images: ["/images/peigne1.jpg", "/images/peigne1-2.jpg"],
    specifications: ["Matériau: Céramique", "Température max: 230°C", "Affichage: Digital LCD", "Puissance: 45W", "Cordon: 2.5m pivotant"],
    featured: false,
    stars: 4.2,
    reviews: [
      {
        id: "r4",
        userId: "u1",
        userName: "Laura M.",
        rating: 4,
        comment: "Bon produit, chauffe rapidement. Pratique pour les retouches rapides.",
        date: "2023-08-05"
      }
    ]
  },
  {
    id: "p4",
    name: "Queue de Cheval Clip-in Lisse",
    price: 39.99,
    description: "Queue de cheval à clip facile à installer, cheveux synthétiques haute qualité, longueur 22 pouces.",
    category: "queue-de-cheval",
    stock: 25,
    images: ["/images/queue1.jpg", "/images/queue1-2.jpg"],
    specifications: ["Longueur: 22 pouces", "Type: Clip-in", "Matériau: Synthétique haute qualité", "Poids: 120g", "Style: Lisse"],
    featured: true,
    stars: 4.0,
    reviews: [
      {
        id: "r5",
        userId: "u5",
        userName: "Julie D.",
        rating: 4,
        comment: "Vraiment pratique pour les jours où je n'ai pas le temps de me coiffer!",
        date: "2023-09-10"
      }
    ]
  },
  {
    id: "p5",
    name: "Perruque Bob Court",
    price: 129.99,
    description: "Perruque bob court élégante, cheveux humains, coupe stylée et moderne.",
    category: "perruque",
    stock: 10,
    images: ["/images/perruque2.jpg", "/images/perruque2-2.jpg"],
    specifications: ["Longueur: 12 pouces", "Type: Full Lace", "Origine: Malaisie", "Densité: 130%", "Style: Bob"],
    featured: false,
    stars: 4.8,
    reviews: []
  },
  {
    id: "p6",
    name: "Tissage Brésilien Lisse",
    price: 79.99,
    description: "Tissage lisse de cheveux brésiliens, qualité premium, longueur 24 pouces.",
    category: "tissage",
    stock: 15,
    images: ["/images/tissage2.jpg", "/images/tissage2-2.jpg"],
    specifications: ["Longueur: 24 pouces", "Texture: Lisse", "Origine: Brésil", "Poids: 100g/paquet", "Qualité: Premium"],
    featured: false,
    stars: 4.6,
    reviews: []
  }
];

export const users: User[] = [
  {
    id: "u1",
    firstName: "Laura",
    lastName: "Martin",
    email: "laura.martin@example.com",
    phone: "0612345678",
    address: "123 Rue de Paris, 75001 Paris",
    isAdmin: true,
    favorites: ["p1", "p4"]
  },
  {
    id: "u2",
    firstName: "Marie",
    lastName: "Laurent",
    email: "marie.laurent@example.com",
    phone: "0687654321",
    address: "45 Avenue des Fleurs, 69002 Lyon",
    isAdmin: false,
    favorites: ["p2"]
  }
];

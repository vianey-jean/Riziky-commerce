const products = [
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
    },
    {
      id: "p7",
      name: "Perruque Longue Ondulée",
      price: 169.99,
      description: "Perruque longue ondulée en cheveux naturels, aspect naturel et confortable à porter.",
      category: "perruque",
      stock: 7,
      images: ["/images/perruque3.jpg"],
      specifications: ["Longueur: 24 pouces", "Type: Full Lace", "Origine: Brésil", "Densité: 150%", "Style: Ondulé"],
      featured: true,
      stars: 4.9,
      reviews: []
    },
    {
      id: "p8",
      name: "Perruque Courte Afro",
      price: 119.99,
      description: "Perruque courte style afro, volume naturel et texture authentique.",
      category: "perruque",
      stock: 12,
      images: ["/images/perruque4.jpg"],
      specifications: ["Longueur: 6 pouces", "Type: Full Cap", "Origine: Afrique", "Densité: 150%", "Style: Afro"],
      featured: false,
      stars: 4.5,
      reviews: []
    },
    {
      id: "p9",
      name: "Perruque Lisse Extra Longue",
      price: 189.99,
      description: "Perruque extra longue et lisse, finition brillante et mouvement naturel.",
      category: "perruque",
      stock: 5,
      images: ["/images/perruque5.jpg"],
      specifications: ["Longueur: 30 pouces", "Type: Lace Front", "Origine: Inde", "Densité: 130%", "Style: Lisse"],
      featured: false,
      stars: 4.7,
      reviews: []
    },
    {
      id: "p10",
      name: "Tissage Bouclé Premium",
      price: 99.99,
      description: "Tissage bouclé premium, cheveux traités pour une tenue optimale des boucles.",
      category: "tissage",
      stock: 18,
      images: ["/images/tissage3.jpg"],
      specifications: ["Longueur: 18 pouces", "Texture: Bouclée", "Origine: Malaisie", "Poids: 100g/paquet", "Qualité: Premium"],
      featured: true,
      stars: 4.8,
      reviews: []
    },
    {
      id: "p11",
      name: "Tissage Naturel Court",
      price: 69.99,
      description: "Tissage court naturel, facile à coiffer et à entretenir.",
      category: "tissage",
      stock: 22,
      images: ["/images/tissage4.jpg"],
      specifications: ["Longueur: 10 pouces", "Texture: Naturelle", "Origine: Inde", "Poids: 100g/paquet", "Qualité: Standard"],
      featured: false,
      stars: 4.3,
      reviews: []
    },
    {
      id: "p12",
      name: "Tissage Ombré Spécial",
      price: 109.99,
      description: "Tissage avec effet ombré, transition naturelle de couleurs.",
      category: "tissage",
      stock: 9,
      images: ["/images/tissage5.jpg"],
      specifications: ["Longueur: 22 pouces", "Texture: Lisse", "Origine: Brésil", "Poids: 120g/paquet", "Style: Ombré"],
      featured: false,
      stars: 4.6,
      reviews: []
    },
    {
      id: "p13",
      name: "Peigne Chauffant Professionnel",
      price: 79.99,
      description: "Peigne chauffant professionnel avec tourmaline pour éviter les frisottis.",
      category: "peigne",
      stock: 14,
      images: ["/images/peigne2.jpg"],
      specifications: ["Matériau: Tourmaline", "Température max: 210°C", "Affichage: LED", "Puissance: 50W", "Fonction: Anti-frisottis"],
      featured: true,
      stars: 4.5,
      reviews: []
    },
    {
      id: "p14",
      name: "Peigne Chauffant Compact",
      price: 49.99,
      description: "Peigne chauffant compact idéal pour les voyages et retouches rapides.",
      category: "peigne",
      stock: 20,
      images: ["/images/peigne3.jpg"],
      specifications: ["Matériau: Céramique", "Température max: 180°C", "Format: Compact", "Puissance: 30W", "Longueur: 20cm"],
      featured: false,
      stars: 4.0,
      reviews: []
    },
    {
      id: "p15",
      name: "Peigne Chauffant Ionique",
      price: 89.99,
      description: "Peigne chauffant avec technologie ionique pour des cheveux brillants et sans électricité statique.",
      category: "peigne",
      stock: 6,
      images: ["/images/peigne4.jpg"],
      specifications: ["Matériau: Titane", "Température max: 230°C", "Technologie: Ionique", "Puissance: 55W", "Cordon: 3m pivotant"],
      featured: false,
      stars: 4.7,
      reviews: []
    },
    {
      id: "p16",
      name: "Peigne Chauffant Multifonction",
      price: 99.99,
      description: "Peigne chauffant multifonction avec différentes têtes pour varier les styles.",
      category: "peigne",
      stock: 11,
      images: ["/images/peigne5.jpg"],
      specifications: ["Matériau: Céramique", "Température max: 220°C", "Accessoires: 3 têtes", "Puissance: 60W", "Arrêt auto: 60 min"],
      featured: true,
      stars: 4.9,
      reviews: []
    },
    {
      id: "p17",
      name: "Queue de Cheval Volumineuse",
      price: 49.99,
      description: "Queue de cheval volumineuse à clip, apporte volume et longueur instantanément.",
      category: "queue-de-cheval",
      stock: 17,
      images: ["/images/queue2.jpg"],
      specifications: ["Longueur: 20 pouces", "Type: Clip-in", "Matériau: Synthétique premium", "Poids: 150g", "Style: Volumineux"],
      featured: true,
      stars: 4.6,
      reviews: []
    },
    {
      id: "p18",
      name: "Queue de Cheval Bouclée",
      price: 54.99,
      description: "Queue de cheval bouclée naturelle, fixation solide et confortable.",
      category: "queue-de-cheval",
      stock: 13,
      images: ["/images/queue3.jpg"],
      specifications: ["Longueur: 18 pouces", "Type: Elastic band", "Matériau: Mélange naturel/synthétique", "Poids: 130g", "Style: Bouclé"],
      featured: false,
      stars: 4.4,
      reviews: []
    },
    {
      id: "p19",
      name: "Queue de Cheval Extra Longue",
      price: 59.99,
      description: "Queue de cheval extra longue pour un look dramatique et élégant.",
      category: "queue-de-cheval",
      stock: 9,
      images: ["/images/queue4.jpg"],
      specifications: ["Longueur: 28 pouces", "Type: Wrap-around", "Matériau: Synthétique haute qualité", "Poids: 180g", "Style: Lisse"],
      featured: false,
      stars: 4.3,
      reviews: []
    },
    {
      id: "p20",
      name: "Queue de Cheval Ombré",
      price: 64.99,
      description: "Queue de cheval avec effet ombré, transition de couleurs naturelle du brun au blond.",
      category: "queue-de-cheval",
      stock: 7,
      images: ["/images/queue5.jpg"],
      specifications: ["Longueur: 24 pouces", "Type: Clip-in", "Matériau: Synthétique haute qualité", "Poids: 160g", "Style: Ombré"],
      featured: true,
      stars: 4.7,
      reviews: []
    }
  ];
  
  const users = [
    {
      id: "u1",
      firstName: "Laura",
      lastName: "Martin",
      email: "laura.martin@example.com",
      phone: "0612345678",
      address: "123 Rue de Paris, 75001 Paris",
      isAdmin: true,
      favorites: ["p1", "p4", "p7", "p13"]
    },
    {
      id: "u2",
      firstName: "Marie",
      lastName: "Laurent",
      email: "marie.laurent@example.com",
      phone: "0687654321",
      address: "45 Avenue des Fleurs, 69002 Lyon",
      isAdmin: false,
      favorites: ["p2", "p10", "p17"]
    }
  ];
  
  module.exports = { products, users };
  
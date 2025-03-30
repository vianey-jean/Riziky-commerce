
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">À Propos de Beauté Riziky</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez notre histoire, notre mission et notre engagement envers la beauté et la qualité.
        </p>
      </div>
      
      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Notre Histoire</h2>
          <p className="mb-4 text-muted-foreground">
            Fondée en 2020, Beauté Riziky est née d'une passion pour les produits capillaires de qualité et d'un désir de rendre accessibles des produits premium à tous.
          </p>
          <p className="mb-4 text-muted-foreground">
            Notre fondatrice, Riziky, a commencé par sélectionner soigneusement des perruques et des extensions pour ses amis et sa famille, avant de transformer sa passion en une entreprise florissante.
          </p>
          <p className="text-muted-foreground">
            Aujourd'hui, Beauté Riziky est fière de proposer une large gamme de produits capillaires de haute qualité, allant des perruques aux peignes chauffants, en passant par les tissages et les queues de cheval.
          </p>
        </div>
        <div className="bg-accent/30 h-80 rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">Image: Notre fondatrice</span>
        </div>
      </div>
      
      {/* Our Mission */}
      <div className="bg-primary/5 py-16 px-4 rounded-lg mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Notre Mission</h2>
          <p className="text-lg mb-8">
            "Chez Beauté Riziky, notre mission est de permettre à chaque femme d'exprimer sa beauté authentique à travers des produits capillaires de qualité, tout en offrant un service client exceptionnel et personnalisé."
          </p>
          <Button asChild>
            <Link to="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </div>
      
      {/* Why Choose Us */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Pourquoi Nous Choisir</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 border rounded-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl">✓</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Qualité Premium</h3>
            <p className="text-muted-foreground">
              Nous sélectionnons rigoureusement chaque produit pour garantir une qualité exceptionnelle.
            </p>
          </div>
          <div className="text-center p-6 border rounded-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl">✓</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Expertise & Conseils</h3>
            <p className="text-muted-foreground">
              Notre équipe d'experts est là pour vous conseiller et répondre à toutes vos questions.
            </p>
          </div>
          <div className="text-center p-6 border rounded-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl">✓</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Satisfaction Garantie</h3>
            <p className="text-muted-foreground">
              Votre satisfaction est notre priorité, avec un service client réactif et attentionné.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Notre Équipe</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="text-center">
              <div className="bg-accent/30 h-64 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">Photo</span>
              </div>
              <h3 className="font-medium">Membre de l'équipe {index + 1}</h3>
              <p className="text-sm text-muted-foreground">Poste</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

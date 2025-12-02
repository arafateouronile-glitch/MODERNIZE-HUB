import { motion } from 'framer-motion'
import { ChefHat, Utensils, Star, ArrowRight, Check, Clock, TrendingUp } from 'lucide-react'
import { SEO } from '../../components/seo/SEO'
import { Header } from '../../components/common/Header'
import { Footer } from '../../components/common/Footer'
import { useNavigate } from 'react-router-dom'

export const RestaurantLanding = () => {
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Site Web pour Restaurant | Modernize Hub - +300% de Réservations"
        description="Créez un site web moderne pour votre restaurant. Menu en ligne, réservations, photos HD, Google My Business. À partir de 2990€. Livraison 14 jours garantis."
        keywords="site restaurant, menu en ligne, réservation restaurant, site web restauration, création site restaurant"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1C1917] via-[#2d1810] to-[#1C1917] text-white px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#C41E3A]/20 border border-[#C41E3A] rounded-full px-4 py-2 mb-6"
          >
            <ChefHat className="w-4 h-4" />
            <span className="text-sm font-bold">Spécial Restaurateurs</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transformez votre restaurant avec un
            <span className="block text-[#F4E4C1] mt-4">site web qui fait saliver</span>
          </h1>
          
          <p className="text-xl text-[#D6D3D1] max-w-2xl mx-auto mb-8">
            Menu en ligne, réservation directe, galerie photos HD. 
            Augmentez vos réservations de <span className="text-[#C41E3A] font-bold">+300%</span> en 14 jours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => navigate('/demo/restaurant-gastronomique')}
              className="bg-[#C41E3A] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#D4293F] transition-all shadow-lg shadow-[#C41E3A]/30"
            >
              Voir nos réalisations restaurants
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#1C1917] transition-all"
            >
              Demander un devis gratuit
            </button>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { stat: '+300%', label: 'Réservations', icon: TrendingUp },
              { stat: '14 jours', label: 'Livraison', icon: Clock },
              { stat: '2990€', label: 'À partir de', icon: Star },
            ].map((item, i) => (
              <div key={i} className="text-center bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <item.icon className="w-8 h-8 text-[#F4E4C1] mx-auto mb-2" />
                <div className="text-4xl font-bold text-[#F4E4C1] mb-2">{item.stat}</div>
                <div className="text-sm text-[#A8A29E] uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Fonctionnalités Spécifiques */}
      <section className="py-24 px-6 bg-[#F5F5F4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#1C1917]">
            Tout ce dont un restaurant a besoin
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Une solution clé en main pour attirer plus de clients et augmenter vos réservations
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Utensils,
                title: 'Menu en ligne interactif',
                desc: 'Présentez vos plats avec photos HD, descriptions gourmandes et prix actualisables en temps réel.',
                features: ['Photos professionnelles', 'Catégories personnalisées', 'Allergènes et régimes'],
              },
              {
                icon: Star,
                title: 'Système de réservation',
                desc: 'Réservations directes 24/7 sans passer par les plateformes (0% de commission).',
                features: ['Calendrier en temps réel', 'Confirmations automatiques', 'Gestion des disponibilités'],
              },
              {
                icon: ChefHat,
                title: 'Section Chef & Histoire',
                desc: 'Racontez votre histoire, votre philosophie culinaire et créez une connexion émotionnelle.',
                features: ['Page À propos', 'Histoire du restaurant', 'Équipe et valeurs'],
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C41E3A]/10 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-[#C41E3A]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1C1917]">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#C41E3A]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Restaurants */}
      <section className="py-24 px-6 bg-[#1C1917]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nos créations pour restaurants
          </h2>
          <p className="text-[#D6D3D1] mb-12 max-w-2xl mx-auto text-lg">
            Découvrez comment nous avons transformé l'image en ligne de restaurants comme le vôtre
          </p>
          
          <div className="bg-[#292524] p-2 rounded-2xl mb-8">
            <img 
              src="/images/portfolio/restaurant-thumb.svg" 
              alt="Exemple site restaurant" 
              className="w-full rounded-xl"
            />
          </div>
          
          <button 
            onClick={() => navigate('/demo/restaurant-gastronomique')}
            className="inline-flex items-center gap-2 bg-[#C41E3A] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#D4293F] transition-all shadow-lg"
          >
            Voir la démo interactive complète
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      
      {/* Pricing Spécifique Restaurant */}
      <section className="py-24 px-6 bg-[#F5F5F4]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#1C1917]">
            Tarif pour restaurants
          </h2>
          <p className="text-center text-gray-600 mb-16">
            Formule tout-en-un adaptée aux besoins des restaurateurs
          </p>
          
          <div className="bg-gradient-to-br from-[#1C1917] to-[#2d1810] text-white p-12 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <ChefHat className="w-12 h-12 text-[#F4E4C1]" />
              <div>
                <h3 className="text-3xl font-bold">Formule Restaurant Pro</h3>
                <p className="text-[#F4E4C1]">Tout ce qu'il faut pour briller en ligne</p>
              </div>
            </div>
            
            <div className="text-5xl font-bold mb-8">
              2 990€
              <span className="text-xl text-[#A8A29E] ml-2 font-normal">tout compris</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                'Menu en ligne interactif personnalisé',
                'Système de réservation intégré (0% commission)',
                'Galerie photos HD de vos plats',
                'Section Chef & Histoire du restaurant',
                'Google My Business Setup complet',
                '3 emails professionnels (@votrerestaurant.fr)',
                'Formation complète 2h',
                'Support prioritaire 1 mois',
                'Livraison garantie en 14 jours',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#C41E3A] rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[#E7E5E4]">{item}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => navigate('/contact')}
              className="w-full bg-[#C41E3A] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#D4293F] transition-all"
            >
              Réserver une consultation gratuite
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-24 px-6 bg-[#C41E3A] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <Star className="w-16 h-16 mx-auto mb-6 text-[#F4E4C1]" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à faire décoller votre restaurant ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les 50+ restaurants qui nous font confiance
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-[#C41E3A] px-10 py-5 rounded-lg font-bold text-xl hover:bg-[#F5F5F4] transition-all shadow-xl"
          >
            Démarrer mon projet maintenant
          </button>
        </div>
      </section>
      
      <Footer />
    </>
  )
}

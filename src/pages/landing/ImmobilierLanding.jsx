import { motion } from 'framer-motion'
import { Home, Search, MapPin, ArrowRight, Check, TrendingUp, Building, Key } from 'lucide-react'
import { SEO } from '../../components/seo/SEO'
import { Header } from '../../components/common/Header'
import { Footer } from '../../components/common/Footer'
import { useNavigate } from 'react-router-dom'

export const ImmobilierLanding = () => {
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Site Web pour Agence Immobilière | Modernize Hub"
        description="Site web moderne pour agences immobilières. Recherche avancée, filtres, carte interactive, visite virtuelle 3D. À partir de 2490€."
        keywords="site agence immobilière, site immobilier, plateforme immobilière"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2E4D] to-[#164C7C] text-white px-6 pt-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#FF6B35]/20 border border-[#FF6B35] rounded-full px-4 py-2 mb-6"
          >
            <Building className="w-4 h-4" />
            <span className="text-sm font-bold">Spécial Agences Immobilières</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Vendez plus de biens avec un
            <span className="block text-[#FF6B35] mt-2">site web qui convertit</span>
          </h1>
          
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Recherche avancée, carte interactive, visite virtuelle 3D. 
            Augmentez vos visites de +450% en 18 jours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => navigate('/demo/agence-immobiliere')}
              className="bg-[#FF6B35] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FF8A5C] transition-all shadow-lg"
            >
              Voir notre réalisation immobilier
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#0A2E4D] transition-all"
            >
              Demander un devis gratuit
            </button>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { stat: '+450%', label: 'Visites propriétés' },
              { stat: '18 jours', label: 'Livraison' },
              { stat: '2 490€', label: 'À partir de' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#FF6B35] mb-2">{item.stat}</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Fonctionnalités Immobilier */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Tout pour dominer le marché immobilier
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Des fonctionnalités puissantes pour présenter vos biens et générer des leads qualifiés
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Search,
                title: 'Recherche avancée',
                desc: 'Filtres multi-critères (prix, surface, pièces, quartier). Recherche ultra-rapide et intuitive.',
              },
              {
                icon: MapPin,
                title: 'Carte interactive',
                desc: 'Visualisez tous vos biens sur une carte. Géolocalisation précise, infos au survol.',
              },
              {
                icon: Home,
                title: 'Fiches biens détaillées',
                desc: 'Galerie photos HD, vidéos, visite virtuelle 3D. Tout pour séduire vos clients.',
              },
              {
                icon: TrendingUp,
                title: 'Estimation en ligne',
                desc: 'Outil d\'estimation gratuit pour capter des mandats. Génère des leads vendeurs.',
              },
              {
                icon: Key,
                title: 'Demande de visite',
                desc: 'Formulaire de contact par bien. Notifications email instantanées.',
              },
              {
                icon: Building,
                title: 'SEO immobilier local',
                desc: 'Optimisé pour Google \"immobilier [ville]\". Google My Business intégré.',
              },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl border-2 border-gray-100 hover:border-[#FF6B35] transition-all hover:shadow-xl group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6B35]/10 rounded-full mb-6 group-hover:bg-[#FF6B35] transition-all">
                  <feature.icon className="w-8 h-8 text-[#FF6B35] group-hover:text-white transition-all" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Immobilier */}
      <section className="py-24 px-6 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#0A2E4D] mb-6">
            Notre réalisation pour agence immobilière
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Design moderne, recherche puissante, carte interactive
          </p>
          
          <button 
            onClick={() => navigate('/demo/agence-immobiliere')}
            className="inline-flex items-center gap-2 bg-[#0A2E4D] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#164C7C] transition-all"
          >
            Voir la démo interactive
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      
      {/* Pricing Immobilier */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Tarif Agence Immobilière
          </h2>
          
          <div className="bg-gradient-to-br from-[#0A2E4D] to-[#164C7C] text-white p-12 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <Building className="w-12 h-12 text-[#FF6B35]" />
              <div>
                <h3 className="text-3xl font-bold">Formule Immobilier Pro</h3>
                <p className="text-[#FF6B35]">Site complet pour agence</p>
              </div>
            </div>
            
            <div className="text-5xl font-bold mb-8">
              3 490€
              <span className="text-xl text-gray-400 ml-2">tout compris</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                'Recherche avancée multi-critères',
                'Carte interactive (Mapbox/Google Maps)',
                'Fiches biens avec galerie HD',
                'Visite virtuelle 3D intégrée',
                'Outil d\'estimation en ligne',
                'Formulaire demande de visite par bien',
                'Google My Business Setup',
                '5 emails professionnels',
                'SEO immobilier local optimisé',
                'Formation 2h + Support 1 mois',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#FF6B35] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => navigate('/contact')}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#FF8A5C] transition-all"
            >
              Réserver une consultation gratuite
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-24 px-6 bg-[#FF6B35] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Dominez le marché immobilier local
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Les meilleures agences immobilières nous font confiance
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-[#FF6B35] px-10 py-5 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all shadow-xl"
          >
            Démarrer mon projet
          </button>
        </div>
      </section>
      
      <Footer />
    </>
  )
}


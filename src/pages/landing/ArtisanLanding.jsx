import { motion } from 'framer-motion'
import { Hammer, TreeDeciduous, Award, ArrowRight, Check, Clock, TrendingUp } from 'lucide-react'
import { SEO } from '../../components/seo/SEO'
import { Header } from '../../components/common/Header'
import { Footer } from '../../components/common/Footer'
import { useNavigate } from 'react-router-dom'

export const ArtisanLanding = () => {
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Site Web pour Artisan | Modernize Hub - Portfolio & Devis en Ligne"
        description="Créez un site web professionnel pour votre activité d'artisan. Portfolio avant/après, demande de devis en ligne, certifications. À partir de 1990€. Livraison 13 jours."
        keywords="site artisan, site menuisier, site plombier, portfolio artisan, devis en ligne artisan"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-[#F2F0EB] px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#8B7355]/10 border-2 border-[#8B7355] rounded-full px-4 py-2 mb-6"
          >
            <Hammer className="w-4 h-4 text-[#2C2416]" />
            <span className="text-sm font-bold text-[#2C2416]">Spécial Artisans</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-[#2C2416]">
            Valorisez votre savoir-faire avec
            <span className="block text-[#8B7355] mt-4">un site web à votre image</span>
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Portfolio avant/après, demande de devis en ligne, certifications. 
            Augmentez vos demandes de <span className="text-[#8B7355] font-bold">+340%</span> en 13 jours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => navigate('/demo/artisan-premium')}
              className="bg-[#2C2416] text-[#F2F0EB] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#8B7355] transition-all shadow-xl"
            >
              Voir nos réalisations artisans
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-[#2C2416] text-[#2C2416] px-8 py-4 rounded-lg font-bold hover:bg-[#2C2416] hover:text-[#F2F0EB] transition-all"
            >
              Demander un devis gratuit
            </button>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { stat: '+340%', label: 'Demandes de devis', icon: TrendingUp },
              { stat: '13 jours', label: 'Livraison', icon: Clock },
              { stat: '1990€', label: 'À partir de', icon: Award },
            ].map((item, i) => (
              <div key={i} className="text-center bg-white p-6 rounded-xl border-2 border-[#2C2416]/10 shadow-sm">
                <item.icon className="w-8 h-8 text-[#8B7355] mx-auto mb-2" />
                <div className="text-4xl font-bold text-[#2C2416] mb-2">{item.stat}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Fonctionnalités Spécifiques */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#2C2416]">
            Tout ce dont un artisan a besoin
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Une vitrine professionnelle pour attirer plus de clients et valoriser votre travail
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: TreeDeciduous,
                title: 'Portfolio avant/après',
                desc: 'Présentez vos plus belles réalisations avec des photos avant/après qui impressionnent.',
                features: ['Galerie photos HD', 'Slider comparatif', 'Catégories de projets'],
              },
              {
                icon: Hammer,
                title: 'Demande de devis en ligne',
                desc: 'Formulaire personnalisé pour recevoir des demandes de devis 24/7. Réponse sous 24h garantie.',
                features: ['Formulaire intelligent', 'Notifications email', 'Suivi des demandes'],
              },
              {
                icon: Award,
                title: 'Certifications & Labels',
                desc: 'Mettez en avant vos qualifications, certifications et labels qualité pour rassurer vos clients.',
                features: ['Badges de certification', 'Assurances', 'Témoignages clients'],
              },
            ].map((feature, i) => (
              <div key={i} className="bg-[#F2F0EB] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-[#2C2416]/10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8B7355]/10 rounded-full mb-6 border-2 border-[#8B7355]">
                  <feature.icon className="w-8 h-8 text-[#2C2416]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#2C2416]">{feature.title}</h3>
                <p className="text-gray-700 mb-6">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#8B7355]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Artisan */}
      <section className="py-24 px-6 bg-[#F2F0EB]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C2416] mb-6">
            Nos créations pour artisans
          </h2>
          <p className="text-gray-700 mb-12 max-w-2xl mx-auto text-lg">
            Découvrez comment nous avons aidé des artisans comme vous à développer leur activité en ligne
          </p>
          
          <div className="bg-white p-2 rounded-2xl mb-8 shadow-xl">
            <img 
              src="/images/portfolio/artisan-thumb.svg" 
              alt="Exemple site artisan" 
              className="w-full rounded-xl"
            />
          </div>
          
          <button 
            onClick={() => navigate('/demo/artisan-premium')}
            className="inline-flex items-center gap-2 bg-[#2C2416] text-[#F2F0EB] px-8 py-4 rounded-lg font-bold hover:bg-[#8B7355] transition-all shadow-lg"
          >
            Voir la démo interactive complète
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      
      {/* Pricing Spécifique Artisan */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#2C2416]">
            Tarif pour artisans
          </h2>
          <p className="text-center text-gray-600 mb-16">
            Formule adaptée aux besoins des artisans et PME
          </p>
          
          <div className="bg-gradient-to-br from-[#2C2416] to-[#1a1509] text-[#F2F0EB] p-12 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <Hammer className="w-12 h-12 text-[#D9C6B0]" />
              <div>
                <h3 className="text-3xl font-bold">Formule Artisan Essentiel</h3>
                <p className="text-[#D9C6B0]">Tout pour une vitrine professionnelle</p>
              </div>
            </div>
            
            <div className="text-5xl font-bold mb-8">
              1 990€
              <span className="text-xl text-[#8B7355] ml-2 font-normal">tout compris</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                'Portfolio avant/après interactif',
                'Galerie photos HD de vos réalisations',
                'Formulaire devis personnalisé',
                'Section certifications & labels',
                'Google My Business Setup',
                '1 email professionnel (@votreentreprise.fr)',
                'Formation complète 1h',
                'Support 15 jours',
                'Livraison garantie en 13 jours',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#8B7355] rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-[#F2F0EB]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => navigate('/contact')}
              className="w-full bg-[#8B7355] text-[#F2F0EB] py-4 rounded-lg font-bold text-lg hover:bg-[#A68968] transition-all"
            >
              Réserver une consultation gratuite
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-24 px-6 bg-[#2C2416] text-[#F2F0EB] text-center">
        <div className="max-w-4xl mx-auto">
          <Award className="w-16 h-16 mx-auto mb-6 text-[#D9C6B0]" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à faire grandir votre activité ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les 100+ artisans qui nous font confiance
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-[#8B7355] text-[#F2F0EB] px-10 py-5 rounded-lg font-bold text-xl hover:bg-[#A68968] transition-all shadow-xl"
          >
            Démarrer mon projet maintenant
          </button>
        </div>
      </section>
      
      <Footer />
    </>
  )
}



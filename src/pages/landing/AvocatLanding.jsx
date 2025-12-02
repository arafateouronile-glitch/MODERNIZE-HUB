import { motion } from 'framer-motion'
import { Scale, Shield, FileText, ArrowRight, Check, Users, Award } from 'lucide-react'
import { SEO } from '../../components/seo/SEO'
import { Header } from '../../components/common/Header'
import { Footer } from '../../components/common/Footer'
import { useNavigate } from 'react-router-dom'

export const AvocatLanding = () => {
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Site Web pour Cabinet d'Avocats | Modernize Hub"
        description="Site web professionnel pour cabinets d'avocats. Design premium, formulaires sécurisés, SEO juridique. À partir de 2990€."
        keywords="site avocat, site juridique, cabinet avocats, site web avocat"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0C0C0C] to-[#1a1a1a] text-white px-6 pt-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-full px-4 py-2 mb-6"
          >
            <Scale className="w-4 h-4" />
            <span className="text-sm font-bold">Spécial Cabinets Juridiques</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-serif">
            Imposez votre expertise avec un
            <span className="block text-[#D4AF37] mt-2">site web prestigieux</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Design élégant, formulaires sécurisés, SEO juridique. 
            Attirez des clients de qualité et renforcez votre crédibilité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => navigate('/demo/cabinet-avocats')}
              className="bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#F0E6D2] transition-all shadow-lg"
            >
              Voir notre réalisation cabinet
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-bold hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              Consultation gratuite
            </button>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { stat: '+280%', label: 'Conversions' },
              { stat: '98%', label: 'Taux de succès' },
              { stat: '2 990€', label: 'À partir de' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{item.stat}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Fonctionnalités Juridiques */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Conçu pour les professionnels du droit
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Chaque détail pensé pour inspirer confiance et convertir vos visiteurs en clients
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: FileText,
                title: 'Domaines d\'expertise',
                desc: 'Présentez vos spécialisations juridiques de manière claire et professionnelle.',
              },
              {
                icon: Shield,
                title: 'Formulaires sécurisés',
                desc: 'Demandes de consultation cryptées HTTPS. Confidentialité garantie pour vos clients.',
              },
              {
                icon: Users,
                title: 'Profils d\'associés',
                desc: 'Mettez en avant les parcours et expertises de vos avocats. Renforcez la crédibilité.',
              },
              {
                icon: Award,
                title: 'Succès & Témoignages',
                desc: 'Showcasez vos victoires juridiques et avis clients. Prouvez votre excellence.',
              },
              {
                icon: FileText,
                title: 'Blog juridique',
                desc: 'Publiez des articles d\'expertise. Positionnez-vous comme référence sur Google.',
              },
              {
                icon: Scale,
                title: 'Design prestigieux',
                desc: 'Élégance, sobriété, professionnalisme. L\'image d\'un cabinet d\'élite.',
              },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl border-2 border-gray-100 hover:border-[#D4AF37] transition-all hover:shadow-xl group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37]/10 rounded-full mb-6 group-hover:bg-[#D4AF37] transition-all">
                  <feature.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-black transition-all" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Cabinet */}
      <section className="py-24 px-6 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-serif">
            Notre réalisation pour cabinet d'avocats
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
            Design dark mode élégant, typographie raffinée, animations subtiles
          </p>
          
          <button 
            onClick={() => navigate('/demo/cabinet-avocats')}
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-bold hover:bg-[#F0E6D2] transition-all"
          >
            Voir la démo interactive
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      
      {/* Pricing Cabinet */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Formule Cabinet d'Avocats
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Solution complète clés en main. Image premium pour votre cabinet.
          </p>
          
          <div className="bg-gradient-to-br from-[#0C0C0C] to-[#1a1a1a] text-white p-12 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <Scale className="w-12 h-12 text-[#D4AF37]" />
              <div>
                <h3 className="text-3xl font-bold font-serif">Formule Prestige Juridique</h3>
                <p className="text-[#D4AF37]">L'excellence pour votre cabinet</p>
              </div>
            </div>
            
            <div className="text-5xl font-bold mb-8">
              3 490€
              <span className="text-xl text-gray-400 ml-2">tout compris</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                'Design dark mode premium & élégant',
                'Section domaines d\'expertise détaillée',
                'Profils avocats avec parcours',
                'Formulaire consultation sécurisé HTTPS',
                'Blog juridique intégré (SEO)',
                'Google My Business Setup + SEO local',
                '3 emails professionnels (@votrecabinet.fr)',
                'Animations & typographie sur mesure',
                'Formation complète 2h',
                'Support prioritaire 1 mois',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => navigate('/contact')}
              className="w-full bg-[#D4AF37] text-black py-4 rounded-lg font-bold text-lg hover:bg-[#F0E6D2] transition-all"
            >
              Consultation juridique gratuite
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-24 px-6 bg-[#D4AF37] text-black text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 font-serif">
            Imposez votre présence digitale
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les cabinets de référence qui dominent leur secteur en ligne
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-black text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-[#1a1a1a] transition-all shadow-xl"
          >
            Démarrer mon projet
          </button>
        </div>
      </section>
      
      <Footer />
    </>
  )
}


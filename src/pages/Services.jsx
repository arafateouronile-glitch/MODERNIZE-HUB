import { motion } from 'framer-motion'
import { Sparkles, RefreshCw, ArrowRight, Check, Bot, Filter, Calendar, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import { useTheme } from '../contexts/ThemeContext'

const services = [
  {
    id: 'creation',
    title: 'Création de Site Web',
    subtitle: 'Site web sur-mesure à partir de zéro',
    description: 'Création complète de votre site web professionnel avec design premium et technologies 2025.',
    icon: Sparkles,
    features: [
      'Design sur-mesure unique',
      'Technologies modernes (React, Three.js)',
      'SEO optimisé dès le départ',
      '3 formules adaptées à vos besoins',
      'Livraison 10-21 jours',
    ],
    price: 'À partir de 1 990€',
    link: '/creation-site-web',
    color: '#3B82F6',
    popular: true,
  },
  {
    id: 'refonte',
    title: 'Refonte de Site Web',
    subtitle: 'Transformez votre site existant',
    description: 'Donnez un nouveau souffle à votre site actuel avec un design ultra-premium qui convertit.',
    icon: RefreshCw,
    features: [
      'Refonte complète UX/UI',
      'Optimisation conversions',
      'Score Lighthouse 90+',
      'Animations premium',
      'Livraison 7-21 jours',
    ],
    price: 'À partir de 1 490€',
    link: '/refonte-site',
    color: '#8B5CF6',
    popular: false,
  },
]

export const Services = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-background'}`}>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-6xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`font-display text-6xl md:text-8xl font-bold mb-6 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            Nos Services
            <br />
            <span className="text-[#88A9C3]">Premium</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl md:text-2xl mb-12 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            Site web haute performance · Agent IA · Automatisation CRM
          </motion.p>
        </motion.div>
      </section>

      {/* Services Cards */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => navigate(service.link)}
                  className={`relative cursor-pointer rounded-3xl p-8 md:p-12 border-2 transition-all ${
                    service.popular
                      ? 'scale-105 border-[#88A9C3] shadow-2xl'
                      : theme === 'light'
                      ? 'border-black bg-white'
                      : 'border-white/10 bg-surface'
                  }`}
                  style={{
                    backgroundColor: service.popular && theme === 'dark' ? 'rgba(136, 169, 195, 0.05)' : undefined,
                  }}
                >
                  {/* Badge Popular */}
                  {service.popular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#88A9C3] text-black px-6 py-2 rounded-full font-bold text-sm"
                    >
                      ⭐ POPULAIRE
                    </motion.div>
                  )}

                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: service.color + '20' }}
                    >
                      <IconComponent className="w-8 h-8" style={{ color: service.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={`text-3xl font-bold mb-2 ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}>
                    {service.title}
                  </h3>
                  
                  <p className={`text-lg mb-4 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {service.subtitle}
                  </p>

                  <p className={`text-sm mb-6 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0`} style={{ color: service.color }} />
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="mb-6">
                    <div className={`text-3xl font-bold mb-2 ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`}>
                      {service.price}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 px-6 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${
                      service.popular
                        ? 'bg-[#88A9C3] text-black hover:bg-white'
                        : theme === 'light'
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-[#88A9C3] text-black hover:bg-white'
                    }`}
                  >
                    Découvrir cette offre
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* IA Automation Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative border-2 border-[#88A9C3] p-10 md:p-14 overflow-hidden ${
              theme === 'light' ? 'bg-gray-50' : 'bg-[#88A9C3]/5'
            }`}
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#88A9C3]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#88A9C3]/40 bg-[#88A9C3]/10 mb-8">
              <Zap className="w-3 h-3 text-[#88A9C3]" />
              <span className="font-mono text-[#88A9C3] text-xs uppercase tracking-[0.2em]">Nouveau · Offre Flagship</span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start relative z-10">
              {/* Left — Text */}
              <div>
                <div className="w-14 h-14 rounded-full bg-[#88A9C3]/20 border border-[#88A9C3]/40 flex items-center justify-center mb-6">
                  <Bot className="w-7 h-7 text-[#88A9C3]" />
                </div>
                <h3 className={`font-display text-4xl md:text-5xl font-bold uppercase mb-3 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  Automatisation IA<br />& Systèmes Autonomes
                </h3>
                <p className="font-mono text-xs text-[#88A9C3] uppercase tracking-widest mb-6">
                  Votre business tourne sans vous
                </p>
                <p className={`text-lg leading-relaxed mb-8 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  On ne construit plus seulement des sites. On déploie des <strong className={theme === 'light' ? 'text-black' : 'text-white'}>employés numériques infatigables</strong> — disponibles 24h/24, sans congés, sans erreurs. Chaque lead entrant est capturé, qualifié et converti automatiquement.
                </p>

                <div className="space-y-3 mb-10">
                  {[
                    'Agent IA qui qualifie vos leads en 30 secondes',
                    'Devis générés et envoyés automatiquement',
                    'Prise de RDV synchronisée dans votre agenda',
                    'Pipeline CRM mis à jour en temps réel',
                    'Maintenance & optimisation IA continue (349€/mois)',
                    'Votre IA apprend et s\'améliore chaque semaine',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#88A9C3] mt-0.5 flex-shrink-0" />
                      <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate('/#contact')}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#88A9C3] text-black font-bold hover:bg-white transition-all"
                  >
                    Demander un Audit Gratuit
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <div>
                    <p className={`font-mono text-xs uppercase tracking-widest ${theme === 'light' ? 'text-gray-500' : 'text-white/40'}`}>À partir de</p>
                    <p className={`font-display text-2xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>4 490€</p>
                    <p className="font-mono text-xs text-[#88A9C3]">Sur devis après audit</p>
                  </div>
                </div>
              </div>

              {/* Right — 3 Pillars */}
              <div className="space-y-1">
                {[
                  {
                    icon: Zap,
                    number: '01',
                    title: 'CAPTURE',
                    desc: 'Site Web 2025 ultra-rapide. PageSpeed 95+. Chaque visiteur est un prospect potentiel.',
                  },
                  {
                    icon: Filter,
                    number: '02',
                    title: 'QUALIFICATION',
                    desc: 'L\'agent IA analyse chaque lead en 30 secondes. Vous ne parlez plus qu\'aux clients prêts à signer.',
                  },
                  {
                    icon: Calendar,
                    number: '03',
                    title: 'CONVERSION',
                    desc: 'Devis automatiques, RDV pris, CRM alimenté. Le cycle de vente se ferme sans vous.',
                  },
                ].map((pillar, i) => {
                  const Icon = pillar.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className={`flex items-start gap-5 p-6 border border-white/10 ${
                        theme === 'light' ? 'bg-white' : 'bg-white/3'
                      } hover:border-[#88A9C3]/40 transition-all`}
                    >
                      <div>
                        <span className="font-mono text-[#88A9C3]/30 text-3xl font-bold leading-none block">{pillar.number}</span>
                        <div className="w-8 h-8 rounded-full border border-[#88A9C3]/30 bg-[#88A9C3]/10 flex items-center justify-center mt-2">
                          <Icon className="w-4 h-4 text-[#88A9C3]" />
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-display text-xl font-bold uppercase mb-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                          {pillar.title}
                        </h4>
                        <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {pillar.desc}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparaison Section */}
      <section className="py-20 px-6 bg-black/5">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-display font-bold text-center mb-12 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            Quelle Différence ?
          </motion.h2>

          <div className={`rounded-3xl p-8 border-2 ${
            theme === 'light'
              ? 'bg-white border-black'
              : 'bg-surface border-white/10'
          }`}>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  <Sparkles className="w-6 h-6 text-[#3B82F6]" />
                  Création de Site
                </h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Parfait si vous n'avez pas encore de site ou souhaitez repartir de zéro avec un design premium.
                </p>
              </div>

              <div>
                <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  <RefreshCw className="w-6 h-6 text-[#8B5CF6]" />
                  Refonte de Site
                </h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Idéal si votre site existant ne convertit pas ou a besoin d'un nouveau souffle technique et visuel.
                </p>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-[#88A9C3]/30 pt-6 md:pt-0 md:pl-8">
                <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  <Bot className="w-6 h-6 text-[#88A9C3]" />
                  Automatisation IA
                </h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Pour ceux qui veulent aller plus loin : un système complet qui capture, qualifie et convertit vos leads sans intervention humaine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#88A9C3]">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-black mb-6"
          >
            Besoin d'Aide pour Choisir ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-black/80 mb-8"
          >
            Discutons de votre projet et trouvons la solution parfaite ensemble
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
          >
            Nous Contacter
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  )
}


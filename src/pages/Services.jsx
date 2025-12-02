import { motion } from 'framer-motion'
import { Sparkles, RefreshCw, ArrowRight, Check } from 'lucide-react'
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
            <span className="text-[#D9FF00]">Premium</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl md:text-2xl mb-12 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            Choisissez le service qui correspond à votre besoin
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
                      ? 'scale-105 border-[#D9FF00] shadow-2xl'
                      : theme === 'light'
                      ? 'border-black bg-white'
                      : 'border-white/10 bg-surface'
                  }`}
                  style={{
                    backgroundColor: service.popular && theme === 'dark' ? 'rgba(217, 255, 0, 0.05)' : undefined,
                  }}
                >
                  {/* Badge Popular */}
                  {service.popular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D9FF00] text-black px-6 py-2 rounded-full font-bold text-sm"
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
                        ? 'bg-[#D9FF00] text-black hover:bg-white'
                        : theme === 'light'
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-[#D9FF00] text-black hover:bg-white'
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
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  <Sparkles className="w-6 h-6 text-[#3B82F6]" />
                  Création de Site
                </h3>
                <p className={`${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Parfait si vous n'avez pas encore de site web ou si vous souhaitez créer quelque chose de complètement nouveau à partir de zéro.
                </p>
              </div>

              <div>
                <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  <RefreshCw className="w-6 h-6 text-[#8B5CF6]" />
                  Refonte de Site
                </h3>
                <p className={`${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Idéal si vous avez déjà un site web qui ne performe pas ou qui a besoin d'un coup de jeune avec un design ultra-premium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#D9FF00]">
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


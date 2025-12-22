import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, Rocket, Crown, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import { pricingTiers, additionalServices, faqOffers } from '../data/offers'
import { useTheme } from '../contexts/ThemeContext'

const iconMap = {
  '⚡': Sparkles,
  '🚀': Rocket,
  '👑': Crown,
}

export const CreationSiteWeb = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null)
  const { theme } = useTheme()

  const handleCTAClick = (tierName) => {
    // Scroll vers la section contact
    const contactSection = document.getElementById('contact-section')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
            Création de Site Web
            <br />
            <span className="text-[#88A9C3]">Sur-Mesure</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl md:text-2xl mb-12 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            Site web professionnel créé à partir de zéro avec design premium
          </motion.p>

          {/* Stats Bandeau */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16"
          >
            {[
              { label: 'Sites créés', value: '200+' },
              { label: 'Conversions moyennes', value: '+320%' },
              { label: 'Livraison', value: '10-21 jours' },
              { label: 'Satisfaction', value: '98%' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`p-6 rounded-2xl border-2 ${
                  theme === 'light'
                    ? 'bg-white border-black text-black'
                    : 'bg-surface border-white/10 text-white'
                }`}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#88A9C3] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-mono uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {pricingTiers.map((tier, index) => {
              const IconComponent = iconMap[tier.icon] || Sparkles
              
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative rounded-3xl p-8 border-2 transition-all duration-300 ${
                    tier.popular
                      ? 'scale-105 border-[#88A9C3] shadow-2xl'
                      : theme === 'light'
                      ? 'border-black bg-white'
                      : 'border-white/10 bg-surface'
                  }`}
                  style={{
                    backgroundColor: tier.popular && theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : undefined,
                  }}
                >
                  {/* Badge Popular */}
                  {tier.popular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#88A9C3] text-black px-6 py-2 rounded-full font-bold text-sm"
                    >
                      ⭐ {tier.badge || 'PLUS POPULAIRE'}
                    </motion.div>
                  )}

                  {/* Badge Premium */}
                  {tier.badge && !tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-black px-6 py-2 rounded-full font-bold text-sm">
                      {tier.badge}
                    </div>
                  )}

                  {/* Icon & Name */}
                  <div className="text-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="inline-block text-6xl mb-4"
                    >
                      {tier.icon}
                    </motion.div>
                    <h3 className={`font-display text-3xl font-bold mb-2 ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className={`text-5xl font-bold mb-2 ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`}>
                      {tier.price.toLocaleString('fr-FR')}€
                    </div>
                    <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      TTC
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          tier.popular ? 'text-[#88A9C3]' : 'text-[#8B5CF6]'
                        }`} />
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCTAClick(tier.name)}
                    className={`w-full py-4 px-6 rounded-full font-bold transition-all ${
                      tier.popular
                        ? 'bg-[#88A9C3] text-black hover:bg-white'
                        : theme === 'light'
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-[#88A9C3] text-black hover:bg-white'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-6 bg-black/5">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-display font-bold text-center mb-4 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            Services Complémentaires
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-center mb-12 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
          >
            Complétez votre projet avec nos services premium
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`rounded-2xl p-6 border-2 ${
                  theme === 'light'
                    ? 'bg-white border-black'
                    : 'bg-surface border-white/10'
                }`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className={`text-xl font-bold mb-2 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {service.description}
                </p>
                <div className="text-2xl font-bold text-[#88A9C3] mb-4">
                  {service.price}
                </div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-1 text-[#88A9C3] flex-shrink-0" />
                      <span className={`text-xs ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 px-4 rounded-full text-sm font-bold transition-all ${
                    theme === 'light'
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-[#88A9C3] text-black hover:bg-white'
                  }`}
                >
                  En savoir plus
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6" id="contact-section">
        <div className="container mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-display font-bold text-center mb-12 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            Questions Fréquentes
          </motion.h2>

          <div className="space-y-4">
            {faqOffers.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border-2 rounded-2xl overflow-hidden ${
                  theme === 'light' ? 'border-black' : 'border-white/10'
                }`}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className={`w-full p-6 flex items-center justify-between text-left ${
                    theme === 'light' ? 'bg-white' : 'bg-surface'
                  }`}
                >
                  <span className={`font-bold text-lg ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}>
                    {faq.question}
                  </span>
                  {expandedFAQ === index ? (
                    <ChevronUp className={`w-5 h-5 ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`} />
                  )}
                </button>
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`p-6 border-t-2 ${
                      theme === 'light'
                        ? 'bg-white border-black text-gray-700'
                        : 'bg-surface/50 border-white/10 text-gray-300'
                    }`}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 px-6 bg-[#88A9C3]">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-black mb-6"
          >
            Prêt à Transformer Votre Présence Digitale ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-black/80 mb-8"
          >
            Discutons de votre projet et trouvons la formule parfaite pour vous
          </motion.p>
          <a
            href="/#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#88A9C3] text-black hover:bg-white font-bold rounded-full transition-all duration-300 text-lg"
          >
            <span>Demander un Devis</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}


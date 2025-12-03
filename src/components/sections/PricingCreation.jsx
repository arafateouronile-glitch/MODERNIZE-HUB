import { motion } from 'framer-motion'
import { Check, Sparkles, Rocket, Crown, ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Reveal } from '../animations/Reveal'
import { pricingTiers } from '../../data/offers'
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'

const iconMap = {
  '⚡': Sparkles,
  '🚀': Rocket,
  '👑': Crown,
}

export const PricingCreation = () => {
  const [ref, isVisible] = useScrollAnimation()
  const { theme } = useTheme()
  const navigate = useNavigate()

  const handleCTAClick = () => {
    navigate('/creation-site-web')
  }

  return (
    <section id="creation" ref={ref} className="py-32 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col items-center mb-20">
          <Reveal>
            <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-6 block">
              Création de Site Web
            </span>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className={`font-display text-5xl md:text-8xl font-bold uppercase leading-[0.9] mb-8 text-center ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}>
              VOTRE SITE WEB
              <br />
              <span className="text-[#D9FF00]">SUR-MESURE</span>
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <p className={`text-xl md:text-2xl max-w-3xl text-center font-light mb-8 ${
              theme === 'light' ? 'text-gray-700' : 'text-text-muted'
            }`}>
              Site web professionnel créé à partir de zéro avec design premium et technologies 2025
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {pricingTiers.map((tier, index) => {
            const IconComponent = iconMap[tier.icon] || Sparkles
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative group h-full flex flex-col p-8 border ${
                  tier.popular 
                    ? 'bg-white/5 border-[#D9FF00] shadow-[0_0_30px_rgba(217,255,0,0.1)] scale-105' 
                    : theme === 'light'
                    ? 'bg-white border-black hover:border-[#D9FF00]'
                    : 'bg-background border-white/10 hover:border-white/30'
                } transition-all duration-300`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D9FF00] text-black font-mono text-xs font-bold px-4 py-1 uppercase tracking-widest">
                    ⭐ POPULAIRE
                  </div>
                )}

                <div className="mb-8">
                  <div className="text-4xl mb-4">{tier.icon}</div>
                  <h3 className={`font-display text-3xl font-bold uppercase mb-2 ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}>
                    {tier.name}
                  </h3>
                  <p className={`font-mono text-xs mb-6 min-h-[40px] ${
                    theme === 'light' ? 'text-gray-600' : 'text-white/50'
                  }`}>
                    {tier.description}
                  </p>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`font-display text-5xl font-bold tracking-tighter ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`}>
                      {tier.price.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                </div>

                <div className={`flex-grow space-y-4 mb-8 border-t ${
                  theme === 'light' ? 'border-black/20' : 'border-white/10'
                } pt-8`}>
                  {tier.features.slice(0, 6).map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + idx * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        tier.popular ? 'text-[#D9FF00]' : 'text-[#8B5CF6]'
                      }`} />
                      <span className={`text-sm ${
                        theme === 'light' ? 'text-gray-700' : 'text-white/80'
                      }`}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCTAClick}
                  className={`w-full py-4 px-6 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-[#D9FF00] text-black hover:bg-white'
                      : theme === 'light'
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-[#D9FF00] text-black hover:bg-white'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        <Reveal delay={0.8}>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/creation-site-web')}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all ${
                theme === 'light'
                  ? 'bg-[#D9FF00] text-black hover:bg-white'
                  : 'bg-[#D9FF00] text-black hover:bg-white'
              }`}
            >
              Voir Toutes les Formules de Création
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}



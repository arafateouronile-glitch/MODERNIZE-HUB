import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../common/Button'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import { Reveal } from '../animations/Reveal'
import { scrollToSection } from '../../utils/helpers'
import { useCountUp } from '../../hooks/useCountUp'
import { CalendlyButton } from '../common/CalendlyButton'
import { LeadQuiz } from '../quiz/LeadQuiz'

export const Hero = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  // Stats avec counter animations
  const stats = [
    { value: '70+', label: 'Sites Transformés' },
    { value: '+320%', label: 'Leads en Moyenne' },
    { value: '14J', label: 'Livraison Garantie' },
    { value: '100%', label: 'Satisfait ou Remboursé' },
  ]

  return (
    <>
      <LeadQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-background">
      
      {/* Animated Background Gradients */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-secondary/10 rounded-full blur-[100px] animate-float pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#D9FF00]/30 bg-[#D9FF00]/10 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D9FF00]"></span>
            </span>
            <span className="text-xs font-mono text-[#D9FF00] tracking-widest uppercase">
              🔥 Plus que 2 places en Décembre • Réservez maintenant
            </span>
          </div>
        </Reveal>

        <motion.h1 
          style={{ y }}
          className="font-display text-5xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter mb-8 text-white"
        >
          <Reveal width="100%">
            <span>VOTRE SITE</span>
          </Reveal>
          <Reveal width="100%" delay={0.3}>
            <span style={{ color: '#D9FF00' }} className="text-[#D9FF00]">PERD</span>
          </Reveal>
          <Reveal width="100%" delay={0.5}>
            <span style={{ color: '#D9FF00' }} className="text-[#D9FF00]">10K€/MOIS</span>
          </Reveal>
        </motion.h1>

        <Reveal delay={0.7}>
          <p className="max-w-2xl mx-auto text-text-muted text-xl md:text-2xl font-light leading-relaxed mb-4">
            Pendant que vos concurrents récoltent VOS clients avec des sites qui convertissent.
          </p>
          <p className="text-white font-bold text-2xl mb-6">
            On change ça. <span style={{ color: '#D9FF00' }} className="text-[#D9FF00]">Maintenant.</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="/creation-site-web"
              className="px-6 py-3 border-2 border-white/20 hover:border-[#D9FF00] rounded-full text-white hover:text-[#D9FF00] transition-all text-sm font-medium"
            >
              ✨ Création de Site Web
            </a>
            <span className="text-white/50">•</span>
            <a
              href="/refonte-site"
              className="px-6 py-3 border-2 border-white/20 hover:border-[#D9FF00] rounded-full text-white hover:text-[#D9FF00] transition-all text-sm font-medium"
            >
              🔄 Refonte Design Ultra-Premium
            </a>
          </div>
          <p className="text-white/70 text-sm mb-12">
            Site web créé à partir de zéro ou refonte complète de votre site existant
          </p>
        </Reveal>

        <Reveal delay={0.9}>
          <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
            <CalendlyButton 
              variant="primary"
              text="Réserver Mon Appel Gratuit"
              className="shadow-[0_0_30px_rgba(217,255,0,0.4)] hover:shadow-[0_0_50px_rgba(217,255,0,0.6)]"
            />
            
            <a
              href="/portfolio"
              className="px-8 py-5 text-white font-medium hover:text-[#D9FF00] transition-colors flex items-center gap-3 group"
            >
              <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D9FF00] group-hover:bg-[#D9FF00]/10 transition-all">
                <Play size={16} className="ml-0.5 fill-current" />
              </span>
              <span>Voir Nos Transformations</span>
            </a>
          </div>

          {/* Quiz CTA */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#D9FF00]/30 bg-[#D9FF00]/5 hover:bg-[#D9FF00]/10 text-[#D9FF00] font-mono text-sm transition-all mb-16"
          >
            <Sparkles className="w-4 h-4" />
            <span>Quelle formule vous correspond ? (Quiz 2 min)</span>
          </button>
        </Reveal>

        {/* Stats Bandeau Défilant */}
        <Reveal delay={1.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="w-full overflow-hidden mb-12"
          >
            <div className="flex gap-8 animate-scroll-horizontal">
              {[
                { value: '200+', label: 'Sites créés' },
                { value: '+320%', label: 'Conversions moyennes' },
                { value: '10-21j', label: 'Livraison' },
                { value: '98%', label: 'Satisfaction' },
                { value: '200+', label: 'Sites créés' },
                { value: '+320%', label: 'Conversions moyennes' },
              ].map((stat, i) => (
                <div key={i} className="flex-shrink-0 flex items-center gap-4 px-6 py-3 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                  <div className="font-display text-2xl font-bold text-[#D9FF00]">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-white/70 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* Badges de Confiance */}
        <Reveal delay={1.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <div className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-sm font-bold text-[#D9FF00]">100%</span>
              <span className="text-xs text-white/70">Satisfait ou Remboursé</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-sm font-bold text-[#D9FF00]">🔒</span>
              <span className="text-xs text-white/70">Paiement Sécurisé</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <StatCounter key={i} stat={stat} index={i} />
            ))}
          </div>
        </Reveal>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Défiler</span>
      </motion.div>
    </section>
    </>
  )
}

// Composant pour animer les stats
const StatCounter = ({ stat, index }) => {
  const [count, ref] = useCountUp(stat.value, 2000)
  
  return (
    <div ref={ref} className="border-l border-white/10 pl-4 first:border-0 first:pl-0">
      <div className="font-display text-3xl md:text-4xl font-bold text-[#D9FF00] mb-1">
        {count}
      </div>
      <div className="font-mono text-[10px] uppercase text-text-muted tracking-wider">
        {stat.label}
      </div>
    </div>
  )
}

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, lazy, Suspense, useEffect } from 'react'
import { Button } from '../common/Button'
import { Play, ArrowRight, Sparkles, Zap } from 'lucide-react'
import { Reveal } from '../animations/Reveal'
import { scrollToSection } from '../../utils/helpers'
import { useCountUp } from '../../hooks/useCountUp'
import { LeadQuiz } from '../quiz/LeadQuiz'

// Lazy load 3D scene pour performance (chargé après le premier rendu)
const Hero3DScene = lazy(() => import('../3d/Hero3DScene'))

export const Hero = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    const useIdle = typeof requestIdleCallback !== 'undefined'
    const id = useIdle
      ? requestIdleCallback(() => setShow3D(true), { timeout: 2000 })
      : setTimeout(() => setShow3D(true), 400)
    return () => (useIdle ? cancelIdleCallback(id) : clearTimeout(id))
  }, [])

  const stats = [
    { value: '70+', label: 'Systèmes Déployés' },
    { value: '+15H', label: 'Récupérées/Semaine' },
    { value: '14J', label: 'Activation Garantie' },
    { value: '100%', label: 'Satisfait ou Remboursé' },
  ]

  return (
    <>
      <LeadQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-12 overflow-hidden bg-background">

      {show3D && (
        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>
      )}

      {/* Animated Background Gradients */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-secondary/10 rounded-full blur-[100px] animate-float pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center w-full">

        {/* Badge elite */}
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#88A9C3]/30 bg-[#88A9C3]/5 rounded-full mb-8 sm:mb-10">
            <Zap className="w-3 h-3 text-[#88A9C3]" />
            <span className="font-mono text-[#88A9C3] text-xs uppercase tracking-[0.2em]">Infrastructure IA · Sur Mesure Métier · Opérationnelle en 14J</span>
          </div>
        </Reveal>

        <motion.h1
          style={{ y }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[9rem] font-bold leading-[0.9] sm:leading-[0.85] tracking-tighter mb-6 sm:mb-8 text-white px-2"
        >
          <Reveal width="100%">
            <span>VOTRE BUSINESS</span>
          </Reveal>
          <Reveal width="100%" delay={0.3}>
            <span style={{ color: '#88A9C3' }} className="text-[#88A9C3]">TOURNE SANS</span>
          </Reveal>
          <Reveal width="100%" delay={0.5}>
            <span style={{ color: '#88A9C3' }} className="text-[#88A9C3]">VOUS.</span>
          </Reveal>
        </motion.h1>

        <Reveal delay={0.7}>
          <p className="max-w-2xl mx-auto text-text-muted text-base sm:text-xl md:text-2xl font-light leading-relaxed mb-3 sm:mb-4 px-2">
            Vos devis tapés à la main. Vos relances sur WhatsApp. Vos leads dans un tableur.{' '}
            <span className="text-white font-semibold">Ça s'arrête maintenant.</span>
          </p>
          <p className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 px-2">
            On construit l'infrastructure qui gère tout ça à votre place —{' '}
            <span style={{ color: '#88A9C3' }} className="text-[#88A9C3]">calibrée sur votre métier.</span>
          </p>
          <p className="text-white/60 text-sm mb-8 sm:mb-12 px-2 max-w-xl mx-auto">
            Admin · Devis · Relances · Qualification leads · CRM · Prise de RDV — rien ne se fait plus à la main.
          </p>
        </Reveal>

        <Reveal delay={0.9}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center mb-4 sm:mb-6 w-full px-2">
            <a
              href="/#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#88A9C3] text-black hover:bg-white font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(136,169,195,0.4)] hover:shadow-[0_0_50px_rgba(136,169,195,0.6)]"
            >
              <span>Automatiser mon Business</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/#systeme"
              className="px-6 sm:px-8 py-4 sm:py-5 text-white font-medium hover:text-[#88A9C3] transition-colors flex items-center gap-2 sm:gap-3 group w-full sm:w-auto justify-center"
            >
              <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#88A9C3] group-hover:bg-[#88A9C3]/10 transition-all flex-shrink-0">
                <Play size={14} className="sm:w-4 sm:h-4 ml-0.5 fill-current" />
              </span>
              <span className="text-sm sm:text-base">Voir le Système</span>
            </a>
          </div>

          {/* Quiz CTA */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-[#88A9C3]/30 bg-[#88A9C3]/5 hover:bg-[#88A9C3]/10 text-[#88A9C3] font-mono text-xs sm:text-sm transition-all mb-8 sm:mb-16 max-w-full"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">Quel système pour mon business ? (2 min)</span>
          </button>
        </Reveal>

        {/* Stats Bandeau Défilant */}
        <Reveal delay={1.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="w-full overflow-hidden mb-8 sm:mb-12 -mx-4 sm:mx-0"
          >
            <div className="flex gap-4 sm:gap-8 animate-scroll-horizontal">
              {[
                { value: '70+', label: 'Systèmes déployés' },
                { value: '+15H', label: 'Récupérées par semaine' },
                { value: 'ROI ×4', label: 'Retour moyen à 90j' },
                { value: '24/7', label: 'Disponibilité IA' },
                { value: '70+', label: 'Systèmes déployés' },
                { value: '+15H', label: 'Récupérées par semaine' },
              ].map((stat, i) => (
                <div key={i} className="flex-shrink-0 flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-2 sm:py-3 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                  <div className="font-display text-xl sm:text-2xl font-bold text-[#88A9C3]">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/70 uppercase whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* Badges de Confiance */}
        <Reveal delay={1.3}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-16 px-2">
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-xs sm:text-sm font-bold text-[#88A9C3]">100%</span>
              <span className="text-[10px] sm:text-xs text-white/70 whitespace-nowrap">Satisfait ou Remboursé</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-xs sm:text-sm font-bold text-[#88A9C3]">🎯</span>
              <span className="text-[10px] sm:text-xs text-white/70 whitespace-nowrap">Sur Mesure Métier</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-xs sm:text-sm font-bold text-[#88A9C3]">⚡</span>
              <span className="text-[10px] sm:text-xs text-white/70 whitespace-nowrap">Activation en 14 Jours</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center w-full px-2">
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
        className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Découvrir</span>
      </motion.div>
    </section>
    </>
  )
}

const StatCounter = ({ stat, index }) => {
  const [count, ref] = useCountUp(stat.value, 2000)

  return (
    <div ref={ref} className="border-l border-white/10 pl-3 sm:pl-4 first:border-0 first:pl-0">
      <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#88A9C3] mb-1">
        {count}
      </div>
      <div className="font-mono text-[9px] sm:text-[10px] uppercase text-text-muted tracking-wider leading-tight">
        {stat.label}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PricingCard } from '../pricing/PricingCard'
import { PricingComparison } from '../pricing/PricingComparison'
import { pricingPlans, getTimeRemaining } from '../../data/pricing'
import { calculateTimeRemaining } from '../../utils/helpers'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Reveal } from '../animations/Reveal'
import { AlertTriangle } from 'lucide-react'

export const Pricing = () => {
  const [ref, isVisible] = useScrollAnimation()
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const endDate = getTimeRemaining()
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(endDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="offres" ref={ref} className="py-32 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col items-center mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-[#D9FF00]/10 border border-[#D9FF00]/30 rounded-full">
              <AlertTriangle className="w-4 h-4 text-[#D9FF00] animate-pulse" />
              <span className="font-mono text-sm text-[#D9FF00] tracking-widest uppercase">
                Alerte : Plus que {3 - (new Date().getDate() % 3)} places disponibles
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-[0.9] mb-8 text-center">
              COMBIEN COÛTE<br/>
              <span className="text-[#D9FF00]">VOTRE INACTION ?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-xl md:text-2xl text-text-muted max-w-3xl text-center font-light mb-8">
              Pendant que vous réfléchissez, vos concurrents prennent VOS parts de marché.
            </p>
            <div className="inline-block bg-surface border border-white/10 px-8 py-4">
              <span className="font-mono text-white/50 text-xs uppercase mr-4">Tarif Préférentiel Expire Dans</span>
              <span className="font-mono text-[#D9FF00] text-2xl font-bold">
                {String(timeRemaining.days).padStart(2, '0')}:{String(timeRemaining.hours).padStart(2, '0')}:{String(timeRemaining.minutes).padStart(2, '0')}:{String(timeRemaining.seconds).padStart(2, '0')}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Comparison Table */}
        <PricingComparison />

        <Reveal delay={0.8}>
          <div className="mt-20 text-center">
            <p className="font-mono text-sm text-text-muted mb-4">
              ✅ Satisfait ou 100% Remboursé • ✅ Paiement 3x Sans Frais • ✅ Support 30 Jours Inclus
            </p>
            <p className="text-white/50 text-xs">
              Prix TTC. Aucun frais caché. Jamais.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

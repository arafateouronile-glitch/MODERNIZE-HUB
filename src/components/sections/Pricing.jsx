import { motion } from 'framer-motion'
import { PricingCard } from '../pricing/PricingCard'
import { PricingComparison } from '../pricing/PricingComparison'
import { pricingPlans } from '../../data/pricing'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Reveal } from '../animations/Reveal'
import { lazy, Suspense } from 'react'

// Lazy load 3D scene
const PricingScene = lazy(() => import('../3d/PricingScene'))

export const Pricing = () => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="refonte" ref={ref} className="py-32 bg-background relative z-10 border-t border-white/5 overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <PricingScene />
      </Suspense>
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center mb-20">
          <Reveal>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-[0.9] mb-8 text-center">
              COMBIEN COÛTE<br/>
              <span className="text-[#88A9C3]">VOTRE INACTION ?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-text-muted max-w-3xl text-center font-light mb-8">
              Pendant que vous réfléchissez, vos concurrents prennent VOS parts de marché.
            </p>
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

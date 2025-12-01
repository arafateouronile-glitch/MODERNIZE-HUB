import { motion } from 'framer-motion'
import { Reveal } from '../animations/Reveal'
import { Check, X, TrendingUp, Zap } from 'lucide-react'

export const PricingJustification = () => {
  const comparison = [
    {
      label: 'Template WordPress',
      price: '300€',
      problems: [
        'Design générique (milliers identiques)',
        'Pas optimisé mobile',
        'Lent (Score 40-60/100)',
        'Aucun support',
        'Obsolète en 6 mois',
      ],
      result: '0€ de ROI'
    },
    {
      label: 'Agence Classique',
      price: '8 000€+',
      problems: [
        'Délais 2-3 mois',
        'Processus lourd',
        'Prix opaques (+30% de dépassements)',
        'Freelances sous-traités',
        'Maintenance coûteuse',
      ],
      result: 'ROI incertain'
    },
    {
      label: 'Modernize Hub',
      price: '1 490€ - 5 990€',
      benefits: [
        'Design 100% sur-mesure',
        'Livraison 7-21 jours',
        'Score 95+ garantis',
        'Support 30-90 jours inclus',
        'Prix fixe, transparent',
      ],
      result: '+320% conversions en moyenne'
    },
  ]

  const valueBreakdown = [
    { item: 'Design custom premium', market: '3 500€', us: 'Inclus' },
    { item: 'Développement React/Vite', market: '4 000€', us: 'Inclus' },
    { item: 'Optimisation SEO technique', market: '1 200€', us: 'Inclus' },
    { item: 'Animations Framer Motion', market: '800€', us: 'Inclus' },
    { item: 'Responsive perfect', market: '600€', us: 'Inclus' },
    { item: 'Support 30 jours', market: '500€', us: 'Inclus' },
    { item: 'Révisions', market: '400€', us: 'Inclus' },
  ]

  const totalMarketValue = '11 000€+'

  return (
    <section className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <Reveal>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-6 block">
              Transparence Totale
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase leading-[0.9] mb-8">
              POURQUOI<br/>
              <span className="text-[#D9FF00]">CES PRIX ?</span>
            </h2>
            <p className="text-xl text-white/80 font-light">
              Comparez. Calculez. Décidez en connaissance de cause.
            </p>
          </div>
        </Reveal>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {comparison.map((option, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className={`border-2 p-8 h-full flex flex-col ${
                index === 2 
                  ? 'border-[#D9FF00] bg-[#D9FF00]/5 relative' 
                  : 'border-white/10 bg-white/5'
              }`}>
                {index === 2 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D9FF00] text-black px-6 py-2 font-mono text-xs font-bold uppercase">
                    Notre Offre
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {option.label}
                  </h3>
                  <div className="font-display text-4xl font-bold text-[#D9FF00]">
                    {option.price}
                  </div>
                </div>

                <div className="flex-1 space-y-3 mb-6">
                  {option.problems && option.problems.map((problem, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-white/60">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{problem}</span>
                    </div>
                  ))}
                  {option.benefits && option.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-white">
                      <Check className="w-4 h-4 text-[#D9FF00] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className={`pt-4 border-t ${index === 2 ? 'border-[#D9FF00]/30' : 'border-white/10'}`}>
                  <div className="font-mono text-xs uppercase text-white/50 mb-1">Résultat</div>
                  <div className={`font-bold ${index === 2 ? 'text-[#D9FF00]' : 'text-white/60'}`}>
                    {option.result}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Value Breakdown */}
        <Reveal delay={0.4}>
          <div className="max-w-4xl mx-auto border border-white/10 bg-white/5 p-8 md:p-12">
            <h3 className="font-display text-3xl font-bold text-white mb-8 text-center">
              Détail de la Valeur <span className="text-[#D9FF00]">(Formule Transformation)</span>
            </h3>

            <div className="space-y-4 mb-8">
              {valueBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                  <span className="text-white/80">{item.item}</span>
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-sm text-white/40 line-through">
                      Marché: {item.market}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#D9FF00] min-w-[80px] text-right">
                      {item.us}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t-2 border-[#D9FF00]/30">
              <div>
                <div className="text-white/50 text-sm mb-1">Valeur marché total</div>
                <div className="font-display text-3xl font-bold text-white line-through decoration-red-500">
                  {totalMarketValue}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#D9FF00] text-sm font-mono mb-1">Notre Prix</div>
                <div className="font-display text-4xl font-bold text-[#D9FF00]">
                  3 490€
                </div>
                <div className="text-white/50 text-xs mt-1">
                  Économie de 68%
                </div>
              </div>
            </div>

            {/* ROI Calculation */}
            <div className="mt-12 p-6 bg-[#D9FF00]/10 border border-[#D9FF00]/30">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-[#D9FF00] flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-2">Calcul ROI Réel</h4>
                  <p className="text-sm text-white/80 mb-3">
                    Site actuel : ~10 visiteurs/jour × 0% conversion = <span className="font-bold text-red-500">0 lead</span>
                  </p>
                  <p className="text-sm text-white/80 mb-3">
                    Nouveau site : ~10 visiteurs/jour × 8% conversion = <span className="font-bold text-[#D9FF00]">~24 leads/mois</span>
                  </p>
                  <p className="text-sm text-white font-bold">
                    Si 1 lead = 500€ de CA → <span className="text-[#D9FF00]">12 000€/mois</span> 
                    <br/>
                    <span className="text-xs font-normal text-white/60">Investissement récupéré en 8 jours</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all"
              >
                <Zap className="w-5 h-5" />
                <span>Je Veux Ce ROI →</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}



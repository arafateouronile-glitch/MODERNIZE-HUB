import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronDown } from 'lucide-react'
import { pricingPlans } from '../../data/pricing'

const comparisonFeatures = [
  {
    category: 'Design & Développement',
    features: [
      { name: 'Pages incluses', express: '1 longue + 3 sous-pages', transformation: '5-8 pages', premium: '10-15 pages' },
      { name: 'Design custom', express: true, transformation: true, premium: true },
      { name: 'Responsive (Mobile/Tablet)', express: true, transformation: true, premium: true },
      { name: 'Animations', express: 'Basiques', transformation: 'Avancées', premium: 'Ultra-premium 3D' },
      { name: 'Copywriting', express: false, transformation: 'Basique', premium: 'Expert SEO' },
    ]
  },
  {
    category: 'Performance & SEO',
    features: [
      { name: 'Optimisation vitesse', express: 'Score 90+', transformation: 'Score 95+', premium: 'Score 98+' },
      { name: 'SEO technique', express: 'Basique', transformation: 'Complet', premium: 'Expert + Schema' },
      { name: 'Analytics Setup', express: false, transformation: true, premium: true },
      { name: 'Backlinks & Netlinking', express: false, transformation: false, premium: true },
    ]
  },
  {
    category: 'Fonctionnalités',
    features: [
      { name: 'Formulaire contact', express: true, transformation: true, premium: true },
      { name: 'CMS (gestion facile)', express: false, transformation: 'Optionnel', premium: true },
      { name: 'Blog intégré', express: false, transformation: false, premium: true },
      { name: 'Multilingue', express: false, transformation: false, premium: true },
      { name: 'E-commerce', express: false, transformation: false, premium: 'Optionnel' },
    ]
  },
  {
    category: 'Support & Garanties',
    features: [
      { name: 'Délai livraison', express: '7 jours', transformation: '14 jours', premium: '21-28 jours' },
      { name: 'Révisions incluses', express: '1 révision', transformation: '2 révisions', premium: 'Illimitées' },
      { name: 'Support post-lancement', express: '14 jours', transformation: '30 jours', premium: '90 jours' },
      { name: 'Formation', express: false, transformation: '1h vidéo', premium: '3h personnalisée' },
      { name: 'Garantie satisfait/remboursé', express: true, transformation: true, premium: true },
    ]
  },
]

export const PricingComparison = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState([0]) // First category open by default

  const toggleCategory = (index) => {
    setExpandedCategories(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const renderCell = (value) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-[#D9FF00] mx-auto" />
    }
    if (value === false) {
      return <X className="w-5 h-5 text-white/20 mx-auto" />
    }
    return <span className="text-sm text-white/80 text-center block">{value}</span>
  }

  return (
    <div className="mt-20">
      {/* Toggle Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group inline-flex items-center gap-3 px-6 py-3 bg-surface border border-[#D9FF00]/30 hover:bg-[#D9FF00]/10 transition-all duration-300 font-mono text-sm uppercase tracking-widest"
        >
          <span className="text-[#D9FF00]">
            {isOpen ? 'Masquer' : 'Comparer'} les Formules en Détail
          </span>
          <ChevronDown className={`w-4 h-4 text-[#D9FF00] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Comparison Table */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="border border-white/10 bg-surface/50 backdrop-blur-sm overflow-x-auto">
              {/* Header */}
              <div className="grid grid-cols-4 border-b border-white/10 bg-white/5 sticky top-0 z-10">
                <div className="p-4 font-mono text-xs uppercase text-white/50">
                  Fonctionnalités
                </div>
                {pricingPlans.map(plan => (
                  <div key={plan.id} className={`p-4 text-center ${plan.highlighted ? 'bg-[#D9FF00]/5 border-l border-r border-[#D9FF00]/20' : ''}`}>
                    <div className="font-display text-lg font-bold text-white mb-1">
                      {plan.name}
                    </div>
                    <div className="font-mono text-2xl font-bold text-[#D9FF00]">
                      {plan.price}€
                    </div>
                  </div>
                ))}
              </div>

              {/* Categories & Features */}
              {comparisonFeatures.map((category, catIndex) => (
                <div key={catIndex} className="border-b border-white/10">
                  {/* Category Header - Collapsible */}
                  <button
                    onClick={() => toggleCategory(catIndex)}
                    className="w-full grid grid-cols-4 p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
                  >
                    <div className="col-span-4 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#D9FF00] uppercase tracking-wider">
                        {category.category}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-[#D9FF00] transition-transform ${expandedCategories.includes(catIndex) ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Features - Expandable */}
                  <AnimatePresence>
                    {expandedCategories.includes(catIndex) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {category.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className={`grid grid-cols-4 p-4 ${idx % 2 === 0 ? 'bg-black/20' : 'bg-black/10'} hover:bg-white/5 transition-colors`}
                          >
                            <div className="font-mono text-sm text-white/70">
                              {feature.name}
                            </div>
                            <div className={`flex items-center justify-center ${pricingPlans[0].highlighted ? 'bg-[#D9FF00]/5' : ''}`}>
                              {renderCell(feature.express)}
                            </div>
                            <div className={`flex items-center justify-center ${pricingPlans[1].highlighted ? 'bg-[#D9FF00]/5' : ''}`}>
                              {renderCell(feature.transformation)}
                            </div>
                            <div className={`flex items-center justify-center ${pricingPlans[2].highlighted ? 'bg-[#D9FF00]/5' : ''}`}>
                              {renderCell(feature.premium)}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Footer CTA */}
              <div className="p-6 bg-white/5 text-center">
                <p className="font-mono text-sm text-white/50 mb-4">
                  Toutes les formules incluent : Satisfait ou 100% Remboursé • Support 30 Jours • Paiement 3x Sans Frais
                </p>
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact')
                    contactSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="px-8 py-3 bg-[#D9FF00] text-black font-bold hover:bg-white transition-colors"
                >
                  Choisir Ma Formule →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}



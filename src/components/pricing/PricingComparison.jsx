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
      return <Check className="w-5 h-5 text-[#88A9C3] mx-auto" />
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
          className="group inline-flex items-center gap-3 px-6 py-3 bg-surface border border-[#88A9C3]/30 hover:bg-[#88A9C3]/10 transition-all duration-300 font-mono text-sm uppercase tracking-widest"
        >
          <span className="text-[#88A9C3]">
            {isOpen ? 'Masquer' : 'Comparer'} les Formules en Détail
          </span>
          <ChevronDown className={`w-4 h-4 text-[#88A9C3] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
            <div className="border border-white/10 bg-surface/50 backdrop-blur-sm">
              {/* Scrollable container for mobile */}
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  {/* Header */}
                  <div className="grid grid-cols-[minmax(150px,1fr)_repeat(3,minmax(120px,1fr))] border-b border-white/10 bg-white/5 sticky top-0 z-10">
                    <div className="p-3 md:p-4 font-mono text-[10px] md:text-xs uppercase text-white/50">
                      Fonctionnalités
                    </div>
                    {pricingPlans.map(plan => (
                      <div key={plan.id} className={`p-3 md:p-4 text-center ${plan.highlighted ? 'bg-[#88A9C3]/5 border-l border-r border-[#88A9C3]/20' : ''}`}>
                        <div className="font-display text-sm md:text-lg font-bold text-white mb-1 whitespace-nowrap">
                          {plan.name}
                        </div>
                        <div className="font-mono text-lg md:text-2xl font-bold text-[#88A9C3]">
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
                        className="w-full p-3 md:p-4 bg-white/5 hover:bg-white/10 transition-colors text-left flex items-center justify-between"
                      >
                        <span className="font-mono text-xs md:text-sm font-bold text-[#88A9C3] uppercase tracking-wider">
                          {category.category}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-[#88A9C3] transition-transform ${expandedCategories.includes(catIndex) ? 'rotate-180' : ''}`} />
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
                                className={`grid grid-cols-[minmax(150px,1fr)_repeat(3,minmax(120px,1fr))] p-3 md:p-4 ${idx % 2 === 0 ? 'bg-black/20' : 'bg-black/10'} hover:bg-white/5 transition-colors`}
                              >
                                <div className="font-mono text-xs md:text-sm text-white/70 pr-2">
                                  {feature.name}
                                </div>
                                <div className={`flex items-center justify-center ${pricingPlans[0].highlighted ? 'bg-[#88A9C3]/5' : ''}`}>
                                  {renderCell(feature.express)}
                                </div>
                                <div className={`flex items-center justify-center ${pricingPlans[1].highlighted ? 'bg-[#88A9C3]/5' : ''}`}>
                                  {renderCell(feature.transformation)}
                                </div>
                                <div className={`flex items-center justify-center ${pricingPlans[2].highlighted ? 'bg-[#88A9C3]/5' : ''}`}>
                                  {renderCell(feature.premium)}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-4 md:p-6 bg-white/5 text-center">
                <p className="font-mono text-xs md:text-sm text-white/50 mb-4 px-2">
                  Toutes les formules incluent : Satisfait ou 100% Remboursé • Support 30 Jours • Paiement 3x Sans Frais
                </p>
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact')
                    contactSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="px-6 md:px-8 py-3 bg-[#88A9C3] text-black font-bold hover:bg-white transition-colors text-sm md:text-base"
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




import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '../common/Button'
import { scrollToSection } from '../../utils/helpers'

export const PricingCard = ({ plan, index }) => {
  const isPopular = plan.highlighted

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`relative group h-full flex flex-col p-8 border ${
        isPopular 
          ? 'bg-white/5 border-[#88A9C3] shadow-[0_0_30px_rgba(136,169,195,0.1)]' 
          : 'bg-background border-white/10 hover:border-white/30'
      } transition-all duration-300`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#88A9C3] text-black font-mono text-xs font-bold px-4 py-1 uppercase tracking-widest">
          Recommandé
        </div>
      )}

      <div className="mb-8">
        <h3 className="font-display text-3xl font-bold text-white uppercase mb-2">{plan.name}</h3>
        <p className="font-mono text-xs text-white/50 mb-6 min-h-[40px]">{plan.tagline}</p>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-display text-5xl font-bold text-white tracking-tighter">
            {plan.price}€
          </span>
        </div>
        <div className="font-mono text-sm text-white/40 line-through decoration-[#88A9C3]">
           AVANT {plan.oldPrice}€
        </div>
      </div>

      <div className="flex-grow space-y-4 mb-8 border-t border-white/10 pt-8">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3 text-sm font-light text-white/80">
            <span className="text-[#88A9C3] mt-1">
              <Check className="w-4 h-4" />
            </span>
            <span>{feature}</span>
          </div>
        ))}
        
        {plan.bonuses && (
           <div className="mt-6 pt-6 border-t border-dashed border-white/10">
              <p className="font-mono text-xs text-[#88A9C3] mb-3 uppercase">Accès Bonus</p>
              {plan.bonuses.map((bonus, idx) => (
                <div key={idx} className="font-mono text-xs text-white/60 mb-2 flex items-center gap-2">
                  <span>+</span> {bonus}
                </div>
              ))}
            </div>
        )}
      </div>

      <button 
        onClick={() => scrollToSection('contact')}
        className={`w-full py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
          isPopular
            ? 'bg-[#88A9C3] text-black hover:bg-white'
            : 'bg-transparent border border-[#88A9C3] text-[#88A9C3] hover:bg-[#88A9C3] hover:text-black'
        }`}
      >
        Select Plan
      </button>
    </motion.div>
  )
}

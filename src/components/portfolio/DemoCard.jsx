import { useState } from 'react'
import { motion } from 'framer-motion'
import { BeforeAfter } from './BeforeAfter'
import { DemoModal } from './DemoModal'
import { PortfolioViewer } from './PortfolioViewer'
import { ArrowUpRight } from 'lucide-react'

export const DemoCard = ({ demo, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const [portfolioType, setPortfolioType] = useState('after')

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative bg-surface border border-white/10 hover:border-primary transition-colors duration-500 overflow-hidden"
      >
        {/* Header Strip */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             <span className="font-mono text-xs uppercase tracking-widest text-white/70">
              {demo.category}
            </span>
          </div>
          <span className="font-mono text-xs text-white/30">
            ÉTUDE DE CAS #{index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
        </div>

        {/* Visual Content */}
        <div className="p-4 bg-black/20">
          <div className="relative group-hover:scale-[1.01] transition-transform duration-700">
            <BeforeAfter 
              before={demo.before} 
              after={demo.after}
              onBeforeClick={() => {
                setPortfolioType('before')
                setIsPortfolioOpen(true)
              }}
              onAfterClick={() => {
                setPortfolioType('after')
                setIsPortfolioOpen(true)
              }}
            />
          </div>
        </div>

        {/* Footer Stats & Actions */}
        <div className="p-6">
          {/* Story Quote */}
          {demo.story && (
            <div className="mb-6 p-4 border-l-2 border-[#88A9C3] bg-[#88A9C3]/5">
              <p className="text-sm text-white/90 italic leading-relaxed font-light">
                {demo.story}
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-8 border-b border-white/10 pb-6">
            {demo.stats.map((stat, idx) => (
              <div key={idx} className="text-left">
                <div className="font-display text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] uppercase text-white/40 tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setPortfolioType('after')
                setIsPortfolioOpen(true)
              }}
              className="flex-1 py-4 bg-[#88A9C3] text-black font-bold font-mono text-sm hover:bg-white transition-colors duration-300 uppercase tracking-wider"
            >
              Voir le Projet
            </button>
            
            <button
               onClick={() => {
                setPortfolioType('before')
                setIsPortfolioOpen(true)
              }}
              className="w-14 h-14 flex items-center justify-center border border-[#88A9C3] text-[#88A9C3] hover:bg-[#88A9C3] hover:text-black transition-all duration-300"
            >
              <span className="font-mono text-xs">AVANT</span>
            </button>
             <button
              onClick={() => setIsModalOpen(true)}
              className="w-14 h-14 flex items-center justify-center border border-[#88A9C3] text-[#88A9C3] hover:bg-[#88A9C3] hover:text-black transition-all duration-300 group/btn"
            >
              <ArrowUpRight className="w-5 h-5 group-hover/btn:rotate-45 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      <DemoModal
        demo={demo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <PortfolioViewer
        demo={demo}
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        type={portfolioType}
      />
    </>
  )
}

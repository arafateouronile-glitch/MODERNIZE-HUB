import { motion } from 'framer-motion'
import { Reveal } from '../animations/Reveal'

// Logos clients (fictifs mais crédibles)
const clientLogos = [
  { name: 'VANDERBILT & ASSOCIÉS', category: 'Cabinet Juridique' },
  { name: 'LE GOURMET', category: 'Restaurant' },
  { name: 'PRESTIGE IMMO', category: 'Immobilier' },
  { name: 'APEX FITNESS', category: 'Sport' },
  { name: 'ÉLEC-PRO', category: 'Artisan' },
  { name: 'NOVA CONSULTING', category: 'Conseil' },
  { name: 'LUXE BEAUTÉ', category: 'Esthétique' },
  { name: 'TECH INNOVATIONS', category: 'Tech' },
]

export const ClientLogos = () => {
  return (
    <section className="py-20 bg-background border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <span className="font-mono text-[#D9FF00] text-xs tracking-widest uppercase mb-4 block">
              Ils Nous Font Confiance
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-bold text-white uppercase">
              70+ Clients Satisfaits
            </h3>
          </div>
        </Reveal>

        {/* Infinite Scroll Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-12"
              animate={{
                x: [0, -1800],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate logos for seamless loop */}
              {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[250px] h-[120px] border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#D9FF00]/30 transition-all duration-300 flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="font-display text-xl font-bold text-white group-hover:text-[#D9FF00] transition-colors text-center px-4">
                    {client.name}
                  </div>
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                    {client.category}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* Stats */}
        <Reveal delay={0.4}>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div className="border-l border-white/10 pl-4 first:border-0">
              <div className="font-display text-4xl font-bold text-[#D9FF00] mb-1">70+</div>
              <div className="font-mono text-[10px] uppercase text-white/50 tracking-wider">
                Projets Livrés
              </div>
            </div>
            <div className="border-l border-white/10 pl-4">
              <div className="font-display text-4xl font-bold text-[#D9FF00] mb-1">4.9/5</div>
              <div className="font-mono text-[10px] uppercase text-white/50 tracking-wider">
                Satisfaction
              </div>
            </div>
            <div className="border-l border-white/10 pl-4">
              <div className="font-display text-4xl font-bold text-[#D9FF00] mb-1">100%</div>
              <div className="font-mono text-[10px] uppercase text-white/50 tracking-wider">
                Respectent Délais
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}




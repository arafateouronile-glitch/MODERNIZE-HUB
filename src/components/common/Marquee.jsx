import { motion } from 'framer-motion'

export const Marquee = () => {
  return (
    <div className="relative flex overflow-hidden py-10 bg-black border-y border-[#88A9C3] transform -rotate-2 scale-110 z-20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            <span className="text-4xl md:text-6xl font-black text-[#88A9C3] uppercase tracking-tighter">
              SYSTÈMES D'IA AUTONOMES
            </span>
            <span className="w-4 h-4 bg-[#88A9C3] rounded-full" />
            <span className="text-4xl md:text-6xl font-black text-transparent uppercase tracking-tighter" style={{ WebkitTextStroke: "1px #88A9C3" }}>
              WEB & AUTOMATISATION
            </span>
            <span className="w-4 h-4 bg-[#88A9C3] rounded-full" />
            <span className="text-4xl md:text-6xl font-black text-[#88A9C3] uppercase tracking-tighter">
              LEAD GENERATION 24/7
            </span>
            <span className="w-4 h-4 bg-[#88A9C3] rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}


import { motion } from 'framer-motion'

export const Marquee = () => {
  return (
    <div className="relative flex overflow-hidden py-10 bg-black border-y border-[#D9FF00] transform -rotate-2 scale-110 z-20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            <span className="text-4xl md:text-6xl font-black text-[#D9FF00] uppercase tracking-tighter">
              EXPÉRIENCES DIGITALES
            </span>
            <span className="w-4 h-4 bg-[#D9FF00] rounded-full" />
            <span className="text-4xl md:text-6xl font-black text-transparent uppercase tracking-tighter" style={{ WebkitTextStroke: "1px #D9FF00" }}>
              DESIGN WEB
            </span>
            <span className="w-4 h-4 bg-[#D9FF00] rounded-full" />
            <span className="text-4xl md:text-6xl font-black text-[#D9FF00] uppercase tracking-tighter">
              DÉVELOPPEMENT CRÉATIF
            </span>
            <span className="w-4 h-4 bg-[#D9FF00] rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}


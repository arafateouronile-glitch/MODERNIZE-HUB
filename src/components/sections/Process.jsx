import { motion } from 'framer-motion'
import { MessageCircle, Palette, Code, Rocket, Check, Terminal } from 'lucide-react'
import { processSteps, guarantees } from '../../data/process'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const iconMap = {
  MessageCircle,
  Palette,
  Code,
  Rocket,
}

export const Process = () => {
  const [ref, isVisible] = useScrollAnimation()

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName] || Terminal
    return <Icon className="w-5 h-5 text-black" />
  }

  return (
    <section id="process" ref={ref} className="py-32 bg-surfaceHighlight relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-4 block">
            System Protocol
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase mb-8">
            Execution<br/>Pipeline
          </h2>
          <p className="font-mono text-text-muted max-w-xl">
            {'>'} Initializing 4-step sequence... <br/>
            {'>'} Target: Launch in 14 days. <br/>
            {'>'} Status: Ready to deploy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <div className="space-y-0">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 pb-16 border-l border-white/10 last:pb-0 group"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-white group-hover:bg-[#D9FF00] transition-colors duration-300 flex items-center justify-center border-4 border-surfaceHighlight">
                  {getIcon(step.icon)}
                </div>
                
                <div className="bg-white/5 border border-white/5 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-2xl font-bold text-white uppercase">{step.title}</h3>
                    <span className="font-mono text-xs text-[#D9FF00] px-2 py-1 bg-[#D9FF00]/10 rounded">
                      {step.days}
                    </span>
                  </div>
                  <p className="text-text-muted text-sm mb-4 font-light">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 font-mono text-xs text-white/60">
                        <span className="text-[#D9FF00]">{'>'}</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guarantees - Terminal Style */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-black border border-white/20 p-8 font-mono text-sm relative overflow-hidden">
               {/* Scanline */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[10px] w-full animate-scan pointer-events-none opacity-20" />
               
               <div className="flex items-center gap-2 mb-8 text-white/40 pb-4 border-b border-white/10">
                 <div className="w-3 h-3 rounded-full bg-red-500" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500" />
                 <div className="w-3 h-3 rounded-full bg-green-500" />
                 <span className="ml-2">guarantees.sh</span>
               </div>

               <div className="space-y-8">
                 {guarantees.map((item, idx) => (
                   <motion.div 
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex gap-4"
                   >
                     <span className="text-[#D9FF00] text-xl">{item.icon}</span>
                     <div>
                       <div className="text-white font-bold uppercase mb-1">{item.title}</div>
                       <div className="text-white/50">{item.description}</div>
                     </div>
                   </motion.div>
                 ))}
               </div>

               <div className="mt-8 pt-4 border-t border-white/10 text-[#D9FF00] animate-pulse">
                 _ Cursor blinking... Waiting for input
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

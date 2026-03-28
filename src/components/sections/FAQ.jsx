import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { faqs } from '../../data/faqs'

export const FAQ = () => {
  const [ref, isVisible] = useScrollAnimation()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" ref={ref} className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
          >
            <span className="font-mono text-primary text-sm tracking-widest uppercase mb-4 block">
              F.A.Q.
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase mb-8">
              VOS<br/>QUESTIONS
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="border border-white/10 bg-white/5"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex justify-between items-center p-6 text-left group hover:bg-white/5 transition-colors"
                >
                  <span className="font-mono text-sm text-white uppercase tracking-wider pr-8">
                    {faq.question}
                  </span>
                  <span className="text-primary">
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="p-6 pt-0 text-text-muted text-sm font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

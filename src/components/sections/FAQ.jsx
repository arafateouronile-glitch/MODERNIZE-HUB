import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export const faqs = [
  {
    question: "Votre IA est-elle générique ou adaptée à mon métier ?",
    answer: "Chaque système est entraîné sur VOTRE processus métier. Un agent IA pour un avocat ne fonctionne pas comme celui d'un agent immobilier. On ne livre jamais une solution générique — c'est votre logique métier, vos offres, votre ton, encodés dans le système."
  },
  {
    question: "Quel est le délai pour être opérationnel ?",
    answer: "14 jours pour un Pack Système Autonome complet (site + agent IA + CRM). Votre IA commence à qualifier des leads dès le jour du lancement. Pour les infrastructures complexes (Pack Empire), comptez 3 à 4 semaines."
  },
  {
    question: "Que fait concrètement l'agent IA ?",
    answer: "Il reçoit chaque lead entrant, pose les bonnes questions, évalue la qualité du prospect, envoie un devis ou une proposition tarifaire automatiquement, puis prend un RDV dans votre agenda — tout ça en moins de 5 minutes, 24h/24."
  },
  {
    question: "Que se passe-t-il si le ROI n'est pas au rendez-vous ?",
    answer: "On garantit le résultat ou on revient gratuitement. Notre processus inclut un suivi de performance mensuel. Si votre système IA ne performe pas selon les objectifs définis à l'audit, on optimise sans surcoût."
  }
]

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

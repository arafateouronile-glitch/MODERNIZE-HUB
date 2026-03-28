import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Reveal } from '../animations/Reveal'
import { Zap, Filter, Calendar } from 'lucide-react'

const pillars = [
  {
    number: '01',
    icon: Zap,
    title: 'CAPTURE',
    subtitle: 'Le Moteur qui Attire',
    description: 'Site Web 2025 ultra-rapide. Score PageSpeed 95+. Design qui inspire confiance en 3 secondes. Votre vitrine numérique travaille pendant que vous dormez.',
    metrics: ['Temps de chargement < 1s', 'Score SEO technique 95+', 'Conversion mobile optimisée'],
    tag: 'Site Web',
  },
  {
    number: '02',
    icon: Filter,
    title: 'QUALIFICATION',
    subtitle: 'L\'IA qui Trie',
    description: 'Un Agent IA qualifie chaque lead entrant en 30 secondes. Fini les appels avec des prospects non sérieux. Vous ne parlez plus qu\'aux clients prêts à acheter.',
    metrics: ['Qualification en 30 secondes', 'Scoring automatique des leads', 'Zéro lead non qualifié'],
    tag: 'Agent IA',
  },
  {
    number: '03',
    icon: Calendar,
    title: 'CONVERSION',
    subtitle: 'L\'Automatisation qui Conclut',
    description: 'Prise de RDV automatique, devis générés et envoyés, pipeline CRM alimenté en temps réel. Votre IA transforme les prospects en clients signés — sans vous.',
    metrics: ['Devis envoyé en < 5 min', 'Agenda synchronisé en temps réel', 'CRM mis à jour automatiquement'],
    tag: 'CRM + IA',
  },
]

export const HybridOffer = () => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="systeme" ref={ref} className="py-32 bg-background border-t border-white/5 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#88A9C3]/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-24">
          <Reveal>
            <span className="font-mono text-[#88A9C3] text-xs uppercase tracking-[0.3em] mb-6 block">
              L'Offre Hybride
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-[0.9] mb-8 text-center">
              LE MOTEUR<br />
              <span className="text-[#88A9C3]">& LE CARBURANT</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-text-muted max-w-3xl text-center font-light mb-6">
              Le <strong className="text-white">Site Web est votre Moteur</strong> — ce que le monde voit.
              L'<strong className="text-white">IA est le Carburant</strong> — ce qui fait vraiment tourner la machine.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-white/50 text-sm font-mono text-center">
              Ensemble, ils forment un système autonome qui capture, qualifie et convertit — sans intervention humaine.
            </p>
          </Reveal>
        </div>

        {/* Visual Engine Diagram */}
        <Reveal delay={0.2}>
          <div className="max-w-2xl mx-auto mb-24 relative">
            <div className="border border-[#88A9C3]/20 bg-[#88A9C3]/3 p-8 text-center relative">
              <div className="font-mono text-xs text-[#88A9C3]/60 uppercase tracking-widest mb-4">Infrastructure</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/10 p-4 bg-white/3">
                  <div className="font-display text-2xl font-bold text-white mb-1">MOTEUR</div>
                  <div className="font-mono text-xs text-[#88A9C3]">Site Web Premium</div>
                  <div className="text-white/40 text-xs mt-2">Ce que vos clients voient</div>
                </div>
                <div className="border border-[#88A9C3]/30 p-4 bg-[#88A9C3]/8">
                  <div className="font-display text-2xl font-bold text-[#88A9C3] mb-1">CARBURANT</div>
                  <div className="font-mono text-xs text-white">Systèmes IA Autonomes</div>
                  <div className="text-white/40 text-xs mt-2">Ce qui fait tourner la machine</div>
                </div>
              </div>
              <div className="mt-4 font-mono text-xs text-white/30">
                → Capture → Qualification → Conversion → Récurrent
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3 Pillars */}
        <div className="grid md:grid-cols-3 gap-1 max-w-6xl mx-auto mb-20">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="border border-white/10 bg-white/3 p-8 hover:bg-white/5 hover:border-[#88A9C3]/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-[#88A9C3]/40 text-5xl font-bold leading-none">{pillar.number}</span>
                  <span className="font-mono text-[10px] text-[#88A9C3] uppercase tracking-widest border border-[#88A9C3]/30 px-2 py-1">
                    {pillar.tag}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full border border-[#88A9C3]/30 bg-[#88A9C3]/10 flex items-center justify-center mb-6 group-hover:bg-[#88A9C3]/20 transition-all">
                  <Icon className="w-5 h-5 text-[#88A9C3]" />
                </div>

                <h3 className="font-display text-3xl font-bold text-white uppercase mb-2">{pillar.title}</h3>
                <p className="font-mono text-xs text-[#88A9C3] uppercase tracking-wider mb-4">{pillar.subtitle}</p>
                <p className="text-text-muted text-sm leading-relaxed mb-6">{pillar.description}</p>

                <div className="space-y-2">
                  {pillar.metrics.map((metric, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#88A9C3]" />
                      <span className="font-mono text-xs text-white/60">{metric}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <Reveal delay={0.6}>
          <div className="text-center">
            <a
              href="/#contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#88A9C3] text-black hover:bg-white font-bold rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(136,169,195,0.3)] hover:shadow-[0_0_60px_rgba(136,169,195,0.5)] text-lg"
            >
              Construire mon Infrastructure
            </a>
            <p className="text-white/30 text-xs font-mono mt-4">
              ROI immédiat · Zéro friction · Scalabilité totale
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

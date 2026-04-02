import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Reveal } from '../animations/Reveal'
import { Zap, Filter, Calendar } from 'lucide-react'

const pillars = [
  {
    number: '01',
    icon: Zap,
    title: 'CAPTURE',
    subtitle: 'Pas un template. Votre secteur.',
    description: 'Site Web construit pour votre métier — pas une landing page générique. Design, copywriting, structure : tout est pensé pour convertir les visiteurs de votre secteur spécifique.',
    metrics: ['Design calibré sur votre industrie', 'Copywriting qui parle à vos clients', 'Conversion mobile-first'],
    tag: 'Site Web',
  },
  {
    number: '02',
    icon: Filter,
    title: 'QUALIFICATION',
    subtitle: 'Pas un bot. Votre logique métier.',
    description: 'Un Agent IA entraîné sur VOS offres, VOS critères, VOTRE ton. Il qualifie chaque lead en 30 secondes selon les règles que vous définissez. Vous ne recevez que des prospects prêts à signer.',
    metrics: ['Entraîné sur votre processus de vente', 'Scoring selon vos critères métier', 'Zéro lead froid dans votre agenda'],
    tag: 'Agent IA',
  },
  {
    number: '03',
    icon: Calendar,
    title: 'CONVERSION',
    subtitle: 'Zéro tâche admin. Jamais.',
    description: 'Devis générés automatiquement selon vos tarifs. Relances envoyées à J+1, J+3, J+7. CRM mis à jour en temps réel. Agenda rempli sans vous. Votre admin tourne seul — 24h/24.',
    metrics: ['Devis auto selon vos grilles tarifaires', 'Séquences relances personnalisées', 'CRM et agenda synchronisés'],
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
              UNE INFRASTRUCTURE<br />
              <span className="text-[#88A9C3]">PAS UN OUTIL SAAS</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-text-muted max-w-3xl text-center font-light mb-6">
              On ne vous vend pas un abonnement à configurer soi-même.
              On construit une <strong className="text-white">infrastructure opérationnelle complète</strong> — calibrée sur votre métier, vos offres, votre processus de vente.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-white/50 text-sm font-mono text-center">
              Rien ne sort d'un template. Tout est construit pour votre secteur, livré clé en main.
            </p>
          </Reveal>
        </div>

        {/* Visual Infrastructure Diagram */}
        <Reveal delay={0.2}>
          <div className="max-w-3xl mx-auto mb-24 relative">
            <div className="border border-[#88A9C3]/20 bg-[#88A9C3]/3 p-8 relative">
              <div className="font-mono text-xs text-[#88A9C3]/60 uppercase tracking-widest mb-6 text-center">Ce qu'on construit pour vous</div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="border border-white/10 p-4 bg-white/3 text-center">
                  <div className="font-mono text-[10px] text-[#88A9C3] uppercase tracking-wider mb-2">Site Web</div>
                  <div className="font-display text-lg font-bold text-white">Votre vitrine</div>
                  <div className="text-white/30 text-xs mt-1">Taillée pour votre secteur</div>
                </div>
                <div className="border border-[#88A9C3]/30 p-4 bg-[#88A9C3]/8 text-center">
                  <div className="font-mono text-[10px] text-[#88A9C3] uppercase tracking-wider mb-2">Agent IA</div>
                  <div className="font-display text-lg font-bold text-[#88A9C3]">Votre commercial</div>
                  <div className="text-white/30 text-xs mt-1">Entraîné sur vos offres</div>
                </div>
                <div className="border border-white/10 p-4 bg-white/3 text-center">
                  <div className="font-mono text-[10px] text-[#88A9C3] uppercase tracking-wider mb-2">CRM + Auto.</div>
                  <div className="font-display text-lg font-bold text-white">Votre admin</div>
                  <div className="text-white/30 text-xs mt-1">Zéro intervention manuelle</div>
                </div>
              </div>
              <div className="font-mono text-xs text-white/30 text-center border-t border-white/5 pt-4">
                Capture → Qualification → Devis Auto → Relance → Conversion → CRM
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
              Construire mon Infrastructure sur Mesure
            </a>
            <p className="text-white/30 text-xs font-mono mt-4">
              Calibré sur votre métier · Opérationnel en 14J · Zéro SaaS à configurer
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

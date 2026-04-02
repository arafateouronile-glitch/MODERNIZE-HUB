import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Reveal } from '../animations/Reveal'
import { X, Check } from 'lucide-react'

const humanCosts = [
  { label: 'Salaire brut chargé', value: '3 500€/mois', sub: 'Soit 42 000€/an minimum' },
  { label: 'Charge mentale admin', value: '22h/semaine', sub: 'Devis, relances, qualification, CRM' },
  { label: 'Disponibilité réelle', value: '35h/sem', sub: 'Fermé la nuit, les weekends, en vacances' },
  { label: 'Relances clients effectuées', value: 'Aléatoires', sub: 'Oubliées dès que la charge augmente' },
  { label: 'Turnover & recrutement', value: '4 000€+', sub: 'Coût moyen d\'un remplacement' },
]

const aiCosts = [
  { label: 'Coût mensuel tout inclus', value: 'dès 349€/mois', sub: 'Optimisation continue incluse' },
  { label: 'Charge mentale admin', value: '0h', sub: 'Devis, relances, CRM — tout est automatisé' },
  { label: 'Disponibilité', value: '24/7/365', sub: 'Jamais malade, jamais en vacances' },
  { label: 'Relances clients', value: 'J+1, J+3, J+7', sub: 'Séquences programmées selon votre logique métier' },
  { label: 'Temps d\'activation', value: '14 jours', sub: 'Calibré sur votre secteur, pas un template' },
]

export const TruthSection = () => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section ref={ref} className="py-32 bg-background border-t border-white/5 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] bg-[#88A9C3]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <Reveal>
            <span className="font-mono text-[#88A9C3] text-xs uppercase tracking-[0.3em] mb-6 block">
              Vérité Terrain
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-[0.9] mb-8 text-center">
              LE COÛT RÉEL<br />
              <span className="text-[#88A9C3]">DE L'HUMAIN</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-text-muted max-w-3xl text-center font-light">
              Combien d'heures par semaine passez-vous sur l'admin, les devis, les relances ?
              Un assistant coûte <strong className="text-white">50 000€/an</strong> et ne travaille que 35h.
              Votre infrastructure IA, elle, tourne <strong className="text-white">24h/24 pour 349€/mois</strong> — calibrée sur votre métier.
            </p>
          </Reveal>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-1 max-w-5xl mx-auto mb-20">
          {/* Human Column */}
          <Reveal delay={0.3}>
            <div className="bg-white/3 border border-white/10 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white uppercase">Employé Administratif</h3>
              </div>
              <div className="space-y-6">
                {humanCosts.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="border-b border-white/5 pb-4 last:border-0"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-text-muted text-sm font-mono">{item.label}</span>
                      <span className="text-red-400 font-bold text-sm whitespace-nowrap">{item.value}</span>
                    </div>
                    <p className="text-white/30 text-xs mt-1">{item.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* AI Column */}
          <Reveal delay={0.4}>
            <div className="bg-[#88A9C3]/5 border border-[#88A9C3]/30 p-8 md:p-10 relative">
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[10px] text-[#88A9C3] uppercase tracking-widest border border-[#88A9C3]/30 px-3 py-1">
                  Recommandé
                </span>
              </div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-[#88A9C3]/20 border border-[#88A9C3]/40 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#88A9C3]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white uppercase">Système IA Modernize Hub</h3>
              </div>
              <div className="space-y-6">
                {aiCosts.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="border-b border-[#88A9C3]/10 pb-4 last:border-0"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-text-muted text-sm font-mono">{item.label}</span>
                      <span className="text-[#88A9C3] font-bold text-sm whitespace-nowrap">{item.value}</span>
                    </div>
                    <p className="text-white/30 text-xs mt-1">{item.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Key Stat */}
        <Reveal delay={0.6}>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
            {[
              { value: '15H', label: 'Récupérées par semaine', sub: 'En moyenne par client' },
              { value: '×4.8', label: 'ROI moyen à 90 jours', sub: 'Sur l\'investissement initial' },
              { value: '0€', label: 'De charges sociales', sub: 'Zéro friction administrative' },
            ].map((kpi, i) => (
              <div key={i} className="border border-white/10 p-6 bg-white/3">
                <div className="font-display text-5xl md:text-6xl font-bold text-[#88A9C3] mb-2">{kpi.value}</div>
                <div className="text-white font-bold text-sm uppercase tracking-wider mb-1">{kpi.label}</div>
                <div className="text-white/40 text-xs font-mono">{kpi.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

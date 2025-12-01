import { motion } from 'framer-motion'
import { Reveal } from '../animations/Reveal'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Calendar, Users, TrendingUp, Award } from 'lucide-react'

export const Story = () => {
  const [ref, isVisible] = useScrollAnimation()

  const timeline = [
    {
      year: '2019',
      icon: Calendar,
      title: 'Le Déclic',
      text: 'Tout a commencé avec Marc, électricien. Son site WordPress à 300€ lui faisait perdre 15 clients par semaine. "Les gens pensent que je suis amateur", nous a-t-il dit. On a tout reconstruit. En 30 jours, +280% de demandes de devis.',
      metric: '+280%',
      label: 'Demandes'
    },
    {
      year: '2020',
      icon: Users,
      title: 'Le Bouche-à-Oreille',
      text: 'Sophie, avocate, nous a contactés après avoir vu le site de Marc. "Je perds des clients premium à cause de mon design 2012". 14 jours plus tard : site ultra-premium. Résultat ? Ses honoraires ont doublé. Ses clients aussi.',
      metric: '×2',
      label: 'Honoraires'
    },
    {
      year: '2022',
      icon: TrendingUp,
      title: 'La Méthode',
      text: '70+ sites transformés. On a compris la formule : Design qui impressionne + Vitesse qui convertit + Copy qui vend = ROI garanti. Thomas, startup SaaS, a généré 180K€ en 6 mois avec son nouveau site. Son ancien site ? 0€.',
      metric: '180K€',
      label: 'Revenus'
    },
    {
      year: '2025',
      icon: Award,
      title: 'Aujourd\'hui',
      text: 'On refuse 80% des demandes. Pourquoi ? Qualité > Quantité. Chaque site est une œuvre. Chaque client devient une success story. La question n\'est plus "Ça marche ?", mais "De combien vont exploser mes revenus ?"',
      metric: '850K€+',
      label: 'Générés'
    }
  ]

  return (
    <section id="story" ref={ref} className="py-32 bg-background relative overflow-hidden border-t border-white/5">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#D9FF00 1px, transparent 1px), linear-gradient(90deg, #D9FF00 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="max-w-4xl mb-24">
            <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-6 block">
              Notre Histoire
            </span>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-[0.85] mb-8">
              ON A COMMENCÉ<br/>
              AVEC <span className="text-[#D9FF00]">1 CLIENT</span><br/>
              DÉSESPÉRÉ.
            </h2>
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed">
              Aujourd'hui, nos clients génèrent{' '}
              <span className="text-[#D9FF00] font-bold">850 000€+</span> de revenus supplémentaires.
            </p>
            <p className="text-xl text-text-muted mt-6 font-light">
              Voici comment on est passés de zéro à la référence en design web haute-conversion.
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="space-y-24 max-w-5xl mx-auto">
          {timeline.map((item, index) => (
            <Reveal key={index} delay={index * 0.15}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-[3rem] top-24 w-px h-full bg-gradient-to-b from-[#D9FF00]/50 to-transparent" />
                )}

                <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-start">
                  {/* Icon */}
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-[#D9FF00]/10 border border-[#D9FF00]/30 flex items-center justify-center relative group hover:bg-[#D9FF00]/20 transition-all">
                      <item.icon className="w-10 h-10 text-[#D9FF00]" />
                      <div className="absolute inset-0 rounded-full bg-[#D9FF00]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="border border-white/10 p-8 hover:bg-white/5 transition-all group">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-mono text-[#D9FF00] text-sm tracking-widest">
                        {item.year}
                      </span>
                      <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-lg text-white/80 leading-relaxed font-light">
                      {item.text}
                    </p>
                  </div>

                  {/* Metric */}
                  <div className="text-right min-w-[140px]">
                    <div className="font-display text-4xl md:text-5xl font-bold text-[#D9FF00]">
                      {item.metric}
                    </div>
                    <div className="font-mono text-xs text-white/50 uppercase tracking-widest mt-2">
                      {item.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.8}>
          <div className="mt-32 text-center max-w-3xl mx-auto">
            <div className="border-t border-white/10 pt-16">
              <p className="text-2xl md:text-3xl text-white font-bold mb-4">
                Votre success story commence maintenant.
              </p>
              <p className="text-lg text-text-muted font-light">
                Dans 6 mois, vous lirez votre propre témoignage ici. Avec vos chiffres. Vos résultats. Votre transformation.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}



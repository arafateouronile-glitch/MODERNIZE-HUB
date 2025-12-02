import { motion } from 'framer-motion'
import { Frown, Smartphone, ZapOff, Zap, Smartphone as Mobile, Palette, TrendingUp, ArrowDown } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Reveal } from '../animations/Reveal'

const problems = [
  {
    icon: Frown,
    stat: '78%',
    label: 'VISITEURS PERDUS',
    text: 'Abandon en moins de 3 secondes si votre design fait 2015. Chaque jour = 50+ clients perdus.',
  },
  {
    icon: Smartphone,
    stat: '67%',
    label: 'TRAFIC MOBILE',
    text: 'Votre site illisible sur mobile vous coûte 3 000€/mois en revenus perdus. Vos concurrents récupèrent.',
  },
  {
    icon: ZapOff,
    stat: '5 SEC',
    label: 'TEMPS DE CHARGEMENT',
    text: '+5 secondes de chargement = -60% de conversions. Google vous enterre en page 12.',
  },
]

const benefits = [
  { icon: Zap, text: 'VITESSE < 1.5S', subtext: '+180% Taux de Conversion' },
  { icon: Mobile, text: 'MOBILE PARFAIT', subtext: '+240% Ventes Mobile' },
  { icon: Palette, text: 'UX IMMERSIVE', subtext: '+320% Temps sur Site' },
  { icon: TrendingUp, text: 'SEO PUISSANT', subtext: 'Page 1 Google Garanti' },
]

export const About = () => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="about" ref={ref} className="py-32 bg-background relative overflow-hidden border-t border-white/5">
      {/* Decorative Lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          <Reveal>
            <div>
              <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-4 block">
                Vérité Terrain
              </span>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] text-white mb-8">
                VOUS <br />
                PERDEZ <br />
                <span className="text-[#D9FF00]">€€€€</span>
              </h2>
              <p className="text-xl text-text-muted font-light max-w-lg leading-relaxed">
                Chaque jour sans site moderne = clients capturés par vos concurrents. Que vous ayez besoin d'un nouveau site créé à partir de zéro ou d'une refonte complète de votre site existant, nous transformons votre présence digitale.
                <span className="block mt-4 text-white font-bold">Le coût réel de l'inaction : 10 000€+ par mois.</span>
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {problems.map((problem, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="group border border-white/10 p-6 hover:bg-white/5 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-display text-5xl text-white group-hover:text-[#D9FF00] transition-colors mb-1">
                        {problem.stat}
                      </div>
                      <div className="font-mono text-[10px] text-[#D9FF00] tracking-widest">
                        {problem.label}
                      </div>
                    </div>
                    <problem.icon className="w-5 h-5 text-white/20 group-hover:text-[#D9FF00] transition-colors" />
                  </div>
                  <p className="text-text-muted text-sm font-light leading-relaxed">
                    {problem.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-32">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-6 h-6 text-[#D9FF00]" />
          </motion.div>
        </div>

        {/* Solution */}
        <div className="max-w-6xl mx-auto">
           <Reveal>
            <div className="text-center mb-16">
              <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-4 block">
                La Solution
              </span>
              <h3 className="font-display text-4xl md:text-7xl font-bold text-white mb-6 uppercase">
                ROI DE <span className="text-[#D9FF00]">480%</span>
              </h3>
              <p className="text-2xl text-white font-bold mb-4">
                En Moins de 60 Jours
              </p>
              <p className="text-xl text-text-muted max-w-2xl mx-auto">
                Nos clients récupèrent leur investissement en 42 jours en moyenne. Le reste ? C'est du profit pur.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {benefits.map((benefit, index) => (
              <Reveal key={index} delay={0.3 + index * 0.1}>
                <div className="bg-background p-8 hover:bg-white/5 transition-colors group aspect-square flex flex-col items-center justify-center text-center">
                  <benefit.icon className="w-12 h-12 text-white mb-6 group-hover:scale-110 group-hover:text-[#D9FF00] transition-all duration-300" />
                  <p className="font-mono text-sm font-bold tracking-widest text-white mb-2">
                    {benefit.text}
                  </p>
                  <p className="font-mono text-xs text-[#D9FF00]">
                    {benefit.subtext}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

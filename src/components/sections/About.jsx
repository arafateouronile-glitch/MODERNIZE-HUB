import { motion } from 'framer-motion'
import { Frown, BotOff, ZapOff, Zap, Bot, BarChart2, TrendingUp, ArrowDown } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Reveal } from '../animations/Reveal'
import { lazy, Suspense } from 'react'

// Lazy load 3D scene
const AboutScene = lazy(() => import('../3d/FloatingShapes').then(m => ({ default: m.AboutScene })))

const problems = [
  {
    icon: BotOff,
    stat: '87%',
    label: 'GÉRANTS ÉPUISÉS PAR L\'ADMIN',
    text: 'Devis tapés à la main, relances oubliées, leads sans suivi. Ce n\'est pas un problème de compétences — c\'est un problème de système.',
  },
  {
    icon: Frown,
    stat: '22H',
    label: 'D\'ADMIN PAR SEMAINE EN MOYENNE',
    text: 'Emails de suivi, devis, réponses aux leads, mises à jour CRM. Vingt-deux heures que vous ne passez pas à développer votre business.',
  },
  {
    icon: ZapOff,
    stat: '68%',
    label: 'DES LEADS JAMAIS RELANCÉS',
    text: 'Sans automatisation, les prospects qui ne répondent pas du premier coup sont abandonnés. Votre concurrent, lui, relance à J+1, J+3, J+7.',
  },
]

const benefits = [
  { icon: Zap, text: 'ZÉRO ADMIN', subtext: '15H récupérées/semaine' },
  { icon: Bot, text: 'AGENT SUR MESURE', subtext: 'Entraîné sur votre métier' },
  { icon: BarChart2, text: 'AUTOPILOT TOTAL', subtext: 'Devis · Relances · CRM' },
  { icon: TrendingUp, text: 'ROI ×4.8', subtext: 'Retour à 90 jours' },
]

export const About = () => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="about" ref={ref} className="py-32 bg-background relative overflow-hidden border-t border-white/5">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <AboutScene />
      </Suspense>
      
      {/* Decorative Lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          <Reveal>
            <div>
              <span className="font-mono text-[#88A9C3] text-sm tracking-widest uppercase mb-4 block">
                Vérité Terrain
              </span>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] text-white mb-8">
                ÉPUISÉ <br />
                DE TOUT <br />
                <span className="text-[#88A9C3]">GÉRER ?</span>
              </h2>
              <p className="text-xl text-text-muted font-light max-w-lg leading-relaxed">
                La vraie douleur de nos clients n'est pas "je veux de l'IA". C'est{' '}
                <strong className="text-white">je suis épuisé de gérer tout ça à la main</strong>.
                Devis, relances, qualification, suivi client — ces tâches répétitives qui bouffent votre semaine sans créer de valeur.
                <span className="block mt-4 text-white font-bold">On construit le système qui s'en charge à votre place. Pour toujours.</span>
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {problems.map((problem, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="group border border-white/10 p-6 hover:bg-white/5 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-display text-5xl text-white group-hover:text-[#88A9C3] transition-colors mb-1">
                        {problem.stat}
                      </div>
                      <div className="font-mono text-[10px] text-[#88A9C3] tracking-widest">
                        {problem.label}
                      </div>
                    </div>
                    <problem.icon className="w-5 h-5 text-white/20 group-hover:text-[#88A9C3] transition-colors" />
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
            <ArrowDown className="w-6 h-6 text-[#88A9C3]" />
          </motion.div>
        </div>

        {/* Solution */}
        <div className="max-w-6xl mx-auto">
           <Reveal>
            <div className="text-center mb-16">
              <span className="font-mono text-[#88A9C3] text-sm tracking-widest uppercase mb-4 block">
                La Solution
              </span>
              <h3 className="font-display text-4xl md:text-7xl font-bold text-white mb-6 uppercase">
                L'AUTOPILOT <span className="text-[#88A9C3]">COMPLET</span>
              </h3>
              <p className="text-2xl text-white font-bold mb-4">
                Pas un outil. Une nouvelle façon de travailler.
              </p>
              <p className="text-xl text-text-muted max-w-2xl mx-auto">
                On ne livre pas un SaaS à configurer soi-même. On construit une infrastructure opérationnelle calibrée sur votre processus métier — et on l'active en 14 jours.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {benefits.map((benefit, index) => (
              <Reveal key={index} delay={0.3 + index * 0.1}>
                <div className="bg-background p-8 hover:bg-white/5 transition-colors group aspect-square flex flex-col items-center justify-center text-center">
                  <benefit.icon className="w-12 h-12 text-white mb-6 group-hover:scale-110 group-hover:text-[#88A9C3] transition-all duration-300" />
                  <p className="font-mono text-sm font-bold tracking-widest text-white mb-2">
                    {benefit.text}
                  </p>
                  <p className="font-mono text-xs text-[#88A9C3]">
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

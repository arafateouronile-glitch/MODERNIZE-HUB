import { motion } from 'framer-motion'
import { Target, Palette, Code, CheckCircle, GraduationCap, Rocket, Clock, Shield, RefreshCw } from 'lucide-react'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import { useTheme } from '../contexts/ThemeContext'

const processSteps = [
  {
    id: 1,
    title: 'Découverte',
    subtitle: 'Jour 1-2',
    icon: Target,
    description: 'Appel pour comprendre votre vision et objectifs',
    duration: '30 min',
    details: [
      'Analyse de vos besoins',
      'Définition des objectifs business',
      'Identification de votre audience',
      'Choix de la formule adaptée',
    ],
    color: '#3B82F6',
  },
  {
    id: 2,
    title: 'Design',
    subtitle: 'Jour 3-5',
    icon: Palette,
    description: 'Design personnalisé présenté avec 2 révisions incluses',
    duration: '48h',
    details: [
      'Création de la maquette desktop',
      'Version mobile responsive',
      'Choix des couleurs et typographie',
      '2 rounds de révisions inclus',
    ],
    color: '#8B5CF6',
  },
  {
    id: 3,
    title: 'Développement',
    subtitle: 'Jour 6-16',
    icon: Code,
    description: 'Codage avec technologies 2025, suivi en temps réel',
    duration: '10 jours',
    details: [
      'Développement React moderne',
      'Animations fluides 60fps',
      'Optimisation SEO',
      'Tests sur tous appareils',
      'Accès preview en temps réel',
    ],
    color: '#10B981',
  },
  {
    id: 4,
    title: 'Tests & Optimisations',
    subtitle: 'Jour 17-18',
    icon: CheckCircle,
    description: 'Vérification complète et optimisations finales',
    duration: '2 jours',
    details: [
      'Tests fonctionnels',
      'Optimisation performances',
      'Correction bugs',
      'Vérification responsive',
      'Score Lighthouse 90+',
    ],
    color: '#F59E0B',
  },
  {
    id: 5,
    title: 'Formation & Lancement',
    subtitle: 'Jour 19-21',
    icon: Rocket,
    description: 'Formation complète pour gérer votre site + mise en ligne',
    duration: '2h',
    details: [
      'Formation personnalisée',
      'Documentation complète',
      'Mise en ligne du site',
      'Configuration finale',
      'Support 15 jours inclus',
    ],
    color: '#D9FF00',
  },
]

const guarantees = [
  {
    icon: Clock,
    title: 'Respect des délais',
    description: 'Livré dans les temps ou 500€ remboursés',
  },
  {
    icon: Shield,
    title: 'Satisfait ou Remboursé',
    description: '30 jours pour être 100% satisfait, sinon remboursement total',
  },
  {
    icon: RefreshCw,
    title: 'Révisions Illimitées',
    description: 'Tant que le design n\'est pas validé, on continue',
  },
]

export const Process = () => {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-background'}`}>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-6xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`font-display text-6xl md:text-8xl font-bold mb-6 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            Notre Méthode
            <br />
            <span className="text-[#D9FF00]">de Travail</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl md:text-2xl mb-12 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            Un processus clair et transparent, de A à Z
          </motion.p>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-8 top-0 bottom-0 w-1 ${
              theme === 'light' ? 'bg-gray-300' : 'bg-white/10'
            }`} />

            {/* Steps */}
            <div className="space-y-16">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-24"
                  >
                    {/* Icon Circle */}
                    <div
                      className="absolute left-0 w-16 h-16 rounded-full flex items-center justify-center border-4 border-background"
                      style={{ backgroundColor: step.color }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className={`rounded-3xl p-8 border-2 ${
                      theme === 'light'
                        ? 'bg-white border-black'
                        : 'bg-surface border-white/10'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`text-3xl font-bold ${
                              theme === 'light' ? 'text-black' : 'text-white'
                            }`}>
                              {step.title}
                            </h3>
                            <span className={`text-sm px-3 py-1 rounded-full ${
                              theme === 'light'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-white/5 text-gray-400'
                            }`}>
                              {step.subtitle}
                            </span>
                          </div>
                          <p className={`text-lg mb-1 ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {step.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-[#D9FF00]">
                            <Clock className="w-4 h-4" />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                      </div>

                      <ul className="grid md:grid-cols-2 gap-3 mt-6">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0`} style={{ color: step.color }} />
                            <span className={`text-sm ${
                              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                            }`}>
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 px-6 bg-black/5">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-display font-bold text-center mb-12 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            Nos Garanties
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`rounded-3xl p-8 border-2 text-center ${
                    theme === 'light'
                      ? 'bg-white border-black'
                      : 'bg-surface border-white/10'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-[#D9FF00]/20 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-[#D9FF00]" />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}>
                    {guarantee.title}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {guarantee.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-display font-bold text-center mb-12 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            Outils & Technologies
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-6">
            {['React', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'GSAP', 'Figma', 'Vercel'].map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className={`px-6 py-3 rounded-full font-bold ${
                  theme === 'light'
                    ? 'bg-black text-white'
                    : 'bg-surface border border-white/10 text-white'
                }`}
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#D9FF00]">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-black mb-6"
          >
            Prêt à Commencer ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-black/80 mb-8"
          >
            Discutons de votre projet et démarrons votre transformation digitale
          </motion.p>
          <a
            href="/#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#D9FF00] text-black hover:bg-white font-bold rounded-full transition-all duration-300 text-lg"
          >
            <span>Demander un Devis</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}



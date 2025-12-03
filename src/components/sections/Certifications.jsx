import { motion } from 'framer-motion'
import { Reveal } from '../animations/Reveal'
import { Award, Star, Shield, TrendingUp } from 'lucide-react'

const certifications = [
  {
    icon: Award,
    title: 'Google Partner',
    description: 'Certifié par Google pour l\'excellence en marketing digital',
    badge: 'Certified',
  },
  {
    icon: Star,
    title: '4.9/5 Satisfaction',
    description: '70+ clients satisfaits sur 2 ans d\'activité',
    badge: 'Verified',
  },
  {
    icon: Shield,
    title: 'RGPD Compliant',
    description: 'Conformité totale aux réglementations européennes',
    badge: 'Secure',
  },
  {
    icon: TrendingUp,
    title: '+320% ROI Moyen',
    description: 'Performance moyenne mesurée sur tous nos projets',
    badge: 'Proven',
  },
]

const awards = [
  { title: 'Meilleure Agence Web 2024', source: 'Digital Awards', year: '2024' },
  { title: 'Top 10 Agence Conversion', source: 'Conversion Summit', year: '2024' },
  { title: 'Excellence Design', source: 'Web Design Awards', year: '2023' },
]

export const Certifications = () => {
  return (
    <section className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <Reveal>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-6 block">
              Crédibilité & Reconnaissance
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase leading-[0.9] mb-8">
              CERTIFIÉS PAR<br/>
              <span className="text-[#D9FF00]">LES MEILLEURS</span>
            </h2>
            <p className="text-xl text-white/80 font-light">
              Des certifications qui valident notre expertise. Des résultats qui parlent.
            </p>
          </div>
        </Reveal>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {certifications.map((cert, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative border border-white/10 bg-white/5 p-8 hover:bg-white/10 hover:border-[#D9FF00]/30 transition-all duration-300 group"
              >
                {/* Badge */}
                <div className="absolute -top-3 right-4 bg-[#D9FF00] text-black px-3 py-1 font-mono text-[10px] font-bold uppercase">
                  {cert.badge}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-[#D9FF00]/10 border border-[#D9FF00]/30 flex items-center justify-center mb-6 group-hover:bg-[#D9FF00]/20 transition-all">
                  <cert.icon className="w-8 h-8 text-[#D9FF00]" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {cert.title}
                </h3>
                <p className="font-mono text-xs text-white/60 leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Awards Section */}
        <Reveal delay={0.4}>
          <div className="max-w-4xl mx-auto border-t border-white/10 pt-12">
            <h3 className="font-display text-3xl font-bold text-white text-center mb-12">
              Prix & Reconnaissances
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-[#D9FF00]/20 bg-[#D9FF00]/5 p-6 text-center hover:bg-[#D9FF00]/10 transition-all"
                >
                  <div className="font-mono text-xs text-[#D9FF00] uppercase tracking-widest mb-2">
                    {award.year}
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-2">
                    {award.title}
                  </h4>
                  <div className="font-mono text-xs text-white/50">
                    {award.source}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Trust Indicators */}
        <Reveal delay={0.6}>
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center border-t border-white/10 pt-12">
            <div>
              <div className="font-display text-5xl font-bold text-[#D9FF00] mb-2">100%</div>
              <div className="font-mono text-sm text-white/60 uppercase tracking-wider">
                Projets Livrés à Temps
              </div>
            </div>
            <div>
              <div className="font-display text-5xl font-bold text-[#D9FF00] mb-2">0%</div>
              <div className="font-mono text-sm text-white/60 uppercase tracking-wider">
                Taux de Remboursement
              </div>
            </div>
            <div>
              <div className="font-display text-5xl font-bold text-[#D9FF00] mb-2">48H</div>
              <div className="font-mono text-sm text-white/60 uppercase tracking-wider">
                Temps de Récupération ROI
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}




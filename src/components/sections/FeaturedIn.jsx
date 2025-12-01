import { motion } from 'framer-motion'
import { Reveal } from '../animations/Reveal'
import { ExternalLink, Mic, Newspaper, Video } from 'lucide-react'

const featuredItems = [
  {
    type: 'Podcast',
    icon: Mic,
    title: 'Entrepreneurs du Digital',
    description: 'Episode 42: "Comment transformer un site web en machine à leads"',
    date: 'Novembre 2024',
    link: '#',
  },
  {
    type: 'Article',
    icon: Newspaper,
    title: 'TechCrunch France',
    description: 'Les 10 agences web qui révolutionnent la conversion en 2025',
    date: 'Octobre 2024',
    link: '#',
  },
  {
    type: 'Interview',
    icon: Video,
    title: 'YouTube - Web Marketing Pro',
    description: 'Interview exclusive: Méthode Modernize Hub pour +320% de conversions',
    date: 'Septembre 2024',
    link: '#',
  },
  {
    type: 'Article',
    icon: Newspaper,
    title: 'Les Echos Entrepreneurs',
    description: 'Success Story: Comment Modernize Hub génère 850K€ pour ses clients',
    date: 'Août 2024',
    link: '#',
  },
]

export const FeaturedIn = () => {
  return (
    <section className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <Reveal>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-6 block">
              Presse & Médias
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase leading-[0.9] mb-8">
              ON PARLE<br/>
              <span className="text-[#D9FF00]">DE NOUS</span>
            </h2>
            <p className="text-xl text-white/80 font-light">
              Nos méthodes et résultats font parler d'eux dans les médias spécialisés.
            </p>
          </div>
        </Reveal>

        {/* Featured Items Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {featuredItems.map((item, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <motion.a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.02 }}
                className="block border border-white/10 bg-white/5 p-8 hover:bg-white/10 hover:border-[#D9FF00]/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-[#D9FF00]/10 border border-[#D9FF00]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D9FF00]/20 transition-all">
                    <item.icon className="w-6 h-6 text-[#D9FF00]" />
                  </div>

                  {/* Type Badge */}
                  <div className="ml-auto">
                    <span className="font-mono text-[10px] text-[#D9FF00] uppercase tracking-widest bg-[#D9FF00]/10 px-3 py-1 border border-[#D9FF00]/30">
                      {item.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#D9FF00] transition-colors">
                  {item.title}
                </h3>
                <p className="font-mono text-sm text-white/70 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="font-mono text-xs text-white/50">
                    {item.date}
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#D9FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>

        {/* Press Quote */}
        <Reveal delay={0.5}>
          <div className="mt-20 max-w-4xl mx-auto text-center">
            <div className="border-l-4 border-[#D9FF00] pl-8 py-6">
              <blockquote className="font-display text-2xl md:text-3xl font-bold text-white leading-relaxed mb-4">
                "Modernize Hub a réussi à transformer le paysage du web design en France. Leurs résultats parlent d'eux-mêmes."
              </blockquote>
              <cite className="font-mono text-sm text-white/60 not-italic">
                — TechCrunch France, Octobre 2024
              </cite>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.6}>
          <div className="mt-16 text-center">
            <p className="text-white/60 mb-6 font-light">
              Vous êtes journaliste ou podcaster ? Parlez de notre méthode.
            </p>
            <a
              href="mailto:press@modernizehub.com"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#D9FF00] text-[#D9FF00] hover:bg-[#D9FF00] hover:text-black transition-all font-mono text-sm uppercase tracking-widest"
            >
              <ExternalLink className="w-4 h-4" />
              Contact Presse
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}



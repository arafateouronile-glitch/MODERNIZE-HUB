import { motion } from 'framer-motion'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import { useTheme } from '../contexts/ThemeContext'
import { FileText } from 'lucide-react'

export const MentionsLegales = () => {
  const { theme } = useTheme()

  const sections = [
    {
      title: '1. Éditeur du site',
      content: `Modernize Hub
Activité : Création de sites web & systèmes d'IA autonomes
Email : contact@modernizehub.com
Site : modernizehub.com`,
    },
    {
      title: '2. Hébergement',
      content: `Ce site est hébergé par :

Netlify, Inc.
44 Montgomery Street, Suite 300
San Francisco, California 94104, USA
netlify.com

Les données utilisateurs sont stockées via Supabase (infrastructure hébergée en UE).`,
    },
    {
      title: '3. Propriété intellectuelle',
      content: `L'ensemble du contenu de ce site (textes, visuels, design, code, animations, logos) est la propriété exclusive de Modernize Hub, protégé par les lois françaises et internationales relatives à la propriété intellectuelle.

Toute reproduction, distribution, modification ou exploitation, même partielle, sans autorisation écrite préalable de Modernize Hub est strictement interdite.`,
    },
    {
      title: '4. Limitation de responsabilité',
      content: `Modernize Hub s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, sans pouvoir en garantir l'exhaustivité.

Modernize Hub ne saurait être tenu responsable des dommages directs ou indirects résultant de l'accès au site ou de l'utilisation de ses contenus, ni des dommages causés par des interruptions, pannes ou indisponibilités temporaires du site.`,
    },
    {
      title: '5. Liens hypertextes',
      content: `Ce site peut contenir des liens vers des sites tiers. Modernize Hub n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs pratiques en matière de confidentialité ou leur disponibilité.`,
    },
    {
      title: '6. Droit applicable',
      content: `Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.`,
    },
  ]

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-background text-white'}`}>
      <Header />

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#88A9C3]/10 border border-[#88A9C3]/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#88A9C3]" />
              </div>
              <span className="font-mono text-[#88A9C3] text-xs uppercase tracking-[0.3em]">
                Informations légales
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] mb-6">
              MENTIONS<br />
              <span className="text-[#88A9C3]">LÉGALES</span>
            </h1>
            <p className={`text-lg font-light ${theme === 'light' ? 'text-gray-600' : 'text-white/60'}`}>
              Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance
              en l'économie numérique (LCEN).
            </p>
          </motion.div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
                className="border-l-2 border-[#88A9C3]/40 pl-6"
              >
                <h2 className={`font-display text-xl font-bold mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  {section.title}
                </h2>
                <div className={`font-mono text-sm leading-relaxed whitespace-pre-line ${theme === 'light' ? 'text-gray-600' : 'text-white/60'}`}>
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

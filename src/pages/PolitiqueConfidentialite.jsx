import { motion } from 'framer-motion'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import { useTheme } from '../contexts/ThemeContext'
import { Shield } from 'lucide-react'

export const PolitiqueConfidentialite = () => {
  const { theme } = useTheme()

  const sections = [
    {
      title: '1. Responsable du traitement',
      content: `Modernize Hub
Email : contact@modernizehub.com
Site : modernizehub.com

En tant que responsable du traitement, Modernize Hub s'engage à protéger la confidentialité des données personnelles collectées via ce site.`,
    },
    {
      title: '2. Données collectées',
      content: `Nous collectons uniquement les données nécessaires à la fourniture de nos services :

— Formulaire de contact / demande de devis : nom, prénom, adresse email, numéro de téléphone, description du projet.
— Formulaire d'audit IA : informations sur votre activité et vos besoins en automatisation.
— Navigation : données techniques anonymisées (type de navigateur, pages visitées) via des outils d'analyse respectueux de la vie privée.

Nous ne collectons pas de données sensibles au sens du RGPD (santé, opinions politiques, données biométriques, etc.).`,
    },
    {
      title: '3. Finalités du traitement',
      content: `Vos données sont utilisées exclusivement pour :

— Répondre à vos demandes de contact et de devis.
— Réaliser l'audit IA personnalisé demandé.
— Vous envoyer des informations commerciales si vous y avez consenti.
— Améliorer nos services et notre site web.
— Respecter nos obligations légales et contractuelles.

Nous n'utilisons pas vos données à des fins de profilage commercial automatisé sans votre accord explicite.`,
    },
    {
      title: '4. Base légale',
      content: `Le traitement de vos données repose sur :

— L'exécution d'un contrat ou de mesures précontractuelles (réponse à vos demandes).
— Votre consentement (envoi de communications marketing).
— Notre intérêt légitime (amélioration de nos services, sécurité).
— Le respect d'une obligation légale le cas échéant.`,
    },
    {
      title: '5. Durée de conservation',
      content: `Vos données sont conservées :

— Prospects / demandes de contact : 3 ans à compter du dernier contact.
— Clients : durée de la relation contractuelle + 5 ans (obligations légales).
— Données de navigation anonymisées : 13 mois maximum.

Au-delà de ces durées, vos données sont supprimées ou anonymisées.`,
    },
    {
      title: '6. Partage des données',
      content: `Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement avec :

— Nos prestataires techniques (hébergement, CRM, automatisation) dans le cadre de l'exécution de nos services, liés par des clauses de confidentialité strictes.
— Les autorités compétentes en cas d'obligation légale.

Les outils utilisés (Supabase, Netlify) disposent de certifications de sécurité conformes au RGPD. Les données sont hébergées dans l'Union Européenne ou dans des pays offrant un niveau de protection adéquat.`,
    },
    {
      title: '7. Vos droits',
      content: `Conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :

— Droit d'accès : obtenir une copie de vos données.
— Droit de rectification : corriger des données inexactes.
— Droit à l'effacement : demander la suppression de vos données ("droit à l'oubli").
— Droit à la limitation : restreindre le traitement de vos données.
— Droit à la portabilité : recevoir vos données dans un format structuré.
— Droit d'opposition : vous opposer au traitement pour motif légitime.
— Droit de retrait du consentement : à tout moment pour les traitements fondés sur le consentement.

Pour exercer ces droits : contact@modernizehub.com

En cas de réponse insatisfaisante, vous pouvez saisir la CNIL : www.cnil.fr`,
    },
    {
      title: '8. Cookies',
      content: `Ce site utilise des cookies techniques strictement nécessaires au fonctionnement (aucun consentement requis) et, avec votre accord, des cookies analytiques anonymisés pour mesurer l'audience.

Aucun cookie publicitaire tiers n'est déposé sans votre consentement explicite.

Vous pouvez configurer ou désactiver les cookies dans les paramètres de votre navigateur.`,
    },
    {
      title: '9. Sécurité',
      content: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement HTTPS, accès restreint aux données, infrastructure sécurisée, sauvegardes régulières.`,
    },
    {
      title: '10. Modifications',
      content: `Cette politique peut être mise à jour pour refléter des évolutions légales ou de nos pratiques. La version en vigueur est toujours accessible sur cette page. En cas de modification substantielle, vous en serez informé par email si vous êtes client.

Dernière mise à jour : avril 2025.`,
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
                <Shield className="w-5 h-5 text-[#88A9C3]" />
              </div>
              <span className="font-mono text-[#88A9C3] text-xs uppercase tracking-[0.3em]">
                Conformité RGPD
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] mb-6">
              POLITIQUE DE<br />
              <span className="text-[#88A9C3]">CONFIDENTIALITÉ</span>
            </h1>
            <p className={`text-lg font-light ${theme === 'light' ? 'text-gray-600' : 'text-white/60'}`}>
              Modernize Hub s'engage à traiter vos données personnelles avec transparence,
              dans le respect du Règlement Général sur la Protection des Données (RGPD).
            </p>
          </motion.div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
                className={`border-l-2 border-[#88A9C3]/40 pl-6`}
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 p-6 border border-[#88A9C3]/20 bg-[#88A9C3]/5"
          >
            <p className="font-mono text-xs text-[#88A9C3] uppercase tracking-widest mb-2">Contact DPO</p>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-white/60'}`}>
              Pour toute question relative à la protection de vos données personnelles :{' '}
              <a href="mailto:contact@modernizehub.com" className="text-[#88A9C3] hover:underline">
                contact@modernizehub.com
              </a>
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

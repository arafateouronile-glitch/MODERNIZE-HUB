/**
 * Données des offres de refonte de site web
 */

export const refonteTiers = [
  {
    id: 'express',
    name: 'Coup de Jeune Express',
    price: 1490,
    oldPrice: 2800,
    color: '#3B82F6',
    icon: '⚡',
    popular: false,
    badge: 'Entrée de gamme',
    tagline: 'Votre 1ère Transformation Sans Prise de Risque',
    description: 'Formule testée par 50+ artisans. Doublez vos demandes de devis en 30 jours.',
    features: [
      'Refonte design moderne (1 page longue + 3 sous-pages)',
      'Responsive complet (mobile + tablette + desktop)',
      'Optimisation vitesse → Score 90+ PageSpeed',
      'Formulaire de contact optimisé (+ anti-spam)',
      'Intégration de vos contenus existants',
      'Animations légères (fade, slide)',
      'SEO technique basique',
      'Livraison : 7 jours',
    ],
    notIncluded: [
      'Animations avancées (3D / parallax / framer motion complexes)',
      'Copywriting (texte fourni par le client)',
      'CMS (site statique uniquement)',
    ],
    cta: 'Choisir cette formule',
  },
  {
    id: 'transformation',
    name: 'Transformation Complète',
    price: 2990,
    oldPrice: 5200,
    color: '#8B5CF6',
    icon: '🚀',
    popular: true,
    badge: '⭐ Populaire',
    tagline: 'Machine à Leads 24/7 Qui Se Paie Toute Seule',
    description: 'Notre best-seller. ROI moyen de 480% en 60 jours. Garantie résultat ou remboursé.',
    features: [
      "Tout de l'Offre Express",
      'Refonte complète UX/UI (maquette premium)',
      'Animations modernes (Framer Motion)',
      'Hero Section animée (3D ou Lottie)',
      "Copywriting optimisé conversion (jusqu'à 1500 mots)",
      'CMS simple (Sanity ou Notion CMS)',
      'Pages illimitées (selon contenu client)',
      'Blog optimisé SEO',
      'Galerie pro avant/après',
      'Tracking pro (GA4 + Pixel Meta)',
      '2 révisions design',
      'Livraison : 14 jours',
    ],
    bonuses: [
      'Badge "Conversion Booster"',
      'Heatmap Hotjar configuré',
      'Script anti-abandon de page (CTA)',
    ],
    cta: 'Choisir cette formule',
  },
  {
    id: 'ultime',
    name: 'Experience Ultime',
    price: 5900,
    oldPrice: 9800,
    color: '#F59E0B',
    icon: '👑',
    popular: false,
    badge: '🔥 Offre Limitée',
    tagline: 'Dominez Votre Marché. Écrasez Vos Concurrents.',
    description: "L'arme fatale des leaders. Design qui génère +100k€/an de CA supplémentaire.",
    features: [
      "Tout de l'offre Transformation Complète",
      'Identité visuelle complète (logo, couleurs, typographies)',
      'Illustrations sur mesure',
      'Animations 3D (Three.js + R3F)',
      'Effets scroll ultra fluides (parallax, distortions)',
      'Micro-interactions avancées',
      'Vidéo hero (+ montage)',
      'Automatisations (email / CRM / Zapier)',
      'SEO avancé + optimisation contenu',
      'Formation 1h + support 30 jours',
      'Livraison : 21 jours',
    ],
    bonuses: [
      'Badge "Branding Elite"',
      'Audit SEO complet PDF',
      "Vidéo d'onboarding personnalisée",
    ],
    cta: 'Choisir cette formule',
  },
]

export const refonteServices = [
  {
    id: 'audit',
    title: 'Audit SEO Complet',
    description: 'Analyse approfondie de votre site existant',
    price: '290€',
    icon: '📊',
    features: [
      'Audit technique complet',
      'Analyse de la concurrence',
      'Recommandations personnalisées',
      'Rapport détaillé PDF',
    ],
  },
  {
    id: 'content',
    title: 'Rédaction de Contenu',
    description: 'Copywriting optimisé conversion',
    price: 'À partir de 150€/page',
    icon: '✍️',
    features: [
      'Optimisation SEO',
      'Structure conversion',
      'Call-to-actions',
      '2 révisions incluses',
    ],
  },
  {
    id: 'performance',
    title: 'Optimisation Performance',
    description: 'Vitesse et Score Lighthouse 90+',
    price: '390€',
    icon: '⚡',
    features: [
      'Optimisation images',
      'Minification code',
      'Cache avancé',
      'Score 90+ garanti',
    ],
  },
]

export const faqRefonte = [
  {
    question: 'Combien de temps prend une refonte ?',
    answer: 'Cela dépend de la formule choisie : 7 jours pour Express, 14 jours pour Transformation Complète, et 21 jours pour Experience Ultime.',
  },
  {
    question: 'Vais-je perdre mon référencement actuel ?',
    answer: 'Non, nous conservons toute votre structure SEO existante et l\'améliorons même pour éviter toute perte de trafic.',
  },
  {
    question: 'Puis-je garder mon hébergement actuel ?',
    answer: 'Oui, la refonte est compatible avec la plupart des hébergements. Nous vous informerons si un changement est nécessaire.',
  },
  {
    question: 'Que se passe-t-il avec mes contenus existants ?',
    answer: 'Nous intégrons tous vos contenus existants (textes, images, produits) dans le nouveau design. Vous n\'avez rien à refaire.',
  },
  {
    question: 'Puis-je voir un aperçu avant la mise en ligne ?',
    answer: 'Bien sûr ! Vous recevrez un lien de prévisualisation privé pour valider le design avant la mise en production.',
  },
  {
    question: 'Y a-t-il une garantie de résultat ?',
    answer: 'Oui, avec la formule Transformation Complète et Experience Ultime, nous garantissons un ROI mesurable ou nous remboursons.',
  },
]



export const pricingPlans = [
  {
    id: 'express',
    name: 'Coup de Jeune Express',
    badge: 'Entrée de gamme',
    badgeColor: 'bg-primary/10 border border-primary text-primary',
    price: 1490,
    oldPrice: 2800,
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
    highlighted: false,
  },
  {
    id: 'transformation',
    name: 'Transformation Complète',
    badge: '⭐ Populaire',
    badgeColor: 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(136,169,195,0.5)]',
    price: 2990,
    oldPrice: 5200,
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
    highlighted: true,
  },
  {
    id: 'ultime',
    name: 'Experience Ultime',
    badge: '🔥 Offre Limitée',
    badgeColor: 'bg-white/10 text-white border border-white/20',
    price: 5900,
    oldPrice: 9800,
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
    highlighted: false,
  },
]

export const getTimeRemaining = () => {
  const now = new Date()
  const endDate = new Date(now)
  endDate.setDate(now.getDate() + 3) // 3 jours à partir de maintenant
  return endDate
}


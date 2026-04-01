/**
 * Réalisations réelles — Portfolio Modernize Hub
 */

export const portfolioProjects = [
  {
    id: 'eduzen',
    title: 'EduZen',
    category: 'webapp',
    industry: 'EdTech / SaaS',
    liveUrl: 'https://www.eduzen.io/',
    thumbnail: '/images/portfolio/eduzen-thumb.png',
    images: {
      desktop: [
        '/images/portfolio/eduzen-desktop-1.png',
        '/images/portfolio/eduzen-desktop-2.png',
      ],
      mobile: [
        '/images/portfolio/eduzen-mobile-1.png',
      ],
    },
    description: 'Plateforme SaaS EdTech complète pour simplifier l\'apprentissage. Interface épurée, parcours personnalisés et tableau de bord analytique pour suivre la progression.',
    features: [
      'Interface SaaS moderne et intuitive',
      'Parcours d\'apprentissage personnalisés',
      'Tableau de bord analytics temps réel',
      'Système d\'authentification sécurisé',
      'Design responsive mobile-first',
      'Performance optimisée (score Lighthouse 95+)',
      'Intégrations paiement & abonnements',
    ],
    technologies: ['React', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    colors: {
      primary: '#1E3A5F',
      secondary: '#4ECDC4',
      accent: '#F7F9FB',
    },
    metrics: [
      { label: 'Score Lighthouse', value: '95+' },
      { label: 'Temps de chargement', value: '0.8s' },
      { label: 'Taux de rétention', value: '+60%' },
    ],
    developmentTime: '21 jours',
    cta: 'Voir le projet',
  },
  {
    id: '2kf-securite',
    title: '2KF Sécurité',
    category: 'vitrine',
    industry: 'Sécurité',
    liveUrl: 'https://www.2kfsecurite.fr/',
    thumbnail: '/images/portfolio/2kf-thumb.png',
    images: {
      desktop: [
        '/images/portfolio/2kf-desktop-1.png',
        '/images/portfolio/2kf-desktop-2.png',
      ],
      mobile: [
        '/images/portfolio/2kf-mobile-1.png',
      ],
    },
    description: 'Site vitrine professionnel pour une société de sécurité. Design sombre & corporate, présentation des services, formulaire devis et zone d\'intervention.',
    features: [
      'Design corporate dark & impactant',
      'Présentation services sécurité',
      'Formulaire de devis optimisé',
      'Zone d\'intervention géolocalisée',
      'Section certifications & agréments',
      'Optimisé SEO local',
      'Chargement ultra-rapide',
    ],
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    colors: {
      primary: '#0D0D0D',
      secondary: '#C9A227',
      accent: '#FFFFFF',
    },
    metrics: [
      { label: 'Leads générés/mois', value: '+120%' },
      { label: 'Temps de chargement', value: '0.7s' },
      { label: 'Score SEO', value: '94' },
    ],
    developmentTime: '14 jours',
    cta: 'Voir le projet',
  },
  {
    id: 'immokey',
    title: 'ImmoKey',
    category: 'webapp',
    industry: 'Immobilier',
    liveUrl: 'https://immokey.io/',
    thumbnail: '/images/portfolio/immokey-thumb.png',
    images: {
      desktop: [
        '/images/portfolio/immokey-desktop-1.png',
        '/images/portfolio/immokey-desktop-2.png',
      ],
      mobile: [
        '/images/portfolio/immokey-mobile-1.png',
      ],
    },
    description: 'Plateforme immobilière moderne avec recherche avancée et filtres temps réel. Interface épurée, fiches biens détaillées et prise de contact intégrée.',
    features: [
      'Recherche avancée avec filtres dynamiques',
      'Fiches biens avec galerie photos',
      'Carte interactive des propriétés',
      'Formulaire de contact & estimation',
      'Interface d\'administration CMS',
      'Optimisé SEO & performances',
      'Design responsive premium',
    ],
    technologies: ['React', 'Tailwind CSS', 'Supabase', 'Mapbox'],
    colors: {
      primary: '#0F2027',
      secondary: '#88A9C3',
      accent: '#F8F9FA',
    },
    metrics: [
      { label: 'Demandes de visite', value: '+280%' },
      { label: 'Temps de chargement', value: '0.9s' },
      { label: 'Score Lighthouse', value: '97' },
    ],
    developmentTime: '18 jours',
    cta: 'Voir le projet',
  },
  {
    id: 'skalle',
    title: 'Skalle',
    category: 'webapp',
    industry: 'Tech / SaaS',
    liveUrl: 'https://skalle.vercel.app/',
    thumbnail: '/images/portfolio/skalle-thumb.png',
    images: {
      desktop: [
        '/images/portfolio/skalle-desktop-1.png',
        '/images/portfolio/skalle-desktop-2.png',
      ],
      mobile: [
        '/images/portfolio/skalle-mobile-1.png',
      ],
    },
    description: 'Application web SaaS avec interface moderne et animations soignées. Dashboard interactif, design system cohérent et expérience utilisateur premium.',
    features: [
      'Interface SaaS moderne glassmorphism',
      'Dashboard analytique interactif',
      'Animations Framer Motion fluides',
      'Design system cohérent',
      'Authentification & gestion comptes',
      'Performance optimisée Vercel Edge',
      'Mobile-first responsive',
    ],
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    colors: {
      primary: '#0F0F0F',
      secondary: '#6366F1',
      accent: '#88A9C3',
    },
    metrics: [
      { label: 'Score Lighthouse', value: '96' },
      { label: 'Temps de chargement', value: '0.6s' },
      { label: 'Satisfaction UX', value: '98%' },
    ],
    developmentTime: '16 jours',
    cta: 'Voir le projet',
  },
]

export const portfolioCategories = [
  { id: 'all', label: 'Tous', count: portfolioProjects.length },
  { id: 'vitrine', label: 'Site Vitrine', count: portfolioProjects.filter(p => p.category === 'vitrine').length },
  { id: 'webapp', label: 'App Web / SaaS', count: portfolioProjects.filter(p => p.category === 'webapp').length },
]

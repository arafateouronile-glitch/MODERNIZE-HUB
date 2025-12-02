/**
 * Données des 8 maquettes premium pour le portfolio
 */

export const portfolioProjects = [
  {
    id: 'cabinet-avocats',
    title: 'Cabinet d\'Avocats Premium',
    category: 'vitrine',
    industry: 'Juridique',
    thumbnail: '/images/portfolio/cabinet-avocats-thumb.svg',
    videoPreview: '/videos/cabinet-avocats-preview.mp4',
    images: {
      desktop: [
        '/images/portfolio/cabinet-avocats-desktop-1.svg',
        '/images/portfolio/cabinet-avocats-desktop-2.svg',
        '/images/portfolio/cabinet-avocats-desktop-3.svg',
      ],
      mobile: [
        '/images/portfolio/cabinet-avocats-mobile-1.svg',
        '/images/portfolio/cabinet-avocats-mobile-2.svg',
      ],
    },
    description: 'Site web élégant et professionnel pour un cabinet d\'avocats spécialisé. Design dark mode avec accents dorés, animations subtiles et mise en avant de l\'expertise juridique.',
    features: [
      'Design dark mode élégant',
      'Section domaines d\'expertise interactive',
      'Formulaire consultation gratuite',
      'Slider témoignages clients',
      'Blog juridique intégré',
      'Animations parallax fluides',
      'Typographie premium',
    ],
    technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Three.js'],
    colors: {
      primary: '#1A1A1A',
      secondary: '#D4AF37',
      accent: '#FFFFFF',
    },
    metrics: [
      { label: 'Augmentation conversions', value: '+280%' },
      { label: 'Temps de chargement', value: '0.7s' },
      { label: 'Score Lighthouse', value: '98' },
    ],
    developmentTime: '14 jours',
    cta: 'Obtenir un site similaire',
  },
  {
    id: 'restaurant-gastronomique',
    title: 'Restaurant Gastronomique',
    category: 'vitrine',
    industry: 'Restauration',
    thumbnail: '/images/portfolio/restaurant-thumb.svg',
    videoPreview: '/videos/restaurant-preview.mp4',
    images: {
      desktop: [
        '/images/portfolio/restaurant-desktop-1.svg',
        '/images/portfolio/restaurant-desktop-2.svg',
        '/images/portfolio/restaurant-desktop-3.svg',
      ],
      mobile: [
        '/images/portfolio/restaurant-mobile-1.svg',
        '/images/portfolio/restaurant-mobile-2.svg',
      ],
    },
    description: 'Expérience digitale raffinée pour un restaurant étoilé. Hero vidéo full-screen, menu interactif avec photos HD et système de réservation intégré.',
    features: [
      'Hero vidéo full-screen',
      'Menu interactif avec photos HD',
      'Système réservation intégré',
      'Galerie photos plats (lightbox)',
      'Section chef + histoire',
      'Animations smooth scroll',
      'Optimisé mobile',
    ],
    technologies: ['React', 'GSAP', 'Video API', 'Tailwind CSS'],
    colors: {
      primary: '#2D1810',
      secondary: '#F4E4C1',
      accent: '#C41E3A',
    },
    metrics: [
      { label: 'Réservations en ligne', value: '+300%' },
      { label: 'Temps de chargement', value: '0.9s' },
      { label: 'Followers Instagram', value: '+400%' },
    ],
    developmentTime: '16 jours',
    cta: 'Obtenir un site similaire',
  },
  {
    id: 'agence-immobiliere',
    title: 'Agence Immobilière Moderne',
    category: 'vitrine',
    industry: 'Immobilier',
    thumbnail: '/images/portfolio/immobilier-thumb.svg',
    images: {
      desktop: [
        '/images/portfolio/immobilier-desktop-1.svg',
        '/images/portfolio/immobilier-desktop-2.svg',
        '/images/portfolio/immobilier-desktop-3.svg',
      ],
      mobile: [
        '/images/portfolio/immobilier-mobile-1.svg',
      ],
    },
    description: 'Plateforme immobilière moderne avec recherche avancée, filtres temps réel, vues 3D virtuelles et carte interactive des quartiers.',
    features: [
      'Recherche avancée overlay',
      'Grid propriétés avec filtres temps réel',
      'Vues 3D virtuelles (Three.js)',
      'Calculateur prêt immobilier',
      'Carte interactive quartiers',
      'Cards hover 3D',
      'Animations dynamiques',
    ],
    technologies: ['React', 'Mapbox', 'Three.js', 'Tailwind CSS'],
    colors: {
      primary: '#0A2E4D',
      secondary: '#FF6B35',
      accent: '#F7F9FB',
    },
    metrics: [
      { label: 'Visites propriétés', value: '+450%' },
      { label: 'Temps de chargement', value: '0.8s' },
      { label: 'Taux de conversion', value: '+320%' },
    ],
    developmentTime: '18 jours',
    cta: 'Obtenir un site similaire',
  },
  {
    id: 'coach-sportif',
    title: 'Coach Sportif / Salle de Sport',
    category: 'vitrine',
    industry: 'Sport & Fitness',
    thumbnail: '/images/portfolio/salle-sport-thumb.svg',
    images: {
      desktop: [
        '/images/portfolio/salle-sport-desktop-1.svg',
        '/images/portfolio/salle-sport-desktop-2.svg',
      ],
      mobile: [
        '/images/portfolio/salle-sport-mobile-1.svg',
      ],
    },
    description: 'Site énergétique avec couleurs vives et néons électriques. Split-screen avant/après, planning cours interactif et système de booking.',
    features: [
      'Design énergétique néon',
      'Split-screen avant/après',
      'Planning cours interactif',
      'Profils coachs avec vidéos',
      'Calculateur IMC / Calories',
      'Système booking en ligne',
      'Cursor trail effects',
    ],
    technologies: ['React', 'Tone.js', 'Canvas API', 'Tailwind CSS'],
    colors: {
      primary: '#0F0F0F',
      secondary: '#00FF88',
      accent: '#FF0080',
    },
    metrics: [
      { label: 'Inscriptions', value: '+250%' },
      { label: 'Temps de chargement', value: '0.6s' },
      { label: 'Engagement', value: '+380%' },
    ],
    developmentTime: '12 jours',
    cta: 'Obtenir un site similaire',
  },
  {
    id: 'artisan-premium',
    title: 'Artisan Premium',
    category: 'vitrine',
    industry: 'Artisanat',
    thumbnail: '/images/portfolio/artisan-thumb.svg',
    images: {
      desktop: [
        '/images/portfolio/artisan-desktop-1.svg',
        '/images/portfolio/artisan-desktop-2.svg',
      ],
      mobile: [
        '/images/portfolio/artisan-mobile-1.svg',
      ],
    },
    description: 'Portfolio visuel élégant pour un menuisier/architecte. Grille photos, galerie avant/après avec slider et processus étape par étape.',
    features: [
      'Portfolio visuel élégant',
      'Galerie avant/après avec slider',
      'Processus étape par étape illustré',
      'Demande devis en ligne',
      'Certifications/labels',
      'Image reveal on scroll',
      'Lightbox photos',
    ],
    technologies: ['React', 'Lightbox', 'Intersection Observer', 'Tailwind CSS'],
    colors: {
      primary: '#2C2416',
      secondary: '#D9C6B0',
      accent: '#8B7355',
    },
    metrics: [
      { label: 'Demandes devis', value: '+340%' },
      { label: 'Temps de chargement', value: '0.7s' },
      { label: 'Taux de conversion', value: '+290%' },
    ],
    developmentTime: '13 jours',
    cta: 'Obtenir un site similaire',
  },
  {
    id: 'startup-tech',
    title: 'Startup Tech / SaaS',
    category: 'webapp',
    industry: 'Tech',
    thumbnail: '/images/portfolio/startup-thumb.svg',
    images: {
      desktop: [
        '/images/portfolio/startup-desktop-1.svg',
        '/images/portfolio/startup-desktop-2.svg',
      ],
      mobile: [
        '/images/portfolio/startup-mobile-1.svg',
      ],
    },
    description: 'Site moderne avec glassmorphism et gradients vifs. Dashboard product mockup en 3D, section pricing et product tour interactif.',
    features: [
      'Design glassmorphism moderne',
      'Dashboard product mockup 3D',
      'Section pricing 3 tiers',
      'Intégrations partenaires',
      'Testimonials avec avatars',
      'Product tour interactif',
      'Morphing blobs animations',
    ],
    technologies: ['React', 'Three.js', 'Spline 3D', 'Tailwind CSS'],
    colors: {
      primary: '#6366F1',
      secondary: '#EC4899',
      accent: '#14B8A6',
    },
    metrics: [
      { label: 'Inscriptions', value: '+420%' },
      { label: 'Temps de chargement', value: '0.8s' },
      { label: 'Score Lighthouse', value: '96' },
    ],
    developmentTime: '20 jours',
    cta: 'Obtenir un site similaire',
  },
  {
    id: 'ecommerce-mode',
    title: 'E-commerce Mode/Lifestyle',
    category: 'ecommerce',
    industry: 'E-commerce',
    thumbnail: '/images/portfolio/ecommerce-thumb.svg',
    images: {
      desktop: [
        '/images/portfolio/ecommerce-desktop-1.svg',
        '/images/portfolio/ecommerce-desktop-2.svg',
      ],
      mobile: [
        '/images/portfolio/ecommerce-mobile-1.svg',
      ],
    },
    description: 'Boutique en ligne minimaliste chic avec grandes images et white space. Quick view produits, panier slide-in et wishlist.',
    features: [
      'Design minimaliste chic',
      'Grid produits avec filtres',
      'Quick view modal',
      'Wishlist intégrée',
      'Slider collections',
      'Panier slide-in',
      'Optimisé conversion',
    ],
    technologies: ['React', 'Shopify API', 'Algolia Search', 'Tailwind CSS'],
    colors: {
      primary: '#FFFFFF',
      secondary: '#000000',
      accent: '#FF6B6B',
    },
    metrics: [
      { label: 'Ventes en ligne', value: '+380%' },
      { label: 'Temps de chargement', value: '0.9s' },
      { label: 'Taux de conversion', value: '+340%' },
    ],
    developmentTime: '22 jours',
    cta: 'Obtenir un site similaire',
  },
  {
    id: 'agence-marketing',
    title: 'Agence Marketing/Creative',
    category: 'vitrine',
    industry: 'Marketing',
    thumbnail: '/images/portfolio/marketing-thumb.svg',
    images: {
      desktop: [
        '/images/portfolio/marketing-desktop-1.svg',
        '/images/portfolio/marketing-desktop-2.svg',
      ],
      mobile: [
        '/images/portfolio/marketing-mobile-1.svg',
      ],
    },
    description: 'Site bold avec typographie expressive et animations wow. Bento grid showcase, équipe avec hovers créatifs et animations surprise.',
    features: [
      'Design bold et expressif',
      'Text scramble animations',
      'Bento grid showcase',
      'Section équipe créative',
      'Services avec icônes custom',
      'Contact animation surprise',
      'SVG morphing',
    ],
    technologies: ['React', 'GSAP', 'Lottie', 'Three.js'],
    colors: {
      primary: 'Multicolore',
      secondary: 'Gradients dynamiques',
      accent: '#D9FF00',
    },
    metrics: [
      { label: 'Leads générés', value: '+450%' },
      { label: 'Temps de chargement', value: '0.7s' },
      { label: 'Engagement', value: '+520%' },
    ],
    developmentTime: '17 jours',
    cta: 'Obtenir un site similaire',
  },
]

export const portfolioCategories = [
  { id: 'all', label: 'Tous', count: portfolioProjects.length },
  { id: 'vitrine', label: 'Site Vitrine', count: portfolioProjects.filter(p => p.category === 'vitrine').length },
  { id: 'ecommerce', label: 'E-commerce', count: portfolioProjects.filter(p => p.category === 'ecommerce').length },
  { id: 'webapp', label: 'App Web', count: portfolioProjects.filter(p => p.category === 'webapp').length },
]


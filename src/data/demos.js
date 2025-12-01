export const demos = [
  {
    id: 1,
    category: 'Professions Libérales',
    title: 'Cabinet d\'Avocats',
    story: '"Mon site faisait amateur. Je perdais des clients à 5000€+ au profit de cabinets moins compétents mais mieux présentés. En 14 jours, Modernize Hub a changé la donne. Aujourd\'hui, mes honoraires ont doublé." - Maître Vanderbilt',
    before: {
      image: '/images/demos/cabinet-avocat-before.svg',
      problems: ['Design 2015', 'Pas responsive', 'Aucune animation'],
    },
    after: {
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3Cfilter id='glowAvocat'%3E%3CfeGaussianBlur stdDeviation='2' result='coloredBlur'/%3E%3CfeMerge%3E%3CfeMergeNode in='coloredBlur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Crect width='1200' height='800' fill='%230B0F19'/%3E%3Ccircle cx='1000' cy='200' r='300' fill='%23F59E0B' opacity='0.05'/%3E%3Ctext x='50' y='50' font-family='Times New Roman' font-weight='bold' font-size='24' fill='%23F59E0B'%3EVANDERBILT%3C/text%3E%3Ctext x='220' y='50' font-family='Arial' font-size='24' fill='%23FFFFFF'%3E%26amp; ASSOCIÉS%3C/text%3E%3Ctext x='100' y='250' font-family='Times New Roman' font-size='80' fill='%23FFFFFF'%3EL'Art de%3C/text%3E%3Ctext x='400' y='250' font-family='Times New Roman' font-style='italic' font-size='80' fill='%23F59E0B'%3EGagner.%3C/text%3E%3Crect x='100' y='300' width='50' height='4' fill='%23F59E0B'/%3E%3Ctext x='100' y='350' font-family='Arial' font-size='24' fill='%23F59E0B' opacity='0.9'%3EEXPERTISE JURIDIQUE INTERNATIONALE%3C/text%3E%3Cline x1='100' y1='500' x2='1100' y2='500' stroke='%23333' stroke-width='1'/%3E%3Ctext x='150' y='600' font-family='Times New Roman' font-weight='bold' font-size='50' fill='%23FFFFFF'%3E35+%3C/text%3E%3Ctext x='150' y='630' font-family='Arial' font-size='14' fill='%23F59E0B' letter-spacing='2'%3EANNÉES D'EXPÉRIENCE%3C/text%3E%3Ctext x='500' y='600' font-family='Times New Roman' font-weight='bold' font-size='50' fill='%23FFFFFF'%3E2M€%3C/text%3E%3Ctext x='500' y='630' font-family='Arial' font-size='14' fill='%23F59E0B' letter-spacing='2'%3ERÉCUPÉRÉS%3C/text%3E%3Ctext x='850' y='600' font-family='Times New Roman' font-weight='bold' font-size='50' fill='%23FFFFFF'%3E98%25%3C/text%3E%3Ctext x='850' y='630' font-family='Arial' font-size='14' fill='%23F59E0B' letter-spacing='2'%3EDE SUCCÈS%3C/text%3E%3C/svg%3E",
      benefits: ['Design 2025', 'Animations subtiles', '+200% leads qualifiés'],
    },
    stats: [
      { label: 'Temps chargement', value: '-60%' },
      { label: 'Conversions', value: '+200%' },
      { label: 'Temps sur site', value: '+150%' },
    ],
    description: 'Transformation d\'un site basique en plateforme premium avec dark mode élégant et accents dorés.',
    features: ['Design dark mode', 'Animations subtiles', 'Formulaire optimisé', 'Blog intégré'],
    technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 2,
    category: 'Restauration',
    title: 'Restaurant Gastronomique',
    story: '"Les réservations en ligne étaient inexistantes. Notre site ne reflétait pas notre étoile Michelin. Modernize Hub a créé une expérience digitale à la hauteur de notre cuisine. Résultat : +300% de followers Instagram, table complète 3 semaines à l\'avance." - Chef Laurent',
    before: {
      image: '/images/demos/restaurant-before.svg',
      problems: ['Template WordPress', 'Carrousel générique', 'Pas de réservation'],
    },
    after: {
      image: '/images/demos/restaurant-after.svg',
      benefits: ['Vidéo hero immersive', 'Menu interactif', '+150% réservations'],
    },
    stats: [
      { label: 'Réservations en ligne', value: '+150%' },
      { label: 'Instagram follows', value: '+300%' },
      { label: 'Temps sur site', value: '+200%' },
    ],
    description: 'Site gastronomique avec vidéo hero immersive, menu interactif et système de réservation fluide.',
    features: ['Vidéo hero', 'Menu interactif', 'Réservation en ligne', 'Galerie photos'],
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 3,
    category: 'Immobilier',
    title: 'Agence Immobilière',
    story: '"Notre ancien site : une liste Excel avec des photos floues. Les clients allaient chez la concurrence avant même de nous appeler. Le nouveau site avec filtres 3D et visites virtuelles a tout changé. On a fermé 2,2M€ de mandats en 3 mois. Record absolu." - Karine, Directrice',
    before: {
      image: '/images/demos/immobilier-before.svg',
      problems: ['Grille photos basique', 'Formulaire moche', 'Navigation confuse'],
    },
    after: {
      image: '/images/demos/immobilier-after.svg',
      benefits: ['Filtres 3D interactifs', 'Parallax', '+220% demandes'],
    },
    stats: [
      { label: 'Taux rebond', value: '-45%' },
      { label: 'Demandes de visite', value: '+220%' },
      { label: 'Temps sur site', value: '+180%' },
    ],
    description: 'Plateforme immobilière moderne avec filtres 3D, effets parallax et cartes dynamiques.',
    features: ['Filtres 3D', 'Effets parallax', 'Carte interactive', 'Galerie virtuelle'],
    technologies: ['React', 'Three.js', 'Mapbox'],
  },
  {
    id: 4,
    category: 'Sport & Fitness',
    title: 'Salle de Sport',
    story: '"On perdait face aux salles low-cost. Notre site ne transmettait pas l\'énergie de nos coachs. Le nouveau design avec néons et animations 3D reflète enfin notre ADN. Inscriptions explosées, rétention membres au top. Game changer total." - Alex, Fondateur',
    before: {
      image: '/images/demos/salle-sport-before.svg',
      problems: ['Design générique', 'Photos amateur', 'Pas de booking'],
    },
    after: {
      image: '/images/demos/salle-sport-after.svg',
      benefits: ['Néons électriques', 'Animations énergétiques', '+180% inscriptions'],
    },
    stats: [
      { label: 'Inscriptions', value: '+180%' },
      { label: 'Rétention membres', value: '+90%' },
      { label: 'Temps sur site', value: '+160%' },
    ],
    description: 'Site énergique avec néons électriques, animations dynamiques et système de réservation.',
    features: ['Design énergique', 'Animations 3D', 'Booking en ligne', 'Galerie vidéos'],
    technologies: ['React', 'Three.js', 'Stripe'],
  },
  {
    id: 5,
    category: 'Artisans',
    title: 'Artisan Électricien',
    story: '"Mon site faisait bricoleur du dimanche. Les clients allaient voir ailleurs. J\'ai investi 2 400€ dans le nouveau site. En 2 mois, j\'ai récupéré mon investissement 8 fois. Maintenant je refuse des chantiers tellement j\'ai de demandes. Merci Modernize Hub !" - Marc, Électricien',
    before: {
      image: '/images/demos/artisan-before.svg',
      problems: ['Template cheap', 'Pas responsive', 'Numéro géant'],
    },
    after: {
      image: '/images/demos/artisan-after.svg',
      benefits: ['Design pro épuré', 'Devis en ligne', '+310% demandes'],
    },
    stats: [
      { label: 'Demandes de devis', value: '+310%' },
      { label: 'Panier moyen', value: '+125%' },
      { label: 'Temps sur site', value: '+190%' },
    ],
    description: 'Site professionnel épuré avec devis en ligne et galerie avant/après des réalisations.',
    features: ['Design épuré', 'Devis en ligne', 'Galerie avant/après', 'Formulaire optimisé'],
    technologies: ['React', 'Tailwind CSS', 'Formik'],
  },
]


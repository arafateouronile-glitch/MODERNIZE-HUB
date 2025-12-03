# 🗺️ ROADMAP D'IMPLÉMENTATION - MODERNIZE HUB

Plan détaillé pour les fonctionnalités prioritaires et nice-to-have.

---

## 🔴 PRIORITÉ HAUTE (SEMAINE 1-2)

### 1. Augmenter Couverture Tests à 80%+ 

**Objectif** : Passer de 7 tests à 50+ tests pour garantir la stabilité.

**Actions** :
```bash
# Tests à créer
- src/test/components/
  ✅ Contact.test.jsx (existe)
  ✅ Hero.test.jsx (existe)
  ✅ Portfolio.test.jsx (existe)
  ✅ Pricing.test.jsx (existe)
  
  ➕ À ajouter :
  - Header.test.jsx (navigation, menu mobile)
  - Footer.test.jsx (liens, social media)
  - CalendlyButton.test.jsx (ouverture modal)
  - ThemeToggle.test.jsx (switch light/dark)
  - PricingCard.test.jsx (hover states, CTA)
  - DemoCard.test.jsx (navigation vers /demo/:id)
  - AdminLogin.test.jsx (form validation)
  - LeadsManager.test.jsx (table, filters)
  
- src/test/pages/
  - Services.test.jsx (navigation hub)
  - CreationSiteWeb.test.jsx (pricing display)
  - RefonteSite.test.jsx (pricing display)
  - DemoPage.test.jsx (8 designs uniques)
  
- src/test/hooks/
  - useCountUp.test.js (animations stats)
  - useScrollAnimation.test.js (reveal on scroll)
  - useMediaQuery.test.js (responsive)
  
- src/test/utils/
  - themeUtils.test.js (dark/light helpers)
  - helpers.test.js (formatters, validators)
```

**Commandes** :
```bash
npm run test              # Lancer tous les tests
npm run test:coverage     # Voir la couverture
npm run test:ui           # Interface visuelle
```

**Critère de succès** : Couverture ≥ 80% sur composants critiques

---

### 2. Intégrer Calendly Complet (Production)

**Objectif** : Remplacer le placeholder par une vraie intégration Calendly.

**Étapes** :

#### A. Créer un compte Calendly
1. Aller sur https://calendly.com
2. Créer un compte professionnel (freemium suffit)
3. Configurer votre disponibilité (ex: Lun-Ven 9h-18h)
4. Créer un type d'événement : "Consultation Gratuite 30 min"

#### B. Obtenir votre URL Calendly
```
Format: https://calendly.com/votre-nom/consultation
Exemple: https://calendly.com/modernizehub/consultation
```

#### C. Mettre à jour le code

**Fichier** : `portfolio-site/.env`
```bash
# Ajouter votre URL Calendly réelle
VITE_CALENDLY_URL=https://calendly.com/votre-nom/consultation
```

**Fichier** : `src/components/common/CalendlyButton.jsx`
```jsx
// Remplacer la logique actuelle par :
import { useEffect } from 'react'

export const CalendlyButton = ({ variant = 'primary', className = '' }) => {
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL

  useEffect(() => {
    // Charger le script Calendly
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl })
    }
  }

  return (
    <button 
      onClick={openCalendly}
      className={`... ${className}`}
    >
      Réserver un Appel
    </button>
  )
}
```

**Test** : Vérifier que le pop-up Calendly s'ouvre correctement en production.

---

## 🟠 PRIORITÉ MOYENNE (SEMAINE 3-4)

### 3. Configurer Crisp Chat

**Objectif** : Chat en direct pour support client instantané.

**Étapes** :

#### A. Créer un compte Crisp
1. Aller sur https://crisp.chat/fr/
2. Inscription gratuite (jusqu'à 2 opérateurs)
3. Obtenir votre **Website ID** (format : `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

#### B. Intégrer Crisp dans le projet

**Fichier** : `portfolio-site/.env`
```bash
VITE_CRISP_WEBSITE_ID=votre-crisp-website-id
```

**Fichier** : `src/components/common/LiveChat.jsx`
```jsx
import { useEffect } from 'react'

export const LiveChat = () => {
  const crispWebsiteId = import.meta.env.VITE_CRISP_WEBSITE_ID

  useEffect(() => {
    if (!crispWebsiteId || crispWebsiteId === 'your-crisp-website-id') {
      console.warn('⚠️ Crisp non configuré')
      return
    }

    // Injection du script Crisp
    window.$crisp = []
    window.CRISP_WEBSITE_ID = crispWebsiteId

    const script = document.createElement('script')
    script.src = 'https://client.crisp.chat/l.js'
    script.async = true
    document.getElementsByTagName('head')[0].appendChild(script)

    // Configuration initiale
    window.$crisp.push(['safe', true]) // Mode RGPD
    
    return () => {
      // Cleanup si nécessaire
      delete window.$crisp
      delete window.CRISP_WEBSITE_ID
    }
  }, [crispWebsiteId])

  return null // Composant invisible
}
```

**Fichier** : `src/App.jsx`
```jsx
import { LiveChat } from './components/common/LiveChat'

function App() {
  return (
    <>
      {/* ... autres composants */}
      <LiveChat />
    </>
  )
}
```

**Personnalisation Crisp** :
- Logo : Ajouter le logo Modernize Hub
- Couleur : `#D9FF00` (jaune néon)
- Message d'accueil : "👋 Bonjour ! Comment puis-je vous aider ?"
- Horaires : Lun-Ven 9h-18h (réponse automatique hors horaires)

---

### 4. Créer Landing Pages par Industrie

**Objectif** : Pages dédiées pour cibler des industries spécifiques (SEO + Conversion).

**Pages à créer** :

```
/landing/
  ├── restaurants/          → Restaurants & Bars
  ├── avocats/              → Cabinets d'Avocats
  ├── immobilier/           → Agences Immobilières
  ├── fitness/              → Salles de Sport & Coachs
  └── artisans/             → Artisans & PME
```

**Template de Landing Page** :

**Fichier** : `src/pages/landing/RestaurantLanding.jsx`
```jsx
import { motion } from 'framer-motion'
import { ChefHat, Utensils, Star, ArrowRight } from 'lucide-react'
import { SEO } from '../../components/seo/SEO'
import { Header } from '../../components/common/Header'
import { Footer } from '../../components/common/Footer'

export const RestaurantLanding = () => {
  return (
    <>
      <SEO 
        title="Site Web pour Restaurant | Modernize Hub"
        description="Créez un site web moderne pour votre restaurant. Menu en ligne, réservations, photos HD. À partir de 1990€. Livraison 14 jours."
        keywords="site restaurant, menu en ligne, réservation restaurant"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1512] to-[#2d1810] text-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#c41e3a]/20 border border-[#c41e3a] rounded-full px-4 py-2 mb-6"
          >
            <ChefHat className="w-4 h-4" />
            <span className="text-sm font-bold">Spécial Restaurateurs</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transformez votre restaurant avec un
            <span className="block text-[#f4e4c1]">site web qui fait saliver</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Menu en ligne, réservation directe, galerie photos HD. 
            Augmentez vos réservations de +300% en 14 jours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-[#c41e3a] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d4293f] transition-all shadow-lg">
              Voir nos réalisations restaurants
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#1a1512] transition-all">
              Demander un devis gratuit
            </button>
          </div>
          
          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            {[
              { stat: '+300%', label: 'Réservations' },
              { stat: '14j', label: 'Livraison' },
              { stat: '1990€', label: 'À partir de' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-[#f4e4c1] mb-2">{item.stat}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Fonctionnalités Spécifiques */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Tout ce dont un restaurant a besoin
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Utensils,
                title: 'Menu en ligne interactif',
                desc: 'Présentez vos plats avec photos HD, descriptions et prix actualisables en temps réel.',
              },
              {
                icon: Star,
                title: 'Système de réservation',
                desc: 'Réservations directes 24/7 sans passer par les plateformes (0% commission).',
              },
              {
                icon: ChefHat,
                title: 'Section Chef & Histoire',
                desc: 'Racontez votre histoire, votre philosophie, créez une connexion émotionnelle.',
              },
            ].map((feature, i) => (
              <div key={i} className="text-center p-8 rounded-2xl border-2 border-gray-100 hover:border-[#c41e3a] transition-all hover:shadow-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c41e3a]/10 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-[#c41e3a]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Restaurants */}
      <section className="py-24 px-6 bg-[#1a1512]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Nos créations pour restaurants
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
            Découvrez comment nous avons transformé l'image en ligne de restaurants comme le vôtre.
          </p>
          
          <a 
            href="/demo/restaurant-gastronomique" 
            className="inline-flex items-center gap-2 bg-[#c41e3a] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#d4293f] transition-all"
          >
            Voir la démo interactive
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
      
      {/* Pricing Spécifique Restaurant */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Tarifs pour restaurants
          </h2>
          
          <div className="bg-gradient-to-br from-[#1a1512] to-[#2d1810] text-white p-12 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <ChefHat className="w-12 h-12 text-[#f4e4c1]" />
              <div>
                <h3 className="text-3xl font-bold">Formule Restaurant Pro</h3>
                <p className="text-[#f4e4c1]">Tout ce qu'il faut pour briller en ligne</p>
              </div>
            </div>
            
            <div className="text-5xl font-bold mb-8">
              2 990€
              <span className="text-xl text-gray-400 ml-2">tout compris</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                'Menu en ligne interactif',
                'Système de réservation intégré',
                'Galerie photos HD professionnelles',
                'Section Chef & Histoire',
                'Google My Business Setup',
                '3 emails professionnels',
                'Formation complète 2h',
                'Support 1 mois',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#c41e3a] rounded-full flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <button className="w-full bg-[#c41e3a] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d4293f] transition-all">
              Réserver une consultation gratuite
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-24 px-6 bg-[#c41e3a] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à faire décoller votre restaurant ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les 50+ restaurants qui nous font confiance
          </p>
          <button className="bg-white text-[#c41e3a] px-10 py-5 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all shadow-xl">
            Démarrer mon projet
          </button>
        </div>
      </section>
      
      <Footer />
    </>
  )
}
```

**Répéter ce template pour** :
- `/landing/avocats` (couleurs : noir + or)
- `/landing/immobilier` (couleurs : bleu + orange)
- `/landing/fitness` (couleurs : noir + vert néon)
- `/landing/artisans` (couleurs : beige + marron)

**SEO** : Chaque page doit avoir :
- Title unique par industrie
- Meta description optimisée (mots-clés sectoriels)
- Schema.org (Organization + Service)
- Balises H1/H2 structurées

---

### 5. Implémenter A/B Testing

**Objectif** : Tester différentes versions pour optimiser la conversion.

**Option 1 : Google Optimize (Gratuit)**

**Étape 1** : Créer un compte Google Optimize
- Lier à Google Analytics 4

**Étape 2** : Intégrer le script

**Fichier** : `index.html`
```html
<!-- Google Optimize -->
<script src="https://www.googleoptimize.com/optimize.js?id=OPT-XXXXXXX"></script>
```

**Tests à lancer** :

1. **Hero CTA** :
   - Version A : "Demander un devis"
   - Version B : "Voir nos tarifs"
   - Version C : "Réserver un appel gratuit"

2. **Pricing Card** :
   - Version A : Badge "Plus Populaire"
   - Version B : Badge "-20% Promo"
   - Version C : Badge "Recommandé"

3. **Couleur CTA** :
   - Version A : Jaune néon (#D9FF00)
   - Version B : Bleu électrique (#6366F1)
   - Version C : Rouge conversion (#EF4444)

**Option 2 : Custom Hook React**

**Fichier** : `src/hooks/useABTest.js`
```js
import { useState, useEffect } from 'react'

export const useABTest = (testName, variants) => {
  const [variant, setVariant] = useState(null)

  useEffect(() => {
    // Récupérer ou assigner une variante
    const storageKey = `ab_test_${testName}`
    let assignedVariant = localStorage.getItem(storageKey)

    if (!assignedVariant) {
      // Assigner aléatoirement
      const randomIndex = Math.floor(Math.random() * variants.length)
      assignedVariant = variants[randomIndex]
      localStorage.setItem(storageKey, assignedVariant)
    }

    setVariant(assignedVariant)

    // Track dans Analytics
    if (window.gtag) {
      window.gtag('event', 'ab_test_view', {
        test_name: testName,
        variant: assignedVariant,
      })
    }
  }, [testName, variants])

  const trackConversion = (eventName) => {
    if (window.gtag && variant) {
      window.gtag('event', eventName, {
        test_name: testName,
        variant: variant,
      })
    }
  }

  return { variant, trackConversion }
}
```

**Utilisation** :

**Fichier** : `src/components/sections/Hero.jsx`
```jsx
import { useABTest } from '../../hooks/useABTest'

export const Hero = () => {
  const { variant, trackConversion } = useABTest('hero_cta', ['devis', 'tarifs', 'appel'])

  const ctaText = {
    devis: 'Demander un devis',
    tarifs: 'Voir nos tarifs',
    appel: 'Réserver un appel gratuit',
  }

  const handleCTAClick = () => {
    trackConversion('cta_click')
    // ... navigation
  }

  return (
    <section>
      {/* ... */}
      <button onClick={handleCTAClick}>
        {ctaText[variant]}
      </button>
    </section>
  )
}
```

---

## 🟡 PRIORITÉ BASSE (SEMAINE 5-8)

### 6. PWA avec Service Worker

**Objectif** : Application installable + mode offline.

**Fichier** : `portfolio-site/vite.config.js`
```js
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'images/**/*'],
      manifest: {
        name: 'Modernize Hub',
        short_name: 'Modernize',
        description: 'Agence de création de sites web premium',
        theme_color: '#D9FF00',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
              },
            },
          },
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
              },
            },
          },
        ],
      },
    }),
  ],
}
```

**Installation** :
```bash
npm install vite-plugin-pwa -D
```

---

### 7. Dashboard Analytics Client

**Objectif** : Tableau de bord pour que les clients suivent leurs métriques.

**Fichier** : `src/pages/ClientDashboard.jsx`
```jsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { LineChart, Users, Eye, MousePointer } from 'lucide-react'

export const ClientDashboard = () => {
  const [stats, setStats] = useState({
    visitors: 0,
    leads: 0,
    conversion: 0,
  })

  useEffect(() => {
    // Fetch stats depuis Supabase
    const fetchStats = async () => {
      const { data } = await supabase
        .from('client_stats')
        .select('*')
        .eq('client_id', 'client-uuid')
        .single()
      
      setStats(data)
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={Users}
          label="Visiteurs ce mois"
          value={stats.visitors}
          trend="+12%"
        />
        <StatCard 
          icon={MousePointer}
          label="Demandes de devis"
          value={stats.leads}
          trend="+8%"
        />
        <StatCard 
          icon={Eye}
          label="Taux de conversion"
          value={`${stats.conversion}%`}
          trend="+2.5%"
        />
      </div>
      
      {/* Graphique (Chart.js ou Recharts) */}
    </div>
  )
}
```

---

### 8. Espace Client (Suivi Projet)

**Objectif** : Portail client pour suivre l'avancement du projet en temps réel.

**Tables Supabase** :

```sql
-- Migration Supabase
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  status TEXT CHECK (status IN ('brief', 'design', 'dev', 'review', 'live')),
  progress INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deadline DATE
);

CREATE TABLE project_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ
);
```

**Fichier** : `src/pages/ClientPortal.jsx`
```jsx
export const ClientPortal = () => {
  const [project, setProject] = useState(null)

  // Timeline du projet
  const milestones = [
    { phase: 'Brief', status: 'completed', date: '15 Jan' },
    { phase: 'Maquette', status: 'in_progress', date: '20 Jan' },
    { phase: 'Développement', status: 'pending', date: '25 Jan' },
    { phase: 'Tests', status: 'pending', date: '30 Jan' },
    { phase: 'Mise en ligne', status: 'pending', date: '5 Fév' },
  ]

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Suivi de votre projet</h1>
      
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-sm mb-2">
          <span>Avancement global</span>
          <span className="font-bold">45%</span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[45%]" />
        </div>
      </div>
      
      {/* Timeline */}
      <div className="space-y-6">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              m.status === 'completed' ? 'bg-green-500' : 
              m.status === 'in_progress' ? 'bg-blue-500 animate-pulse' : 
              'bg-gray-300'
            }`}>
              {m.status === 'completed' && '✓'}
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{m.phase}</h3>
              <p className="text-sm text-gray-500">Date prévue : {m.date}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Files Shared */}
      <div className="mt-12 bg-gray-50 p-6 rounded-xl">
        <h3 className="font-bold mb-4">Fichiers partagés</h3>
        <ul className="space-y-2">
          <li>📄 Maquette v1.pdf</li>
          <li>📄 Charte graphique.pdf</li>
        </ul>
      </div>
    </div>
  )
}
```

---

### 9. Module Facturation Automatisé

**Objectif** : Génération automatique de factures + paiement en ligne.

**Option 1 : Stripe**

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

**Fichier** : `src/pages/Checkout.jsx`
```jsx
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const CheckoutForm = ({ amount, projectName }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Créer un Payment Intent côté serveur
    const { data: { client_secret } } = await supabase.functions.invoke('create-payment-intent', {
      body: { amount, projectName }
    })

    // Confirmer le paiement
    const { error } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    if (!error) {
      alert('Paiement réussi !')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Paiement sécurisé</h2>
      <CardElement className="border p-4 rounded-lg mb-6" />
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
        Payer {amount}€
      </button>
    </form>
  )
}

export const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={2990} projectName="Site Restaurant Pro" />
  </Elements>
)
```

**Supabase Edge Function** : `create-payment-intent`

```typescript
// supabase/functions/create-payment-intent/index.ts
import Stripe from 'https://esm.sh/stripe@13.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)

Deno.serve(async (req) => {
  const { amount, projectName } = await req.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convertir en centimes
    currency: 'eur',
    description: `Modernize Hub - ${projectName}`,
  })

  return new Response(
    JSON.stringify({ client_secret: paymentIntent.client_secret }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

---

## 📊 TABLEAU RÉCAPITULATIF

| Fonctionnalité | Priorité | Temps estimé | Complexité | Impact Business |
|----------------|----------|--------------|------------|-----------------|
| Tests 80%+ | 🔴 Haute | 8-12h | ⭐⭐⭐ | Stabilité produit |
| Calendly Prod | 🟠 Moyenne | 2h | ⭐ | Réservations +50% |
| Crisp Chat | 🟠 Moyenne | 3h | ⭐⭐ | Support instant |
| Landing Industries | 🟠 Moyenne | 16-20h | ⭐⭐⭐ | SEO +200% |
| A/B Testing | 🟠 Moyenne | 6-8h | ⭐⭐⭐ | Conversion +15-30% |
| PWA | 🟡 Basse | 4-6h | ⭐⭐ | Engagement +20% |
| Dashboard Analytics | 🟡 Basse | 12-16h | ⭐⭐⭐⭐ | Rétention clients |
| Espace Client | 🟡 Basse | 16-24h | ⭐⭐⭐⭐⭐ | Satisfaction client |
| Facturation Auto | 🟡 Basse | 10-14h | ⭐⭐⭐⭐ | Automatisation |

---

## 🎯 PLAN D'EXÉCUTION RECOMMANDÉ

### **Semaine 1-2** (Priorité Rouge)
✅ Augmenter tests à 80%  
✅ Intégrer Calendly prod  

### **Semaine 3-4** (Priorité Orange)
✅ Configurer Crisp Chat  
✅ Créer 2-3 landing pages (Restaurants, Avocats)  

### **Semaine 5-6** (Priorité Orange)
✅ Compléter landing pages (Immobilier, Fitness, Artisans)  
✅ Implémenter A/B testing basique  

### **Semaine 7-8** (Priorité Jaune - si besoin)
⚡ PWA Service Worker  
⚡ Dashboard analytics (version MVP)  

### **Mois 3+** (Nice-to-have)
⚡ Espace client complet  
⚡ Module facturation  

---

**Conseil** : Commencez par les 5 premières fonctionnalités (Haute + Moyenne priorité) avant d'attaquer les "Nice-to-have". Ces 5 features auront le plus gros impact sur votre chiffre d'affaires.

Voulez-vous que je commence l'implémentation d'une de ces fonctionnalités maintenant ?



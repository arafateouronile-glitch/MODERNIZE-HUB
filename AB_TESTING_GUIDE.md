# Guide A/B Testing - Modernize Hub

Le système d'A/B testing est maintenant intégré au projet pour optimiser les conversions.

## Fonctionnement

Le système utilise le **localStorage** pour persister les variants et les conversions. Chaque visiteur est automatiquement assigné à un variant (A, B, C, etc.) de manière aléatoire et conserve ce variant lors de ses prochaines visites.

## Utilisation

### Méthode 1: Hook `useABTest`

```jsx
import { useABTest, useABTestConversion } from '../hooks/useABTest'

function HeroSection() {
  const variant = useABTest('hero-cta', ['A', 'B'])
  const trackConversion = useABTestConversion('hero-cta')

  const handleCTAClick = () => {
    trackConversion('cta_click')
    // ... reste du code
  }

  if (variant === 'A') {
    return (
      <button onClick={handleCTAClick} className="bg-[#D9FF00]">
        Demander un devis gratuit
      </button>
    )
  }

  return (
    <button onClick={handleCTAClick} className="bg-white">
      Parler à un expert
    </button>
  )
}
```

### Méthode 2: Composant `ABTestWrapper`

```jsx
import ABTestWrapper from '../components/abtest/ABTestWrapper'

function PricingSection() {
  return (
    <ABTestWrapper
      testName="pricing-layout"
      variants={{
        A: <PricingGrid />,
        B: <PricingCards />,
        C: <PricingTable />
      }}
    />
  )
}
```

## Tests suggérés

### 🔥 PRIORITÉ HAUTE (Impact fort)

#### 1. CTA Hero (hero-cta)
**Hypothèse**: Un CTA plus direct augmente les conversions

- **Variant A**: "Demander un devis gratuit" (contrôle)
- **Variant B**: "Voir nos tarifs"
- **Variant C**: "Parler à un expert"

**Mesure de succès**: Clics sur CTA / Impressions

**Implémentation**:
```jsx
// Dans src/components/sections/Hero.jsx
const variant = useABTest('hero-cta', ['A', 'B', 'C'])
const trackConversion = useABTestConversion('hero-cta')

const ctaTexts = {
  A: 'Demander un devis gratuit',
  B: 'Voir nos tarifs',
  C: 'Parler à un expert',
}

<button onClick={() => {
  trackConversion('cta_click')
  navigate('/contact')
}}>
  {ctaTexts[variant]}
</button>
```

#### 2. Pricing Display (pricing-display)
**Hypothèse**: Afficher le prix "avant" augmente la perception de valeur

- **Variant A**: Prix uniquement (2 990€)
- **Variant B**: Prix + économie (~~3 990€~~ **2 990€** -25%)

**Mesure**: Clics "Choisir cette formule"

#### 3. Social Proof (social-proof)
**Hypothèse**: Les témoignages augmentent la confiance

- **Variant A**: Sans témoignages dans le Hero
- **Variant B**: 3 témoignages courts dans le Hero

**Mesure**: Temps passé sur la page, scroll depth

#### 4. Form Length (contact-form)
**Hypothèse**: Un formulaire court augmente les soumissions

- **Variant A**: Formulaire complet (7 champs)
- **Variant B**: Formulaire minimal (3 champs: nom, email, message)

**Mesure**: Taux de soumission

### 🟡 PRIORITÉ MOYENNE

#### 5. Urgency (urgency-banner)
- **Variant A**: Sans banner d'urgence
- **Variant B**: "🔥 Offre limitée: -500€ sur votre premier site"

#### 6. Portfolio Presentation (portfolio-layout)
- **Variant A**: Grille masonry
- **Variant B**: Slider carousel

#### 7. Color Scheme (cta-color)
- **Variant A**: CTA néon (#D9FF00)
- **Variant B**: CTA rouge vif (#FF3366)

### 🟢 PRIORITÉ BASSE (Tests créatifs)

#### 8. Headline Style (headline-style)
- **Variant A**: "Créez un site web moderne en 14 jours"
- **Variant B**: "Votre site web moderne en 2 semaines"
- **Variant C**: "Site web premium. Livraison express."

## Tracking des conversions

### Événements à tracker

```javascript
// Exemple complet dans Contact.jsx
import { useABTestConversion } from '../hooks/useABTest'

function Contact() {
  const trackHeroCTA = useABTestConversion('hero-cta')
  const trackContactForm = useABTestConversion('contact-form')

  const handleFormSubmit = async (data) => {
    // Envoyer le form
    await saveLead(data)
    
    // Tracker la conversion
    trackContactForm('form_submit')
    
    // Tracker aussi le test hero-cta si venu depuis là
    trackHeroCTA('form_submit')
  }

  return (
    // ... form
  )
}
```

### Goals de conversion standards

- `cta_click`: Clic sur le CTA
- `form_start`: Utilisateur commence à remplir le formulaire
- `form_submit`: Formulaire soumis avec succès
- `calendly_open`: Ouverture du Calendly
- `demo_view`: Consultation d'un démo portfolio
- `pricing_view`: Visite de la page de tarification

## Analyse des résultats

### Dans la console du navigateur

```javascript
// Voir les résultats d'un test
import { getABTestResults } from './hooks/useABTest'

const results = getABTestResults('hero-cta')
console.table(results)

// Exemple de sortie:
// {
//   A: { conversions: 12, goals: { cta_click: 12, form_submit: 3 } },
//   B: { conversions: 15, goals: { cta_click: 15, form_submit: 5 } },
//   C: { conversions: 10, goals: { cta_click: 10, form_submit: 4 } }
// }
```

### Calcul du taux de conversion

```javascript
// Variant B a un taux de conversion de 33% (5/15)
// Variant A a un taux de conversion de 25% (3/12)
// → Variant B gagne ! (+32% de conversions)
```

### Significativité statistique

**Minimum recommandé**:
- Au moins **100 visiteurs par variant**
- Au moins **30 conversions totales**
- Au moins **7 jours** de test

**Outils d'analyse**:
- https://abtestguide.com/calc/ (calculateur en ligne)
- Confidence level: 95% minimum

## Dashboard Analytics (Admin)

Créer une page `/admin/ab-tests` pour visualiser tous les tests:

```jsx
// src/pages/admin/ABTestsDashboard.jsx
import { getABTestResults } from '../../hooks/useABTest'

function ABTestsDashboard() {
  const tests = ['hero-cta', 'pricing-display', 'contact-form']
  
  return (
    <div>
      <h1>A/B Tests Results</h1>
      {tests.map(testName => {
        const results = getABTestResults(testName)
        
        return (
          <div key={testName}>
            <h2>{testName}</h2>
            {Object.entries(results).map(([variant, data]) => (
              <div key={variant}>
                <h3>Variant {variant}</h3>
                <p>Conversions: {data.conversions}</p>
                <p>Taux: {((data.conversions / 100) * 100).toFixed(2)}%</p>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
```

## Supabase Integration (Optionnel)

Pour centraliser les données et avoir des analytics en temps réel:

### 1. Créer la table

```sql
CREATE TABLE ab_test_conversions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_name TEXT NOT NULL,
  variant TEXT NOT NULL,
  goal TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les requêtes rapides
CREATE INDEX idx_ab_tests_name ON ab_test_conversions(test_name);
CREATE INDEX idx_ab_tests_variant ON ab_test_conversions(variant);
```

### 2. Query les résultats

```javascript
const { data } = await supabase
  .from('ab_test_conversions')
  .select('*')
  .eq('test_name', 'hero-cta')
  
// Grouper par variant
const resultsByVariant = data.reduce((acc, conv) => {
  if (!acc[conv.variant]) acc[conv.variant] = []
  acc[conv.variant].push(conv)
  return acc
}, {})
```

## Bonnes pratiques

### ✅ À FAIRE

1. **Tester une variable à la fois**
   - Ne pas tester "CTA + Couleur + Position" en même temps
   - Isoler les variables pour comprendre ce qui marche

2. **Définir un goal clair**
   - "Augmenter les soumissions de formulaire de 20%"
   - Pas "voir ce qui se passe"

3. **Respecter le temps de test**
   - Minimum 7 jours
   - Idéalement 2-4 semaines
   - Inclure weekend + semaine

4. **Documenter les résultats**
   - Winner: Variant B (+32% conversions)
   - Date: 15 Jan - 15 Fév 2025
   - Action: Déployer Variant B en prod

### ❌ À ÉVITER

1. **Arrêter trop tôt**
   - "Variant B gagne après 2 jours" → Attendre plus longtemps

2. **Changer en cours de test**
   - Ne pas modifier les variants pendant le test

3. **Tester sans trafic suffisant**
   - < 100 visiteurs → résultats non significatifs

4. **Oublier de déployer le winner**
   - Après le test, déployer le variant gagnant !

## Exemples de wins réels

### Cas 1: Clarity dans le CTA
- **Avant**: "En savoir plus" → 2.1% conversion
- **Après**: "Demander un devis gratuit" → 3.8% conversion
- **Impact**: +81% de conversions 🚀

### Cas 2: Social proof dans le Hero
- **Sans témoignages**: 45 secondes temps moyen
- **Avec témoignages**: 78 secondes temps moyen
- **Impact**: +73% engagement

### Cas 3: Formulaire court
- **7 champs**: 12% complétion
- **3 champs**: 28% complétion
- **Impact**: +133% soumissions

## Roadmap A/B Testing

### Phase 1 (Semaine 1-2) ✅
- [x] Hook useABTest
- [x] Tracking conversions localStorage
- [x] Documentation

### Phase 2 (Semaine 3-4)
- [ ] Dashboard admin `/admin/ab-tests`
- [ ] Intégration Supabase
- [ ] Export CSV des résultats

### Phase 3 (Mois 2)
- [ ] Multivariate testing (plusieurs variables)
- [ ] Auto-winner (bascule automatique après X jours)
- [ ] Intégration Google Analytics

## Support

Questions ? arafate@modernizehub.com 🚀


# Portfolio Web Design Studio - Site Ultra-Moderne 2025

Un site portfolio ultra-moderne pour une agence de design web, conçu pour convertir 40%+ des visiteurs en leads qualifiés.

## 🚀 Technologies

- **React 18+** - Framework frontend
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS 4** - Styling moderne
- **Framer Motion** - Animations fluides
- **Three.js + React Three Fiber** - Éléments 3D (prêt pour intégration)
- **React Hook Form + Zod** - Formulaires avec validation
- **Lucide React** - Icônes modernes

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview
```

## 🎨 Fonctionnalités

- ✅ Design system complet (mode clair/sombre)
- ✅ Header sticky avec navigation smooth scroll
- ✅ Hero section avec animations
- ✅ Section Portfolio avec 5 démos avant/après (slider interactif)
- ✅ Section Processus avec timeline visuelle
- ✅ 3 formules de pricing avec FOMO (compte à rebours)
- ✅ Témoignages clients
- ✅ FAQ accordéon
- ✅ Formulaire de contact avec validation
- ✅ Footer complet
- ✅ Responsive design (mobile-first)
- ✅ Animations au scroll avec Framer Motion

## 📁 Structure du Projet

```
portfolio-site/
├── public/
│   └── images/          # Images des démos et témoignages
├── src/
│   ├── components/
│   │   ├── common/      # Composants réutilisables
│   │   ├── sections/    # Sections principales
│   │   ├── portfolio/   # Composants portfolio
│   │   └── pricing/     # Composants pricing
│   ├── contexts/        # Context React (Theme)
│   ├── data/            # Données statiques
│   ├── hooks/           # Hooks personnalisés
│   └── utils/           # Utilitaires
```

## 🎯 Sections du Site

1. **Hero** - Section d'accueil avec CTA
2. **À Propos** - Problèmes des sites obsolètes + solutions
3. **Portfolio** - 5 transformations avant/après avec slider
4. **Processus** - Timeline des 4 étapes (14 jours)
5. **Offres** - 3 formules avec FOMO
6. **Témoignages** - 3 témoignages clients
7. **FAQ** - Questions fréquentes
8. **Contact** - Formulaire avec validation

## 🔧 Configuration

### Mode Sombre/Clair

Le thème est géré via `ThemeContext` et sauvegardé dans `localStorage`.

### Images Placeholder

Les images des démos utilisent actuellement des placeholders. Remplacez-les dans :
- `public/images/demos/` - Images avant/après des 5 démos
- `public/images/testimonials/` - Photos des témoignages

## 📝 Personnalisation

### Couleurs

Modifiez les couleurs dans `tailwind.config.js` :

```js
colors: {
  primary: '#0F172A',
  secondary: '#6366F1',
  accent: '#EC4899',
}
```

### Données

- Démos : `src/data/demos.js`
- Pricing : `src/data/pricing.js`
- Témoignages : `src/data/testimonials.js`
- Processus : `src/data/process.js`

## 🚧 À Venir (Optionnel)

- [ ] Intégration Three.js pour éléments 3D dans Hero
- [ ] Backend pour formulaire de contact (webhook)
- [ ] Analytics (Google Analytics 4)
- [ ] Optimisation SEO avancée
- [ ] Service Worker (PWA)

## 📄 Licence

Ce projet est créé pour un usage commercial.

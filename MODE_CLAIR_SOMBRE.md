# 🌓 Mode Clair/Sombre - Documentation

## ✅ Implémentation

Le système de mode clair/sombre a été entièrement implémenté avec un toggle dans le Header.

---

## 🎨 Couleurs

### Mode Sombre (par défaut)
- **Background:** `#0F1116` (noir profond)
- **Surface:** `#161B22` (gris très foncé)
- **Text Main:** `#FFFFFF` (blanc)
- **Text Muted:** `#D9FF00` (néon vert)
- **Primary:** `#D9FF00` (néon vert)
- **Border:** `rgba(255, 255, 255, 0.1)`

### Mode Clair
- **Background:** `#FFFFFF` (blanc)
- **Surface:** `#F8F9FA` (gris très clair)
- **Text Main:** `#0F1116` (noir)
- **Text Muted:** `#6C757D` (gris)
- **Primary:** `#D9FF00` (néon vert - conservé)
- **Border:** `rgba(0, 0, 0, 0.1)`

---

## 🔧 Fonctionnalités

### ThemeToggle Component
- **Localisation:** Header (navigation)
- **Animation:** Rotation fluide lors du changement
- **Icônes:** Sun (mode clair) / Moon (mode sombre)
- **Sauvegarde:** Préférence stockée dans `localStorage`

### ThemeContext
- Détection de la préférence système au premier chargement
- Sauvegarde dans `localStorage`
- Synchronisation avec l'attribut `data-theme` sur `<html>`
- Transition fluide entre les modes (0.3s)

---

## 📝 Utilisation

### Dans les composants

```jsx
import { useTheme } from '../contexts/ThemeContext'

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className={`bg-background text-text-main ${
      theme === 'light' ? 'light-classes' : 'dark-classes'
    }`}>
      {/* Contenu */}
    </div>
  )
}
```

### Variables CSS

Les variables CSS sont automatiquement mises à jour :

```css
body {
  background-color: var(--color-background);
  color: var(--color-text-main);
}
```

---

## 🎯 Classes Tailwind

### Classes conditionnelles

Utilisez les classes Tailwind avec les sélecteurs de thème :

```jsx
<div className="bg-white dark:bg-[#0F1116] text-black dark:text-white">
  Contenu qui s'adapte au thème
</div>
```

### Classes via data-theme

Les classes utilisent l'attribut `data-theme` :

```css
[data-theme="light"] .my-class {
  /* Styles mode clair */
}

[data-theme="dark"] .my-class {
  /* Styles mode sombre */
}
```

---

## 🔄 Transition

Toutes les transitions sont fluides (0.3s) pour une expérience utilisateur optimale.

---

## 💾 Persistance

La préférence est sauvegardée dans `localStorage` sous la clé `theme`.

**Valeurs possibles:**
- `'light'` - Mode clair
- `'dark'` - Mode sombre

---

## 🎨 Personnalisation

Pour modifier les couleurs, éditez :

1. **Variables CSS:** `src/index.css` (section `@layer base`)
2. **Config Tailwind:** `tailwind.config.js` (section `colors`)

---

## 📱 Compatible

- ✅ Desktop
- ✅ Mobile
- ✅ Tablette
- ✅ Toutes les sections du site

---

## 🚀 Prochaines Améliorations Possibles

- [ ] Mode automatique (suit la préférence système)
- [ ] Animation de transition personnalisée
- [ ] Thèmes supplémentaires (optionnel)



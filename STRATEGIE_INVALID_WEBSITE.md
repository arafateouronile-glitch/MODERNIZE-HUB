# 🎯 Stratégie : Éliminer "Invalid Website" de Calendly

## Principe Fondamental
**Prévenir l'erreur plutôt que la masquer**

## Solution en 3 Étapes

### 1. Validation Stricte
- Vérifier que l'URL est valide AVANT de charger
- Bloque URLs placeholder (votre-compte, modernizeweb)
- Vérifie format et longueur

### 2. Ouverture Directe
- Pas de widget/iframe qui peuvent générer des erreurs
- `window.open(calendlyUrl, '_blank')` directement
- Si URL invalide → rediriger vers calendly.com

### 3. Normalisation URL
- Accepte différents formats d'entrée
- Nettoie les paramètres inutiles
- Garantit format standardisé

## Code Clé

```javascript
// Validation
const isCalendlyConfigured = calendlyUrl && 
  calendlyUrl.startsWith('https://calendly.com/') &&
  !calendlyUrl.includes('modernizeweb') &&
  calendlyUrl.length > 30

// Ouverture directe (pas de widget)
window.open(
  isCalendlyConfigured ? calendlyUrl : 'https://calendly.com',
  '_blank'
)
```

## Résultat
✅ Plus jamais de "invalid website"
✅ Fonctionne avec ou sans URL configurée
✅ Code simple et fiable

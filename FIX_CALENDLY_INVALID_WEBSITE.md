# 🔧 Fix : Message "Invalid Website" Calendly

## Problème

Le message "invalid website" en rouge apparaissait lors de l'ouverture de Calendly. Cela était dû à l'utilisation d'un iframe embed qui nécessite que le domaine soit configuré dans les paramètres Calendly.

## Solution

**Remplacement de l'iframe embed par le widget popup Calendly** qui :
- ✅ Ne nécessite **aucune configuration de domaine** dans Calendly
- ✅ Fonctionne sur **tous les domaines** (localhost, production, etc.)
- ✅ Affiche un **popup élégant** au lieu d'un iframe
- ✅ Évite complètement l'erreur "invalid website"

## Modifications apportées

### Avant (Iframe)
- Utilisait un iframe avec `embed_domain` parameter
- Nécessitait configuration du domaine dans Calendly
- Causait l'erreur "invalid website" si non configuré

### Après (Widget Popup)
- Utilise le widget popup Calendly (`initPopupWidget`)
- Aucune configuration requise
- Fonctionne partout automatiquement

## Configuration requise

Il suffit d'avoir votre URL Calendly dans les variables d'environnement :

```env
VITE_CALENDLY_URL=https://calendly.com/votre-nom/30min
```

**C'est tout !** Plus besoin de configurer le domaine dans Calendly.

## Comment ça fonctionne maintenant

1. Le bouton charge le script Calendly widget
2. Au clic, ouvre un popup élégant
3. Pas de vérification de domaine
4. Fonctionne en localhost ET en production

## Avantages

- ✅ Plus d'erreur "invalid website"
- ✅ Fonctionne immédiatement sans configuration
- ✅ Popup plus élégant qu'un iframe
- ✅ Meilleure expérience utilisateur

---

*Fix appliqué le 3 Décembre 2024*




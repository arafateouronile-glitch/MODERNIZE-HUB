# ✅ Configuration URL Calendly Valide

## URL Calendly à Utiliser

**URL valide** : `https://calendly.com/contact-modernizehub/30min`

Cette URL a été vérifiée et fonctionne correctement.

## Configuration

### Étape 1 : Ajouter dans `.env.local`

Ouvrez le fichier `.env.local` à la racine du projet et ajoutez :

```env
VITE_CALENDLY_URL=https://calendly.com/contact-modernizehub/30min
```

### Étape 2 : Redémarrer le serveur

```bash
# Arrêter le serveur (Ctrl+C ou Cmd+C)
# Puis relancer
npm run dev
```

### Étape 3 : Tester

1. Ouvrez http://localhost:5173
2. Cliquez sur un bouton "Réserver un Appel Gratuit"
3. Le popup Calendly devrait s'ouvrir sans erreur "invalid website"

## Vérification de la Validation

✅ L'URL `https://calendly.com/contact-modernizehub/30min` :
- Commence par `https://calendly.com/` ✓
- Ne contient PAS "modernizeweb" (l'ancienne URL invalide) ✓
- Longueur > 30 caractères (47 caractères) ✓
- Format valide : 5 parties dans l'URL ✓

## Résultat Attendu

Une fois configurée correctement :
- ✅ Plus d'erreur "invalid website"
- ✅ Le widget popup Calendly fonctionne
- ✅ Fonctionne en localhost ET en production
- ✅ Aucun iframe problématique

---

**Important** : Après avoir ajouté la variable dans `.env.local`, **redémarrez obligatoirement** le serveur de développement pour que la nouvelle valeur soit prise en compte.

*Configuration créée le 3 Décembre 2024*




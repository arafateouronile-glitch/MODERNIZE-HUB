# 📅 Configuration Calendly - URL Valide

## URL Calendly Valide

**URL fournie** : `https://calendly.com/contact-modernizehub/30min`

Cette URL est **valide** et fonctionnelle.

## Configuration

### 1. Ajouter dans `.env.local`

Ajoutez cette ligne dans votre fichier `.env.local` à la racine du projet :

```env
VITE_CALENDLY_URL=https://calendly.com/contact-modernizehub/30min
```

### 2. Redémarrer le serveur

Après avoir ajouté la variable d'environnement :

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer
npm run dev
```

### 3. Vérification

Une fois configurée, le bouton Calendly :
- ✅ Utilisera le widget popup Calendly
- ✅ Plus d'erreur "invalid website"
- ✅ Fonctionne en localhost ET en production

## Validation de l'URL

L'URL `https://calendly.com/contact-modernizehub/30min` :
- ✅ Commence par `https://calendly.com/`
- ✅ Format valide : `https://calendly.com/compte/type`
- ✅ Longueur > 30 caractères
- ✅ 5 parties dans l'URL (https://calendly.com/contact-modernizehub/30min)

## Important

⚠️ **Ne pas utiliser l'ancienne URL invalide** :
- ❌ `calendly.com/modernizeweb/30min` (404)
- ✅ `calendly.com/contact-modernizehub/30min` (Valide)

---

*Configuration créée le 3 Décembre 2024*




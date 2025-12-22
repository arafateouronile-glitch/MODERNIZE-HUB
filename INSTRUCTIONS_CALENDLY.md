# 📋 Instructions pour Résoudre Calendly

## Problème Actuel

- ❌ URL dans `.env.local` : `https://calendly.com/modernizeweb/30min` (INVALIDE - 404)
- ❌ Message "invalid website" apparaît
- ❌ Erreur 404 quand on clique sur le bouton

## Solutions

### Solution 1 : Supprimer l'URL Invalide (Recommandé si pas d'URL valide)

Dans votre fichier `.env.local`, **supprimez ou commentez** la ligne :
```env
# VITE_CALENDLY_URL=https://calendly.com/modernizeweb/30min
```

Résultat : Le bouton ouvrira directement `https://calendly.com` sans erreur.

### Solution 2 : Créer une Vraie URL Calendly

1. **Créer un compte Calendly** (si vous n'en avez pas) :
   - Allez sur https://calendly.com
   - Créez un compte gratuit

2. **Créer un événement** :
   - Connectez-vous à votre compte
   - Cliquez sur "Create" → "Event type"
   - Nommez-le (ex: "Consultation 30min")
   - Configurez la durée (30 minutes)
   - Activez l'événement

3. **Copier l'URL** :
   - Une fois créé, Calendly vous donnera une URL comme :
   - `https://calendly.com/votre-nom/consultation-30min`

4. **Mettre à jour `.env.local`** :
   ```env
   VITE_CALENDLY_URL=https://calendly.com/votre-nom/consultation-30min
   ```

5. **Redémarrer le serveur** :
   ```bash
   # Arrêter (Ctrl+C)
   # Relancer
   npm run dev
   ```

### Solution 3 : Utiliser l'URL Contact-Modernizehub

Si vous avez déjà créé l'URL `contact-modernizehub/30min`, mettez dans `.env.local` :
```env
VITE_CALENDLY_URL=https://calendly.com/contact-modernizehub/30min
```

⚠️ **Important** : Vérifiez d'abord que cette URL fonctionne en l'ouvrant dans votre navigateur !

## Vérification

Pour vérifier si une URL Calendly est valide :
1. Ouvrez l'URL dans votre navigateur
2. ✅ Si vous voyez la page de réservation → URL valide
3. ❌ Si vous voyez "404 Page not found" → URL invalide

## État Actuel

✅ Le code est maintenant protégé :
- Si URL invalide → Ouvre `calendly.com` directement
- Plus de chargement du widget si URL invalide
- Plus d'erreur 404

⚠️ **Mais** le message "invalid website" peut encore apparaître si le widget Calendly tente de se charger ailleurs. Pour l'éliminer complètement, utilisez l'une des solutions ci-dessus.

---

*Mis à jour le 3 Décembre 2024*




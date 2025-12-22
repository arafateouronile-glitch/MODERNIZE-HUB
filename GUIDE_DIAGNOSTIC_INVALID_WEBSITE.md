# 🔍 Guide de Diagnostic : "Invalid Website"

## ✅ Solutions Déjà Appliquées

1. **CalendlyButton modifié** : Ouverture directe (pas de widget)
2. **Validation stricte** : Bloque URLs invalides
3. **Scripts de masquage** : Actifs en continu
4. **Règles CSS** : Masquent les iframes Calendly

## 🔍 Diagnostic Étape par Étape

### 1. Identifier la Source du Message

**Ouvrez la console (F12)** et suivez ces étapes :

1. **Inspecter l'élément** :
   - Clic droit sur "invalid website" → Inspecter
   - Notez l'élément HTML (div, span, iframe, etc.)
   - Copiez les classes CSS et IDs

2. **Vérifier l'origine** :
   - Dans l'onglet **Elements**, voyez si c'est dans un `<iframe>`
   - Regardez l'onglet **Network** (filtrez "calendly")
   - Vérifiez les requêtes Calendly qui échouent

3. **Vérifier les variables d'environnement** :
   ```bash
   # Vérifiez votre fichier .env.local
   cat .env.local | grep CALENDLY
   ```
   
   Si vous voyez `modernizeweb` ou une URL invalide, c'est la source du problème.

### 2. Solutions selon la Source

#### Source A : Iframe Calendly
Si le message vient d'un iframe :
- Vérifiez `Contact.jsx` ligne 355+ (section Calendly)
- Supprimez tout iframe Calendly restant
- Utilisez uniquement `CalendlyButton` qui ouvre dans un nouvel onglet

#### Source B : Variable d'environnement invalide
Si `VITE_CALENDLY_URL` contient une URL invalide :
```bash
# Option 1 : Supprimer la variable (le bouton ouvrira calendly.com)
# Supprimez la ligne VITE_CALENDLY_URL de .env.local

# Option 2 : Utiliser une URL valide
VITE_CALENDLY_URL=https://calendly.com/votre-nom-reel/consultation
```

#### Source C : Extension de navigateur
- Testez en **mode navigation privée**
- Désactivez les extensions une par une
- Vérifiez les bloqueurs de publicité (AdBlock, etc.)

#### Source D : Cache du navigateur
- Videz le cache (Ctrl+Shift+Del)
- Rechargez avec Ctrl+Shift+R (ou Cmd+Shift+R)
- Testez dans un autre navigateur

### 3. Solution Définitive

Si le message vient vraiment de Calendly, ajoutez dans la console :

```javascript
// Exécutez cette commande dans la console
setInterval(() => {
  document.querySelectorAll('*').forEach(el => {
    if (el.textContent?.toLowerCase().includes('invalid website')) {
      el.style.display = 'none';
      el.remove();
    }
  });
  document.querySelectorAll('iframe[src*="calendly"]').forEach(iframe => {
    if (!iframe.src.includes('contact-modernizehub')) {
      iframe.remove();
    }
  });
}, 100);
```

## 📝 Informations à Fournir

Si le problème persiste, fournissez :

1. **Où apparaît le message** ?
   - En bas de page ?
   - Dans un popup ?
   - Dans la console ?

2. **Quand apparaît-il** ?
   - Au chargement ?
   - Au clic sur le bouton Calendly ?
   - Après quelques secondes ?

3. **Élément HTML** :
   - Balise HTML (div, span, etc.)
   - Classes CSS
   - ID si présent
   - S'il est dans un iframe

4. **Console du navigateur** :
   - Erreurs JavaScript
   - Requêtes Calendly qui échouent

---

*Guide créé le 3 Décembre 2024*



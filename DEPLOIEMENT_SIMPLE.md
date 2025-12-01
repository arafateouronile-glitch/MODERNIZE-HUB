# 🚀 Déploiement Rapide - Modernize Hub

## 🎯 Méthode la Plus Simple : Vercel CLI (5 minutes)

### Étape 1 : Installer Vercel CLI

```bash
npm install -g vercel
```

### Étape 2 : Se connecter à Vercel

```bash
cd portfolio-site
vercel login
```

Cela ouvrira votre navigateur pour vous connecter.

### Étape 3 : Déployer

```bash
vercel
```

Suivez les instructions :
- ✅ **Set up and deploy?** → `Y`
- ✅ **Which scope?** → Choisir votre compte
- ✅ **Link to existing project?** → `N`
- ✅ **What's your project's name?** → `modernize-hub`
- ✅ **In which directory is your code located?** → `./`
- ✅ **Want to override the settings?** → `N`

### Étape 4 : Déployer en production

```bash
vercel --prod
```

✅ **C'est fait !** Votre site est maintenant en ligne sur `https://modernize-hub.vercel.app`

### Étape 5 : Ajouter les variables d'environnement

1. Aller sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionner votre projet
3. **Settings** → **Environment Variables**
4. Ajouter :

```
VITE_SITE_URL=https://modernizehub.com
VITE_RESEND_API_KEY=votre_cle_resend (si configuré)
VITE_SUPABASE_URL=votre_url_supabase (si configuré)
VITE_SUPABASE_ANON_KEY=votre_cle_supabase (si configuré)
VITE_CALENDLY_URL=votre_url_calendly (si configuré)
```

5. **Redeploy** le dernier déploiement

### Étape 6 : Configurer le domaine

1. Dans Vercel Dashboard : **Settings** → **Domains**
2. Ajouter : `modernizehub.com`
3. Suivre les instructions DNS
4. Attendre 5-15 minutes

---

## 🔄 Redéploiement après modifications

```bash
cd portfolio-site
npm run build
vercel --prod
```

Ou utiliser l'interface web Vercel.

---

## 📝 Alternative : Avec GitHub (Recommandé pour les mises à jour automatiques)

Si vous voulez des déploiements automatiques à chaque push :

### 1. Initialiser Git

```bash
cd portfolio-site
git init
git add .
git commit -m "Initial commit - Modernize Hub"
```

### 2. Créer un dépôt GitHub

1. Aller sur [github.com/new](https://github.com/new)
2. Créer un nouveau dépôt : `modernize-hub`
3. **Ne pas** initialiser avec README

### 3. Pousser le code

```bash
git remote add origin https://github.com/VOTRE-USERNAME/modernize-hub.git
git branch -M main
git push -u origin main
```

### 4. Importer dans Vercel

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository**
3. Sélectionner votre dépôt
4. Cliquer sur **Deploy**

Désormais, chaque push sur GitHub déclenchera automatiquement un déploiement ! 🎉

---

## ✅ Checklist Finale

- [ ] Site déployé et accessible
- [ ] Variables d'environnement configurées
- [ ] Domaine personnalisé configuré
- [ ] HTTPS activé
- [ ] Formulaire de contact testé
- [ ] Mode clair/sombre fonctionne

---

**🎉 Votre site Modernize Hub est maintenant en ligne !**


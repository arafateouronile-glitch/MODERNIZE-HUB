# 🚀 Guide de Déploiement Rapide - Modernize Hub

Guide étape par étape pour déployer votre site en 10 minutes.

---

## ✅ Checklist de Préparation

Avant de commencer, vérifiez :

- [x] ✅ Build réussi (`npm run build`)
- [x] ✅ Tous les fichiers sont à jour avec "Modernize Hub"
- [ ] ⏳ Code poussé sur GitHub (recommandé)
- [ ] ⏳ Compte Vercel créé
- [ ] ⏳ Variables d'environnement prêtes

---

## 🎯 Option 1 : Déploiement sur Vercel (Recommandé - 5 min)

### Étape 1 : Créer un compte Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur **"Sign Up"**
3. Se connecter avec **GitHub** (recommandé) ou email

### Étape 2 : Importer le projet

1. Dans le dashboard Vercel, cliquer sur **"Add New"** → **"Project"**
2. Si vous avez poussé sur GitHub :
   - Cliquer sur **"Import Git Repository"**
   - Sélectionner votre dépôt
   - Cliquer sur **"Import"**
3. Si vous n'avez pas de dépôt GitHub :
   - Cliquer sur **"Browse"** ou glisser-déposer le dossier `portfolio-site`
   - Vercel détectera automatiquement la configuration

### Étape 3 : Configurer le projet

Vercel détectera automatiquement :
- ✅ Framework : Vite
- ✅ Build Command : `npm run build`
- ✅ Output Directory : `dist`
- ✅ Install Command : `npm install`

**Cliquer sur "Deploy"** pour le premier déploiement.

### Étape 4 : Ajouter les variables d'environnement

Après le premier déploiement :

1. Aller dans **Settings** → **Environment Variables**
2. Ajouter les variables suivantes :

```env
# SUPABASE (si configuré)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon

# RESEND (si configuré)
VITE_RESEND_API_KEY=re_votre_cle_resend
VITE_RESEND_FROM_EMAIL=noreply@modernizehub.com

# CALENDLY (si configuré)
VITE_CALENDLY_URL=https://calendly.com/votre-nom/30min

# URL DU SITE
VITE_SITE_URL=https://modernizehub.com
```

3. Sélectionner **"Production"**, **"Preview"**, et **"Development"**
4. Cliquer sur **"Save"**
5. Aller dans **Deployments** → Cliquer sur les 3 points → **"Redeploy"**

### Étape 5 : Configurer le domaine personnalisé

1. Aller dans **Settings** → **Domains**
2. Ajouter votre domaine : `modernizehub.com`
3. Vercel vous donnera des enregistrements DNS à configurer :

**Chez votre registrar (ex: Namecheap, GoDaddy) :**

```
Type: A
Name: @
Value: 76.76.21.21
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Attendre la vérification (5-15 minutes)
5. HTTPS sera activé automatiquement

### ✅ Résultat

Votre site sera accessible sur :
- 🌐 **Production** : `https://modernizehub.com`
- 🔄 **Automatique** : Chaque push sur GitHub = nouveau déploiement

---

## 🎯 Option 2 : Déploiement via Vercel CLI (Alternative)

### Installation

```bash
npm i -g vercel
```

### Déploiement

```bash
cd portfolio-site
vercel
```

Suivre les instructions interactives.

---

## 🎯 Option 3 : Déploiement sur Netlify

### Étape 1 : Créer un compte Netlify

1. Aller sur [netlify.com](https://netlify.com)
2. Se connecter avec GitHub

### Étape 2 : Importer le projet

1. Cliquer sur **"Add new site"** → **"Import an existing project"**
2. Sélectionner votre dépôt GitHub
3. Configurer :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
4. Cliquer sur **"Deploy site"**

### Étape 3 : Variables d'environnement

1. **Site settings** → **Environment variables**
2. Ajouter les mêmes variables que pour Vercel

### Étape 4 : Domaine personnalisé

1. **Domain settings** → **Add custom domain**
2. Suivre les instructions DNS

---

## 🔧 Configuration des Services Externes

### Supabase (Base de données)

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter la migration : `supabase/migrations/001_initial_schema.sql`
3. Récupérer les clés dans **Settings** → **API**

### Resend (Emails)

1. Créer un compte sur [resend.com](https://resend.com)
2. Récupérer la clé API
3. (Optionnel) Vérifier le domaine pour `noreply@modernizehub.com`

### Calendly (Rendez-vous)

1. Créer un compte sur [calendly.com](https://calendly.com)
2. Créer un type de rendez-vous
3. Copier l'URL et l'ajouter dans les variables d'environnement

---

## ✅ Checklist Post-Déploiement

Après le déploiement, vérifier :

- [ ] Le site charge correctement
- [ ] Tous les liens fonctionnent
- [ ] Le formulaire de contact fonctionne
- [ ] Le mode clair/sombre fonctionne
- [ ] Les images se chargent
- [ ] Le site est responsive (mobile/desktop)
- [ ] HTTPS est activé
- [ ] Le domaine personnalisé fonctionne

---

## 🐛 Dépannage

### Erreur de build

```bash
# Vérifier localement
npm run build
```

### Variables d'environnement non prises en compte

- Vérifier que les variables commencent par `VITE_`
- Redéployer après avoir ajouté les variables

### Domaine ne fonctionne pas

- Vérifier les DNS (peut prendre jusqu'à 48h)
- Vérifier que le domaine pointe vers Vercel/Netlify

---

## 📞 Support

- Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)
- Documentation Netlify : [docs.netlify.com](https://docs.netlify.com)

---

**✨ Votre site Modernize Hub est maintenant en ligne ! 🎉**


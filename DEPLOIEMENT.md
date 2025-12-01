# 🚀 Guide de Déploiement - Modernize Hub

Guide complet pour déployer votre site portfolio en production.

---

## 📋 Table des Matières

1. [Préparation avant déploiement](#1-préparation-avant-déploiement)
2. [Choix de la plateforme](#2-choix-de-la-plateforme)
3. [Configuration des services externes](#3-configuration-des-services-externes)
4. [Déploiement sur Vercel](#4-déploiement-sur-vercel-recommandé)
5. [Déploiement sur Netlify](#5-déploiement-sur-netlify)
6. [Configuration du domaine](#6-configuration-du-domaine)
7. [Tests post-déploiement](#7-tests-post-déploiement)
8. [Checklist finale](#8-checklist-finale)

---

## 1. Préparation avant déploiement

### 1.1 Tests locaux

```bash
# Installer les dépendances
npm install

# Lancer les tests
npm run test

# Vérifier le build de production
npm run build

# Prévisualiser le build
npm run preview
```

### 1.2 Optimisations

✅ **Vérifier avant de déployer :**

- [ ] Build sans erreurs (`npm run build`)
- [ ] Toutes les images sont optimisées
- [ ] Les variables d'environnement sont configurées
- [ ] Les tests passent
- [ ] Le site fonctionne en mode production (`npm run preview`)

### 1.3 Fichiers à vérifier

- [ ] `.env.local` - Variables d'environnement (NE PAS COMMIT)
- [ ] `package.json` - Scripts de build corrects
- [ ] `vite.config.js` - Configuration de production
- [ ] `index.html` - Meta tags à jour
- [ ] `public/robots.txt` - Configuration SEO
- [ ] `public/sitemap.xml` - Sitemap à jour

---

## 2. Choix de la plateforme

### Recommandations

| Plateforme | Avantages | Idéal pour |
|------------|-----------|------------|
| **Vercel** ⭐ | Déploiement instantané, CDN global, HTTPS automatique | **Recommandé** |
| **Netlify** | Similaire à Vercel, bon support | Alternative |
| **Cloudflare Pages** | CDN puissant, gratuit | Performances |
| **GitHub Pages** | Gratuit, simple | Projets simples |

**Recommandation : Vercel** (meilleur pour React + Vite)

---

## 3. Configuration des services externes

### 3.1 Supabase (Base de données)

#### Étape 1 : Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un compte / Se connecter
3. Cliquer sur **"New Project"**
4. Remplir les informations :
   - **Name** : `modernize-web-production`
   - **Database Password** : Générer un mot de passe fort
   - **Region** : Choisir la région la plus proche (Europe)

#### Étape 2 : Récupérer les clés API

1. Dans votre projet Supabase, aller dans **Settings** → **API**
2. Copier :
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon/public key** (clé publique)
   - **service_role key** (clé secrète - à garder privée)

#### Étape 3 : Configurer la base de données

1. Aller dans **SQL Editor**
2. Exécuter le script `supabase/migrations/001_initial_schema.sql`
3. Vérifier que les tables sont créées :
   - `leads`
   - `blog_posts`
   - `testimonials`
   - `users` (si auth activé)

#### Étape 4 : Configurer les RLS (Row Level Security)

1. Aller dans **Authentication** → **Policies**
2. Créer les politiques de sécurité pour chaque table
3. Pour l'admin, créer un utilisateur dans **Authentication** → **Users**

---

### 3.2 Resend (Emails)

#### Étape 1 : Créer un compte

1. Aller sur [resend.com](https://resend.com)
2. Créer un compte (gratuit jusqu'à 3000 emails/mois)
3. Vérifier votre email

#### Étape 2 : Récupérer la clé API

1. Aller dans **API Keys**
2. Créer une nouvelle clé API
3. Nommer la clé : `modernize-web-production`
4. **Copier la clé** (elle ne sera plus visible ensuite)

#### Étape 3 : Vérifier un domaine (optionnel mais recommandé)

1. Aller dans **Domains**
2. Ajouter votre domaine (ex: `modernizehub.com`)
3. Suivre les instructions pour ajouter les enregistrements DNS
4. Attendre la vérification (peut prendre quelques minutes)

---

### 3.3 Calendly (Rendez-vous)

1. Aller sur [calendly.com](https://calendly.com)
2. Créer votre calendrier de disponibilités
3. Récupérer l'URL de votre calendrier (ex: `https://calendly.com/votre-nom/30min`)
4. Cette URL sera utilisée dans le composant `CalendlyButton`

---

## 4. Déploiement sur Vercel (Recommandé)

### 4.1 Installation

```bash
# Installer Vercel CLI
npm install -g vercel
```

### 4.2 Méthode 1 : Déploiement via CLI

#### Étape 1 : Se connecter

```bash
cd portfolio-site
vercel login
```

#### Étape 2 : Déployer

```bash
# Premier déploiement (prévisualisation)
vercel

# Déploiement en production
vercel --prod
```

#### Étape 3 : Configurer les variables d'environnement

```bash
# Ajouter les variables d'environnement
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_RESEND_API_KEY production
```

### 4.3 Méthode 2 : Déploiement via GitHub (Recommandé)

#### Étape 1 : Préparer le repository

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter les fichiers
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Créer un repository sur GitHub
# Puis :
git remote add origin https://github.com/VOTRE-USERNAME/modernize-web.git
git branch -M main
git push -u origin main
```

#### Étape 2 : Connecter à Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur **"Add New Project"**
3. Importer votre repository GitHub
4. Configurer le projet :
   - **Framework Preset** : Vite
   - **Root Directory** : `./portfolio-site` (si le repo est à la racine)
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

#### Étape 3 : Ajouter les variables d'environnement

Dans Vercel, aller dans **Settings** → **Environment Variables** et ajouter :

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon
VITE_RESEND_API_KEY=re_votre_cle_resend
```

#### Étape 4 : Déployer

1. Cliquer sur **"Deploy"**
2. Attendre le déploiement (2-3 minutes)
3. Votre site sera accessible à l'URL : `https://votre-projet.vercel.app`

---

## 5. Déploiement sur Netlify

### 5.1 Méthode 1 : Drag & Drop

1. Aller sur [netlify.com](https://netlify.com)
2. Créer un compte / Se connecter
3. Dans le dashboard, glisser-déposer le dossier `dist` après `npm run build`

### 5.2 Méthode 2 : Via Git

1. Aller sur [netlify.com](https://netlify.com)
2. **New site from Git**
3. Connecter votre repository GitHub
4. Configurer :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
5. Ajouter les variables d'environnement dans **Site settings** → **Environment variables**
6. Déployer

---

## 6. Configuration du domaine

### 6.1 Ajouter un domaine personnalisé sur Vercel

1. Dans votre projet Vercel, aller dans **Settings** → **Domains**
2. Ajouter votre domaine : `modernizehub.com` et `www.modernizehub.com`
3. Suivre les instructions DNS

### 6.2 Configuration DNS

Ajouter ces enregistrements dans votre registrar (OVH, Gandi, etc.) :

```
Type    Name    Value
CNAME   www     cname.vercel-dns.com
A       @       76.76.21.21
```

**Pour Netlify :**
```
Type    Name    Value
CNAME   www     votre-site.netlify.app
A       @       75.2.60.5
```

### 6.3 Attendre la propagation DNS

- **Temps moyen** : 5 minutes à 24 heures
- Vérifier avec : [whatsmydns.net](https://whatsmydns.net)

### 6.4 Activer HTTPS

- **Vercel/Netlify** : HTTPS automatique via Let's Encrypt
- Attendre la vérification du domaine (5-10 minutes)

---

## 7. Tests post-déploiement

### 7.1 Tests fonctionnels

- [ ] Le site charge correctement
- [ ] Navigation entre les sections fonctionne
- [ ] Mode clair/sombre fonctionne
- [ ] Formulaire de contact fonctionne
- [ ] Les leads sont sauvegardés dans Supabase
- [ ] Les emails sont envoyés (vérifier Resend)
- [ ] Calendly s'ouvre correctement
- [ ] Blog s'affiche correctement
- [ ] Admin panel accessible

### 7.2 Tests de performance

```bash
# Installer Lighthouse CLI
npm install -g @lhci/cli

# Tester le site en production
lighthouse https://modernizehub.com --view
```

**Objectifs :**
- Performance : 90+
- Accessibility : 95+
- Best Practices : 95+
- SEO : 100

### 7.3 Tests sur différents appareils

- [ ] Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Mobile (iOS Safari, Android Chrome)
- [ ] Tablette
- [ ] Résolutions différentes (1920x1080, 1366x768, etc.)

---

## 8. Checklist finale

### Avant le déploiement

- [ ] Code testé localement
- [ ] Build de production réussi
- [ ] Variables d'environnement préparées
- [ ] Images optimisées
- [ ] Meta tags à jour dans `index.html`
- [ ] Sitemap et robots.txt à jour

### Configuration des services

- [ ] Supabase configuré avec les tables
- [ ] Clés API Supabase récupérées
- [ ] Resend configuré avec clé API
- [ ] Domaine vérifié dans Resend (optionnel)
- [ ] Calendly configuré avec URL

### Déploiement

- [ ] Site déployé sur Vercel/Netlify
- [ ] Variables d'environnement ajoutées
- [ ] Domaine personnalisé configuré
- [ ] HTTPS activé
- [ ] Redirection www → domaine principal

### Tests

- [ ] Toutes les fonctionnalités testées
- [ ] Formulaire de contact fonctionnel
- [ ] Admin panel accessible
- [ ] Emails reçus via Resend
- [ ] Performance Lighthouse > 90
- [ ] Tests sur mobile réussis

### Post-déploiement

- [ ] Analytics configuré (Google Analytics, etc.)
- [ ] Monitoring d'erreurs (Sentry, etc.)
- [ ] Backup de la base de données configuré
- [ ] Documentation mise à jour

---

## 🔧 Configuration avancée

### Variables d'environnement complètes

Créer un fichier `.env.production` (à ne PAS commiter) :

```env
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_ici
VITE_SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role_ici

# Resend
VITE_RESEND_API_KEY=re_votre_cle_resend_ici
VITE_RESEND_FROM_EMAIL=noreply@modernizehub.com

# Calendly
VITE_CALENDLY_URL=https://calendly.com/votre-nom/30min

# URL du site (pour les emails)
VITE_SITE_URL=https://modernizehub.com
```

### Configuration Vercel (vercel.json)

Créer `vercel.json` à la racine :

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 🚨 Dépannage

### Erreurs courantes

#### "Build failed"
- Vérifier que toutes les dépendances sont dans `package.json`
- Vérifier les variables d'environnement
- Consulter les logs dans Vercel/Netlify

#### "404 on routes"
- Vérifier la configuration des rewrites (SPA)
- Ajouter la redirection `/* → /index.html`

#### "Supabase connection failed"
- Vérifier les variables d'environnement
- Vérifier que les clés sont correctes
- Vérifier les RLS policies

#### "Resend emails not sending"
- Vérifier la clé API
- Vérifier que le domaine est vérifié (pour production)
- Consulter les logs dans Resend dashboard

---

## 📞 Support

- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Documentation Supabase** : [supabase.com/docs](https://supabase.com/docs)
- **Documentation Resend** : [resend.com/docs](https://resend.com/docs)

---

## ✅ Résumé rapide

1. **Tester localement** : `npm run build && npm run preview`
2. **Configurer Supabase** : Créer projet, exécuter migrations, récupérer clés
3. **Configurer Resend** : Créer compte, récupérer clé API
4. **Déployer sur Vercel** : Connecter GitHub, ajouter variables d'environnement
5. **Configurer domaine** : Ajouter dans Vercel, configurer DNS
6. **Tester** : Vérifier toutes les fonctionnalités
7. **Monitorer** : Configurer analytics et monitoring

---

**Bon déploiement ! 🚀**



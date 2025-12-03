# 🚀 Guide de Déploiement avec GitHub - Modernize Hub

Étapes détaillées pour déployer votre site avec GitHub et Vercel.

---

## 📋 Étape 1 : Préparer le projet Git

### 1.1 Initialiser Git

```bash
cd portfolio-site
git init
```

### 1.2 Ajouter tous les fichiers

```bash
git add .
```

### 1.3 Créer le premier commit

```bash
git commit -m "Initial commit - Modernize Hub"
```

---

## 📋 Étape 2 : Créer le dépôt GitHub

### 2.1 Aller sur GitHub

1. Ouvrir [github.com](https://github.com) dans votre navigateur
2. Se connecter ou créer un compte
3. Cliquer sur le bouton **"+"** en haut à droite → **"New repository"**

### 2.2 Configurer le dépôt

- **Repository name** : `modernize-hub` (ou le nom de votre choix)
- **Description** : `Site portfolio Modernize Hub - Agence web premium`
- **Visibilité** :
  - ✅ **Public** (recommandé - gratuit, visible par tous)
  - ⚠️ **Private** (si vous voulez garder le code privé)
- **NE PAS** cocher :
  - ❌ "Add a README file"
  - ❌ "Add .gitignore"
  - ❌ "Choose a license"

### 2.3 Cliquer sur **"Create repository"**

GitHub vous donnera des instructions. **Ne les suivez pas encore**, nous allons utiliser les nôtres.

---

## 📋 Étape 3 : Connecter le projet local à GitHub

### 3.1 Ajouter le remote

**Remplacer `VOTRE-USERNAME` par votre nom d'utilisateur GitHub :**

```bash
git remote add origin https://github.com/VOTRE-USERNAME/modernize-hub.git
```

### 3.2 Renommer la branche principale

```bash
git branch -M main
```

### 3.3 Pousser le code

```bash
git push -u origin main
```

Vous devrez vous connecter avec vos identifiants GitHub.

**✅ Votre code est maintenant sur GitHub !**

---

## 📋 Étape 4 : Déployer sur Vercel

### 4.1 Aller sur Vercel

1. Ouvrir [vercel.com](https://vercel.com) dans votre navigateur
2. Cliquer sur **"Sign Up"** ou **"Log In"**
3. **Se connecter avec GitHub** (recommandé - plus simple)

### 4.2 Importer le projet

1. Dans le dashboard Vercel, cliquer sur **"Add New"** → **"Project"**
2. Vous verrez la liste de vos dépôts GitHub
3. Cliquer sur **"Import"** à côté de `modernize-hub`

### 4.3 Configurer le projet

Vercel détectera automatiquement :
- ✅ **Framework Preset** : Vite
- ✅ **Root Directory** : `./`
- ✅ **Build Command** : `npm run build`
- ✅ **Output Directory** : `dist`
- ✅ **Install Command** : `npm install`

**Ne rien changer**, cliquer directement sur **"Deploy"**

### 4.4 Attendre le déploiement

Le déploiement prend 2-3 minutes. Vercel va :
- Installer les dépendances
- Builder le projet
- Déployer le site

**✅ Votre site est maintenant en ligne !**

Vous recevrez une URL du type : `https://modernize-hub-xxx.vercel.app`

---

## 📋 Étape 5 : Configurer les variables d'environnement

### 5.1 Aller dans les paramètres

1. Dans Vercel Dashboard, cliquer sur votre projet
2. Aller dans **"Settings"** (en haut)
3. Cliquer sur **"Environment Variables"** (menu de gauche)

### 5.2 Ajouter les variables

Cliquer sur **"Add New"** pour chaque variable :

#### Variables de base (obligatoires)

```
Key: VITE_SITE_URL
Value: https://modernizehub.com
Environment: Production, Preview, Development
```

#### Variables Supabase (si configuré)

```
Key: VITE_SUPABASE_URL
Value: https://xxxxx.supabase.co
Environment: Production, Preview, Development
```

```
Key: VITE_SUPABASE_ANON_KEY
Value: votre_cle_anon_ici
Environment: Production, Preview, Development
```

#### Variables Resend (si configuré)

```
Key: VITE_RESEND_API_KEY
Value: re_votre_cle_resend_ici
Environment: Production, Preview, Development
```

```
Key: VITE_RESEND_FROM_EMAIL
Value: noreply@modernizehub.com
Environment: Production, Preview, Development
```

#### Variables Calendly (si configuré)

```
Key: VITE_CALENDLY_URL
Value: https://calendly.com/votre-nom/30min
Environment: Production, Preview, Development
```

### 5.3 Redéployer

1. Aller dans **"Deployments"** (menu de gauche)
2. Trouver le dernier déploiement
3. Cliquer sur les **3 points (⋯)** à droite
4. Cliquer sur **"Redeploy"**
5. Confirmer

**✅ Les variables d'environnement sont maintenant actives !**

---

## 📋 Étape 6 : Configurer le domaine personnalisé

### 6.1 Ajouter le domaine dans Vercel

1. Dans Vercel Dashboard, aller dans **"Settings"** → **"Domains"**
2. Dans le champ **"Domain"**, entrer : `modernizehub.com`
3. Cliquer sur **"Add"**

### 6.2 Configurer les DNS

Vercel vous donnera des enregistrements DNS à ajouter chez votre registrar.

#### Pour le domaine principal (modernizehub.com)

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (ou Auto)
```

#### Pour le sous-domaine www (www.modernizehub.com)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (ou Auto)
```

### 6.3 Ajouter les DNS chez votre registrar

1. Se connecter à votre registrar (OVH, Gandi, Namecheap, etc.)
2. Aller dans la gestion DNS du domaine `modernizehub.com`
3. Ajouter les enregistrements ci-dessus
4. Sauvegarder

### 6.4 Attendre la propagation DNS

- **Temps moyen** : 5 minutes à 1 heure
- **Maximum** : 24-48 heures (rare)
- Vérifier avec : [whatsmydns.net](https://whatsmydns.net/#A/modernizehub.com)

### 6.5 HTTPS automatique

Une fois les DNS propagés :
- Vercel détectera automatiquement le domaine
- HTTPS sera activé automatiquement via Let's Encrypt
- Attendre 5-10 minutes après la propagation DNS

**✅ Votre domaine est maintenant configuré !**

---

## 📋 Étape 7 : Déploiements automatiques

**🎉 Désormais, chaque fois que vous poussez du code sur GitHub :**

1. Vercel détecte automatiquement le changement
2. Lance un nouveau build
3. Déploie automatiquement le nouveau site
4. Vous recevez une notification

### Pour mettre à jour le site

```bash
cd portfolio-site
# Faire vos modifications...
git add .
git commit -m "Description des modifications"
git push
```

**C'est tout !** Le site se met à jour automatiquement en 2-3 minutes.

---

## ✅ Checklist finale

- [ ] Code poussé sur GitHub
- [ ] Projet importé dans Vercel
- [ ] Premier déploiement réussi
- [ ] Variables d'environnement configurées
- [ ] Domaine configuré dans Vercel
- [ ] DNS configuré chez le registrar
- [ ] Domaine vérifié (propagation DNS)
- [ ] HTTPS activé
- [ ] Site accessible sur modernizehub.com
- [ ] Formulaire de contact testé
- [ ] Mode clair/sombre fonctionne

---

## 🐛 Dépannage

### Le code ne se pousse pas sur GitHub

- Vérifier que vous êtes connecté : `git config --global user.name` et `git config --global user.email`
- Vérifier l'URL du remote : `git remote -v`

### Vercel ne détecte pas le dépôt

- Vérifier que vous êtes connecté à Vercel avec le même compte GitHub
- Autoriser Vercel à accéder à vos dépôts dans les paramètres GitHub

### Le build échoue sur Vercel

- Vérifier les logs de build dans Vercel Dashboard
- Tester le build localement : `npm run build`

### Le domaine ne fonctionne pas

- Vérifier que les DNS sont bien configurés
- Vérifier la propagation DNS : [whatsmydns.net](https://whatsmydns.net)
- Attendre jusqu'à 48h (normalement 5-15 min)

---

## 🎉 Félicitations !

Votre site **Modernize Hub** est maintenant :
- ✅ En ligne sur `https://modernizehub.com`
- ✅ Avec déploiements automatiques
- ✅ Avec HTTPS activé
- ✅ Prêt pour la production

**Bon déploiement ! 🚀**



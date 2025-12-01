# 🌐 Configuration du Domaine Personnalisé - modernizehub.com

Guide pour configurer votre domaine `modernizehub.com` sur Vercel.

---

## 🎯 URL Actuelle

**Site déployé :** https://modernize-bh8ixl4zi-arafateouronile-glitchs-projects.vercel.app

**Objectif :** Faire pointer `modernizehub.com` vers votre site Vercel

---

## 📋 Étape 1 : Ajouter le Domaine dans Vercel

### 1.1 Aller dans les paramètres de domaine

1. Dans votre **Vercel Dashboard**, cliquez sur votre projet **MODERNIZE-HUB**
2. Allez dans **"Settings"** (en haut)
3. Cliquez sur **"Domains"** (menu de gauche)

### 1.2 Ajouter le domaine

1. Dans le champ **"Domain"**, entrez : `modernizehub.com`
2. Cliquez sur **"Add"** ou **"Add Domain"**

### 1.3 Ajouter aussi le www

1. Ajoutez aussi : `www.modernizehub.com`
2. Vercel configurera automatiquement la redirection `www` → domaine principal

---

## 📋 Étape 2 : Configurer les DNS chez votre Registrar

Vercel vous donnera des **enregistrements DNS** à ajouter. Voici ce qu'il faut faire :

### 2.1 Connexion à votre Registrar

Connectez-vous à votre registrar (OVH, Gandi, Namecheap, GoDaddy, etc.) où vous avez acheté le domaine `modernizehub.com`.

### 2.2 Accéder à la gestion DNS

Trouvez la section :
- **"DNS"** ou **"Gestion DNS"** ou **"Zone DNS"**
- Ou **"Domain Settings"** → **"DNS Management"**

### 2.3 Ajouter les enregistrements DNS

Vercel vous donnera les enregistrements exacts, mais voici les valeurs typiques :

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

### 2.4 Sauvegarder

Sauvegardez les modifications DNS chez votre registrar.

---

## 📋 Étape 3 : Attendre la Propagation DNS

### 3.1 Temps de propagation

- **Minimum** : 5 minutes
- **Moyen** : 15-30 minutes
- **Maximum** : 24-48 heures (rare)

### 3.2 Vérifier la propagation

Utilisez ces outils pour vérifier :

1. **whatsmydns.net** : https://whatsmydns.net/#A/modernizehub.com
2. **DNS Checker** : https://dnschecker.org/

Tapez `modernizehub.com` et vérifiez que l'IP `76.76.21.21` apparaît.

---

## 📋 Étape 4 : HTTPS Automatique

### 4.1 Activation automatique

Une fois les DNS propagés :

1. Vercel détectera automatiquement le domaine
2. **HTTPS sera activé automatiquement** via Let's Encrypt
3. Attendre 5-10 minutes après la propagation DNS

### 4.2 Vérifier HTTPS

Allez sur `https://modernizehub.com` et vérifiez que :
- ✅ Le site charge correctement
- ✅ Un cadenas vert apparaît dans le navigateur (HTTPS)
- ✅ Pas d'avertissement de sécurité

---

## 📋 Étape 5 : Redirection www → domaine principal

Vercel configure automatiquement :
- `www.modernizehub.com` → redirige vers → `modernizehub.com`

Cela se fait automatiquement, vous n'avez rien à faire.

---

## 🐛 Dépannage

### Le domaine ne fonctionne pas

1. **Vérifier les DNS** : Utilisez [whatsmydns.net](https://whatsmydns.net) pour vérifier la propagation
2. **Vérifier dans Vercel** : Allez dans Settings → Domains et vérifiez l'état du domaine
3. **Attendre** : La propagation DNS peut prendre jusqu'à 48h (normalement 5-15 min)

### Erreur "Domain not verified"

- Les DNS ne sont pas encore propagés
- Attendez 15-30 minutes et réessayez
- Vérifiez que les enregistrements DNS sont corrects

### HTTPS ne s'active pas

- Attendre 10-15 minutes après la propagation DNS
- Vérifier dans Vercel Dashboard → Settings → Domains que le domaine est vérifié
- Si le problème persiste après 1 heure, vérifier les DNS

---

## ✅ Checklist

- [ ] Domaine ajouté dans Vercel (`modernizehub.com`)
- [ ] www ajouté dans Vercel (`www.modernizehub.com`)
- [ ] Enregistrements DNS ajoutés chez le registrar
- [ ] DNS sauvegardés
- [ ] Propagation DNS vérifiée (whatsmydns.net)
- [ ] Domaine vérifié dans Vercel Dashboard
- [ ] HTTPS activé (cadenas vert)
- [ ] Site accessible sur `https://modernizehub.com`
- [ ] Redirection www → domaine principal fonctionne

---

## 🎉 Résultat Final

Votre site sera accessible sur :
- ✅ **https://modernizehub.com** (domaine principal)
- ✅ **https://www.modernizehub.com** (redirige vers le principal)
- ✅ **HTTPS automatique** (sécurisé)
- ✅ **Déploiements automatiques** à chaque push GitHub

---

**Une fois le domaine configuré, votre site Modernize Hub sera en ligne ! 🚀**


# ⚙️ Configuration des Variables d'Environnement sur Vercel

Votre site est déployé ! Maintenant, configurons les variables d'environnement.

---

## 🎯 URL de votre site

**🌐 Production :** https://modernize-bh8ixl4zi-arafateouronile-glitchs-projects.vercel.app

---

## 📋 Variables d'Environnement à Configurer

### 1. Aller dans les paramètres Vercel

1. Dans votre dashboard Vercel, cliquez sur votre projet **MODERNIZE-HUB**
2. Allez dans **"Settings"** (en haut)
3. Cliquez sur **"Environment Variables"** (menu de gauche)

### 2. Ajouter les variables

Cliquez sur **"Add New"** pour chaque variable ci-dessous :

---

### ✅ Variable 1 : URL du Site (OBLIGATOIRE)

```
Key: VITE_SITE_URL
Value: https://modernizehub.com
Environment: ✅ Production, ✅ Preview, ✅ Development
```

---

### ✅ Variables Supabase (si vous avez configuré Supabase)

#### Variable 2.1 : URL Supabase
```
Key: VITE_SUPABASE_URL
Value: https://xxxxx.supabase.co
Environment: ✅ Production, ✅ Preview, ✅ Development
```

#### Variable 2.2 : Clé Anon Supabase
```
Key: VITE_SUPABASE_ANON_KEY
Value: votre_cle_anon_ici
Environment: ✅ Production, ✅ Preview, ✅ Development
```

#### Variable 2.3 : Clé Service Role (optionnel)
```
Key: VITE_SUPABASE_SERVICE_ROLE_KEY
Value: votre_cle_service_role_ici
Environment: ✅ Production, ✅ Preview, ✅ Development
```

---

### ✅ Variables Resend (si vous avez configuré Resend pour les emails)

#### Variable 3.1 : Clé API Resend
```
Key: VITE_RESEND_API_KEY
Value: re_votre_cle_resend_ici
Environment: ✅ Production, ✅ Preview, ✅ Development
```

#### Variable 3.2 : Email expéditeur
```
Key: VITE_RESEND_FROM_EMAIL
Value: noreply@modernizehub.com
Environment: ✅ Production, ✅ Preview, ✅ Development
```

---

### ✅ Variable Calendly (si vous avez configuré Calendly)

```
Key: VITE_CALENDLY_URL
Value: https://calendly.com/votre-nom/30min
Environment: ✅ Production, ✅ Preview, ✅ Development
```

---

## 🔄 Après avoir ajouté les variables

1. **Redéployer le projet**
   - Allez dans **"Deployments"** (menu de gauche)
   - Trouvez le dernier déploiement
   - Cliquez sur les **3 points (⋯)** à droite
   - Cliquez sur **"Redeploy"**
   - Confirmer

2. **Attendre le redéploiement** (2-3 minutes)

3. **Tester le site** pour vérifier que tout fonctionne

---

## 📝 Notes Importantes

- ⚠️ Les variables doivent commencer par `VITE_` pour être accessibles dans le code
- ⚠️ Après avoir ajouté/modifié des variables, il faut **toujours redéployer**
- ✅ Sélectionnez les 3 environnements (Production, Preview, Development) pour chaque variable
- 🔒 Les valeurs sensibles (clés API) ne sont jamais exposées au client (grâce au préfixe VITE_)

---

## ✅ Checklist

- [ ] Variable `VITE_SITE_URL` ajoutée
- [ ] Variables Supabase ajoutées (si configuré)
- [ ] Variables Resend ajoutées (si configuré)
- [ ] Variable Calendly ajoutée (si configuré)
- [ ] Redéploiement effectué
- [ ] Site testé après redéploiement

---

**Une fois les variables configurées, passez à la configuration du domaine ! 🌐**


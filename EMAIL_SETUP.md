# 📧 Configuration des Emails Automatiques

## 🎯 Fonctionnalités

Lorsqu'un prospect remplit le formulaire de contact :
- ✅ **Vous recevez un email** à `yasser.arafate@gmail.com` avec toutes les infos
- ✅ **Le prospect reçoit un email de confirmation** automatique

---

## 🚀 Configuration Resend (5 minutes)

### Étape 1 : Créer un compte Resend

1. Aller sur [https://resend.com](https://resend.com)
2. Créer un compte gratuit (3000 emails/mois gratuits)
3. Vérifier votre email

### Étape 2 : Récupérer votre clé API

1. Aller dans **API Keys**
2. Cliquer sur **Create API Key**
3. Nom : `Modernize Web`
4. Permissions : **Sending access**
5. Cliquer sur **Add**
6. **Copier la clé API** (elle ne sera plus visible après !)

### Étape 3 : Ajouter la clé dans `.env.local`

Ouvrir `portfolio-site/.env.local` et ajouter :

```env
VITE_RESEND_API_KEY=re_votre_cle_api_ici
```

**Exemple complet :**
```env
VITE_SUPABASE_URL=https://keqnchxwexeqanmafian.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_supabase

VITE_RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

### Étape 4 : Vérifier un domaine (Optionnel mais recommandé)

**Pour utiliser votre propre domaine** (ex: `noreply@modernizeweb.com`) :

1. Dans Resend Dashboard → **Domains**
2. Cliquer **Add Domain**
3. Suivre les instructions DNS

**Pour tester rapidement**, vous pouvez utiliser :
- `onboarding@resend.dev` (déjà configuré, limité)

---

## ✅ Tester

### 1. Redémarrer le serveur

```bash
npm run dev
```

### 2. Tester le formulaire

1. Aller sur votre site
2. Remplir le formulaire de contact
3. Soumettre

### 3. Vérifier les emails

- ✅ Vous devriez recevoir un email à `yasser.arafate@gmail.com`
- ✅ Le prospect devrait recevoir un email de confirmation

---

## 📧 Personnalisation

### Changer l'email de réception

Dans `src/services/emailService.js`, ligne 6 :

```javascript
const ADMIN_EMAIL = 'votre-nouvel-email@gmail.com'
```

### Personnaliser les templates

Les templates d'email sont dans `src/services/emailService.js` :
- `generateAdminEmailTemplate()` - Email pour vous
- `generateConfirmationEmailTemplate()` - Email pour le prospect

---

## 🔍 Dépannage

### Problème : Aucun email reçu

1. ✅ Vérifier que `VITE_RESEND_API_KEY` est dans `.env.local`
2. ✅ Redémarrer le serveur (`npm run dev`)
3. ✅ Vérifier la console du navigateur (F12) pour les erreurs
4. ✅ Vérifier le dashboard Resend → **Logs** pour voir les tentatives d'envoi

### Problème : "Email service not configured"

- ✅ Vérifier que la clé API commence par `re_`
- ✅ Vérifier qu'il n'y a pas d'espaces dans `.env.local`
- ✅ Redémarrer le serveur

### Problème : Emails en spam

- ✅ Vérifier un domaine dans Resend (optionnel mais recommandé)
- ✅ Demander au prospect de vérifier ses spams

---

## 📊 Limites Gratuites Resend

- **3000 emails/mois** gratuits
- **100 emails/jour** gratuits
- Parfait pour commencer !

Pour plus, consulter les [tarifs Resend](https://resend.com/pricing)

---

## 🎉 C'est Tout !

Une fois configuré, les emails seront envoyés automatiquement à chaque demande de devis !

---

## 📝 Checklist

- [ ] Compte Resend créé
- [ ] Clé API récupérée
- [ ] Clé ajoutée dans `.env.local`
- [ ] Serveur redémarré
- [ ] Test effectué (formulaire rempli)
- [ ] Emails reçus ✅

---

**Temps total : ~5 minutes** ⚡



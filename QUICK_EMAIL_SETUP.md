# ⚡ Configuration Email - Guide Rapide

## 🚨 Erreur Actuelle

Vous voyez cette erreur :
```
Missing API key. Pass it to the constructor `new Resend("re_123")`
```

**C'est normal !** Il faut juste configurer Resend.

---

## ✅ Solution en 3 Étapes (2 minutes)

### Étape 1 : Créer un compte Resend

1. Aller sur [https://resend.com](https://resend.com)
2. Créer un compte (gratuit, 3000 emails/mois)
3. Vérifier votre email

### Étape 2 : Récupérer la clé API

1. Dans Resend Dashboard → **API Keys**
2. Cliquer **"Create API Key"**
3. Nom : `Modernize Web`
4. Cliquer **"Add"**
5. **Copier la clé** (elle commence par `re_...`)

### Étape 3 : Ajouter dans `.env.local`

1. Ouvrir le fichier `portfolio-site/.env.local`
2. Ajouter cette ligne :

```env
VITE_RESEND_API_KEY=re_votre_cle_ici
```

**Exemple complet :**
```env
VITE_SUPABASE_URL=https://keqnchxwexeqanmafian.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_supabase

VITE_RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

### Étape 4 : Redémarrer le serveur

```bash
# Arrêter (Ctrl+C)
# Puis redémarrer
npm run dev
```

---

## ✅ C'est Tout !

L'erreur disparaîtra et les emails fonctionneront.

---

## 🔍 Vérification

Après configuration, dans la console vous verrez :
- ✅ Plus d'erreur "Missing API key"
- ✅ Les emails seront envoyés lors de la soumission du formulaire

---

**Temps total : ~2 minutes** ⚡




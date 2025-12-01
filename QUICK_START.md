# ⚡ Guide Rapide - Configuration Supabase

## ✅ Étape 1 : Tables Créées (FAIT !)

Vous avez reçu "Success. No rows returned" → Les tables sont créées ! ✅

---

## 🔑 Étape 2 : Créer l'Utilisateur Admin

1. Dans Supabase Dashboard → **Authentication** → **Users**
2. Cliquer **"Add User"**
3. Remplir :
   - Email : `admin@modernizeweb.com`
   - Password : (mot de passe fort, min 12 caractères)
   - ✅ **Auto Confirm User** (cocher)
4. **Create User**

---

## 🔐 Étape 3 : Configurer les Variables

### Récupérer les clés :

1. Supabase Dashboard → **Settings** → **API**
2. Copier :
   - **Project URL** 
   - **anon public** key

### Créer `.env.local` à la racine :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_ici
```

---

## ✅ Étape 4 : Tester

1. Redémarrer le serveur : `npm run dev`
2. Aller sur `/admin`
3. Se connecter avec :
   - Email : `admin@modernizeweb.com`
   - Password : (celui créé à l'étape 2)

---

## 🎉 C'est Tout !

Si la connexion fonctionne, Supabase est configuré !

**Détails complets dans : `SUPABASE_NEXT_STEPS.md`**



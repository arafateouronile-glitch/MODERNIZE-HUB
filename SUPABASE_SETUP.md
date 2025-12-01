# 🚀 Guide de Configuration Supabase

## Étape 1 : Créer un projet Supabase

1. Aller sur [https://supabase.com](https://supabase.com)
2. Créer un compte ou se connecter
3. Cliquer sur "New Project"
4. Remplir :
   - **Name** : `modernize-web`
   - **Database Password** : (générer un mot de passe fort)
   - **Region** : Choisir la région la plus proche (Europe West recommandé)

## Étape 2 : Récupérer les clés API

1. Aller dans **Settings > API**
2. Copier :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## Étape 3 : Créer le fichier `.env.local`

À la racine du projet, créer `.env.local` :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_ici
```

⚠️ **Ne pas commiter** ce fichier ! Il est déjà dans `.gitignore`.

## Étape 4 : Créer les tables

1. Aller dans **SQL Editor** dans Supabase Dashboard
2. Ouvrir le fichier `supabase/migrations/001_initial_schema.sql`
3. Copier tout le contenu
4. Coller dans l'éditeur SQL
5. Cliquer sur **Run**

✅ Les tables `leads`, `blog_posts`, et `testimonials` seront créées.

## Étape 5 : Créer l'utilisateur admin

1. Aller dans **Authentication > Users**
2. Cliquer sur **Add User**
3. Remplir :
   - **Email** : `admin@modernizeweb.com`
   - **Password** : (générer un mot de passe fort)
   - **Auto Confirm User** : ✅ Cocher
4. Cliquer sur **Create User**

## Étape 6 : Activer Row Level Security (RLS) - Optionnel

Pour sécuriser davantage, activer RLS :

1. Dans **SQL Editor**, exécuter :

```sql
-- Activer RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité
CREATE POLICY "Public read access testimonials" ON testimonials 
  FOR SELECT USING (true);

CREATE POLICY "Public read access blog" ON blog_posts 
  FOR SELECT USING (true);

-- Les leads sont privés
CREATE POLICY "Admins only leads" ON leads 
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'admin@modernizeweb.com'
  );

CREATE POLICY "Admins only blog write" ON blog_posts 
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'admin@modernizeweb.com'
  );
```

## Étape 7 : Tester la connexion

1. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```

2. Ouvrir la console du navigateur
3. Aller sur `/admin`
4. Se connecter avec :
   - Email : `admin@modernizeweb.com`
   - Password : (celui créé à l'étape 5)

✅ Si ça fonctionne, Supabase est configuré !

## 🔄 Migration des données existantes

Si vous avez déjà des données dans localStorage :

1. Ouvrir la console du navigateur
2. Exécuter ce script de migration :

```javascript
// Migrer les leads
const leads = JSON.parse(localStorage.getItem('admin_leads') || '[]')
leads.forEach(async (lead) => {
  await fetch('https://votre-projet.supabase.co/rest/v1/leads', {
    method: 'POST',
    headers: {
      'apikey': 'votre_cle_anon',
      'Authorization': 'Bearer votre_cle_anon',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(lead)
  })
})

// Répéter pour blog_posts et testimonials
```

## ⚠️ Mode Fallback

Si Supabase n'est pas configuré, l'application **fonctionnera toujours** avec localStorage. C'est un fallback automatique.

Pour vérifier :
- Si les variables d'environnement ne sont pas définies → localStorage
- Si Supabase est configuré mais une erreur survient → fallback vers localStorage

## 🎉 Fini !

Votre backend Supabase est maintenant configuré. Les données seront synchronisées et accessibles depuis n'importe quel appareil !



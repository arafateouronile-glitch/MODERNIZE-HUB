# 💾 Stockage des Données Prospect - Guide Complet

## ✅ C'est Déjà Configuré !

**Toutes les données envoyées par le prospect sont automatiquement stockées dans votre base de données Supabase.**

---

## 📊 Ce Qui Est Stocké

Quand un prospect remplit le formulaire de contact, ces informations sont sauvegardées :

| Donnée | Champ | Où |
|--------|-------|-----|
| **Nom** | `name` | Formulaire |
| **Email** | `email` | Formulaire |
| **Budget** | `budget` | Formulaire |
| **Message** | `message` | Formulaire (optionnel) |
| **Type** | `type` | 'quote' (demande de devis) |
| **Statut** | `status` | 'new' (par défaut) |
| **Date** | `created_at` | Générée automatiquement |

---

## 🗄️ Base de Données : Table `leads`

Toutes les données sont stockées dans la table **`leads`** de Supabase.

### Structure de la table :

```sql
leads (
  id UUID PRIMARY KEY,
  type TEXT,           -- 'quote' ou 'appointment'
  name TEXT,           -- Nom du prospect
  email TEXT,          -- Email du prospect
  phone TEXT,          -- Téléphone (optionnel)
  budget TEXT,         -- Budget sélectionné
  message TEXT,        -- Message du prospect
  status TEXT,         -- 'new', 'contacted', 'qualified', etc.
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

---

## 🔍 Comment Vérifier

### Méthode 1 : Supabase Dashboard (Recommandé)

1. Aller sur [https://supabase.com](https://supabase.com)
2. Ouvrir votre projet
3. Cliquer sur **Table Editor** dans le menu de gauche
4. Sélectionner la table **`leads`**
5. ✅ **Vous verrez tous les leads stockés !**

### Méthode 2 : Espace Admin

1. Aller sur `/admin` de votre site
2. Se connecter
3. Cliquer sur **"Leads & Devis"**
4. ✅ **Tous les leads sont affichés avec leurs détails**

### Méthode 3 : Console du Navigateur

1. Ouvrir la console (F12)
2. Remplir et soumettre le formulaire
3. Vérifier les logs :

```
💾 Tentative de sauvegarde dans Supabase...
✅ Lead sauvegardé avec succès dans Supabase: { id: '...', name: '...' }
```

---

## 🔄 Flux Complet

```
┌─────────────────────────┐
│  Prospect remplit le    │
│  formulaire de contact  │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Validation des données │
│  (Zod schema)           │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Sauvegarde dans        │
│  Supabase (table leads) │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Envoi des emails       │
│  (Admin + Confirmation) │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Message de succès      │
│  affiché au prospect    │
└─────────────────────────┘
```

---

## ✅ Test Rapide

### 1. Tester le Stockage

1. Aller sur votre site
2. Scroller jusqu'au formulaire de contact
3. Remplir :
   - Nom : `Test Prospect`
   - Email : `test@example.com`
   - Budget : `1 500€ - 3 000€`
   - Message : `Test de sauvegarde`
4. Soumettre le formulaire

### 2. Vérifier dans Supabase

1. Ouvrir Supabase Dashboard
2. Table Editor > `leads`
3. ✅ Le nouveau lead doit apparaître avec :
   - Nom : `Test Prospect`
   - Email : `test@example.com`
   - Budget : `1 500€ - 3 000€`
   - Message : `Test de sauvegarde`
   - Statut : `new`

### 3. Vérifier dans l'Admin

1. Aller sur `/admin`
2. Cliquer sur **"Leads & Devis"**
3. ✅ Le lead "Test Prospect" doit apparaître dans la liste

---

## 🔧 Configuration Actuelle

### Code qui sauvegarde :

**Fichier** : `src/components/sections/Contact.jsx`

```javascript
const savedLead = await storage.saveLead({
  type: 'quote',
  name: data.name,
  email: data.email,
  budget: data.budget,
  message: data.message || '',
  phone: '',
})
```

**Service** : `src/services/supabaseStorage.js`

- ✅ Sauvegarde dans Supabase si configuré
- ✅ Fallback vers localStorage si Supabase non configuré

---

## ⚠️ En Cas de Problème

### Problème : Les données ne sont pas dans Supabase

**Solution 1** : Vérifier que Supabase est configuré
- Fichier `.env.local` doit contenir :
  ```env
  VITE_SUPABASE_URL=https://...
  VITE_SUPABASE_ANON_KEY=...
  ```

**Solution 2** : Vérifier que la table existe
- Supabase Dashboard > Table Editor
- La table `leads` doit exister
- Si elle n'existe pas, exécuter le SQL de migration

**Solution 3** : Vérifier la console
- Ouvrir la console (F12)
- Chercher les messages d'erreur
- Si erreur, vérifier les permissions Supabase

### Problème : Les données sont dans localStorage au lieu de Supabase

**C'est normal si** :
- Supabase n'est pas configuré
- Les variables d'environnement ne sont pas définies

**Solution** : Configurer Supabase (voir `SUPABASE_SETUP.md`)

---

## 📊 Statistiques

Une fois stockées, vous pouvez :
- ✅ Voir tous les leads dans l'admin
- ✅ Filtrer par statut
- ✅ Modifier le statut (nouveau → contacté → qualifié → converti)
- ✅ Supprimer les leads obsolètes
- ✅ Exporter les données (via Supabase)

---

## 🎯 Résumé

✅ **Le stockage est déjà actif et fonctionnel !**

- ✅ Les données sont sauvegardées automatiquement
- ✅ Stockage dans Supabase (ou localStorage en fallback)
- ✅ Visible dans l'espace admin
- ✅ Accessible via Supabase Dashboard

**Vous n'avez rien à faire, c'est déjà configuré ! 🎉**

---

## 📝 Checklist de Vérification

- [ ] Formulaire de contact fonctionne
- [ ] Les données apparaissent dans Supabase Dashboard
- [ ] Les données apparaissent dans `/admin` > Leads
- [ ] Les logs dans la console montrent "Lead sauvegardé avec succès"
- [ ] Les emails sont envoyés (admin + confirmation)

---

**Tout est déjà en place ! Il suffit de tester pour vérifier. ✅**



# Guide Espace Administrateur

## 🚀 Accès

1. Aller sur `/admin` ou cliquer sur "ADMIN" en bas du footer
2. Mot de passe par défaut : `Modernize2025!`
3. ⚠️ **À CHANGER EN PRODUCTION !**

## 📋 Fonctionnalités

### 1. Dashboard
- Vue d'ensemble avec statistiques
- Nombre de leads, articles, témoignages
- Actions rapides

### 2. Gestion des Leads
**Deux types de leads sont automatiquement enregistrés :**

#### Demandes de Devis (Formulaire Contact)
- Nom, Email, Budget, Message
- Enregistrés automatiquement lors de la soumission

#### Rendez-vous (Calendly)
- Enregistrés quand un visiteur ouvre Calendly
- ⚠️ **En production** : Configurer les webhooks Calendly pour enregistrer automatiquement les rendez-vous confirmés

**Actions possibles :**
- ✅ Voir tous les leads
- ✅ Filtrer par statut (Nouveau, Contacté, Qualifié, Converti, Perdu)
- ✅ Changer le statut
- ✅ Voir les détails complets
- ✅ Supprimer un lead

### 3. Gestion du Blog

**Créer un article :**
1. Cliquer sur "Nouvel Article"
2. Remplir :
   - Titre *
   - Extrait *
   - Catégorie
   - Temps de lecture
   - Slug (auto-généré si vide)
   - Featured (mise en avant)

**Modifier/Supprimer :**
- Bouton "Modifier" sur chaque article
- Bouton "Supprimer" (avec confirmation)

**Les articles apparaissent automatiquement** dans la section Blog du site principal.

### 4. Gestion des Témoignages

**Ajouter un témoignage :**
1. Cliquer sur "Nouveau Témoignage"
2. Remplir :
   - Nom *
   - Rôle/Profession *
   - Avatar (URL ou chemin)
   - Témoignage *
   - Résultat/Statistique
   - Note (1-5 étoiles)

**Les témoignages apparaissent automatiquement** dans la section Témoignages du site.

## 💾 Stockage

**Actuellement** : LocalStorage (côté client)
- ✅ Simple à mettre en place
- ✅ Pas de backend requis
- ⚠️ Limité aux données du navigateur

**En Production** : Migrer vers API/Backend
- Supabase, Firebase, ou API custom
- Synchronisation multi-appareils
- Backup automatique
- Sécurité renforcée

## 🔒 Sécurité

**En développement** : Mot de passe simple dans le code

**En production** :
1. ✅ Utiliser une authentification sécurisée (Supabase Auth, Auth0)
2. ✅ Hash du mot de passe côté serveur
3. ✅ JWT tokens
4. ✅ HTTPS obligatoire
5. ✅ Rate limiting sur l'API
6. ✅ Validation des données serveur

## 📝 Migration vers Backend

Pour migrer vers un vrai backend :

1. Créer une API REST
2. Remplacer `storage.saveLead()` par `api.post('/leads', lead)`
3. Remplacer `storage.getLeads()` par `api.get('/leads')`
4. Ajouter authentification JWT
5. Mettre en place une vraie base de données

**Exemple Supabase :**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Sauvegarder un lead
await supabase.from('leads').insert(lead)

// Récupérer les leads
const { data } = await supabase.from('leads').select('*')
```

## 🎯 Prochaines Étapes

1. ✅ **Configurer Calendly Webhooks** pour enregistrer automatiquement les rendez-vous
2. ✅ **Ajouter notifications email** lors de nouveaux leads
3. ✅ **Exporter les leads** en CSV
4. ✅ **Analytics avancées** (conversion rate, etc.)
5. ✅ **Multi-utilisateurs** (équipe)

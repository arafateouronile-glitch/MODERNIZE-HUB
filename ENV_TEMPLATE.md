# Template des Variables d'Environnement

## Instructions

1. Créer un fichier `.env.local` à la racine du projet
2. Copier les variables ci-dessous dans `.env.local`
3. Remplacer les valeurs `xxxxx` par vos vraies clés
4. **NE JAMAIS COMMITER** le fichier `.env.local`

---

## Variables d'Environnement

```env
# ============================================
# SUPABASE (Base de données)
# ============================================
# Récupérer depuis : https://supabase.com/dashboard/project/VOTRE_PROJET/settings/api

VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_ici
VITE_SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role_ici

# ============================================
# RESEND (Service d'emails)
# ============================================
# Récupérer depuis : https://resend.com/api-keys

VITE_RESEND_API_KEY=re_votre_cle_resend_ici
VITE_RESEND_FROM_EMAIL=noreply@modernizehub.com

# ============================================
# CALENDLY (Rendez-vous)
# ============================================

VITE_CALENDLY_URL=https://calendly.com/votre-nom/30min

# ============================================
# URL DU SITE
# ============================================

VITE_SITE_URL=https://modernizehub.com
```

---

## Notes

- En développement : utiliser `.env.local`
- En production (Vercel/Netlify) : ajouter dans les variables d'environnement de la plateforme
- Ne jamais commiter les fichiers avec des valeurs réelles



# Configuration Crisp Chat

Crisp est maintenant intégré au projet pour le support client en temps réel.

## Étapes de configuration

### 1. Créer un compte Crisp
- Aller sur https://crisp.chat/fr/
- Créer un compte gratuit (jusqu'à 2 agents)
- Choisir le plan adapté à vos besoins

### 2. Obtenir votre Website ID
- Dans le dashboard Crisp, aller dans **Settings** > **Website Settings**
- Copier votre **Website ID** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 3. Configurer les variables d'environnement

#### Développement Local (.env)
```bash
VITE_CRISP_WEBSITE_ID=votre-website-id-ici
```

#### Production (Vercel)
1. Aller dans **Settings** > **Environment Variables**
2. Ajouter:
   - **Name**: `VITE_CRISP_WEBSITE_ID`
   - **Value**: votre Website ID
   - **Environments**: Production, Preview, Development
3. Redéployer l'application

### 4. Personnaliser Crisp

#### Dans le dashboard Crisp:

**Apparence**
- **Settings** > **Chatbox & Email** > **Appearance**
- Couleur principale: `#D9FF00` (neon de Modernize Hub)
- Position: Bottom right
- Avatar: Logo Modernize Hub

**Messages automatiques**
- **Settings** > **Chatbox & Email** > **Chatbox Setup**
- Message de bienvenue: "👋 Bonjour ! Comment puis-je vous aider avec votre projet web ?"
- Message d'absence: "Nous revenons dans quelques minutes. Laissez-nous un message !"

**Disponibilité**
- **Settings** > **Chatbox & Email** > **Availability**
- Définir vos heures d'ouverture
- Activer les notifications par email

**Opérateurs**
- **Settings** > **Team** > **Operators**
- Ajouter vos agents support
- Définir les permissions

### 5. Fonctionnalités avancées

#### Segments d'utilisateurs
- Identifier les visiteurs haute valeur (budget > 3k€)
- Tags automatiques selon la page visitée

#### Déclencheurs automatiques
- Message après 30 secondes sur la page de tarification
- Message si le visiteur revient 3+ fois
- Message si abandon de formulaire

#### Intégrations
- **Email**: Forward vers yasser.arafate@gmail.com
- **Slack**: Notifications des nouveaux chats
- **Google Analytics**: Tracking des conversations

### 6. Utilisation dans le code

#### Ouvrir le chat manuellement
```jsx
import { CrispChatButton } from './components/common/CrispChatButton'

function Page() {
  return <CrispChatButton variant="primary" />
}
```

#### API Crisp
```javascript
import Crisp from './lib/crisp'

// Ouvrir le chat
Crisp.open()

// Définir les données utilisateur
Crisp.setUserData({
  email: 'client@example.com',
  name: 'Jean Dupont',
  phone: '+33612345678'
})

// Envoyer un message automatique
Crisp.sendMessage('Merci de votre demande de devis !')
```

### 7. Vérification

#### Développement
1. Redémarrer le serveur: `npm run dev`
2. Ouvrir http://localhost:5173
3. Le widget Crisp devrait apparaître en bas à droite après 2 secondes

#### Production
1. Déployer sur Vercel
2. Vérifier que la variable d'environnement est définie
3. Tester le chat sur le site en production

### 8. Bonnes pratiques

**Temps de réponse**
- < 2 minutes pendant les heures d'ouverture
- Activer les réponses automatiques en dehors

**Qualité des réponses**
- Utiliser les **Saved Replies** pour les questions fréquentes
- Personnaliser chaque réponse
- Toujours conclure avec un CTA (devis, appel, etc.)

**Suivi des leads**
- Tagger chaque conversation (budget, urgence, type de projet)
- Exporter les données vers un CRM
- Relancer les prospects dans les 24h

### 9. Métriques à suivre

Dans le dashboard Crisp:
- **Temps de première réponse** (objectif: < 2min)
- **Temps de résolution** (objectif: < 15min)
- **Taux de satisfaction** (objectif: > 95%)
- **Taux de conversion chat → devis** (objectif: > 40%)

### 10. Support et documentation

- Documentation officielle: https://docs.crisp.chat/
- Status Crisp: https://status.crisp.chat/
- Support: support@crisp.chat

## Désactiver Crisp temporairement

Si vous souhaitez désactiver Crisp sans supprimer la configuration:

```javascript
// Dans main.jsx, commenter:
// loadCrisp()
```

Ou dans `.env`:
```bash
VITE_CRISP_WEBSITE_ID=disabled
```

## Coût

- **Gratuit**: 2 agents, illimité de conversations
- **Pro**: 25€/mois/agent (multi-canal, CRM, etc.)
- **Unlimited**: 95€/mois/agent (white-label, SLA, etc.)

Pour démarrer: **Le plan gratuit suffit amplement**. 🚀

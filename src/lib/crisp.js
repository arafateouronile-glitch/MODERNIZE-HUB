/**
 * Crisp Chat - Configuration et initialisation
 * https://crisp.chat/fr/
 * 
 * Pour configurer Crisp:
 * 1. Créer un compte sur https://crisp.chat/
 * 2. Obtenir votre WEBSITE_ID depuis le dashboard
 * 3. Ajouter VITE_CRISP_WEBSITE_ID dans le fichier .env
 * 4. Redémarrer le serveur de développement
 */

// Charger Crisp uniquement en production ou si configuré
export const loadCrisp = () => {
  const crispWebsiteId = import.meta.env.VITE_CRISP_WEBSITE_ID

  // Ne pas charger si pas configuré ou en développement local
  if (!crispWebsiteId || crispWebsiteId === 'your-crisp-website-id') {
    console.log('⚠️ Crisp Chat non configuré. Ajoutez VITE_CRISP_WEBSITE_ID dans .env')
    return
  }

  // Ne charger qu'une seule fois
  if (window.$crisp) {
    console.log('✅ Crisp Chat déjà chargé')
    return
  }

  // Configuration globale de Crisp
  window.$crisp = []
  window.CRISP_WEBSITE_ID = crispWebsiteId

  // Chargement du script Crisp
  const script = document.createElement('script')
  script.src = 'https://client.crisp.chat/l.js'
  script.async = true
  document.head.appendChild(script)

  script.onload = () => {
    console.log('✅ Crisp Chat chargé avec succès')
    
    // Configuration optionnelle
    window.$crisp.push(['safe', true]) // Mode RGPD
    window.$crisp.push(['config', 'locale', 'fr']) // Langue française
    
    // Cacher le widget au chargement (optionnel)
    // window.$crisp.push(['do', 'chat:hide'])
  }

  script.onerror = () => {
    console.error('❌ Erreur lors du chargement de Crisp Chat')
  }
}

/**
 * Ouvrir le chat Crisp
 */
export const openCrispChat = () => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:open'])
  } else {
    console.warn('Crisp Chat n\'est pas encore chargé')
  }
}

/**
 * Fermer le chat Crisp
 */
export const closeCrispChat = () => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:close'])
  }
}

/**
 * Afficher le widget Crisp
 */
export const showCrispWidget = () => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:show'])
  }
}

/**
 * Cacher le widget Crisp
 */
export const hideCrispWidget = () => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:hide'])
  }
}

/**
 * Définir les données utilisateur (pour un chat personnalisé)
 */
export const setCrispUserData = (userData) => {
  if (window.$crisp) {
    if (userData.email) {
      window.$crisp.push(['set', 'user:email', userData.email])
    }
    if (userData.name) {
      window.$crisp.push(['set', 'user:nickname', userData.name])
    }
    if (userData.phone) {
      window.$crisp.push(['set', 'user:phone', userData.phone])
    }
  }
}

/**
 * Envoyer un message automatique
 */
export const sendCrispMessage = (message) => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'message:send', ['text', message]])
  }
}

/**
 * Définir une session avec des données personnalisées
 */
export const setCrispSessionData = (key, value) => {
  if (window.$crisp) {
    window.$crisp.push(['set', 'session:data', [[key, value]]])
  }
}

export default {
  load: loadCrisp,
  open: openCrispChat,
  close: closeCrispChat,
  show: showCrispWidget,
  hide: hideCrispWidget,
  setUserData: setCrispUserData,
  sendMessage: sendCrispMessage,
  setSessionData: setCrispSessionData,
}



/**
 * Enregistrement du Service Worker pour PWA
 */

export const registerServiceWorker = async () => {
  // Vérifier si les Service Workers sont supportés
  if (!('serviceWorker' in navigator)) {
    console.warn('⚠️ Service Workers non supportés par ce navigateur')
    return
  }

  try {
    // Attendre que la page soit complètement chargée
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        window.addEventListener('load', resolve)
      })
    }

    console.log('[PWA] Enregistrement du Service Worker...')

    // Enregistrer le Service Worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    })

    console.log('✅ Service Worker enregistré:', registration.scope)

    // Gérer les mises à jour
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      console.log('[PWA] Nouvelle version du Service Worker trouvée')

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('[PWA] Nouvelle version disponible !')
          
          // Afficher une notification à l'utilisateur
          showUpdateNotification(newWorker)
        }
      })
    })

    // Écouter les messages du Service Worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SW_UPDATED') {
        console.log('[PWA] Service Worker mis à jour:', event.data.message)
        showUpdateNotification()
      }
    })

    // Vérifier les mises à jour toutes les 30 minutes
    setInterval(() => {
      registration.update()
    }, 30 * 60 * 1000)

    return registration
  } catch (error) {
    console.error('❌ Erreur lors de l\'enregistrement du Service Worker:', error)
  }
}

/**
 * Afficher une notification de mise à jour disponible
 */
const showUpdateNotification = (newWorker) => {
  // Créer une notification visuelle
  const notification = document.createElement('div')
  notification.id = 'sw-update-notification'
  notification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%);
      color: #D9FF00;
      padding: 20px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(217, 255, 0, 0.2);
      z-index: 10000;
      max-width: 350px;
      border: 1px solid #D9FF00;
      animation: slideInUp 0.3s ease-out;
    ">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        <strong style="font-size: 16px;">Mise à jour disponible</strong>
      </div>
      <p style="margin: 0 0 16px 0; font-size: 14px; color: #E0E0E0;">
        Une nouvelle version de Modernize Hub est prête.
      </p>
      <div style="display: flex; gap: 12px;">
        <button id="sw-update-btn" style="
          background: #D9FF00;
          color: #0A0A0A;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        ">
          Mettre à jour
        </button>
        <button id="sw-dismiss-btn" style="
          background: transparent;
          color: #D9FF00;
          border: 1px solid #D9FF00;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        ">
          Plus tard
        </button>
      </div>
    </div>
    <style>
      @keyframes slideInUp {
        from {
          transform: translateY(100px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      #sw-update-btn:hover {
        background: #C4E600;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(217, 255, 0, 0.3);
      }
      #sw-dismiss-btn:hover {
        background: rgba(217, 255, 0, 0.1);
      }
    </style>
  `

  document.body.appendChild(notification)

  // Bouton de mise à jour
  document.getElementById('sw-update-btn')?.addEventListener('click', () => {
    if (newWorker) {
      // Dire au nouveau SW de prendre le contrôle immédiatement
      newWorker.postMessage({ type: 'SKIP_WAITING' })
    }
    
    // Recharger la page
    window.location.reload()
  })

  // Bouton pour ignorer
  document.getElementById('sw-dismiss-btn')?.addEventListener('click', () => {
    notification.remove()
  })

  // Auto-dismiss après 30 secondes
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 30000)
}

/**
 * Désinscrire le Service Worker (pour debug uniquement)
 */
export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      await registration.unregister()
    }
    console.log('✅ Service Worker désinscrit')
  }
}

/**
 * Vérifier si l'app est installée
 */
export const isPWAInstalled = () => {
  // Vérifier si l'app tourne en mode standalone (installée)
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

/**
 * Proposer l'installation de la PWA
 */
export const promptPWAInstall = () => {
  let deferredPrompt

  window.addEventListener('beforeinstallprompt', (e) => {
    // Empêcher le prompt par défaut
    e.preventDefault()
    deferredPrompt = e

    // Afficher un bouton d'installation custom
    showInstallButton(deferredPrompt)
  })

  window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installée avec succès')
    deferredPrompt = null
  })
}

/**
 * Afficher le bouton d'installation PWA
 */
const showInstallButton = (deferredPrompt) => {
  // Vérifier si déjà affiché récemment
  const lastShown = localStorage.getItem('pwa-install-prompt-shown')
  if (lastShown) {
    const daysSinceLastShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24)
    if (daysSinceLastShown < 7) {
      console.log('[PWA] Installation déjà proposée récemment')
      return
    }
  }

  // Créer le bouton
  const installBtn = document.createElement('button')
  installBtn.id = 'pwa-install-btn'
  installBtn.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: linear-gradient(135deg, #D9FF00 0%, #C4E600 100%);
      color: #0A0A0A;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(217, 255, 0, 0.3);
      z-index: 9999;
      border: none;
      cursor: pointer;
      font-weight: bold;
      font-size: 15px;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: slideInLeft 0.3s ease-out;
      transition: all 0.3s;
    ">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      <span>Installer l'app</span>
    </div>
    <style>
      @keyframes slideInLeft {
        from {
          transform: translateX(-100px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      #pwa-install-btn:hover > div {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(217, 255, 0, 0.4);
      }
    </style>
  `

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return

    // Afficher le prompt natif
    deferredPrompt.prompt()

    // Attendre la réponse de l'utilisateur
    const { outcome } = await deferredPrompt.userChoice
    console.log(`[PWA] Installation: ${outcome}`)

    // Sauvegarder qu'on a montré le prompt
    localStorage.setItem('pwa-install-prompt-shown', Date.now().toString())

    // Retirer le bouton
    installBtn.remove()
    deferredPrompt = null
  })

  document.body.appendChild(installBtn)

  // Auto-hide après 10 secondes
  setTimeout(() => {
    if (installBtn.parentNode) {
      installBtn.style.opacity = '0'
      setTimeout(() => installBtn.remove(), 300)
    }
  }, 10000)
}

export default {
  register: registerServiceWorker,
  unregister: unregisterServiceWorker,
  isInstalled: isPWAInstalled,
  promptInstall: promptPWAInstall,
}



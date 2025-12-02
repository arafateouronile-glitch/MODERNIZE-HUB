// Service Worker pour PWA - Modernize Hub
// Version du cache (incrémenter à chaque modification)
const CACHE_VERSION = 'v1.0.0'
const CACHE_NAME = `modernize-hub-${CACHE_VERSION}`

// Fichiers à mettre en cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/logo-192.png',
  '/logo-512.png',
]

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installation...', CACHE_VERSION)
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Mise en cache des assets')
        return cache.addAll(ASSETS_TO_CACHE)
      })
      .then(() => {
        console.log('[SW] Installation terminée')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW] Erreur lors de l\'installation:', error)
      })
  )
})

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation...', CACHE_VERSION)
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Supprimer les anciens caches
              return cacheName.startsWith('modernize-hub-') && cacheName !== CACHE_NAME
            })
            .map((cacheName) => {
              console.log('[SW] Suppression ancien cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => {
        console.log('[SW] Activation terminée')
        return self.clients.claim()
      })
  )
})

// Stratégie de cache: Network First avec fallback sur cache
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Ignorer les requêtes non-HTTP et les requêtes vers des domaines externes
  if (!request.url.startsWith('http') || url.origin !== location.origin) {
    return
  }

  // Ignorer les requêtes vers l'API Supabase (toujours online)
  if (url.hostname.includes('supabase')) {
    return
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cloner la réponse car elle ne peut être consommée qu'une fois
        const responseToCache = response.clone()

        // Mettre en cache si la réponse est valide
        if (response.status === 200) {
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseToCache)
            })
        }

        return response
      })
      .catch(() => {
        // En cas d'erreur réseau, essayer de récupérer depuis le cache
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              console.log('[SW] Récupération depuis le cache:', request.url)
              return cachedResponse
            }

            // Si pas en cache, retourner une page offline
            if (request.destination === 'document') {
              return caches.match('/index.html')
            }

            // Pour les autres ressources, retourner une erreur
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
            })
          })
      })
  )
})

// Écouter les messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting demandé')
    self.skipWaiting()
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    console.log('[SW] Ajout d\'URLs au cache:', event.data.urls)
    
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(event.data.urls))
    )
  }
})

// Notification de mise à jour disponible
self.addEventListener('controllerchange', () => {
  console.log('[SW] Nouveau Service Worker activé')
  
  // Notifier le client qu'une mise à jour est disponible
  self.clients.matchAll()
    .then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: 'SW_UPDATED',
          message: 'Une nouvelle version est disponible. Rechargez la page pour la voir.',
        })
      })
    })
})


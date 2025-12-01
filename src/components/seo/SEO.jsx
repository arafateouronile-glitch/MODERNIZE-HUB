import { useEffect } from 'react'

/**
 * Composant SEO pour mettre à jour dynamiquement les meta tags
 * Compatible avec React 19
 */
export const SEO = ({ 
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}) => {
  useEffect(() => {
    // Mettre à jour le titre
    if (title) {
      document.title = title
    }

    // Mettre à jour les meta tags
    const metaTags = {
      'description': description,
      'keywords': keywords,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:type': type,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    }

    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return

      let selector = `meta[name="${name}"]`
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        selector = `meta[property="${name}"]`
      }

      let meta = document.querySelector(selector)
      
      if (!meta) {
        meta = document.createElement('meta')
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }

      meta.setAttribute('content', content)
    })

    // Mettre à jour le canonical
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', url)
    }
  }, [title, description, keywords, image, url, type])

  return null
}



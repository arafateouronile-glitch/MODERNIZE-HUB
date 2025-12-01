import { useEffect } from 'react'

/**
 * Composant pour injecter du Schema.org JSON-LD dynamique
 */
export const SchemaOrg = ({ schema }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    script.id = 'schema-org-json'

    // Supprimer l'ancien script s'il existe
    const oldScript = document.getElementById('schema-org-json')
    if (oldScript) {
      document.head.removeChild(oldScript)
    }

    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('schema-org-json')
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove)
      }
    }
  }, [schema])

  return null
}

// Helper pour créer des schemas communs
export const createOrganizationSchema = (data = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: data.name || 'Modernize Hub',
  url: data.url || 'https://modernizehub.com',
  logo: data.logo || 'https://modernizehub.com/logo.svg',
  description: data.description || 'Agence de création et refonte de sites web professionnels',
  email: data.email || 'contact@modernizehub.com',
  telephone: data.telephone || '+33-X-XX-XX-XX-XX',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
    addressLocality: data.city || 'Paris',
  },
  sameAs: data.socialLinks || [
    'https://www.linkedin.com/company/modernizehub',
    'https://twitter.com/modernizehub',
  ],
})

export const createServiceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: service.type || 'Web Design',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: 'Modernize Hub',
  },
  areaServed: {
    '@type': 'Country',
    name: 'France',
  },
  offers: {
    '@type': 'Offer',
    price: service.price,
    priceCurrency: 'EUR',
  },
})

export const createBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const createFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})


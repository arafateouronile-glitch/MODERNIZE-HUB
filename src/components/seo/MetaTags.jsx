import { SEO } from './SEO'
import { SchemaOrg, createOrganizationSchema, createFAQSchema } from './SchemaOrg'

/**
 * Composant MetaTags global pour le site
 */
export const MetaTags = ({ faqs = [] }) => {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://modernizehub.com'
  
  return (
    <>
      <SEO
        title="Modernize Hub | Agence Web Premium - Sites Qui Convertissent +320%"
        description="🚀 Transformez votre site obsolète en machine à générer des leads. Design ultra-moderne 2025, livraison 14 jours, +320% de conversions en moyenne. Satisfait ou 100% remboursé."
        keywords="création site web, refonte site internet, agence web, design moderne, site vitrine, site e-commerce, SEO, conversion, leads, marketing digital"
        image={`${baseUrl}/og-image.jpg`}
        url={baseUrl}
        type="website"
      />
      
      {/* Schema.org Organization */}
      <SchemaOrg schema={createOrganizationSchema({
        name: 'Modernize Hub',
        url: baseUrl,
        email: 'contact@modernizehub.com',
        telephone: '+33-X-XX-XX-XX-XX',
        city: 'Paris',
        socialLinks: [
          'https://www.linkedin.com/company/modernizehub',
          'https://twitter.com/modernizehub',
          'https://www.instagram.com/modernizehub',
        ],
      })} />
      
      {/* Schema.org FAQ si des FAQs sont fournies */}
      {faqs.length > 0 && (
        <SchemaOrg schema={createFAQSchema(faqs)} />
      )}
    </>
  )
}



/**
 * Utilitaire pour générer un sitemap dynamique
 */
export const generateSitemap = (routes = []) => {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://modernizehub.com'
  const currentDate = new Date().toISOString().split('T')[0]

  const defaultRoutes = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: '#about', changefreq: 'monthly', priority: '0.8' },
    { url: '#portfolio', changefreq: 'weekly', priority: '0.9' },
    { url: '#pricing', changefreq: 'monthly', priority: '0.8' },
    { url: '#contact', changefreq: 'monthly', priority: '0.9' },
  ]

  const allRoutes = [...defaultRoutes, ...routes]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod || currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return sitemap
}



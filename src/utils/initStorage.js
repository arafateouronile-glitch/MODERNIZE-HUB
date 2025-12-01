// Initialise le storage avec les données existantes si vide
export const initStorage = () => {
  if (typeof window === 'undefined') return

  try {
    // Charger dynamiquement pour éviter les problèmes de lazy loading
    Promise.all([
      import('../data/testimonials').then(m => m.testimonials),
      import('../data/blog').then(m => m.blogPosts),
    ]).then(([defaultTestimonials, defaultBlogPosts]) => {
      // Initialiser les témoignages si vides
      const storedTestimonials = localStorage.getItem('admin_testimonials')
      if (!storedTestimonials || JSON.parse(storedTestimonials).length === 0) {
        localStorage.setItem('admin_testimonials', JSON.stringify(defaultTestimonials))
      }

      // Initialiser les articles de blog si vides
      const storedBlogPosts = localStorage.getItem('admin_blog_posts')
      if (!storedBlogPosts || JSON.parse(storedBlogPosts).length === 0) {
        localStorage.setItem('admin_blog_posts', JSON.stringify(defaultBlogPosts))
      }
    }).catch(error => {
      console.error('Erreur lors de l\'initialisation du storage:', error)
    })
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du storage:', error)
  }
}


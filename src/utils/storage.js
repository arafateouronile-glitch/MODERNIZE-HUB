// Gestion du stockage local pour l'admin
// ⚠️ Ce service est utilisé en fallback si Supabase n'est pas configuré
// En production, préférer l'utilisation de supabaseStorage (src/services/supabaseStorage.js)

const safeGetItem = (key, defaultValue = []) => {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${key}:`, error)
    return defaultValue
  }
}

const safeSetItem = (key, value) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Erreur lors de l'écriture de ${key}:`, error)
  }
}

export const storage = {
  // Leads (devis + rendez-vous)
  getLeads: () => {
    return safeGetItem('admin_leads', [])
  },

  saveLead: (lead) => {
    const leads = storage.getLeads()
    const newLead = {
      ...lead,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new',
    }
    leads.unshift(newLead)
    safeSetItem('admin_leads', leads)
    return newLead
  },

  updateLeadStatus: (id, status) => {
    const leads = storage.getLeads()
    const updated = leads.map(lead =>
      lead.id === id ? { ...lead, status, updatedAt: new Date().toISOString() } : lead
    )
    safeSetItem('admin_leads', updated)
    return updated.find(l => l.id === id)
  },

  deleteLead: (id) => {
    const leads = storage.getLeads()
    const filtered = leads.filter(lead => lead.id !== id)
    safeSetItem('admin_leads', filtered)
  },

  // Blog Posts
  getBlogPosts: () => {
    return safeGetItem('admin_blog_posts', [])
  },

  saveBlogPost: (post) => {
    const posts = storage.getBlogPosts()
    const newPost = {
      ...post,
      id: post.id || Date.now(),
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    if (post.id) {
      // Update existing
      const index = posts.findIndex(p => p.id === post.id)
      if (index !== -1) {
        posts[index] = newPost
      }
    } else {
      // Create new
      posts.unshift(newPost)
    }
    safeSetItem('admin_blog_posts', posts)
    return newPost
  },

  deleteBlogPost: (id) => {
    const posts = storage.getBlogPosts()
    const filtered = posts.filter(post => post.id !== id)
    safeSetItem('admin_blog_posts', filtered)
  },

  // Testimonials
  getTestimonials: () => {
    return safeGetItem('admin_testimonials', [])
  },

  saveTestimonial: (testimonial) => {
    const testimonials = storage.getTestimonials()
    const newTestimonial = {
      ...testimonial,
      id: testimonial.id || Date.now(),
      createdAt: testimonial.createdAt || new Date().toISOString(),
    }
    if (testimonial.id) {
      // Update existing
      const index = testimonials.findIndex(t => t.id === testimonial.id)
      if (index !== -1) {
        testimonials[index] = newTestimonial
      }
    } else {
      // Create new
      testimonials.push(newTestimonial)
    }
    safeSetItem('admin_testimonials', testimonials)
    return newTestimonial
  },

  deleteTestimonial: (id) => {
    const testimonials = storage.getTestimonials()
    const filtered = testimonials.filter(t => t.id !== id)
    safeSetItem('admin_testimonials', filtered)
  },
}


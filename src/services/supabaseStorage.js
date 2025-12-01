import { supabase } from '../lib/supabase'
import { storage as localStorageService } from '../utils/storage'

/**
 * Service de stockage avec Supabase
 * Fallback automatique vers localStorage si Supabase n'est pas configuré
 */

const isSupabaseConfigured = () => {
  return !!(
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )
}

export const supabaseStorage = {
  // ========== LEADS ==========
  async getLeads() {
    if (!isSupabaseConfigured()) {
      return localStorageService.getLeads()
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur lors de la récupération des leads:', error)
        // Fallback vers localStorage en cas d'erreur
        return localStorageService.getLeads()
      }

      return data || []
    } catch (error) {
      console.error('Erreur Supabase:', error)
      return localStorageService.getLeads()
    }
  },

  async saveLead(lead) {
    if (!isSupabaseConfigured()) {
      console.log('⚠️ Supabase non configuré, sauvegarde dans localStorage')
      return localStorageService.saveLead(lead)
    }

    try {
      console.log('💾 Tentative de sauvegarde dans Supabase...', { name: lead.name, email: lead.email })
      
      const { data, error } = await supabase
        .from('leads')
        .insert({
          ...lead,
          status: lead.status || 'new',
        })
        .select()
        .single()

      if (error) {
        console.error('❌ Erreur lors de la sauvegarde du lead dans Supabase:', error)
        console.log('⚠️ Fallback vers localStorage...')
        // Fallback vers localStorage
        return localStorageService.saveLead(lead)
      }

      console.log('✅ Lead sauvegardé avec succès dans Supabase:', { id: data.id, name: data.name })
      return data
    } catch (error) {
      console.error('❌ Erreur Supabase:', error)
      console.log('⚠️ Fallback vers localStorage...')
      return localStorageService.saveLead(lead)
    }
  },

  async updateLeadStatus(id, status) {
    if (!isSupabaseConfigured()) {
      return localStorageService.updateLeadStatus(id, status)
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Erreur lors de la mise à jour du lead:', error)
        return localStorageService.updateLeadStatus(id, status)
      }

      return data
    } catch (error) {
      console.error('Erreur Supabase:', error)
      return localStorageService.updateLeadStatus(id, status)
    }
  },

  async deleteLead(id) {
    if (!isSupabaseConfigured()) {
      localStorageService.deleteLead(id)
      return
    }

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erreur lors de la suppression du lead:', error)
        localStorageService.deleteLead(id)
      }
    } catch (error) {
      console.error('Erreur Supabase:', error)
      localStorageService.deleteLead(id)
    }
  },

  // ========== BLOG POSTS ==========
  async getBlogPosts() {
    if (!isSupabaseConfigured()) {
      return localStorageService.getBlogPosts()
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur lors de la récupération des articles:', error)
        return localStorageService.getBlogPosts()
      }

      return data || []
    } catch (error) {
      console.error('Erreur Supabase:', error)
      return localStorageService.getBlogPosts()
    }
  },

  async saveBlogPost(post) {
    if (!isSupabaseConfigured()) {
      return localStorageService.saveBlogPost(post)
    }

    try {
      const postData = {
        ...post,
        updated_at: new Date().toISOString(),
      }

      let data, error

      if (post.id) {
        // Update existing
        const { data: updateData, error: updateError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id)
          .select()
          .single()
        data = updateData
        error = updateError
      } else {
        // Create new
        const { data: insertData, error: insertError } = await supabase
          .from('blog_posts')
          .insert(postData)
          .select()
          .single()
        data = insertData
        error = insertError
      }

      if (error) {
        console.error('Erreur lors de la sauvegarde de l\'article:', error)
        return localStorageService.saveBlogPost(post)
      }

      return data
    } catch (error) {
      console.error('Erreur Supabase:', error)
      return localStorageService.saveBlogPost(post)
    }
  },

  async deleteBlogPost(id) {
    if (!isSupabaseConfigured()) {
      localStorageService.deleteBlogPost(id)
      return
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erreur lors de la suppression de l\'article:', error)
        localStorageService.deleteBlogPost(id)
      }
    } catch (error) {
      console.error('Erreur Supabase:', error)
      localStorageService.deleteBlogPost(id)
    }
  },

  // ========== TESTIMONIALS ==========
  async getTestimonials() {
    if (!isSupabaseConfigured()) {
      return localStorageService.getTestimonials()
    }

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur lors de la récupération des témoignages:', error)
        return localStorageService.getTestimonials()
      }

      return data || []
    } catch (error) {
      console.error('Erreur Supabase:', error)
      return localStorageService.getTestimonials()
    }
  },

  async saveTestimonial(testimonial) {
    if (!isSupabaseConfigured()) {
      return localStorageService.saveTestimonial(testimonial)
    }

    try {
      const testimonialData = {
        ...testimonial,
        rating: testimonial.rating || 5,
      }

      let data, error

      if (testimonial.id) {
        // Update existing
        const { data: updateData, error: updateError } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', testimonial.id)
          .select()
          .single()
        data = updateData
        error = updateError
      } else {
        // Create new
        const { data: insertData, error: insertError } = await supabase
          .from('testimonials')
          .insert(testimonialData)
          .select()
          .single()
        data = insertData
        error = insertError
      }

      if (error) {
        console.error('Erreur lors de la sauvegarde du témoignage:', error)
        return localStorageService.saveTestimonial(testimonial)
      }

      return data
    } catch (error) {
      console.error('Erreur Supabase:', error)
      return localStorageService.saveTestimonial(testimonial)
    }
  },

  async deleteTestimonial(id) {
    if (!isSupabaseConfigured()) {
      localStorageService.deleteTestimonial(id)
      return
    }

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erreur lors de la suppression du témoignage:', error)
        localStorageService.deleteTestimonial(id)
      }
    } catch (error) {
      console.error('Erreur Supabase:', error)
      localStorageService.deleteTestimonial(id)
    }
  },
}


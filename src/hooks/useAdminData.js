import { useState, useEffect } from 'react'
import { supabaseStorage as storage } from '../services/supabaseStorage'
import { testimonials as defaultTestimonials } from '../data/testimonials'
import { blogPosts as defaultBlogPosts } from '../data/blog'

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials)

  useEffect(() => {
    try {
      // Charger depuis storage, fallback vers données par défaut
      const stored = storage.getTestimonials()
      if (stored && stored.length > 0) {
        setTestimonials(stored)
      } else {
        setTestimonials(defaultTestimonials)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des témoignages:', error)
      setTestimonials(defaultTestimonials)
    }
  }, [])

  return testimonials
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState(defaultBlogPosts)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Charger depuis storage, fallback vers données par défaut
        const stored = await storage.getBlogPosts()
        if (stored && stored.length > 0) {
          setPosts(stored)
        } else {
          setPosts(defaultBlogPosts)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des articles de blog:', error)
        setPosts(defaultBlogPosts)
      }
    }
    loadPosts()
  }, [])

  return posts
}


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Star, ArrowLeft } from 'lucide-react'

const getTestimonials = () => {
  const testimonials = localStorage.getItem('admin_testimonials')
  return testimonials ? JSON.parse(testimonials) : []
}

const saveTestimonials = (testimonials) => {
  localStorage.setItem('admin_testimonials', JSON.stringify(testimonials))
  // Sync avec le fichier de données principal si besoin
  const { testimonials: mainTestimonials } = require('../../data/testimonials')
  // Pour l'instant, on garde juste dans localStorage
}

export const AdminTestimonialsManager = () => {
  const navigate = useNavigate()
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = () => {
    const saved = getTestimonials()
    const main = require('../../data/testimonials').testimonials
    // Merge les deux sources
    const all = [...main, ...saved]
    // Remove duplicates by id
    const unique = Array.from(new Map(all.map(t => [t.id, t])).values())
    setTestimonials(unique.sort((a, b) => b.id - a.id))
  }

  const deleteTestimonial = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
      const updated = testimonials.filter(t => t.id !== id)
      setTestimonials(updated)
      saveTestimonials(updated.filter(t => t.id > 100)) // Garder seulement ceux ajoutés via admin (id > 100)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au Dashboard
            </button>
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Gestion des Avis Clients
            </h1>
            <p className="text-white/60">
              {testimonials.length} avis client{testimonials.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/testimonials/new')}
            className="flex items-center gap-2 px-6 py-3 bg-[#88A9C3] text-black font-bold hover:bg-white transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nouvel Avis
          </button>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length === 0 ? (
          <div className="border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-white/50 mb-6">Aucun avis client pour le moment</p>
            <button
              onClick={() => navigate('/admin/testimonials/new')}
              className="px-6 py-3 bg-[#88A9C3] text-black font-bold hover:bg-white transition-colors"
            >
              Ajouter le Premier Avis
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-2 border-[#88A9C3]/30 object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="font-mono text-xs text-[#88A9C3] mb-2">
                      {testimonial.role}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (testimonial.rating || 5)
                              ? 'text-[#88A9C3] fill-current'
                              : 'text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-white/80 mb-4 italic line-clamp-3">
                  "{testimonial.text}"
                </p>

                {testimonial.results && (
                  <p className="text-sm text-[#88A9C3] font-mono mb-4">
                    → {testimonial.results}
                  </p>
                )}

                <div className="flex gap-2 pt-4 border-t border-white/10">
                  {testimonial.id > 100 && (
                    <>
                      <button
                        onClick={() => navigate(`/admin/testimonials/edit/${testimonial.id}`)}
                        className="flex-1 px-4 py-2 border border-white/20 hover:border-[#88A9C3] hover:text-[#88A9C3] transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </button>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="px-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {testimonial.id <= 100 && (
                    <span className="text-xs text-white/30 font-mono">
                      Témoignage par défaut (non modifiable)
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


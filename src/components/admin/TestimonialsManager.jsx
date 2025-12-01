import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, Star, User } from 'lucide-react'
import { supabaseStorage as storage } from '../../services/supabaseStorage'

export const TestimonialsManager = ({ onUpdate }) => {
  const [testimonials, setTestimonials] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const allTestimonials = await storage.getTestimonials()
      const testimonialsArray = Array.isArray(allTestimonials) ? allTestimonials : []
      setTestimonials(testimonialsArray)
      onUpdate?.()
    } catch (error) {
      console.error('Erreur lors du chargement des témoignages:', error)
      setTestimonials([])
    }
  }

  const startEdit = (testimonial = null) => {
    setEditingTestimonial(testimonial || {
      name: '',
      role: '',
      avatar: '',
      rating: 5,
      text: '',
      results: '',
    })
    setIsEditing(true)
  }

  const saveTestimonial = () => {
    if (!editingTestimonial.name || !editingTestimonial.text) {
      alert('Le nom et le témoignage sont requis')
      return
    }

    // Generate avatar path if empty
    if (!editingTestimonial.avatar) {
      const nameLower = editingTestimonial.name.toLowerCase().replace(/\s+/g, '-')
      editingTestimonial.avatar = `/images/testimonials/${nameLower}.svg`
    }

    storage.saveTestimonial(editingTestimonial)
    loadTestimonials()
    setIsEditing(false)
    setEditingTestimonial(null)
  }

  const deleteTestimonial = (id) => {
    if (confirm('Supprimer ce témoignage définitivement ?')) {
      storage.deleteTestimonial(id)
      loadTestimonials()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-white">
          Gestion des Témoignages ({testimonials.length} témoignages)
        </h2>
        <button
          onClick={() => startEdit()}
          className="flex items-center gap-3 px-6 py-3 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all"
        >
          <Plus className="w-5 h-5" />
          Nouveau Témoignage
        </button>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <TestimonialEditor
            testimonial={editingTestimonial}
            onChange={setEditingTestimonial}
            onSave={saveTestimonial}
            onCancel={() => {
              setIsEditing(false)
              setEditingTestimonial(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Testimonials Grid */}
      {testimonials.length === 0 ? (
        <div className="border border-white/10 bg-white/5 p-12 text-center">
          <Star className="w-16 h-16 mx-auto mb-4 text-white/30" />
          <p className="text-white/50 font-mono mb-6">Aucun témoignage</p>
          <button
            onClick={() => startEdit()}
            className="px-6 py-3 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all"
          >
            Ajouter le premier témoignage
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D9FF00]/30 flex-shrink-0">
                  {testimonial.avatar ? (
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#D9FF00]/10 flex items-center justify-center">
                      <User className="w-8 h-8 text-[#D9FF00]" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="font-mono text-sm text-[#D9FF00]">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#D9FF00] fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-white/80 mb-3 italic">
                    "{testimonial.text}"
                  </p>

                    {testimonial.results && (
                      <p className="font-mono text-xs text-white/50">
                        {'>'} Résultat : {testimonial.results}
                      </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => startEdit(testimonial)}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-mono text-xs flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

const TestimonialEditor = ({ testimonial, onChange, onSave, onCancel }) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="fixed inset-4 md:inset-12 lg:inset-20 bg-surface border border-white/10 z-50 overflow-y-auto"
      >
        <div className="p-8 max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-white">
              {testimonial.id ? 'Modifier' : 'Créer'} un Témoignage
            </h2>
            <button
              onClick={onCancel}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                  Nom *
                </label>
                <input
                  type="text"
                  value={testimonial.name}
                  onChange={(e) => onChange({ ...testimonial, name: e.target.value })}
                  className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors"
                  placeholder="Pierre"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                  Rôle / Profession *
                </label>
                <input
                  type="text"
                  value={testimonial.role}
                  onChange={(e) => onChange({ ...testimonial, role: e.target.value })}
                  className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors"
                  placeholder="Avocat"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                URL Avatar (ou chemin)
              </label>
              <input
                type="text"
                value={testimonial.avatar}
                onChange={(e) => onChange({ ...testimonial, avatar: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors font-mono"
                placeholder="/images/testimonials/pierre.svg"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                Témoignage *
              </label>
              <textarea
                value={testimonial.text}
                onChange={(e) => onChange({ ...testimonial, text: e.target.value })}
                rows={5}
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors resize-none"
                placeholder="Mon ancien site datait de 2014. Résultat : +230% de demandes..."
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                Résultat / Statistique
              </label>
              <input
                type="text"
                value={testimonial.results}
                onChange={(e) => onChange({ ...testimonial, results: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors"
                placeholder="+230% demandes de rendez-vous"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                Note (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => onChange({ ...testimonial, rating })}
                    className={`w-12 h-12 flex items-center justify-center border transition-all ${
                      testimonial.rating >= rating
                        ? 'bg-[#D9FF00] border-[#D9FF00] text-black'
                        : 'bg-white/5 border-white/20 text-white/50'
                    }`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
            <button
              onClick={onSave}
              className="flex-1 px-6 py-4 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              Enregistrer
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-4 border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              Annuler
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}


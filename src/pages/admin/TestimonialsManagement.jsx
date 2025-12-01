import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Edit2, Trash2, Star, Save, X } from 'lucide-react'

export const TestimonialsManagement = () => {
  const navigate = useNavigate()
  const [testimonials, setTestimonials] = useState([])
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    avatar: '',
    rating: 5,
    text: '',
    results: '',
  })

  useEffect(() => {
    if (!localStorage.getItem('admin_authenticated')) {
      navigate('/admin/login')
      return
    }
    loadTestimonials()
  }, [navigate])

  const loadTestimonials = () => {
    // Charger depuis localStorage ou depuis testimonials.js
    const stored = JSON.parse(localStorage.getItem('admin_testimonials') || '[]')
    if (stored.length === 0) {
      // Importer les témoignages initiaux
      import('../../data/testimonials').then(({ testimonials: initialTestimonials }) => {
        setTestimonials(initialTestimonials)
        localStorage.setItem('admin_testimonials', JSON.stringify(initialTestimonials))
      })
    } else {
      setTestimonials(stored)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingTestimonial) {
      // Modifier
      const updated = testimonials.map(t => 
        t.id === editingTestimonial.id 
          ? { ...t, ...formData, updatedAt: new Date().toISOString() }
          : t
      )
      setTestimonials(updated)
      localStorage.setItem('admin_testimonials', JSON.stringify(updated))
      setEditingTestimonial(null)
    } else {
      // Créer
      const newTestimonial = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      }
      const updated = [...testimonials, newTestimonial]
      setTestimonials(updated)
      localStorage.setItem('admin_testimonials', JSON.stringify(updated))
    }
    
    setFormData({
      name: '',
      role: '',
      avatar: '/images/testimonials/default.svg',
      rating: 5,
      text: '',
      results: '',
    })
    setShowForm(false)
    
    // Recharger les témoignages dans le site principal
    window.dispatchEvent(new Event('testimonialsUpdated'))
  }

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      avatar: testimonial.avatar,
      rating: testimonial.rating,
      text: testimonial.text,
      results: testimonial.results,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Supprimer cet avis ?')) {
      const updated = testimonials.filter(t => t.id !== id)
      setTestimonials(updated)
      localStorage.setItem('admin_testimonials', JSON.stringify(updated))
      window.dispatchEvent(new Event('testimonialsUpdated'))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-white hover:text-[#D9FF00] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono text-sm">Retour</span>
          </button>
          <h1 className="font-display text-xl font-bold text-white">
            Gestion des <span className="text-[#D9FF00]">Avis Clients</span>
          </h1>
          <button
            onClick={() => {
              setEditingTestimonial(null)
              setShowForm(!showForm)
              setFormData({
                name: '',
                role: '',
                avatar: '/images/testimonials/default.svg',
                rating: 5,
                text: '',
                results: '',
              })
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="font-mono text-sm">Nouvel Avis</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-white/10 bg-white/5 p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-white">
                {editingTestimonial ? 'Modifier l\'Avis' : 'Nouvel Avis Client'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingTestimonial(null)
                }}
                className="text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Nom du client"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00]"
                />
                <input
                  type="text"
                  required
                  placeholder="Rôle / Profession"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00]"
                />
                <input
                  type="text"
                  placeholder="URL Avatar (ex: /images/testimonials/pierre.svg)"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] font-mono text-sm"
                />
                <div>
                  <label className="block font-mono text-xs text-white/70 uppercase mb-2">Note</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`${formData.rating >= star ? 'text-[#D9FF00]' : 'text-white/30'} transition-colors`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <textarea
                required
                placeholder="Témoignage / Avis"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] h-32"
              />
              <input
                type="text"
                placeholder="Résultats (ex: +230% demandes de rendez-vous)"
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingTestimonial ? 'Enregistrer' : 'Créer l\'Avis'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Testimonials List */}
        <div className="space-y-4">
          {testimonials.length === 0 ? (
            <div className="text-center py-20 border border-white/10 bg-white/5">
              <p className="text-white/50 font-mono">Aucun avis pour le moment</p>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    {testimonial.avatar && (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-[#D9FF00]/30"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="font-display text-xl font-bold text-white mb-1">
                        {testimonial.name}
                      </div>
                      <div className="font-mono text-sm text-[#D9FF00] mb-3">
                        {testimonial.role}
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-[#D9FF00] fill-current' : 'text-white/20'}`}
                          />
                        ))}
                      </div>
                      <p className="text-white/80 mb-2">"{testimonial.text}"</p>
                      {testimonial.results && (
                        <p className="font-mono text-sm text-white/50">
                          > Résultat : {testimonial.results}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2 border border-white/10 hover:border-[#D9FF00] hover:text-[#D9FF00] transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 border border-white/10 hover:border-red-500 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}


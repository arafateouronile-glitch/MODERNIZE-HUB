import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Upload, Star } from 'lucide-react'

const getTestimonials = () => {
  const testimonials = localStorage.getItem('admin_testimonials')
  return testimonials ? JSON.parse(testimonials) : []
}

const saveTestimonials = (testimonials) => {
  localStorage.setItem('admin_testimonials', JSON.stringify(testimonials))
}

export const AdminTestimonialEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = id === 'new'

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    results: '',
    rating: 5,
    avatar: '/images/testimonials/default.svg',
  })

  useEffect(() => {
    if (!isNew) {
      const testimonials = getTestimonials()
      const testimonial = testimonials.find(t => t.id === parseInt(id))
      if (testimonial) {
        setFormData(testimonial)
      }
    }
  }, [id, isNew])

  const handleSubmit = (e) => {
    e.preventDefault()

    const testimonials = getTestimonials()
    const testimonialData = {
      ...formData,
      id: isNew ? Date.now() : parseInt(id),
      rating: parseInt(formData.rating),
    }

    if (isNew) {
      testimonials.push(testimonialData)
    } else {
      const index = testimonials.findIndex(t => t.id === parseInt(id))
      if (index !== -1) {
        testimonials[index] = testimonialData
      }
    }

    saveTestimonials(testimonials)
    navigate('/admin/testimonials')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/testimonials')}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </button>
          <h1 className="font-display text-4xl font-bold text-white">
            {isNew ? 'Nouvel Avis Client' : 'Modifier l\'Avis'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-2 border-[#88A9C3]/30 overflow-hidden bg-white/5">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30">
                  <Upload className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
                URL de l'Avatar (ou chemin local)
              </label>
              <input
                type="text"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors font-mono text-sm"
                placeholder="/images/testimonials/nom.svg"
              />
            </div>
          </div>

          {/* Name & Role */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
                Nom du Client *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors"
                placeholder="Pierre"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
                Profession / Rôle *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors"
                placeholder="Avocat"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
              Note (1-5) *
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                max="5"
                required
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-20 bg-black/50 border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-[#88A9C3] transition-colors"
              />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 cursor-pointer transition-colors ${
                      i < formData.rating
                        ? 'text-[#88A9C3] fill-current'
                        : 'text-white/20'
                    }`}
                    onClick={() => setFormData({ ...formData, rating: i + 1 })}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial Text */}
          <div>
            <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
              Témoignage *
            </label>
            <textarea
              required
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              rows={5}
              className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors resize-none"
              placeholder="Le témoignage complet du client..."
            />
          </div>

          {/* Results */}
          <div>
            <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
              Résultats (optionnel)
            </label>
            <input
              type="text"
              value={formData.results}
              onChange={(e) => setFormData({ ...formData, results: e.target.value })}
              className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors"
              placeholder="+230% demandes de rendez-vous"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-4 bg-[#88A9C3] text-black font-bold hover:bg-white transition-colors"
            >
              <Save className="w-5 h-5" />
              {isNew ? 'Ajouter l\'Avis' : 'Enregistrer les Modifications'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/testimonials')}
              className="px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


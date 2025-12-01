import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, Plus, X } from 'lucide-react'

export const AppointmentsManagement = () => {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [filter, setFilter] = useState('upcoming')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
  })

  useEffect(() => {
    if (!localStorage.getItem('admin_authenticated')) {
      navigate('/admin/login')
      return
    }
    loadAppointments()
  }, [navigate])

  const loadAppointments = () => {
    const stored = JSON.parse(localStorage.getItem('admin_appointments') || '[]')
    setAppointments(stored.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAppointment = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    }
    const updated = [...appointments, newAppointment]
    setAppointments(updated)
    localStorage.setItem('admin_appointments', JSON.stringify(updated))
    setFormData({ name: '', email: '', phone: '', date: '', time: '', notes: '' })
    setShowForm(false)
  }

  const deleteAppointment = (id) => {
    if (confirm('Supprimer ce rendez-vous ?')) {
      const updated = appointments.filter(a => a.id !== id)
      setAppointments(updated)
      localStorage.setItem('admin_appointments', JSON.stringify(updated))
    }
  }

  const filteredAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date + 'T' + apt.time)
    const now = new Date()
    
    if (filter === 'upcoming') return aptDate > now
    if (filter === 'past') return aptDate < now
    return true
  })

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
            Gestion des <span className="text-[#D9FF00]">Rendez-vous</span>
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="font-mono text-sm">Ajouter</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Add Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-white/10 bg-white/5 p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-white">Nouveau Rendez-vous</h2>
              <button
                onClick={() => setShowForm(false)}
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
                  placeholder="Nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00]"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00]"
                />
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00]"
                />
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00]"
                />
              </div>
              <textarea
                placeholder="Notes (optionnel)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] h-24"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all"
              >
                Créer le Rendez-vous
              </button>
            </form>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {['upcoming', 'past', 'all'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 font-mono text-sm uppercase transition-all ${
                filter === f
                  ? 'bg-[#D9FF00] text-black'
                  : 'border border-white/10 text-white hover:bg-white/5'
              }`}
            >
              {f === 'upcoming' ? 'À Venir' : f === 'past' ? 'Passés' : 'Tous'}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-20 border border-white/10 bg-white/5">
              <p className="text-white/50 font-mono">Aucun rendez-vous pour le moment</p>
            </div>
          ) : (
            filteredAppointments.map((apt) => {
              const aptDate = new Date(apt.date + 'T' + apt.time)
              const isPast = aptDate < new Date()
              
              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border ${isPast ? 'border-white/5' : 'border-[#D9FF00]/30'} bg-white/5 p-6`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-display text-xl font-bold text-white mb-2">
                        {apt.name}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {apt.email}
                        </div>
                        {apt.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {apt.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteAppointment(apt.id)}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-white/80">
                      <Calendar className="w-5 h-5 text-[#D9FF00]" />
                      <span className="font-mono">
                        {new Date(apt.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long',
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Clock className="w-5 h-5 text-[#D9FF00]" />
                      <span className="font-mono">{apt.time}</span>
                    </div>
                  </div>

                  {apt.notes && (
                    <div className="p-4 bg-black/30 border border-white/10">
                      <p className="text-white/70 text-sm">{apt.notes}</p>
                    </div>
                  )}
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}


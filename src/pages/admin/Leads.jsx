import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, Check, X, Eye, Trash2 } from 'lucide-react'

const getLeads = () => {
  const leads = localStorage.getItem('admin_leads')
  return leads ? JSON.parse(leads) : []
}

const saveLeads = (leads) => {
  localStorage.setItem('admin_leads', JSON.stringify(leads))
}

export const AdminLeads = () => {
  const [leads, setLeads] = useState([])
  const [selectedLead, setSelectedLead] = useState(null)
  const [filter, setFilter] = useState('all') // all, unread, read

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = () => {
    const savedLeads = getLeads()
    setLeads(savedLeads.sort((a, b) => new Date(b.date) - new Date(a.date)))
  }

  const markAsRead = (id) => {
    const updated = leads.map(lead =>
      lead.id === id ? { ...lead, read: true } : lead
    )
    setLeads(updated)
    saveLeads(updated)
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, read: true })
    }
  }

  const deleteLead = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      const updated = leads.filter(lead => lead.id !== id)
      setLeads(updated)
      saveLeads(updated)
      if (selectedLead?.id === id) {
        setSelectedLead(null)
      }
    }
  }

  const filteredLeads = leads.filter(lead => {
    if (filter === 'unread') return !lead.read
    if (filter === 'read') return lead.read
    return true
  })

  const unreadCount = leads.filter(l => !l.read).length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Demandes de Devis & Rendez-vous
            </h1>
            <p className="text-white/60">
              {leads.length} demande{leads.length > 1 ? 's' : ''} au total
              {unreadCount > 0 && (
                <span className="ml-2 text-[#D9FF00]">• {unreadCount} non lue{unreadCount > 1 ? 's' : ''}</span>
              )}
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {['all', 'unread', 'read'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 border font-mono text-xs uppercase transition-all ${
                  filter === f
                    ? 'border-[#D9FF00] bg-[#D9FF00]/10 text-[#D9FF00]'
                    : 'border-white/20 text-white/60 hover:border-white/40'
                }`}
              >
                {f === 'all' ? 'Toutes' : f === 'unread' ? 'Non lues' : 'Lues'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          {/* Leads List */}
          <div className="space-y-3">
            {filteredLeads.length === 0 ? (
              <div className="border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-white/50">Aucune demande pour le moment</p>
              </div>
            ) : (
              filteredLeads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setSelectedLead(lead)
                    if (!lead.read) markAsRead(lead.id)
                  }}
                  className={`border p-4 cursor-pointer transition-all ${
                    selectedLead?.id === lead.id
                      ? 'border-[#D9FF00] bg-[#D9FF00]/10'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  } ${!lead.read ? 'border-l-4 border-l-[#D9FF00]' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        {lead.name || lead.siteUrl || 'Sans nom'}
                      </h3>
                      <p className="text-xs text-white/50 font-mono">
                        {new Date(lead.date).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    {!lead.read && (
                      <div className="w-3 h-3 rounded-full bg-[#D9FF00] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-white/70 line-clamp-2">
                    {lead.message || lead.type || 'Demande de devis'}
                  </p>
                </motion.div>
              ))
            )}
          </div>

          {/* Lead Detail */}
          <div className="border border-white/10 bg-white/5 p-8">
            {selectedLead ? (
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-white mb-2">
                      Détails de la Demande
                    </h2>
                    <p className="text-white/50 font-mono text-sm">
                      {new Date(selectedLead.date).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteLead(selectedLead.id)}
                      className="p-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {selectedLead.name && (
                    <div className="border border-white/10 p-4">
                      <div className="font-mono text-xs text-white/50 uppercase mb-1">Nom</div>
                      <div className="text-white font-semibold">{selectedLead.name}</div>
                    </div>
                  )}
                  {selectedLead.email && (
                    <div className="border border-white/10 p-4">
                      <div className="font-mono text-xs text-white/50 uppercase mb-1 flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        Email
                      </div>
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="text-[#D9FF00] hover:underline"
                      >
                        {selectedLead.email}
                      </a>
                    </div>
                  )}
                  {selectedLead.phone && (
                    <div className="border border-white/10 p-4">
                      <div className="font-mono text-xs text-white/50 uppercase mb-1 flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        Téléphone
                      </div>
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="text-[#D9FF00] hover:underline"
                      >
                        {selectedLead.phone}
                      </a>
                    </div>
                  )}
                  {selectedLead.siteUrl && (
                    <div className="border border-white/10 p-4">
                      <div className="font-mono text-xs text-white/50 uppercase mb-1">Site Web</div>
                      <a
                        href={selectedLead.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D9FF00] hover:underline"
                      >
                        {selectedLead.siteUrl}
                      </a>
                    </div>
                  )}
                  {selectedLead.type && (
                    <div className="border border-white/10 p-4">
                      <div className="font-mono text-xs text-white/50 uppercase mb-1">Type</div>
                      <div className="text-white">{selectedLead.type}</div>
                    </div>
                  )}
                  {selectedLead.budget && (
                    <div className="border border-white/10 p-4">
                      <div className="font-mono text-xs text-white/50 uppercase mb-1">Budget</div>
                      <div className="text-white font-semibold">{selectedLead.budget}€</div>
                    </div>
                  )}
                </div>

                {/* Message */}
                {selectedLead.message && (
                  <div className="border border-white/10 p-4 mb-6">
                    <div className="font-mono text-xs text-white/50 uppercase mb-3">Message</div>
                    <p className="text-white/80 whitespace-pre-wrap">{selectedLead.message}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  {selectedLead.email && (
                    <a
                      href={`mailto:${selectedLead.email}?subject=Re: Votre demande de devis - Modernize Hub`}
                      className="px-6 py-3 bg-[#D9FF00] text-black font-bold hover:bg-white transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Répondre par Email
                    </a>
                  )}
                  {!selectedLead.read && (
                    <button
                      onClick={() => markAsRead(selectedLead.id)}
                      className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Marquer comme Lu
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <Eye className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">Sélectionnez une demande pour voir les détails</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


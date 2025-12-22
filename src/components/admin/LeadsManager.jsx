import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, Check, X, Trash2, Eye, Clock } from 'lucide-react'
import { supabaseStorage as storage } from '../../services/supabaseStorage'

const statusColors = {
  new: 'bg-[#88A9C3] text-black',
  contacted: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  qualified: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  converted: 'bg-green-500/20 text-green-400 border border-green-500/30',
  lost: 'bg-red-500/20 text-red-400 border border-red-500/30',
}

const statusLabels = {
  new: 'Nouveau',
  contacted: 'Contacté',
  qualified: 'Qualifié',
  converted: 'Converti',
  lost: 'Perdu',
}

export const LeadsManager = ({ onUpdate }) => {
  const [leads, setLeads] = useState([])
  const [filter, setFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState(null)

  useEffect(() => {
    loadLeads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadLeads = async () => {
    try {
      const allLeads = await storage.getLeads()
      const leadsArray = Array.isArray(allLeads) ? allLeads : []
      setLeads(leadsArray)
      onUpdate?.()
    } catch (error) {
      console.error('Erreur lors du chargement des leads:', error)
      setLeads([])
    }
  }

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filter)

  const updateStatus = (id, status) => {
    storage.updateLeadStatus(id, status)
    loadLeads()
  }

  const deleteLead = (id) => {
    if (confirm('Supprimer ce lead définitivement ?')) {
      storage.deleteLead(id)
      loadLeads()
      if (selectedLead?.id === id) {
        setSelectedLead(null)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {['all', 'new', 'contacted', 'qualified', 'converted', 'lost'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-mono text-sm transition-all ${
              filter === status
                ? 'bg-[#88A9C3] text-black font-bold'
                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            {status === 'all' ? 'Tous' : statusLabels[status]} ({status === 'all' ? leads.length : leads.filter(l => l.status === status).length})
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="border border-white/10 bg-white/5 p-12 text-center">
              <p className="text-white/50 font-mono">Aucun lead trouvé</p>
            </div>
          ) : (
            filteredLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedLead(lead)}
                className={`border p-4 cursor-pointer transition-all ${
                  selectedLead?.id === lead.id
                    ? 'border-[#88A9C3] bg-[#88A9C3]/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-1">
                      {lead.name || lead.clientName || 'Sans nom'}
                    </h3>
                    {lead.email && (
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Mail className="w-4 h-4" />
                        {lead.email}
                      </div>
                    )}
                    {lead.phone && (
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Phone className="w-4 h-4" />
                        {lead.phone}
                      </div>
                    )}
                  </div>
                  <span className={`px-3 py-1 font-mono text-xs ${statusColors[lead.status] || statusColors.new}`}>
                    {statusLabels[lead.status] || 'Nouveau'}
                  </span>
                </div>

                {lead.message && (
                  <p className="text-sm text-white/60 mb-3 line-clamp-2">
                    {lead.message}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                  {lead.type && (
                    <span className="font-mono uppercase">
                      {lead.type === 'quote' ? 'Devis' : 'Rendez-vous'}
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Lead Details Panel */}
        <div className="border border-white/10 bg-white/5 p-6 sticky top-6 h-fit">
          {selectedLead ? (
            <LeadDetails
              lead={selectedLead}
              onUpdateStatus={updateStatus}
              onDelete={deleteLead}
              onClose={() => setSelectedLead(null)}
            />
          ) : (
            <div className="text-center text-white/50 py-12">
              <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-mono text-sm">Sélectionnez un lead pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const LeadDetails = ({ lead, onUpdateStatus, onDelete, onClose }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-white">Détails</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Info */}
      <div className="space-y-4">
        <div>
          <label className="font-mono text-xs text-white/50 uppercase mb-1 block">
            Nom
          </label>
          <p className="text-white">{lead.name || lead.clientName || 'N/A'}</p>
        </div>

        {lead.email && (
          <div>
            <label className="font-mono text-xs text-white/50 uppercase mb-1 block">
              Email
            </label>
            <a href={`mailto:${lead.email}`} className="text-[#88A9C3] hover:underline">
              {lead.email}
            </a>
          </div>
        )}

        {lead.phone && (
          <div>
            <label className="font-mono text-xs text-white/50 uppercase mb-1 block">
              Téléphone
            </label>
            <a href={`tel:${lead.phone}`} className="text-[#88A9C3] hover:underline">
              {lead.phone}
            </a>
          </div>
        )}

        {lead.budget && (
          <div>
            <label className="font-mono text-xs text-white/50 uppercase mb-1 block">
              Budget
            </label>
            <p className="text-white">{lead.budget}</p>
          </div>
        )}

        {lead.message && (
          <div>
            <label className="font-mono text-xs text-white/50 uppercase mb-1 block">
              Message
            </label>
            <p className="text-white/80 whitespace-pre-wrap">{lead.message}</p>
          </div>
        )}

        <div>
          <label className="font-mono text-xs text-white/50 uppercase mb-1 block">
            Date de réception
          </label>
          <p className="text-white/80">
            {new Date(lead.createdAt).toLocaleString('fr-FR')}
          </p>
        </div>
      </div>

      {/* Status Actions */}
      <div>
        <label className="font-mono text-xs text-white/50 uppercase mb-3 block">
          Changer le statut
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(statusLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => onUpdateStatus(lead.id, key)}
              className={`px-3 py-2 text-xs font-mono transition-all ${
                lead.status === key
                  ? 'bg-[#88A9C3] text-black font-bold'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-white/10">
        <button
          onClick={() => onDelete(lead.id)}
          className="flex-1 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all font-mono text-sm"
        >
          <Trash2 className="w-4 h-4 inline-block mr-2" />
          Supprimer
        </button>
      </div>
    </div>
  )
}


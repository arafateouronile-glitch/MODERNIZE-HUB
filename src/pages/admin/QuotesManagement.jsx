import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, X, Eye, Clock, CheckCircle } from 'lucide-react'

export const QuotesManagement = () => {
  const navigate = useNavigate()
  const [quotes, setQuotes] = useState([])
  const [filter, setFilter] = useState('all')
  const [selectedQuote, setSelectedQuote] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem('admin_authenticated')) {
      navigate('/admin/login')
      return
    }
    loadQuotes()
  }, [navigate])

  const loadQuotes = () => {
    const stored = JSON.parse(localStorage.getItem('admin_quotes') || '[]')
    setQuotes(stored.sort((a, b) => new Date(b.date) - new Date(a.date)))
  }

  const updateQuoteStatus = (id, status) => {
    const updated = quotes.map(q => q.id === id ? { ...q, status, updatedAt: new Date().toISOString() } : q)
    setQuotes(updated)
    localStorage.setItem('admin_quotes', JSON.stringify(updated))
    setSelectedQuote(null)
  }

  const deleteQuote = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      const updated = quotes.filter(q => q.id !== id)
      setQuotes(updated)
      localStorage.setItem('admin_quotes', JSON.stringify(updated))
    }
  }

  const filteredQuotes = filter === 'all' 
    ? quotes 
    : quotes.filter(q => q.status === filter)

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    accepted: quotes.filter(q => q.status === 'accepted').length,
    rejected: quotes.filter(q => q.status === 'rejected').length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
            Gestion des <span className="text-[#D9FF00]">Devis</span>
          </h1>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="border border-white/10 bg-white/5 p-4">
            <div className="font-display text-3xl font-bold text-white mb-1">{stats.total}</div>
            <div className="font-mono text-xs text-white/50 uppercase">Total</div>
          </div>
          <div className="border border-yellow-500/30 bg-yellow-500/10 p-4">
            <div className="font-display text-3xl font-bold text-yellow-400 mb-1">{stats.pending}</div>
            <div className="font-mono text-xs text-white/50 uppercase">En Attente</div>
          </div>
          <div className="border border-green-500/30 bg-green-500/10 p-4">
            <div className="font-display text-3xl font-bold text-green-400 mb-1">{stats.accepted}</div>
            <div className="font-mono text-xs text-white/50 uppercase">Acceptés</div>
          </div>
          <div className="border border-red-500/30 bg-red-500/10 p-4">
            <div className="font-display text-3xl font-bold text-red-400 mb-1">{stats.rejected}</div>
            <div className="font-mono text-xs text-white/50 uppercase">Refusés</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {['all', 'pending', 'accepted', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all ${
                filter === status
                  ? 'bg-[#D9FF00] text-black'
                  : 'border border-white/10 text-white hover:bg-white/5'
              }`}
            >
              {status === 'all' ? 'Tous' : status === 'pending' ? 'En Attente' : status === 'accepted' ? 'Acceptés' : 'Refusés'}
            </button>
          ))}
        </div>

        {/* Quotes List */}
        <div className="space-y-4">
          {filteredQuotes.length === 0 ? (
            <div className="text-center py-20 border border-white/10 bg-white/5">
              <p className="text-white/50 font-mono">Aucune demande pour le moment</p>
            </div>
          ) : (
            filteredQuotes.map((quote) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-display text-xl font-bold text-white mb-2">
                      {quote.name}
                    </div>
                    <div className="font-mono text-sm text-white/60">
                      {quote.email} • {quote.phone || 'Pas de téléphone'}
                    </div>
                    <div className="font-mono text-xs text-white/40 mt-2">
                      {new Date(quote.date).toLocaleDateString('fr-FR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 font-mono text-xs uppercase ${
                      quote.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      quote.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {quote.status === 'pending' ? 'En Attente' : quote.status === 'accepted' ? 'Accepté' : 'Refusé'}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="font-mono text-xs text-white/50 uppercase mb-2">Budget</div>
                  <div className="text-[#D9FF00] font-bold">{quote.budget || 'Non spécifié'}</div>
                </div>

                {quote.message && (
                  <div className="mb-4 p-4 bg-black/30 border border-white/10">
                    <div className="font-mono text-xs text-white/50 uppercase mb-2">Message</div>
                    <p className="text-white/80 text-sm leading-relaxed">{quote.message}</p>
                  </div>
                )}

                {quote.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateQuoteStatus(quote.id, 'accepted')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-all font-mono text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accepter
                    </button>
                    <button
                      onClick={() => updateQuoteStatus(quote.id, 'rejected')}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all font-mono text-sm"
                    >
                      <X className="w-4 h-4" />
                      Refuser
                    </button>
                    <button
                      onClick={() => deleteQuote(quote.id)}
                      className="px-4 py-2 border border-white/10 text-white/50 hover:text-red-400 hover:border-red-500/30 transition-all font-mono text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                )}

                {quote.status !== 'pending' && (
                  <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                    {quote.status === 'accepted' && <CheckCircle className="w-4 h-4 text-green-400" />}
                    {quote.status === 'rejected' && <X className="w-4 h-4 text-red-400" />}
                    Mis à jour le {quote.updatedAt ? new Date(quote.updatedAt).toLocaleDateString('fr-FR') : 'N/A'}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}


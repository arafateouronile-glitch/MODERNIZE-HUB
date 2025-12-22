import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Calendar, MessageSquare, Star, TrendingUp, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Simuler des données (remplacer par vraie API)
const getStats = () => {
  const quotes = JSON.parse(localStorage.getItem('admin_quotes') || '[]')
  const appointments = JSON.parse(localStorage.getItem('admin_appointments') || '[]')
  const testimonials = JSON.parse(localStorage.getItem('admin_testimonials') || '[]')
  
  return {
    totalQuotes: quotes.length,
    pendingQuotes: quotes.filter(q => q.status === 'pending').length,
    totalAppointments: appointments.length,
    upcomingAppointments: appointments.filter(a => new Date(a.date) > new Date()).length,
    totalTestimonials: testimonials.length,
    conversionRate: quotes.length > 0 ? ((quotes.filter(q => q.status === 'accepted').length / quotes.length) * 100).toFixed(1) : 0,
  }
}

export const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState(getStats())

  useEffect(() => {
    // Vérifier l'authentification
    if (!localStorage.getItem('admin_authenticated')) {
      navigate('/admin/login')
      return
    }

    // Actualiser les stats toutes les 5 secondes
    const interval = setInterval(() => {
      setStats(getStats())
    }, 5000)

    return () => clearInterval(interval)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_email')
    navigate('/admin/login')
  }

  const statCards = [
    {
      icon: FileText,
      label: 'Demandes de Devis',
      value: stats.totalQuotes,
      subvalue: `${stats.pendingQuotes} en attente`,
      color: 'text-[#88A9C3]',
      bg: 'bg-[#88A9C3]/10',
      border: 'border-[#88A9C3]/30',
      onClick: () => navigate('/admin/quotes'),
    },
    {
      icon: Calendar,
      label: 'Rendez-vous',
      value: stats.totalAppointments,
      subvalue: `${stats.upcomingAppointments} à venir`,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/30',
      onClick: () => navigate('/admin/appointments'),
    },
    {
      icon: Star,
      label: 'Avis Clients',
      value: stats.totalTestimonials,
      subvalue: 'Gérés',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-400/30',
      onClick: () => navigate('/admin/testimonials'),
    },
    {
      icon: TrendingUp,
      label: 'Taux de Conversion',
      value: `${stats.conversionRate}%`,
      subvalue: 'Devis acceptés',
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      border: 'border-green-400/30',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">
              ADMIN <span className="text-[#88A9C3]">DASHBOARD</span>
            </h1>
            <p className="font-mono text-xs text-white/50">
              {localStorage.getItem('admin_email')}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white/20 text-white hover:bg-white/10 transition-colors font-mono text-sm"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h2 className="font-display text-4xl font-bold text-white mb-2">
            Tableau de Bord
          </h2>
          <p className="text-white/60 font-light">
            Gérez vos demandes, rendez-vous, blog et avis clients en un seul endroit.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={stat.onClick}
              className={`border-2 ${stat.border} ${stat.bg} p-6 cursor-pointer hover:scale-105 transition-transform ${stat.onClick ? '' : 'cursor-default'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                {stat.onClick && (
                  <span className="text-xs text-white/50 font-mono">→</span>
                )}
              </div>
              <div className={`font-display text-4xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="font-mono text-xs text-white/60 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="font-mono text-xs text-white/40 mt-2">
                {stat.subvalue}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Gérer les Devis', path: '/admin/quotes', icon: FileText },
            { label: 'Gérer les Rendez-vous', path: '/admin/appointments', icon: Calendar },
            { label: 'Gérer le Blog', path: '/admin/blog', icon: MessageSquare },
            { label: 'Gérer les Avis', path: '/admin/testimonials', icon: Star },
          ].map((action, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => navigate(action.path)}
              className="border border-white/10 bg-white/5 p-8 text-left hover:bg-white/10 hover:border-[#88A9C3]/30 transition-all group"
            >
              <action.icon className="w-8 h-8 text-[#88A9C3] mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-display text-xl font-bold text-white mb-2">
                {action.label}
              </div>
              <div className="font-mono text-xs text-white/50">
                Cliquer pour accéder →
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

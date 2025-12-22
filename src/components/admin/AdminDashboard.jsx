import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, FileText, MessageSquare, Star, BarChart3, Menu, X } from 'lucide-react'
import { LeadsManager } from './LeadsManager'
import { BlogManager } from './BlogManager'
import { TestimonialsManager } from './TestimonialsManager'
import { supabaseStorage as storage } from '../../services/supabaseStorage'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'leads', label: 'Leads & Devis', icon: FileText },
  { id: 'blog', label: 'Gestion Blog', icon: MessageSquare },
  { id: 'testimonials', label: 'Témoignages', icon: Star },
]

export const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    totalPosts: 0,
    totalTestimonials: 0,
  })

  useEffect(() => {
    loadStats()
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadStats = async () => {
    try {
      const leads = await storage.getLeads() || []
      const posts = await storage.getBlogPosts() || []
      const testimonials = await storage.getTestimonials() || []

      // S'assurer que ce sont des tableaux
      const leadsArray = Array.isArray(leads) ? leads : []
      const postsArray = Array.isArray(posts) ? posts : []
      const testimonialsArray = Array.isArray(testimonials) ? testimonials : []

      setStats({
        totalLeads: leadsArray.length,
        newLeads: leadsArray.filter(l => l?.status === 'new').length,
        totalPosts: postsArray.length,
        totalTestimonials: testimonialsArray.length,
      })
    } catch (error) {
      console.error('Erreur lors du chargement des stats:', error)
      setStats({
        totalLeads: 0,
        newLeads: 0,
        totalPosts: 0,
        totalTestimonials: 0,
      })
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'leads':
        return <LeadsManager onUpdate={loadStats} />
      case 'blog':
        return <BlogManager onUpdate={loadStats} />
      case 'testimonials':
        return <TestimonialsManager onUpdate={loadStats} />
      default:
        return <DashboardHome stats={stats} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed md:relative h-screen w-64 bg-surface border-r border-white/10 z-30 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white">
              ADMIN
            </h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20 transition-all font-mono text-sm"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-[#88A9C3] text-black font-bold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-mono text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <p className="font-mono text-xs text-white/40 text-center">
            Modernize Hub © 2025
          </p>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-surface border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-display text-2xl font-bold text-white capitalize">
            {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

// Dashboard Home Component
const DashboardHome = ({ stats }) => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', value: stats.totalLeads, color: 'text-blue-400' },
          { label: 'Nouveaux Leads', value: stats.newLeads, color: 'text-[#88A9C3]' },
          { label: 'Articles Blog', value: stats.totalPosts, color: 'text-purple-400' },
          { label: 'Témoignages', value: stats.totalTestimonials, color: 'text-orange-400' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-white/10 bg-white/5 p-6"
          >
            <div className="font-mono text-xs text-white/50 uppercase mb-2">
              {stat.label}
            </div>
            <div className={`font-display text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Welcome Message */}
      <div className="border border-white/10 bg-white/5 p-8">
        <h2 className="font-display text-2xl font-bold text-white mb-4">
          Bienvenue dans l'Espace Administrateur
        </h2>
        <p className="text-white/70 leading-relaxed">
          Gérez vos leads, créez des articles de blog et modérez les témoignages clients.
          Utilisez le menu de gauche pour naviguer entre les sections.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Voir les nouveaux leads', action: 'leads', color: 'bg-blue-500/10 border-blue-500/30 text-blue-400' },
          { label: 'Créer un article', action: 'blog', color: 'bg-purple-500/10 border-purple-500/30 text-purple-400' },
          { label: 'Ajouter un témoignage', action: 'testimonials', color: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
        ].map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className={`border p-6 cursor-pointer hover:scale-105 transition-transform ${action.color}`}
          >
            <div className="font-mono text-sm font-bold">
              {action.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


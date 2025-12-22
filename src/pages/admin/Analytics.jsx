import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, MousePointerClick, Eye, Mail, Calendar, Target, ArrowUp, ArrowDown } from 'lucide-react'
import { getABTestResults } from '../../hooks/useABTest'

export const Analytics = () => {
  const [metrics, setMetrics] = useState({
    visitors: { total: 0, change: 0 },
    leads: { total: 0, change: 0 },
    conversions: { rate: 0, change: 0 },
    demos: { total: 0, change: 0 },
  })

  const [topPages, setTopPages] = useState([])
  const [abTests, setABTests] = useState({})

  useEffect(() => {
    loadAnalytics()
    loadABTests()
    
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(() => {
      loadAnalytics()
      loadABTests()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const loadAnalytics = async () => {
    try {
      // Charger les leads depuis localStorage ou Supabase
      const leads = JSON.parse(localStorage.getItem('leads') || '[]')
      
      // Calculer les métriques (simulation)
      const now = new Date()
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1))
      
      const recentLeads = leads.filter(lead => {
        const leadDate = new Date(lead.created_at || lead.timestamp)
        return leadDate > lastMonth
      })

      setMetrics({
        visitors: { total: Math.floor(Math.random() * 500) + 200, change: Math.random() * 40 - 10 },
        leads: { total: leads.length, change: Math.random() * 30 - 5 },
        conversions: { rate: leads.length > 0 ? ((recentLeads.length / leads.length) * 100).toFixed(1) : 0, change: Math.random() * 10 - 5 },
        demos: { total: Math.floor(Math.random() * 100) + 50, change: Math.random() * 25 - 10 },
      })

      // Top pages (simulation)
      setTopPages([
        { page: '/', views: Math.floor(Math.random() * 1000) + 500, conversions: Math.floor(Math.random() * 50) + 20 },
        { page: '/creation-site-web', views: Math.floor(Math.random() * 800) + 300, conversions: Math.floor(Math.random() * 40) + 15 },
        { page: '/portfolio', views: Math.floor(Math.random() * 600) + 200, conversions: Math.floor(Math.random() * 30) + 10 },
        { page: '/contact', views: Math.floor(Math.random() * 400) + 150, conversions: Math.floor(Math.random() * 60) + 30 },
        { page: '/refonte-site', views: Math.floor(Math.random() * 300) + 100, conversions: Math.floor(Math.random() * 20) + 8 },
      ])
    } catch (error) {
      console.error('Erreur chargement analytics:', error)
    }
  }

  const loadABTests = () => {
    try {
      const tests = ['hero-cta', 'pricing-display', 'contact-form']
      const results = {}

      tests.forEach(testName => {
        const testResults = getABTestResults(testName)
        if (Object.keys(testResults).length > 0) {
          results[testName] = testResults
        }
      })

      setABTests(results)
    } catch (error) {
      console.error('Erreur chargement A/B tests:', error)
    }
  }

  const MetricCard = ({ icon: Icon, title, value, change, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`w-6 h-6 text-${color}-500`} />
        </div>
        <div className={`flex items-center gap-1 text-sm font-bold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          {Math.abs(change).toFixed(1)}%
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard Analytics</h1>
          <p className="text-gray-400">Métriques en temps réel • Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}</p>
        </div>

        {/* Métriques principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Users}
            title="Visiteurs (30j)"
            value={metrics.visitors.total}
            change={metrics.visitors.change}
            color="blue"
          />
          <MetricCard
            icon={Mail}
            title="Leads générés"
            value={metrics.leads.total}
            change={metrics.leads.change}
            color="green"
          />
          <MetricCard
            icon={Target}
            title="Taux de conversion"
            value={`${metrics.conversions.rate}%`}
            change={metrics.conversions.change}
            color="purple"
          />
          <MetricCard
            icon={Eye}
            title="Vues portfolio"
            value={metrics.demos.total}
            change={metrics.demos.change}
            color="yellow"
          />
        </div>

        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#88A9C3]" />
            Pages les plus visitées
          </h2>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-8 h-8 rounded-full bg-[#88A9C3] text-black flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{page.page}</p>
                    <p className="text-sm text-gray-400">{page.views} vues • {page.conversions} conversions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{((page.conversions / page.views) * 100).toFixed(1)}%</p>
                  <p className="text-xs text-gray-400">Taux de conversion</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* A/B Tests */}
        {Object.keys(abTests).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MousePointerClick className="w-6 h-6 text-[#88A9C3]" />
              Tests A/B en cours
            </h2>
            <div className="space-y-6">
              {Object.entries(abTests).map(([testName, results]) => (
                <div key={testName} className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 capitalize">{testName.replace(/-/g, ' ')}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(results).map(([variant, data]) => (
                      <div key={variant} className="p-4 bg-white/5 rounded-lg text-center">
                        <p className="text-sm text-gray-400 mb-2">Variant {variant}</p>
                        <p className="text-3xl font-bold mb-2">{data.conversions}</p>
                        <p className="text-xs text-gray-500">conversions</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}



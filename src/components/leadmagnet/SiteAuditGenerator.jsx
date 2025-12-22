import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, AlertCircle, FileText } from 'lucide-react'

// Audit Generator Component
export const SiteAuditGenerator = () => {
  const [formData, setFormData] = useState({
    siteUrl: '',
    email: '',
    name: '',
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsGenerating(true)

    // Sauvegarder dans localStorage pour l'admin
    const leads = JSON.parse(localStorage.getItem('admin_leads') || '[]')
    const newLead = {
      id: Date.now(),
      type: 'Audit gratuit demandé',
      name: formData.name,
      email: formData.email,
      siteUrl: formData.siteUrl,
      message: `Audit demandé pour: ${formData.siteUrl}`,
      date: new Date().toISOString(),
      read: false,
    }
    leads.push(newLead)
    localStorage.setItem('admin_leads', JSON.stringify(leads))

    // Simuler génération PDF (remplacer par vraie génération avec jsPDF)
    setTimeout(() => {
      generatePDF()
      setIsGenerating(false)
      setIsDownloaded(true)
    }, 2000)
  }

  const generatePDF = () => {
    // Créer le contenu de l'audit
    const auditData = {
      site: formData.siteUrl,
      date: new Date().toLocaleDateString('fr-FR'),
      name: formData.name,
      results: {
        performance: Math.floor(Math.random() * 40) + 40, // 40-80
        seo: Math.floor(Math.random() * 40) + 40,
        design: Math.floor(Math.random() * 40) + 40,
        conversion: Math.floor(Math.random() * 40) + 40,
      },
      issues: [
        'Design obsolète (2020-2023)',
        'Temps de chargement > 4 secondes',
        'Pas optimisé mobile',
        'Aucune stratégie SEO',
        'Absence de tracking conversion',
      ],
      opportunities: [
        'Refonte design moderne pourrait générer +280% conversions',
        'Optimisation vitesse = +45% temps sur site',
        'SEO technique = +120% trafic organique',
        'Mobile-first = +67% leads mobiles',
      ],
    }

    // Créer le texte du PDF
    const pdfContent = `
AUDIT GRATUIT DE VOTRE SITE WEB
Modernize Hub

Date: ${auditData.date}
Site analysé: ${auditData.site}
Nom: ${auditData.name}

─────────────────────────────────────

SCORES DE PERFORMANCE

Performance: ${auditData.results.performance}/100
SEO: ${auditData.results.seo}/100
Design: ${auditData.results.design}/100
Conversion: ${auditData.results.conversion}/100

Score Global: ${Math.round((auditData.results.performance + auditData.results.seo + auditData.results.design + auditData.results.conversion) / 4)}/100

─────────────────────────────────────

PROBLÈMES IDENTIFIÉS

${auditData.issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

─────────────────────────────────────

OPPORTUNITÉS DE CROISSANCE

${auditData.opportunities.map((opp, i) => `${i + 1}. ${opp}`).join('\n')}

─────────────────────────────────────

RECOMMANDATIONS PRIORITAIRES

1. REFONTE DESIGN URGENTE
   Impact: +280% conversions estimées
   Délai: 14 jours
   Investissement: 1 990€ - 5 990€

2. OPTIMISATION PERFORMANCE
   Impact: +45% temps sur site
   Délai: 7 jours
   Investissement: Inclus dans refonte

3. STRATÉGIE SEO COMPLÈTE
   Impact: +120% trafic organique
   Délai: 30 jours
   Investissement: Inclus dans refonte

─────────────────────────────────────

PROCHAINES ÉTAPES

Pour transformer votre site en machine à générer des leads:

1. Réservez un appel découverte gratuit (30 min)
2. Recevez un devis personnalisé sous 24h
3. Lancez votre transformation en 48h

Contact: contact@modernizehub.com
Site: modernizehub.com

─────────────────────────────────────

Cet audit a été généré automatiquement.
Pour un audit approfondi personnalisé, contactez-nous.

Modernize Hub © 2025
`

    // Créer et télécharger le fichier texte (remplacer par PDF avec jsPDF)
    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-site-${formData.siteUrl.replace(/https?:\/\//, '').replace(/\/$/, '')}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <section className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[#88A9C3] text-sm tracking-widest uppercase mb-6 block">
              Lead Magnet Gratuit
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white uppercase leading-[0.9] mb-6">
              AUDIT GRATUIT<br/>
              <span className="text-[#88A9C3]">DE VOTRE SITE</span>
            </h2>
            <p className="text-xl text-white/80 font-light">
              Recevez un audit complet de votre site web en 2 minutes. Analysé par nos experts.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-white/10 bg-white/5 p-8 md:p-12"
          >
            {!isDownloaded ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-mono text-sm text-white/70 uppercase tracking-wider mb-3">
                    URL de Votre Site
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.siteUrl}
                    onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                    placeholder="https://votre-site.fr"
                    className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors font-mono"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-sm text-white/70 uppercase tracking-wider mb-3">
                      Votre Nom
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jean Dupont"
                      className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-sm text-white/70 uppercase tracking-wider mb-3">
                      Votre Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jean@exemple.fr"
                      className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-5 bg-[#88A9C3] text-black font-bold hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Génération en cours...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Générer Mon Audit Gratuit (PDF)</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-white/50 text-center font-mono">
                  ✅ 100% Gratuit • ✅ Sans engagement • ✅ Recevez-le instantanément
                </p>
              </form>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-20 h-20 text-[#88A9C3] mx-auto mb-6" />
                <h3 className="font-display text-3xl font-bold text-white mb-4">
                  Audit Généré !
                </h3>
                <p className="text-white/80 mb-8">
                  Votre audit a été téléchargé. Consultez votre dossier de téléchargements.
                </p>
                <p className="text-sm text-white/60 mb-8">
                  Vous allez également recevoir un email avec des recommandations personnalisées.
                </p>
                <button
                  onClick={() => {
                    setIsDownloaded(false)
                    setFormData({ siteUrl: '', email: '', name: '' })
                  }}
                  className="px-8 py-4 border border-[#88A9C3] text-[#88A9C3] hover:bg-[#88A9C3] hover:text-black transition-all font-mono text-sm uppercase"
                >
                  Générer Un Autre Audit
                </button>
              </div>
            )}
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: FileText, text: '15+ Points Analysés' },
              { icon: AlertCircle, text: 'Problèmes Identifiés' },
              { icon: CheckCircle, text: 'Recommandations Actionnables' },
            ].map((item, index) => (
              <div key={index} className="border border-white/10 bg-white/5 p-6 text-center">
                <item.icon className="w-8 h-8 text-[#88A9C3] mx-auto mb-4" />
                <p className="font-mono text-sm text-white/80">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}


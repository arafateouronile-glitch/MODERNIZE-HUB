import { useState } from 'react'
import { Calendar, X, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabaseStorage as storage } from '../../services/supabaseStorage'

export const CalendlyButton = ({ variant = 'primary', text = 'Réserver un Appel Gratuit', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Récupérer l'URL Calendly depuis les variables d'environnement ou utiliser une valeur par défaut
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/votre-compte/30min"
  
  // Vérifier si Calendly est configuré (pas un placeholder) et si on n'est pas en localhost
  const isCalendlyConfigured = calendlyUrl && 
    !calendlyUrl.includes('votre-compte') && 
    !calendlyUrl.includes('votre-nom') &&
    calendlyUrl.startsWith('https://calendly.com/')
  
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  
  // Désactiver l'embed en localhost pour éviter les erreurs "invalid website"
  const shouldEmbedCalendly = isCalendlyConfigured && !isLocalhost

  const openCalendly = async () => {
    setIsOpen(true)
    
    // Enregistrer qu'un rendez-vous a été demandé
    // Note: En production, utilisez les webhooks Calendly pour enregistrer automatiquement
    try {
      await storage.saveLead({
        type: 'appointment',
        name: 'Visiteur anonyme',
        email: '',
        message: 'Demande de rendez-vous via Calendly',
      })
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du rendez-vous:', error)
      // On continue même en cas d'erreur
    }
  }

  const closeCalendly = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={openCalendly}
        className={`group inline-flex items-center gap-3 px-8 py-4 ${
          variant === 'primary'
            ? 'bg-[#D9FF00] text-black hover:bg-white'
            : 'border-2 border-[#D9FF00] text-[#D9FF00] hover:bg-[#D9FF00] hover:text-black'
        } font-bold rounded-full transition-all duration-300 ${className}`}
      >
        <Calendar className="w-5 h-5" />
        <span>{text}</span>
      </button>

      {/* Modal Calendly */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCalendly}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-2xl shadow-2xl z-[9999] overflow-hidden"
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 bg-[#D9FF00] p-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-black" />
                  <h3 className="font-bold text-black text-lg">
                    Réservez Votre Appel Découverte Gratuit
                  </h3>
                </div>
                <button
                  onClick={closeCalendly}
                  className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              {/* Calendly Iframe ou Message d'information */}
              {shouldEmbedCalendly ? (
                <iframe
                  src={`${calendlyUrl}?embed_domain=${window.location.hostname}&embed_type=Inline&hide_gdpr_banner=1`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="pt-16"
                  title="Calendly Scheduling"
                />
              ) : (
                <div className="pt-16 h-full flex flex-col items-center justify-center p-8 text-center">
                  {isLocalhost ? (
                    <>
                      <Calendar className="w-16 h-16 text-gray-400 mb-4" />
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Calendly en mode développement
                      </h4>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Le widget Calendly n'est pas disponible en localhost pour éviter les erreurs de validation de domaine.
                      </p>
                      {isCalendlyConfigured ? (
                        <a
                          href={calendlyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D9FF00] text-black font-bold rounded-full hover:bg-black hover:text-[#D9FF00] transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Ouvrir Calendly dans un nouvel onglet
                        </a>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Configurez votre URL Calendly dans les variables d'environnement pour l'utiliser en production.
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <Calendar className="w-16 h-16 text-gray-400 mb-4" />
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Calendly non configuré
                      </h4>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Veuillez configurer votre URL Calendly dans les variables d'environnement.
                      </p>
                      <p className="text-sm text-gray-500">
                        Variable d'environnement requise : <code className="bg-gray-100 px-2 py-1 rounded">VITE_CALENDLY_URL</code>
                      </p>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}


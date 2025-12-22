import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, Phone, Clock, MapPin, Send, Check, Sparkles } from 'lucide-react'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import { supabaseStorage as storage } from '../services/supabaseStorage'
import { sendLeadEmails } from '../services/emailService'
import { useTheme } from '../contexts/ThemeContext'

const contactSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Veuillez sélectionner un type de projet'),
  budget: z.string().min(1, 'Veuillez sélectionner un budget'),
  timeline: z.string().min(1, 'Veuillez sélectionner un délai'),
  message: z.string().optional(),
})

export const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { theme } = useTheme()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data) => {
    try {
      const lead = {
        type: 'quote',
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        budget: data.budget,
        message: `${data.projectType} - Délai souhaité: ${data.timeline}. ${data.message || ''}`,
      }

      console.log('💾 Sauvegarde du lead dans la base de données...', lead)
      const savedLead = await storage.saveLead(lead)

      // Envoyer les emails
      await sendLeadEmails(lead)

      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-background'}`}>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-6xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`font-display text-6xl md:text-8xl font-bold mb-6 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            Démarrons Votre
            <br />
            <span className="text-[#88A9C3]">Projet</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl md:text-2xl mb-4 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            Réponse en moins de 2h (jours ouvrés)
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              theme === 'light'
                ? 'bg-gray-100 text-gray-700'
                : 'bg-surface text-gray-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm">Temps de réponse moyen : &lt; 2h</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Double Layout: Form + Info */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-3xl p-8 md:p-12 border-2 ${
                theme === 'light'
                  ? 'bg-white border-black'
                  : 'bg-surface border-white/10'
              }`}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-[#88A9C3] flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-black" />
                  </div>
                  <h3 className={`text-3xl font-bold mb-4 ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}>
                    Demande Reçue !
                  </h3>
                  <p className={`text-lg mb-6 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    Nous vous recontacterons dans les 2 heures (jours ouvrés).
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-[#88A9C3] text-black font-bold rounded-full hover:bg-white transition-colors"
                  >
                    Envoyer une autre demande
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className={`text-3xl font-bold mb-6 ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}>
                    Parlons de votre projet
                  </h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        Nom complet *
                      </label>
                      <input
                        {...register('name')}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.name
                            ? 'border-red-500'
                            : theme === 'light'
                            ? 'border-black bg-white'
                            : 'border-white/20 bg-black/50'
                        } ${theme === 'light' ? 'text-black' : 'text-white'} focus:outline-none focus:border-[#88A9C3]`}
                        placeholder="Votre nom"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        Email *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.email
                            ? 'border-red-500'
                            : theme === 'light'
                            ? 'border-black bg-white'
                            : 'border-white/20 bg-black/50'
                        } ${theme === 'light' ? 'text-black' : 'text-white'} focus:outline-none focus:border-[#88A9C3]`}
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        Téléphone
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          theme === 'light'
                            ? 'border-black bg-white'
                            : 'border-white/20 bg-black/50'
                        } ${theme === 'light' ? 'text-black' : 'text-white'} focus:outline-none focus:border-[#88A9C3]`}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        Type de projet *
                      </label>
                      <select
                        {...register('projectType')}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.projectType
                            ? 'border-red-500'
                            : theme === 'light'
                            ? 'border-black bg-white'
                            : 'border-white/20 bg-black/50'
                        } ${theme === 'light' ? 'text-black' : 'text-white'} focus:outline-none focus:border-[#88A9C3]`}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Site vitrine">Site vitrine</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Refonte">Refonte de site</option>
                        <option value="Landing page">Landing page</option>
                        <option value="Autre">Autre</option>
                      </select>
                      {errors.projectType && (
                        <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        Budget *
                      </label>
                      <select
                        {...register('budget')}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.budget
                            ? 'border-red-500'
                            : theme === 'light'
                            ? 'border-black bg-white'
                            : 'border-white/20 bg-black/50'
                        } ${theme === 'light' ? 'text-black' : 'text-white'} focus:outline-none focus:border-[#88A9C3]`}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Essentiel (1 990€)">Essentiel (1 990€)</option>
                        <option value="Business Pro (3 490€)">Business Pro (3 490€)</option>
                        <option value="Élite Total (6 490€)">Élite Total (6 490€)</option>
                        <option value="Sur-mesure">Sur-mesure (devis personnalisé)</option>
                      </select>
                      {errors.budget && (
                        <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        Délai souhaité *
                      </label>
                      <select
                        {...register('timeline')}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.timeline
                            ? 'border-red-500'
                            : theme === 'light'
                            ? 'border-black bg-white'
                            : 'border-white/20 bg-black/50'
                        } ${theme === 'light' ? 'text-black' : 'text-white'} focus:outline-none focus:border-[#88A9C3]`}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Urgent (< 2 semaines)">Urgent (&lt; 2 semaines)</option>
                        <option value="Normal (2-4 semaines)">Normal (2-4 semaines)</option>
                        <option value="Flexible (> 1 mois)">Flexible (&gt; 1 mois)</option>
                      </select>
                      {errors.timeline && (
                        <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        Message (optionnel)
                      </label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          theme === 'light'
                            ? 'border-black bg-white'
                            : 'border-white/20 bg-black/50'
                        } ${theme === 'light' ? 'text-black' : 'text-white'} focus:outline-none focus:border-[#88A9C3] resize-none`}
                        placeholder="Décrivez votre projet en quelques mots..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-[#88A9C3] text-black font-bold rounded-full hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Envoyer ma demande
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Informations de Contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              {/* Informations */}
              <div className={`rounded-3xl p-8 border-2 ${
                theme === 'light'
                  ? 'bg-white border-black'
                  : 'bg-surface border-white/10'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  Autres moyens de contact
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#88A9C3]/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#88A9C3]" />
                    </div>
                    <div>
                      <div className={`font-bold mb-1 ${
                        theme === 'light' ? 'text-black' : 'text-white'
                      }`}>
                        Email
                      </div>
                      <a
                        href="mailto:contact@modernizehub.com"
                        className={`text-[#88A9C3] hover:underline ${
                          theme === 'light' ? 'text-black' : ''
                        }`}
                      >
                        contact@modernizehub.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#88A9C3]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#88A9C3]" />
                    </div>
                    <div>
                      <div className={`font-bold mb-1 ${
                        theme === 'light' ? 'text-black' : 'text-white'
                      }`}>
                        Téléphone
                      </div>
                      <a
                        href="tel:+33123456789"
                        className={`text-[#88A9C3] hover:underline ${
                          theme === 'light' ? 'text-black' : ''
                        }`}
                      >
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#88A9C3]/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#88A9C3]" />
                    </div>
                    <div>
                      <div className={`font-bold mb-1 ${
                        theme === 'light' ? 'text-black' : 'text-white'
                      }`}>
                        Horaires
                      </div>
                      <div className={`${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Lundi - Vendredi<br />
                        9h - 18h
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


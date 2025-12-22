import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { ArrowRight, Check, Shield } from 'lucide-react'
import { Reveal } from '../animations/Reveal'
import { supabaseStorage as storage } from '../../services/supabaseStorage'
import { sendLeadEmails } from '../../services/emailService'

const contactSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  budget: z.string().min(1, 'Veuillez sélectionner un budget'),
  message: z.string().optional(),
})

export const Contact = () => {
  const [ref, isVisible] = useScrollAnimation()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data) => {
    try {
      // Créer l'objet lead
      const lead = {
        type: 'quote',
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        budget: data.budget,
        message: data.message || '',
      }

      // Sauvegarder le lead dans la base de données Supabase
      console.log('💾 Sauvegarde du lead dans la base de données...', lead)
      const savedLead = await storage.saveLead(lead)

      // Vérifier que la sauvegarde a réussi
      if (savedLead && savedLead.id) {
        console.log('✅ Lead sauvegardé avec succès dans la base de données:', savedLead)
      } else {
        console.warn('⚠️ Problème lors de la sauvegarde du lead:', savedLead)
      }

      // Envoyer les emails (admin + confirmation)
      // On fait ça en arrière-plan pour ne pas bloquer l'UX
      sendLeadEmails(lead).then((results) => {
        if (results.admin.success) {
          console.log('✅ Email admin envoyé')
        } else {
          console.warn('⚠️ Email admin non envoyé:', results.admin.error)
        }
        
        if (results.confirmation.success) {
          console.log('✅ Email de confirmation envoyé')
        } else {
          console.warn('⚠️ Email de confirmation non envoyé:', results.confirmation.error)
        }
      }).catch((error) => {
        console.error('Erreur lors de l\'envoi des emails:', error)
        // On continue même si les emails échouent
      })

      setIsSubmitted(true)
      reset()
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du lead:', error)
      // Même en cas d'erreur, on affiche le message de succès pour l'UX
      setIsSubmitted(true)
      reset()
      setTimeout(() => setIsSubmitted(false), 5000)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-32 bg-background relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        
        {isSubmitted ? (
          <Reveal>
            <div className="max-w-3xl mx-auto bg-[#D9FF00] p-16 text-center border-4 border-black">
              <Check className="w-20 h-20 text-black mx-auto mb-8" />
              <h3 className="font-display text-5xl text-black font-bold uppercase mb-6">Demande Reçue</h3>
              <p className="font-mono text-black text-lg mb-4">
                {'>'} Transmission confirmée<br/>
                {'>'} Réponse dans les 24h<br/>
                {'>'} Consultez vos emails
              </p>
              <p className="text-black/70 text-sm">
                (Vérifiez vos spams si besoin)
              </p>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal>
              <div className="max-w-4xl mx-auto mb-20 text-center">
                <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-6 block">
                  Dernière Étape
                </span>
                <h2 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-[0.85] mb-8">
                  ARRÊTEZ DE PERDRE<br/>
                  <span className="text-[#D9FF00]">COMMENCEZ À GAGNER</span>
                </h2>
                <p className="text-xl text-text-muted max-w-2xl mx-auto font-light mb-8">
                  Devis gratuit sous 24h. Sans engagement. Sans bullshit.
                </p>
                
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-[#D9FF00]" />
                    <span className="font-mono text-white/70">100% Confidentiel</span>
                  </div>
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-[#D9FF00]" />
                    <span className="font-mono text-white/70">Réponse Garantie 24h</span>
                  </div>
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-[#D9FF00]" />
                    <span className="font-mono text-white/70">Zéro Spam</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-12">
                <div className="group relative">
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="VOTRE NOM"
                    className="w-full bg-transparent border-b-2 border-white/20 py-6 text-3xl md:text-5xl font-display font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#D9FF00] transition-colors uppercase tracking-tight"
                  />
                  {errors.name && <span className="absolute -bottom-6 left-0 text-[#D9FF00] font-mono text-xs">→ {errors.name.message}</span>}
                </div>

                <div className="group relative">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="VOTRE EMAIL"
                    className="w-full bg-transparent border-b-2 border-white/20 py-6 text-3xl md:text-5xl font-display font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#D9FF00] transition-colors uppercase tracking-tight"
                  />
                  {errors.email && <span className="absolute -bottom-6 left-0 text-[#D9FF00] font-mono text-xs">→ {errors.email.message}</span>}
                </div>

                <div className="group relative">
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="VOTRE TÉLÉPHONE (OPTIONNEL)"
                    className="w-full bg-transparent border-b-2 border-white/20 py-6 text-3xl md:text-5xl font-display font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#D9FF00] transition-colors uppercase tracking-tight"
                  />
                  {errors.phone && <span className="absolute -bottom-6 left-0 text-[#D9FF00] font-mono text-xs">→ {errors.phone.message}</span>}
                </div>

                <div className="group relative">
                  <select
                    {...register('budget')}
                    className="w-full bg-transparent border-b-2 border-white/20 py-6 text-3xl md:text-5xl font-display font-bold text-white/50 focus:text-white focus:outline-none focus:border-[#D9FF00] transition-colors uppercase appearance-none cursor-pointer tracking-tight"
                  >
                    <option value="" className="bg-background text-white/50">BUDGET PROJET ?</option>
                    <option value="1.5k-3k" className="bg-background text-white">1 500€ - 3 000€</option>
                    <option value="3k-6k" className="bg-background text-white">3 000€ - 6 000€</option>
                    <option value="6k+" className="bg-background text-white">6 000€ +</option>
                  </select>
                  {errors.budget && <span className="absolute -bottom-6 left-0 text-[#D9FF00] font-mono text-xs">→ {errors.budget.message}</span>}
                </div>

                <div className="group relative">
                  <textarea
                    {...register('message')}
                    rows={1}
                    placeholder="DÉCRIVEZ VOTRE PROJET"
                    className="w-full bg-transparent border-b-2 border-white/20 py-6 text-2xl md:text-4xl font-display font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#D9FF00] transition-colors uppercase resize-none min-h-[100px] tracking-tight"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#D9FF00] text-black font-display font-bold text-2xl md:text-4xl py-10 hover:bg-white transition-all duration-300 uppercase flex items-center justify-between px-10 group shadow-[0_0_40px_rgba(217,255,0,0.3)] hover:shadow-[0_0_60px_rgba(217,255,0,0.5)] mt-20"
                >
                  <span>ENVOYER</span>
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform" />
                </button>

                <p className="text-center font-mono text-xs text-white/30 mt-6">
                  En soumettant ce formulaire, vous acceptez d'être recontacté sous 24h pour discuter de votre projet.
                </p>
              </form>
            </Reveal>
          </>
        )}
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Dumbbell, Zap, Target, ArrowRight, Check, Activity, Trophy, Heart } from 'lucide-react'
import { SEO } from '../../components/seo/SEO'
import { Header } from '../../components/common/Header'
import { Footer } from '../../components/common/Footer'
import { useNavigate } from 'react-router-dom'

export const FitnessLanding = () => {
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Site Web pour Salle de Sport & Coach | Modernize Hub"
        description="Site web énergique pour salles de sport et coachs. Planning cours, booking en ligne, transformations avant/après. À partir de 1990€."
        keywords="site salle de sport, site coach sportif, réservation cours fitness"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#111111] to-[#1F1F1F] text-white px-6 pt-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#88A9C3] opacity-5 -skew-x-12" />
        
        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#88A9C3]/20 border border-[#88A9C3] rounded-full px-4 py-2 mb-6"
          >
            <Dumbbell className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Spécial Fitness & Coaching</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight uppercase">
            Explosez vos
            <span className="block text-[#88A9C3] mt-2 italic">inscriptions</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-bold">
            Planning cours, booking en ligne, transformations avant/après. 
            Multipliez vos inscriptions par 3 en 12 jours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => navigate('/demo/coach-sportif')}
              className="bg-[#88A9C3] text-black px-8 py-4 rounded-lg font-black text-lg hover:bg-white transition-all shadow-[4px_4px_0px_white]"
            >
              VOIR LA DÉMO FITNESS
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-[#88A9C3] text-[#88A9C3] px-8 py-4 rounded-lg font-black hover:bg-[#88A9C3] hover:text-black transition-all uppercase"
            >
              JE FONCE
            </button>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { stat: '+250%', label: 'Inscriptions' },
              { stat: '12 jours', label: 'Livraison' },
              { stat: '1 990€', label: 'À partir de' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center border border-[#88A9C3]/20 p-6 rounded-lg bg-[#1F1F1F]"
              >
                <div className="text-4xl font-black text-[#88A9C3] mb-2">{item.stat}</div>
                <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Fonctionnalités Fitness */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4 uppercase">
            Tout pour exploser vos objectifs
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto font-bold">
            Des fonctionnalités ultra-performantes pour convertir chaque visiteur en membre
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Activity,
                title: 'Planning cours interactif',
                desc: 'Affichez tous vos cours avec horaires, coachs, disponibilité. Réservation en 1 clic.',
              },
              {
                icon: Target,
                title: 'Transformations avant/après',
                desc: 'Showcasez les résultats de vos clients. Preuve sociale qui convertit à 300%.',
              },
              {
                icon: Zap,
                title: 'Booking en ligne',
                desc: 'Vos clients réservent séance d\'essai ou abonnement directement. Paiement sécurisé intégré.',
              },
              {
                icon: Trophy,
                title: 'Profils coachs',
                desc: 'Présentez vos coachs avec photos, spécialités, certifications. Inspirez confiance.',
              },
              {
                icon: Heart,
                title: 'Calculateurs fitness',
                desc: 'IMC, calories, objectifs. Outils interactifs qui engagent et capturent des emails.',
              },
              {
                icon: Dumbbell,
                title: 'Design énergique',
                desc: 'Couleurs vibrantes, animations dynamiques, style brutaliste. L\'énergie de votre salle.',
              },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl border-4 border-black hover:bg-black hover:text-white transition-all group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#88A9C3] rounded-full mb-6 group-hover:bg-white transition-all">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Fitness */}
      <section className="py-24 px-6 bg-[#111111]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6 uppercase">
            Notre réalisation fitness
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto font-bold">
            Design brutaliste moderne, animations énergiques, conversion maximale
          </p>
          
          <button 
            onClick={() => navigate('/demo/coach-sportif')}
            className="inline-flex items-center gap-2 bg-[#88A9C3] text-black px-8 py-4 rounded-lg font-black hover:bg-white transition-all shadow-[4px_4px_0px_white] uppercase"
          >
            VOIR LA DÉMO
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      
      {/* Pricing Fitness */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 uppercase">
            Tarif Salle de Sport / Coach
          </h2>
          
          <div className="bg-gradient-to-br from-[#111111] to-[#1F1F1F] text-white p-12 rounded-3xl shadow-2xl border-4 border-black">
            <div className="flex items-center gap-4 mb-6">
              <Dumbbell className="w-12 h-12 text-[#88A9C3]" />
              <div>
                <h3 className="text-3xl font-black uppercase">Formule Fitness Pro</h3>
                <p className="text-[#88A9C3] font-bold">Tout pour performer</p>
              </div>
            </div>
            
            <div className="text-5xl font-black mb-8">
              2 490€
              <span className="text-xl text-gray-400 ml-2 font-normal">tout compris</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                'Design énergique moderne & brutaliste',
                'Planning cours interactif avec réservation',
                'Galerie transformations avant/après',
                'Profils coachs avec vidéos',
                'Calculateurs fitness (IMC, calories)',
                'Système booking + paiement en ligne',
                'Google My Business Setup',
                '3 emails professionnels',
                'Animations dynamiques premium',
                'Formation 2h + Support 1 mois',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#88A9C3] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="font-bold">{item}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => navigate('/contact')}
              className="w-full bg-white text-black py-4 rounded-lg font-black text-lg hover:bg-[#88A9C3] transition-all uppercase shadow-[4px_4px_0px_#88A9C3]"
            >
              JE FONCE
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-24 px-6 bg-[#88A9C3] text-black text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-6 uppercase">
            Prêt à transformer ton business ?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-bold">
            +100 salles de sport et coachs nous font confiance
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-black text-white px-10 py-5 rounded-lg font-black text-xl hover:bg-[#1F1F1F] transition-all shadow-xl uppercase"
          >
            DÉMARRER
          </button>
        </div>
      </section>
      
      <Footer />
    </>
  )
}


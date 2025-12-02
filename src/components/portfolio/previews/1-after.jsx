// Portfolio APRÈS - Cabinet d'Avocats (Ultra Premium)
import { motion } from 'framer-motion'
import { Check, ArrowRight, Phone, Mail, MapPin } from 'lucide-react'

const CabinetAvocatAfter = ({ demo }) => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-amber-500/30">
      {/* Navigation Flottante */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-6 right-6 z-50 bg-[#0B0F19]/80 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-4 flex justify-between items-center max-w-7xl mx-auto shadow-2xl"
      >
        <div className="font-serif text-2xl font-bold tracking-widest text-amber-500">
          VANDERBILT <span className="text-white font-light">& ASSOCIÉS</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-gray-300">
          <a href="#" className="hover:text-amber-400 transition-colors">EXPERTISES</a>
          <a href="#" className="hover:text-amber-400 transition-colors">NOTRE ÉQUIPE</a>
          <a href="#" className="hover:text-amber-400 transition-colors">RÉSULTATS</a>
        </div>
        <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-amber-900/20">
          Prendre Rendez-vous
        </button>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2400&auto=format&fit=crop" 
            alt="Luxury Office" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/30 via-[#0B0F19]/60 to-[#0B0F19]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 border border-amber-500/30 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold tracking-[0.2em] mb-6 backdrop-blur-sm">
              DEPUIS 1985
            </span>
            <h1 className="font-serif text-6xl md:text-8xl font-medium leading-tight mb-8">
              L'Art de <span className="italic text-amber-500">Gagner</span> <br/>
              Vos Batailles.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Une défense implacable et une stratégie sur-mesure pour les dossiers les plus complexes.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="group relative px-8 py-4 bg-white text-[#0B0F19] rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  Consultation Gratuite <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                </span>
              </button>
              <button className="px-8 py-4 border border-white/20 hover:bg-white/5 rounded-xl font-medium text-lg transition-all backdrop-blur-sm">
                Découvrir nos victoires
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-[#0F1420]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: "35+", label: "Années d'Expérience" },
              { val: "2M€", label: "Récupérés en 2024" },
              { val: "98%", label: "Taux de Succès" },
              { val: "500+", label: "Dossiers Traités" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="font-serif text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2 group-hover:to-amber-500 transition-all duration-500">
                  {stat.val}
                </div>
                <div className="text-sm font-bold tracking-widest text-amber-500 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertises Grid */}
      <section className="py-32 px-6 bg-[#0B0F19]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">Nos Expertises</h2>
              <div className="h-1 w-24 bg-amber-500 rounded-full" />
            </div>
            <p className="text-gray-400 max-w-md text-right mt-6 md:mt-0">
              Nous intervenons là où les enjeux sont critiques et où l'excellence est non-négociable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Droit des Affaires", desc: "Fusions, acquisitions et contentieux commerciaux complexes.", icon: "⚖️" },
              { title: "Fiscalité Internationale", desc: "Optimisation et défense lors de contrôles fiscaux.", icon: "🌐" },
              { title: "Droit Pénal", desc: "Défense des dirigeants et protection de la réputation.", icon: "🛡️" },
              { title: "Propriété Intellectuelle", desc: "Protection de vos marques, brevets et actifs immatériels.", icon: "💡" },
              { title: "Droit Immobilier", desc: "Transactions stratégiques et gestion de patrimoine.", icon: "🏢" },
              { title: "Contentieux", desc: "Résolution de conflits par la négociation ou le procès.", icon: "⚔️" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-[#131825] p-8 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all group"
              >
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-100">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-gradient-to-b from-[#0F1420] to-[#0B0F19] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 border border-amber-500/20 rounded-2xl transform rotate-3" />
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop" 
              alt="Meeting" 
              className="rounded-xl shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div>
            <h2 className="font-serif text-4xl font-medium mb-8">
              Pourquoi les leaders nous font confiance
            </h2>
            <div className="space-y-6">
              {[
                "Une disponibilité 24/7 pour les urgences juridiques",
                "Un réseau international de partenaires experts",
                "Une confidentialité absolue garantie",
                "Une approche ROIste de vos contentieux"
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-amber-500" />
                  </div>
                  <p className="text-lg text-gray-300">{point}</p>
                </div>
              ))}
            </div>
            <button className="mt-12 text-amber-500 font-bold tracking-widest uppercase text-sm border-b border-amber-500/30 pb-2 hover:text-white hover:border-white transition-all">
              Lire les témoignages
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="font-serif text-3xl font-bold tracking-widest text-white mb-6">
                VANDERBILT
              </div>
              <p className="text-gray-500 max-w-sm">
                L'excellence juridique au service de votre réussite.
                Paris • New York • Dubaï
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contactez-nous</h4>
              <div className="space-y-4 text-gray-500">
                <p className="flex items-center gap-3 hover:text-amber-500 cursor-pointer transition-colors">
                  <MapPin className="w-4 h-4" /> 12 Avenue Montaigne, Paris
                </p>
                <p className="flex items-center gap-3 hover:text-amber-500 cursor-pointer transition-colors">
                  <Phone className="w-4 h-4" /> +33 1 45 67 89 00
                </p>
                <p className="flex items-center gap-3 hover:text-amber-500 cursor-pointer transition-colors">
                  <Mail className="w-4 h-4" /> contact@vanderbilt.law
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Liens</h4>
              <div className="space-y-2 text-gray-500">
                <p className="hover:text-white cursor-pointer transition-colors">Mentions Légales</p>
                <p className="hover:text-white cursor-pointer transition-colors">Carrières</p>
                <p className="hover:text-white cursor-pointer transition-colors">Presse</p>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-700 pt-8 border-t border-white/5 text-sm">
            © 2025 Vanderbilt & Associés. Design par Modernize Hub.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CabinetAvocatAfter
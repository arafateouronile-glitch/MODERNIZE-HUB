// Portfolio APRÈS - Artisan Électricien (Clean / Tech / Trust)
import { motion } from 'framer-motion'
import { CheckCircle, Shield, Zap, Star, Phone } from 'lucide-react'

const ArtisanAfter = ({ demo }) => {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Header Sticky */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Zap fill="white" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">ELEC<span className="text-blue-600">TECH</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-500">
          <a href="#" className="hover:text-blue-600 transition-colors">Solutions</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Réalisations</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Avis Clients</a>
        </div>
        <div className="flex gap-4">
          <button className="hidden md:flex items-center gap-2 text-slate-900 font-bold">
            <Phone size={18} className="text-blue-600" /> 01 23 45 67 89
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105">
            Devis Express
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/50 skew-x-[-12deg] translate-x-20" />
        
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Disponible 7j/7
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              L'Électricité <br/>
              <span className="text-blue-600">Intelligente</span> & Sécurisée.
            </h1>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-lg">
              Installation, dépannage et domotique pour particuliers et entreprises exigeants.
              Intervention en moins de 30 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm text-blue-600"><Shield size={20}/></div>
                <span className="font-medium text-slate-700">Assurance Décennale</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm text-blue-600"><Star size={20}/></div>
                <span className="font-medium text-slate-700">4.9/5 sur Google</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-md">
              <h3 className="font-bold text-slate-900 mb-4">Besoin d'un dépannage urgent ?</h3>
              <form className="flex gap-2">
                <input type="tel" placeholder="Votre numéro de téléphone" className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <button className="bg-blue-600 text-white px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                  Rappelez-moi
                </button>
              </form>
            </div>
          </motion.div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop" 
              alt="Electrician at work" 
              className="rounded-3xl shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce-slow">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <div className="font-bold text-slate-900">Intervention Terminée</div>
                <div className="text-xs text-slate-500">Il y a 5 min à Paris 15e</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nos Domaines d'Intervention</h2>
            <p className="text-slate-500">
              Des solutions techniques modernes pour votre confort et votre sécurité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Installation Électrique", desc: "Mise aux normes NF C 15-100, tableaux, câblage complet pour neuf et rénovation." },
              { title: "Maison Connectée", desc: "Pilotage à distance éclairage, chauffage et volets via smartphone." },
              { title: "Bornes de Recharge", desc: "Installation certifiée IRVE pour véhicules électriques." },
              { title: "Éclairage LED", desc: "Design lumineux et économies d'énergie pour intérieur et extérieur." },
              { title: "Sécurité & Alarme", desc: "Vidéosurveillance et contrôle d'accès connectés." },
              { title: "Dépannage 24/7", desc: "Diagnostic précis et réparation immédiate de vos pannes." },
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avant/Après Realisations */}
      <section className="py-24 bg-slate-900 text-white px-6 md:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">La Qualité ElecTech</h2>
              <p className="text-slate-400">Avant / Après nos interventions de rénovation.</p>
            </div>
            <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">
              Voir tous les projets
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-4 h-64 mb-4">
                <div className="relative overflow-hidden rounded-xl">
                  <img src="https://images.unsplash.com/photo-1544724569-5f546fd6dd2a?q=80&w=800" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute top-2 left-2 bg-red-500 text-xs font-bold px-2 py-1 rounded">AVANT</div>
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <img src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-green-500 text-xs font-bold px-2 py-1 rounded">APRÈS</div>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">Rénovation Tableau Électrique</h3>
              <p className="text-slate-400 text-sm">Mise en sécurité totale d'un appartement Haussmannien.</p>
            </div>
            
            <div className="bg-slate-800 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-4 h-64 mb-4">
                <div className="relative overflow-hidden rounded-xl">
                  <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute top-2 left-2 bg-red-500 text-xs font-bold px-2 py-1 rounded">AVANT</div>
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <img src="https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=800" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-green-500 text-xs font-bold px-2 py-1 rounded">APRÈS</div>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">Installation Domotique</h3>
              <p className="text-slate-400 text-sm">Gestion éclairage et chauffage centralisée.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-slate-100 text-center">
        <div className="flex justify-center items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
            <Zap fill="white" size={16} />
          </div>
          <span className="font-bold text-xl text-slate-900">ELEC<span className="text-blue-600">TECH</span></span>
        </div>
        <p className="text-slate-500 text-sm mb-8">
          Votre partenaire confiance pour tous travaux électriques.<br/>
          Intervention Paris & Île-de-France.
        </p>
        <div className="text-xs text-slate-400">
          © 2025 ElecTech SAS. Tous droits réservés. Mentions légales.
        </div>
      </footer>
    </div>
  )
}

export default ArtisanAfter
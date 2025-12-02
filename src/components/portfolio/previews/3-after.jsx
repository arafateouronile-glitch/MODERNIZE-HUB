// Portfolio APRÈS - Immobilier de Luxe (Ultra Premium)
import { motion } from 'framer-motion'
import { MapPin, Maximize, Home, ArrowRight, Play } from 'lucide-react'

const ImmobilierAfter = ({ demo }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation Transparente */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-6 bg-gradient-to-b from-black/50 to-transparent text-white">
        <div className="text-2xl font-serif font-bold tracking-widest">PRESTIGE ESTATE</div>
        <div className="hidden md:flex gap-10 text-sm font-medium tracking-wide uppercase">
          <a href="#" className="hover:text-white/70 transition-colors">Vente</a>
          <a href="#" className="hover:text-white/70 transition-colors">Location</a>
          <a href="#" className="hover:text-white/70 transition-colors">Nouveautés</a>
          <a href="#" className="hover:text-white/70 transition-colors">Agences</a>
        </div>
        <button className="bg-white text-slate-900 px-6 py-2 font-medium hover:bg-slate-100 transition-colors">
          Contactez-nous
        </button>
      </nav>

      {/* Hero Video/Image */}
      <section className="relative h-screen">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-22b4899975d6?q=80&w=2600&auto=format&fit=crop" 
          alt="Luxury Villa" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute bottom-20 left-12 text-white max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-sm font-bold tracking-widest mb-4 uppercase bg-black/30 backdrop-blur-md inline-block px-4 py-1">Exclusivité</div>
            <h1 className="text-6xl md:text-7xl font-serif mb-6 leading-none">Villa Riviera<br/>Saint-Tropez</h1>
            <div className="flex items-center gap-8 text-lg font-light backdrop-blur-sm bg-white/10 p-4 inline-flex border border-white/20">
              <span className="flex items-center gap-2"><Home size={18}/> 450 m²</span>
              <span className="flex items-center gap-2"><Maximize size={18}/> 2500 m² Terrain</span>
              <span className="font-bold">12.500.000 €</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-20 right-12">
          <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:scale-110 transition-transform group">
            <Play fill="white" className="w-6 h-6 text-white ml-1 group-hover:text-slate-200" />
          </button>
        </div>
      </section>

      {/* Recherche Rapide */}
      <div className="relative -mt-10 z-20 container mx-auto px-6">
        <div className="bg-white p-8 shadow-2xl flex flex-col md:flex-row gap-6 items-end max-w-5xl mx-auto">
          <div className="flex-1 w-full">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 block">Localisation</label>
            <input type="text" placeholder="Paris, Cannes, Monaco..." className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-slate-900 font-serif text-xl" />
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 block">Type de Bien</label>
            <select className="w-full border-b border-slate-200 py-2 focus:outline-none bg-transparent font-serif text-xl">
              <option>Villa Contemporaine</option>
              <option>Penthouse</option>
              <option>Manoir Historique</option>
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 block">Budget Max</label>
            <select className="w-full border-b border-slate-200 py-2 focus:outline-none bg-transparent font-serif text-xl">
              <option>Illimité</option>
              <option>10M € +</option>
              <option>5M € - 10M €</option>
            </select>
          </div>
          <button className="bg-slate-900 text-white px-8 py-4 font-bold hover:bg-slate-800 transition-colors w-full md:w-auto">
            RECHERCHER
          </button>
        </div>
      </div>

      {/* Collection Biens */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-serif">Dernières Acquisitions</h2>
            <a href="#" className="flex items-center gap-2 text-sm font-bold border-b border-slate-900 pb-1 hover:text-slate-600 hover:border-slate-600 transition-all">
              VOIR TOUT LE CATALOGUE <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200", title: "Penthouse Tour Eiffel", loc: "Paris 7e", price: "4.200.000 €" },
              { img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200", title: "Mas Provençal", loc: "Luberon", price: "2.800.000 €" },
              { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200", title: "Loft Industriel", loc: "Bordeaux", price: "1.500.000 €" },
            ].map((bien, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden mb-6 aspect-[4/3]">
                  <img src={bien.img} alt={bien.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif mb-1 group-hover:text-slate-600 transition-colors">{bien.title}</h3>
                    <p className="text-slate-500 flex items-center gap-2"><MapPin size={14}/> {bien.loc}</p>
                  </div>
                  <span className="font-bold text-lg">{bien.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Premium */}
      <section className="py-32 px-6 bg-slate-900 text-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-serif mb-8 leading-tight">L'Excellence du Service Immobilier</h2>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Au-delà de la vente, nous offrons un accompagnement complet. Conciergerie, gestion locative, rénovation d'intérieur : votre patrimoine mérite une attention particulière.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { title: "Estimation Privée", desc: "Expertise confidentielle sous 48h" },
                { title: "Conciergerie", desc: "Gestion 24/7 de votre propriété" },
                { title: "Design", desc: "Partenariat avec architectes renommés" },
                { title: "Juridique", desc: "Accompagnement notarial complet" }
              ].map((serv, idx) => (
                <div key={idx}>
                  <h4 className="font-bold text-xl mb-2">{serv.title}</h4>
                  <p className="text-slate-500 text-sm">{serv.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 border-2 border-white/10 translate-x-4 translate-y-4" />
            <img 
              src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200" 
              alt="Service" 
              className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Luxe */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-serif mb-4">Off Market</h3>
          <p className="text-slate-500 mb-8">
            Accédez à nos propriétés exclusives non publiées en ligne.
          </p>
          <div className="flex border-b border-slate-300 pb-2">
            <input type="email" placeholder="Votre adresse email" className="flex-1 focus:outline-none text-lg font-serif placeholder:font-sans" />
            <button className="text-xs font-bold uppercase tracking-widest hover:text-slate-600">S'inscrire</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
        <div className="font-serif text-2xl text-slate-900 mb-8">PRESTIGE ESTATE</div>
        <div className="flex justify-center gap-8 mb-8">
          <a href="#" className="hover:text-slate-900">Instagram</a>
          <a href="#" className="hover:text-slate-900">Facebook</a>
          <a href="#" className="hover:text-slate-900">LinkedIn</a>
        </div>
        <p>© 2025 Prestige Estate. L'immobilier d'exception.</p>
      </footer>
    </div>
  )
}

export default ImmobilierAfter
// Portfolio APRÈS - Salle de Sport (Ultra Premium / High Energy)
import { motion } from 'framer-motion'
import { Zap, Activity, Trophy, Timer } from 'lucide-react'

const SalleSportAfter = ({ demo }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-neon-green/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="text-2xl font-black italic tracking-tighter">
          KINETIC<span className="text-primary">.</span>
        </div>
        <button className="bg-primary text-black font-bold px-6 py-2 skew-x-[-10deg] hover:bg-white transition-colors">
          <span className="block skew-x-[10deg]">JOIN NOW</span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Video Simulation */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2400&auto=format&fit=crop" 
            alt="Gym Atmosphere" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-8xl md:text-[10rem] font-black leading-[0.8] italic uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Unleash<br/>
              <span className="text-stroke text-primary">Power</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary/80 max-w-xl font-light mb-10 border-l-4 border-primary pl-6">
              Plus qu'une salle de sport. Un sanctuaire de la performance humaine.
              Technologie de pointe. Coaching d'élite.
            </p>
            <div className="flex gap-6">
              <button className="bg-primary text-black font-bold px-8 py-4 text-xl hover:scale-105 transition-transform uppercase tracking-wider">
                Essai Gratuit
              </button>
              <button className="border border-white/30 text-white font-bold px-8 py-4 text-xl hover:bg-white/10 transition-colors uppercase tracking-wider">
                Voir le planning
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 right-10 flex items-center gap-4 text-primary">
          <span className="font-mono text-sm">SCROLL DOWN</span>
          <div className="w-[1px] h-20 bg-primary animate-pulse" />
        </div>
      </section>

      {/* Stats Marquee */}
      <div className="bg-primary py-4 overflow-hidden text-black font-black text-4xl italic uppercase whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
          className="flex gap-12"
        >
          <span>No Pain No Gain</span> • <span>Elite Equipment</span> • <span>24/7 Access</span> • <span>Personal Training</span> • <span>Sauna & Spa</span> • <span>No Pain No Gain</span> • <span>Elite Equipment</span> • <span>24/7 Access</span>
        </motion.div>
      </div>

      {/* Features Grid */}
      <section className="py-32 px-8 bg-[#0a0a0a]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "High Tech", desc: "Équipement Technogym connectée dernière génération.", icon: <Activity /> },
              { title: "Zone Crossfit", desc: "Espace brut de 500m² pour la performance pure.", icon: <Zap /> },
              { title: "Récupération", desc: "Cryothérapie et massages pour optimiser vos gains.", icon: <Timer /> },
              { title: "Communauté", desc: "Événements mensuels et challenges membres.", icon: <Trophy /> },
            ].map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10, backgroundColor: "#151515" }}
                className="bg-[#111] p-8 border border-white/5 group transition-colors"
              >
                <div className="text-primary mb-6 w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-black transition-all">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-bold uppercase italic mb-3">{feat.title}</h3>
                <p className="text-primary/60">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-32 px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-6xl font-black italic text-center mb-20 text-white">
            CHOOSE YOUR <span className="text-primary">WEAPON</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Card 1 */}
            <div className="bg-[#111] p-8 border border-white/10 text-center opacity-60 hover:opacity-100 transition-opacity">
              <h3 className="text-xl font-bold mb-2">STARTER</h3>
              <div className="text-4xl font-black mb-4">49€<span className="text-sm font-normal text-primary/60">/mo</span></div>
              <ul className="text-primary/60 space-y-3 mb-8 text-sm text-left pl-4">
                <li>• Accès 06h-23h</li>
                <li>• Cardio & Muscu</li>
                <li>• Vestiaires standards</li>
              </ul>
              <button className="w-full border border-white text-white py-3 font-bold uppercase hover:bg-white hover:text-black transition-colors">Select</button>
            </div>

            {/* Card 2 - Featured */}
            <div className="bg-[#1a1a1a] p-10 border-2 border-primary text-center transform scale-110 shadow-[0_0_50px_rgba(217,255,0,0.2)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black px-4 py-1 font-bold text-xs uppercase tracking-widest">Most Popular</div>
              <h3 className="text-2xl font-black italic mb-2 text-primary">ATHLETE</h3>
              <div className="text-6xl font-black mb-4">79€<span className="text-sm font-normal text-gray-400">/mo</span></div>
              <ul className="text-gray-300 space-y-4 mb-10 text-sm text-left pl-4">
                <li className="flex items-center gap-2"><Check size={16} className="text-primary"/> Accès 24/7 Illimité</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-primary"/> Accès tous les clubs</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-primary"/> Invité gratuit le WE</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-primary"/> Accès Spa & Sauna</li>
              </ul>
              <button className="w-full bg-primary text-black py-4 font-black uppercase hover:brightness-110 transition-all text-xl">
                JOIN ELITE
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-[#111] p-8 border border-white/10 text-center opacity-60 hover:opacity-100 transition-opacity">
              <h3 className="text-xl font-bold mb-2">PERFORMANCE</h3>
              <div className="text-4xl font-black mb-4">129€<span className="text-sm font-normal text-primary/60">/mo</span></div>
              <ul className="text-primary/60 space-y-3 mb-8 text-sm text-left pl-4">
                <li>• Tout du pack Athlete</li>
                <li>• 2h Coaching / mois</li>
                <li>• Nutrition plan</li>
              </ul>
              <button className="w-full border border-white text-white py-3 font-bold uppercase hover:bg-white hover:text-black transition-colors">Select</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10 text-center">
        <div className="text-4xl font-black italic text-white mb-8">KINETIC.</div>
        <div className="flex justify-center gap-8 font-bold text-gray-500 uppercase tracking-widest text-sm">
          <a href="#" className="hover:text-primary">Instagram</a>
          <a href="#" className="hover:text-primary">TikTok</a>
          <a href="#" className="hover:text-primary">Youtube</a>
        </div>
      </footer>
    </div>
  )
}

// Icon helper
const Check = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

export default SalleSportAfter
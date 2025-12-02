import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowLeft, Menu, X, Check, ArrowRight, Instagram, Facebook, Twitter, Linkedin, MapPin, Phone, Mail, ShoppingBag, Search, Star, ArrowUpRight, Play, Quote } from 'lucide-react'
import { portfolioProjects } from '../data/portfolioMockups'

export const DemoPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  const project = portfolioProjects.find(p => p.id === id)

  if (!project) return null

  const { colors } = project
  const isLight = colors.primary === '#FFFFFF' || colors.primary === '#F7F9FB' || colors.primary === '#F4E4C1'

  const styles = {
    bg: colors.primary,
    text: isLight ? '#000000' : '#FFFFFF',
    accent: colors.accent,
    secondary: colors.secondary
  }

  // --- RENDU SPÉCIFIQUE PAR PROJET ---

  const renderProjectContent = () => {
    switch (id) {
      
      // 1. CABINET AVOCATS - Style "Editorial Prestige"
      case 'cabinet-avocats':
        return (
          <div className="font-serif bg-[#0C0C0C] text-[#E0E0E0] min-h-screen selection:bg-[#D4AF37] selection:text-black">
            <section className="h-screen flex flex-col justify-center items-center px-12 border-x border-white/5 mx-auto max-w-7xl relative bg-[#0C0C0C]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-px bg-gradient-to-b from-[#D4AF37] to-transparent" />
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-6xl md:text-9xl text-center tracking-tighter mb-8 text-[#F0F0F0]"
              >
                VANDERBILT <span className="text-[#D4AF37] italic">&</span> ASSOCIES
              </motion.h1>
              <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-12">Droit des Affaires • Fiscalité • International</p>
              
              {/* LANDING PAGE OPTIMIZATION: Call To Action Form */}
              <div className="bg-[#141414] p-6 border border-[#D4AF37]/20 max-w-md w-full mb-12 shadow-2xl">
                <p className="text-center text-xs uppercase tracking-widest mb-4 text-[#D4AF37]">Consultation confidentielle</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Votre email professionnel" className="bg-transparent border-b border-white/10 w-full py-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors text-white" />
                  <button className="whitespace-nowrap bg-[#D4AF37] text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#F0E6D2] transition-colors">
                    Être rappelé
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-px bg-[#D4AF37]/10 w-full max-w-3xl border border-[#D4AF37]/10">
                {['Excellence', 'Rigueur', 'Confidentialité'].map((item, i) => (
                  <div key={i} className="bg-[#0C0C0C] p-6 text-center hover:bg-[#D4AF37]/5 transition-colors duration-500">
                    <span className="block text-2xl mb-2 text-[#D4AF37]">✦</span>
                    <span className="uppercase text-xs tracking-widest text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="py-32 px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center bg-[#0C0C0C]">
              <div>
                <h2 className="text-4xl italic mb-8 text-[#F0F0F0]">"La justice est la vérité en action."</h2>
                <p className="text-lg leading-relaxed text-gray-400 font-sans mb-8">
                  Depuis 1985, notre cabinet défend les intérêts des plus grandes entreprises européennes. 
                  Une approche stratégique du droit, où chaque détail compte.
                </p>
                
                {/* TRUST MARKERS */}
                <div className="flex gap-8 mb-12 border-t border-white/10 pt-8">
                   <div>
                     <span className="block text-3xl font-light text-white">98%</span>
                     <span className="text-xs uppercase tracking-widest text-[#D4AF37]">Taux de succès</span>
                   </div>
                   <div>
                     <span className="block text-3xl font-light text-white">500M€+</span>
                     <span className="text-xs uppercase tracking-widest text-[#D4AF37]">Litiges gérés</span>
                   </div>
                </div>

                <button className="border-b border-[#D4AF37] pb-2 text-[#D4AF37] uppercase tracking-widest hover:text-white hover:border-white transition-colors">
                  Rencontrer nos associés
                </button>
              </div>
              <div className="aspect-[3/4] bg-[#141414] relative border border-white/5">
                <div className="absolute inset-4 border border-white/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] to-transparent opacity-50" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-5xl font-light text-white">250+</p>
                  <p className="text-xs uppercase tracking-widest text-[#D4AF37]">Dossiers gagnés</p>
                </div>
              </div>
            </section>

            {/* ENHANCED FOOTER */}
            <footer className="border-t border-white/10 bg-[#080808] py-16 px-12">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                  <div className="col-span-2">
                    <h3 className="text-3xl font-serif mb-4 text-[#F0F0F0]">VANDERBILT <span className="text-[#D4AF37] italic">&</span> ASSOCIES</h3>
                    <p className="text-sm text-gray-500 max-w-md leading-relaxed font-sans">
                      Cabinet d'avocats d'affaires reconnu pour son excellence et sa rigueur depuis 1985.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[#D4AF37] uppercase tracking-widest text-xs mb-4 font-sans">Contact</h4>
                    <div className="space-y-2 text-sm text-gray-500 font-sans">
                      <p>123 Avenue Foch</p>
                      <p>75116 Paris, France</p>
                      <p>+33 1 23 45 67 89</p>
                      <p>contact@vanderbilt.fr</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#D4AF37] uppercase tracking-widest text-xs mb-4 font-sans">Suivez-nous</h4>
                    <div className="flex gap-4">
                      {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                        <Icon key={i} className="w-5 h-5 text-gray-600 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-sans">
                  <p>© 2025 Vanderbilt & Associés. Tous droits réservés.</p>
                  <div className="flex items-center gap-6">
                    <span>Mentions Légales</span>
                    <span>Politique de Confidentialité</span>
                    <span className="text-[#D9FF00]">Site réalisé par Modernize Hub</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )

      // 2. RESTAURANT - Style "Immersif Sensoriel"
      case 'restaurant-gastronomique':
        return (
          <div className="bg-[#1C1917] text-[#F5F5F4] font-sans min-h-screen selection:bg-[#C41E3A] selection:text-white">
            <section className="h-screen relative flex items-center justify-center overflow-hidden bg-[#1C1917]">
              {/* Video Background Placeholder */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-30 scale-110 animate-pulse-slow mix-blend-overlay" />
              
              <div className="relative z-10 text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="border border-[#F5F5F4]/20 p-12 backdrop-blur-md bg-black/40 shadow-2xl"
                >
                  <p className="uppercase tracking-[0.5em] text-xs mb-6 text-[#A8A29E]">Experience Culinaire</p>
                  <h1 className="text-6xl md:text-8xl font-serif italic mb-6 text-white">L'Épicurien</h1>
                  <p className="text-[#C41E3A] font-bold tracking-widest uppercase text-sm mb-8">Guide Michelin 2025</p>
                  
                  {/* LANDING PAGE OPTIMIZATION: Main CTA */}
                  <button className="bg-[#C41E3A] text-white px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-[#C41E3A] transition-colors shadow-lg shadow-[#C41E3A]/20">
                    Réserver une table
                  </button>
                </motion.div>
              </div>
              
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest opacity-70">Découvrir</span>
                <div className="w-px h-16 bg-[#F5F5F4] opacity-30" />
              </div>
            </section>

            <section className="py-32 px-6 max-w-5xl mx-auto text-center relative bg-[#1C1917]">
              {/* Floating Booking Button for Scroll */}
              <motion.button 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="fixed top-24 right-6 z-40 bg-[#C41E3A] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg md:hidden"
              >
                <Phone className="w-4 h-4" />
              </motion.button>

              <span className="text-[#C41E3A] text-xl mb-4 block font-serif italic">Notre Philosophie</span>
              <h2 className="text-4xl md:text-5xl uppercase tracking-widest mb-12 font-light text-[#E7E5E4]">De la Terre à l'Assiette</h2>
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { t: 'Saisonnalité', d: 'Produits frais du marché' },
                  { t: 'Créativité', d: 'Cuisine fusion moderne' },
                  { t: 'Excellence', d: 'Service 5 étoiles' }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-square rounded-full border border-[#F5F5F4]/10 mb-6 flex items-center justify-center group-hover:border-[#C41E3A] transition-colors bg-[#292524] shadow-xl">
                      <span className="text-3xl font-serif italic text-[#D6D3D1]">{i+1}</span>
                    </div>
                    <h3 className="uppercase tracking-widest mb-2 text-sm font-bold text-[#E7E5E4]">{item.t}</h3>
                    <p className="opacity-60 text-sm font-serif italic text-[#A8A29E]">{item.d}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-20">
                 <button className="border border-[#F5F5F4]/30 px-8 py-3 uppercase tracking-widest text-xs text-[#E7E5E4] hover:bg-[#F5F5F4] hover:text-[#1C1917] transition-colors">
                   Voir le Menu Dégustation
                 </button>
              </div>
            </section>

            {/* ENHANCED FOOTER */}
            <footer className="bg-[#0C0A09] border-t border-[#F5F5F4]/5 py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-16 mb-16">
                  <div>
                    <h3 className="text-4xl font-serif italic text-[#E7E5E4] mb-6">L'Épicurien</h3>
                    <p className="text-[#A8A29E] leading-relaxed mb-8 font-light">
                      Une expérience gastronomique inoubliable au cœur de Paris. Étoilé Michelin 2025.
                    </p>
                    <div className="flex gap-4">
                      {[Instagram, Facebook, Twitter].map((Icon, i) => (
                        <Icon key={i} className="w-5 h-5 text-[#78716C] hover:text-[#C41E3A] transition-colors cursor-pointer" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#C41E3A] uppercase tracking-widest text-xs mb-6 font-bold">Horaires</h4>
                    <div className="space-y-3 text-sm text-[#D6D3D1]">
                      <p>Lundi - Vendredi : 19h - 23h</p>
                      <p>Samedi - Dimanche : 12h - 14h30 • 19h - 23h</p>
                      <p className="text-[#C41E3A] mt-4 italic">Fermé le Mercredi</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#C41E3A] uppercase tracking-widest text-xs mb-6 font-bold">Contact</h4>
                    <div className="space-y-3 text-sm text-[#D6D3D1]">
                      <p>45 Rue du Faubourg Saint-Honoré</p>
                      <p>75008 Paris</p>
                      <p className="pt-3 font-medium">Réservation : +33 1 42 65 00 00</p>
                      <p className="text-[#A8A29E]">reservation@epicurien.fr</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#F5F5F4]/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#57534E]">
                  <p>© 2025 L'Épicurien. Tous droits réservés.</p>
                  <p className="text-[#D9FF00]">Site conçu par Modernize Hub</p>
                </div>
              </div>
            </footer>
          </div>
        )

      // 3. IMMOBILIER - Style "Clean & Map"
      case 'agence-immobiliere':
        return (
          <div className="bg-white text-[#0A2E4D] font-sans min-h-screen">
            <section className="relative h-[80vh] flex">
              <div className="w-full lg:w-1/2 flex flex-col justify-center px-12 lg:px-24 z-10 bg-white/90 backdrop-blur-xl lg:bg-white">
                <span className="text-[#FF6B35] font-bold tracking-wider uppercase text-xs mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-[#FF6B35]"></span>
                  Premium Real Estate
                </span>
                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                  Trouvez votre <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2E4D] to-[#FF6B35]">Exception.</span>
                </h1>
                
                {/* LANDING PAGE OPTIMIZATION: Advanced Search + Estimation CTA */}
                <div className="flex flex-col gap-4 w-full max-w-md">
                   <div className="bg-white shadow-2xl p-2 rounded-lg flex items-center gap-4 border border-gray-100">
                     <div className="flex-1 px-4 border-r">
                       <p className="text-xs text-gray-400 uppercase">Localisation</p>
                       <p className="font-bold">Paris, France</p>
                     </div>
                     <div className="flex-1 px-4">
                       <p className="text-xs text-gray-400 uppercase">Budget</p>
                       <p className="font-bold">Illimité</p>
                     </div>
                     <button className="bg-[#0A2E4D] text-white p-4 rounded-md hover:bg-[#FF6B35] transition-colors">
                       <Search className="w-5 h-5" />
                     </button>
                   </div>
                   <div className="flex items-center gap-4 text-sm font-medium">
                     <span className="text-gray-400">Ou alors ?</span>
                     <button className="text-[#FF6B35] underline hover:text-[#0A2E4D] transition-colors">
                       Estimer mon bien gratuitement
                     </button>
                   </div>
                </div>

              </div>
              <div className="absolute inset-0 lg:relative lg:w-1/2 bg-gray-100">
                <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070" className="w-full h-full object-cover" alt="Interior" />
              </div>
            </section>

            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                <h2 className="text-3xl font-bold">Biens à la Une</h2>
                <a href="#" className="text-[#FF6B35] font-bold flex items-center gap-2 hover:gap-4 transition-all">Voir tout <ArrowRight className="w-4 h-4" /></a>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
                    price: "2.4M €",
                    title: "Villa Montmorency",
                    features: "5 Chambres • 350 m² • Piscine"
                  },
                  {
                    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
                    price: "1.8M €",
                    title: "Penthouse Marais",
                    features: "3 Chambres • 180 m² • Terrasse"
                  },
                  {
                    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800",
                    price: "3.2M €",
                    title: "Hôtel Particulier",
                    features: "8 Chambres • 600 m² • Jardin"
                  }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                      <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase">Nouveau</div>
                      <div className="absolute bottom-4 right-4 bg-[#0A2E4D] text-white px-4 py-2 rounded text-sm font-bold">{item.price}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-4">
                      {item.features}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Added Trust Banner */}
              <div className="mt-20 bg-[#0A2E4D] rounded-3xl p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8">
                 <div>
                   <h3 className="text-2xl font-bold mb-2">Vous vendez ?</h3>
                   <p className="text-white/70">Confiez votre bien à l'élite de l'immobilier parisien.</p>
                 </div>
                 <div className="flex gap-8 text-center">
                    <div>
                      <span className="block text-3xl font-bold text-[#FF6B35]">15j</span>
                      <span className="text-xs uppercase opacity-70">Délai moyen</span>
                    </div>
                    <div>
                      <span className="block text-3xl font-bold text-[#FF6B35]">100%</span>
                      <span className="text-xs uppercase opacity-70">Au prix</span>
                    </div>
                 </div>
                 <button className="bg-white text-[#0A2E4D] px-8 py-3 rounded-lg font-bold hover:bg-[#FF6B35] hover:text-white transition-colors">
                   Contacter un agent
                 </button>
              </div>

            </section>

            {/* ENHANCED FOOTER */}
            <footer className="bg-white border-t border-gray-100 py-16 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                  <div className="col-span-2">
                    <h3 className="text-2xl font-bold text-[#0A2E4D] mb-4">Prestige Immobilier</h3>
                    <p className="text-gray-600 leading-relaxed max-w-md mb-6">
                      L'agence de référence pour l'immobilier de prestige à Paris et ses environs.
                    </p>
                    <div className="flex gap-4">
                      {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                        <Icon key={i} className="w-5 h-5 text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#FF6B35] font-bold text-sm mb-4">Agences</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Paris 8ème</p>
                      <p>Paris 16ème</p>
                      <p>Neuilly-sur-Seine</p>
                      <p>Saint-Germain</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#FF6B35] font-bold text-sm mb-4">Contact</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>+33 1 45 67 89 01</p>
                      <p>contact@prestige-immo.fr</p>
                      <p className="pt-2 text-[#0A2E4D] font-medium">Ouvert 7j/7</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                  <p>© 2025 Prestige Immobilier. Tous droits réservés. Carte T n°12345678</p>
                  <div className="flex items-center gap-6">
                    <span>CGV</span>
                    <span>Mentions Légales</span>
                    <span className="text-[#D9FF00] font-medium">Créé par Modernize Hub</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )

      // 4. COACH SPORTIF - Style "Brutalist Neon"
      case 'coach-sportif':
        return (
          <div className="bg-[#111111] text-white font-sans min-h-screen">
            <section className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden bg-[#111111]">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[#00FF88] opacity-5 -skew-x-12" />
              
              <div className="max-w-6xl mx-auto w-full z-10">
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="mb-8"
                >
                  <span className="bg-[#00FF88] text-black px-4 py-1 font-black text-sm uppercase skew-x-[-10deg] inline-block mb-4 shadow-[4px_4px_0px_white]">
                    Coaching Élite
                  </span>
                  <h1 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase italic">
                    Push <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-transparent" style={{ WebkitTextStroke: '2px #00FF88' }}>Limits</span>
                  </h1>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-end">
                  <p className="text-xl text-[#A3A3A3] font-bold max-w-md border-l-4 border-[#00FF88] pl-6">
                    Transforme ton corps et ton mental en 90 jours. Programme personnalisé. Résultats garantis.
                  </p>
                  
                  {/* LANDING PAGE OPTIMIZATION: Lead Capture */}
                  <div className="bg-[#1F1F1F] p-6 border-2 border-[#333] skew-x-[-5deg] shadow-[8px_8px_0px_#00FF88]">
                    <h3 className="text-xl font-black uppercase mb-4 text-[#00FF88]">Séance Bilan Offerte</h3>
                    <div className="flex flex-col gap-4">
                       <input type="text" placeholder="TON NOM" className="bg-[#111] border border-[#333] p-3 font-bold text-white focus:border-[#00FF88] outline-none transition-colors" />
                       <input type="email" placeholder="TON EMAIL" className="bg-[#111] border border-[#333] p-3 font-bold text-white focus:border-[#00FF88] outline-none transition-colors" />
                       <button className="bg-white text-black px-8 py-4 font-black text-xl uppercase hover:bg-[#00FF88] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_#333]">
                         JE FONCE
                       </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Text */}
              <div className="absolute bottom-0 left-0 whitespace-nowrap opacity-5 pointer-events-none">
                <span className="text-[20vh] font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>
                  NO PAIN NO GAIN NO PAIN NO GAIN
                </span>
              </div>
            </section>

            <section className="bg-[#00FF88] text-black py-20 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {['Muscle', 'Cardio', 'Mental', 'Nutrition'].map((stat, i) => (
                  <div key={i} className="border-4 border-black p-8 text-center hover:bg-black hover:text-[#00FF88] transition-colors cursor-pointer group bg-white">
                    <h3 className="text-3xl font-black uppercase mb-2">{stat}</h3>
                    <div className="w-full h-4 bg-black/10 mt-4 rounded-none overflow-hidden group-hover:bg-[#333]">
                      <div className="h-full bg-black w-3/4 group-hover:bg-[#00FF88]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ENHANCED FOOTER */}
            <footer className="bg-[#0A0A0A] py-16 px-6 border-t-4 border-[#00FF88]">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                  <div className="col-span-2">
                    <h3 className="text-4xl font-black text-white uppercase mb-6 italic">APEX FITNESS</h3>
                    <p className="text-[#737373] text-lg font-bold mb-8 max-w-md">
                      Transforme ton physique. Dépasse tes limites. Atteins tes objectifs.
                    </p>
                    <div className="flex gap-4">
                      {[Instagram, Facebook, Twitter].map((Icon, i) => (
                        <div key={i} className="w-12 h-12 bg-[#00FF88] border-2 border-black flex items-center justify-center hover:bg-white transition-all cursor-pointer shadow-[4px_4px_0px_white]">
                          <Icon className="w-6 h-6 text-black" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#00FF88] uppercase font-black text-sm mb-6 tracking-widest bg-black inline-block px-2">Contact</h4>
                    <div className="space-y-3 text-white font-bold">
                      <p>123 Avenue de la Forme</p>
                      <p>75015 Paris</p>
                      <p className="text-[#00FF88] mt-4 text-xl">06 12 34 56 78</p>
                      <p>coach@apex-fitness.fr</p>
                    </div>
                  </div>
                </div>
                <div className="border-t-2 border-[#333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-[#525252] text-xs font-bold uppercase">© 2025 APEX FITNESS. ALL RIGHTS RESERVED.</p>
                  <p className="text-[#D9FF00] text-xs font-black uppercase">POWERED BY MODERNIZE HUB</p>
                </div>
              </div>
            </footer>
          </div>
        )

      // 5. ARTISAN - Style "Authentique"
      case 'artisan-premium':
        return (
          <div className="bg-[#f2f0eb] text-[#2c2416] font-serif min-h-screen">
            <section className="h-screen flex">
              <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-between border-r border-[#2c2416]/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[#2c2416] rounded-full flex items-center justify-center">L</div>
                  <span className="uppercase tracking-widest text-sm">L'Atelier Boisé</span>
                </div>
                
                <div>
                  <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
                    L'art du bois, <br/>
                    <span className="italic text-[#8b7355]">façonné à la main.</span>
                  </h1>
                  <p className="font-sans text-[#8b7355] max-w-sm leading-relaxed mb-12">
                    Menuiserie d'art et ébénisterie sur mesure. Nous créons des pièces uniques qui racontent une histoire, votre histoire.
                  </p>
                  
                  {/* LANDING PAGE OPTIMIZATION: Quote Request */}
                  <div className="flex flex-col gap-4 items-start">
                    <button className="bg-[#2c2416] text-[#f2f0eb] px-8 py-4 font-sans text-sm uppercase tracking-widest hover:bg-[#8b7355] transition-colors shadow-xl">
                      Demander un devis gratuit
                    </button>
                    <span className="text-xs font-sans text-[#8b7355]/80 flex items-center gap-2">
                      <Check className="w-3 h-3" /> Réponse sous 24h
                    </span>
                  </div>
                </div>

                <div className="flex gap-8 font-sans text-xs uppercase tracking-widest opacity-60">
                  <span>Depuis 1968</span>
                  <span>Made in France</span>
                </div>
              </div>
              
              <div className="hidden md:block w-1/2 relative">
                <div className="absolute inset-4 border border-[#2c2416]/20 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1965" 
                  className="w-full h-full object-cover grayscale contrast-125" 
                  alt="Workshop" 
                />
              </div>
            </section>

            <section className="py-32 px-6 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-px bg-[#2c2416]/10 border border-[#2c2416]/10">
                {[
                  { num: '01', t: 'Conception', d: 'Dessins et plans 3D' },
                  { num: '02', t: 'Fabrication', d: 'Sélection des essences' },
                  { num: '03', t: 'Pose', d: 'Installation soignée' }
                ].map((step, i) => (
                  <div key={i} className="bg-[#f2f0eb] p-12 hover:bg-white transition-colors">
                    <span className="text-4xl text-[#2c2416]/20 font-bold mb-6 block">{step.num}</span>
                    <h3 className="text-xl uppercase tracking-widest mb-4">{step.t}</h3>
                    <p className="font-sans text-[#8b7355]">{step.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ENHANCED FOOTER */}
            <footer className="bg-[#e8e6e0] border-t border-[#2c2416]/10 py-16 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                  <div className="col-span-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 border-2 border-[#2c2416] rounded-full flex items-center justify-center text-2xl font-serif">L</div>
                      <h3 className="text-2xl uppercase tracking-widest font-serif">L'Atelier Boisé</h3>
                    </div>
                    <p className="text-[#8b7355] leading-relaxed max-w-md font-sans mb-6">
                      Menuiserie d'art et ébénisterie sur mesure depuis 1968. Chaque pièce raconte une histoire.
                    </p>
                    <div className="flex gap-8 text-xs uppercase tracking-widest text-[#2c2416]/60 font-sans">
                      <span>Made in France</span>
                      <span>Artisan d'Art</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#8b7355] uppercase tracking-widest text-xs mb-4 font-sans font-bold">Atelier</h4>
                    <div className="space-y-2 text-sm text-[#2c2416]/70 font-sans">
                      <p>15 Rue des Artisans</p>
                      <p>69001 Lyon</p>
                      <p className="pt-3 font-medium">04 78 12 34 56</p>
                      <p>contact@atelier-boise.fr</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#8b7355] uppercase tracking-widest text-xs mb-4 font-sans font-bold">Horaires</h4>
                    <div className="space-y-2 text-sm text-[#2c2416]/70 font-sans">
                      <p>Lun - Ven : 9h - 18h</p>
                      <p>Samedi : 10h - 17h</p>
                      <p className="text-[#8b7355] pt-2 italic">Sur rendez-vous</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#2c2416]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#2c2416]/50 font-sans">
                  <p>© 2025 L'Atelier Boisé. Tous droits réservés.</p>
                  <p className="text-[#D9FF00] font-medium">Site web par Modernize Hub</p>
                </div>
              </div>
            </footer>
          </div>
        )

      // 6. STARTUP TECH - Style "Glassmorphism"
      case 'startup-tech':
        return (
          <div className="bg-[#0B1120] text-white font-sans min-h-screen overflow-hidden relative">
            {/* Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#6366F1] rounded-full blur-[150px] opacity-30" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#EC4899] rounded-full blur-[150px] opacity-20" />

            <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-[#1E293B]/50 border border-[#334155] rounded-full px-4 py-1.5 mb-8 backdrop-blur-md shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                <span className="text-xs font-medium tracking-wide text-[#94A3B8]">Version 2.0 is live</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#94A3B8]">
                Future of <br/> Analytics.
              </h1>
              
              <p className="text-lg text-[#94A3B8] max-w-2xl mb-12 font-light">
                Des données en temps réel, une interface intuitive et des prédictions basées sur l'IA. 
                Prenez de meilleures décisions, plus rapidement.
              </p>

              {/* LANDING PAGE OPTIMIZATION: Email Signup */}
              <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg mx-auto mb-12">
                <input type="email" placeholder="name@company.com" className="flex-1 bg-[#1E293B]/50 border border-[#334155] rounded-xl px-6 py-4 outline-none focus:border-[#6366F1] transition-colors backdrop-blur-md text-white placeholder:text-[#475569]" />
                <button className="bg-[#6366F1] hover:bg-[#4F46E5] px-8 py-4 rounded-xl font-bold shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all whitespace-nowrap text-white">
                  Start Free Trial
                </button>
              </div>
              <p className="text-xs text-[#64748B] mt-[-2rem] mb-12">No credit card required • 14-day free trial</p>

              {/* Dashboard Preview */}
              <motion.div 
                initial={{ y: 100, opacity: 0, rotateX: 20 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full max-w-5xl aspect-video bg-[#1E293B]/30 border border-[#334155] rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#334155]/20 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-10 bg-[#0F172A]/50 border-b border-[#334155] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#EAB308]" />
                  <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                </div>
                <div className="p-8 grid grid-cols-3 gap-6 mt-8">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-32 rounded-xl bg-[#334155]/20 border border-[#334155]/30 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                  <div className="col-span-3 h-64 rounded-xl bg-[#334155]/20 border border-[#334155]/30" />
                </div>
              </motion.div>
            </section>

            {/* ENHANCED FOOTER */}
            <footer className="bg-[#020617] border-t border-[#1E293B] py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                  <div className="col-span-2">
                    <h3 className="text-4xl font-bold text-white mb-6 tracking-tight">TechFlow.</h3>
                    <p className="text-[#64748B] leading-relaxed max-w-md mb-8">
                      La plateforme d'analytics nouvelle génération qui transforme vos données en décisions stratégiques.
                    </p>
                    <div className="flex gap-4">
                      {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                        <div key={i} className="w-10 h-10 bg-[#1E293B] border border-[#334155] rounded-lg flex items-center justify-center hover:bg-[#334155] transition-colors cursor-pointer">
                          <Icon className="w-5 h-5 text-[#94A3B8] hover:text-white" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-6">Produit</h4>
                    <div className="space-y-3 text-sm text-[#64748B]">
                      <p className="hover:text-[#6366F1] cursor-pointer transition-colors">Fonctionnalités</p>
                      <p className="hover:text-[#6366F1] cursor-pointer transition-colors">Tarifs</p>
                      <p className="hover:text-[#6366F1] cursor-pointer transition-colors">API</p>
                      <p className="hover:text-[#6366F1] cursor-pointer transition-colors">Documentation</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-6">Entreprise</h4>
                    <div className="space-y-3 text-sm text-[#64748B]">
                      <p className="hover:text-[#6366F1] cursor-pointer transition-colors">À propos</p>
                      <p className="hover:text-[#6366F1] cursor-pointer transition-colors">Blog</p>
                      <p className="hover:text-[#6366F1] cursor-pointer transition-colors">Carrières</p>
                      <p className="hover:text-[#6366F1] cursor-pointer transition-colors">Contact</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#1E293B] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#475569]">
                  <p>© 2025 TechFlow Analytics. All rights reserved.</p>
                  <div className="flex items-center gap-6">
                    <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                    <span className="text-[#D9FF00] font-medium">Built with Modernize Hub</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )

      // 7. E-COMMERCE - Style "Magazine"
      case 'ecommerce-mode':
        return (
          <div className="bg-[#F4F4F5] text-black font-sans min-h-screen">
            <nav className="fixed w-full z-20 px-6 py-6 flex justify-between items-center bg-[#F4F4F5]/80 backdrop-blur-sm border-b border-black/5">
              <span className="font-bold text-xl tracking-tighter">STUDIO.</span>
              <div className="flex gap-6 text-sm font-medium">
                <span>NEW IN</span>
                <span>APPAREL</span>
                <span>ACCESSORIES</span>
              </div>
              <div className="flex gap-4">
                <Search className="w-5 h-5" />
                <ShoppingBag className="w-5 h-5" />
              </div>
            </nav>

            <section className="pt-32 px-6 pb-12">
              <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-8 relative min-h-[70vh] bg-[#f5f5f5] overflow-hidden rounded-xl">
                  <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887" className="w-full h-full object-cover" alt="Fashion" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h2 className="text-6xl font-bold mb-2">Summer '25</h2>
                    <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                      SHOP COLLECTION
                    </button>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                  <div className="flex-1 bg-black text-white p-8 flex flex-col justify-center text-center rounded-xl">
                    <p className="text-sm uppercase tracking-widest mb-4 text-[#FF6B6B]">Limited Edition</p>
                    <h3 className="text-3xl font-bold mb-6">Urban Essentials</h3>
                    <span className="underline cursor-pointer hover:text-[#FF6B6B] transition-colors">Discover</span>
                  </div>
                  <div className="flex-1 bg-[#E4E4E7] relative overflow-hidden group cursor-pointer rounded-xl">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Detail" />
                  </div>
                </div>
              </div>
            </section>

            <section className="px-6 py-12 overflow-hidden bg-white">
              <motion.div 
                className="text-[15vw] font-black leading-none whitespace-nowrap opacity-5"
                animate={{ x: ["0%", "-100%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                STREETWEAR • LUXURY • MINIMAL •
              </motion.div>
            </section>

            {/* ENHANCED FOOTER */}
            <footer className="bg-black text-white py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-5 gap-12 mb-16">
                  <div className="col-span-2">
                    <h3 className="text-3xl font-bold mb-6">STUDIO.</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      Streetwear premium. Collections limitées. Livraison mondiale.
                    </p>
                    <div className="flex gap-4">
                      {[Instagram, Twitter, Facebook].map((Icon, i) => (
                        <div key={i} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                          <Icon className="w-5 h-5" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-6 text-sm">Shop</h4>
                    <div className="space-y-3 text-sm text-gray-400">
                      <p className="hover:text-white cursor-pointer">Nouveautés</p>
                      <p className="hover:text-white cursor-pointer">Homme</p>
                      <p className="hover:text-white cursor-pointer">Femme</p>
                      <p className="hover:text-white cursor-pointer">Accessoires</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-6 text-sm">Aide</h4>
                    <div className="space-y-3 text-sm text-gray-400">
                      <p className="hover:text-white cursor-pointer">Livraison</p>
                      <p className="hover:text-white cursor-pointer">Retours</p>
                      <p className="hover:text-white cursor-pointer">Tailles</p>
                      <p className="hover:text-white cursor-pointer">FAQ</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-6 text-sm">Newsletter</h4>
                    <p className="text-sm text-gray-400 mb-4">-10% sur ta première commande</p>
                    <div className="flex">
                      <input type="email" placeholder="Email" className="bg-white/10 px-4 py-2 text-sm flex-1 outline-none" />
                      <button className="bg-white text-black px-4 py-2 text-sm font-bold hover:bg-gray-200 transition-colors">OK</button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                  <p>© 2025 STUDIO. Tous droits réservés.</p>
                  <div className="flex items-center gap-6">
                    <span>CGV</span>
                    <span>Confidentialité</span>
                    <span className="text-[#D9FF00] font-medium">Site par Modernize Hub</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )

      // 8. AGENCE MARKETING - Style "Swiss Design"
      case 'agence-marketing':
        return (
          <div className="bg-[#F2F2F2] text-[#111111] font-sans min-h-screen">
            <div className="grid grid-cols-12 min-h-screen">
              {/* Sidebar / Nav */}
              <div className="col-span-2 border-r border-[#111] p-8 hidden md:flex flex-col justify-between bg-[#FAFAFA] sticky top-0 h-screen">
                <div className="font-bold text-2xl tracking-tighter bg-[#111] text-white p-2 inline-block">BOLD.</div>
                <nav className="flex flex-col gap-4 text-xl font-bold">
                  {['Work', 'Agency', 'News', 'Contact'].map(item => (
                    <a key={item} href="#" className="hover:text-[#D9FF00] hover:bg-[#111] px-2 -ml-2 transition-colors">{item}</a>
                  ))}
                </nav>
                <div className="text-xs font-mono">© 2025</div>
              </div>

              {/* Main Content */}
              <div className="col-span-12 md:col-span-10">
                <section className="p-12 md:p-24 min-h-[80vh] flex flex-col justify-center border-b border-[#111] relative overflow-hidden bg-[#F2F2F2]">
                  <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-7xl md:text-9xl font-black leading-[0.8] mb-12 tracking-tighter z-10"
                  >
                    WE CREATE <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00CC] to-[#333399]">DIGITAL</span> <br/>
                    IMPACT.
                  </motion.h1>
                  <div className="flex flex-col md:flex-row gap-12 items-start max-w-4xl z-10">
                    <div className="flex gap-4">
                       <ArrowRight className="w-12 h-12 shrink-0 bg-[#111] text-[#D9FF00] rounded-full p-2 rotate-45" />
                       <p className="text-xl font-medium leading-tight">
                         Agence créative spécialisée dans le branding disruptif et les expériences web immersives.
                         Nous ne suivons pas les tendances, nous les créons.
                       </p>
                    </div>
                    
                    {/* LANDING PAGE OPTIMIZATION: Primary CTA */}
                    <button className="bg-[#FF00CC] text-white px-8 py-6 text-xl font-black uppercase tracking-tighter hover:bg-[#111] hover:scale-105 transition-all shadow-[8px_8px_0px_#111] rotate-2">
                       Start Project
                    </button>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#D9FF00] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow" />
                </section>

                <section className="grid md:grid-cols-2 bg-[#FAFAFA]">
                  <div className="aspect-square bg-[#111] p-12 text-white flex flex-col justify-between group hover:bg-[#D9FF00] hover:text-black transition-colors cursor-pointer border-r border-b border-[#111]">
                    <h3 className="text-4xl font-bold">Nike Campaign</h3>
                    <div className="flex justify-between items-end">
                      <span>Strategy / Art Direction</span>
                      <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                    </div>
                  </div>
                  <div className="aspect-square bg-[#FAFAFA] border-b border-[#111] p-12 flex flex-col justify-between group hover:bg-[#FF00CC] hover:text-white transition-colors cursor-pointer">
                    <h3 className="text-4xl font-bold">Spotify Rebrand</h3>
                    <div className="flex justify-between items-end">
                      <span>Identity / Motion</span>
                      <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                    </div>
                  </div>
                </section>

                {/* ENHANCED FOOTER */}
                <footer className="bg-white border-t border-[#111] py-16 px-12">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                      <div className="col-span-2">
                        <div className="font-bold text-4xl tracking-tighter bg-[#111] text-white p-3 inline-block mb-6">BOLD.</div>
                        <p className="text-[#111] text-lg font-medium max-w-md leading-tight mb-8">
                          Agence créative spécialisée dans le branding disruptif et les expériences digitales premium.
                        </p>
                        <div className="flex gap-4">
                          {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                            <div key={i} className="w-12 h-12 border-2 border-[#111] flex items-center justify-center hover:bg-[#111] hover:text-white transition-all cursor-pointer">
                              <Icon className="w-6 h-6" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-black text-sm mb-6 uppercase tracking-wider">Services</h4>
                        <div className="space-y-3 text-sm text-[#444]">
                          <p className="hover:text-black cursor-pointer font-medium">Branding</p>
                          <p className="hover:text-black cursor-pointer font-medium">Web Design</p>
                          <p className="hover:text-black cursor-pointer font-medium">Motion</p>
                          <p className="hover:text-black cursor-pointer font-medium">Strategy</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-black text-sm mb-6 uppercase tracking-wider">Contact</h4>
                        <div className="space-y-3 text-sm text-[#444]">
                          <p>45 Rue de la Créa</p>
                          <p>75003 Paris</p>
                          <p className="pt-3 font-bold text-black">hello@bold-agency.fr</p>
                          <p>+33 1 23 45 67 89</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t-2 border-[#111] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                      <p className="text-xs text-[#666] font-mono">© 2025 BOLD AGENCY. ALL RIGHTS RESERVED.</p>
                      <p className="text-xs font-black text-[#D9FF00] uppercase tracking-widest bg-black px-2">CRAFTED BY MODERNIZE HUB</p>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <h1>Design en cours de chargement...</h1>
          </div>
        )
    }
  }

  // --- RENDU COMMUN (HEADER / FOOTER WRAPPER) ---
  // Note: Pour ces designs très différents, le header/footer doit être intégré DANS chaque cas
  // ou alors être très adaptatif. Ici, j'ai inclus la structure principale dans chaque "case"
  // pour une liberté totale de layout.
  
  // Cependant, pour la navigation "Retour au portfolio", on la garde en commun fixed overlay.

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderProjectContent()}
        </motion.div>
      </AnimatePresence>

      {/* GLOBAL BACK NAVIGATION */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-black/90 backdrop-blur-xl border border-white/20 p-2 pl-6 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
      >
        <span className="text-white text-xs font-bold mr-2 hidden md:block">
          {project.title}
        </span>
        <div className="h-4 w-px bg-white/20 hidden md:block" />
        <button 
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#D9FF00] transition-colors px-2"
        >
          <ArrowLeft className="w-3 h-3" />
          Retour
        </button>
        <button
          onClick={() => navigate('/contact')}
          className="bg-[#D9FF00] text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-white transition-colors"
        >
          Je veux ce site
        </button>
      </motion.div>
    </>
  )
}

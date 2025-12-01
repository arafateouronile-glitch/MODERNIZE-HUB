// Portfolio APRÈS - Restaurant Gastronomique (Ultra Premium)
import { motion, useScroll, useTransform } from 'framer-motion'
import { Utensils, Clock, MapPin, Star, Calendar } from 'lucide-react'

const RestaurantAfter = ({ demo }) => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <div className="min-h-screen bg-black text-white font-serif selection:bg-rose-500/30">
      {/* Navigation Minimaliste */}
      <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-2xl tracking-[0.2em] font-light">L'ÉPHÉMÈRE</div>
        <div className="hidden md:flex gap-12 text-sm tracking-widest uppercase">
          <a href="#" className="hover:text-rose-400 transition-colors">La Carte</a>
          <a href="#" className="hover:text-rose-400 transition-colors">Le Chef</a>
          <a href="#" className="hover:text-rose-400 transition-colors">Vins</a>
        </div>
        <button className="border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-500 text-sm tracking-widest uppercase">
          Réserver
        </button>
      </nav>

      {/* Hero Immersif */}
      <div className="relative h-screen overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2400&auto=format&fit=crop" 
            alt="Chef Plating" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </motion.div>
        
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <div className="mb-4 text-rose-400 tracking-[0.3em] text-sm uppercase">Cuisine d'Auteur</div>
          <h1 className="text-7xl md:text-9xl font-thin tracking-tighter mb-8 mix-blend-overlay">
            SENS<span className="italic font-serif text-rose-500">O</span>RIAL
          </h1>
          <p className="max-w-xl text-gray-300 font-sans font-light leading-relaxed">
            Une expérience culinaire qui transcende le goût. 
            <br/>Voyagez au cœur de l'émotion gastronomique.
          </p>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10"
          >
            <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Introduction Chef */}
      <section className="py-32 px-6 bg-black relative">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-20 items-center">
          <div className="font-sans font-light text-gray-400 space-y-8">
            <h2 className="font-serif text-5xl text-white mb-8 leading-tight">
              "La cuisine n'est pas <br/>une technique,<br/> <span className="italic text-rose-500">c'est une émotion."</span>
            </h2>
            <p className="text-lg leading-relaxed">
              Inspiré par la nature et guidé par l'innovation, le Chef Alexandre Dubois réinvente les classiques français avec une audace contemporaine. Chaque assiette est une toile, chaque ingrédient une couleur.
            </p>
            <div className="flex gap-4 pt-4">
              <span className="flex items-center gap-2 text-yellow-500"><Star fill="currentColor" size={16}/> Michelin Star</span>
              <span className="flex items-center gap-2 text-yellow-500"><Star fill="currentColor" size={16}/> Gault & Millau</span>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 border border-rose-500/30 transition-transform duration-700 group-hover:rotate-6" />
            <img 
              src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9f4?q=80&w=1200&auto=format&fit=crop" 
              alt="Chef" 
              className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Menu Carte */}
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <div className="mb-20">
            <span className="text-rose-500 tracking-[0.2em] text-xs uppercase mb-4 block">La Carte</span>
            <h2 className="text-5xl font-serif">Symphonie de Saveurs</h2>
          </div>

          <div className="space-y-16">
            {[
              {
                category: "POUR COMMENCER",
                items: [
                  { name: "Saint-Jacques Sauvages", desc: "Carpaccio, agrumes rares, huile de vanille", price: "32€" },
                  { name: "Foie Gras Poêlé", desc: "Figues rôties, réduction de Porto, brioche maison", price: "28€" }
                ]
              },
              {
                category: "PLATS SIGNATURES",
                items: [
                  { name: "Homard Bleu", desc: "Rôti au beurre demi-sel, mousseline de céleri truffée", price: "58€" },
                  { name: "Filet de Bœuf Wagyu", desc: "Fumé au bois de hêtre, légumes oubliés glacés", price: "65€" }
                ]
              },
              {
                category: "DOUCEURS",
                items: [
                  { name: "Le Chocolat Noir", desc: "Texture en 5 façons, fève tonka, glace or", price: "22€" },
                  { name: "Sphère Citron", desc: "Meringue italienne, cœur coulant yuzu", price: "18€" }
                ]
              }
            ].map((section, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-sans tracking-[0.3em] text-gray-500 mb-10 border-b border-gray-900 pb-4 inline-block">{section.category}</h3>
                <div className="grid gap-12">
                  {section.items.map((item, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-2xl font-serif group-hover:text-rose-400 transition-colors">{item.name}</h4>
                        <span className="text-xl font-light text-rose-500">{item.price}</span>
                      </div>
                      <p className="text-gray-500 font-sans font-light italic text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réservation Parallax */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2400&auto=format&fit=crop" 
            alt="Interior" 
            className="w-full h-full object-cover fixed top-0"
            style={{ zIndex: -1 }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="relative z-10 bg-black/40 backdrop-blur-xl p-16 border border-white/10 max-w-2xl text-center">
          <h2 className="text-4xl font-serif mb-8">Réservez votre Table</h2>
          <div className="grid grid-cols-2 gap-6 mb-8 font-sans">
            <div className="bg-white/5 p-4 border border-white/10 hover:border-rose-500/50 transition-colors cursor-pointer">
              <Calendar className="mx-auto mb-2 text-rose-400" />
              <span>Date</span>
            </div>
            <div className="bg-white/5 p-4 border border-white/10 hover:border-rose-500/50 transition-colors cursor-pointer">
              <Clock className="mx-auto mb-2 text-rose-400" />
              <span>Heure</span>
            </div>
            <div className="bg-white/5 p-4 border border-white/10 hover:border-rose-500/50 transition-colors cursor-pointer">
              <Utensils className="mx-auto mb-2 text-rose-400" />
              <span>Invités</span>
            </div>
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-8 tracking-widest transition-colors">
              CONFIRMER
            </button>
          </div>
          <p className="text-sm text-gray-400 font-sans">
            Pour les groupes de plus de 8 personnes, veuillez nous contacter directement.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/10 text-center font-sans font-light">
        <div className="text-3xl font-serif tracking-[0.2em] mb-12">L'ÉPHÉMÈRE</div>
        <div className="flex flex-col md:flex-row justify-center gap-12 text-gray-400 mb-12">
          <div>
            <MapPin className="mx-auto mb-4 text-rose-500" />
            <p>12 Place Vendôme<br/>75001 Paris</p>
          </div>
          <div>
            <Clock className="mx-auto mb-4 text-rose-500" />
            <p>Mar - Sam: 19h - 23h<br/>Dim - Lun: Fermé</p>
          </div>
          <div>
            <Phone className="mx-auto mb-4 text-rose-500" />
            <p>+33 1 42 68 53 00<br/>reservation@ephemere.com</p>
          </div>
        </div>
        <div className="text-xs text-gray-700 uppercase tracking-widest">
          © 2025 L'Éphémère. Excellence Gastronomique.
        </div>
      </footer>
    </div>
  )
}

export default RestaurantAfter
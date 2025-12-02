import { scrollToSection } from '../../utils/helpers'
import { Shield, Lock, CreditCard, Award, Clock, Headphones } from 'lucide-react'

export const Footer = () => {
  const badges = [
    { icon: Shield, text: '100% Satisfait ou Remboursé' },
    { icon: Lock, text: 'Données 100% Sécurisées' },
    { icon: CreditCard, text: 'Paiement 3x Sans Frais' },
    { icon: Award, text: '70+ Sites Livrés' },
    { icon: Clock, text: 'Livraison en 14 Jours' },
    { icon: Headphones, text: 'Support 30 Jours Inclus' },
  ]

  return (
    <footer className="bg-black text-white pt-20 pb-6 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Trust Badges Section */}
        <div className="mb-16 pb-12 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-3 group">
                <div className="w-14 h-14 rounded-full bg-[#D9FF00]/10 border border-[#D9FF00]/30 flex items-center justify-center group-hover:bg-[#D9FF00]/20 transition-all">
                  <badge.icon className="w-6 h-6 text-[#D9FF00]" />
                </div>
                <p className="font-mono text-[10px] text-white/70 uppercase leading-tight tracking-wide">
                  {badge.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Giant Logo */}
        <div className="mb-20">
          <h1 className="font-display text-[12vw] leading-none font-bold text-white/5 select-none pointer-events-none text-center tracking-tighter">
            MODERNIZE
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-white/40">
          <p>© 2025 MODERNIZE HUB. TOUS DROITS RÉSERVÉS.</p>
          
          <div className="flex gap-8">
            <button onClick={() => scrollToSection('accueil')} className="hover:text-[#D9FF00] transition-colors">HAUT</button>
            <a href="#" className="hover:text-[#D9FF00] transition-colors">MENTIONS LÉGALES</a>
            <a href="#" className="hover:text-[#D9FF00] transition-colors">CONFIDENTIALITÉ</a>
            <a href="/admin" className="hover:text-[#D9FF00] transition-colors text-white/20">ADMIN</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

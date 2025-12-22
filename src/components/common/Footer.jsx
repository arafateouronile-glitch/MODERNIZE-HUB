import { scrollToSection } from '../../utils/helpers'
import { Shield, Lock, CreditCard, Award, Clock, Headphones } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export const Footer = () => {
  const { theme } = useTheme()
  const badges = [
    { icon: Shield, text: '100% Satisfait ou Remboursé' },
    { icon: Lock, text: 'Données 100% Sécurisées' },
    { icon: CreditCard, text: 'Paiement 3x Sans Frais' },
    { icon: Award, text: '70+ Sites Livrés' },
    { icon: Clock, text: 'Livraison en 14 Jours' },
    { icon: Headphones, text: 'Support 30 Jours Inclus' },
  ]

  return (
    <footer className={`pt-20 pb-6 border-t relative overflow-hidden ${
      theme === 'light' 
        ? 'bg-[#1A1A2E] text-white border-[#88A9C3]/20' 
        : 'bg-black text-white border-white/10'
    }`}>
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Trust Badges Section */}
        <div className={`mb-16 pb-12 border-b ${theme === 'light' ? 'border-white/20' : 'border-white/10'}`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-3 group">
                <div className="w-14 h-14 rounded-full bg-[#88A9C3]/10 border border-[#88A9C3]/30 flex items-center justify-center group-hover:bg-[#88A9C3]/20 transition-all">
                  <badge.icon className="w-6 h-6 text-[#88A9C3]" />
                </div>
                <p 
                  className="font-mono text-[10px] uppercase leading-tight tracking-wide"
                  style={{ color: theme === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)' }}
                >
                  {badge.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Giant Logo */}
        <div className="mb-20">
          <h1 
            className="font-display text-[12vw] leading-none font-bold select-none pointer-events-none text-center tracking-tighter"
            style={{ color: theme === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)' }}
          >
            MODERNIZE
          </h1>
        </div>

        {/* Contact Email */}
        <div className="text-center mb-8">
          <a 
            href="mailto:contact@modernizehub.com" 
            className="inline-flex items-center gap-2 font-mono text-sm text-[#88A9C3] hover:text-white transition-colors"
          >
            <span>📧</span>
            <span>contact@modernizehub.com</span>
          </a>
        </div>

        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs ${theme === 'light' ? 'text-white' : 'text-white/40'}`}>
          <p>© 2025 MODERNIZE HUB. TOUS DROITS RÉSERVÉS.</p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <button onClick={() => scrollToSection('accueil')} className={`transition-colors ${theme === 'light' ? 'text-white hover:text-[#88A9C3]' : 'hover:text-[#88A9C3]'}`}>HAUT</button>
            <a href="#" className={`transition-colors ${theme === 'light' ? 'text-white hover:text-[#88A9C3]' : 'hover:text-[#88A9C3]'}`}>MENTIONS LÉGALES</a>
            <a href="#" className={`transition-colors ${theme === 'light' ? 'text-white hover:text-[#88A9C3]' : 'hover:text-[#88A9C3]'}`}>CONFIDENTIALITÉ</a>
            <a href="/admin" className={`transition-colors ${theme === 'light' ? 'text-white/50 hover:text-[#88A9C3]' : 'text-white/20 hover:text-[#88A9C3]'}`}>ADMIN</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

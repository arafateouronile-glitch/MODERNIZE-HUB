import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { scrollToSection } from '../../utils/helpers'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '../../contexts/ThemeContext'

const navItems = [
  { label: 'Portfolio', id: '/portfolio', type: 'route' },
  { label: 'Agence', id: 'about', type: 'scroll' },
  { label: 'Processus', id: '/process', type: 'route' },
  { label: 'Nos Services', id: '/nos-services', type: 'route' },
  { label: 'Blog', id: '/blog', type: 'route' },
]

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false)
    
    if (item.type === 'route') {
      navigate(item.id)
    } else {
      // Si on est sur une autre page, aller à la home puis scroll
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => scrollToSection(item.id), 100)
      } else {
        scrollToSection(item.id)
      }
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-center pointer-events-none"
        style={theme === 'light' ? { backgroundColor: 'transparent' } : {}}
      >
        <div className={`pointer-events-auto flex items-center gap-2 transition-all duration-500 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
          {/* Dynamic Island Nav - NÉON uniforme en mode clair */}
          <nav 
            className={`flex items-center rounded-full transition-all ${
              theme === 'light' 
                ? 'border-2 border-black' 
                : 'bg-surface/80 backdrop-blur-xl border border-white/10 shadow-2xl'
            }`}
            style={theme === 'light' ? { 
              backgroundColor: '#D9FF00',
              boxShadow: 'none',
              backdropFilter: 'none',
              gap: '0px',
              padding: '2px'
            } : { gap: '4px', padding: '6px' }}
          >
            <button 
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/')
                } else {
                  scrollToSection('accueil')
                }
              }}
              className={`px-4 py-2 font-display font-bold transition-colors rounded-full ${
                theme === 'light'
                  ? 'text-black hover:text-black/70'
                  : 'text-white hover:text-[#D9FF00]'
              }`}
              style={theme === 'light' ? {
                backgroundColor: '#D9FF00'
              } : {}}
            >
              M.
            </button>

            <div className="hidden md:flex items-center mx-1" style={theme === 'light' ? { gap: '0px' } : { gap: '4px' }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    theme === 'light'
                      ? 'text-black hover:text-black/70'
                      : 'text-text-muted hover:text-text-main hover:bg-black/5'
                  }`}
                  style={theme === 'light' ? {
                    backgroundColor: '#D9FF00',
                    margin: '0'
                  } : {}}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <ThemeToggle />

            <button 
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/#contact')
                } else {
                  scrollToSection('contact')
                }
              }}
              className={`px-5 py-2.5 font-bold text-sm rounded-full transition-colors ${
                theme === 'light'
                  ? 'text-black hover:text-black/70'
                  : 'bg-[#D9FF00] text-black hover:bg-white'
              }`}
              style={theme === 'light' ? {
                backgroundColor: '#D9FF00'
              } : {}}
            >
              Parlons-en
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden p-2.5 rounded-full transition-colors ${
                theme === 'light'
                  ? 'text-black hover:bg-black/20'
                  : 'text-white hover:bg-white/10'
              }`}
              style={theme === 'light' ? {
                backgroundColor: '#D9FF00'
              } : {}}
            >
              <Menu size={20} />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed inset-4 z-[60] rounded-3xl flex flex-col items-center justify-center gap-8 overflow-hidden ${
              theme === 'light'
                ? 'bg-[#D9FF00] border-2 border-black'
                : 'bg-surface border border-white/10'
            }`}
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`absolute top-6 right-6 p-2 transition-colors ${
                theme === 'light'
                  ? 'text-black/50 hover:text-black'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <X size={32} />
            </button>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`font-display text-5xl font-bold transition-colors ${
                  theme === 'light'
                    ? 'text-black hover:text-black/70'
                    : 'text-white hover:text-[#D9FF00]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

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
          {/* Dynamic Island Nav - BLEU uniforme en mode clair */}
          <nav 
            className={`flex items-center rounded-full transition-all ${
              theme === 'light' 
                ? 'border-2 border-black' 
                : 'bg-surface/80 backdrop-blur-xl border border-white/10 shadow-2xl'
            }`}
            style={theme === 'light' ? { 
              backgroundColor: '#88A9C3',
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
                  : 'text-white hover:text-[#88A9C3]'
              }`}
              style={theme === 'light' ? {
                backgroundColor: 'transparent'
              } : {}}
            >
              M.
            </button>

            <div 
              className="hidden md:flex items-center mx-1" 
              style={{ 
                gap: theme === 'light' ? '0px' : '4px', 
                backgroundColor: 'transparent',
                background: 'none'
              }}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    theme === 'light'
                      ? 'text-black hover:text-black/70'
                      : 'text-text-muted hover:text-text-main hover:bg-black/5'
                  }`}
                  style={{ 
                    backgroundColor: 'transparent',
                    background: 'none',
                    margin: '0'
                  }}
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
                  : 'bg-[#88A9C3] text-black hover:bg-white'
              }`}
              style={theme === 'light' ? {
                backgroundColor: '#88A9C3'
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
                backgroundColor: '#88A9C3'
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
          <>
            {/* Backdrop avec blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[59]"
              style={{
                backgroundColor: theme === 'light' 
                  ? 'rgba(136, 169, 195, 0.3)' 
                  : 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            />
            {/* Menu avec dégradé transparent */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-4 right-4 bottom-4 w-80 z-[60] flex flex-col rounded-3xl overflow-hidden"
              style={{ 
                background: theme === 'light'
                  ? 'linear-gradient(135deg, rgba(136, 169, 195, 0.85) 0%, rgba(136, 169, 195, 0.95) 50%, rgba(107, 143, 168, 0.9) 100%)'
                  : 'linear-gradient(135deg, rgba(22, 27, 34, 0.9) 0%, rgba(15, 17, 22, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: theme === 'light' 
                  ? '1px solid rgba(255, 255, 255, 0.3)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: theme === 'light'
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Header du menu */}
              <div className="flex items-center justify-between p-6 border-b"
                style={{ 
                  borderColor: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                  background: 'transparent'
                }}
              >
                <span className={`font-display font-bold text-xl ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  Menu
                </span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-full transition-all ${
                    theme === 'light'
                      ? 'text-black/70 hover:text-black hover:bg-white/30'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => handleNavClick(item)}
                    className={`text-left font-display text-xl font-bold py-4 px-5 rounded-2xl transition-all ${
                      theme === 'light'
                        ? 'text-black/90 hover:text-black hover:bg-white/40'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Footer du menu */}
              <div className="p-4 border-t"
                style={{ 
                  borderColor: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                  background: 'transparent'
                }}
              >
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    if (location.pathname !== '/') {
                      navigate('/#contact')
                    } else {
                      scrollToSection('contact')
                    }
                  }}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    theme === 'light'
                      ? 'bg-black/90 text-white hover:bg-black'
                      : 'bg-[#88A9C3] text-black hover:bg-white'
                  }`}
                  style={{
                    boxShadow: theme === 'light' 
                      ? '0 4px 15px rgba(0, 0, 0, 0.2)' 
                      : '0 4px 15px rgba(136, 169, 195, 0.3)'
                  }}
                >
                  Parlons-en
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  const handleToggle = () => {
    toggleTheme()
  }

  return (
    <motion.button
      onClick={handleToggle}
      className={`p-2.5 rounded-full transition-all relative overflow-hidden group ${
        theme === 'light'
          ? 'border border-black/40'
          : 'bg-white/5 border border-white/10 hover:bg-white/10'
      }`}
      style={theme === 'light' ? {
        backgroundColor: 'transparent'
      } : {}}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className={`w-5 h-5 ${
              theme === 'light' ? 'text-black' : 'text-[#88A9C3]'
            }`} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-[#88A9C3]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}


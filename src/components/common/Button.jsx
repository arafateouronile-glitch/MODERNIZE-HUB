import { motion } from 'framer-motion'
import { cn } from '../../utils/helpers'

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  onClick, 
  type = 'button',
  disabled = false
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden group"
  
  const variants = {
    primary: "bg-[#D9FF00] text-background hover:bg-white hover:text-background shadow-lg shadow-[#D9FF00]/20",
    secondary: "bg-surfaceHighlight text-text-main border border-white/10 hover:bg-surfaceHighlight/80 active:bg-surfaceHighlight/70",
    outline: "bg-transparent border-2 border-[#D9FF00] text-[#D9FF00] hover:bg-[#D9FF00] hover:text-black",
    gradient: "bg-[#D9FF00] text-background shadow-lg shadow-[#D9FF00]/30 hover:shadow-[#D9FF00]/50 hover:scale-[1.02]"
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      
      {/* Glow Effect for Primary */}
      {variant === 'primary' && (
        <div className="absolute -inset-1 bg-[#D9FF00] rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      )}

      <span className="relative z-20 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}

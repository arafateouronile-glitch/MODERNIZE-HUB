import { ArrowRight } from 'lucide-react'

export const ContactButton = ({ variant = 'primary', text = 'Demander un Devis Gratuit', className = '' }) => {
  return (
    <a
      href="#contact"
      className={`group inline-flex items-center gap-3 px-8 py-4 ${
        variant === 'primary'
          ? 'bg-[#D9FF00] text-black hover:bg-white'
          : 'border-2 border-[#D9FF00] text-[#D9FF00] hover:bg-[#D9FF00] hover:text-black'
      } font-bold rounded-full transition-all duration-300 ${className}`}
    >
      <span>{text}</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </a>
  )
}


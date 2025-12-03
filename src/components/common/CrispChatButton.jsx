import { MessageCircle } from 'lucide-react'
import { openCrispChat } from '../../lib/crisp'

/**
 * Bouton pour ouvrir le chat Crisp
 * Utile si vous voulez contrôler manuellement l'ouverture du chat
 */
export const CrispChatButton = ({ variant = 'primary', className = '' }) => {
  const handleClick = () => {
    openCrispChat()
  }

  const baseStyles = 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1'
  
  const variants = {
    primary: 'bg-[#D9FF00] text-black hover:bg-[#C4E600]',
    secondary: 'bg-white text-[#0A0A0A] hover:bg-gray-100',
    outline: 'border-2 border-[#D9FF00] text-[#D9FF00] hover:bg-[#D9FF00] hover:text-black',
  }

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      aria-label="Ouvrir le chat"
    >
      <MessageCircle className="w-5 h-5" />
      <span>Discuter avec nous</span>
    </button>
  )
}



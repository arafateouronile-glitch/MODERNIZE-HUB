import { useState, useRef, useEffect } from 'react'
import { GripVertical, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const BeforeAfter = ({ before, after, onBeforeClick, onAfterClick }) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  useEffect(() => {
    if (isDragging) {
      const handleMouseUp = () => setIsDragging(false)
      const handleTouchEnd = () => setIsDragging(false)
      
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchend', handleTouchEnd)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging])

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    handleMouseMove(e)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] overflow-hidden select-none group/slider"
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={(e) => {
        setIsDragging(true)
        handleTouchMove(e)
      }}
    >
      {/* AVANT - Full Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0 bg-black cursor-pointer"
        onClick={() => onBeforeClick && onBeforeClick()}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {before?.image && (
          <img
            src={before.image}
            alt="Avant"
            className="w-full h-full object-cover absolute inset-0"
            loading="lazy"
            style={{
              filter: `grayscale(${100 - sliderPosition}%) contrast(${100 + sliderPosition / 2}%)`,
            }}
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        )}
        
        {/* Badge AVANT avec animation */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm text-white px-4 py-2 font-mono font-bold shadow-2xl z-20 border border-white/20 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          AVANT
        </motion.div>
        
        {/* Problems List avec meilleur design */}
        {before?.problems && before.problems.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-4 left-4 right-4 bg-black/95 backdrop-blur-md text-white p-4 font-mono z-20 border border-red-500/30"
          >
            <div className="font-bold text-red-500 mb-2 text-xs">❌ PROBLÈMES</div>
            <ul className="space-y-1 text-xs font-light">
              {before.problems.map((problem, idx) => (
                <li key={idx} className="flex items-center gap-2 opacity-80">
                  <span className="text-red-500">›</span>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {!before?.image && (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="text-center text-white p-8">
              <div className="text-7xl mb-4 opacity-30">📱</div>
              <div className="text-4xl font-bold mb-2 opacity-50">AVANT</div>
              <div className="text-xl opacity-40">Design obsolète</div>
            </div>
          </div>
        )}
      </motion.div>

      {/* APRÈS - Sliding Overlay */}
      <motion.div
        className="absolute inset-0 h-full overflow-hidden z-10"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-[#88A9C3]/10 cursor-pointer"
          onClick={() => onAfterClick && onAfterClick()}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {after?.image && (
            <img
              src={after.image}
              alt="Après"
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
              style={{
                filter: `saturate(${100 + sliderPosition / 2}%)`,
              }}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          )}
          
          {/* Badge APRÈS avec animation */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4 bg-[#88A9C3] text-black px-4 py-2 font-mono font-bold shadow-2xl z-20 border border-black/10 flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            APRÈS
          </motion.div>
          
          {/* Benefits List avec meilleur design */}
          {after?.benefits && after.benefits.length > 0 && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-4 right-4 left-4 bg-black/95 backdrop-blur-md text-white p-4 font-mono z-20 border border-[#88A9C3]/50"
            >
              <div className="font-bold text-[#88A9C3] mb-2 text-xs">✓ RÉSULTATS</div>
              <ul className="space-y-1 text-xs font-light">
                {after.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#88A9C3]">›</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {!after?.image && (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#88A9C3]/20 to-[#88A9C3]/5">
              <div className="text-center text-white p-8">
                <div className="text-7xl mb-4">✨</div>
                <div className="text-4xl font-bold mb-2 text-[#88A9C3]">APRÈS</div>
                <div className="text-xl text-text-muted">Design moderne</div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Slider Handle avec design amélioré */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-[#88A9C3] z-30 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        animate={{
          boxShadow: isHovering 
            ? '0 0 40px rgba(136, 169, 195, 0.8), 0 0 80px rgba(136, 169, 195, 0.4)'
            : '0 0 20px rgba(136, 169, 195, 0.6)',
        }}
      >
        {/* Handle Grip */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-full p-4 shadow-2xl pointer-events-auto cursor-col-resize border-4 border-[#88A9C3]"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <GripVertical className="w-6 h-6 text-[#88A9C3]" />
        </motion.div>

        {/* Visual indicators (arrows) */}
        <AnimatePresence>
          {isHovering && (
            <>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-1/2 -translate-y-1/2 left-[-60px] bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg text-white font-mono text-xs pointer-events-none"
              >
                ← AVANT
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute top-1/2 -translate-y-1/2 right-[-60px] bg-[#88A9C3]/90 backdrop-blur-sm px-3 py-2 rounded-lg text-black font-mono text-xs font-bold pointer-events-none"
              >
                APRÈS →
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Instruction Text - Plus visible */}
      {!isDragging && !isHovering && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md text-white px-6 py-3 font-mono text-sm font-bold z-30 pointer-events-none shadow-2xl border border-[#88A9C3]/30 flex items-center gap-3"
        >
          <Eye className="w-5 h-5 text-[#88A9C3] animate-pulse" />
          <span>Glissez pour comparer • Cliquez pour voir en détail</span>
        </motion.div>
      )}
    </div>
  )
}
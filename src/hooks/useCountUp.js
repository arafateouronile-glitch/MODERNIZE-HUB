import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export const useCountUp = (end, duration = 2000, shouldAnimate = true) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!shouldAnimate || !isInView || hasAnimated) return

    setHasAnimated(true)
    
    // Extract number from string (e.g., "+320%" -> 320, "70+" -> 70, "14J" -> 14)
    const numericEnd = typeof end === 'string' 
      ? parseInt(end.replace(/[^0-9]/g, '')) || 0
      : end

    if (numericEnd === 0) {
      setCount(end)
      return
    }

    const startTime = Date.now()
    const endTime = startTime + duration

    const timer = setInterval(() => {
      const now = Date.now()
      const remaining = endTime - now
      
      if (remaining <= 0) {
        setCount(end)
        clearInterval(timer)
      } else {
        const progress = 1 - (remaining / duration)
        // Easing function (ease-out cubic)
        const eased = 1 - Math.pow(1 - progress, 3)
        const currentCount = Math.floor(eased * numericEnd)
        
        // Reconstruct the original format
        if (typeof end === 'string') {
          const prefix = end.match(/^[^0-9]*/)[0]
          const suffix = end.match(/[^0-9]*$/)[0]
          setCount(`${prefix}${currentCount}${suffix}`)
        } else {
          setCount(currentCount)
        }
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [end, duration, shouldAnimate, isInView, hasAnimated])

  return [count, ref]
}




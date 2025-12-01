import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// Import all portfolio components
import CabinetAvocatBefore from './previews/1-before'
import CabinetAvocatAfter from './previews/1-after'
import RestaurantBefore from './previews/2-before'
import RestaurantAfter from './previews/2-after'
import ImmobilierBefore from './previews/3-before'
import ImmobilierAfter from './previews/3-after'
import SalleSportBefore from './previews/4-before'
import SalleSportAfter from './previews/4-after'
import ArtisanBefore from './previews/5-before'
import ArtisanAfter from './previews/5-after'

const portfolioComponents = {
  1: { before: CabinetAvocatBefore, after: CabinetAvocatAfter },
  2: { before: RestaurantBefore, after: RestaurantAfter },
  3: { before: ImmobilierBefore, after: ImmobilierAfter },
  4: { before: SalleSportBefore, after: SalleSportAfter },
  5: { before: ArtisanBefore, after: ArtisanAfter },
}

export const PortfolioViewer = ({ demo, isOpen, onClose, type = 'after' }) => {
  if (!isOpen || !demo) return null

  const PortfolioComponent = portfolioComponents[demo.id]?.[type]

  if (!PortfolioComponent) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100]"
          />

          {/* Full Screen Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[101] overflow-auto bg-black"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="fixed top-4 right-4 z-[102] p-3 bg-black rounded-full shadow-2xl hover:scale-110 transition-transform border-2 border-primary text-primary"
              aria-label="Fermer"
            >
                  <X className="w-6 h-6" />
            </button>

            {/* Portfolio Content */}
            <div className="min-h-screen">
              <PortfolioComponent demo={demo} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
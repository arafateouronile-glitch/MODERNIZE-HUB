import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '../common/Button'
import { scrollToSection } from '../../utils/helpers'
import { OptimizedImage } from '../common/OptimizedImage'

export const DemoModal = ({ demo, isOpen, onClose }) => {
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-16 bg-surface border border-primary/20 rounded-2xl shadow-2xl z-50 overflow-auto"
          >
            <div className="relative p-6 md:p-12">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4 border border-primary/30">
                    {demo.category}
                  </span>
                  <h2 className="text-4xl font-bold mb-4 text-white">{demo.title}</h2>
                  <p className="text-lg text-text-muted">
                    {demo.description}
                  </p>
                </div>

                {/* Screenshots */}
                <div className="mb-8">
                  <OptimizedImage
                    src={demo.after.image || 'https://via.placeholder.com/1200x600?text=Site+Final'}
                    alt={demo.title}
                    className="w-full rounded-xl shadow-xl"
                    loading="lazy"
                  />
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-white">Fonctionnalités</h3>
                    <ul className="space-y-2">
                      {demo.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span className="text-text-muted">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-white">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {demo.technologies?.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {demo.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="text-center p-4 bg-surfaceHighlight border border-white/10 rounded-xl"
                    >
                      <div className="text-2xl font-bold text-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-text-muted">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  className="w-full"
                  onClick={() => {
                    onClose()
                    scrollToSection('contact')
                  }}
                >
                  Demander une transformation similaire
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


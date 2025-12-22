import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Play, Filter } from 'lucide-react'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import { portfolioProjects, portfolioCategories } from '../data/portfolioMockups'
import { useTheme } from '../contexts/ThemeContext'

import { useNavigate } from 'react-router-dom'

export const Portfolio = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const { theme } = useTheme()

  const filteredProjects = selectedCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === selectedCategory)

  const openProject = (project) => {
    setSelectedProject(project)
    setImageIndex(0)
  }

  const closeProject = () => {
    setSelectedProject(null)
    setImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      const images = [...selectedProject.images.desktop, ...selectedProject.images.mobile]
      setImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      const images = [...selectedProject.images.desktop, ...selectedProject.images.mobile]
      setImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-background'}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-6xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`font-display text-6xl md:text-8xl font-bold mb-6 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            Nos Créations
            <br />
            <span className="text-[#88A9C3]">Qui Font Rêver</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl md:text-2xl mb-12 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            Découvrez nos réalisations premium
          </motion.p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="px-6 mb-12">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {portfolioCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#88A9C3] text-black scale-105'
                    : theme === 'light'
                    ? 'bg-white border-2 border-black text-black hover:bg-gray-100'
                    : 'bg-surface border border-white/10 text-white hover:bg-surface/80'
                }`}
              >
                {category.label}
                <span className={`ml-2 text-sm ${
                  selectedCategory === category.id ? 'text-black/70' : 'text-gray-400'
                }`}>
                  ({category.count})
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => navigate(`/demo/${project.id}`)}
                  className={`group cursor-pointer rounded-3xl overflow-hidden border-2 transition-all ${
                    theme === 'light'
                      ? 'bg-white border-black'
                      : 'bg-surface border-white/10'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                    {/* Image Placeholder pour Demo */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      project.colors?.primary && project.colors.primary.startsWith('#') ? '' : 'from-gray-900 to-gray-800'
                    }`} style={
                      project.colors?.primary && project.colors.primary.startsWith('#') 
                      ? { background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})` }
                      : {}
                    }>
                      {/* Afficher l'image si elle existe, sinon le fallback */}
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex' // Afficher le fallback
                        }}
                      />
                      {/* Fallback visuel si pas d'image */}
                      <div className="absolute inset-0 hidden flex-col items-center justify-center text-white p-6 text-center">
                        <span className="text-4xl mb-2">{project.title.charAt(0)}</span>
                        <span className="text-sm opacity-75 font-mono">Voir la démo live</span>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full flex items-center gap-3">
                        <ExternalLink className="w-5 h-5 text-white" />
                        <span className="font-bold text-white">Voir le site</span>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 bg-[#88A9C3] text-black px-3 py-1 rounded-full text-xs font-bold z-10">
                      {project.industry}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`text-2xl font-bold mb-2 ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm mb-4 line-clamp-2 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className={`text-xs px-2 py-1 rounded ${
                              theme === 'light'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-white/5 text-gray-400'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <ExternalLink className={`w-5 h-5 ${
                        theme === 'light' ? 'text-black' : 'text-white'
                      }`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#88A9C3]">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-black mb-6"
          >
            Prêt à Avoir un Design Qui Fait WOW ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-black/80 mb-8"
          >
            Discutons de votre projet et créons quelque chose d'exceptionnel
          </motion.p>
          <a
            href="/#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#88A9C3] text-black hover:bg-white font-bold rounded-full transition-all duration-300 text-lg"
          >
            <span>Demander un Devis</span>
          </a>
        </div>
      </section>

      {/* Portfolio Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-7xl w-full max-h-[90vh] overflow-auto rounded-3xl ${
                theme === 'light' ? 'bg-white' : 'bg-surface'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={closeProject}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Content */}
              <div className="p-6 md:p-12">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#88A9C3] text-black px-3 py-1 rounded-full text-sm font-bold">
                      {selectedProject.industry}
                    </span>
                    <span className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {selectedProject.category}
                    </span>
                  </div>
                  <h2 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}>
                    {selectedProject.title}
                  </h2>
                  <p className={`text-lg ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {selectedProject.description}
                  </p>
                </div>

                {/* Images Slider */}
                <div className="relative mb-8 rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
                  <div className="aspect-video relative">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={imageIndex}
                        src={[...selectedProject.images.desktop, ...selectedProject.images.mobile][imageIndex]}
                        alt={`${selectedProject.title} view ${imageIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>
                  {selectedProject.images.desktop.length + selectedProject.images.mobile.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                      >
                        <span className="text-white">‹</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                      >
                        <span className="text-white">›</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Features */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`}>
                      Fonctionnalités
                    </h3>
                    <ul className="space-y-3">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-[#88A9C3] mt-1">✓</span>
                          <span className={`${
                            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies & Metrics */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`}>
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-sm ${
                            theme === 'light'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-white/5 text-gray-400'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`}>
                      Résultats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl ${
                            theme === 'light'
                              ? 'bg-gray-50'
                              : 'bg-white/5'
                          }`}
                        >
                          <div className="text-2xl font-bold text-[#88A9C3] mb-1">
                            {metric.value}
                          </div>
                          <div className={`text-xs ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      closeProject()
                      const contactSection = document.getElementById('contact-section')
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="flex-1 py-4 px-6 bg-[#88A9C3] text-black font-bold rounded-full hover:bg-white transition-colors"
                  >
                    {selectedProject.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}


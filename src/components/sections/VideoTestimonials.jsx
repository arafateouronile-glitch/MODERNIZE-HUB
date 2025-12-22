import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../animations/Reveal'
import { Play, X, ExternalLink } from 'lucide-react'

const videoTestimonials = [
  {
    id: 1,
    client: 'Pierre - Avocat',
    thumbnail: '/images/video-thumbs/pierre.jpg',
    youtubeId: 'YOUTUBE_VIDEO_ID_1', // Remplacez par votre vraie ID YouTube
    title: 'Transformation complète de mon cabinet',
    duration: '2:34',
    quote: '"+230% de demandes en 30 jours. Incroyable."',
  },
  {
    id: 2,
    client: 'Sophie - Agent Immobilier',
    thumbnail: '/images/video-thumbs/sophie.jpg',
    youtubeId: 'YOUTUBE_VIDEO_ID_2',
    title: '2,2M€ de mandats fermés grâce au nouveau site',
    duration: '3:15',
    quote: '"Le ROI a été instantané. Je recommande à 100%."',
  },
]

export const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const openVideo = (video) => {
    setSelectedVideo(video)
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <section className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <Reveal>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="font-mono text-[#88A9C3] text-sm tracking-widest uppercase mb-6 block">
              Témoignages Vidéo
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase leading-[0.9] mb-8">
              VOIR C'EST<br/>
              <span className="text-[#88A9C3]">CROIRE</span>
            </h2>
            <p className="text-xl text-white/80 font-light">
              Nos clients témoignent en vidéo de leur transformation. Résultats réels. Histoires authentiques.
            </p>
          </div>
        </Reveal>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {videoTestimonials.map((video, index) => (
            <Reveal key={video.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group cursor-pointer"
                onClick={() => openVideo(video)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-black/50 border border-white/10 overflow-hidden">
                  {/* Placeholder Thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#88A9C3]/10 to-black flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-[#88A9C3] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-black ml-1" fill="currentColor" />
                      </div>
                      <div className="font-mono text-xs text-white/50 uppercase">
                        Vidéo {video.duration}
                      </div>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Client Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="font-mono text-xs text-[#88A9C3] uppercase tracking-wider mb-2">
                      {video.client}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-white/70 italic">
                      "{video.quote}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-white/60 mb-6 font-light">
              Plus de témoignages vidéo sur notre chaîne YouTube
            </p>
            <a
              href="https://youtube.com/@modernizehub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#88A9C3] text-[#88A9C3] hover:bg-[#88A9C3] hover:text-black transition-all font-mono text-sm uppercase tracking-widest"
            >
              <ExternalLink className="w-4 h-4" />
              Voir Toutes Les Vidéos
            </a>
          </div>
        </Reveal>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideo}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9998]"
            />

            {/* Video Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed inset-4 md:inset-12 lg:inset-20 z-[9999]"
            >
              <div className="relative w-full h-full bg-black border border-[#88A9C3]/30">
                {/* Close Button */}
                <button
                  onClick={closeVideo}
                  className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-[#88A9C3] hover:text-black transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* YouTube Video */}
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}



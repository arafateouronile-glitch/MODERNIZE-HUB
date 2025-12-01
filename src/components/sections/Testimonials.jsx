import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useTestimonials } from '../../hooks/useAdminData'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { OptimizedImage } from '../common/OptimizedImage'

export const Testimonials = () => {
  const [ref, isVisible] = useScrollAnimation()
  const testimonials = useTestimonials()

  return (
    <section id="temoignages" ref={ref} className="py-32 bg-background border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          className="mb-20 text-center"
        >
          <span className="font-mono text-primary text-sm tracking-widest uppercase mb-4 block">
            Retours Clients
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase">
            Témoignages
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="border-t border-white/10 py-12 hover:bg-white/5 transition-colors group"
            >
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D9FF00]/30 group-hover:border-[#D9FF00] transition-all group-hover:scale-110 flex-shrink-0">
                    <OptimizedImage 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-white uppercase">{testimonial.name}</div>
                    <div className="font-mono text-xs text-[#D9FF00]">{testimonial.role}</div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#D9FF00] fill-current" />
                    ))}
                  </div>
                  <p className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
                    "{testimonial.text}"
                  </p>
                  {testimonial.results && (
                    <p className="mt-4 font-mono text-sm text-text-muted">
                      {'>'} Résultat : {testimonial.results}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

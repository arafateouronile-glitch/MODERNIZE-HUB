import { motion } from 'framer-motion'
import { Reveal } from '../animations/Reveal'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { useBlogPosts } from '../../hooks/useAdminData'

export const BlogSection = () => {
  const blogPosts = useBlogPosts()
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <section className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <Reveal>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-6 block">
              Ressources & Expertise
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase leading-[0.9] mb-8">
              NOTRE BLOG<br/>
              <span className="text-[#D9FF00]">EXPERT</span>
            </h2>
            <p className="text-xl text-white/80 font-light">
              Guides pratiques, études de cas, tendances. Tout pour transformer votre présence web.
            </p>
          </div>
        </Reveal>

        {/* Featured Posts */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredPosts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.1}>
              <motion.article
                whileHover={{ y: -5 }}
                className="border border-white/10 bg-white/5 p-8 hover:bg-white/10 hover:border-[#D9FF00]/30 transition-all duration-300 group"
              >
                {/* Category Badge */}
                <span className="inline-block font-mono text-[10px] text-[#D9FF00] uppercase tracking-widest mb-4 bg-[#D9FF00]/10 px-3 py-1 border border-[#D9FF00]/30">
                  {post.category}
                </span>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#D9FF00] transition-colors">
                  {post.title}
                </h3>

                <p className="text-white/70 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono">{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">{post.readTime}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#D9FF00] group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {regularPosts.map((post, index) => (
            <Reveal key={post.id} delay={0.2 + index * 0.1}>
              <motion.article
                whileHover={{ y: -3 }}
                className="border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-[#D9FF00]/30 transition-all duration-300 group"
              >
                <span className="inline-block font-mono text-[10px] text-[#D9FF00] uppercase tracking-widest mb-3">
                  {post.category}
                </span>
                
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#D9FF00] transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-white/60 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="font-mono text-[10px] text-white/50">{post.readTime}</span>
                  <ArrowRight className="w-4 h-4 text-[#D9FF00] group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.6}>
          <div className="text-center">
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = '/blog'
              }}
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#D9FF00] text-[#D9FF00] hover:bg-[#D9FF00] hover:text-black transition-all font-mono text-sm uppercase tracking-widest cursor-pointer"
            >
              Voir Tous Les Articles
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


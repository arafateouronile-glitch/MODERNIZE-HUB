import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import { Reveal } from '../components/animations/Reveal'
import { ArrowRight, Clock, Calendar, Search, Tag } from 'lucide-react'
import { useBlogPosts } from '../hooks/useAdminData'
import { useNavigate } from 'react-router-dom'

export const Blog = () => {
  const blogPosts = useBlogPosts()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Extraire les catégories uniques
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))]

  // Filtrer les articles
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Articles en vedette
  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-background text-text-main">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          
          {/* Header */}
          <Reveal>
            <div className="max-w-4xl mx-auto text-center mb-20">
              <span className="font-mono text-[#D9FF00] text-sm tracking-widest uppercase mb-6 block">
                Ressources & Expertise
              </span>
              <h1 className="font-display text-5xl md:text-8xl font-bold text-white uppercase leading-[0.9] mb-8">
                BLOG<br/>
                <span className="text-[#D9FF00]">EXPERT</span>
              </h1>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
                Guides pratiques, études de cas, tendances. Tout pour transformer votre présence web.
              </p>
            </div>
          </Reveal>

          {/* Search & Filters */}
          <Reveal delay={0.2}>
            <div className="max-w-4xl mx-auto mb-16 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full px-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-mono text-sm uppercase tracking-widest transition-all ${
                      selectedCategory === category
                        ? 'bg-[#D9FF00] text-black font-bold'
                        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    {category === 'all' ? 'Tous' : category}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <Reveal delay={0.3}>
              <div className="mb-16">
                <h2 className="font-display text-3xl font-bold text-white mb-8 uppercase">
                  Articles en Vedette
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      className="border border-white/10 bg-white/5 p-8 hover:bg-white/10 hover:border-[#D9FF00]/30 transition-all duration-300 group cursor-pointer"
                    >
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
                            <span className="font-mono">{post.read_time || post.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#D9FF00] group-hover:translate-x-2 transition-transform" />
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Regular Posts Grid */}
          <Reveal delay={0.4}>
            <div className="mb-12">
              <h2 className="font-display text-3xl font-bold text-white mb-8 uppercase">
                {featuredPosts.length > 0 ? 'Tous les Articles' : 'Articles'}
              </h2>
              
              {regularPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ y: -3 }}
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      className="border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-[#D9FF00]/30 transition-all duration-300 group cursor-pointer"
                    >
                      <span className="inline-block font-mono text-[10px] text-[#D9FF00] uppercase tracking-widest mb-3">
                        {post.category}
                      </span>
                      
                      <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#D9FF00] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-white/60 mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="font-mono text-[10px] text-white/50">{post.read_time || post.readTime}</span>
                        <ArrowRight className="w-4 h-4 text-[#D9FF00] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-white/50 text-lg">Aucun article trouvé.</p>
                </div>
              )}
            </div>
          </Reveal>

          {/* Back to Home */}
          <Reveal delay={0.6}>
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-3 px-8 py-4 border border-[#D9FF00] text-[#D9FF00] hover:bg-[#D9FF00] hover:text-black transition-all font-mono text-sm uppercase tracking-widest"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Retour à l'Accueil
              </button>
            </div>
          </Reveal>

        </div>
      </main>

      <Footer />
    </div>
  )
}




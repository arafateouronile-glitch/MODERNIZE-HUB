import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Eye } from 'lucide-react'

const getBlogPosts = () => {
  const posts = localStorage.getItem('admin_blog_posts')
  return posts ? JSON.parse(posts) : []
}

const saveBlogPosts = (posts) => {
  localStorage.setItem('admin_blog_posts', JSON.stringify(posts))
}

const categories = ['Conversion', 'Marketing', 'Design', 'SEO', 'Business', 'Case Study']

export const AdminBlogEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = id === 'new'

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Marketing',
    readTime: '5 min',
    featured: false,
    slug: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (!isNew) {
      const posts = getBlogPosts()
      const post = posts.find(p => p.id === parseInt(id))
      if (post) {
        setFormData({
          ...post,
          date: post.date ? post.date.split(' ')[0] : new Date().toISOString().split('T')[0],
        })
      }
    }
  }, [id, isNew])

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const posts = getBlogPosts()
    const slug = formData.slug || generateSlug(formData.title)
    
    const postData = {
      ...formData,
      id: isNew ? Date.now() : parseInt(id),
      slug,
      date: `${formData.date} ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
    }

    if (isNew) {
      posts.push(postData)
    } else {
      const index = posts.findIndex(p => p.id === parseInt(id))
      if (index !== -1) {
        posts[index] = postData
      }
    }

    saveBlogPosts(posts)
    navigate('/admin/blog')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/blog')}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </button>
          <h1 className="font-display text-4xl font-bold text-white">
            {isNew ? 'Nouvel Article' : 'Modifier l\'Article'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
              Titre *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors font-display text-2xl"
              placeholder="Titre de l'article"
            />
          </div>

          {/* Category & Featured */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-[#D9FF00] transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
                Temps de lecture
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors"
                placeholder="5 min"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
              Résumé / Extrait *
            </label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors resize-none"
              placeholder="Résumé court de l'article (2-3 lignes)"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
              Slug URL (auto-généré)
            </label>
            <input
              type="text"
              value={formData.slug || generateSlug(formData.title)}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors font-mono text-sm"
              placeholder="url-de-l-article"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 accent-[#D9FF00]"
            />
            <label htmlFor="featured" className="font-mono text-sm text-white/70">
              Article mis en avant (Featured)
            </label>
          </div>

          {/* Content */}
          <div>
            <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
              Contenu de l'article
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] transition-colors resize-none font-mono text-sm"
              placeholder="Contenu complet de l'article (markdown ou HTML)"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-4 bg-[#D9FF00] text-black font-bold hover:bg-white transition-colors"
            >
              <Save className="w-5 h-5" />
              {isNew ? 'Publier l\'Article' : 'Enregistrer les Modifications'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/blog')}
              className="px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


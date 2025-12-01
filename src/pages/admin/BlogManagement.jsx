import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Edit2, Trash2, Eye, Save, X } from 'lucide-react'

export const BlogManagement = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Conversion',
    readTime: '5 min',
    date: new Date().toISOString().split('T')[0],
    slug: '',
    featured: false,
  })

  useEffect(() => {
    if (!localStorage.getItem('admin_authenticated')) {
      navigate('/admin/login')
      return
    }
    loadPosts()
  }, [navigate])

  const loadPosts = () => {
    const stored = JSON.parse(localStorage.getItem('admin_blog') || '[]')
    // S'il n'y a pas de posts, charger ceux de blog.js
    if (stored.length === 0) {
      // Importer dynamiquement les posts initiaux
      import('../../data/blog').then(({ blogPosts }) => {
        setPosts(blogPosts)
        localStorage.setItem('admin_blog', JSON.stringify(blogPosts))
      })
    } else {
      setPosts(stored.sort((a, b) => new Date(b.date) - new Date(a.date)))
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const slug = formData.slug || generateSlug(formData.title)
    
    if (editingPost) {
      // Modifier
      const updated = posts.map(p => 
        p.id === editingPost.id 
          ? { ...p, ...formData, slug, updatedAt: new Date().toISOString() }
          : p
      )
      setPosts(updated)
      localStorage.setItem('admin_blog', JSON.stringify(updated))
      setEditingPost(null)
    } else {
      // Créer
      const newPost = {
        id: Date.now(),
        ...formData,
        slug,
        createdAt: new Date().toISOString(),
      }
      const updated = [...posts, newPost]
      setPosts(updated)
      localStorage.setItem('admin_blog', JSON.stringify(updated))
    }
    
    setFormData({
      title: '',
      excerpt: '',
      category: 'Conversion',
      readTime: '5 min',
      date: new Date().toISOString().split('T')[0],
      slug: '',
      featured: false,
    })
    setShowForm(false)
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      readTime: post.readTime,
      date: post.date,
      slug: post.slug,
      featured: post.featured || false,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Supprimer cet article ?')) {
      const updated = posts.filter(p => p.id !== id)
      setPosts(updated)
      localStorage.setItem('admin_blog', JSON.stringify(updated))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-white hover:text-[#D9FF00] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono text-sm">Retour</span>
          </button>
          <h1 className="font-display text-xl font-bold text-white">
            Gestion du <span className="text-[#D9FF00]">Blog</span>
          </h1>
          <button
            onClick={() => {
              setEditingPost(null)
              setShowForm(!showForm)
              setFormData({
                title: '',
                excerpt: '',
                category: 'Conversion',
                readTime: '5 min',
                date: new Date().toISOString().split('T')[0],
                slug: '',
                featured: false,
              })
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="font-mono text-sm">Nouvel Article</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-white/10 bg-white/5 p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-white">
                {editingPost ? 'Modifier l\'Article' : 'Nouvel Article'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingPost(null)
                }}
                className="text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Titre de l'article"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] text-xl font-bold"
              />
              <textarea
                required
                placeholder="Extrait / Description"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] h-24"
              />
              <div className="grid md:grid-cols-4 gap-4">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#D9FF00]"
                >
                  <option value="Conversion">Conversion</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  <option value="SEO">SEO</option>
                  <option value="Business">Business</option>
                  <option value="Case Study">Case Study</option>
                </select>
                <input
                  type="text"
                  placeholder="Temps de lecture (ex: 5 min)"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00]"
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-black/50 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#D9FF00]"
                />
                <label className="flex items-center gap-3 border border-white/20 bg-black/50 px-4 py-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 accent-[#D9FF00]"
                  />
                  <span className="font-mono text-sm text-white">Article mis en avant</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Slug URL (auto-généré si vide)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D9FF00] font-mono text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingPost ? 'Enregistrer les Modifications' : 'Créer l\'Article'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-20 border border-white/10 bg-white/5">
              <p className="text-white/50 font-mono">Aucun article pour le moment</p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-xl font-bold text-white">
                        {post.title}
                      </h3>
                      {post.featured && (
                        <span className="px-2 py-1 bg-[#D9FF00]/20 text-[#D9FF00] font-mono text-xs uppercase">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-white/70 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span className="font-mono">{post.category}</span>
                      <span>•</span>
                      <span className="font-mono">{post.readTime}</span>
                      <span>•</span>
                      <span className="font-mono">{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 border border-white/10 hover:border-[#D9FF00] hover:text-[#D9FF00] transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 border border-white/10 hover:border-red-500 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}


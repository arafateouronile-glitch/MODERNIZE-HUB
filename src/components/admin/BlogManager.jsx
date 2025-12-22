import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, FileText } from 'lucide-react'
import { supabaseStorage as storage } from '../../services/supabaseStorage'

export const BlogManager = ({ onUpdate }) => {
  const [posts, setPosts] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingPost, setEditingPost] = useState(null)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const allPosts = await storage.getBlogPosts()
      const postsArray = Array.isArray(allPosts) ? allPosts : []
      setPosts(postsArray)
      onUpdate?.()
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error)
      setPosts([])
    }
  }

  const startEdit = (post = null) => {
    setEditingPost(post || {
      title: '',
      excerpt: '',
      category: 'Conversion',
      readTime: '5 min',
      slug: '',
      featured: false,
    })
    setIsEditing(true)
  }

  const savePost = () => {
    if (!editingPost.title || !editingPost.excerpt) {
      alert('Le titre et l\'extrait sont requis')
      return
    }

    // Generate slug if empty
    if (!editingPost.slug) {
      editingPost.slug = editingPost.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    }

    storage.saveBlogPost(editingPost)
    loadPosts()
    setIsEditing(false)
    setEditingPost(null)
  }

  const deletePost = (id) => {
    if (confirm('Supprimer cet article définitivement ?')) {
      storage.deleteBlogPost(id)
      loadPosts()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-white">
          Gestion du Blog ({posts.length} articles)
        </h2>
        <button
          onClick={() => startEdit()}
          className="flex items-center gap-3 px-6 py-3 bg-[#88A9C3] text-black font-bold hover:bg-white transition-all"
        >
          <Plus className="w-5 h-5" />
          Nouvel Article
        </button>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <BlogPostEditor
            post={editingPost}
            onChange={setEditingPost}
            onSave={savePost}
            onCancel={() => {
              setIsEditing(false)
              setEditingPost(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="border border-white/10 bg-white/5 p-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-white/30" />
          <p className="text-white/50 font-mono mb-6">Aucun article de blog</p>
          <button
            onClick={() => startEdit()}
            className="px-6 py-3 bg-[#88A9C3] text-black font-bold hover:bg-white transition-all"
          >
            Créer le premier article
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-xs text-[#88A9C3] uppercase bg-[#88A9C3]/10 px-3 py-1 border border-[#88A9C3]/30">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="font-mono text-xs text-white/50">⭐ Featured</span>
                )}
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-2 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-white/60 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                <span>{post.readTime}</span>
                <span>{post.date || new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>

              <div className="flex gap-2 pt-4 border-t border-white/10">
                <button
                  onClick={() => startEdit(post)}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-mono text-xs flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

const BlogPostEditor = ({ post, onChange, onSave, onCancel }) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="fixed inset-4 md:inset-12 lg:inset-20 bg-surface border border-white/10 z-50 overflow-y-auto"
      >
        <div className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-white">
              {post.id ? 'Modifier' : 'Créer'} un Article
            </h2>
            <button
              onClick={onCancel}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                Titre *
              </label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => onChange({ ...post, title: e.target.value })}
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors"
                placeholder="10 Erreurs Qui Font Perdre 80% de Vos Visiteurs"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                Extrait *
              </label>
              <textarea
                value={post.excerpt}
                onChange={(e) => onChange({ ...post, excerpt: e.target.value })}
                rows={4}
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors resize-none"
                placeholder="Découvrez les erreurs critiques..."
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                  Catégorie
                </label>
                <select
                  value={post.category}
                  onChange={(e) => onChange({ ...post, category: e.target.value })}
                  className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-[#88A9C3] transition-colors"
                >
                  <option>Conversion</option>
                  <option>Marketing</option>
                  <option>Design</option>
                  <option>SEO</option>
                  <option>Business</option>
                  <option>Case Study</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                  Temps de lecture
                </label>
                <input
                  type="text"
                  value={post.readTime}
                  onChange={(e) => onChange({ ...post, readTime: e.target.value })}
                  className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors"
                  placeholder="5 min"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-white/70 uppercase mb-3">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={post.slug}
                  onChange={(e) => onChange({ ...post, slug: e.target.value })}
                  className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors font-mono"
                  placeholder="auto-generé"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={post.featured}
                onChange={(e) => onChange({ ...post, featured: e.target.checked })}
                className="w-5 h-5"
              />
              <label htmlFor="featured" className="font-mono text-sm text-white">
                Mettre en avant (Featured)
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
            <button
              onClick={onSave}
              className="flex-1 px-6 py-4 bg-[#88A9C3] text-black font-bold hover:bg-white transition-all flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              Enregistrer
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-4 border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              Annuler
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, ArrowLeft } from 'lucide-react'

const getBlogPosts = () => {
  const posts = localStorage.getItem('admin_blog_posts')
  return posts ? JSON.parse(posts) : []
}

const saveBlogPosts = (posts) => {
  localStorage.setItem('admin_blog_posts', JSON.stringify(posts))
}

export const AdminBlogManager = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = () => {
    const savedPosts = getBlogPosts()
    setPosts(savedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)))
  }

  const deletePost = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      const updated = posts.filter(post => post.id !== id)
      setPosts(updated)
      saveBlogPosts(updated)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au Dashboard
            </button>
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Gestion du Blog
            </h1>
            <p className="text-white/60">
              {posts.length} article{posts.length > 1 ? 's' : ''} publié{posts.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/blog/new')}
            className="flex items-center gap-2 px-6 py-3 bg-[#D9FF00] text-black font-bold hover:bg-white transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nouvel Article
          </button>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-white/50 mb-6">Aucun article pour le moment</p>
            <button
              onClick={() => navigate('/admin/blog/new')}
              className="px-6 py-3 bg-[#D9FF00] text-black font-bold hover:bg-white transition-colors"
            >
              Créer le Premier Article
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
                  <span className="font-mono text-[10px] text-[#D9FF00] uppercase tracking-wider bg-[#D9FF00]/10 px-2 py-1 border border-[#D9FF00]/30">
                    {post.category || 'Blog'}
                  </span>
                  {post.featured && (
                    <span className="font-mono text-[10px] text-purple-400 uppercase">⭐ Featured</span>
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-white/40 mb-4 font-mono">
                  <span>{post.readTime}</span>
                  <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <button
                    onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                    className="flex-1 px-4 py-2 border border-white/20 hover:border-[#D9FF00] hover:text-[#D9FF00] transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="px-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


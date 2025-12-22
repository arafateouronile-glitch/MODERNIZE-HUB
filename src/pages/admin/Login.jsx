import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Authentification simple (à remplacer par un vrai backend)
    // Par défaut: admin@modernizehub.com / admin123
    if (email === 'admin@modernizehub.com' && password === 'admin123') {
      localStorage.setItem('admin_authenticated', 'true')
      localStorage.setItem('admin_email', email)
      navigate('/admin/dashboard')
    } else {
      setError('Email ou mot de passe incorrect')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            MODERNIZE <span className="text-[#88A9C3]">HUB</span>
          </h1>
          <p className="font-mono text-sm text-white/50 uppercase tracking-wider">
            Espace Administrateur
          </p>
        </div>

        {/* Login Form */}
        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
          <h2 className="font-display text-2xl font-bold text-white mb-6">
            Connexion
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@modernizehub.com"
                  className="w-full bg-black/50 border border-white/20 pl-12 pr-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/20 pl-12 pr-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#88A9C3] text-black font-bold hover:bg-white transition-all"
            >
              Se Connecter
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="font-mono text-xs text-white/50 text-center">
              Identifiants par défaut :<br/>
              <span className="text-[#88A9C3]">admin@modernizehub.com</span> / <span className="text-[#88A9C3]">admin123</span>
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="font-mono text-sm text-white/50 hover:text-[#88A9C3] transition-colors"
          >
            ← Retour au site
          </a>
        </div>
      </motion.div>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, AlertCircle } from 'lucide-react'

export const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@modernizehub.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await onLogin(email, password)
      if (!success) {
        setError('Email ou mot de passe incorrect')
        setPassword('')
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.')
      setPassword('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="border border-white/10 bg-white/5 p-8 md:p-12">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block w-16 h-16 rounded-full bg-[#88A9C3] flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-black" />
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Espace Administrateur
            </h1>
            <p className="font-mono text-sm text-white/60">
              Modernize Hub - Panel de gestion
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-500">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@modernizehub.com"
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors font-mono mb-4"
                autoFocus
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-white/70 uppercase tracking-wider mb-3">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full bg-black/50 border border-white/20 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] transition-colors font-mono"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-4 bg-[#88A9C3] text-black font-bold hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Se Connecter</span>
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <p className="mt-8 text-xs text-white/40 text-center font-mono">
            🔒 Accès sécurisé - Connexion cryptée
          </p>
        </div>
      </motion.div>
    </div>
  )
}


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminDashboard } from '../components/admin/AdminDashboard'
import { AdminLogin } from '../components/admin/AdminLogin'
import { auth } from '../lib/auth'

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si admin est déjà connecté
    const checkAuth = async () => {
      const authenticated = await auth.isAuthenticated()
      setIsAuthenticated(authenticated)
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const handleLogin = async (email, password) => {
    try {
      await auth.signIn(email, password)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return false
    }
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Erreur de déconnexion:', error)
      setIsAuthenticated(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D9FF00] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {!isAuthenticated ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  )
}


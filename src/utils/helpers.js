/**
 * Fonctions utilitaires pour l'application
 */

/**
 * Formate un prix en euros avec séparateur de milliers
 * @param {number} price - Prix à formater
 * @returns {string} Prix formaté (ex: "1 990€")
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return '0€'
  return `${price.toLocaleString('fr-FR').replace(/,/g, ' ')}€`
}

/**
 * Formate une date en français
 * @param {Date|string} date - Date à formater
 * @returns {string} Date formatée (ex: "15 janvier 2025")
 */
export const formatDate = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

/**
 * Convertit un texte en slug URL-friendly
 * @param {string} text - Texte à slugifier
 * @returns {string} Slug (ex: "cabinet-davocats")
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')                   // Normaliser les accents
    .replace(/[\u0300-\u036f]/g, '')    // Supprimer les diacritiques
    .replace(/[^a-z0-9\s-]/g, '')       // Supprimer caractères spéciaux
    .trim()
    .replace(/\s+/g, '-')               // Remplacer espaces par tirets
    .replace(/-+/g, '-')                // Supprimer tirets multiples
}

/**
 * Tronque un texte à une longueur donnée
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale (défaut: 100)
 * @returns {string} Texte tronqué avec "..."
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Valide un email
 * @param {string} email - Email à valider
 * @returns {boolean} True si valide
 */
export const validateEmail = (email) => {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valide un numéro de téléphone français
 * @param {string} phone - Numéro à valider
 * @returns {boolean} True si valide
 */
export const validatePhone = (phone) => {
  if (!phone) return false
  // Retire tous les caractères non numériques
  const cleaned = phone.replace(/\D/g, '')
  
  // Vérifie qu'il y a 10 chiffres (format FR) ou 11-12 (avec +33)
  return cleaned.length >= 10 && cleaned.length <= 12
}

/**
 * Combine des classes CSS de manière conditionnelle
 * @param {...any} classes - Classes à combiner
 * @returns {string} Classes combinées
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Calcule le temps de lecture estimé pour un article
 * @param {string} text - Texte de l'article
 * @param {number} wpm - Mots par minute (défaut: 200)
 * @returns {number} Temps en minutes
 */
export const calculateReadingTime = (text, wpm = 200) => {
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}

/**
 * Génère un ID unique
 * @returns {string} ID unique
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Copie du texte dans le presse-papier
 * @param {string} text - Texte à copier
 * @returns {Promise<boolean>} True si succès
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
    return false
  }
}

/**
 * Détecte si l'utilisateur est sur mobile
 * @returns {boolean} True si mobile
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Scroll smooth vers un élément
 * @param {string} id - ID de l'élément
 * @param {number} offset - Offset en pixels (défaut: 80)
 */
export const scrollToElement = (id, offset = 80) => {
  const element = document.getElementById(id)
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

/**
 * Scroll smooth vers une section (alias de scrollToElement)
 * @param {string} id - ID de la section
 * @param {number} offset - Offset en pixels (défaut: 80)
 */
export const scrollToSection = (id, offset = 80) => {
  scrollToElement(id, offset)
}

/**
 * Calcule le temps restant jusqu'à une date donnée
 * @param {Date|string} endDate - Date de fin
 * @returns {object} Objet avec days, hours, minutes, seconds
 */
export const calculateTimeRemaining = (endDate) => {
  const now = new Date().getTime()
  const end = typeof endDate === 'string' ? new Date(endDate).getTime() : endDate.getTime()
  const difference = end - now

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

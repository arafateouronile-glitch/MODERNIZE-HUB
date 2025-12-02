import { useState, useEffect } from 'react'

/**
 * Hook pour gérer les tests A/B
 * 
 * Usage:
 * const variant = useABTest('hero-cta', ['A', 'B'])
 * if (variant === 'A') return <ButtonA />
 * return <ButtonB />
 */
export const useABTest = (testName, variants = ['A', 'B']) => {
  const [variant, setVariant] = useState(null)

  useEffect(() => {
    // Récupérer le variant depuis le localStorage
    const storageKey = `ab_test_${testName}`
    let savedVariant = localStorage.getItem(storageKey)

    // Si pas de variant sauvegardé, en assigner un aléatoirement
    if (!savedVariant || !variants.includes(savedVariant)) {
      const randomIndex = Math.floor(Math.random() * variants.length)
      savedVariant = variants[randomIndex]
      localStorage.setItem(storageKey, savedVariant)
      
      console.log(`🧪 A/B Test [${testName}]: Variant ${savedVariant} assigné`)
    } else {
      console.log(`🧪 A/B Test [${testName}]: Variant ${savedVariant} (existant)`)
    }

    setVariant(savedVariant)
  }, [testName, variants])

  return variant
}

/**
 * Hook pour tracker les conversions d'un test A/B
 */
export const useABTestConversion = (testName) => {
  const trackConversion = (goal = 'default') => {
    const storageKey = `ab_test_${testName}`
    const variant = localStorage.getItem(storageKey)

    if (!variant) {
      console.warn(`⚠️ Pas de variant pour le test ${testName}`)
      return
    }

    // Sauvegarder la conversion dans le localStorage
    const conversionsKey = `ab_conversions_${testName}`
    const conversions = JSON.parse(localStorage.getItem(conversionsKey) || '[]')
    
    conversions.push({
      variant,
      goal,
      timestamp: new Date().toISOString(),
    })

    localStorage.setItem(conversionsKey, JSON.stringify(conversions))
    
    console.log(`✅ Conversion enregistrée [${testName}] - Variant ${variant} - Goal: ${goal}`)

    // Envoyer à Google Analytics si disponible
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'ab_test_conversion', {
        test_name: testName,
        variant: variant,
        goal: goal,
      })
    }

    // Envoyer à Supabase (optionnel, pour analytics centralisées)
    sendConversionToSupabase(testName, variant, goal).catch(err => {
      console.error('Erreur envoi conversion Supabase:', err)
    })
  }

  return trackConversion
}

/**
 * Obtenir les résultats d'un test A/B depuis le localStorage
 */
export const getABTestResults = (testName) => {
  const conversionsKey = `ab_conversions_${testName}`
  const conversions = JSON.parse(localStorage.getItem(conversionsKey) || '[]')

  // Grouper par variant
  const results = {}
  conversions.forEach(conv => {
    if (!results[conv.variant]) {
      results[conv.variant] = {
        impressions: 0,
        conversions: 0,
        goals: {},
      }
    }
    results[conv.variant].conversions++
    results[conv.variant].goals[conv.goal] = (results[conv.variant].goals[conv.goal] || 0) + 1
  })

  return results
}

/**
 * Réinitialiser un test A/B (pour les tests)
 */
export const resetABTest = (testName) => {
  localStorage.removeItem(`ab_test_${testName}`)
  localStorage.removeItem(`ab_conversions_${testName}`)
  console.log(`🔄 Test A/B [${testName}] réinitialisé`)
}

/**
 * Envoyer la conversion à Supabase pour analytics centralisées
 */
const sendConversionToSupabase = async (testName, variant, goal) => {
  try {
    const { supabase } = await import('../lib/supabase')
    
    const { error } = await supabase
      .from('ab_test_conversions')
      .insert({
        test_name: testName,
        variant: variant,
        goal: goal,
        timestamp: new Date().toISOString(),
      })

    if (error) throw error
    
    console.log('✅ Conversion envoyée à Supabase')
  } catch (error) {
    // Fallback silencieux si Supabase n'est pas disponible
    console.warn('⚠️ Impossible d\'envoyer à Supabase:', error.message)
  }
}

export default {
  useABTest,
  useABTestConversion,
  getABTestResults,
  resetABTest,
}


import { useABTest } from '../../hooks/useABTest'

/**
 * Composant wrapper pour les tests A/B
 * 
 * Usage:
 * <ABTestWrapper testName="hero-cta" variants={{
 *   A: <ButtonPrimary />,
 *   B: <ButtonSecondary />
 * }} />
 */
export const ABTestWrapper = ({ testName, variants }) => {
  const variant = useABTest(testName, Object.keys(variants))

  if (!variant) {
    // Pendant le chargement, afficher le premier variant
    return variants[Object.keys(variants)[0]] || null
  }

  return variants[variant] || null
}

export default ABTestWrapper



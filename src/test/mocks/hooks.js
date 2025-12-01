// Mock hooks for tests
import { vi } from 'vitest'

export const mockUseScrollAnimation = () => {
  return [
    { current: null },
    true, // isVisible
  ]
}

export const mockUseCountUp = (value) => {
  return value
}



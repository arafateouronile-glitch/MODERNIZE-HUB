import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Portfolio } from '../../components/sections/Portfolio'
import { demos } from '../../data/demos'

// Mock des dépendances
vi.mock('../../hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => [{ current: null }, true],
}))

vi.mock('../animations/Reveal', () => ({
  Reveal: ({ children }) => <div>{children}</div>,
}))

vi.mock('../portfolio/DemoCard', () => ({
  DemoCard: ({ demo }) => <div>{demo.title}</div>,
}))

describe('Portfolio Component', () => {
  it('should render portfolio section', () => {
    render(<Portfolio />)
    
    expect(screen.getByText(/GÉNÉRÉS/i)).toBeInTheDocument()
  })

  it('should display all demo cards', () => {
    render(<Portfolio />)
    
    demos.forEach(demo => {
      expect(screen.getByText(demo.title)).toBeInTheDocument()
    })
  })
})




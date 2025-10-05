import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Chip } from '@/ui/Chip';


describe('Chip component', () => {
  it('renders children correctly', () => {
    render(<Chip>Default Chip</Chip>)
    expect(screen.getByText('Default Chip')).toBeInTheDocument()
  })

  it('applies default variant, size and rounded styles', () => {
    render(<Chip>Default</Chip>)
    const chip = screen.getByText('Default')

    // Verifica clases de los valores por defecto
    expect(chip.className).toContain('bg-slate-300')
    expect(chip.className).toContain('rounded-md')
    expect(chip.className).toContain('h-7') // por size: sm (default)
  })

  it('applies primary variant styles', () => {
    render(<Chip variant="primary">Primary</Chip>)
    const chip = screen.getByText('Primary')
    expect(chip.className).toContain('bg-blue-300')
    expect(chip.className).toContain('text-blue-500')
  })

  it('applies success variant styles', () => {
    render(<Chip variant="success">Success</Chip>)
    const chip = screen.getByText('Success')
    expect(chip.className).toContain('bg-green-300')
  })

  it('applies rounded-full style', () => {
    render(<Chip rounded="full">Rounded Full</Chip>)
    const chip = screen.getByText('Rounded Full')
    expect(chip.className).toContain('rounded-full')
  })

  it('applies size full style', () => {
    render(<Chip size="full">Full Chip</Chip>)
    const chip = screen.getByText('Full Chip')
    expect(chip.className).toContain('w-full')
    expect(chip.className).toContain('text-2xl')
  })

  it('merges additional className prop', () => {
    render(<Chip className="custom-class">Custom</Chip>)
    const chip = screen.getByText('Custom')
    expect(chip.className).toContain('custom-class')
  })
})

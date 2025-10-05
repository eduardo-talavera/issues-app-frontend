import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from '@/ui/Avatar'
import { getClasses } from '../utils/helpers'

describe('<Avatar />', () => {
  it('debe renderizar correctamente con el texto proporcionado', () => {
    render(<Avatar>ED</Avatar>)
    expect(screen.getByText('ED')).toBeInTheDocument()
  })

  it('debe tener las clases base por defecto', () => {
    render(<Avatar>ED</Avatar>)
    const el = screen.getByText('ED')
    const classes = getClasses(el)

    expect(classes).toContain('rounded-full')
    expect(classes).toContain('flex')
    expect(classes).toContain('items-center')
    expect(classes).toContain('justify-center')
  })

  it('debe aplicar el tamaño correcto (sm por defecto)', () => {
    render(<Avatar>SM</Avatar>)
    const el = screen.getByText('SM')
    expect(el).toHaveClass('h-[32px]', 'w-[32px]', 'text-sm')
  })

  it('debe aplicar correctamente el tamaño lg', () => {
    render(<Avatar size="lg">LG</Avatar>)
    const el = screen.getByText('LG')
    expect(el).toHaveClass('h-[64px]', 'w-[64px]', 'text-lg')
  })

  it('debe aplicar correctamente el color de variante "primary"', () => {
    render(<Avatar variant="primary">P</Avatar>)
    const el = screen.getByText('P')
    expect(el).toHaveClass('bg-blue-500', 'text-white')
  })

  it('debe aplicar correctamente la variante "danger"', () => {
    render(<Avatar variant="danger">X</Avatar>)
    const el = screen.getByText('X')
    expect(el).toHaveClass('bg-red-500', 'text-white')
  })

  it('debe combinar clases personalizadas con las del componente', () => {
    render(<Avatar className="border border-black">C</Avatar>)
    const el = screen.getByText('C')
    expect(el).toHaveClass('border', 'border-black')
    expect(el).toHaveClass('rounded-full')
  })
})

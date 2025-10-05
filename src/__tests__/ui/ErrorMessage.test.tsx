import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ErrorMessage } from '@/ui/ErrorMessage'

describe('<ErrorMessage />', () => {
  it('debe renderizar correctamente el contenido enviado como children', () => {
    render(<ErrorMessage>Ocurrió un error</ErrorMessage>)
    expect(screen.getByText('Ocurrió un error')).toBeInTheDocument()
  })

  it('debe renderizar con el contenedor principal tipo div', () => {
    render(<ErrorMessage>Error</ErrorMessage>)
    const el = screen.getByText('Error')
    expect(el.tagName).toBe('DIV')
  })

  it('debe tener las clases de estilo esperadas', () => {
    render(<ErrorMessage>Error</ErrorMessage>)
    const el = screen.getByText('Error')

    expect(el).toHaveClass(
      'text-center',
      'my-4',
      'bg-red-100',
      'text-red-600',
      'font-bold',
      'p-3',
      'uppercase',
      'text-sm',
      'rounded-md'
    )
  })

  it('debe permitir renderizar nodos React como children', () => {
    render(
      <ErrorMessage>
        <span data-testid="spanElement">Otro texto</span> Error interno
      </ErrorMessage>
    )
    expect(screen.getByTestId('spanElement')).toBeInTheDocument()
    expect(screen.getByText('Error interno')).toBeInTheDocument()
  })
})

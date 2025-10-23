import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import Router from './router'
import { UiProvider } from './contexts/ui/UIProvider'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UiProvider>
        <Router />
      </UiProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
)

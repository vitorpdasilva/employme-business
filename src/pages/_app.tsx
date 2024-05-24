import { DrawerNav } from '~/components/Drawer'
import { useIsAuthenticated } from '~/hooks'
import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const queryClient = new QueryClient()

const routesToBeRedirected = ['/login', '/signup']

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const mdTheme = createTheme()
  const router = useRouter()
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    if (isAuthenticated) {
      if (routesToBeRedirected.includes(router.pathname)) {
        router.push('/')
      }
    }
    if (!isAuthenticated && !routesToBeRedirected.includes(router.pathname)) {
      router.push('/login')
    }
  }, [])
  return (
    <ThemeProvider theme={mdTheme}>
      <QueryClientProvider client={queryClient}>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <CssBaseline />
          {isAuthenticated && <DrawerNav />}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Component {...pageProps} />
          </Box>
        </Box>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

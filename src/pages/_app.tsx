import { DrawerNav } from '@/components/Drawer'
import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const mdTheme = createTheme()

  return (
    <ThemeProvider theme={mdTheme}>
      <QueryClientProvider client={queryClient}>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <CssBaseline />
          <DrawerNav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Component {...pageProps} />
          </Box>
        </Box>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

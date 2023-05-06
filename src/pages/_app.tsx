import { DrawerNav } from '@/components/Drawer'
import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const mdTheme = createTheme()
  

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />
        <DrawerNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Component {...pageProps} />
        </Box>
      </Box>
    </ThemeProvider>
  )
}


import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const mdTheme = createTheme();
  
  return (
  <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
  <Component {...pageProps} />
  </Box>
  </ThemeProvider>

  )
}

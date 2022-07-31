import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <main>
            <Container maxWidth="md">
              <Component {...pageProps} />
            </Container>
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp

const queryClient = new QueryClient()

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
})

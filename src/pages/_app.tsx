import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SedebarDrawerProvider } from '../contexts/SidebarDrawerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} >
      <SedebarDrawerProvider>
        <Component {...pageProps} />
      </SedebarDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp

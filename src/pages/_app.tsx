import Header from '@/components/Header'
import type { AppProps } from 'next/app'
import '../styles/global.scss'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import { SessionProvider as NextAuthProvider } from 'next-auth/react';

const initialOptions = {
  "client-id": "AQO-JoluFpasmX71Sp1Me6AdwuZwGjQamM7Jit84upF2nvffpDIn7XFrRO5fCRf-iz8zov0wFbXV0PEF",
  currency: "BRL",
  intent: "capture",
}

export default function App({ Component, pageProps }: AppProps) {
  return (
  <NextAuthProvider session={pageProps.session}>
    <PayPalScriptProvider options={initialOptions}>
      <Header />
        <Component {...pageProps} />
    </PayPalScriptProvider>
  </NextAuthProvider>
  )
}

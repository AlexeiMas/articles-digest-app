import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import Header from "@/components/Header"
import {Container} from "@mui/material"
import {wrapper} from "@/store/store"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"

export default function App({Component, ...rest}: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <SessionProvider session={props.pageProps.session}>
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <Header/>
          <Container sx={{flexGrow: 1}}>
            <Component {...props.pageProps} />
          </Container>
        </PersistGate>
      </SessionProvider>
    </Provider>
  )
}

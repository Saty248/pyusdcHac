import '@/styles/globals.css';
import { Provider } from 'react-redux';
import store from '@/store/store';
import Script from 'next/script';
import Hotjar from '@hotjar/browser';
import { useEffect } from 'react';

import { AuthProvider } from '@/hooks/useAuth';

export default function App({ Component, pageProps }) {
   useEffect(()=>{
    Hotjar.init(process.env.NEXT_PUBLIC_HOTJAR_SITEID, process.env.NEXT_PUBLIC_HOTJAR_VERSION);
   },[])
  return (
    <AuthProvider>
      <Provider store={store}>
        <>
          <Script src='https://cdn.withpersona.com/dist/persona-v4.8.0.js' />
          <Component {...pageProps} />
        </>
      </Provider>
    </AuthProvider>
  );
}

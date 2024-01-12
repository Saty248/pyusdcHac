import '@/styles/globals.css';
import { Provider } from 'react-redux';
import store from '@/store/store';
import Script from 'next/script';

import CookieConsent from '@/Components/CookieConsent'

import { AuthProvider } from '@/hooks/useAuth';
import { msclaritConfig } from '@/hooks/msclaritConfig';
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-poppins',
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
// });

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <>
          <Script src='https://cdn.withpersona.com/dist/persona-v4.8.0.js' />
          <Script
            id="show-banner"
            dangerouslySetInnerHTML={msclaritConfig}
          />
          <Component {...pageProps} />
          <CookieConsent />
        </>
      </Provider>
    </AuthProvider>
  );
} 

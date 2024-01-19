import '@/styles/globals.css';
import { Provider } from 'react-redux';
import store from '@/store/store';
import Script from 'next/script';

import CookieConsent from '@/Components/CookieConsent'

import { AuthProvider } from '@/hooks/useAuth';
import { msclaritConfig } from '@/hooks/msclaritConfig';
import { useMobile } from '@/hooks/useMobile';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const { isMobile } = useMobile();
  useEffect(() => {
    var Tawk_API = global?.Tawk_API || undefined;
    if (!Tawk_API) return;
    if (isMobile) {
      if (Tawk_API.hideWidget !== undefined) Tawk_API.hideWidget();
    } else {
      if (Tawk_API.showWidget !== undefined) Tawk_API.showWidget();
    }
  }, [isMobile, global]);

  return (
    <AuthProvider>
      <Provider store={store}>
        <>
          <Script src='https://cdn.withpersona.com/dist/persona-v4.8.0.js' />
          <Script
            id="show-banner"
            dangerouslySetInnerHTML={msclaritConfig}
          />
          <Script src='https://www.googletagmanager.com/gtag/js?id=G-C0J4J56QW5' />
          <Script id='google-analytics'>
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
        
                gtag('config', 'G-C0J4J56QW5');
            `}
          </Script>
          <Component {...pageProps} />
          <CookieConsent />
        </>
      </Provider>
    </AuthProvider>
  );
} 

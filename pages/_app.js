import '@/styles/globals.css';
import { Provider } from 'react-redux';
import store from '@/store/store';
import Script from 'next/script';
import { AuthProvider } from '@/hooks/useAuth';
import { hotjarConfig } from '@/hooks/hotjarConfig';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <>
          <Script src='https://cdn.withpersona.com/dist/persona-v4.8.0.js' />
          <Script
              id="show-banner"
              dangerouslySetInnerHTML={hotjarConfig}
          />
          <Component {...pageProps} />
        </>
      </Provider>
    </AuthProvider>
  );
}

import { msclaritConfig } from '@/hooks/msclaritConfig';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from "next/script";


export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link
          href='https://unpkg.com/maplibre-gl@3.1.0/dist/maplibre-gl.css'
          rel='stylesheet'
        />
         <script
          dangerouslySetInnerHTML={{
            __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/655381bacec6a912820fc8a3/1hf735gcu';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
              `,
          }}
        />

<Script src="https://cdn.withpersona.com/dist/persona-v4.8.0.js" />
            <Script id="show-banner" dangerouslySetInnerHTML={msclaritConfig} />
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-C0J4J56QW5" />
            <Script id="google-analytics">
              {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
          
                  gtag('config', 'G-C0J4J56QW5');
              `}
            </Script>
      </Head>
      <body>
        <div id='backdrop-root'></div>
        <div id='modal-root'></div>
        <Main />
        <NextScript />
       
      </body>
    </Html>
  );
}

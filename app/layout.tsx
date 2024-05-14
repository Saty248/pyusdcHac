import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import Script from "next/script";

import CookieConsent from "@/Components/CookieConsent";

import { msclaritConfig } from "@/hooks/msclaritConfig";

import { SidebarProvider } from "@/hooks/sidebarContext";
import { Web3authProvider } from "@/providers/web3authProvider";
import { ToastContainer } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
// import store from "@/redux/store";
// import ErrorBoundary from "@/Components/ErrorBoundary";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sky Trade",
  description: "Airspace Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <>
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
          {/* <Provider store={store}> */}
          <Web3authProvider>
            <SidebarProvider>
              <ToastContainer style={{ width: "500px" }} />
              {children}
            </SidebarProvider>
            <CookieConsent />
          </Web3authProvider>
          {/* </Provider> */}
        </>
        {/* </PersistGate> */}
      </body>
    </html>
  );
}

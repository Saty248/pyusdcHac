import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { loadStripeOnramp, StripeOnramp } from "@stripe/crypto";
import './style.css'
// Context for accessing StripeOnramp in the app
const CryptoElementsContext = createContext<{ onramp: StripeOnramp | null }>({ onramp: null });

export const CryptoElements: React.FC<{ stripeOnramp: Promise<StripeOnramp | null>; children: React.ReactNode }> = ({ stripeOnramp, children }) => {
  const [onramp, setOnramp] = useState<StripeOnramp | null>(null);

  useEffect(() => {
    let isMounted = true;

    stripeOnramp.then((loadedOnramp) => {
      if (isMounted) {
        setOnramp(loadedOnramp);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [stripeOnramp]);

  return <CryptoElementsContext.Provider value={{ onramp }}>{children}</CryptoElementsContext.Provider>;
};

// Hook to use StripeOnramp in any component
export const useStripeOnramp = (): StripeOnramp | null => {
  const context = useContext(CryptoElementsContext);
  return context.onramp;
};

// OnrampElement component to render the Onramp UI
export const OnrampElement: React.FC<{
  clientSecret: string;
  appearance?: Record<string, any>;
  onReady?: (event: any) => void;
  onChange?: (event: any) => void;
}> = ({ clientSecret, appearance = {}, onReady, onChange, ...props }) => {
  const stripeOnramp = useStripeOnramp();
  const onrampElementRef = useRef<HTMLDivElement | null>(null);
  const [session, setSession] = useState<any>(null);
  const appearanceConfig = {
    theme: "dark", // Or "light" depending on your preference
  };
  
  // Initialize the onramp session when clientSecret changes
  useEffect(() => {
    if (onrampElementRef.current && stripeOnramp && clientSecret) {
      console.log("Mounting OnrampElement", clientSecret);
  
      const sessionInstance = stripeOnramp.createSession({
        clientSecret,
        appearance: { theme: "dark" }, // Define the appearance object here
      });
  
      sessionInstance.mount(onrampElementRef.current);
      setSession(sessionInstance);
    }
  }, [clientSecret, stripeOnramp]);
  // Event listeners for session updates and state changes
  useEffect(() => {
    if (session && onChange) {
      const sessionChangeListener = (event: any) => {
        onChange(event.payload);
      };
      session.addEventListener("onramp_session_updated", sessionChangeListener);
      return () => {
        session.removeEventListener("onramp_session_updated", sessionChangeListener);
      };
    }
  }, [session, onChange]);

  useEffect(() => {
    if (session && onReady) {
      const sessionReadyListener = (event: any) => {
        onReady(event.payload);
      };
      session.addEventListener("onramp_ui_loaded", sessionReadyListener);
      return () => {
        session.removeEventListener("onramp_ui_loaded", sessionReadyListener);
      };
    }
  }, [session, onReady]);

  return <div className="z-[1000]" {...props} ref={onrampElementRef}></div>;
};

"use client";
import store from "@/store/store";
import React, { createContext, useState, ReactNode } from "react";
import { Provider } from "react-redux";
import { Web3authContextType } from '../types';


interface Web3authContextType {
  web3auth: any;
  setWeb3auth: React.Dispatch<React.SetStateAction<any>>;
  provider: any;
  setProvider: React.Dispatch<React.SetStateAction<any>>;
}

export const Web3authContext = createContext<Web3authContextType | null>(null);


const defaultValue: Web3authContextType = {
  web3auth: null,
  setWeb3auth: () => {},
  provider: null,
  setProvider: () => {},
};

export const Web3authContext = createContext<Web3authContextType>(defaultValue);

interface Web3authProviderProps {
  children: ReactNode;
}

export const Web3authProvider: React.FC<Web3authProviderProps> = ({
  children,
}) => {
  const [web3auth, setWeb3auth] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);

  return (
    <Provider store={store}>
      <Web3authContext.Provider
        value={{ web3auth, setWeb3auth, provider, setProvider }}
      >
        {children}
      </Web3authContext.Provider>
    </Provider>
  );
};

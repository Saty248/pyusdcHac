"use client";
import store from "@/store/store";
import React, { createContext, useState } from "react";
import { Provider } from "react-redux";
import { Web3authContextType } from '../types';

export const Web3authContext = createContext<Web3authContextType | null>(null);

export const Web3authProvider = ({ children }) => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

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

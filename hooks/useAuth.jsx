import { createContext, useContext, useState, useEffect } from 'react';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';
import { Web3authContext } from '@/providers/web3authProvider';
import { useRouter } from 'next/router';


import { Web3AuthNoModal } from "@web3auth/no-modal";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES, UX_MODE } from "@web3auth/base";

const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { web3auth, setWeb3auth, setProvider } = useContext(Web3authContext);

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.SOLANA,
          chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
          rpcTarget: process.env.NEXT_PUBLIC_RPC_TARGET,
          displayName: process.env.NEXT_PUBLIC_SOLANA_DISPLAY_NAME,
          blockExplorer: "https://explorer.solana.com",
          ticker: "SOL",
          tickerName: "Solana Token",
        };

        const privateKeyProvider = new SolanaPrivateKeyProvider({ config: { chainConfig } });

        const web3auth = new Web3AuthNoModal({
          clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
          web3AuthNetwork: process.env.NEXT_PUBLIC_AUTH_NETWORK,
          privateKeyProvider,
          chainConfig
        });


        setWeb3auth(web3auth);

        const openloginAdapter = new OpenloginAdapter({
          privateKeyProvider,
          adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
          }
        });
        web3auth.configureAdapter(openloginAdapter);

        await web3auth.init();
        setProvider(web3auth.provider);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    init();
  }, []);

  const {userData} = useSelector((state) => {
    const {user} = state.userReducer;
    return {userData: user}
  }, shallowEqual);

  const signIn = ({ user }) => {
    dispatch(setUser(user));
  };

  const signOut = async () => {
    if (web3auth) {
      await web3auth.logout();
    } 
    else console.error("web3auth not initialized yet");

    setProvider(null);
    localStorage.clear();
    sessionStorage.clear();
    router.push('/auth/join')
  };

  const updateProfile = (updatedUser) => {
    dispatch(setUser(updatedUser));
  };
  
  return {
    signIn,
    signOut,
    updateProfile,
    user: userData
  };
};

export default useAuth;

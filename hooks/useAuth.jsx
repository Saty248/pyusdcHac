import { createContext, useContext, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { Web3AuthNoModal } from '@web3auth/no-modal';

const AuthContext = createContext({});

const chainConfig = {
  chainNamespace: 'solana',
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
  rpcTarget: process.env.NEXT_PUBLIC_RPC_TARGET,
  displayName: 'Solana Mainnet',
  blockExplorer: 'https://explorer.solana.com',
  ticker: 'SOL',
  tickerName: 'Solana',
};

const web3auth = new Web3AuthNoModal({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  web3AuthNetwork: process.env.NEXT_PUBLIC_AUTH_NETWORK,
  chainConfig: chainConfig,
});

const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [data, setData] = useState({});
  const [temporaryToken, setTemporaryToken] = useState({});

  const signIn = ({ token, user }) => {
    if (token) {
      localStorage.setItem(
        'openlogin_store',
        JSON.stringify({
          sessionId: token.sessionId,
        })
      );
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    setData((prev) => ({
      ...prev,
      ...(token && { token }),
      ...(user && { user }),
    }));
  };

  const signOut = () => {
    localStorage.clear();
      window.location = '/'
  };

  const updateProfile = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));

    setData((prev) => ({
      ...prev,
      user: updatedUser,
    }));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('openlogin_store'));
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token?.sessionId || !user) {
      // router.push('/auth/join');
      return;
    }

    if (token && user) {
      setData({ user, token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        updateProfile,
        temporaryToken,
        setTemporaryToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { Web3authContext } from '@/providers/web3authProvider';

const useAutoLogout = () => {
  const router = useRouter();
  const { web3auth } = useContext(Web3authContext);

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push('/auth/join');
  }


  useEffect(() => {
    const oldUser = JSON.parse(localStorage.getItem('user'));
    if (oldUser) {
      logout();
    }
  }, [web3auth?.status]);

  return null;
};

export default useAutoLogout;

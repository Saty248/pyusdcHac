import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Spinner from '@/Components/Spinner';
import useAutoLogout from '@/hooks/useAutoLogout';
import { Web3authContext } from '@/providers/web3authProvider';
import useAuth from '@/hooks/useAuth';


export default function Home() {
  useAutoLogout();
  const router = useRouter();

  const { web3auth } = useContext(Web3authContext);
  const { user, web3authStatus } = useAuth();

  useEffect(() => {
    if (web3auth && web3auth.status === "ready") {
      if (user?.blockchainAddress && web3authStatus) {
        router.push('/homepage/dashboard2');
      } else {
        sessionStorage.clear();
        localStorage.clear();
        router.push('/auth/join')
      }
    }
  }, [web3auth?.status]);

  return <Spinner />
}

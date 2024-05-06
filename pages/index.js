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
  const { user } = useAuth();

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push('/auth/join');
  }

  useEffect(() => {
    if (web3auth) {
      if (web3auth.status === "not_ready") return;
      if (web3auth.status === "connected") {
        if (!user?.blockchainAddress) {
          logout()
        } else {
          router.push('/homepage/dashboard2');
        }
      } else {
        logout()
        sessionStorage.setItem("VARIABLE_A", "HELLO A");
        localStorage.setItem("VARIABLE_B", "HELLO B");
      }
    }
  }, [web3auth?.status]);

  return <Spinner />
}

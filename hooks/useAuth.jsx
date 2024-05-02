import { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setUser, setClearState } from '@/redux/slices/userSlice';
import { Web3authContext } from '@/providers/web3authProvider';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [web3authStatus, setWeb3authStatus] = useState();
  const { web3auth, setProvider, setWeb3auth } = useContext(Web3authContext);

  const {userData} = useSelector((state) => {
    const {user} = state.userReducer;
    return {userData: user}
  }, shallowEqual);


  useEffect(() => {
    const init = async () => {
     if (web3auth && web3auth?.status === "connected") {
      setWeb3authStatus(true);
    } else {
      setWeb3authStatus(false);
     }
    };
    init();
  }, [web3auth?.status]);

  const signIn = ({ user }) => {
    dispatch(setUser(user));
  };

  const signOut = async () => {
    if (web3auth && typeof web3auth.logout === "function") {
      await web3auth?.logout();
    } 
    else console.error("web3auth not initialized yet");
    
    setProvider(null);
    dispatch(setClearState({}));

    sessionStorage.clear();
    localStorage.clear();
    router.push('/auth/join')
  };

  const updateProfile = (updatedUser) => {
    dispatch(setUser(updatedUser));
  };
  
  return {
    signIn,
    signOut,
    updateProfile,
    user: userData,
    web3authStatus
  };
};

export default useAuth;

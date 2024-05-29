import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Web3authContext } from "@/providers/web3authProvider";
import { useRouter } from "next/router";
import { counterActions } from "@/store/store";
import publicAccessRoutes from "@/Components/helper/publicAccessRoutes";

const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [web3authStatus, setWeb3authStatus] = useState();
  const { web3auth, setProvider } = useContext(Web3authContext);

  const { userData } = useSelector((state) => {
    const { user } = state.value;
    return { userData: user };
  }, shallowEqual);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData && userData !== "undefined") {
      const currentUser = JSON.parse(userData);
      dispatch(counterActions.setUser(currentUser));
    }
  }, []);

  useEffect(() => {
    const initStatus = async () => {
      if (web3auth && web3auth?.status === "connected") {
        setWeb3authStatus(true);
      } else {
        setWeb3authStatus(false);
      }
    };
    initStatus();
  }, [web3auth?.status]);

  const signIn = ({ user }) => {
    if (user) dispatch(counterActions.setUser(user));
    localStorage.setItem("user", JSON.stringify(user));
  };

  const signOut = async () => {
    setProvider(null);

    sessionStorage.clear();
    localStorage.clear();
    router.push("/auth/join");
  };

  const updateProfile = (updatedUser) => {
    dispatch(counterActions.setUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const setAndClearOtherPublicRouteData = (localStorageKey, data) => {
    for (const route of publicAccessRoutes) {
      if(route.localStorageKey !== localStorageKey) {
        localStorage.removeItem(route.localStorageKey)
      }
    }
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  };


  const customRedirect = () => {
    const routes = publicAccessRoutes || [];

    for (const item of routes) {
      const initialKeyData = localStorage.getItem(item.localStorageKey);
      if (initialKeyData && initialKeyData?.length > 2) {
        router.replace(item.redirectTo);
        return;
      }
    }

    router.replace("/homepage/dashboard2");
  };

  const redirectIfUnauthenticated = () => {
    if(web3auth && web3auth.status === "connected") return false;
    else {
      router.push("/auth/inAppSignIn");
      toast.success("Congratulation!!! To ensure your your actions are saved and recognized, register now with SkyTrade.")  
      return true;
    }
  }


  return {
    signIn,
    signOut,
    updateProfile,
    user: userData,
    web3authStatus,
    customRedirect,
    redirectIfUnauthenticated,
    setAndClearOtherPublicRouteData
  };
};

export default useAuth;

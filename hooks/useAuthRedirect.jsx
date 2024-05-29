import { useState, useEffect, useContext } from "react";

import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import { SolanaWallet } from "@web3auth/solana-provider";

import useAuth from "@/hooks/useAuth";
import { Web3authContext } from "@/providers/web3authProvider";
import UserService from "@/services/UserService";
import { counterActions } from "@/store/store";


const useAuthRedirect = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { signIn, customRedirect } = useAuth();

  const { web3auth, provider } = useContext(Web3authContext);
  const { getUser } = UserService();

  useEffect(() => {
    const categoryData = localStorage.getItem("category");
    if (categoryData) {
      const currentCategory = JSON.parse(categoryData);
      dispatch(counterActions.setCategory(currentCategory));
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (web3auth?.status === "connected" && provider) {
          dispatch(counterActions.setIsWaitingScreenVisible(true));
          localStorage.setItem("isWaitingScreenVisible", JSON.stringify(true));

          const userInformation = await web3auth.getUserInfo();
          const solanaWallet = new SolanaWallet(provider);
          const accounts = await solanaWallet.requestAccounts();

          const responseData = await getUser();

          if (responseData?.id) {
            console.log({ responseData });
            localStorage.setItem("user", JSON.stringify(responseData));
            signIn({ user: responseData });
            customRedirect()
            
          } else {
            const categoryData = {
              email: userInformation.email,
              blockchainAddress: accounts[0],
            };

            dispatch(counterActions.setCategory(categoryData));

            localStorage.setItem("category", JSON.stringify(categoryData));

            router.replace(`/auth/join/intro`);
          }
          setIsRedirecting(true);
          dispatch(counterActions.setIsWaitingScreenVisible(false));
          localStorage.setItem("isWaitingScreenVisible", JSON.stringify(false));
        }
      } catch (error) {
        console.error(error);
        dispatch(counterActions.setIsWaitingScreenVisible(false));
        localStorage.setItem("isWaitingScreenVisible", JSON.stringify(false));
      }
    })();
  }, [web3auth?.status]);

  console.log("web3auth.status", web3auth?.status);

  return {isRedirecting};
};

export default useAuthRedirect;

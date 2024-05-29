import { useEffect, useContext } from "react";

import { Web3authContext } from "@/providers/web3authProvider";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const useAutoLogout = () => {
  const router = useRouter();
  const { web3auth } = useContext(Web3authContext);
  const { user } = useAuth();

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push("/auth");
  };

  useEffect(() => {
    const checkSessionStorageUser = JSON.parse(
      sessionStorage.getItem("persist:root")
    );
    if (checkSessionStorageUser) {
      // logout();
      console.log({ checkSessionStorageUser });
    }
  }, [web3auth?.status]);

  useEffect(() => {
    console.log("user", user);
    console.log("web3auth status", web3auth?.status);
    console.log("web3auth connected", web3auth?.connected);
    console.log("router", router);

    if (!web3auth) return;

    if (web3auth?.status === "ready") {
      const fetchedToken = JSON.parse(localStorage.getItem("openlogin_store"));
      console.log({ fetchedToken });
      if (!fetchedToken?.sessionId) {
        router.push("/auth");
      }
    }
  }, [web3auth?.status, user]);

  return null;
};

export default useAutoLogout;

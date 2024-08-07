import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

import { setUserUSDWalletBalance } from "@/redux/slices/userSlice";
import axios from "axios";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { User } from "@/types";

const useFetchBalance = () => {
  const { user, web3authStatus } = useAuth();
  const dispatch = useAppDispatch();

  const { userUSDWalletBalance } = useAppSelector((state) => {
    const { userUSDWalletBalance } = state.userReducer;
    return { userUSDWalletBalance };
  }, shallowEqual);

  const fetchBalance  = async (user: User) => {
    try {
      const response = await axios.post(
        String(process.env.NEXT_PUBLIC_RPC_TARGET),
        {
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountsByOwner",
          params: [
            user.blockchainAddress,
            {
              mint: process.env.NEXT_PUBLIC_MINT_ADDRESS,
            },
            {
              encoding: "jsonParsed",
            },
          ],
        }
      );
      const value = response.data.result.value;
      if (value.length < 1)
        dispatch(
          setUserUSDWalletBalance({
            amount: "0",
            isLoading: false,
          })
        );
      else
        dispatch(
          setUserUSDWalletBalance({
            amount:
              value[0].account.data.parsed.info.tokenAmount.uiAmountString,
            isLoading: false,
          })
        );
    } catch (error) {
      console.error(error);
      dispatch(
        setUserUSDWalletBalance({
          amount: userUSDWalletBalance.amount,
          isLoading: false,
        })
      );
    }
  }

  useEffect(() => {
    if (user && user.blockchainAddress) {
      const interval = setInterval (()=>{fetchBalance(user)}, 5000);

      return () => clearInterval(interval);
    }
  }, [user, web3authStatus]);

  return null;
};

export default useFetchBalance;

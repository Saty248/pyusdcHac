import React, { useContext, useEffect, useState } from "react";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BalanceLoader } from "../../Components/Wrapped";
import { RefreshBalanceIcon, WalletIcon } from "../../Components/Icons";
import {User, Web3authContextType,ConnectionConfig } from "../../types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setUserUSDWalletBalance } from "@/redux/slices/userSlice";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { SolanaWallet } from "@web3auth/solana-provider";
import { PublicKey, Connection } from "@solana/web3.js";
import { Web3authContext } from "@/providers/web3authProvider";

const AvailableBalance = () => {
  const [solbalance, setSolBalance] = useState<number>(0);
  const { provider } = useContext(Web3authContext) as Web3authContextType;
  const { user, web3authStatus } = useAuth();
  const dispatch = useAppDispatch();
  const { userUSDWalletBalance } = useAppSelector((state) => {
    const { userUSDWalletBalance } = state.userReducer;
    return { userUSDWalletBalance };
  });
  const [isSpinning, setIsSpinning] = useState(false);

  const fetchBalance  = async (user: User | null) => {
    if(!user) return
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
  const fetchsolbalance = async () => {
    if (user && provider) {
      const solanaWallet = new SolanaWallet(provider);
      const accounts = await solanaWallet.requestAccounts();
      const connectionConfig: ConnectionConfig = await solanaWallet.request({
        method: "solana_provider_config",
        params: [],
      });

      const connection = new Connection(connectionConfig.rpcTarget);
      const solbalance1 = await connection.getBalance(
        new PublicKey(accounts[0])
      );
      setSolBalance(solbalance1);
    }
  };
  useEffect(() => {
    fetchsolbalance()
      .catch(console.error);
  }, [solbalance, user, web3authStatus]);

  const handelRefreshButton = () =>{
    setIsSpinning(true);

     fetchBalance(user)
     fetchsolbalance()

     setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  }

  return (
    <div
      className="relative bg-white flex items-center px-[20px] sm:px-[32px] py-[37px] rounded-[30px] justify-between w-[89%] sm:w-[468px]"
      style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
    >
      <div className="flex flex-col justify-between w-full h-full ">
        <div className="flex justify-between">
          <div className="flex items-center md:gap-6 gap-2">
          <p className="text-xl font-medium text-[#222222]">
            Available Balance
          </p>
          <div onClick={handelRefreshButton}  className={isSpinning ? 'spin' : ''} style={{ cursor: 'pointer' }}>
          <RefreshBalanceIcon />
          </div>
          </div>
          <div className="sm:hidden  rounded-[50%] bg-[#CCE3FC] flex items-center justify-center p-[10px]">
            <div className="sm:hidden h-6 w-6">
              <WalletIcon isActive={true} />
            </div>
          </div>
        </div>
        {userUSDWalletBalance.isLoading ? (
          <div className="my-4">
            <BalanceLoader />
          </div>
        ) : (
          <>
            <p className="text-3xl text-[#4285F4] font-medium">
              ${userUSDWalletBalance.amount}
            </p>
            <div className="flex">
              <p className=" text-sml text-[#838187] font-normal leading-[21px]">
                {/* {`Solana Balance ${parseFloat(solbalance / LAMPORTS_PER_SOL)}`} */}
                {`Solana Balance ${parseFloat((solbalance / LAMPORTS_PER_SOL).toString())}`}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="hidden  top-3 right-[9px] rounded-[50%] bg-[#CCE3FC] sm:absolute sm:flex items-center justify-center p-[10px]">
        <div className="h-6 w-6">
          <WalletIcon isActive={true} />
        </div>
      </div>
    </div>
  );
};

export default AvailableBalance;

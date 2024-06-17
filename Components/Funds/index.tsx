"use client";

import React, { useState, useEffect, Fragment, useContext } from "react";
import { useRouter } from "next/navigation";
import { PublicKey, Connection } from "@solana/web3.js";
import useAuth from "@/hooks/useAuth";
import { Web3authContext } from "@/providers/web3authProvider";
import { SolanaWallet } from "@web3auth/solana-provider";

import PageHeader from "../PageHeader";
import Backdrop from "../Backdrop";
import Spinner from "../Spinner";
import AvailableBalance from "./AvailableBalance";
import DepositAndWithdraw from "./DepositAndWithdraw";
import TransactionHistory from "./TransactionHistory";
import Head from "next/head";
import {
  Web3authContextType,
  ConnectionConfig,
  Transaction,
  KeyI,
} from "../../types";
import Sidebar from "../Shared/Sidebar";
import { useMobile } from "@/hooks/useMobile";
import axios from "axios";

const Funds = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<number>(0);

  const [refetchBal, setreFetchBal] = useState<boolean>(true);
  const { user, web3authStatus } = useAuth();
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const router = useRouter();
  const [solbalance, setSolBalance] = useState<number>(0);
  const { provider } = useContext(Web3authContext) as Web3authContextType;
  const { isMobile } = useMobile();
  useEffect(() => {
    let fetchbalance = async () => {
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
    fetchbalance()
      .catch(console.error);
  }, [solbalance, user, web3authStatus]);



  return (
    <Fragment>
      <Head>
        <title>SkyTrade - Wallet</title>
      </Head>
      {isLoading && <Backdrop />}
      {isLoading && <Spinner />}
      <div className="relative rounded bg-white sm:bg-[#F6FAFF] h-screen w-screen flex items-center justify-center overflow-hidden ">
        <Sidebar />
        <div className="w-full h-full flex flex-col">
          <PageHeader pageTitle={"Funds"} />
          <section className="relative  w-full h-full py-6 md:py-[37px]  flex flex-col gap-8 mb-[78.22px]  md:mb-0 overflow-y-scroll sm:pl-[68.82px] sm:pr-[55px]">
            <div className="flex sm:gap-[50px] flex-wrap justify-center">
              <div className={`${isMobile ? "w-full flex flex-col gap-5 items-center sm:items-start" : "flex flex-col gap-5 items-center sm:items-start"}`}>
                <AvailableBalance solbalance={solbalance} />
                <DepositAndWithdraw
                  walletId={user?.blockchainAddress || ""}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  setTokenBalance={setTokenBalance}
                  tokenBalance={tokenBalance}
                />
              </div>
              <TransactionHistory  user={user} provider={provider} setIsLoading={setIsLoading}/>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default Funds;

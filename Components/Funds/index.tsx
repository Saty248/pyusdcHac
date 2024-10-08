"use client";

import React, { useState,Fragment, useContext } from "react";
import useAuth from "@/hooks/useAuth";

import PageHeader from "../PageHeader";
import Backdrop from "../Backdrop";
import Spinner from "../Spinner";
import AvailableBalance from "./AvailableBalance";
import DepositAndWithdraw from "./DepositAndWithdraw";
import TransactionHistory from "./TransactionHistory";
import Head from "next/head";
import Sidebar from "../Shared/Sidebar";
import { useMobile } from "@/hooks/useMobile";

const Funds = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<number>(0);
  const { user } = useAuth();
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const { isMobile } = useMobile();
  



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
                <AvailableBalance />
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
              <TransactionHistory isLoading={isLoading} setIsLoading={setIsLoading}/>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default Funds;

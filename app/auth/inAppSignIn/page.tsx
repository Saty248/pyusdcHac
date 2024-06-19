"use client";
import { Fragment, useEffect } from "react";

import Sidebar from "@/Components/Shared/Sidebar";

import Head from "next/head";
import { toast } from "react-toastify";
import LoginPage from "@/Components/Shared/LoginPage";
import { useMobile } from "@/hooks/useMobile";

const InAppSignIn = () => {
  const { isMobile } = useMobile();
    return (
      <Fragment>
        <Head>
          <title>SkyTrade </title>
        </Head>
        <div className="bg-[#F0F0FA] h-screen w-screen ">
        <LoginPage />
        </div>
      </Fragment>
    );
};

export default InAppSignIn;

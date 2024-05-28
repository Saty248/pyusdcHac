import { Fragment, useEffect} from "react";

import Sidebar from "@/Components/Sidebar";

import Head from "next/head";
import { toast } from "react-toastify";
import LoginPage from "@/Components/common/LoginPage";

const InAppSignIn = () => {

/*   useEffect(()=>{
    const inintialAirSpaceData=localStorage.getItem('airSpaceData')
    const inintialRentDataString=localStorage.getItem('rentData')
    if((inintialAirSpaceData && inintialAirSpaceData.length>2) ||(inintialRentDataString && inintialRentDataString.length>2) ){
      toast.success("Contragulations! To ensure your your actions are saved and recognized, register now with SkyTrade.")    
  }
},[]) */

    return (
      <Fragment>
        <Head>
          <title>SkyTrade </title>
        </Head>

        <div className="relative rounded bg-[#F6FAFF] h-screen w-screen flex items-center justify-center overflow-hidden">
          <Sidebar />
          <div className={`w-full h-full flex flex-col overflow-scroll md:overflow-hidden pointer-events-none`}>
           
            <section className=" md:flex relative w-full h-full md:pl-[53px]  " style={{ backgroundImage: "url('/images/map-bg.png')",backgroundSize:"cover" }}>
            </section>
          </div>
          <LoginPage />
        </div>
      </Fragment>
    );
};

export default InAppSignIn;
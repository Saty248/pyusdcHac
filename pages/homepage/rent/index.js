import { Fragment, useState } from "react";
import Script from "next/script";
import Sidebar from "@/Components/Sidebar";
import PageHeader from "@/Components/PageHeader";
import { MagnifyingGlassIcon } from "@/Components/Icons";

const Explorer = () => {
    return (
        <div className="hidden md:flex bg-[#FFFFFFCC] py-[43px] px-[29px] rounded-[30px] flex-col items-center gap-[15px] max-w-[362px] max-h-full z-20" style={{ boxShadow: '0px 12px 34px -10px #3A4DE926' }}>
            <div className="flex gap-[5px] items-center">
                <p className="text-xl font-medium text-[#222222]">SkyMarket Hub</p>
            </div>
            <p className="text-[15px] font-normal text-[#222222]">Explore and Own Low-Altitude Airspaces, Your Gateway to Aerial Freedom.</p>
            <div className="relative pl-[22px] py-[16px] bg-white rounded-lg w-full" style={{ border: "1px solid #87878D" }}>
                <input type="text" name="searchAirspaces" id="searchAirspaces" placeholder="Search Airspaces location" className="outline-none" />
                <div className="w-[17px] h-[17px] absolute top-1/2 -translate-y-1/2 right-[22px]">
                    <MagnifyingGlassIcon />
                </div>
            </div>
        </div>
    )
}

const Map = () => {
    return <div className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/images/map.png')" }}></div>
}

const Buy = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Fragment>
            <Script src='https://www.googletagmanager.com/gtag/js?id=G-C0J4J56QW5' />
            <Script id='google-analytics'>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());   
        
                gtag('config', 'G-C0J4J56QW5');
            `}
            </Script>

            {isLoading && createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
            {isLoading && createPortal(<Spinner />, document.getElementById('backdrop-root'))}

            <div className="relative rounded bg-[#F0F0FA] h-screen w-screen flex items-center justify-center overflow-hidden">
                <Sidebar />
                <div className="w-full h-full flex flex-col">
                    <PageHeader pageTitle={'Marketplace: Rent Airspace'} username={'John Doe'} />
                    <section className="relative w-full h-full overflow-y-scroll py-[39px] px-[36px] flex">
                        <Map />
                        <Explorer />
                    </section>
                </div>
            </div>
        </ Fragment>
    )
}

export default Buy;
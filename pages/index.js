import Head from 'next/head';
import { Fragment, useEffect } from 'react';
import { useRouter } from "next/router";
 
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const fetchedToken = JSON.parse(localStorage.getItem("openlogin_store"));

    if(fetchedToken) {
        if(fetchedToken.sessionId) {
            router.push("/homepage/dashboard");
            return;
        };
    };  
  }, []);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
        <title>SkyTrade</title>
      </Head>
      <div className='flex flex-col justify-center items-center mt-20'>
        <h1>Welcome to SkyTrade</h1>
        <button onClick={() => router.push("/auth/join")} className="bg-dark-blue rounded-md text-sml font-normal text-white my-5 transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "104px", height: "40px"}}>Get Started</button>
      </div>
    </Fragment>
  )
}

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, Fragment } from "react";
import { createPortal } from "react-dom";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WALLET_ADAPTERS } from "@web3auth/base";

import Backdrop from "@/Components/Backdrop";
// import Individual from "@/models/Individual";
import swal from "sweetalert";
import { useRouter } from "next/router";

const Signin = (props) => {
    const { users } = props;
    
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [initial, setInitial] = useState(false);
    const [error, setError] = useState("");

    const emailRef = useRef();

    

    const chainConfig = {
        chainNamespace: "solana",
        chainId: "0x3", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
        rpcTarget: "https://api.devnet.solana.com",
        displayName: "Solana Devnet",
        blockExplorer: "https://explorer.solana.com",
        ticker: "SOL",
        tickerName: "Solana",
      }

    const web3auth = new Web3AuthNoModal({
        clientId: "BNJIzlT_kyic6LCnqAsHyBoaXy0WtCs7ZR3lu6ZTTzHIJGCDtCgDCFpSVMZjxL_Zu4rRsiJjjaGokDeqlGfxoo8", // Get your Client ID from the Web3Auth Dashboard
        web3AuthNetwork: "sapphire_mainnet", // Web3Auth Network
        chainConfig: chainConfig,
    });

    const privateKeyProvider = new SolanaPrivateKeyProvider({ config: { chainConfig } });

    const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider,
      });
    
    web3auth.configureAdapter(openloginAdapter);

    useEffect(() => {
        const init = async() => {
              await web3auth.init();
        }
        
        init();
    }, [initial]);

    const formSubmitHandler = async(e) => {
        e.preventDefault();

        const email = emailRef.current.value;

        const regex = /^\S+@\S+\.\S+$/;
        const emailIsValid = regex.test(email);

        if(!emailIsValid) {
            setEmailValid(false);
            return;
        }

        setInitial(!initial);
        setIsLoading(true);
        setError("")

        const filteredUser = users.filter(user => user.email === email);
        
        if(filteredUser.length < 1) {
            swal({
                title: "oops!",
                text: "email doesn't exist",
                // timer: 2000
              });
            setError("email doesn't exist");
            setIsLoading(false);
            return;
        }
        
        await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "email_passwordless",
            extraLoginOptions: {
              login_hint: email,
            },
          });
        router.replace("/homepage/dashboard");
    }

    const socialLoginHandler = async(provider, e) => {
        e.preventDefault();

        setError("")
        setIsLoading(true);
        
        const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: provider,
          });
        
        const userInformation = await web3auth.getUserInfo();

        console.log(userInformation);
        const filteredUser = users.filter(user => user.email === userInformation.email);
        
        if(filteredUser.length < 1) {
            localStorage.removeItem("openlogin_store");
            setError("email isn't registered")
            await swal({
                title: "oops!",
                text: "email isn't registered",
                timer: 2000
              })
            router.push("/auth/sign-up");
            setIsLoading(false);
            return;
        }

        router.replace("/homepage/dashboard");
    }

    return <Fragment>
        {isLoading && createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
        <form className="bg-white mx-auto px-auto font-sans" style={{width: "680px", height: "100vh", maxHeight: "607px", padding: "93px 142px"}}>
            <div className="flex flex-row justify-center">
                {error && <p className="text-sml text-red-600">{error}</p>}
            </div>
            <Image src="/images/logo.png" alt="Company's logo" width={172} height={61} className="mb-16" />
            <p className=" text-dark text-2xl font-medium w-64" style={{marginTop: "28px"}}>Sign In</p>
            <p className="font-sans" style={{color: "rgba(0, 0, 0, 0.50)", fontSize: "14px", fontWeight: "400"}}>Please Sign in to your SkyTrades Account</p>
            <div className="mt-3.5 relative">
                <label className="text-sm font-normal text-light-brown">E-mail Address<span className="text-red-600">*</span></label> <br />
                <input type="email" onChange={() => setEmailValid(true)} ref={emailRef} placeholder="Enter your E-mail Address" className="bg-light-grey rounded-md placeholder:text-sml focus:outline-blue-200 placeholder:text-light-brown placeholder:font-medium font-sans" style={{width: "396px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)", paddingLeft: "14px",}} />
                {!emailValid && <p className="absolute top-1 right-0 text-sm text-red-600">email is invalid</p>}
            </div>    
            <button onClick={formSubmitHandler} className="bg-dark-blue text-white rounded-md mt-4 transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width:"396px", height: "46px"}}>Sign In</button>
            <div className="relative text-center" style={{marginTop: "20px"}}> 
                <div style={{width:"396px", height: "0.4px", background: "#B1B1B1",}}></div>
                <p className="absolute -top-2" style={{width:"18px", fontSize: "10px", padding: "auto", height: "15px", color: "#B1B1B1", left: "47.5%", background: "white"}}>or</p>
            </div>
            <div className="flex flex-row gap-5 mt-5">
                <button onClick={socialLoginHandler.bind(null, "google")} className="flex flex-row items-center justify-center transition-all duration-500 ease-in-out hover:bg-bleach-blue" style={{width: "188px", height: "43px", borderRadius: "6px", border: "0.5px solid rgba(0, 0, 0, 0.50)"}}>
                    <Image src="/images/google-logo.png" alt="google logo" width={33} height={33} />
                    <p>Google</p>
                </button>
                <button onClick={socialLoginHandler.bind(null, "facebook")} className="flex flex-row items-center justify-center  transition-all duration-500 ease-in-out hover:bg-bleach-blue" style={{width: "188px", height: "43px", borderRadius: "6px", border: "0.5px solid rgba(0, 0, 0, 0.50)"}}>
                    <Image src="/images/Facebook-logo.png" alt="facebook logo" width={33} height={33} />
                    <p>Facebook</p>
                </button>
            </div>
            <div className="mt-3.5 text-sm" style={{color: "rgba(0, 0, 0, 0.50)", fontWeight: "400"}}>
                Need a SkyTrades account? <Link href="/auth/sign-up" style={{color: "#0653EA"}}>Sign Up</Link>
            </div>
        </form>
    </Fragment>
}

export default Signin;

// export async function getStaticProps () {
//     const users = await Individual.findAll();

//     return {
//         props: {
//             users: JSON.parse(JSON.stringify(users))
//         },
//     }
// }
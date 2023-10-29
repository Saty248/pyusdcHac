import Image from "next/image";
import { Fragment, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { Web3Auth } from "@web3auth/modal";
import { SolanaWallet } from "@web3auth/solana-provider";
import { Payload as SIWPayload, SIWWeb3 } from "@web3auth/sign-in-with-web3";
import base58 from "bs58";

import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import Backdrop from "@/Components/Backdrop";
import AddCardModal from "@/Components/Modals/AddCardModal";
import swal from "sweetalert";
import Spinner from "@/Components/Spinner";


const Settings = (props) => {
    const { users } = props;
    const { error } = props;

    if(error) {
        swal({
            title: "oops!",
            text: "something went wrong. kindly try again",
          });
    }

    const router = useRouter();

    const [addCard, setAddCard] = useState(false);
    const [nameValid, setNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    useEffect(() => {
        const fetchedEmail = localStorage.getItem("email");
        const fetchedToken = JSON.parse(localStorage.getItem("openlogin_store"));

        if(users) {
            const singleUser = users.filter(user => user.email === fetchedEmail);

            // if(!fetchedEmail || fetchedToken.sessionId.length !== 64){
            if(singleUser.length < 1 || fetchedToken.sessionId.length !== 64){
                console.log("false")
                localStorage.removeItem("openlogin_store")
                router.push("/auth/join");
                return;
            };

            setToken(fetchedToken.sessionId);  
            setUser(singleUser[0]);
        }
    }, []);


    const closeAddCardHandler = () => {
        setAddCard(false)
    }

    const updateDataHandler = async(e) => {
        e.preventDefault();

        



        const name = nameRef.current.value;
        const phoneNumber = phoneRef.current.value;
        const email = emailRef.current.value;

        const regex = /^\S+@\S+\.\S+$/;
        const emailIsValid = regex.test(email);

        if(!name) {
            setNameValid(false);
            swal({
                title: "oops!",
                text: "Kindly complete all required fields",
                timer: 2000
              });
            return;
        }

        if(!phoneNumber) {
            setPhoneValid(false);
            swal({
                title: "oops!",
                text: "Kindly complete all required fields",
                timer: 2000
              });
            return;
        }

        if(!emailIsValid) {
            setEmailValid(false);
            swal({
                title: "oops!",
                text: "Kindly complete all required fields",
                timer: 2000
              });
            return;
        }

        
        // const domain = "localhost:3000";
        // const origin = "http://localhost:3000";

        // const payload = new SIWPayload();
        // payload.domain = domain;
        // payload.uri = origin;
        // // payload.address = publicKey!.toString();
        // payload.address = user.blockchainAddress;
        // payload.statement = "statement";
        // payload.version = "1";
        // payload.chainId = 1;

        // const header = { t: "sip99" };
        // const network = "solana";

        // console.log(JSON.stringify(payload));

        // let message = new SIWWeb3({ header, payload, network });
        // console.log(message)

        // const messageText = message.prepareMessage();
        // console.log(messageText);
        // const msg = new TextEncoder().encode(messageText);
        // const result = await solanaWallet.signMessage(msg);

        // const sign = base58.encode(result);
        // console.log("This is the signature", sign);

        // fetch("/api/verify-signature", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         signature: JSON.stringify({
        //             // nonce: message.payload.nonce,
        //             address: message.payload.address,
        //             // issuedAt: message.payload.issuedAt,
        //             payload: message.payload,
        //             sign: sign,
        //         })
        //     }
        // }).then(res => {
        //     console.log("The request was sent")
        //     if(!res.ok) {
        //         return res.json()
        //         .then(response => {
        //             console.log(response)
        //         })
        //     }
        //     return res.json()
        //     .then(response => {
        //         console.log(response)
        //     })
        // })
        // .catch((err) => {
        //     console.log(err)
        // })


        setIsLoading(true);

        const signatureObj = {};

        const retrievedObj = JSON.parse(localStorage.getItem("signature"));
       

        if(retrievedObj && retrievedObj.sign_issue_at) {
            console.log(retrievedObj)
            const issuedAt = new Date(retrievedObj.sign_issue_at);
            const issuedTime = Math.floor(issuedAt.getTime() / 1000);
            console.log(issuedAt);
            console.log(issuedTime);
            console.log(retrievedObj.sign_issue_at);
            const currentTimestampInSeconds = Math.floor(new Date().getTime() / 1000);
            const timeDifference = currentTimestampInSeconds - issuedTime;
            console.log("This is the time difference", timeDifference);

            if(timeDifference > 300) {
                console.log("The time has expired")
                const chainConfig = {
                    chainNamespace: "solana",
                    chainId: "0x1", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
                    rpcTarget: "https://api.testnet.solana.com",
                    displayName: "Solana Mainnet",
                    blockExplorer: "https://explorer.solana.com",
                    ticker: "SOL",
                    tickerName: "Solana",
                };
        
                const web3auth = new Web3Auth({
                        // For Production
                        // clientId: "",
                        clientId: process.env.NEXT_PUBLIC_PROD_CLIENT_ID,
                
                        // For Development
                        // clientId: process.env.NEXT_PUBLIC_DEV_CLIENT_ID,
                        web3AuthNetwork: "cyan",
                        chainConfig: chainConfig,
                    });
                
                await web3auth.initModal();
        
                const web3authProvider = await web3auth.connect();
        
                const solanaWallet = new SolanaWallet(web3authProvider); 
        
            
        
                const userInfo = await web3auth.getUserInfo();
                console.log(userInfo);
            
                // const domain = window.location.host;
                const domain = 'localhost:3000';
                // const origin = window.location.origin;
                const origin = 'http://localhost:3000';
        
                console.log("domain", domain);
                console.log("origin", origin);
        
        
                const payload = new SIWPayload();
                payload.domain = domain;
                payload.uri = origin;
                payload.address = user.blockchainAddress
                payload.statement = "Sign in with Solana to the app.";
                payload.version = "1";
                payload.chainId = 1;
        
                const header = { t: "sip99" };
                const network = "solana";
        
                console.log(JSON.stringify(payload));
        
                let message = new SIWWeb3({ header, payload, network });
                console.log(message)
        
                const messageText = message.prepareMessage();
                console.log(messageText);
                const msg = new TextEncoder().encode(messageText);
                const result = await solanaWallet.signMessage(msg);
        
                const signature = base58.encode(result);
                console.log("This is the signature", signature);
        
                signatureObj.sign = signature
                signatureObj.sign_nonce = message.payload.nonce
                signatureObj.sign_issue_at = message.payload.issuedAt
                signatureObj.sign_address = user.blockchainAddress
        
                localStorage.setItem("signature", JSON.stringify({
                    sign: signature,
                    "sign_issue_at": message.payload.issuedAt,
                    "sign_nonce": message.payload.nonce,
                    "sign_address": user.blockchainAddress,
                }));
            } else {
                console.log("I retrieved a valid sigature and used it");
                signatureObj.sign = retrievedObj.sign
                signatureObj.sign_nonce = retrievedObj.sign_nonce
                signatureObj.sign_issue_at = retrievedObj.sign_issue_at
                signatureObj.sign_address = retrievedObj.sign_address
            }
        } else {
            console.log("I didn't find any signature");
            const chainConfig = {
                chainNamespace: "solana",
                chainId: "0x1", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
                rpcTarget: "https://api.testnet.solana.com",
                displayName: "Solana Mainnet",
                blockExplorer: "https://explorer.solana.com",
                ticker: "SOL",
                tickerName: "Solana",
            };
    
            const web3auth = new Web3Auth({
                    // For Production
                    // clientId: "",
                    clientId: process.env.NEXT_PUBLIC_PROD_CLIENT_ID,
            
                    // For Development
                    // clientId: process.env.NEXT_PUBLIC_DEV_CLIENT_ID,
                    web3AuthNetwork: "cyan",
                    chainConfig: chainConfig,
                });
            
            await web3auth.initModal();
    
            const web3authProvider = await web3auth.connect();
    
            const solanaWallet = new SolanaWallet(web3authProvider); 
    
        
    
            const userInfo = await web3auth.getUserInfo();
            console.log(userInfo);
        
            // const domain = window.location.host;
            const domain = 'localhost:3000';
            // const origin = window.location.origin;
            const origin = 'http://localhost:3000';
    
            console.log("domain", domain);
            console.log("origin", origin);
    
    
            const payload = new SIWPayload();
            payload.domain = domain;
            payload.uri = origin;
            payload.address = user.blockchainAddress
            payload.statement = "Sign in with Solana to the app.";
            payload.version = "1";
            payload.chainId = 1;
    
            const header = { t: "sip99" };
            const network = "solana";
    
    
            let message = new SIWWeb3({ header, payload, network });
    
            const messageText = message.prepareMessage();
            const msg = new TextEncoder().encode(messageText);
            const result = await solanaWallet.signMessage(msg);
    
            const signature = base58.encode(result);
    
            signatureObj.sign = signature
            signatureObj.sign_nonce = message.payload.nonce
            signatureObj.sign_issue_at = message.payload.issuedAt
            signatureObj.sign_address = user.blockchainAddress
    
            localStorage.setItem("signature", JSON.stringify({
                sign: signature,
                "sign_issue_at": message.payload.issuedAt,
                "sign_nonce": message.payload.nonce,
                "sign_address": user.blockchainAddress,
            }));
        };





        fetch(`/api/proxy?${Date.now()}`, {
            method: "PATCH",
            body: JSON.stringify({
                userId: user.id,
                name,
                email,
                phoneNumber
            }),
            headers: {
                "Content-Type": "application/json",
                uri: "/users/update",
                // proxy_to_method: "PATCH",
                sign: signatureObj.sign,
                sign_issue_at:  signatureObj.sign_issue_at,
                sign_nonce: signatureObj.sign_nonce,
                sign_address: signatureObj.sign_address,
            }
        })
        .then((res) => {
            console.log(res)
            if(!res.ok) {
                return res.json()
                .then(errorData => {
                    console.log(errorData)
                    throw new Error(errorData.errorMessage);
                });
            }
            return res.json()
            .then(() => {
                swal({
                    title: "Submitted",
                    text: "record successfully updated.",
                    icon: "success",
                    button: "Ok"
                  })
                .then(() => {
                    router.push("/homepage/dashboard");
                    setIsLoading(false);
                })
            })
        })
        .catch(err => {
            console.log(err);
            const error = err.toString().split(':')
            swal({
                title: "oops!",
                text: `${error[1]}`,
              })
            .then(() => {
                setIsLoading(false);
            })
        })
    }

    if(!user || !token) {
        return <Spinner />
    } 

    return <Fragment>
        {addCard && createPortal(<Backdrop onClick={closeAddCardHandler} />, document.getElementById("backdrop-root"))}
        {addCard && createPortal(<AddCardModal onClose={closeAddCardHandler} />, document.getElementById("modal-root"))}
        <div className="flex flex-row mx-auto">
            <Sidebar users={users} />
            <div style={{width: "calc(100vw - 257px)", height: "100vh"}} className="overflow-y-auto overflow-x-hidden">
                <Navbar name={user.name}  status={user.KYCStatusId === 0 ? "Notattempted" : 
                                                user.KYCStatusId === 1 ? "pending" 
                                                : user.KYCStatusId === 3 ? "Rejected" : "Approved"} />
                <form className="bg-white pt-16 pb-2 px-10 mx-auto" style={{width: "calc(100vw-257px)", borderTop: "2px solid #F0F0FA"}}>
                    <div>
                        <h3 className="text-2xl font-medium">My Profile</h3>
                        <p>Update your account settings</p>
                    </div>
                    {/* <div className="mt-10 px-6 flex justify-between items-center border-2 border-light-blue rounded-md" style={{width: "", height: "143px"}}>
                        <div className="flex flex-row items-center me-5">
                            <Image src="/images/Ellipse.png" alt="icon" className="me-2" width={55} height={55} />
                            <p className="font-base font-medium">John Doe</p>
                        </div>
                        <div className="flex justify-between gap-3">
                            <button className="bg-dark text-white rounded-md transition-all duration-500 ease-in-out hover:bg-slate-950 hover:text-white" style={{width: "189px", height: "39px"}}>Upload new picture</button>
                            <button className="bg-bleach-red text-light-red-100 rounded-md transition-all duration-500 ease-in-out hover:bg-red-200 hover:text-white" style={{width: "101px", height: "39px"}}>Remove</button>
                        </div>
                    </div> */}
                    {(user.KYCStatusId === 0) &&
                        <div className="border-2 mt-10 flex flex-row justify-between items-center px-6 py-5 border-light-blue rounded-md" style={{width: "", height: "124px"}}>
                            <div>
                                <h3 className="text-2xl font-medium">Verify your Account</h3>
                                <p>Verify your account to have your AirSpace listed for rental on our platform</p>
                            </div>
                            <button className="bg-dark-blue rounded-md text-white transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "120px", height: "40px"}}>Verify now</button>
                        </div>
                    }

                    {(user.KYCStatusId === 3) &&
                        <div className="border-2 mt-10 flex flex-row justify-between items-center px-6 py-5 border-light-blue rounded-md" style={{width: "", height: "124px"}}>
                            <div>
                                <h3 className="text-2xl font-medium">Your Account is not verified</h3>
                                <p>Sorry. You didn't pass the KYC check</p>
                            </div>
                            <button className="bg-dark-blue rounded-md text-white transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "120px", height: "40px"}}>rejected</button>
                        </div>
                    }

                    {user.KYCStatusId === 2 && 
                        <div className="border-2 mt-10 flex flex-row justify-between items-center px-6 py-5 border-light-blue rounded-md" style={{width: "", height: "124px"}}>
                            <div>
                                <h3 className="text-2xl font-medium">Your Account is verified</h3>
                                <p>This Account is verified</p>
                            </div>
                            <p className="bg-bleach-green rounded-md py-1 px-2 text-center text-light-green">Approved</p>
                        </div>
                    }

                    {user.KYCStatusId === 1 &&
                        <div className="border-2 mt-10 flex flex-row justify-between items-center px-6 py-5 border-light-blue rounded-md" style={{width: "", height: "124px"}}>
                            <div>
                                <h3 className="text-2xl font-medium">Your Account is pending verification</h3>
                                <p>This Account is under review</p>
                            </div>
                            <p className="bg-light-yellow font-semibold rounded-md py-1 px-2 text-center text-dark-yellow">Pending</p>
                        </div>
                    }

                    <div className="border-2 mt-10 flex flex-col justify-center px-6 py-5 border-light-blue rounded-md" style={{width: "", height: "297px"}}>
                        <div className="mb-5">
                            <h3 className="text-2xl font-medium">Personal Information</h3>
                            <p>update your personal information</p>
                        </div>
                        <div className="relative mb-10"  style={{maxWidth: "660px", height: "37px"}}>
                            <label className="text-bleach-brown" htmlFor="first name">Name</label> <br />
                            <input type="text" ref={nameRef} onChange={() => setNameValid(true)} name="name" defaultValue={user.name} id="name" 
                                className="ps-3 placeholder:font-medium border-2 border-light-blue focus:outline-blue-200 placeholder:text-dark-brown rounded-md" style={{width: "660px", height: "37px"}} />
                            {!nameValid && <p className="absolute top-1 right-0 text-sm text-red-600">name cannot be empty</p>}
                        </div>
                        <div className="flex mt-6 gap-5">
                            <div className="relative">
                                <label className="text-bleach-brown" htmlFor="email">Email</label> <br />
                                <input type="email" disabled ref={emailRef} name="email" defaultValue={user.email} id="email" 
                                    className="ps-3 placeholder:font-medium border-2 border-light-blue focus:outline-blue-200 placeholder:text-dark-brown rounded-md" style={{width: "320px", height: "37px"}} />
                                {!emailValid && <p className="absolute top-1 right-0 text-sm text-red-600">email is invalid</p>}
                            </div>
                            <div className="relative">
                                <label className="text-bleach-brown" htmlFor="number">Phone Number</label> <br />
                                <input type="text" onChange={() => setPhoneValid(true)} ref={phoneRef} name="number"  defaultValue={user.phoneNumber} id="number" 
                                    className="ps-3 placeholder:font-medium border-2 border-light-blue focus:outline-blue-200 placeholder:text-dark-brown rounded-md" style={{width: "320px", height: "37px"}} />
                                {!phoneValid && <p className="absolute top-1 right-0 text-sm text-red-600">invalid phone number</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-center mt-8 gap-5">
                        <button onClick={updateDataHandler} disabled={isLoading} className={`bg-dark-blue rounded-md text-white transition-all duration-500 ease-in-out hover:bg-blue-600 ${!isLoading ? "cursor-pointer" : "cursor-wait"}`} style={{width: "120px", height: "40px"}}>{isLoading ? "saving..." : "Save"}</button>
                    </div>
                    <div className="flex flex-row mt-10 text-sm justify-between items-center">
                        <p>&copy; Skytrade 2023</p>
                        <div className="flex flex-row items-center gap-1">
                            <a className="flex flex-row items-center gap-1" href="mailto:help@sky.trade">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                                    <path d="M12.6 0H1.4C0.63 0 0 0.61875 0 1.375V9.625C0 10.3813 0.63 11 1.4 11H12.6C13.37 11 14 10.3813 14 9.625V1.375C14 0.61875 13.37 0 12.6 0ZM12.32 2.92188L7.742 5.73375C7.287 6.01562 6.713 6.01562 6.258 5.73375L1.68 2.92188C1.505 2.81188 1.4 2.62625 1.4 2.42688C1.4 1.96625 1.911 1.69125 2.31 1.93187L7 4.8125L11.69 1.93187C12.089 1.69125 12.6 1.96625 12.6 2.42688C12.6 2.62625 12.495 2.81188 12.32 2.92188Z" fill="black" fillOpacity="0.5"/>
                                </svg>
                                <span>
                                    help@sky.trade
                                </span>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
}

export default Settings;

export async function getServerSideProps() {
    try{
        // const response = await fetch("http://localhost:3000/api/proxy", {
        const response = await fetch(`https://main.d3a3mji6a9sbq0.amplifyapp.com/api/proxy?${Date.now()}`, {
            headers: {
                "Content-Type": "application/json",
                uri: "/users",
                // proxy_to_method: "GET",
            }
        })

        if(!response.ok) {
            throw new Error()
        }
        
        const data = await response.json();

        return {
            props: {
                users: JSON.parse(JSON.stringify(data))
            }
        }
    }
    catch(err) {
        return {
                props: { 
                    error: "oops! something went wrong. Kindly try again."
                }
            }
    }
}

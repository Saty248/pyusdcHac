import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import swal from "sweetalert";

import Backdrop from "@/Components/Backdrop";
import Spinner from "@/Components/Spinner";

const CorporateSignup = () => {
    const router = useRouter();
    const newsletterRef = useRef();
    const nameRef = useRef();
    const phoneNumberRef = useRef();
    const countryCodeRef = useRef();

    const [newsletter, setnewsletter] = useState(false);
    const [nameValid, setNameValid] = useState(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoad, setPageLoad] = useState(true);

    const countryCodes = ["+1", "+44", "+233", "+234", "+93", "+355", "+213", "+1-684", "+376", "+244", "+1-264", 
                            "+672", "+268", "+54", "+374", "+297", "+61", "+43", "+994", "+1-242", "+973", "+880",
                            "+1-246", "+375", "+32", "+501", "+229", "+1-441", "+975", "+591", "+387", "+267",  
                            "+55", "+246", "+1-284", "+673", "+359", "+226", "+257", "+238", "+1-345", "+236",
                            "+235", "+56", "+86", "+57", "+269", "+682", "+506", "+385", "+53", "+599",
                            "+357", "+420", "+243", "+45", "+253", "+1-767", "+1-809", "+1-829", "+1-849", "+670",
                            "+593", "+20", "+503", "+240", "+291", "+372", "+251", "+500", "+298", "+679", "+358",
                            "+33", "+689", "+241", "+220",
                        ]

    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if(!category.categoryId) {
                router.replace("/auth/join");
                return;
            }
        }

        setPageLoad(false);
    }, []);

    
    const category = useSelector(state => state.value.category);

    const web3 = useSelector(state => state.value.web3);
    const token = web3.token;


    
    const newsletterHandler = () => {
        setnewsletter(prev => !prev)
    }

    const returnHandler = (e) => {
        e.preventDefault();
        router.push("/auth/join")
    }


    const formSubmitHandler = (e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const countryCode = countryCodeRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        

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
            setPhoneNumberValid(false);
            swal({
                title: "oops!",
                text: "Kindly complete all required fields",
                timer: 2000
              });
            return;
        }


        const userInfo = {
            ...category,
            categoryId: +category.categoryId,
            name,
            phoneNumber: `${countryCode}${phoneNumber}`,
            newsletter
        }

        setIsLoading(true);

        fetch(`/api/proxy?${Date.now()}`, {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json",
                uri: "/users/create",
                proxy_to_method: "POST",
            }
        }).then(res => {
                if(!res.ok) {
                    return res.json()
                    .then(errorData => {
                        swal({
                            title: "oops!",
                            text: `${errorData.errorMessage}`,
                          });
                        throw new Error(errorData.errorMessage);
                    });
                }
            setError(false)
            swal({
                title: "Submitted",
                text: "User registered successfully. You will now be signed in",
                icon: "success",
                button: "Ok"
              }).then(() => {
                localStorage.setItem("email", category.email);
                localStorage.setItem("openlogin_store", JSON.stringify({
                    sessionId: token.sessionId
                }));
                // setIsLoading(false);
                nameRef.current.value = ""
                phoneNumberRef.current.value = ""
                router.replace("/homepage/dashboard");
              })
            return res.json();
        })
        .catch(error => {
            setError(error.toString());
            setIsLoading(false)
        });
    }

    if(pageLoad) {
        return <Spinner />
    }

    return <Fragment>
        {isLoading && createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
        {isLoading && createPortal(<Spinner />, document.getElementById("backdrop-root"))}
        <form onSubmit={formSubmitHandler} className="bg-white mx-auto px-auto font-sans relative" style={{width: "680px", height: "100vh", maxHeight: "607px", padding: "93px 142px"}}>
            <button onClick={returnHandler} className="flex flex-row items-center gap-2 absolute top-8 left-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <path d="M0.999999 4L4.33333 7M0.999999 4L4.33333 1M0.999999 4L13 4" stroke="#252530" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Back</p>
            </button>
            {/* {error && <p className="text-sm mx-auto text-red-600">{error}</p>} */}
            <Image src="/images/logo.png" alt="Company's logo" width={172} height={61} />
            <p className=" text-dark text-2xl font-medium w-full" style={{marginTop: "28px"}}>Corporate Entity Sign Up</p>
            <div className="mt-3.5 relative">
                <label className="text-sm font-normal text-light-brown">Company Name <span className="text-red-600">*</span></label> <br />
                <input type="text" ref={nameRef} onChange={() => setNameValid(true)} className="bg-light-grey rounded-md focus:outline-blue-200 placeholder:text-light-brown placeholder:font-medium font-sans" placeholder="Company Name" style={{width: "396px",  height: "43px", paddingLeft: "14px", border: "0.5px solid rgba(0, 0, 0, 0.50)",}} />
                {!nameValid && <p className="absolute top-1 right-0 text-sm text-red-600">name cannot be empty</p>}
            </div>
            
            <div className="flex flex-row gap-3 my-3.5" style={{width: "396px",  height: "43px"}}>
                <div className="relative items-center">
                    <label className="text-sm font-normal" style={{color: "rgba(0, 0, 0, 0.50)"}} >Country code<span className="text-red-600">*</span></label> <br />
                    <select ref={countryCodeRef} className="ps-10 appearance-none hover:cursor-pointer bg-light-grey rounded-md font-sans focus:outline-blue-200" style={{width: "118px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)"}} >
                        {countryCodes.map(code => {
                            return <option key={code} className="text-dark font-medium font-sans">
                                    {code}
                                </option>
                        })}
                    </select>
                    <Image src="/images/language.png" alt="world icon" width={24} height={24} className="absolute top-8 left-3" />
                    <Image src="/images/vector.png" alt="dropdown arrow" width={8} height={5} className="absolute top-11 right-4" />
                </div>
                <div className="relative">
                    <label className="text-sm font-normal" style={{color: "rgba(0, 0, 0, 0.50)"}} >Phone Number<span className="text-red-600">*</span></label> <br />
                    <input ref={phoneNumberRef} onChange={() => setPhoneNumberValid(true)} type="number" min="0" placeholder="Enter your Phone number" className="bg-light-grey rounded-md font-sans placeholder:text-light-brown placeholder:font-medium focus:outline-blue-200" style={{width: "266px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)", paddingLeft: "14px",}} />
                    {!phoneNumberValid && <p className="absolute top-1 right-0 text-sm text-red-600">invalid phone number</p>}
                </div>
            </div>
            <div className="mt-12 flex flex-row items-center">
                <input type="checkbox" onChange={newsletterHandler} checked={newsletter} ref={newsletterRef} className="me-1 bg-light-grey rounded-md cursor-pointer" />
                <label onClick={newsletterHandler} className="text-sm font-normal cursor-pointer text-light-brown">Send me news letters and keep me updated on daily news</label>
            </div>
            {/* <div className="mt-3.5 flex flex-row items-center">
                <input type="checkbox" onClick={robotHandler} checked={robot} ref={robotRef} className="me-1 bg-light-grey rounded-md cursor-pointer" />
                <label onClick={robotHandler} className="text-sm font-normal text-light-brown cursor-pointer">I am not a robot</label>
            </div> */}
            <div className="mt-3.5 text-sm" style={{color: "rgba(0, 0, 0, 0.50)", fontWeight: "400"}}>
                    By clicking Create Account, you acknowledge you have read and agreed 
                    to our <a href="/" style={{color: "#0653EA", textDecoration: "underline"}}>Terms of Use</a> and <a href="/" style={{color: "#0653EA", textDecoration: "underline"}}>Privacy Policy</a>.
            </div>
            <button className="bg-dark-blue text-white rounded-md mt-4  transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width:"396px", height: "46px",}}>Create Account</button>
        </form>
    </Fragment>
}

export default CorporateSignup;
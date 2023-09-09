import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const Signin = () => {
    const checkboxRef = useRef();
    const [checkbox, setCheckbox] = useState(false);

    const checkboxHandler = () => {
        setCheckbox(prev => !prev);
    }

    return <form className="bg-white mx-auto px-auto font-sans" style={{width: "680px", height: "957px", padding: "93px 142px"}}>
        <Image src="/images/logo.png" alt="Company's logo" width={172} height={61} className="mb-16" />
        <p className=" text-dark text-2xl font-medium w-64" style={{marginTop: "28px"}}>Sign In</p>
        <p className="font-sans" style={{color: "rgba(0, 0, 0, 0.50)", fontSize: "14px", fontWeight: "400"}}>Please Sign in to your SkyTrades Account</p>
        <div className="mt-3.5">
            <label className="text-sm font-normal text-light-brown">E-mail Address<span className="text-red-600">*</span></label> <br />
            <input type="email" placeholder="Enter your E-mail Address" className="bg-light-grey rounded-md placeholder:text-sml focus:outline-blue-200 placeholder:text-light-brown placeholder:font-medium font-sans" style={{width: "396px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)", paddingLeft: "14px",}} />
        </div>
        <div className="mt-3.5 relative">
            <label className="text-sm font-normal text-light-brown">Password<span className="text-red-600">*</span></label> <br />
            <input type="password" placeholder="Password" className="bg-light-grey rounded-md placeholder:text-sml focus:outline-blue-200 placeholder:text-light-brown placeholder:font-medium font-sans" style={{width: "396px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)", paddingLeft: "14px",}} />
            <Image src="/images/view-password.png" alt="" width={14} height={12} className="absolute top-10 right-3 cursor-pointer" />
        </div>
        <div className="flex flex-row justify-between mt-3.5">
            <div className="flex flex-row items-center">
                <input type="checkbox" ref={checkboxRef} checked={checkbox} onClick={checkboxHandler} className="me-1 bg-light-grey cursor-pointer rounded-md" />
                <label className="text-sm font-normal cursor-pointer text-light-brown"  onClick={checkboxHandler} style={{color: ""}}>Remember me</label>
            </div>
            <div>
                <a href="#"  style={{color: "#0653EA", fontSize: "12px", fontWeight: "400"}}>forgot your password?</a>
            </div>
        </div>
        <button className="bg-dark-blue text-white rounded-md mt-4 transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width:"396px", height: "46px"}}>Sign In</button>
        <div className="relative text-center" style={{marginTop: "20px"}}> 
            <div style={{width:"396px", height: "0.4px", background: "#B1B1B1",}}></div>
            <p className="absolute -top-2" style={{width:"18px", fontSize: "10px", padding: "auto", height: "15px", color: "#B1B1B1", left: "47.5%", background: "white"}}>or</p>
        </div>
        <div className="flex flex-row gap-5 mt-5">
            <button className="flex flex-row items-center justify-center transition-all duration-500 ease-in-out hover:bg-bleach-blue" style={{width: "188px", height: "43px", borderRadius: "6px", border: "0.5px solid rgba(0, 0, 0, 0.50)"}}>
                <Image src="/images/google-logo.png" width={33} height={33} />
                <p>Google</p>
            </button>
            <button className="flex flex-row items-center justify-center  transition-all duration-500 ease-in-out hover:bg-bleach-blue" style={{width: "188px", height: "43px", borderRadius: "6px", border: "0.5px solid rgba(0, 0, 0, 0.50)"}}>
                <Image src="/images/Facebook-logo.png" width={33} height={33} />
                <p>Facebook</p>
            </button>
        </div>
        <div className="mt-3.5 text-sm" style={{color: "rgba(0, 0, 0, 0.50)", fontWeight: "400"}}>
             Need a SkyTrades account? <Link href="/auth/sign-up" style={{color: "#0653EA"}}>Sign Up</Link>
        </div>
    </form>
}

export default Signin;
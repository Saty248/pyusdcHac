import Image from "next/image";
import Link from "next/link";

const Signup = () => {
    return <form className="bg-white mx-auto px-auto font-sans" style={{width: "680px", height: "957px", padding: "93px 142px"}}>
        <Image src="/images/logo.png" alt="Company's logo" width={172} height={61} />
        <p className=" text-dark text-2xl font-medium w-64" style={{marginTop: "28px"}}>Account Sign Up</p>
        <div className="mt-3.5">
            <label className="text-sm font-normal" style={{color: "rgba(0, 0, 0, 0.50)"}} >Name / Company Name <span className="text-red-600">*</span></label> <br />
            <input type="text" className="bg-light-grey rounded-md placeholder:text-dark placeholder:text-sm placeholder:font-medium font-sans" placeholder="Name" style={{width: "396px",  height: "43px", paddingLeft: "14px", border: "0.5px solid rgba(0, 0, 0, 0.50)",}} />
        </div>
        <div className="mt-3.5">
            <label className="text-sm font-normal" style={{color: "rgba(0, 0, 0, 0.50)"}} >E-mail Address<span className="text-red-600">*</span></label> <br />
            <input type="email" placeholder="Enter your E-mail Address" className="bg-light-grey rounded-md placeholder:text-dark placeholder:text-sm placeholder:font-medium font-sans" style={{width: "396px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)", paddingLeft: "14px",}} />
        </div>
        <div className="flex flex-row gap-3 mt-3.5" style={{width: "396px",  height: "43px"}}>
            <div className="relative items-center">
                <label className="text-sm font-normal" style={{color: "rgba(0, 0, 0, 0.50)"}} >Country code<span className="text-red-600">*</span></label> <br />
                <select className="ps-10 appearance-none hover:cursor-pointer bg-light-grey rounded-md placeholder:text-dark placeholder:text-sm placeholder:font-medium font-sans" style={{width: "118px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)"}} >
                    <option className="text-dark text-sm font-medium font-sans">
                        +233
                    </option>
                </select>
                <Image src="/images/language.png" width={24} height={24} className="absolute top-8 left-3" />
                <Image src="/images/vector.png" width={8} height={5} className="absolute top-11 left-24" />
            </div>
            <div>
                <label className="text-sm font-normal" style={{color: "rgba(0, 0, 0, 0.50)"}} >Phone Number<span className="text-red-600">*</span></label> <br />
                <input type="number" placeholder="Enter your E-mail Address" className="bg-light-grey rounded-md placeholder:text-dark placeholder:text-sm placeholder:font-medium font-sans" style={{width: "266px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)", paddingLeft: "14px",}} />
            </div>
        </div>
       
        <div className="flex flex-row gap-3 mt-5" style={{width: "396px",  height: "43px"}}>
            <div className="mt-3.5 relative">
                <label className="text-sm font-normal" style={{color: "rgba(0, 0, 0, 0.50)"}} >Password<span className="text-red-600">*</span></label> <br />
                <input type="password" placeholder="Password" className="bg-light-grey rounded-md placeholder:text-dark placeholder:text-sm placeholder:font-medium font-sans" style={{width: "192px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)", paddingLeft: "14px",}} />
                <Image src="/images/view-password.png" alt="" width={14} height={12} className="absolute top-10 right-3 hover:cursor-pointer" />
            </div>
            <div className="mt-3.5 relative">
                <label className="text-sm font-normal" style={{color: "rgba(0, 0, 0, 0.50)"}} >Confirm Password<span className="text-red-600">*</span></label> <br />
                <input type="password" placeholder="Confirm Password" className="bg-light-grey rounded-md placeholder:text-dark placeholder:text-sm placeholder:font-medium font-sans" style={{width: "192px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)", paddingLeft: "14px",}} />
                <Image src="/images/view-password.png" alt="" width={14} height={12} className="absolute top-10 right-3 hover:cursor-pointer" />
            </div>
        </div>
        <div className="mt-12">
            <input type="checkbox" className="me-1 bg-light-grey rounded-md" />
            <label className="text-sm font-normal mt-10" style={{color: "rgba(0, 0, 0, 0.50)"}}>Send me news letters and keep me updated on daily news</label>
        </div>
        <div className="mt-3.5">
            <input type="checkbox" className="me-1 bg-light-grey rounded-md" />
            <label className="text-sm font-normal mt-10" style={{color: "rgba(0, 0, 0, 0.50)"}}>I am not a robot</label>
        </div>
        <div className="mt-3.5 text-sm" style={{color: "rgba(0, 0, 0, 0.50)", fontWeight: "400"}}>
                By clicking Create Account, you acknowledge you have read and agreed 
                to our <a href="/" style={{color: "#0653EA", textDecoration: "underline"}}>Terms of Use</a> and <a href="/" style={{color: "#0653EA", textDecoration: "underline"}}>Privacy Policy</a>.
        </div>
        <button style={{width:"396px", height: "46px", color: "white", borderRadius: "7px", background: "#0653EA", marginTop: "15px"}}>Create Account</button>
        <div className="relative text-center" style={{marginTop: "20px"}}> 
            <div style={{width:"396px", height: "0.4px", background: "#B1B1B1",}}></div>
            <p className="absolute -top-2" style={{width:"18px", fontSize: "10px", padding: "auto", height: "15px", color: "#B1B1B1", left: "47.5%", background: "white"}}>or</p>
        </div>
        <div className="flex flex-row gap-5 mt-5">
            <button className="flex flex-row items-center justify-center" style={{width: "188px", height: "43px", borderRadius: "6px", border: "0.5px solid rgba(0, 0, 0, 0.50)"}}>
                <Image src="/images/google-logo.png" width={33} height={33} />
                <p>Google</p>
            </button>
            <button className="flex flex-row items-center justify-center" style={{width: "188px", height: "43px", borderRadius: "6px", border: "0.5px solid rgba(0, 0, 0, 0.50)"}}>
                <Image src="/images/Facebook-logo.png" width={33} height={33} />
                <p>Facebook</p>
            </button>
        </div>
        <div className="mt-3.5 text-sm" style={{color: "rgba(0, 0, 0, 0.50)", fontWeight: "400"}}>
                Already have an account? <Link href="/auth/sign-in" style={{color: "#0653EA", textDecoration: "underline"}}>Sign in</Link>
        </div>
    </form>
}

export default Signup;
import Image from "next/image";
import { Fragment, useState } from "react";
import { createPortal } from "react-dom";

import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import Backdrop from "@/Components/Backdrop";
import AddCardModal from "@/Components/Modals/AddCardModal";
import mastercard from "../../../public/images/mastercard-logo.png";
import visa from "../../../public/images/visa-logo.png";



const Settings = () => {
    const [addCard, setAddCard] = useState(false);
    // const [card, setCard] = useState("");
    // const visaRef = useRef();

    const addCardHandler = (e) => {
        e.preventDefault();
        setAddCard(true);
    }

    const closeAddCardHandler = () => {
        setAddCard(false)
    }

    // const cardSelectHandler = (e) => {
    //     e.preventDefault();
    //     setCard(e.target.value);
    // }

    // const targetCard = (e) => {
    //     visaRef.current.click();
    //     console.log("clicked")
    // }

    return <Fragment>
        {addCard && createPortal(<Backdrop onClick={closeAddCardHandler} />, document.getElementById("backdrop-root"))}
        {addCard && createPortal(<AddCardModal onClose={closeAddCardHandler} />, document.getElementById("modal-root"))}
        <div className="flex flex-row mx-auto" style={{maxWidth: "1440px"}}>
            <Sidebar />
            <div style={{width: "calc(100vw - 257px)", height: "100vh"}} className="overflow-y-auto">
                <Navbar />
                <form className="bg-white py-16 px-10 mx-auto" style={{maxWidth: "1183px", height: "1526px", borderTop: "2px solid #F0F0FA"}}>
                    <div>
                        <h3 className="text-2xl font-medium">My Profile</h3>
                        <p>Update your account settings</p>
                    </div>
                    <div className="mt-10 px-6 flex justify-between items-center border-2 border-light-blue rounded-md" style={{width: "", height: "143px"}}>
                        <div className="flex flex-row items-center me-5">
                            <Image src="/images/Ellipse.png" alt="icon" className="me-2" width={55} height={55} />
                            <p className="font-base font-medium">John Doe</p>
                        </div>
                        <div className="flex justify-between gap-3">
                            <button className="bg-dark text-white rounded-md transition-all duration-500 ease-in-out hover:bg-slate-950 hover:text-white" style={{width: "189px", height: "39px"}}>Upload new picture</button>
                            <button className="bg-bleach-red text-light-red-100 rounded-md transition-all duration-500 ease-in-out hover:bg-red-200 hover:text-white" style={{width: "101px", height: "39px"}}>Remove</button>
                        </div>
                    </div>
                    <div className="border-2 mt-10 flex flex-col justify-center px-6 py-5 border-light-blue rounded-md" style={{width: "", height: "297px"}}>
                        <div className="mb-5">
                            <h3 className="text-2xl font-medium">Personal Information</h3>
                            <p>update your personal information</p>
                        </div>
                        <div className="flex gap-5">
                            <div>
                                <label className="text-bleach-brown" htmlFor="first name">First Name</label> <br />
                                <input type="text" name="first name" defaultValue="John" id="first name" 
                                    className="ps-3 placeholder:font-medium border-2 border-light-blue focus:outline-blue-200 placeholder:text-dark-brown rounded-md" style={{width: "320px", height: "37px"}} />
                            </div>
                            <div>
                                <label className="text-bleach-brown" htmlFor="last name">Last Name</label> <br />
                                <input type="text" name="last name" defaultValue="Doe" id="last name" 
                                    className="ps-3 placeholder:font-medium border-2 border-light-blue focus:outline-blue-200 placeholder:text-dark-brown rounded-md" style={{width: "320px", height: "37px"}} />
                            </div>
                        </div>
                        <div className="flex mt-6 gap-5">
                            <div>
                                <label className="text-bleach-brown" htmlFor="email">Email</label> <br />
                                <input type="email" name="email" defaultValue="johndoe12345@gmail.com" id="email" 
                                    className="ps-3 placeholder:font-medium border-2 border-light-blue focus:outline-blue-200 placeholder:text-dark-brown rounded-md" style={{width: "320px", height: "37px"}} />
                            </div>
                            <div>
                                <label className="text-bleach-brown" htmlFor="number">Phone Number</label> <br />
                                <input type="text" name="number" defaultValue="+233445667874" id="number" 
                                    className="ps-3 placeholder:font-medium border-2 border-light-blue focus:outline-blue-200 placeholder:text-dark-brown rounded-md" style={{width: "320px", height: "37px"}} />
                            </div>
                        </div>
                    </div>
                    <div className="border-2 mt-10 flex flex-col justify-center px-6 py-5 border-light-blue rounded-md" style={{width: "", height: "297px"}}>
                        <div className="mb-5">
                            <h3 className="text-2xl font-medium">Change Password</h3>
                            <p>Your new password must be different from the previous used passwords</p>
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <label className="text-bleach-brown" htmlFor="password">Current password</label> <br />
                                <input type="password" name="password" defaultValue="Current password" id="password" 
                                    className="ps-3 placeholder:font-medium border-2 focus:outline-blue-200 border-light-blue placeholder:text-dark-brown rounded-md" style={{width: "660px", height: "37px"}} />
                            </div>
                        </div>
                        <div className="flex mt-6 gap-5">
                            <div>
                                <label className="text-bleach-brown" htmlFor="password">New Password</label> <br />
                                <input type="password" name="password" id="password" 
                                    className="ps-3 placeholder:font-medium border-2 focus:outline-blue-200 border-light-blue placeholder:text-dark-brown rounded-md" style={{width: "320px", height: "37px"}} />
                            </div>
                            <div>
                                <label className="text-bleach-brown" htmlFor="password">New Password</label> <br />
                                <input type="password" name="password" id="password" 
                                    className="ps-3 placeholder:font-medium border-2 focus:outline-blue-200 border-light-blue placeholder:text-dark-brown rounded-md" style={{width: "320px", height: "37px"}} />
                            </div>
                        </div>
                    </div>
                    <div className="border-2 mt-10 px-6 py-5 border-light-blue rounded-md" style={{width: "", height: "367px"}}>
                        <div className="mb-5">
                            <h3 className="text-2xl font-medium">Payment Method</h3>
                            <p>Update your payment information</p>
                        </div>
                        <div className="flex flex-row justify-start gap-5 mt-5">
                            <div className="flex flex-col items-center gap-5">
                                <div className="bg-white flex flex-col relative justify-between rounded-lg p-7" style={{width: "395px", height: "169px", boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.13)"}}>
                                    <div className="flex flex-row justify-between z-10">
                                        <p className="text-light-brown text-sm">John Doe</p>
                                        <p className="text-light-brown text-sm">05/24</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="20" viewBox="0 0 4 20" fill="none">
                                            <circle cx="2" cy="2" r="2" fill="rgba(63, 61, 86, 0.75)"/>
                                            <circle cx="2" cy="10" r="2" fill="rgba(63, 61, 86, 0.75)"/>
                                            <circle cx="2" cy="18" r="2" fill="rgba(63, 61, 86, 0.75)"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-row justify-between items-end z-10">
                                        <p className="font-medium text-2xl text-dark">**** **** **** 1234</p>
                                        <Image src={visa} alt="mastercard" className="-mb-4" />
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0" style={{zIndex: 2}} width="137" height="103" viewBox="0 0 137 103" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M130.63 103H10C4.47717 103 0 98.5229 0 93V10.0757C13.4341 3.66759 29.0313 0 45.6673 0C96.1093 0 137.001 33.7183 137.001 75.3118C137.001 85.0882 134.742 94.4294 130.63 103Z" fill="#F9F9F9"/>
                                    </svg>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <input type="radio" id="no" value="visa" name="broadcast" className="cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-5">
                                <div className="bg-white flex flex-col relative justify-between rounded-lg p-7" style={{width: "395px", height: "169px", boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.13)"}}>
                                    <div className="flex flex-row justify-between z-10">
                                        <p className="text-light-brown text-sm">John Doe</p>
                                        <p className="text-light-brown text-sm">05/24</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="20" viewBox="0 0 4 20" fill="none">
                                            <circle cx="2" cy="2" r="2" fill="rgba(63, 61, 86, 0.75)"/>
                                            <circle cx="2" cy="10" r="2" fill="rgba(63, 61, 86, 0.75)"/>
                                            <circle cx="2" cy="18" r="2" fill="rgba(63, 61, 86, 0.75)"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-row justify-between z-10">
                                        <p className="font-medium text-2xl text-dark">**** **** **** 1234</p>
                                        <Image src={mastercard} alt="mastercard" />
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0" style={{zIndex: 2}} width="137" height="103" viewBox="0 0 137 103" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M130.63 103H10C4.47717 103 0 98.5229 0 93V10.0757C13.4341 3.66759 29.0313 0 45.6673 0C96.1093 0 137.001 33.7183 137.001 75.3118C137.001 85.0882 134.742 94.4294 130.63 103Z" fill="#F9F9F9"/>
                                    </svg>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <input type="radio" id="no" name="broadcast" value="mastercard" className="cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        <button onClick={addCardHandler} className="flex flex-row items-center gap-2 mt-2 font-medium text-dark-blue">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 17V7" stroke="#0653EA" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M7 12L17 12" stroke="#0653EA" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            <p className="mt-1">Add New Card</p>
                        </button>
                    </div>
                    <div className="flex flex-row justify-center items-center mt-8 gap-5">
                        <button className="rounded-md text-dark-blue transition-all duration-500 ease-in-out hover:bg-bleach-blue" style={{border: "1px solid #0653EA", width: "120px", height: "40px"}}>Cancel</button>
                        <button className="bg-dark-blue rounded-md text-white transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "120px", height: "40px"}}>Save</button>
                    </div>
                    <div className="flex flex-row mt-10 text-sm justify-between items-center">
                        <p>&copy; Skytrades 2023</p>
                        <div className="flex flex-row items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                                <path d="M12.6 0H1.4C0.63 0 0 0.61875 0 1.375V9.625C0 10.3813 0.63 11 1.4 11H12.6C13.37 11 14 10.3813 14 9.625V1.375C14 0.61875 13.37 0 12.6 0ZM12.32 2.92188L7.742 5.73375C7.287 6.01562 6.713 6.01562 6.258 5.73375L1.68 2.92188C1.505 2.81188 1.4 2.62625 1.4 2.42688C1.4 1.96625 1.911 1.69125 2.31 1.93187L7 4.8125L11.69 1.93187C12.089 1.69125 12.6 1.96625 12.6 2.42688C12.6 2.62625 12.495 2.81188 12.32 2.92188Z" fill="black" fillOpacity="0.5"/>
                            </svg>
                            <p>help@skytrades.com</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
}

export default Settings;
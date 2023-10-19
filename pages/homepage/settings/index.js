import Image from "next/image";
import { Fragment, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";

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

    const updateDataHandler = (e) => {
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

        fetch(`/api/proxy?${Date.now()}`, {
            method: "POST",
            body: JSON.stringify({
                userId: user.id,
                name,
                email,
                phoneNumber
            }),
            headers: {
                "Content-Type": "application/json",
                uri: "/users/update",
                proxy_to_method: "PATCH",
            }
        })
        .then((res) => {
            if(!res.ok) {
                return res.json()
                .then(errorData => {
                    console.log(errorData)
                    swal({
                        title: "oops!",
                        text: `${errorData.errorMessage}`,
                      });
                    throw new Error(errorData.errorMessage);
                });
            }
            return res.json();
        }).then(() => {
            localStorage.removeItem("email");
            localStorage.setItem("email", email);
            swal({
                title: "Submitted",
                text: "User's record successfully updated.",
                icon: "success",
                button: "Ok"
              })
            .then(() => {
                router.push("/homepage/dashboard");
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    if(!user || !token) {
        return <Spinner />
    } 

    return <Fragment>
        {addCard && createPortal(<Backdrop onClick={closeAddCardHandler} />, document.getElementById("backdrop-root"))}
        {addCard && createPortal(<AddCardModal onClose={closeAddCardHandler} />, document.getElementById("modal-root"))}
        <div className="flex flex-row mx-auto">
            <Sidebar />
            <div style={{width: "calc(100vw - 257px)", height: "100vh"}} className="overflow-y-auto overflow-x-hidden">
                <Navbar name={user.name}  status={user.KYCStatusId === 0 ? "Notattempted" : 
                                                user.KYCStatusId === 1 ? "pending" 
                                                : user.KYCStatusId === 3 ? "Rejected" : "Approved"} />
                <form className="bg-white pt-16 pb-2 px-10 mx-auto" style={{width: "calc(100vw-257px)", minHeight: "600px", height: "calc(100vh - 91px)", borderTop: "2px solid #F0F0FA"}}>
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
                        <button onClick={updateDataHandler} className="bg-dark-blue rounded-md text-white transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "120px", height: "40px"}}>Save</button>
                    </div>
                    <div className="flex flex-row mt-10 text-sm justify-between items-center">
                        <p>&copy; Skytrades 2023</p>
                        <div className="flex flex-row items-center gap-1">
                            <a className="flex flex-row items-center gap-1" href="mailto:help@skytrades.io">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                                    <path d="M12.6 0H1.4C0.63 0 0 0.61875 0 1.375V9.625C0 10.3813 0.63 11 1.4 11H12.6C13.37 11 14 10.3813 14 9.625V1.375C14 0.61875 13.37 0 12.6 0ZM12.32 2.92188L7.742 5.73375C7.287 6.01562 6.713 6.01562 6.258 5.73375L1.68 2.92188C1.505 2.81188 1.4 2.62625 1.4 2.42688C1.4 1.96625 1.911 1.69125 2.31 1.93187L7 4.8125L11.69 1.93187C12.089 1.69125 12.6 1.96625 12.6 2.42688C12.6 2.62625 12.495 2.81188 12.32 2.92188Z" fill="black" fillOpacity="0.5"/>
                                </svg>
                                <span>
                                    help@skytrades.io
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
    // const response = await fetch("http://localhost:3000/api/proxy", {
    const response = await fetch(`https://main.d3a3mji6a9sbq0.amplifyapp.com/api/proxy?${Date.now()}`, {
        headers: {
            "Content-Type": "application/json",
            uri: "/users",
            proxy_to_method: "GET",
        }
    })

    if(!response.ok) {
        return {
            props: { 
                error: "oops! something went wrong. Kindly try again."
            }
        }
    }
    
    const data = await response.json();
   
    console.log(data)

    return {
        props: {
            users: JSON.parse(JSON.stringify(data))
        }
    }
}

import Image from "next/image";
import { createPortal } from "react-dom";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";
import Backdrop from "@/Components/Backdrop";
import PilotProfileModal from "@/Components/Modals/PilotProfileModal";
import AddPilotModal from "@/Components/Modals/AddPilotModal";
import Spinner from "@/Components/Spinner";
import User from "@/models/User";

const UAVs = (props) => {
    const { users } = props;
    const router = useRouter();

    const [pilotProfile, setPilotProfile] = useState(false);
    const [addPilot, setAddPilot] = useState(false);

    const [user, setUser] = useState();
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchedEmail = localStorage.getItem("email");
        const fetchedToken = JSON.parse(localStorage.getItem("openlogin_store"));

        if(!fetchedEmail || fetchedToken.sessionId.length !== 64){
            router.push("/auth/join");
            return;
        };

        setToken(fetchedToken.sessionId);

        const singleUser = users.filter(user => user.email === fetchedEmail);
        setUser(singleUser[0]);
    }, []);

    const backdropCloseHandler = () => {
        setPilotProfile(false);
        setAddPilot(false);
    }

    const showPilotModalHandler = () => {
        setPilotProfile(true);
    }

    const addPilotHandler = () => {
        setAddPilot(true);
    }

    const closeModalHandler = () => {
        setPilotProfile(false);
        setAddPilot(false);
    }

    if(!user || !token) {
        return <Spinner />
    } 

    return <Fragment>
        {(pilotProfile || addPilot) && createPortal(<Backdrop onClick={backdropCloseHandler} />, document.getElementById("backdrop-root"))}
        {pilotProfile && createPortal(<PilotProfileModal onClose={closeModalHandler} />, document.getElementById("modal-root"))}
        {addPilot && createPortal(<AddPilotModal onClose={closeModalHandler} />, document.getElementById("modal-root"))}
        <div className="flex flex-row mx-auto">
            <Sidebar />
            <div style={{width: "calc(100vw - 257px)", height: "100vh"}} className="overflow-y-auto">
                <Navbar />
                <div className="bg-white py-11 px-10 overflow-y-auto" style={{height: "100vh", borderTop: "2px solid #F0F0FA"}}>
                    <div className="mx-auto flex flex-col items-center">
                        <h3 className="font-semibold text-dark-brown text-lg">Our Pilots</h3> 
                        <p className="text-dark-brown text-sml">Our Pilots  are certified professionals with over 100 hours of flight time</p>
                        <button onClick={addPilotHandler} className="bg-dark-blue rounded-md text-sml font-normal text-white my-5 transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "104px", height: "40px"}}>Add Pilot</button>
                    </div>
                    <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-y-5">
                        <div className="rounded pt-5 flex flex-col items-center text-center bg-bleach-blue-100" style={{width: "260px", height: "324px",}}>
                            <Image src="/images/Ellipse.png" alt="a picture of a pilot" width={123} height={123} />
                            <p className="font-medium text-dark-brown mt-3">Eleanor Pena</p>
                            <p className="text-dark-brown text-sml">156hrs Flight time</p>
                            <p className="text-dark-brown font-medium text-sml mt-2">3891 Ranchview Dr. Richardson, California 62639</p>
                            <button onClick={showPilotModalHandler} className="bg-dark-blue rounded-md text-sml font-normal text-white mt-2.5 transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "120px", height: "40px"}}>Select</button>
                        </div> 
                        <div className="rounded pt-5 flex flex-col items-center text-center bg-bleach-blue-100" style={{width: "260px", height: "324px"}}>
                            <Image src="/images/Ellipse.png" alt="a picture of a pilot" width={123} height={123} />
                            <p className="font-medium text-dark-brown mt-3">Eleanor Pena</p>
                            <p className="text-dark-brown text-sml">156hrs Flight time</p>
                            <p className="text-dark-brown font-medium text-sml mt-2">3891 Ranchview Dr. Richardson, California 62639</p>
                            <button onClick={showPilotModalHandler} className="bg-dark-blue rounded-md text-sml font-normal text-white mt-2.5 transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "120px", height: "40px"}}>Select</button>
                        </div> 
                        <div className="rounded pt-5 flex flex-col items-center text-center bg-bleach-blue-100" style={{width: "260px", height: "324px"}}>
                            <Image src="/images/Ellipse.png" alt="a picture of a pilot" width={123} height={123} />
                            <p className="font-medium text-dark-brown mt-3">Eleanor Pena</p>
                            <p className="text-dark-brown text-sml">156hrs Flight time</p>
                            <p className="text-dark-brown font-medium text-sml mt-2">3891 Ranchview Dr. Richardson, California 62639</p>
                            <button onClick={showPilotModalHandler} className="bg-dark-blue rounded-md text-sml font-normal text-white mt-2.5 transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "120px", height: "40px"}}>Select</button>
                        </div> 
                        <div className="rounded pt-5 flex flex-col items-center text-center bg-bleach-blue-100" style={{width: "260px", height: "324px"}}>
                            <Image src="/images/Ellipse.png" alt="a picture of a pilot" width={123} height={123} />
                            <p className="font-medium text-dark-brown mt-3">Eleanor Pena</p>
                            <p className="text-dark-brown text-sml">156hrs Flight time</p>
                            <p className="text-dark-brown font-medium text-sml mt-2">3891 Ranchview Dr. Richardson, California 62639</p>
                            <button onClick={showPilotModalHandler} className="bg-dark-blue rounded-md text-sml font-normal text-white mt-2.5 transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "120px", height: "40px"}}>Select</button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
}

export default UAVs;

export async function getServerSideProps() {
    const users = await User.findAll();

    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        }
    }
}
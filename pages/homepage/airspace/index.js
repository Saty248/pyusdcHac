import { Fragment, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import Backdrop from "@/Components/Backdrop";
import AirspaceReviews from "@/Components/AllAirspaces/AirspaceReviews";
import AboutAirspace from "@/Components/AllAirspaces/AboutAirspace";
import AllAirspaceOverview from "@/Components/AllAirspaces/AirspaceOverview";
import MyAirspaceOverview from "@/Components/MyAirspaces/MyAirspaceOverview";
import AboutMyAirspace from "@/Components/MyAirspaces/AboutAirspace";
import MyAirspaceReviews from "@/Components/MyAirspaces/MyAirspaceReviews";
import Airspaces from "@/Components/Airspaces";
import AddReviewModal from "@/Components/Modals/AddReviewModal";
import NewAirspaceModal from "@/Components/Modals/NewAirspaceModal";
import AddAirspace from "@/Components/Modals/AddAirspace";
import AdditionalAispaceInformation from "@/Components/Modals/AdditionalAirspaceInformation";
import { counterActions } from "@/store/store";
import User from "@/models/User"; 
import Spinner from "@/Components/Spinner";


const Airspace = (props) => {
    const { users } = props;

    const router = useRouter();
    const dispatch = useDispatch();

    const [allAirspace, setAllAirSpace] = useState(false);
    const [myAirspace, setMyAirSpace] = useState(true);
    const [viewAirspace, setViewAirSpace] = useState(false);
    const [viewMyAirspace, setViewMyAirSpace] = useState(false);
    const [airSpaceReviews, setAirSpaceReviews] = useState(false);
    const [myAirspaceReviews, setMyAirSpaceReviews] = useState(false);
    const [aboutAirspace, setAboutAirspace] = useState(false);
    const [aboutMyAirspace, setAboutMyAirspace] = useState(false);
    const [showAddReviewModal, setshowAddReviewModal] = useState(false);
    const [showAddAirspaceModal, setShowAddAirspaceModal] = useState(false);
    const [airspace, setAirspace] = useState("mine");
    const [airspaceInfo, setAirspaceInfo ] = useState({});

    const [user, setUser] = useState();

    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchedEmail = localStorage.getItem("email");
        const fetchedToken = JSON.parse(localStorage.getItem("openlogin_store"));

        if(fetchedToken) {
            const tokenLength = Object.keys(fetchedToken).length;
            console.log(tokenLength);
            if(tokenLength.length < 1) {
                localStorage.removeItem("openlogin_store");
            };
        };

        if(!fetchedEmail || !fetchedToken) {
            router.push("/auth/join");
            return;
        };

        setToken(fetchedToken.sessionId);

        const singleUser = users.filter(user => user.email === fetchedEmail);
        setUser(singleUser[0]);
    }, []);
    


    const newAirspace = useSelector(state => {
        return state.value.newAirspace;
    });

    const confirmOnMap = useSelector(state => {
        return state.value.confirmOnMap;
    });

    const additionalInfo = useSelector(state => state.value.airspaceAdditionalInfo);



    console.log("The value", newAirspace);
    console.log("confirm on map is", confirmOnMap);

    const showAddReviewModalHandler = () => {
        setshowAddReviewModal (true);
    }

    const closeAddReviewModalHandler = (e) => {
        e.preventDefault();
        setshowAddReviewModal(false);
    }

    const showAddAirspaceModalHandler = (e) => {
        setShowAddAirspaceModal(true);
    } 

    const closeMapHandler = () => {
        setShowAddAirspaceModal(false)
    }

    const backdropCloseHandler = () => {
        setShowAddAirspaceModal(false);
        setshowAddReviewModal(false);


        dispatch(counterActions.closeNewAirspaceModal());
        dispatch(counterActions.closeConfirmOnMapModal());
        dispatch(counterActions.closeAdditionalInfoModal());
    }





    const showAllAirspace = () => {
        setAllAirSpace(true);
        setMyAirSpace(false);
        setAirspace("all")
    }

    const showMyAirspace = () => {
        setMyAirSpace(true)
        setAllAirSpace(false)
        setAirspace("mine");
    }

    const showAirspaceHandler = () => {
        setViewMyAirSpace(false);
        setMyAirSpaceReviews(false);
        setAboutMyAirspace(false);

        setViewAirSpace(true);
        setAboutAirspace(false);

        // if(!airSpaceReviews && !aboutAirspace) {
        //     setViewAirSpace(true);
        // }
    }

    const showMyAirspaceHandler = () => {
        setViewAirSpace(false);

        setAirSpaceReviews(false);
        setAboutAirspace(false);
        // setViewMyAirSpace(true);

        setViewMyAirSpace(true);
        setMyAirSpaceReviews(false);
        setAboutMyAirspace(false);
    }

    const airspaceOverviewHandler = () => {
        setViewAirSpace(true);
        setAirSpaceReviews(false);
        setAboutAirspace(false);
    }

    const myAirspaceOverviewHandler = () => {
        setViewMyAirSpace(true);
        setMyAirSpaceReviews(false);
        setAboutMyAirspace(false);
    }

    const airspaceReviewHandler = () => {
        setViewAirSpace(false);
        setAirSpaceReviews(true);
        setAboutAirspace(false)
    }

    const myAirspaceReviewHandler = () => {
        setViewMyAirSpace(false);
        setMyAirSpaceReviews(true);
        setAboutMyAirspace(false);
    }

    const aboutAirspaceHandler = () => {
        setViewAirSpace(false);
        setAirSpaceReviews(false);
        setAboutAirspace(true);
    }

    const aboutMyAirspaceHandler = () => {
        setViewMyAirSpace(false);
        setMyAirSpaceReviews(false);
        setAboutMyAirspace(true);
    } 

    const closeAirspaceDetailsHandler = () => {
        setViewAirSpace(false);
        setAirSpaceReviews(false);
        setAboutAirspace(false);
        setViewMyAirSpace(false);
        setMyAirSpaceReviews(false);
        setAboutMyAirspace(false);
    }

    const airspaceCategory = (category) => {
        setAirspaceInfo(prev => {
            return {
                ...prev,
                category: category
            }
        })
        setShowAddAirspaceModal(false)
    }

    const addressValueHandler = (value) => {
        setAirspaceInfo(prev => {
            return {
                ...prev,
                ...value
            }
        })

        setAdditionalInfo(true);
        console.log(airspaceInfo);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(airspaceInfo)
    }


    const airSpaces = [
        {
            id: "a1",
            title: "Airspace Title", 
            status: "Active"
        },
        {
            id: "a2",
            title: "Airspace Title", 
            status: "Inactive"
        },
        {
            id: "a3",
            title: "Airspace Title", 
            status: "Active"
        },
        {
            id: "a4",
            title: "Airspace Title", 
            status: "Inactive"
        },
    ]


    if(!user || !token) {
        return <Spinner />
    }

    return <Fragment>
        {showAddReviewModal &&
            createPortal(<AddReviewModal onClose={closeAddReviewModalHandler} />, document.getElementById("modal-root"))
            }
        {newAirspace && 
            createPortal(<NewAirspaceModal onClose={closeMapHandler} onAddCategory={airspaceCategory} />, document.getElementById("modal-root"))
            }
        {additionalInfo && 
            <AdditionalAispaceInformation onConfirm={formSubmitHandler} />
            }
        {confirmOnMap && 
            createPortal(<AddAirspace onConfirm={addressValueHandler} onClose={backdropCloseHandler} />, document.getElementById("modal-root"))
            }

        {(showAddReviewModal || showAddAirspaceModal || newAirspace || additionalInfo || confirmOnMap) && createPortal(<Backdrop onClick={backdropCloseHandler} />, document.getElementById("backdrop-root"))}
        <div className="flex flex-row mx-auto">
            <Sidebar />
            <div style={{width: "calc(100vw - 257px)", height: "100vh", overflowY: "scroll"}}>
                <Navbar name={user.name} />
                <div className="bg-map-bg relative bg-cover bg-center mt-0 pt-5" style={{width: "calc(100vw - 257px)", height: "100vh"}}>
                    <Airspaces 
                            showMyAirspace={showMyAirspace} 
                            airspace={airspace} 
                            allAirspace={allAirspace}
                            showAllAirspace={showAllAirspace}
                            airSpaces={airSpaces}
                            myAirspace={myAirspace}
                            onAddAirspace={showAddAirspaceModalHandler}
                            viewMyAirspace={showMyAirspaceHandler}
                            viewAirspace={showAirspaceHandler}
                            />
                
                    {viewMyAirspace && <MyAirspaceOverview 
                                                viewMyAirspace={myAirspaceOverviewHandler}
                                                 myAirspaceReview={myAirspaceReviewHandler} 
                                                 aboutMyAirspace={aboutMyAirspaceHandler} 
                                                 closeDetails={closeAirspaceDetailsHandler}
                                                 />}
                    {aboutMyAirspace && <AboutMyAirspace 
                                                viewMyAirspace={myAirspaceOverviewHandler}
                                                myAirspaceReview={myAirspaceReviewHandler} 
                                                aboutMyAirspace={aboutMyAirspaceHandler} 
                                                closeDetails={closeAirspaceDetailsHandler}
                                            />}
                                            
                    {/* {myAirspaceReviews && <MyAirspaceReviews 
                                                viewMyAirspace={myAirspaceOverviewHandler}
                                                myAirspaceReview={myAirspaceReviewHandler} 
                                                aboutMyAirspace={aboutMyAirspaceHandler} 
                                                closeDetails={closeAirspaceDetailsHandler}
                                            />} */}

                    {/* {airSpaceReviews && <AirspaceReviews 
                                                onClick={showAddReviewModalHandler} 
                                                viewAirspace={airspaceOverviewHandler} 
                                                viewAirspaceReview={airspaceReviewHandler} 
                                                aboutAirspace={aboutAirspaceHandler}
                                                closeDetails={closeAirspaceDetailsHandler} 
                                                />} */}

                    {viewAirspace && <AllAirspaceOverview 
                                                viewAirspace={airspaceOverviewHandler} 
                                                viewAirspaceReview={airspaceReviewHandler} 
                                                aboutAirspace={aboutAirspaceHandler} 
                                                closeDetails={closeAirspaceDetailsHandler} 
                                                />}
                    {aboutAirspace && <AboutAirspace 
                                                viewAirspace={airspaceOverviewHandler} 
                                                viewAirspaceReview={airspaceReviewHandler} 
                                                aboutAirspace={aboutAirspaceHandler}
                                                closeDetails={closeAirspaceDetailsHandler} 
                                                />}
                </div>
            </div>
        </div>
    </Fragment>
}

export default Airspace;


export async function getStaticProps () {
    const users = await User.findAll();

    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        },
        revalidate : 60 * 30
    }
}

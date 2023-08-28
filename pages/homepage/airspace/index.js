import { Fragment, useState } from "react";
import { createPortal } from "react-dom";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Backdrop from "@/components/Backdrop";
import AirspaceReviews from "@/components/AllAirspaces/AirspaceReviews";
import AboutAirspace from "@/components/AllAirspaces/AboutAirspace";
import AllAirspaceOverview from "@/components/AllAirspaces/AirspaceOverview";
import MyAirspaceOverview from "@/components/MyAirspaces/MyAirspaceOverview";
import AboutMyAirspace from "@/components/MyAirspaces/AboutAirspace";
import MyAirspaceReviews from "@/components/MyAirspaces/MyAirspaceReviews";
import Airspaces from "@/components/Airspaces";
import AddReviewModal from "@/components/Modals/AddReviewModal";
import AddAirspaceModal from "@/components/Modals/AddAirspaceModal";



const Airspace = () => {
    const [allAirspace, setAllAirSpace] = useState(true);
    const [myAirspace, setMyAirSpace] = useState(false);
    const [viewAirspace, setViewAirSpace] = useState(false);
    const [viewMyAirspace, setViewMyAirSpace] = useState(false);
    const [airSpaceReviews, setAirSpaceReviews] = useState(false);
    const [myAirspaceReviews, setMyAirSpaceReviews] = useState(false);
    const [aboutAirspace, setAboutAirspace] = useState(false);
    const [aboutMyAirspace, setAboutMyAirspace] = useState(false);
    const [showAddReviewModal, setshowAddReviewModal] = useState(false);
    const [showAddAirspaceModal, setShowAddAirspaceModal] = useState(false);
    const [airspace, setAirspace] = useState("all");

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
        // alert("clicked")
    }

    // const closeAddAirspaceModalHandler = () => {
    //     setShowAddAirspaceModal(false);
    // } 

    const backdropCloseHandler = () => {
        setShowAddAirspaceModal(false);
        setshowAddReviewModal(false);
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
        // if(viewMyAirspace) {
        //     setViewMyAirSpace(false);
        //     setViewAirSpace(true);
            
        // }
        setViewMyAirSpace(false);
        setMyAirSpaceReviews(false);
        setAboutMyAirspace(false);

        if(!airSpaceReviews && !aboutAirspace) {
            setViewAirSpace(true);
        }
        
    }

    const showMyAirspaceHandler = () => {
        setViewAirSpace(false);
        setAirSpaceReviews(false);
        setAboutAirspace(false);
        setViewMyAirSpace(true);
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



    return <Fragment>
        {showAddReviewModal &&
            createPortal(<AddReviewModal onClose={closeAddReviewModalHandler} />, document.getElementById("modal-root"))
        }

        {showAddAirspaceModal && <AddAirspaceModal closeMap={closeMapHandler} />}
        {(showAddReviewModal || showAddAirspaceModal) && createPortal(<Backdrop onClick={backdropCloseHandler} />, document.getElementById("backdrop-root"))}
        <div className="flex flex-row mx-auto" style={{maxWidth: "1440px"}}>
            <Sidebar />
            <div style={{width: "1183px", height: "100vh", overflowY: "scroll"}}>
                <Navbar />
                <div className="bg-map-bg relative bg-cover bg-center mt-0 pt-5" style={{width: "1182px", height: "933px"}}>
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
                    {myAirspaceReviews && <MyAirspaceReviews 
                                                viewMyAirspace={myAirspaceOverviewHandler}
                                                myAirspaceReview={myAirspaceReviewHandler} 
                                                aboutMyAirspace={aboutMyAirspaceHandler} 
                                                closeDetails={closeAirspaceDetailsHandler}
                                            />}

                    {airSpaceReviews && <AirspaceReviews 
                                                onClick={showAddReviewModalHandler} 
                                                viewAirspace={airspaceOverviewHandler} 
                                                viewAirspaceReview={airspaceReviewHandler} 
                                                aboutAirspace={aboutAirspaceHandler}
                                                closeDetails={closeAirspaceDetailsHandler} 
                                                />}
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

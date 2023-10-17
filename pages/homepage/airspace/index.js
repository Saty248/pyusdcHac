import { Fragment, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import maplibregl from 'maplibre-gl';

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
import Spinner from "@/Components/Spinner";
import AirspaceTab from "@/Components/AirspaceTab";
import MyAirspaceTab from "@/Components/MyAirspaceTab";


const Airspace = (props) => {
    const { users } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const locationiqKey = process.env.NEXT_PUBLIC_LOCATIONIQ_KEY;

    // const [users, setUsers] = useState([]);
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
    const [myFilteredAirspace, setMyFilteredAirspace] = useState();
    const [flyToAddress, setFlyToAddress] = useState("");

    const [user, setUser] = useState();

    const [token, setToken] = useState("");

    const airSpaces = [
        {
            id: "a1",
            title: "First Airspace", 
            status: "Active"
        },
        {
            id: "a2",
            title: "Second Airspace", 
            status: "Inactive"
        },
        {
            id: "a3",
            title: "Third Airspace", 
            status: "Active"
        },
        {
            id: "a4",
            title: "Fourth Airspace", 
            status: "Inactive"
        },
    ]

    const myAirspaces = [
        {
            id: "a1",
            title: "My First Airspace", 
            name: "John Doe",
            address: "50, Fremont Street, Transbay, San Francisco, California, 94105, USA",
            identification: "9099020930992",
            status: "inactive"
        },
        {
            id: "a2",
            title: "My Second Airspace", 
            name: "John Doe",
            address: "50, California Street, Financial District, San Francisco, California, 94111, USA",
            identification: "9099020930992",
            status: "Active"
        },
        {
            id: "a3",
            title: "My Third Airspace", 
            name: "John Doe",
            address: "50, Paramount Drive, Fruitville, Fruitville, Sarasota County, Florida, 34232, USA",
            identification: "9099020930992",
            status: "Active"
        },
    ]

    useEffect(() => {
        const fetchedEmail = localStorage.getItem("email");
        const fetchedToken = JSON.parse(localStorage.getItem("openlogin_store"));
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
    }, []);

    useEffect(() => {
        fetch("/api/proxy", {
            headers: {
                "Content-Type": "application/json",
                uri: "/users"
            }
        }).then(res => {
            if(!res.ok) {
                return res.json()
                .then(err => {
                    console.log(err)
                    return;
                })
            }
            return res.json()
        }).then(response => {
            console.log(response)
            setUsers(response)
            const fetchedEmail = localStorage.getItem("email");
            const fetchedToken = JSON.parse(localStorage.getItem("openlogin_store"));
            const singleUser = users.filter(user => user.email === fetchedEmail);

            console.log(fetchedToken.sessionId)
            console.log(fetchedToken.sessionId.length)

            if(!fetchedEmail || fetchedToken.sessionId.length !== 64){
            // if(singleUser.length < 1 || fetchedToken.sessionId.length !== 64){
                console.log("false")
                localStorage.setItem("openlogin_store", JSON.stringify({}));
                router.push("/auth/join");
                return;
            };

            setToken(fetchedToken.sessionId);

            
            console.log(singleUser);
            setUser(singleUser[0]);
        }).catch(err => {
            console.log(err)
        })
    }, [token]);
    
    useEffect(() => {
        if(token && user) {
            const map = new maplibregl.Map({
                container: 'map',
                attributionControl: false, 
                style: 'https://tiles.locationiq.com/v3/streets/vector.json?key='+locationiqKey,
                zoom: 12,
                center: [-122.42, 37.779]
            });

            var nav = new maplibregl.NavigationControl();
            map.addControl(nav, 'top-right');


            map.on('load', function () {
                map.addLayer({
                    'id': 'maine',
                    'type': 'fill',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Polygon',
                                'coordinates': []
                            }
                        }
                    },
                    'layout': {},
                    'paint': {
                        'fill-color': '#D20C0C',
                        }
                    });
                });  
        }
    }, [token, user])

    useEffect(() => {
        if(flyToAddress) {
            fetch(`https://us1.locationiq.com/v1/search?key=${locationiqKey}&q=${flyToAddress}&format=json&polygon_geojson=1`)
            .then(res => {
                if(!res.ok) {
                    return res.json()
                    .then(errorData => {
                        throw new Error(errorData.error);
                    });
                }
                return res.json()
            })
            .then(resData => {
                if(resData.error) {
                    console.log(resData.error);
                    return;
                }

                const endPoint = []
        
                endPoint.push(resData[0].lon)
                endPoint.push(resData[0].lat)

                const map = new maplibregl.Map({
                    container: 'map',
                    attributionControl: false, 
                    style: 'https://tiles.locationiq.com/v3/streets/vector.json?key='+locationiqKey,
                    zoom: 18,
                    center: endPoint
                });

        
                if(!resData[0].geojson || resData[0].geojson.type !== "Polygon") {  
                    let el = document.createElement('div');
                    el.id = 'markerWithExternalCss';
                    
                    new maplibregl.Marker(el)
                        .setLngLat(endPoint)
                        .addTo(map);

                    return;    
                }
                
                map.on('load', function () {
                    map.addLayer({
                        'id': 'maine',
                        'type': 'fill',
                        'source': {
                            'type': 'geojson',
                            'data': {
                                'type': 'Feature',
                                'geometry': resData[0].geojson
                            }
                        },
                        'layout': {},
                        'paint': {
                            'fill-color': '#D20C0C',
                            'fill-opacity': 0.5
                            }
                        });
                    });     
            })
            .catch((err) => {
                console.log(err)
            });
                
        }
    }, [flyToAddress]);

    const newAirspace = useSelector(state => {
        return state.value.newAirspace;
    });

    const confirmOnMap = useSelector(state => {
        return state.value.confirmOnMap;
    });

    const additionalInfo = useSelector(state => state.value.airspaceAdditionalInfo);

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
    }

    const showMyAirspaceHandler = (id) => {
        const filteredAirspace = myAirspaces.filter(airspace => airspace.id === id)
        setMyFilteredAirspace(filteredAirspace[0])
        setFlyToAddress(filteredAirspace[0].address);

        setViewAirSpace(false);
        setAirSpaceReviews(false);
        setAboutAirspace(false);
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
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(airspaceInfo)
    }


  


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
            <Sidebar users={users}/>
            <div className="overflow-y-auto overflow-x-hidden" style={{width: "calc(100vw - 257px)", height: "100vh"}}>
                <Navbar name={user.name} />
                <div className="relative mt-0" id="map" style={{width: "calc(100vw - 257px)", height: "100vh", marginTop: "0"}}>
                    <Airspaces 
                            showMyAirspace={showMyAirspace} 
                            airspace={airspace} 
                            allAirspace={allAirspace}
                            showAllAirspace={showAllAirspace}
                            airSpaces={airSpaces}
                            myAirspace={myAirspace}
                            onAddAirspace={showAddAirspaceModalHandler}
                            users={users}
                            >
                        {allAirspace && airSpaces.map(airspace => {
                            return <AirspaceTab 
                                            key={airspace.id}
                                            id={airspace.id} 
                                            viewAirspace={showAirspaceHandler} 
                                            title={airspace.title} 
                                            status={airspace.status}
                                        />
                        })}  

                        {myAirspace && myAirspaces.map(airspace => {
                            return  <MyAirspaceTab 
                                    key={airspace.id}
                                    title={airspace.title}
                                    name={airspace.name}
                                    address={airspace.address}
                                    identification={airspace.identification}
                                    status={airspace.status}
                                    viewMyAirspace={showMyAirspaceHandler.bind(null, airspace.id)}
                                     />
                        })}
                    </Airspaces>
                
                    {viewMyAirspace && <MyAirspaceOverview 
                                                viewMyAirspace={showMyAirspaceHandler}
                                                 myAirspaceReview={myAirspaceReviewHandler} 
                                                 aboutMyAirspace={aboutMyAirspaceHandler} 
                                                 closeDetails={closeAirspaceDetailsHandler}
                                                 address={myFilteredAirspace.address}
                                                 title={myFilteredAirspace.title}
                                                 name={myFilteredAirspace.name}
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

export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/proxy", {
        headers: {
            "Content-Type": "application/json",
            uri: "/users"
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

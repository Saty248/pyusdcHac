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
    const [myAirspaces, setMyAirspaces] = useState();
    const [status, setStatus] = useState();
    const [amount, setAmount] = useState();

    const [user, setUser] = useState();

    const [token, setToken] = useState("");


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
        fetch(`/api/proxy?${Date.now()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                uri: "/users",
                proxy_to_method: "GET",
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

            setUser(singleUser[0]);
            setStatus(singleUser[0].KYCStatusId)
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

    useEffect(() => {
        if(user) {
            console.log("This is the user Id", user.id);
            // fetch("https://main.d3a3mji6a9sbq0.amplifyapp.com/api/proxy", {
            fetch(`/api/proxy?${Date.now()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    uri: `/properties/user-properties/${user.id}`,
                    proxy_to_method: "GET",
    
                }
            }).then((res) => {
                console.log(res);
                if(!res.ok) {
                    return res.json()
                    .then((err) => {
                        throw new Error(err.message)
                    })
                }
                return res.json()
                .then((data) =>{
                    console.log(data)
                    setMyAirspaces(data)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [user])

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
        setAmount(filteredAirspace[0].transitFee);
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
        {/* {newAirspace && 
            createPortal(<NewAirspaceModal onClose={closeMapHandler} onAddCategory={airspaceCategory} />, document.getElementById("modal-root"))
            } */}
        {additionalInfo && 
            <AdditionalAispaceInformation user={user} onConfirm={formSubmitHandler} />
            }
        {confirmOnMap && 
            createPortal(<AddAirspace onConfirm={addressValueHandler} onClose={backdropCloseHandler} />, document.getElementById("modal-root"))
            }

        {(showAddReviewModal || showAddAirspaceModal || newAirspace || additionalInfo || confirmOnMap) && createPortal(<Backdrop onClick={backdropCloseHandler} />, document.getElementById("backdrop-root"))}
        <div className="flex flex-row mx-auto">
            <Sidebar users={users}/>
            <div className="overflow-y-auto overflow-x-hidden" style={{width: "calc(100vw - 257px)", height: "100vh"}}>
                <Navbar name={user.name} status={user.KYCStatusId === 0 ? "Notattempted" : 
                                                user.KYCStatusId === 1 ? "pending" 
                                                : user.KYCStatusId === 3 ? "Rejected" : "Approved"}>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-11 right-2 cursor-pointer" width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7118 11.7481C8.12238 13.822 4.33202 13.6588 1.93164 11.2584C-0.643879 8.6829 -0.643879 4.50716 1.93164 1.93164C4.50716 -0.64388 8.68289 -0.643879 11.2584 1.93164C13.6588 4.33202 13.822 8.12238 11.7481 10.7118L16.7854 15.7491C17.0715 16.0352 17.0715 16.4992 16.7854 16.7854C16.4992 17.0715 16.0352 17.0715 15.7491 16.7854L10.7118 11.7481ZM2.96795 10.2221C0.964766 8.21893 0.964766 4.97113 2.96795 2.96795C4.97113 0.964767 8.21892 0.964767 10.2221 2.96795C12.2238 4.96966 12.2253 8.21416 10.2265 10.2177C10.225 10.2192 10.2236 10.2206 10.2221 10.2221C10.2206 10.2236 10.2192 10.225 10.2177 10.2265C8.21416 12.2253 4.96966 12.2238 2.96795 10.2221Z" fill="#252530" fillOpacity="0.55"/>
                        </svg>
                        <input type="text" className="rounded-md my-7 ps-3 ms-5 focus:outline-blue-200" style={{width: "433px", height: "47px", border: "1px solid rgba(37, 37, 48, 0.55)"}} />
                    </div>
                </Navbar>
                <div className="relative mt-0" id="map" style={{width: "calc(100vw - 257px)", height: "100vh", marginTop: "0"}}>
                    <Airspaces 
                            showMyAirspace={showMyAirspace} 
                            airspace={airspace} 
                            allAirspace={allAirspace}
                            showAllAirspace={showAllAirspace}
                            myAirspace={myAirspace}
                            onAddAirspace={showAddAirspaceModalHandler}
                            users={users}
                            >
                        {/* {allAirspace && airSpaces.map(airspace => {
                            return <AirspaceTab 
                                            key={airspace.id}
                                            id={airspace.id} 
                                            viewAirspace={showAirspaceHandler} 
                                            title={airspace.title} 
                                            status={airspace.status}
                                        />
                        })}   */}

                        {!myAirspaces && <p className="mt-10">Loading...</p>}

                        {myAirspaces && myAirspaces.length < 0  &&
                            <p>you currently do not have any airspace</p>
                        } 
                        {(myAirspaces && myAirspaces.length > 0) && myAirspaces.map(airspace => {
                            return  <MyAirspaceTab 
                                    key={airspace.id}
                                    title={airspace.title}
                                    name={user.name}
                                    address={airspace.address}
                                    identification={airspace.identification}
                                    status={airspace.noFlyZone}
                                    viewMyAirspace={showMyAirspaceHandler.bind(null, airspace.id)}
                                    amount={airspace.transitFee}
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
                                                 name={user.name}
                                                 email={user.email}
                                                 amount={myFilteredAirspace.transitFee}
                                                 />}
{/* 
                    {aboutMyAirspace && <AboutMyAirspace 
                                                viewMyAirspace={myAirspaceOverviewHandler}
                                                myAirspaceReview={myAirspaceReviewHandler} 
                                                aboutMyAirspace={aboutMyAirspaceHandler} 
                                                closeDetails={closeAirspaceDetailsHandler}
                                            />} */}
                                            
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
    // const response = await fetch("http://localhost:3000/api/proxy", {
    const response = await fetch("https://main.d3a3mji6a9sbq0.amplifyapp.com/api/proxy", {
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

    return {
        props: {
            users: JSON.parse(JSON.stringify(data))
        }
    };
}

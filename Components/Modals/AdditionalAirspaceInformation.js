import { counterActions } from "@/store/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdditionalAispaceInformation = (props) => {
    const [costChecked, setCostChecked] = useState(true);
    const [deckChecked, setDeckChecked] = useState(false);
    const [stationChecked, setStationChecked] = useState(false);
    const [storageChecked, setStorageChecked] = useState(false);
    const [rentChecked, setRentChecked] = useState(true);
    const [sellChecked, setSellChecked] = useState(false);

    const [negotiable, setNegotiable] = useState(false);
    const [deck, setDeck] = useState("");
    const [station, setStation] = useState("");
    const [storage, setStorage] = useState("");
    const [rentAirspace, setRentAirspace] = useState("");
    const [sellAirspace, setSellAirspace] = useState("");

    const airspaceTitleRef = useRef();
    const costRef = useRef();
    const airspaceStatusRef = useRef();
    const restrictionRef = useRef();
    const mondayRef = useRef();
    const tuesdayRef = useRef();
    const wednesdayRef = useRef();
    const thursdayRef = useRef();
    const fridayRef = useRef();
    const saturdayRef = useRef();
    const sundayRef = useRef();
    

    const dispatch = useDispatch();
    
    const airspaceData = useSelector(state => state.value.airspaceData);

    const closeModalHandler = (e) => {
        e.preventDefault();
        dispatch(counterActions.closeAdditionalInfoModal());
    }

    const costCheckedHandler = (e) => {
        setCostChecked(!costChecked);

        if(!costChecked) {
            setNegotiable(true);
        } else {
            setNegotiable(false);
        }
    }

    const deckCheckedHandler = (e) => {
        setDeckChecked(!deckChecked);

        if(!deckChecked) {
            setDeck("Landing Deck");
        } else {
            setDeck("");
        }
    }

    const stationHandler = (e) => {
        setStationChecked(!stationChecked);

        if(!stationChecked) {
            setStation("Charging station");
        } else {
            setStation("");
        }
    }

    const storageHandler = (e) => {
        setStorageChecked(!storageChecked);

        if(!storageChecked) {
            setStorage("Storage Hub");
        } else {
            setStorage("");
        }
    }

    const rentHandler = () => {
        setRentChecked(!rentChecked);

        if(!rentChecked) {
            setRentAirspace("Rent AirSpace");
        } else {
            setRentAirspace("")
        }
    }

    const sellHandler = () => {
        setSellChecked(!sellChecked);

        if(!sellChecked) {
            setSellAirspace("Sell AirSpace");
        } else {
            setSellAirspace("");
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(deck, negotiable, station, storage, sellAirspace, rentAirspace);
        const airspaceTitle = airspaceTitleRef.current.value;
        const costValue = costRef.current.value;
        const airspaceStatus = airspaceStatusRef.current.value;
        const monday = mondayRef.current.value;
        const tuesday = tuesdayRef.current.value;
        const wednesday = wednesdayRef.current.value;
        const thursday = thursdayRef.current.value;
        const friday = fridayRef.current.value;
        const saturday = saturdayRef.current.value;
        const sunday = sundayRef.current.value;
        const restriction = restrictionRef.current.value;

        const airspaceInformation = {
            ...airspaceData,
            title: airspaceTitle,
            cost: costValue,
            status: airspaceStatus,
            negotiable: negotiable,
            facilities: {
                landingDeck: deck,
                chargingStation: station,
                storageHub: storage
            },
            available: {
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday, 
                sunday
            },
            restriction: restriction
        }

        console.log(airspaceInformation);
    }

    return <div className="bg-white rounded fixed z-20 py-10 overflow-y-auto" style={{width: "740px", height: "90vh", maxHeight: "908px", 
        top: "7vh", // This is for live environment
        left: "calc(50% - 370px)", 
        }}>
        <button onClick={closeModalHandler} className="absolute top-3 right-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path d="M12.7279 12.7285L21.2132 21.2138" stroke="#252530" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.7279 21.2138L21.2132 12.7285" stroke="#252530" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <h3 className="text-center font-semibold pt-6">AirSpace Details</h3>
        <form className="px-10">
            <div className="px-14 pb-5 flex flex-row items-center justify-between gap-8">
                <div style={{width: "114px"}} className="mt-9">
                    <p className="font-medium">AirSpace Title</p>
                    <p className="text-xs">Give a unique name to the AirSpace for easy identification</p>
                </div>
                <input ref={airspaceTitleRef} type="text" placeholder="AirSpace Title" style={{width: "383px", height: "27px"}} className="bg-light-blue focus:outline-blue-200 ps-2 placeholder:text-sml placeholder:text-light-brown rounded-sm" name="AirSpace Title" />
            </div>
            <hr />
            <div className="px-14 pb-5 pt-2 flex flex-row items-center justify-between gap-8">
                <p htmlFor="AirSpace Title" className="font-medium me-10">Transit Fee</p>
                <div className="flex flex-row justify-center items-center">
                    <input type="number" ref={costRef} name="hour" min="1" placeholder="$ 3:00" style={{width: "143px", height: "27px"}} className="bg-light-blue ps-2 focus:outline-blue-200 placeholder:text-sml placeholder:text-light-brown rounded-sm" />
                    <label htmlFor="hour" className="text-dark-brown text-sml ms-2">per hour</label>
                </div>
                <div>
                    <div className="flex flex-row justify-center items-center gap-2">
                        <input type="checkbox" onChange={costCheckedHandler} checked={costChecked} value={negotiable} name="hour" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer placeholder:text-sml w-4 checked:bg-blue-500 rounded-sm" />
                        <label htmlFor="hour" onClick={costCheckedHandler} className="text-dark-brown text-sml cursor-pointer">Variable</label>
                    </div>
                    <div style={{width: "110px"}}>
                        <p className="text-xs ps-4">Select if your cost can be negotiated</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="px-14 pb-5 pt-3 flex flex-row items-center justify-start gap-3">
                <div style={{width: "147px"}} className="">
                    <p className="font-medium">Facilities</p>
                    <p className="text-xs">Select the extra features your facility provides</p>
                </div>
                <div className="ps-1">
                    <div className="flex flex-row justify-start items-center gap-2">
                        <input type="checkbox" onChange={deckCheckedHandler} checked={deckChecked} value={deck} name="hour" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500 rounded-sm" />
                        <label htmlFor="hour" onClick={deckCheckedHandler} className="text-dark-brown cursor-pointer text-sml">Landing Deck</label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <input type="checkbox" onChange={stationHandler} checked={stationChecked} value={station} name="hour" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500 rounded-sm" />
                        <label htmlFor="hour" onClick={stationHandler} className="text-dark-brown text-sml cursor-pointer">Charging station</label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <input type="checkbox" onChange={storageHandler} checked={storageChecked} value={storage} name="hour" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500 rounded-sm" />
                        <label htmlFor="hour" onClick={storageHandler} className="text-dark-brown text-sml cursor-pointer">Storage Hub</label>
                    </div>
                </div>
            </div>
            <hr />
            <div className="px-14 pb-2 pt-3 flex flex-row items-start justify-between gap-8">
                <div style={{width: "138px"}} className="">
                    <p className="font-medium">AirSpace Status</p>
                    <p className="text-xs">Give your AirSpace a Status</p>
                </div>
                <div className="flex flex-row justify-center -ms-14 items-center">
                    <select ref={airspaceStatusRef} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "143px", height: "27px"}}>
                        <option selected disabled>Select Status</option>
                        <option>Online</option>
                        <option>Offline</option>
                    </select>    
                </div>
                <div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Mon</p>
                        <select ref={mondayRef} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">7:00am - 7pm</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Tue</p>
                        <select ref={tuesdayRef} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">7:00am - 7pm</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Wed</p>
                        <select ref={wednesdayRef} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">7:00am - 7pm</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Thu</p>
                        <select ref={thursdayRef} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option>7:00am - 7pm</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Fri</p>
                        <select ref={fridayRef} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">7:00am - 7pm</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Sat</p>
                        <select ref={saturdayRef} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">Closed</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Sun</p>
                        <select ref={sundayRef} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">Closed</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                </div>
            </div>
            <hr />
            {/* <div className="px-14 pb-5 pt-2 flex flex-row items-center justify-start gap-8">
                <div style={{width: "138px"}} className="">
                    <p className="font-medium">Restrictions</p>
                    <p className="text-xs">Restriction on the AirSpace</p>
                </div>
                <div className="flex flex-row justify-center -ms-2 items-center gap-2">
                    <input type="number" ref={restrictionRef} name="hour" min="1" placeholder="20" style={{width: "62px", height: "27px"}} className="bg-light-blue ps-2 placeholder:text-sml focus:outline-blue-200 placeholder:text-light-brown rounded-sm" />
                    <label htmlFor="hour" className="text-dark-brown text-sml">metre landing radius</label>
                </div>
            </div> */}
            <hr />
            <div className="px-14 pb-5 pt-3 flex flex-row items-center justify-start gap-3">
                <div style={{width: "147px"}} className="">
                    <p className="font-medium">Offers</p>
                    <p className="text-xs">Select offers on AirSpace</p>
                </div>
                <div className="ps-1">
                    <div className="flex flex-row justify-start items-center gap-2">
                        <input type="checkbox" onChange={rentHandler} checked={rentChecked} value={rentAirspace} name="rent airspace" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500" />
                        <label htmlFor="hour" onClick={rentHandler} className="text-dark-brown text-sml cursor-pointer">Rent AirSpace</label>
                    </div>
                    {/* <div className="flex flex-row justify-start items-center gap-2">
                        <input type="checkbox" onChange={sellHandler} checked={sellChecked} value={sellAirspace} name="sell airspace" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500" />
                        <label htmlFor="hour" onClick={sellHandler} className="text-dark-brown text-sml cursor-pointer">Sell AirSpace</label>
                    </div> */}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center mt-8 gap-5">
                <button onClick={closeModalHandler} className="rounded-md text-dark-blue" style={{border: "1px solid #0653EA", width: "120px", height: "40px"}}>Cancel</button>
                <button onClick={formSubmitHandler} className="bg-dark-blue rounded-md text-white" style={{width: "120px", height: "40px"}}>Next</button>
            </div>
        </form>
    </div>
}

export default AdditionalAispaceInformation;
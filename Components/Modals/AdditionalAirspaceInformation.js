import { counterActions } from "@/store/store";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import swal from "sweetalert";

import TimeSelect from "../TimeSelect";
import Spinner from "../Spinner";
import Backdrop from "../Backdrop";
// import TimezoneSelectComponent from "../Timezone";

const AdditionalAispaceInformation = (props) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [costChecked, setCostChecked] = useState(true);
    const [deckChecked, setDeckChecked] = useState(false);
    const [stationChecked, setStationChecked] = useState(false);
    const [storageChecked, setStorageChecked] = useState(false);
    const [rentChecked, setRentChecked] = useState(true);
    const [sellChecked, setSellChecked] = useState(false);

    const [negotiable, setNegotiable] = useState(false);
    const [deck, setDeck] = useState("");
    // const [station, setStation] = useState("");
    const [storage, setStorage] = useState("");
    const [rentAirspace, setRentAirspace] = useState("");
    const [sellAirspace, setSellAirspace] = useState("");
    const [airspaceStatus, setAirspaceStatus] = useState("Available")
    const [monAvailable, setMonAvailable] = useState(true);
    const [tueAvailable, setTueAvailable] = useState(true);
    const [wedAvailable, setWedAvailable] = useState(true);
    const [thuAvailable, setThuAvailable] = useState(true);
    const [friAvailable, setFriAvailable] = useState(true);
    const [satAvailable, setSatAvailable] = useState(true);
    const [sunAvailable, setSunAvailable] = useState(true);
    const [fromMonday, setFromMonday] = useState(7);
    const [toMonday, setToMonday] = useState(22);
    const [fromTuesday, setFromTuesday] = useState(7);
    const [toTuesday, setToTuesday] = useState(22);
    const [fromWednesday, setFromWednesday] = useState(7);
    const [toWednesday, setToWednesday] = useState(22);
    const [fromThursday, setFromThursday] = useState(7);
    const [toThursday, setToThursday] = useState(22);
    const [fromFriday, setFromFriday] = useState(7);
    const [toFriday, setToFriday] = useState(22);
    const [fromSaturday, setFromSaturday] = useState(7);
    const [toSaturday, setToSaturday] = useState(22);
    const [fromSunday, setFromSunday] = useState(7);
    const [toSunday, setToSunday] = useState(22);
    const [timezone, setTimezone] = useState();

    const airspaceTitleRef = useRef();
    const costRef = useRef();
    

    const dispatch = useDispatch();
    
    const airspaceData = useSelector(state => state.value.airspaceData);

    

    const closeModalHandler = (e) => {
        e.preventDefault();
        dispatch(counterActions.closeAdditionalInfoModal());
    }

    const costCheckedHandler = (e) => {
        setCostChecked(!costChecked);
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
    }

    const sellHandler = () => {
        setSellChecked(!sellChecked);

        if(!sellChecked) {
            setSellAirspace("Sell AirSpace");
        } else {
            setSellAirspace("");
        }
    }


    const airspaceStatusHandler = (e) => {
        // const airspace = airspaceStatusRef.current.value;

        console.log(e.target.value);
        setAirspaceStatus(e.target.value);
        setMonAvailable(!monAvailable)
        setTueAvailable(!tueAvailable)
        setWedAvailable(!wedAvailable)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(deck, negotiable, storage, sellAirspace, rentAirspace);
        const airspaceTitle = airspaceTitleRef.current.value;
        const costValue = costRef.current.value;
        // const monday = mondayRef.current.value;
        // const tuesday = tuesdayRef.current.value;
        // const wednesday = wednesdayRef.current.value;
        // const thursday = thursdayRef.current.value;
        // const friday = fridayRef.current.value;
        // const saturday = saturdayRef.current.value;
        // const sunday = sundayRef.current.value;
        // const restriction = restrictionRef.current.value;

        const weekDayRanges = [
            {
                weekDayId: 0,
                fromTime: +fromMonday,
                toTime: +toMonday,
                isAvailable: (monAvailable && airspaceStatus === "Available") ? true : false 
            },
            {
                weekDayId: 1,
                fromTime: +fromTuesday,
                toTime: +toTuesday,
                isAvailable: (tueAvailable && airspaceStatus === "Available") ? true : false 
            },
            {
                weekDayId: 2,
                fromTime: +fromWednesday,
                toTime: +toWednesday,
                isAvailable: (wedAvailable && airspaceStatus === "Available") ? true : false 
            },
            {
                weekDayId: 3,
                fromTime: +fromThursday,
                toTime: +toThursday,
                isAvailable: (thuAvailable && airspaceStatus === "Available") ? true : false 
            },
            {
                weekDayId: 4,
                fromTime: +fromFriday,
                toTime: +toFriday,
                isAvailable: (friAvailable && airspaceStatus === "Available") ? true : false 
            },
            {
                weekDayId: 5,
                fromTime: +fromSaturday,
                toTime: +toSaturday,
                isAvailable: (satAvailable && airspaceStatus === "Available") ? true : false 
            },
            {
                weekDayId: 6,
                fromTime: +fromSunday,
                toTime: +toSunday,
                isAvailable: (sunAvailable && airspaceStatus === "Available") ? true : false 
            },
        ]

        const airspaceInformation = {
            ...airspaceData,
            ownerId: props.user.id,
            title: airspaceTitle,
            transitFee: +costValue,
            hasStorageHub: storageChecked,
            hasLandingDeck: deckChecked,
            hasChargingStation: stationChecked,
            isRentableAirspace: rentChecked,
            isFixedTransitFee: costChecked,
            noFlyZone: airspaceStatus === "Available" ? false : true,
            weekDayRanges,
            timezone: timezone
        }

        setIsLoading(true);

        fetch(`/api/proxy?${Date.now()}`, {
            method: "POST",
            body: JSON.stringify(airspaceInformation),
            headers: {
                "Content-Type": "application/json",
                URI: "/properties/claim",
                proxy_to_method: "POST",
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json()
                .then((err) => {
                    console.log(err.message)
                    throw new Error(err.message);
                })
            }
            return res.json()
            .then(response => {
                console.log(response);
                swal({
                    title: "Submitted",
                    text: "Airspace registered successfully",
                    icon: "success",
                    button: "Ok"
                  }).then(() => {
                    dispatch(counterActions.closeAdditionalInfoModal());
                    setIsLoading(false);
                    router.push("/homepage/dashboard")
                  })
            })
        })
        .catch(err => {
            console.log(err.message)
            swal({
                title: "oops!",
                // text: "something went wrong. kindly try again",
                text: err.message || "something went wrong. kindly try again"
              })
            setIsLoading(false)
        })

        console.log(airspaceInformation);
    }

    return <Fragment>
        {/* {isLoading && createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
        {isLoading && createPortal(<Spinner />, document.getElementById("backdrop-root"))} */}
        <div className="bg-white rounded fixed z-20 py-10 overflow-y-auto" style={{width: "740px", height: "90vh", maxHeight: "908px", 
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
                        <input type="number" ref={costRef} name="hour" min="1" placeholder="$ 10:00" style={{width: "143px", height: "27px"}} className="bg-light-blue ps-2 focus:outline-blue-200 placeholder:text-sml placeholder:text-light-brown rounded-sm" />
                        <label htmlFor="hour" className="text-dark-brown text-sml ms-2">per journey</label>
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
                            <input type="checkbox" onChange={stationHandler} checked={stationChecked} name="hour" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500 rounded-sm" />
                            <label htmlFor="hour" onClick={stationHandler} className="text-dark-brown text-sml cursor-pointer">Charging station</label>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <input type="checkbox" onChange={storageHandler} checked={storageChecked} value={storage} name="hour" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500 rounded-sm" />
                            <label htmlFor="hour" onClick={storageHandler} className="text-dark-brown text-sml cursor-pointer">Storage Hub</label>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="px-14 pb-2 pt-3 flex flex-row items-start gap-36">
                    <div>
                        <div style={{width: "138px"}} className="">
                            <p className="font-medium">AirSpace Status</p>
                            <p className="text-xs">Give your AirSpace a Status</p>
                            <select onChange={airspaceStatusHandler} className="bg-light-blue mt-2 ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "143px", height: "27px"}}>
                                <option disabled>Status</option>
                                <option selected>Available</option>
                                <option>No-fly zone</option>
                            </select> 
                        </div>
                        {/* <div className="flex flex-row justify-center mt-10 -ms-14 items-center"> */}
                        <div style={{width: "138px"}} className="mt-10">
                            <p className="font-medium">Select Time Zone</p>
                            <select onChange={(e) => {
                                    setTimezone(e.target.value)
                                    console.log(e.target.value)
                                    }} className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "143px", height: "27px"}}>
                                <option selected disabled>Timezone</option>
                                <option>UTC</option>
                                <option>UTC + 1</option>
                            </select>    
                            {/* <TimezoneSelectComponent /> */}
                        </div>   
                    </div>     
                    <div>
                        <div className="flex flex-row justify-between mb-1 items-center gap-2">
                            <div className="flex flex-row gap-1">
                                {airspaceStatus === "Available" && <input checked={monAvailable} disabled={airspaceStatus !== "Available"} onChange={() => setMonAvailable(!monAvailable)} type="checkbox" className="cursor-pointer" />}
                                <p className="text-sml">Mon</p>
                            </div>
                            {(monAvailable && airspaceStatus === "Available") ? 
                                <TimeSelect fromChange={(value) => {
                                        setFromMonday(value)
                                        console.log(value)
                                    }} toChange={(value) => {
                                        setToMonday(value)
                                        console.log(value)
                                    }} /> : 
                                <p className="text-sm text-dark-brown">unavailable</p>}
                        </div>
                        <div className="flex flex-row justify-between mb-1 items-center gap-2">
                            <div className="flex flex-row gap-1">
                                {airspaceStatus === "Available" && <input checked={tueAvailable} disabled={airspaceStatus !== "Available"} onChange={() => setTueAvailable(!tueAvailable)} type="checkbox" className="cursor-pointer" />}
                                <p className="text-sml">Tue</p>
                            </div>
                            {(tueAvailable && airspaceStatus === "Available") ? 
                                <TimeSelect fromChange={(value) => {
                                    setFromTuesday(value)
                                    console.log(value)
                                }} toChange={(value) => {
                                    setToTuesday(value)
                                    console.log(value)
                                }} /> : 
                                <p className="text-sm text-dark-brown">unavailable</p>}
                        </div>
                        <div className="flex flex-row justify-between mb-1 items-center gap-2">
                            <div className="flex flex-row gap-1">
                                {airspaceStatus === "Available" && <input checked={wedAvailable} disabled={airspaceStatus !== "Available"} onChange={() => setWedAvailable(!wedAvailable)} type="checkbox" className="cursor-pointer" />}
                                <p className="text-sml">Wed</p>
                            </div>
                            {(wedAvailable && airspaceStatus === "Available") ? 
                                <TimeSelect  fromChange={(value) => {
                                    setFromWednesday(value)
                                    console.log(value)
                                }} toChange={(value) => {
                                    setToWednesday(value)
                                    console.log(value)
                                }} /> : 
                                <p className="text-sm text-dark-brown">unavailable</p>}
                        </div>
                        <div className="flex flex-row justify-between mb-1 items-center gap-2">
                            <div className="flex flex-row gap-1">
                                {airspaceStatus === "Available" && <input checked={thuAvailable} disabled={airspaceStatus !== "Available"} onChange={() => setThuAvailable(!thuAvailable)} type="checkbox" className="cursor-pointer" />}
                                <p className="text-sml">Thu</p>
                            </div>
                            {(thuAvailable && airspaceStatus === "Available") ? 
                                <TimeSelect  fromChange={(value) => {
                                    setFromThursday(value)
                                    console.log(value)
                                }} toChange={(value) => {
                                    setToThursday(value)
                                    console.log(value)
                                }} /> : 
                                <p className="text-sm text-dark-brown">unavailable</p>}
                        </div>
                        <div className="flex flex-row justify-between mb-1 items-center gap-2">
                            <div className="flex flex-row gap-1">
                                {airspaceStatus === "Available" && <input checked={friAvailable} disabled={airspaceStatus !== "Available"} onChange={() => setFriAvailable(!friAvailable)} type="checkbox" className="cursor-pointer" />}
                                <p className="text-sml">Fri</p>
                            </div>
                            {(friAvailable && airspaceStatus === "Available") ? 
                                <TimeSelect  fromChange={(value) => {
                                    setFromFriday(value)
                                    console.log(value)
                                }} toChange={(value) => {
                                    setToFriday(value)
                                    console.log(value)
                                }} /> : 
                                <p className="text-sm text-dark-brown">unavailable</p>}
                        </div>
                        <div className="flex flex-row justify-between mb-1 items-center gap-2">
                            <div className="flex flex-row gap-1">
                                {airspaceStatus === "Available" && <input checked={satAvailable} disabled={airspaceStatus !== "Available"} onChange={() => setSatAvailable(!satAvailable)} type="checkbox" className="cursor-pointer" />}
                                <p className="text-sml">Sat</p>
                            </div>
                            {(satAvailable && airspaceStatus === "Available") ? 
                                <TimeSelect  fromChange={(value) => {
                                    setFromSaturday(value)
                                    console.log(value)
                                }} toChange={(value) => {
                                    setToSaturday(value)
                                    console.log(value)
                                }}/> : 
                                <p className="text-sm text-dark-brown">unavailable</p>}
                        </div>
                        <div className="flex flex-row justify-between mb-1 items-center gap-2">
                            <div className="flex flex-row gap-1">
                                {airspaceStatus === "Available" && <input checked={sunAvailable} disabled={airspaceStatus !== "Available"} onChange={() => setSunAvailable(!sunAvailable)} type="checkbox" className="cursor-pointer" />}
                                <p className="text-sml">Sun</p>
                            </div>
                            {(sunAvailable && airspaceStatus === "Available") ? 
                                <TimeSelect  fromChange={(value) => {
                                    setFromSunday(value)
                                    console.log(value)
                                }} toChange={(value) => {
                                    setToSunday(value)
                                }} /> : 
                                <p className="text-sm text-dark-brown">unavailable</p>}
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
                    <button onClick={closeModalHandler} disabled={isLoading} className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"} rounded-md text-dark-blue`} style={{border: "1px solid #0653EA", width: "120px", height: "40px"}}>Cancel</button>
                    <button onClick={formSubmitHandler} disabled={isLoading} className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"} bg-dark-blue rounded-md text-white`} style={{width: "120px", height: "40px"}}>{isLoading ? "Submiting..." : "Submit"}</button>
                </div>
            </form>
        </div>
    </Fragment>
}

export default AdditionalAispaceInformation;
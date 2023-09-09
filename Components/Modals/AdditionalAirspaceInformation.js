const AdditionalAispaceInformation = (props) => {
    return <div className="bg-white rounded fixed z-20" style={{width: "740px", height: "908px", 
    top: "124px", // This is for live environment
    bottom: "120px", 
    left: "350px", 
    right: "350px",
    // top: "-300px",  // This is for test environment
    }}>
        <div className="absolute top-3 right-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path d="M12.7279 12.7285L21.2132 21.2138" stroke="#252530" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.7279 21.2138L21.2132 12.7285" stroke="#252530" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <h3 className="text-center font-semibold pt-6">AirSpace Details</h3>
        <form className="px-10">
            <div className="px-14 pb-5 flex flex-row items-center justify-between gap-8">
                <div style={{width: "114px"}} className="mt-9">
                    <p className="font-medium">AirSpace Title</p>
                    <p className="text-xs">Give a unique name to the AirSpace for easy identification</p>
                </div>
                <input type="text" placeholder="AirSpace Title" style={{width: "383px", height: "27px"}} className="bg-light-blue focus:outline-blue-200 ps-2 placeholder:text-sml placeholder:text-light-brown rounded-sm" name="AirSpace Title" />
            </div>
            <hr />
            <div className="px-14 pb-5 pt-2 flex flex-row items-center justify-between gap-8">
                <p htmlFor="AirSpace Title" className="font-medium me-14">Cost</p>
                <div className="flex flex-row justify-center items-center">
                    <input type="number" name="hour" min="1" placeholder="$ 3:00" style={{width: "143px", height: "27px"}} className="bg-light-blue ps-2 focus:outline-blue-200 focus:outline-blue-200 placeholder:text-sml placeholder:text-light-brown rounded-sm" />
                    <label htmlFor="hour" className="text-dark-brown text-sml ms-2">per hour</label>
                </div>
                <div>
                    <div className="flex flex-row justify-center items-center gap-2">
                        <input type="checkbox" name="hour" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer placeholder:text-sml w-4 checked:bg-blue-500 rounded-sm" />
                        <label htmlFor="hour" className="text-dark-brown text-sml cursor-pointer">Negotiable</label>
                    </div>
                    <div style={{width: "110px"}}>
                        <p className="text-xs ps-2">Select if your cost can be negotiated</p>
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
                        <input type="checkbox" name="hour" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500 rounded-sm" />
                        <label htmlFor="hour" className="text-dark-brown cursor-pointer text-sml">Landing Deck</label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <input type="checkbox" name="hour" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500 rounded-sm" />
                        <label htmlFor="hour" className="text-dark-brown text-sml cursor-pointer">Charging station</label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <input type="checkbox" name="hour" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500 rounded-sm" />
                        <label htmlFor="hour" className="text-dark-brown text-sml cursor-pointer">Storage Hub</label>
                    </div>
                </div>
            </div>
            <hr />
            <div className="px-14 pb-2 pt-3 flex flex-row items-start justify-between gap-8">
                <div style={{width: "138px"}} className="">
                    <p className="font-medium">AirSpace Title</p>
                    <p className="text-xs">Give your AirSpace a Status</p>
                </div>
                <div className="flex flex-row justify-center -ms-14 items-center">
                    <select className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "143px", height: "27px"}}>
                        <option selected>Select Status</option>
                        <option>Online</option>
                    </select>    
                </div>
                <div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Mon</p>
                        <select className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">7:00am - 7pm</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Tue</p>
                        <select className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">7:00am - 7pm</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Wed</p>
                        <select className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">7:00am - 7pm</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Thu</p>
                        <select className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">7:00am - 7pm</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Fri</p>
                        <select className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">7:00am - 7pm</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Sat</p>
                        <select className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">Closed</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                    <div className="flex flex-row justify-between mb-1 items-center gap-2">
                        <p className="text-sml">Sun</p>
                        <select className="bg-light-blue ps-2 placeholder:text-sml text-dark-brown text-sml placeholder:text-light-brown rounded-sm" style={{width: "125px", height: "27px"}}>
                            <option selected className="">Closed</option>
                            <option>8:00am - 8pm</option>
                        </select>  
                    </div>
                </div>
            </div>
            <hr />
            <div className="px-14 pb-5 pt-2 flex flex-row items-center justify-start gap-8">
                <div style={{width: "138px"}} className="">
                    <p className="font-medium">Restrictions</p>
                    <p className="text-xs">Restriction on the AirSpace</p>
                </div>
                <div className="flex flex-row justify-center -ms-2 items-center gap-2">
                    <input type="number" name="hour" min="1" placeholder="20" style={{width: "62px", height: "27px"}} className="bg-light-blue ps-2 placeholder:text-sml focus:outline-blue-200 placeholder:text-light-brown rounded-sm" />
                    <label htmlFor="hour" className="text-dark-brown text-sml">metre landing radius</label>
                </div>
            </div>
            <hr />
            <div className="px-14 pb-5 pt-3 flex flex-row items-center justify-start gap-3">
                <div style={{width: "147px"}} className="">
                    <p className="font-medium">Offers</p>
                    <p className="text-xs">Select offers on AirSpace</p>
                </div>
                <div className="ps-1">
                    <div className="flex flex-row justify-start items-center gap-2">
                        <input type="checkbox" name="rent airspace" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500" />
                        <label htmlFor="hour" className="text-dark-brown text-sml cursor-pointer">Rent AirSpace</label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <input type="checkbox" name="sell airspace" min="1" style={{height: "27px"}} className="bg-light-blue ps-2 cursor-pointer w-4 checked:bg-blue-500" />
                        <label htmlFor="hour" className="text-dark-brown text-sml cursor-pointer">Sell AirSpace</label>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center mt-8 gap-5">
                <button className="rounded-md text-dark-blue" style={{border: "1px solid #0653EA", width: "120px", height: "40px"}}>Cancel</button>
                <button onClick={props.onConfirm} className="bg-dark-blue rounded-md text-white" style={{width: "120px", height: "40px"}}>Next</button>
            </div>
        </form>
    </div>
}

export default AdditionalAispaceInformation;
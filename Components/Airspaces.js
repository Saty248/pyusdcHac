import Image from "next/image"
import { useDispatch, useSelector } from "react-redux";

import { counterActions } from "@/store/store";

const Airspaces = (props) => {
    const dispatch = useDispatch();

    const newAirspaceModalHandler = () => {
        dispatch(counterActions.newAirspaceModal());
    }; 


    return <div className="bg-white absolute" style={{width: "340px", height: "80%", left: "10%", borderRadius: "5px"}}>
        <div className="flex flex-row">
            <button onClick={props.showAllAirspace} className={`${props.airspace == "all" && "bg-dark-blue text-white"} font-bold hover:bg-dark-blue hover:text-white`} style={{width: "170px", height: "40px", borderRadius: "5px 0px 0px 0px"}}>Airspaces</button>
            <button onClick={props.showMyAirspace} className={`${props.airspace == "mine" && "bg-dark-blue text-white"} font-bold hover:bg-dark-blue hover:text-white`} style={{width: "170px", height: "40px", borderRadius: "0px 5px 0px 0px"}}>My Airspaces</button>
        </div>
        <div className="flex flex-row justify-center" style={{width: "340px", height: "100%", background: "linear-gradient(180deg, #0653EA, white)"}}>
            {props.allAirspace && <div className="bg-white flex pb-10 overflow-y-auto flex-col items-center" style={{width: "99%", height: "100%", marginTop: "2px"}}>
                {props.airSpaces.map(airspace => {
                    return <button key={airspace.id} onClick={props.viewAirspace} className="bg-white mt-8 transition-all duration-500 ease-in-out hover:bg-blue-100" style={{width: "299px", height: "100px", borderRadius: "3px", border: "1px solid blue"}}>
                        <div className="flex flex-row items-center justify-between pb-5" style={{borderBottom: "1px solid blue"}}>
                            <div className="flex flex-row mt-5 ms-2 items-center gap-2 text-sm font-medium font-sans">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.1875 6.75C6.1875 5.1967 7.4467 3.9375 9 3.9375C10.5533 3.9375 11.8125 5.1967 11.8125 6.75C11.8125 8.3033 10.5533 9.5625 9 9.5625C7.4467 9.5625 6.1875 8.3033 6.1875 6.75ZM9 5.0625C8.06802 5.0625 7.3125 5.81802 7.3125 6.75C7.3125 7.68198 8.06802 8.4375 9 8.4375C9.93198 8.4375 10.6875 7.68198 10.6875 6.75C10.6875 5.81802 9.93198 5.0625 9 5.0625Z" fill="black"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.09231 6.09543C4.29763 3.60452 6.37917 1.6875 8.87852 1.6875H9.12149C11.6208 1.6875 13.7024 3.60452 13.9077 6.09543C14.0178 7.43063 13.6053 8.75644 12.7573 9.79359L10.0612 13.0908C9.51271 13.7616 8.48729 13.7616 7.93884 13.0908L5.24274 9.79359C4.39468 8.75644 3.98225 7.43063 4.09231 6.09543ZM8.87852 2.8125C6.96465 2.8125 5.37073 4.28045 5.21351 6.18785C5.12739 7.23257 5.4501 8.26994 6.11366 9.08146L8.80976 12.3787C8.90808 12.499 9.09192 12.499 9.19025 12.3787L11.8863 9.08146C12.5499 8.26994 12.8726 7.23257 12.7865 6.18785C12.6293 4.28045 11.0354 2.8125 9.12149 2.8125H8.87852Z" fill="black"/>
                                    <path d="M5.75312 12.2516C5.89205 11.9737 5.77942 11.6358 5.50156 11.4969C5.2237 11.358 4.88582 11.4706 4.74689 11.7484L3.24689 14.7484C3.1597 14.9228 3.16902 15.1299 3.27151 15.2957C3.374 15.4616 3.55505 15.5625 3.75 15.5625H14.25C14.445 15.5625 14.626 15.4616 14.7285 15.2957C14.831 15.1299 14.8403 14.9228 14.7531 14.7484L13.2531 11.7484C13.1142 11.4706 12.7763 11.358 12.4984 11.4969C12.2206 11.6358 12.108 11.9737 12.2469 12.2516L13.3399 14.4375H4.66014L5.75312 12.2516Z" fill="black"/>
                                </svg>   
                                <p>{airspace.title}</p> 
                            </div> 
                            <div className="mt-5 me-1.5 flex flex-row items-center justify-center font-semibold gap-1" style={{width: "66px", height: "21px", borderRadius:"3px", background: `${airspace.status == "Active" ? "#BED9C7" : "#FFC7C2"}`, }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                    <circle cx="3" cy="3" r="3" fill={`${airspace.status == "Active" ? "#1A572E" : "#C80000"} `}/>
                                </svg>
                                <p style={{color: `${airspace.status == "Active" ? "#1A572E" : "#C80000"}`}} className="text-sm">{airspace.status}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center mt-2 py-1 px-1 text-sm ms-2">
                            <p>4.5</p>
                            <div className="flex flex-row items-center">
                                <Image src="/images/Star.png"  alt="star icon" width={12} height={12} />
                                <Image src="/images/Star.png" alt="star icon" width={12} height={12} />
                                <Image src="/images/Star.png" alt="star icon" width={12} height={12} />
                                <Image src="/images/Star.png" alt="star icon" width={12} height={12} />
                                <Image src="/images/Star-half.png" alt="star icon" width={12} height={12} />
                            </div>
                            <p>(6)</p>
                        </div>
                    </button>
                })}
            </div>}

            {props.myAirspace && <div className="bg-white flex overflow-y-auto flex-col items-center" style={{width: "99%", height: "100%", marginTop: "2px"}}>
                        <button onClick={newAirspaceModalHandler} className="text-sm bg-milk mx-auto mt-5 flex flex-row justify-center items-center gap-2 font-medium text-light-dark rounded transition-all duration-500 ease-in-out hover:bg-blue-200" style={{width: "205px", height: "35px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.33301 8.00065C1.33301 4.31865 4.31767 1.33398 7.99967 1.33398C11.6817 1.33398 14.6663 4.31865 14.6663 8.00065C14.6663 11.6827 11.6817 14.6673 7.99967 14.6673C4.31767 14.6673 1.33301 11.6827 1.33301 8.00065ZM7.99967 2.66732C6.58519 2.66732 5.22863 3.22922 4.22844 4.22941C3.22824 5.22961 2.66634 6.58616 2.66634 8.00065C2.66634 9.41514 3.22824 10.7717 4.22844 11.7719C5.22863 12.7721 6.58519 13.334 7.99967 13.334C9.41416 13.334 10.7707 12.7721 11.7709 11.7719C12.7711 10.7717 13.333 9.41514 13.333 8.00065C13.333 6.58616 12.7711 5.22961 11.7709 4.22941C10.7707 3.22922 9.41416 2.66732 7.99967 2.66732Z" fill="#1E1E1E"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.66667 4.66667C8.66667 4.48986 8.59643 4.32029 8.4714 4.19526C8.34638 4.07024 8.17681 4 8 4C7.82319 4 7.65362 4.07024 7.5286 4.19526C7.40357 4.32029 7.33333 4.48986 7.33333 4.66667V7.33333H4.66667C4.48986 7.33333 4.32029 7.40357 4.19526 7.5286C4.07024 7.65362 4 7.82319 4 8C4 8.17681 4.07024 8.34638 4.19526 8.4714C4.32029 8.59643 4.48986 8.66667 4.66667 8.66667H7.33333V11.3333C7.33333 11.5101 7.40357 11.6797 7.5286 11.8047C7.65362 11.9298 7.82319 12 8 12C8.17681 12 8.34638 11.9298 8.4714 11.8047C8.59643 11.6797 8.66667 11.5101 8.66667 11.3333V8.66667H11.3333C11.5101 8.66667 11.6797 8.59643 11.8047 8.4714C11.9298 8.34638 12 8.17681 12 8C12 7.82319 11.9298 7.65362 11.8047 7.5286C11.6797 7.40357 11.5101 7.33333 11.3333 7.33333H8.66667V4.66667Z" fill="#1E1E1E"/>
                            </svg>
                            <p>Add a New Airspace</p>
                        </button>
                        
                        <button onClick={props.viewMyAirspace} className="bg-white mt-8 transition-all duration-500 ease-in-out hover:bg-blue-100" style={{width: "299px", height: "148px", borderRadius: "3px", border: "1px solid blue"}}>
                            <div className="flex flex-row items-center justify-between pb-5" style={{borderBottom: "1px solid blue"}}>
                                <div className="flex flex-row mt-5 ms-2 items-center gap-2 text-sm font-medium font-sans">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.1875 6.75C6.1875 5.1967 7.4467 3.9375 9 3.9375C10.5533 3.9375 11.8125 5.1967 11.8125 6.75C11.8125 8.3033 10.5533 9.5625 9 9.5625C7.4467 9.5625 6.1875 8.3033 6.1875 6.75ZM9 5.0625C8.06802 5.0625 7.3125 5.81802 7.3125 6.75C7.3125 7.68198 8.06802 8.4375 9 8.4375C9.93198 8.4375 10.6875 7.68198 10.6875 6.75C10.6875 5.81802 9.93198 5.0625 9 5.0625Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.09231 6.09543C4.29763 3.60452 6.37917 1.6875 8.87852 1.6875H9.12149C11.6208 1.6875 13.7024 3.60452 13.9077 6.09543C14.0178 7.43063 13.6053 8.75644 12.7573 9.79359L10.0612 13.0908C9.51271 13.7616 8.48729 13.7616 7.93884 13.0908L5.24274 9.79359C4.39468 8.75644 3.98225 7.43063 4.09231 6.09543ZM8.87852 2.8125C6.96465 2.8125 5.37073 4.28045 5.21351 6.18785C5.12739 7.23257 5.4501 8.26994 6.11366 9.08146L8.80976 12.3787C8.90808 12.499 9.09192 12.499 9.19025 12.3787L11.8863 9.08146C12.5499 8.26994 12.8726 7.23257 12.7865 6.18785C12.6293 4.28045 11.0354 2.8125 9.12149 2.8125H8.87852Z" fill="black"/>
                                        <path d="M5.75312 12.2516C5.89205 11.9737 5.77942 11.6358 5.50156 11.4969C5.2237 11.358 4.88582 11.4706 4.74689 11.7484L3.24689 14.7484C3.1597 14.9228 3.16902 15.1299 3.27151 15.2957C3.374 15.4616 3.55505 15.5625 3.75 15.5625H14.25C14.445 15.5625 14.626 15.4616 14.7285 15.2957C14.831 15.1299 14.8403 14.9228 14.7531 14.7484L13.2531 11.7484C13.1142 11.4706 12.7763 11.358 12.4984 11.4969C12.2206 11.6358 12.108 11.9737 12.2469 12.2516L13.3399 14.4375H4.66014L5.75312 12.2516Z" fill="black"/>
                                    </svg>   
                                    <p>AirSpace Title</p> 
                                </div> 
                                <div className="mt-5 me-1.5 flex flex-row items-center justify-center font-semibold gap-1" style={{width: "66px", height: "21px", borderRadius:"3px", background: `${props.airspace.status == "Active" ? "#BED9C7" : "#FFC7C2"}`, }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                        <circle cx="3" cy="3" r="3" fill={`${props.airspace.status == "Active" ? "#1A572E" : "#C80000"} `}/>
                                    </svg>
                                    <p style={{color: `${props.airspace.status == "Active" ? "#1A572E" : "#C80000"}`}} className="text-sm">Inactive</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center mt-2 text-xs ms-2">
                                <p className="text-red-600">4.5</p>
                                <div className="flex flex-row items-center">
                                    <Image src="/images/Star.png" alt="star icon" width={12} height={12} />
                                    <Image src="/images/Star.png" alt="star icon" width={12} height={12} />
                                    <Image src="/images/Star.png" alt="star icon" width={12} height={12} />
                                    <Image src="/images/Star.png" alt="star icon" width={12} height={12} />
                                    <Image src="/images/Star-half.png" alt="star icon" width={12} height={12} />
                                </div>
                                <p>(6)</p>
                            </div>
                            <div className="text-xs text-light-brown text-start ms-2">
                                <p><span className="font-semibold">Resident Name: </span>Jorge Constantino Colindres</p>
                                <p><span className="font-semibold">Address: </span>6391 Elgin St. Celina, Delaware 10299</p>
                                <p><span className="font-semibold">(e) Resident Identification: </span>90000000000035</p>
                            </div>
                        </button>
                    </div>                            
            }
        </div>
        <div className="bg-white rounded-b-md text-center flex flex-row items-center" style={{width: "100%", height: "30px"}}>
            {/* <button className="mx-auto" style={{borderRadius: "50%", background: "aliceblue", width: "40px", height: "40px"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M27.5502 14.9501C28.0384 15.4383 28.0384 16.2297 27.5502 16.7179L20.8836 23.3845C20.3954 23.8727 19.6039 23.8727 19.1158 23.3845L12.4491 16.7179C11.961 16.2297 11.961 15.4383 12.4491 14.9501C12.9373 14.4619 13.7287 14.4619 14.2169 14.9501L19.9997 20.7329L25.7825 14.9501C26.2706 14.4619 27.0621 14.4619 27.5502 14.9501Z" fill="#0653EA"/>
                </svg>
            </button> */}
        </div>
    </div>
}

export default Airspaces;
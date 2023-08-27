import maplibregl from 'maplibre-gl';
import { useEffect, useState } from 'react';

const AddAirspace = (props) => {
    const [address, setAddress] =  useState("");
    const [addresses, setAddresses] =  useState([]);
    const [showOptions, setShowOptions] = useState(true);

    const locationiqKey = process.env.API_KEY;

    const addressChangeHandler = (e) => {
        if(!showOptions) {
            setShowOptions(true);
        }

        setAddress(e.target.value)
        console.log(address);
    }

    const buttonSelectHandler = (e) => {
        e.preventDefault(), 
        setAddress(e.target.value), 
        setShowOptions(false);
    }

    useEffect(() => {
            const map = new maplibregl.Map({
                container: 'map',
                attributionControl: false, //need this to show a compact attribution icon (i) instead of the whole text
                style: 'https://tiles.locationiq.com/v3/streets/vector.json?key='+locationiqKey,
                zoom: 12,
                center: [-122.42, 37.779]
            });

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
                        'fill-opacity': 0.5
                    }
                });
            });
    }, [])

    useEffect(() => {
        if(address) {        
        const addressHandler = setTimeout(() => {
            fetch(`https://api.locationiq.com/v1/autocomplete?key=${locationiqKey}&q=${address}`)
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
                setAddresses(resData);
            })
            .catch((err) => {
                console.log(err)
            })
        }, 500)
        return () => {
            clearTimeout(addressHandler);
        }
    }
       

    }, [address]);

    return <div className="bg-white rounded fixed z-20 " style={{width: "886px", height: "764px", 

        // top: "124px", 
        // bottom: "264px", 


        left: "277px", 
        right: "277px",
        top: "-100px",
        }}  onClick={() => {setShowOptions(false)}}>
            <div className="relative">
                <button onClick={props.onClose} className="absolute right-9 top-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <path d="M12.7578 12.7285L21.2431 21.2138" stroke="#252530" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.7569 21.2138L21.2422 12.7285" stroke="#252530" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
             <div className="flex flex-row items-center mt-20 mb-8 gap-4 justify-center">
                <h2 className="font-bold">Add New AirSpace</h2>
            </div>
            <form className="relative">
                <label className="ms-12 text-light-brown font-medium">AirSpace Address<span className="text-red-500">*</span></label> <br />
                
                <div className="flex flex-row gap-2.5 justify-end items-center me-12">
                    <div className="relative"> 
                        <input placeholder="AirSpace Address" onChange={addressChangeHandler} value={address} className="ms-12 mt-2.5 text-ellipsis rounded placeholder:text-light-brown placeholder:text-sm ps-5 pe-36 py-2.5" style={{width: "656px", height: "37px", border: "0.35px solid #0653EA"}} />
                        {/* <div className="flex flex-row justify-center gap-1 items-center absolute right-3 top-4 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 11.375C3.035 11.375 0.625 8.965 0.625 6C0.625 3.035 3.035 0.625 6 0.625C8.965 0.625 11.375 3.035 11.375 6C11.375 8.965 8.965 11.375 6 11.375ZM6 1.375C3.45 1.375 1.375 3.45 1.375 6C1.375 8.55 3.45 10.625 6 10.625C8.55 10.625 10.625 8.55 10.625 6C10.625 3.45 8.55 1.375 6 1.375Z" fill="#FC6681"/>
                                <path d="M4.58493 7.78969C4.48993 7.78969 4.39493 7.75469 4.31993 7.67969C4.17493 7.53469 4.17493 7.29469 4.31993 7.14969L7.14993 4.31969C7.29493 4.17469 7.53493 4.17469 7.67993 4.31969C7.82493 4.46469 7.82493 4.70469 7.67993 4.84969L4.84993 7.67969C4.77993 7.75469 4.67993 7.78969 4.58493 7.78969Z" fill="#FC6681"/>
                                <path d="M7.41493 7.78969C7.31993 7.78969 7.22493 7.75469 7.14993 7.67969L4.31993 4.84969C4.17493 4.70469 4.17493 4.46469 4.31993 4.31969C4.46493 4.17469 4.70493 4.17469 4.84993 4.31969L7.67993 7.14969C7.82493 7.29469 7.82493 7.53469 7.67993 7.67969C7.60493 7.75469 7.50993 7.78969 7.41493 7.78969Z" fill="#FC6681"/>
                            </svg>
                            <p className="text-xml text-light-red">Invalid</p>
                        </div> */}
                        <div className="flex flex-row justify-center gap-1 items-center absolute right-3 top-4 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 11.375C3.035 11.375 0.625 8.965 0.625 6C0.625 3.035 3.035 0.625 6 0.625C8.965 0.625 11.375 3.035 11.375 6C11.375 8.965 8.965 11.375 6 11.375ZM6 1.375C3.45 1.375 1.375 3.45 1.375 6C1.375 8.55 3.45 10.625 6 10.625C8.55 10.625 10.625 8.55 10.625 6C10.625 3.45 8.55 1.375 6 1.375Z" fill="#29AE55"/>
                                <path d="M5.28997 7.79078C5.18997 7.79078 5.09497 7.75078 5.02497 7.68078L3.60997 6.26578C3.46497 6.12078 3.46497 5.88078 3.60997 5.73578C3.75497 5.59078 3.99497 5.59078 4.13997 5.73578L5.28997 6.88578L7.85997 4.31578C8.00497 4.17078 8.24497 4.17078 8.38997 4.31578C8.53497 4.46078 8.53497 4.70078 8.38997 4.84578L5.55497 7.68078C5.48497 7.75078 5.38997 7.79078 5.28997 7.79078Z" fill="#29AE55"/>
                            </svg>
                            <p className="text-xml text-light-green">Verified</p>
                        </div>
                    </div>
                    <button className="rounded-md bg-blue mt-2.5 text-white text-sm" style={{width: "120px", height: "37px", border: "none"}}>Verify</button>
                </div>
                {addresses.length > 0 &&
                <div style={{width: "656px", height: "259px", border: "0.35px solid #0653EA", marginLeft: "52px"}} className={`${(!showOptions || !addresses.length > 1) && "hidden"} bg-white z-10 overflow-y-auto rounded px-3 py-1 absolute`}>
                    <p className="text-xs text-red-500">If any of the addresses listed below matches your address, click on it to select</p>
                    {addresses.map(address => {
                        return <button  value={address.display_address} 
                                            onClick={buttonSelectHandler}
                                            className="py-2 text-left" 
                                            style={{borderBottom: "0.2px solid #0653EA", width: "100%"}}>
                            {address.display_address}
                        </button>
                    })

                    }
                </div>
                }
            </form>
            <div className="mt-8">
                <p className="-mb-7 ms-12">Kindly Confirm the Address on the Map</p>
                <div id="map" style={{width: "786px", height: "350px"}} className="rounded-md mt-0">

                </div>
                <div className="flex flex-row justify-center items-center mt-8 gap-5">
                    <button className="rounded-md text-blue" style={{border: "1px solid #0653EA", width: "120px", height: "40px"}} onClick={props.closeMap}>Cancel</button>
                    <button className="bg-blue rounded-md text-white" style={{width: "120px", height: "40px"}}>Next</button>
                </div>
            </div>
        </div> 
}

export default AddAirspace;
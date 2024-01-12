import { Fragment, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import maplibregl from "maplibre-gl";
import Script from "next/script";
import { InfoIcon, MagnifyingGlassIcon } from "@/Components/Icons";
import Sidebar from "@/Components/Sidebar";
import PageHeader from "@/Components/PageHeader";
import Spinner from "@/Components/Spinner";
import Backdrop from "@/Components/Backdrop";
import { HelpQuestionIcon, ArrowLeftIcon, CloseIcon, LocationPointIcon } from "@/Components/Icons";

const Toggle = ({ checked, setChecked }) => {
    return (
        <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" checked={checked} onClick={setChecked} />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    )
}

const ClaimModal = ({ onCloseModal }) => {
    const [data, setData] = useState({ address: '', name: '', rent: true, sell: true, hasPlanningPermission: false, hasChargingStation: false, hasLandingDeck: false, hasStorageHub: false });

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-[30px] md:rounded-[30px] px-[29px] w-full md:max-h-[700px] overflow-y-auto md:w-[689px] z-50 flex flex-col gap-[15px]">
            <div className="relative flex items-center gap-[20px] md:p-0 py-[20px] px-[29px] -mx-[29px] -mt-[30px] md:my-0 md:mx-0 md:shadow-none" style={{ boxShadow: '0px 12px 34px -10px #3A4DE926' }}>
                <div className="w-[16px] h-[12px] md:hidden" onClick={onCloseModal}><ArrowLeftIcon /></div>
                <h2 className="text-[#222222] text-center font-medium text-xl">Claim Airspace</h2>
                <div onClick={onCloseModal} className="hidden md:block absolute top-0 right-0 w-[15px] h-[15px] ml-auto cursor-pointer"><CloseIcon /></div>
            </div>
            <div className="flex items-center gap-[10px] py-4 px-[22px] rounded-lg" style={{ border: "1px solid #4285F4" }}>
                <div className="w-6 h-6"><LocationPointIcon /></div>
                <p className="font-normal text-[#222222] text-[14px] flex-1">{data.address}</p>
            </div>
            <div className="flex flex-col gap-[5px]">
                <label htmlFor="name">Name of airspace<span className="text-[#E04F64]">*</span></label>
                <input className="py-[16px] px-[22px] rounded-lg text-[14px] outline-none text-[#222222]" style={{ border: '1px solid #87878D' }} type="text" name="name" id="name" />
            </div>
            <div className="flex flex-col gap-[10px]">
                <p className="text-[14px] font-normal text-[#838187]">Are you looking to Rent or Sell your airspace?</p>
                <div className="flex items-center gap-[7px]">
                    <input className='w-[18px] h-[18px] cursor-pointer' type="checkbox" id="rent" name="rent" checked={data.rent} onChange={() => setData(prev => ({ ...prev, rent: !prev.rent }))} />
                    Rent
                    <input className='w-[18px] h-[18px] cursor-pointer' type="checkbox" id="sell" name="sell" checked={data.sell} onChange={() => setData(prev => ({ ...prev, sell: !prev.sell }))} />
                    Sell
                </div>

            </div>
            {data.rent && (
                <Fragment>
                    <h2>Rental Details</h2>
                    <p>Learn more about rentals in our FAQ.</p>
                    <div>
                        <label htmlFor="variableFeeRentalRange">Variable Fee Rental Range (per transit)<span className="text-[#E04F64]">*</span></label>
                        <select name="variableFeeRentalRange" id="variableFeeRentalRange" className="w-full rounded-lg py-[16px] px-[22px] text-[#87878D] text-[14px] font-normal appearance-none focus:outline-none" style={{ border: "1px solid #87878D" }}>
                            <option value="1-99" >$1-$99</option>
                            <option value="100-199">$100-$199</option>
                            <option value="200-299">$200-$299</option>
                            <option value="300-399">$300-$399</option>
                            <option value="400-499">$400-$499</option>
                            <option value="500-599">$500-$599</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="timeZone">Variable Fee Rental Range (per transit)<span className="text-[#E04F64]">*</span></label>
                        <select name="timeZone" id="timeZone" className="w-full rounded-lg py-[16px] px-[22px] text-[#87878D] text-[14px] font-normal appearance-none focus:outline-none" style={{ border: "1px solid #87878D" }}>
                            <option value="UTC+0" >UTC+0</option>
                            <option value="UTC+1" >UTC+1</option>
                            <option value="UTC+2" >UTC+2</option>
                            <option value="UTC+3" >UTC+3</option>
                            <option value="UTC+4" >UTC+4</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <p>Select extra features your facility provides<span className="text-[#E04F64]">*</span></p>
                        <div className="flex items-center gap-[10px]">
                            <input className='w-[18px] h-[18px] cursor-pointer' type="checkbox" id="hasLandingDeck" name="hasLandingDeck" checked={data.hasLandingDeck} onChange={() => setData(prev => ({ ...prev, hasLandingDeck: !prev.hasLandingDeck }))} />
                            Landing Deck
                            <input className='w-[18px] h-[18px] cursor-pointer' type="checkbox" id="hasChargingStation" name="hasChargingStation" checked={data.hasChargingStation} onChange={() => setData(prev => ({ ...prev, hasChargingStation: !prev.hasChargingStation }))} />
                            Charging Station
                            <input className='w-[18px] h-[18px] cursor-pointer' type="checkbox" id="hasStorageHub" name="hasStorageHub" checked={data.hasStorageHub} onChange={() => setData(prev => ({ ...prev, hasStorageHub: !prev.hasStorageHub }))} />
                            Storage Hub
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                        <p>Availability<span className="text-[#E04F64]">*</span></p>
                        {["MONDAYS", "TUESDAYS", "WEDNESDAYS", "THURSDAYS", "FRIDAYS", "SATURDAYS", "SUNDAYS"].map((day) => {
                            return (
                                <div className="flex justify-between items-center ">
                                    <div className="flex items-center gap-[15px] pr-[32px]">
                                        <Toggle checked={true} setChecked={() => { }} />
                                        <p>{day}</p>
                                    </div>
                                    <div className="flex items-center gap-[66px]">
                                        <select name={`${day}/start`} id={`${day}/start`} className="rounded-lg py-[16px] px-[22px] text-[#87878D] text-[14px] font-normal appearance-none focus:outline-none" style={{ border: "1px solid #87878D" }}>
                                            <option value="9:00">9:00</option>
                                        </select>
                                        <p>to</p>
                                        <select name={`${day}/end`} id={`${day}/end`} className="rounded-lg py-[16px] px-[22px] text-[#87878D] text-[14px] font-normal appearance-none focus:outline-none" style={{ border: "1px solid #87878D" }}>
                                            <option value="21:00">21:00</option>
                                        </select>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Fragment>
            )}
            {data.sell && (
                <div></div>
            )}
        </div>
    )
}

const Explorer = ({ address, setAddress, addresses, showOptions, handleSelectAddress }) => {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    return (
        <div className="hidden md:flex bg-[#FFFFFFCC] py-[43px] px-[29px] rounded-[30px] flex-col items-center gap-[15px] max-w-[362px] max-h-full z-20 m-[39px]" style={{ boxShadow: '0px 12px 34px -10px #3A4DE926' }}>
            <div className="flex gap-[5px] items-center">
                <p className="text-xl font-medium text-[#222222]">Claim Airspace</p>
                <div onClick={() => setIsInfoVisible(prev => !prev)} className="relative w-[20px] h-[20px] flex justify-center items-center">
                    <InfoIcon />
                    {isInfoVisible && <div className="absolute -top-4 left-6 w-[189px] bg-[#CCE3FC] rounded-[4px] p-[12px] font-normal text-[10px] italic">Note that we store your data securely with advanced encryption and strict authentication measures to ensure utmost privacy and protection.</div>}
                </div>
            </div>
            <p className="text-[15px] font-normal text-[#222222]">Ready to claim your airspace? No registered airspace yet, but exciting times ahead!</p>
            <div className="relative pl-[22px] py-[16px] bg-white rounded-lg w-full" style={{ border: "1px solid #87878D" }}>
                <input autoComplete="off" value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="searchAirspaces" id="searchAirspaces" placeholder="Search Airspaces" className="outline-none" />
                <div className="w-[17px] h-[17px] absolute top-1/2 -translate-y-1/2 right-[22px]">
                    <MagnifyingGlassIcon />
                </div>
                {showOptions && (
                    <div className="absolute top-[55px] left-0 bg-white w-full flex-col">
                        {addresses.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    value={item.place_name}
                                    onClick={() => handleSelectAddress(item.place_name)}
                                    className='p-5 text-left text-[#222222] w-full'
                                    style={{
                                        borderTop: '0.2px solid #222222',
                                    }}
                                >
                                    {item.place_name}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

const Slider = () => {
    const [isFullyVisible, setIsFullyVisible] = useState(false);

    return (
        <div onClick={() => setIsFullyVisible(prev => !prev)} className={`cursor-pointer rounded-t-[30px] absolute ${isFullyVisible ? 'bottom-0' : '-bottom-[600px]'} right-6 flex flex-col items-center gap-[34px] py-[43px] px-[23px] bg-white max-w-[362px] duration-1000`}>
            <div className="flex items-center gap-[0px]">
                <div className="flex items-center justify-center w-[24px] h-[24px]"><HelpQuestionIcon /></div>
                <p className="font-medium text-xl text-[#222222] text-center">How to Claim My Airspsace?</p>
            </div>
            <div className="flex flex-col px-[6px]">
                <div className="flex items-start text-[#222222] font-normal text-[15px] gap-[4px]" key={1}>
                    <p className="">1.</p>
                    <div className="flex flex-col">
                        <p className="font-bold">Discover Your Address</p>
                        <p>Enter your address using the map for accuracy.</p>
                    </div>
                </div>
                <div className="flex items-start text-[#222222] font-normal text-[15px] gap-[4px]" key={2}>
                    <p className="">2.</p>
                    <div className="flex flex-col">
                        <p className="font-bold">Move the Pin If Needed</p>
                        <p>Easily adjust the location pin if Google Maps is off.</p>
                    </div>
                </div>
                <div className="flex items-start text-[#222222] font-normal text-[15px] gap-[4px]" key={3}>
                    <p className="">3.</p>
                    <div className="flex flex-col">
                        <p className="font-bold">Define Your Property</p>
                        <p>Outline your land using the polygon tool if the location is not exact (top right of the map).</p>
                    </div>
                </div>
                <div className="flex items-start text-[#222222] font-normal text-[15px] gap-[4px]" key={4}>
                    <p className="">4.</p>
                    <div className="flex flex-col">
                        <p className="font-bold">Claim Airspace</p>
                        <p>Click the 'Claim Airspace' button to confirm your airspace address. Your Airspace is saved. Modify your details anytime.</p>
                    </div>
                </div>
                <div className="flex items-start text-[#222222] font-normal text-[15px] gap-[4px]" key={5}>
                    <p className="">5.</p>
                    <div className="flex flex-col">
                        <p className="font-bold">Checking the details</p>
                        <p>We confirm official records.</p>
                    </div>
                </div>
                <div className="flex items-start text-[#222222] font-normal text-[15px] gap-[4px]" key={6}>
                    <p className="">6.</p>
                    <div className="flex flex-col">
                        <p className="font-bold">Passive income is on the way</p>
                        <p>We will update you as your account receives funds.</p>
                    </div>
                </div>
            </div>
            <div className="font-normal text-[15px] text-[#222222] text-center">Let's get started on creating the future and receiving passive income from your skies. 🚀✨</div>
        </div>
    )
}


const Airspaces = () => {
    const [isLoading, setIsLoading] = useState(false);
    // map
    const [map, setMap] = useState(null)
    // variables
    const [address, setAddress] = useState('');
    const [addressData, setAddressData] = useState();
    const [addresses, setAddresses] = useState([]);
    const [flyToAddress, setFlyToAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ longitude: '', latitude: '' })
    const [marker, setMarker] = useState();
    // showing
    const [showOptions, setShowOptions] = useState(false);
    const [showClaimModal, setShowClaimModal] = useState(true);

    useEffect(() => {
        if (map) return;

        const createMap = () => {
            mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

            const newMap = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-15.498211, 28.035056],
                zoom: 20,
            });

            newMap.on('load', function () {
                newMap.addLayer({
                    id: 'maine',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [],
                            },
                        },
                    },
                    layout: {},
                    paint: {
                        'fill-color': '#D20C0C',
                    },
                });
            });

            setMap(newMap);
        }

        createMap();
    }, []);

    useEffect(() => {
        if (!showOptions) setShowOptions(true);
        if (!address) return setShowOptions(false);

        let timeoutId;

        const getAddresses = async () => {
            setCoordinates({ longitude: '', latitude: '' });

            timeoutId = setTimeout(async () => {
                try {
                    const mapboxGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`;

                    const response = await fetch(mapboxGeocodingUrl);

                    if (!response.ok) throw new Error("Error while getting addresses");

                    const data = await response.json();
                    if (data.features && data.features.length > 0) {
                        setAddresses(data.features);
                    } else {
                        setAddresses([]);
                    }
                } catch (error) {
                    console.log(error);
                }
            }, 500);
        }

        getAddresses();

        return () => clearTimeout(timeoutId);
    }, [address])

    useEffect(() => {
        console.log("Hola", flyToAddress)
        if (!flyToAddress) return;

        const goToAddress = async () => {
            try {
                setIsLoading(true);

                const mapBoxGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${flyToAddress}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`;

                const response = await fetch(mapBoxGeocodingUrl)

                if (!response.ok) throw new Error("Error while getting new address location");

                const data = await response.json();

                if (!data.features || data.features.length === 0) {
                    throw new Error('Address not found');
                }

                const coordinates = data.features[0].geometry.coordinates;
                const endPoint = [coordinates[0], coordinates[1]];

                setCoordinates({ longitude: coordinates[0], latitude: coordinates[1] });
                setAddressData(data.features[0].properties);
                setIsLoading(false);

                map.flyTo({
                    center: endPoint,
                    zoom: 16,

                });

                if (marker) {
                    marker.remove();
                }

                let el = document.createElement('div');
                el.id = 'markerWithExternalCss';

                // Add the new marker to the map and update the marker state
                const newMarker = new maplibregl.Marker(el)
                    .setLngLat(endPoint)
                    .addTo(map);
                setMarker(newMarker);
            } catch (error) {
                setIsLoading(false);
                console.error(err);
            }
        }

        goToAddress();

    }, [flyToAddress, map]);

    useEffect(() => {
        if (flyToAddress === address) setShowOptions(false);
    }, [flyToAddress, address])


    const handleSelectAddress = (placeName) => {
        setAddress(placeName);
        setFlyToAddress(placeName);
        setShowOptions(false);
    }

    return (
        <Fragment>
            <Script src='https://www.googletagmanager.com/gtag/js?id=G-C0J4J56QW5' />
            <Script id='google-analytics'>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());   
        
                gtag('config', 'G-C0J4J56QW5');
            `}
            </Script>

            {isLoading && <Backdrop />}
            {isLoading && <Spinner />}

            <div className="relative rounded bg-[#F0F0FA] h-screen w-screen flex items-center justify-center overflow-hidden">
                <Sidebar />
                <div className="w-full h-full flex flex-col">
                    <PageHeader pageTitle={'Airspaces'} username={'John Doe'} />
                    <section className="flex relative w-full h-full justify-start items-start">
                        <div
                            className='absolute top-0 left-0 !w-full !h-full !m-0'
                            id='map'
                        />

                        <Explorer address={address} setAddress={setAddress} addresses={addresses} showOptions={showOptions} handleSelectAddress={handleSelectAddress} />
                        <Slider />
                        {showClaimModal && <ClaimModal onCloseModal={() => setShowClaimModal(false)} />}
                    </section>
                </div>
            </div >
        </ Fragment >
    )
}

export default Airspaces;
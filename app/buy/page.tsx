"use client";
import { Fragment, useState, useEffect } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import maplibregl from "maplibre-gl";
import PageHeader from "@/Components/PageHeader";
import Spinner from "@/Components/Spinner";
import Backdrop from "@/Components/Backdrop";
import Explorer from "@/Components/Rent/Explorer/Explorer";
import useAuth from "@/hooks/useAuth";
import { useMobile } from "@/hooks/useMobile";
import Head from "next/head";
import ZoomControllers from "@/Components/ZoomControllers";
import ExplorerMobile from "@/Components/Rent/Explorer/ExplorerMobile";
import RentModal from "@/Components/Rent/RentModal/RentModal";
import { getAddresses, goToAddress } from "@/utils/apiUtils/apiFunctions";
import { Coordinates, PropertyData } from "@/types";
import Sidebar from "@/Components/Shared/Sidebar";
import PropertiesService from "../../services/PropertiesService";
import {
  AuctionExplorer,
  AuctionExplorerMobile,
  AuctionSearchMobile,
} from "@/Components/Buy";
import { handleMouseEvent } from "@/utils/eventHandlerUtils/eventHandlers";
import { drawPolygons } from "@/utils/maputils";
import BidDetails from "@/Components/Buy/BidDetail/BidDetail";

const DUMMY_AUCTIONS = [
  {
    name: "Trentino USA",
    highest_bid: "$20",
    time_left: "2 days",
  },
  {
    name: "Trentino NG",
    highest_bid: "$20",
    time_left: "2 days",
  },
  {
    name: "Trentino Italy",
    highest_bid: "$20",
    time_left: "2 days",
  },
  {
    name: "Trentino Spain",
    highest_bid: "$20",
    time_left: "2 days",
  },
  {
    name: "Trentino Canada",
    highest_bid: "$20",
    time_left: "2 days",
  },
  {
    name: "Trentino UK",
    highest_bid: "$20",
    time_left: "2 days",
  },
];

const DUMMY_AUCTIONS_2 = [
  {
    address: "50, California Street, Financial District",
    id: 8,
    name: "My first Airspace",
    highestBid: "$20",
    timeLeft: "1min 	2sec",
    latitude: 37.79,

    longitude: -122.4,
    area: [
      [-121.977199, 38.975108],
      [-122.105019, 39.995138],
      [-122.078486, 37.017605],
      [-119.083333, 37.017605],
      [-118.977199, 39.975108],
    ],
  },
  {
    address: "50, California Street, Financial District",
    id: 8,
    name: "My Second Airspace",
    highestBid: 123,
    timeLeft: "1min 	2sec",
    latitude: 47.79,

    longitude: -122.4,
    area: [
      [-108.977199, 46.975108],
      [-102.105019, 45.995138],
      [-102.078486, 47.017605],
      [-109.083333, 47.017605],
      [-108.977199, 50.975108],
    ],
  },
  {
    address: "50, California Street, Financial District",
    id: 8,
    name: "My Second Airspace",
    highestBid: 123,
    timeLeft: "1min 	2sec",
    latitude: 27.79,

    longitude: -122.4,
    area: [
      [-108.977199, 27.975108],
      [-102.105019, 26.995138],
      [-102.078486, 27.017605],
      [-109.083333, 27.017605],
      [-108.977199, 20.975108],
    ],
  },
  {
    address: "50, California Street, Financial District",
    id: 8,
    name: "My Second Airspace",
    highestBid: 123,
    timeLeft: "1min 	2sec",
    latitude: 17.79,

    longitude: -122.4,
    area: [
      [-108.977199, 17.975108],
      [-102.105019, 18.995138],
      [-102.078486, 17.017605],
      [-109.083333, 17.017605],
    ],
  },
];

const Rent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAuctions = DUMMY_AUCTIONS.filter((auction) =>
    auction.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingAddresses, setLoadingAddresses] = useState<boolean>(false);
  const [loadingRegAddresses, setLoadingRegAddresses] =
    useState<boolean>(false);
  const [map, setMap] = useState<Map | null>(null);
  const { isMobile } = useMobile();
  const [registeredAddress, setRegisteredAddress] = useState<PropertyData[]>(
    []
  );
  const [mapMove, setMapMove] = useState();
  const [address, setAddress] = useState<string>("");
  const [addressData, setAddressData] = useState<
    | { mapbox_id: string; short_code: string; wikidata: string }
    | null
    | undefined
  >();
  const [addresses, setAddresses] = useState<
    { id: string; place_name: string }[]
  >([]);
  const [flyToAddress, setFlyToAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [marker, setMarker] = useState<Marker | null | undefined>();
  const [rentData, setRentData] = useState<PropertyData | undefined>();
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false);
  const { user } = useAuth();
  const [regAdressShow, setRegAdressShow] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { findPropertiesByCoordinates } = PropertiesService();
  const [showBidDetail, setShowBidDetail] = useState(true);

  const customPopupStyles = `
.mapboxgl-popup-close-button {
  position:absolute;
  top:9px;
  right:11px;
  font-size:x-large;
}
.mapboxgl-popup {
  position:relative;
  background-color: #ffffff !important;
  z-index:100;
}
.mapboxgl-popup-content {
  font-family: 'Poppins', sans-serif !important;
  font-weight: 400 !important;
  padding: 0px !important;
  cursor: pointer;
  width: ${isMobile ? "321px" : "266px"};
}
.mapboxgl-popup-tip {
  display: none !important;
}
.mapboxgl-popup-content div {
  margin: 0px !important;
}
.mapboxgl-popup-anchor-top > .mapboxgl-popup-content {
  margin-top: 15px;
  display: none;
}
.mapboxgl-popup-anchor-top > .mapboxgl-popup-tip {
  display: none;
}
`;

  if (typeof document !== "undefined") {
    const styleElement = document.createElement("style");
    styleElement.textContent = customPopupStyles;
    document.head.appendChild(styleElement);
  } else {
    console.error("Cannot create style element: document is not defined.");
  }

  useEffect(() => {
    if (map) return;
    const createMap = () => {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-104.718243, 40.413869],
        zoom: 4,
        // attributionControl: false
      });

      newMap.on("load", function () {
        newMap.addLayer({
          id: "maine",
          type: "fill",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [],
              },
            },
          },
          layout: {},
          paint: {
            "fill-color": "#D20C0C",
          },
        });
      });

      let timeoutId;

      newMap.on("move", async (e) => {
        // setLoadingRegAddresses(true);

        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          let el = document.createElement("div");
          el.id = "markerWithExternalCss";
          let crds = e.target.getBounds();

          // const responseData = await findPropertiesByCoordinates({
          //   postData: {
          //     minLongitude: crds._sw.lng,
          //     minLatitude: crds._sw.lat,
          //     maxLongitude: crds._ne.lng,
          //     maxLatitude: crds._ne.lat,
          //   },
          // });

          // let formattedProperties = [];
          // if (responseData) {
          //   formattedProperties = responseData.filter((property) => {
          //     if (
          //       property.longitude >= crds._sw.lng &&
          //       property.longitude <= crds._ne.lng &&
          //       property.latitude >= crds._sw.lat &&
          //       property.latitude <= crds._ne.lat
          //     ) {
          //       return property;
          //     }
          //   });
          // }

          // setRegisteredAddress(formattedProperties);
          setLoadingRegAddresses(false);
          if (DUMMY_AUCTIONS_2.length > 0) {
            for (let i = 0; i < DUMMY_AUCTIONS_2.length; i++) {
              const lngLat = new mapboxgl.LngLat(
                DUMMY_AUCTIONS_2[i].longitude,
                DUMMY_AUCTIONS_2[i].latitude
              );
              //create markers here
              const marker = new maplibregl.Marker(el)
                .setLngLat(lngLat)
                .addTo(newMap);

              const markerElement = marker.getElement();

              if (markerElement && marker && newMap) {
                //add event listener for markers here
                handleMouseEvent(isMobile, markerElement, marker, newMap);
              }
              //draw polygon around the markers from the api of available
              drawPolygons(newMap, i, DUMMY_AUCTIONS_2[i]?.area);
            }
          }
        }, 3000);
      });

      setMap(newMap);
    };
    createMap();
  }, []);

  useEffect(() => {
    if (registeredAddress.length > 0) {
      setRegAdressShow(true);
    } else {
      setRegAdressShow(false);
    }
  }, [registeredAddress]);

  useEffect(() => {
    if (!showOptions) setShowOptions(true);
    if (!address) return setShowOptions(false);

    let timeoutId: NodeJS.Timeout | null = null;
    getAddresses(
      setAddresses,
      setCoordinates,
      setLoadingAddresses,
      timeoutId,
      address
    );
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [address]);

  useEffect(() => {
    if (!flyToAddress) return;
    goToAddress(
      flyToAddress,
      setCoordinates,
      setAddressData,
      setIsLoading,
      setMarker,
      map,
      marker
    );
  }, [flyToAddress, map]);

  useEffect(() => {
    if (flyToAddress === address) setShowOptions(false);
  }, [flyToAddress, address]);

  useEffect(() => {
    const inintialRentDataString = localStorage.getItem("rentData");
    const parsedInitialRentData = inintialRentDataString
      ? JSON.parse(inintialRentDataString)
      : null;
    if (parsedInitialRentData && parsedInitialRentData?.address?.length > 2) {
      setRentData(parsedInitialRentData);
      setFlyToAddress(parsedInitialRentData.address);
      setShowClaimModal(true);
    } else {
      console.log("no initial datta");
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>SkyTrade - Marketplace : Buy Airspace</title>
      </Head>

      {isLoading && <Backdrop onClick={() => {}} />}
      {isLoading && <Spinner />}
      {
        <div className="relative rounded bg-[#F6FAFF] h-screen w-screen flex items-center justify-center  overflow-hidden ">
          <Sidebar />

          <div className="w-full h-full flex flex-col">
            <div className="hidden md:block">
              <PageHeader
                pageTitle={
                  isMobile ? "Buy Airspace" : "Marketplace: Buy Airspace"
                }
              />
            </div>

            <AuctionSearchMobile
              searchTerm={searchTerm}
              setSearchTerm={(value: string) => setSearchTerm(value)}
            />
            {isMobile && (
              //   <ExplorerMobile
              //     loadingReg={loadingRegAddresses}
              //     loading={loadingAddresses}
              //     address={address}
              //     setAddress={setAddress}
              //     addresses={addresses}
              //     showOptions={showOptions}
              //     regAdressShow={regAdressShow}
              //     registeredAddress={registeredAddress}
              //     map={map}
              //     marker={marker}
              //     setMarker={setMarker}
              //     setShowClaimModal={setShowClaimModal}
              //     rentData={rentData}
              //     setRentData={setRentData}
              //     setFlyToAddress={setFlyToAddress}
              //     setShowOptions={setShowOptions}
              //     setLoadingRegAddresses={setLoadingRegAddresses}
              //     setRegisteredAddress={setRegisteredAddress}
              //   />
              <div></div>
            )}
            <section
              className={
                "relative flex w-full h-full justify-start items-start md:mb-0 mb-[79px] "
              }
            >
              <div
                className={"!absolute !top-0 !left-0 !m-0 !w-screen !h-screen"}
                id="map"
                style={{ zIndex: "10" }}
              />

              {!isMobile && (
                <div className="flex justify-start items-start">
                  {/* <Explorer
                    setLoadingRegAddresses={setLoadingRegAddresses}
                    loadingReg={loadingRegAddresses}
                    setRegisteredAddress={setRegisteredAddress}
                    loading={loadingAddresses}
                    address={address}
                    setAddress={setAddress}
                    addresses={addresses}
                    showOptions={showOptions}
                    regAdressShow={regAdressShow}
                    registeredAddress={registeredAddress}
                    map={map}
                    marker={marker}
                    setMarker={setMarker}
                    setShowClaimModal={setShowClaimModal}
                    rentData={rentData}
                    setRentData={setRentData}
                    setFlyToAddress={setFlyToAddress}
                    setShowOptions={setShowOptions}
                  /> */}
                  <AuctionExplorer data={DUMMY_AUCTIONS} />
                </div>
              )}
              {/* {showClaimModal && (
                <RentModal
                  setShowClaimModal={setShowClaimModal}
                  rentData={rentData}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              )} */}
              {/* <AuctionExplorerMobile data={filteredAuctions} /> */}

              {showBidDetail && (
                <BidDetails
                  address="50, California Street, Financial District"
                  highestBid={200.0}
                  timeLeft={"1min 	2sec"}
                  imageUrl={""}
                  yourBid={100}
                  onCloseModal={() => setShowBidDetail(false)}
                />
              )}
            </section>
            <div className="hidden sm:block">
              <ZoomControllers map={map} />
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
};

export default Rent;

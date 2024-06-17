"use client";
import { useMobile } from "@/hooks/useMobile";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import maplibregl, { Marker } from "maplibre-gl";
import { toast } from "react-toastify";
import axios from "axios";
import Head from "next/head";
import Backdrop from "@/Components/Backdrop";
import Spinner from "@/Components/Spinner";
import Sidebar from "@/Components/Shared/Sidebar";
import PageHeader from "@/Components/PageHeader";
import MarkerPopup from "@/Components/Buy/MarkerPopup";
import BidDetails from "@/Components/Buy/BidDetail/BidDetail";
import ReactDom from "next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.production";

const Test = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [map, setMap] = useState<any>(null);
  const { isMobile } = useMobile();
  const [showMobileMap, setShowMobileMap] = useState<boolean>(false);
  // variables
  const [address, setAddress] = useState<string>("");
  const [addresses, setAddresses] = useState([]);
  const [flyToAddress, setFlyToAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState({
    longitude: "",
    latitude: "",
  });
  const [marker, setMarker] = useState<Marker | mapboxgl.Marker | null>(null);
  const defaultData = {
    address: address,
    name: "",
    rent: true,
    sell: false,
    hasPlanningPermission: null,
    hasChargingStation: false,
    hasLandingDeck: false,
    hasStorageHub: false,
    sellingPrice: "0",
    timezone: "UTC+0",
    transitFee: "1-99",
    isFixedTransitFee: false,
    noFlyZone: false,
    weekDayRanges: [
      { fromTime: 9, toTime: 21, isAvailable: true, weekDayId: 0 },
      { fromTime: 9, toTime: 21, isAvailable: true, weekDayId: 1 },
      { fromTime: 0, toTime: 24, isAvailable: true, weekDayId: 2 },
      { fromTime: 0, toTime: 24, isAvailable: true, weekDayId: 3 },
      { fromTime: 0, toTime: 24, isAvailable: true, weekDayId: 4 },
      { fromTime: 0, toTime: 24, isAvailable: true, weekDayId: 5 },
      { fromTime: 0, toTime: 24, isAvailable: true, weekDayId: 6 },
    ],
  };
  // showing
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [data, setData] = useState({ ...defaultData });
  const searchParams = useSearchParams();
  const pathname = usePathname();

  //removes cached airspaceData when address is in coOrdinates
  useLayoutEffect(() => {
    const propertyAddress = searchParams?.get("propertyAddress");
    const geoLocation = searchParams?.get("geoLocation");

    if (propertyAddress || geoLocation) {
      localStorage.removeItem("airSpaceData");
    }
  }, [pathname]);

  const customPopupStyles = `
  .mapboxgl-popup-close-button {
    position:absolute;
    top:9px;
    right:11px;
    font-size:x-large;
  }
  .mapboxgl-popup {
    background-color: #ffffff !important;
    z-index:100;
  }
  .mapboxgl-popup-content {
    font-family: 'Poppins', sans-serif !important;
    font-weight: 400 !important;
    padding: 0px !important;
    width: ${!isMobile ? '266px' : '321px'};
    min-width:${!isMobile ? '266px' : '321px'};
    cursor: pointer;
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

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = customPopupStyles;
  document.head.appendChild(styleElement);
} else {
  console.error('Cannot create style element: document is not defined.');
}

  // new map is created if not rendered
  useEffect(() => {
    if (map) return;

    const createMap = () => {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-15.498211, 28.035056],
        zoom: 15,
        bounds: [
          [-73.9876, 40.7661],
          [-73.9397, 40.8002],
        ],
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

      setMap(newMap);
      const initialAirSpaceData = localStorage.getItem("airSpaceData");
      if (!initialAirSpaceData) {
        flyToUserIpAddress(newMap);
      }
    };
    createMap();
  }, []);

  //gets address suggestions
  useEffect(() => {
    if (!address) return setShowOptions(false);

    let timeoutId: NodeJS.Timeout;

    const getAddresses = async () => {
      setCoordinates({ longitude: "", latitude: "" });

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
          console.error(error);
        }
      }, 500);
    };

    getAddresses();

    return () => clearTimeout(timeoutId);
  }, [address]);

  //flies to the new address
  useEffect(() => {
    if (!flyToAddress) return;

    const goToAddress = async () => {
      try {
        setIsLoading(true);

        const mapBoxGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${flyToAddress}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`;

        const response = await fetch(mapBoxGeocodingUrl);

        if (!response.ok)
          throw new Error("Error while getting new address location");

        const data = await response.json();

        if (!data.features || data.features.length === 0) {
          throw new Error("Address not found");
        }

        const coordinates = data.features[0].geometry.coordinates;
        const endPoint: any = [coordinates[0], coordinates[1]];

        setCoordinates({ longitude: coordinates[0], latitude: coordinates[1] });
        setIsLoading(false);
        setAddress(data.features[0]?.place_name);

        map.flyTo({
          center: endPoint,
          zoom: 16,
        });

        if (marker) {
          marker.remove();
        }

        let el = document.createElement("div");
        el.id = "markerWithExternalCss";

        const newMarker = new maplibregl.Marker(el)
          .setLngLat(endPoint)
          .addTo(map);
        setMarker(newMarker);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        toast.error("invalid address");
      }
    };

    goToAddress();
  }, [flyToAddress, map]);

  const flyToUserIpAddress = async (map) => {
    if (!map) {
      return;
    }
    try {
      const ipResponse = await axios.get("https://api.ipify.org/?format=json");
      const ipAddress = ipResponse.data.ip;
      const ipGeolocationApiUrl = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_IPGEOLOCATION}&ip=${ipAddress}`
      );
      const latitude = parseFloat(ipGeolocationApiUrl.data.latitude);
      const longitude = parseFloat(ipGeolocationApiUrl.data.longitude);

      if (isNaN(latitude) || isNaN(longitude)) {
        return;
      }
      map.flyTo({
        center: [longitude, latitude],
        zoom: 15,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (!map) return;
    map.on("load", () => {
      map.addSource("myPolygon", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-108.977199, 40.975108],
                [-102.105019, 40.995138],
                [-102.078486, 37.017605],
                [-109.083333, 37.017605],
                [-108.977199, 40.975108],
              ],
            ],
          },
        },
      });

      map.addLayer({
        id: "myPolygonLayer",
        type: "fill",
        source: "myPolygon",
        paint: {
          "fill-color": "rgba(0, 0, 255, 0.5)",
          "fill-outline-color": "rgba(0, 0, 255, 0.5)",
        },
      });
    });
  }, [map]);
  const testCoordinate = [-105.604997408086, 39.1902459990462];
  useEffect(() => {
    if (!map) return;
    if (marker) {
      marker.remove();
    }
    const newMarker = new maplibregl.Marker()
      .setLngLat(testCoordinate)
      .addTo(map);
    setMarker(newMarker);
    
  }, [map]);

  useEffect(()=>{
    if(!map || !marker) return;
    const addEventListeners = (
      // markerElement: HTMLElement,
      marker:any
    ) => {
      
      const markerElement = marker.getElement();
      console.log(markerElement,"HELLO")
      // markerElement.classList.add(`test-marker-1`);
      if (!isMobile) {
        markerElement.addEventListener("mouseenter", () => {
          // showPopup(marker, popupName, "popup-hovered-class", map);
          // const elementToRemove = document.querySelector(`test`);
          // if (elementToRemove) elementToRemove.remove();

          const tooltipContent = ReactDom.renderToString(<MarkerPopup isMobile={isMobile} name={"guinfruoigài’çfjojvopijd"} highestBid={200.000} timeLeft={"2 min 07"}/>);

          new mapboxgl.Popup({
            closeOnClick: false,
            offset: [0, -20],
            className:'marker-popup-hovered-class'
          })
            .setLngLat(marker.getLngLat())
            .setHTML(tooltipContent)
            .addTo(map);
        });
        markerElement.addEventListener("mouseleave", () => {
          const elementToRemove = document.querySelector(
            ".marker-popup-hovered-class"
          );
          if (elementToRemove) elementToRemove.remove();
        });
      } 
      else {
        markerElement.addEventListener("touchend", (e) => {
          // showPopup(marker, popupName, "popup-clicked-class", map);
          const onClose = () =>{
            const elementToRemove = document.querySelector(
              ".marker-popup-hovered-class"
            );
            if (elementToRemove) elementToRemove.remove();
          }
          const tooltipContent = ReactDom.renderToString(<MarkerPopup isMobile={isMobile} name={"guinfruoigài’çfjojvopijd"} highestBid={200.000} timeLeft={"2 min 07"}/>);

          new mapboxgl.Popup({
            closeOnClick: false,
            offset: [0, -20],
            className:'marker-popup-hovered-class'
          })
            .setLngLat(marker.getLngLat())
            .setHTML(tooltipContent)
            .addTo(map);
        });
      }
    };
    if(marker){
      addEventListeners(marker)
    }
  },[map ,marker])
  return (
    <Fragment>
      <Head>
        <title>SkyTrade - Airspaces</title>
      </Head>
      {isLoading && <Backdrop />}
      {isLoading && <Spinner />}

      <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden rounded bg-[#F0F0FA]">
        <Sidebar />
        <div className="flex h-full w-full flex-col">
          <PageHeader pageTitle={"Market Place"} />
          <section
            className={`relative flex h-full w-full items-start justify-start md:mb-0 ${showMobileMap ? "" : "mb-[79px]"}`}
          >
            <div
              className={`!absolute !left-0 !top-0 !m-0 !h-screen !w-screen`}
              id="map"
              style={{
                opacity: "1",
                zIndex: "20",
              }}
            />
            <div style={{ zIndex: "30" }}>
              <div style={{width:'320px'}}>  

            {/* <MarkerPopup isMobile={isMobile} name={"guinfruoigài’çfjojvopijd"} highestBid={200.000} timeLeft={"2 min 07"}/> */}
              </div>
              <BidDetails />
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default Test;

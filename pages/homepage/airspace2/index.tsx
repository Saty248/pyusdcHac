import { Fragment, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import ZoomControllers from "@/Components/ZoomControllers";
import Sidebar from "@/Components/Sidebar";
import PageHeader from "@/Components/PageHeader";
import Spinner from "@/Components/Spinner";
import Backdrop from "@/Components/Backdrop";
import useAuth from "@/hooks/useAuth";
import { useMobile } from "@/hooks/useMobile";
import Head from "next/head";
import PropertiesService from "@/services/PropertiesService";
import { toast } from "react-toastify";
import ClaimModal from "@/Components/Airspace/ClaimModal";
import Explorer from "@/Components/Airspace/Explorer";
import ExplorerMobile from "@/Components/Airspace/ExplorerMobile";
import Slider from "@/Components/Airspace/Slider";
import HowToModal from "@/Components/Airspace/HowToModal";
import SuccessModal from "@/Components/Airspace/SuccessModal";
import PopUp from "@/Components/Airspace/PopUp";
import FailurePopUp from "@/Components/Airspace/FailurePopUp";
import {
  flyToUserIpAddress,
  getAddresses,
  goToAddress,
} from "@/utils/apiUtils/apiFunctions";
import { Coordinates } from "@/types";
import { claimAirspaceProperty } from "@/utils/propertyUtils/propertyUtils";
import MobileMapSection from "@/Components/Airspace/MobileMapSection";

const Airspaces = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [claimButtonLoading, setClaimButtonLoading] = useState(false);
  const [map, setMap] = useState(null);
  const { isMobile } = useMobile();
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [address, setAddress] = useState("");
  const [addressData, setAddressData] = useState<any>();
  const [addresses, setAddresses] = useState([]);
  const [flyToAddress, setFlyToAddress] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [marker, setMarker] = useState();
  const defaultData = {
    address: flyToAddress,
    title: "",
    isRentableAirspace: true,
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
      { fromTime: 9, toTime: 21, isAvailable: false, weekDayId: 0 },
      { fromTime: 9, toTime: 21, isAvailable: false, weekDayId: 1 },
      { fromTime: 0, toTime: 24, isAvailable: false, weekDayId: 2 },
      { fromTime: 0, toTime: 24, isAvailable: false, weekDayId: 3 },
      { fromTime: 0, toTime: 24, isAvailable: false, weekDayId: 4 },
      { fromTime: 0, toTime: 24, isAvailable: false, weekDayId: 5 },
      { fromTime: 0, toTime: 24, isAvailable: false, weekDayId: 6 },
    ],
  };
  // showing
  const [showOptions, setShowOptions] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [showFailurePopUp, setShowFailurePopUp] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [data, setData] = useState({ ...defaultData });
  // database
  const { user } = useAuth();
  const { claimProperty } = PropertiesService();
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
      flyToUserIpAddress(newMap);
    };
    createMap();
  }, []);

  useEffect(() => {
    if (!showOptions) setShowOptions(true);
    if (!address) return setShowOptions(false);
    let timeoutId: NodeJS.Timeout | null = null;
    getAddresses(setAddresses, setCoordinates, timeoutId, address);
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
    if (flyToAddress) setData((prev) => ({ ...prev, address: flyToAddress }));
  }, [flyToAddress, address]);

  useEffect(() => {
    if (!showSuccessPopUp) return;
    const timeoutId = setTimeout(() => {
      setShowSuccessPopUp(false);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [showSuccessPopUp]);

  useEffect(() => {
    if (!showFailurePopUp) return;
    const timeoutId = setTimeout(() => {
      setShowFailurePopUp(false);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [showFailurePopUp]);
  //will take out later

  const handleSelectAddress = (placeName) => {
    setAddress(placeName);
    setFlyToAddress(placeName);
    setShowOptions(false);
  };

  const onClaim = async () => {
    await claimAirspaceProperty(
      claimProperty,
      data,
      coordinates,
      user,
      setShowFailurePopUp,
      setShowSuccessPopUp,
      setShowClaimModal,
      setIsLoading,
      setData,
      setClaimButtonLoading,
      toast,
      defaultData
    );
  };
  return (
    <Fragment>
      <Head>
        <title>SkyTrade - Airspaces</title>
      </Head>
      {isLoading && <Backdrop />}
      {isLoading && <Spinner />}

      <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden rounded bg-[#F0F0FA]">
        {!showMobileMap && <Sidebar />}
        <div className="flex h-full w-full flex-col">
          {!showMobileMap && <PageHeader pageTitle={"Airspaces"} />}
          {showMobileMap && isMobile && (
            <ExplorerMobile
              onGoBack={() => setShowMobileMap(false)}
              flyToAddress={flyToAddress}
              address={address}
              setAddress={setAddress}
              addresses={addresses}
              showOptions={showOptions}
              handleSelectAddress={handleSelectAddress}
              onClaimAirspace={() => {
                setShowClaimModal(true);
                setIsLoading(true);
              }}
            />
          )}
          {showHowToModal && (
            <HowToModal goBack={() => setShowHowToModal(false)} />
          )}
          <section
            className={`relative flex h-full w-full items-start justify-start md:mb-0 ${showMobileMap ? "" : "mb-[79px]"}`}
          >
            <div
              className={`!absolute !left-0 !top-0 !m-0 !h-screen !w-screen`}
              id="map"
              style={{
                opacity: !isMobile ? "1" : showMobileMap ? "1" : "0",
                zIndex: !isMobile ? "20" : showMobileMap ? "20" : "-20",
              }}
            />
            {isMobile && showMobileMap && flyToAddress && (
              <div
                onClick={() => {
                  setShowClaimModal(true);
                  setIsLoading(true);
                }}
                className="absolute bottom-2 left-1/2 z-[25] w-[90%] -translate-x-1/2 cursor-pointer rounded-lg bg-[#0653EA] py-[16px] text-center text-[15px] font-normal text-white"
              >
                Claim Airspace
              </div>
            )}
            {isMobile && (
              <Fragment>
                {showClaimModal && (
                  <ClaimModal
                    onCloseModal={() => {
                      setShowClaimModal(false);
                      setIsLoading(false);
                    }}
                    data={data}
                    setData={setData}
                    onClaim={onClaim}
                    claimButtonLoading={claimButtonLoading}
                  />
                )}
                {(showSuccessPopUp || showFailurePopUp) && (
                  <SuccessModal
                    isSuccess={showSuccessPopUp}
                    closePopUp={() => {
                      showFailurePopUp
                        ? setShowFailurePopUp(false)
                        : setShowSuccessPopUp(false);
                    }}
                  />
                )}
              </Fragment>
            )}
            {!isMobile && (
              <div className="flex items-start justify-start">
                <Explorer
                  flyToAddress={flyToAddress}
                  address={address}
                  setAddress={setAddress}
                  addresses={addresses}
                  showOptions={showOptions}
                  handleSelectAddress={handleSelectAddress}
                  onClaimAirspace={() => {
                    setShowClaimModal(true);
                    setIsLoading(true);
                  }}
                />
                <Slider />
                <PopUp isVisible={showSuccessPopUp} />
                <FailurePopUp isVisible={showFailurePopUp} />

                {showClaimModal && (
                  <ClaimModal
                    onCloseModal={() => {
                      setShowClaimModal(false);
                      setIsLoading(false);
                    }}
                    data={data}
                    setData={setData}
                    onClaim={onClaim}
                    claimButtonLoading={claimButtonLoading}
                  />
                )}
              </div>
            )}
            <MobileMapSection setShowHowToModal={setShowHowToModal}/>
            <div className="hidden sm:block">
              <ZoomControllers map={map} />
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};
export default Airspaces;
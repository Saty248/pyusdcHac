import { useContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import AirspaceRentalService from "@/services/AirspaceRentalService";
import { PropertyData } from "@/types";
import { Web3authContext } from "@/providers/web3authProvider";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setAirspaceList } from "@/redux/slices/userSlice";

export enum PortfolioTabEnum {
  VERIFIED,
  UNVERIFIED,
  REJECTED,
  RENTED,
}

const useAuction = () => {
  const { airspaceList } = useAppSelector((state) => {
    const { airspaceList } = state.userReducer;
    return { airspaceList };
  });

  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<PortfolioTabEnum>(
    PortfolioTabEnum.VERIFIED
  );
  const { user } = useAuth();
  const { web3auth } = useContext(Web3authContext);

  const {
    getPropertiesByUserAddress,
    getUnverifiedAirspaces,
    getRejectedAirspaces,
  } = AirspaceRentalService();

  useEffect(() => {
    (async () => {
      try {
        if (web3auth && web3auth?.status !== "connected") return;

        setLoading(true);
        const assetId = airspaceList.length > 0 ? airspaceList.at(-1)?.id : "";

        const airspaces = await getPropertiesByUserAddress(
          user?.blockchainAddress,
          "landToken",
          10,
          String(assetId)
        );
        console.log({ airspaces });

        dispatch(setAirspaceList(airspaces));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [web3auth?.status, pageNumber]);

  const handleNextPage = () => {
    if (airspaceList?.length < 9) return;
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePrevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  return {
    activeTab,
    loading,
    airspaceList,
    pageNumber,
    handlePrevPage,
    handleNextPage,
  };
};

export default useAuction;

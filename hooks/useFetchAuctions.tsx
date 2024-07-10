import { Web3authContext } from "@/providers/web3authProvider";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import MarketplaceService from "@/services/MarketplaceService";
import { AuctionDataI } from "@/types";
import { useState, useEffect, useContext } from "react";

const useFetchAuctions = (initialPage: number = 1, limit: number = 10,searchParam="" ) => {
  const { isTriggerRefresh } = useAppSelector((state) => {
    const { isTriggerRefresh } = state.userReducer;
    return { isTriggerRefresh };
  });
  const { getAuctions , searchAuctions } = MarketplaceService();
  const [auctions, setAuctions] = useState<AuctionDataI[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { web3auth } = useContext(Web3authContext);

  const fetchData = async () => {
    try {
      setLoading(true);
      let response;
      if(searchParam === "" || searchParam === undefined || searchParam === null){
         response = await getAuctions(page, limit);
      }
      else{
         response = await searchAuctions(page,limit,searchParam)
      }
      const newData = response.data;
      setAuctions((prevData) =>
        page === 1 ? newData : [...prevData, ...newData]
      );
      setHasMore(newData.length === limit);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [web3auth?.status, page, isTriggerRefresh,searchParam]);

  return { loading, page, auctions, hasMore, setPage };
};

export default useFetchAuctions;

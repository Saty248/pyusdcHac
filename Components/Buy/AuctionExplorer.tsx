import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "../Shared/Icons";
import AuctionCard from "./AuctionCard";
import { AuctionDataI, AuctionPropertyI } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsCreateAuctionModalOpen } from "@/redux/slices/userSlice";
import useFetchAuctions from "@/hooks/useFetchAuctions";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner } from "../Icons";
import Spinner from "../Spinner";
import MarketplaceService from "@/services/MarketplaceService";
interface AuctionExplorerProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  auctions: AuctionDataI[] | null;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasMorePage: boolean;
  loading: boolean;
  setShowBidDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setAuctionDetailData: React.Dispatch<React.SetStateAction<AuctionDataI>>;
}

const AuctionExplorer: React.FC<AuctionExplorerProps> = ({
  setSearchTerm,
  auctions,
  setPage,
  hasMorePage,
  loading,
  setShowBidDetail,
  setAuctionDetailData,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const { isCreateAuctionModalOpen } = useAppSelector((state) => {
    const { isCreateAuctionModalOpen } = state.userReducer;
    return { isCreateAuctionModalOpen };
  });

  const dispatch = useAppDispatch();
  // const { loading } = useFetchAuctions();
  // let filteredAuctions = data;
  // if(data?.length>0){
  //   const filteredAuctions = data.filter((auction) =>
  //     auction?.properties[0]?.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }

  const handleShowBidDetail = (item) => {
    setShowBidDetail(true);
    setAuctionDetailData(item);
  };
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleSearchAuctions = () => {
    setSearchTerm(searchValue);
  };

  return (
    <>
      <div className="hidden md:block w-[518px] h-[668px] z-20 bg-white m-8 rounded-[30px] p-6 shadow-md overflow-hidden ">
        <div>
          <div className="text-[18px] font-semibold text-center py-4">
            SkyMarket Hub
          </div>
          <div className="text-[14px]">
            Explore and Own Low-Altitude Airspaces, Your Gateway to Aerial
            Freedom.
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4">
          <div>
            <button
              onClick={() => dispatch(setIsCreateAuctionModalOpen(true))}
              // onClick={async () => await handleGetAuctions()}
              className="text-base bg-dark-blue py-2 w-full text-white rounded-lg"
            >
              Create Auction
            </button>
          </div>
          <div className="flex justify-between items-center w-full border rounded-lg overflow-hidden p-2">
            <input
              placeholder="Search auctions..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? handleSearchAuctions() : ""
              }
              className="focus:outline-none w-10/12 text-[14px]"
            />
            <div className="w-4 h-4">
              <button onClick={handleSearchAuctions}>
                <MagnifyingGlassIcon />
              </button>
            </div>
          </div>
          <div
            id="scrollableDiv"
            className="h-[410px] overflow-y-auto thin-scrollbar"
          >
            {" "}
            {loading ? (
              <div className="w-full h-2/3 flex justify-center items-center">
                <div className="flex flex-col gap-4">
                  <Spinner />
                  <div className="animate-pulse">Fetching Auctions...</div>
                </div>
              </div>
            ) : (
              <>
                {!loading && auctions && auctions?.length > 0 ? (
                  <InfiniteScroll
                    dataLength={auctions.length}
                    next={handleLoadMore}
                    hasMore={hasMorePage}
                    loader={undefined}
                    scrollableTarget="scrollableDiv"
                    className={`w-full grid ${auctions?.length>5 ? "grid-cols-2" : "grid-cols-1"} gap-4 mb-4`}
                  >
                    {auctions
                      .slice()
                      .reverse()
                      .map((item, index) => (
                        <div
                          key={index}
                          // onClick={() => handleShowBidDetail(item)}
                        >
                          <AuctionCard data={item} handleShowBidDetail={handleShowBidDetail}/>
                        </div>
                      ))}
                  </InfiniteScroll>
                ) : (
                  <div className="text-center col-span-2 text-light-grey">
                    No auctions found
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionExplorer;

import { AuctionDataI, AuctionPropertyI } from "@/types";
import { useState } from "react";
import AuctionCard from "./AuctionCard";
import CreateAuctionModal from "./CreateAuctionModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsCreateAuctionModalOpen } from "@/redux/slices/userSlice";
import useFetchAuctions from "@/hooks/useFetchAuctions";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner";

interface AuctionExplorerMobileProps {
  auctions: AuctionDataI[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasMorePage: boolean;
  loading: boolean;
  setShowBidDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setAuctionDetailData: React.Dispatch<React.SetStateAction<AuctionDataI>>;
}

const AuctionExplorerMobile: React.FC<AuctionExplorerMobileProps> = ({
  auctions,
  setPage,
  hasMorePage,
  loading,
  setShowBidDetail,
  setAuctionDetailData,
}) => {
  const [toggleTray, setToggleTray] = useState(false);
  const handleTrayToggle = (item) => {
    setToggleTray(false);
    setShowBidDetail(true);
    setAuctionDetailData(item);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="md:hidden fixed bottom-[74px] left-0 w-full z-20 bg-white p-4  text-center rounded-t-[30px]">
        <div
          onClick={() => setToggleTray(!toggleTray)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <div className="w-16 animate-pulse h-2 rounded-3xl bg-light-grey"></div>
          <h4>{auctions?.length} Airspaces available</h4>
        </div>
        {toggleTray && (
          <div
            id="scrollableDiv"
            className="h-[450px] overflow-y-auto flex flex-col items-center gap-4 mt-6"
          >
            {" "}
            {loading && (
              <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col gap-4">
                  <Spinner />
                  <div className="animate-pulse">Fetching Auctions...</div>
                </div>
              </div>
            )}
            {!loading && auctions && auctions?.length > 0 && (
              <InfiniteScroll
                dataLength={auctions.length}
                next={handleLoadMore}
                hasMore={hasMorePage}
                loader={undefined}
                scrollableTarget="scrollableDiv"
              >
                {auctions.length > 0 ? (
                  auctions
                    .slice()
                    .reverse()
                    .map((item, index) => (
                      <div className="mx-auto mb-[15px]" key={index}>
                        <AuctionCard
                          data={item}
                          handleShowBidDetail={handleTrayToggle}
                        />
                      </div>
                    ))
                ) : (
                  <div className="text-center col-span-2 text-light-grey">
                    No auctions found
                  </div>
                )}
              </InfiniteScroll>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AuctionExplorerMobile;

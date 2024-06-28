import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "../Shared/Icons";
import AuctionCard from "./AuctionCard";
import { AuctionPropertyI } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsCreateAuctionModalOpen } from "@/redux/slices/userSlice";
import CreateAuctionModa from "./CreateAuctionModal";
import CreateAuctionModal from "./CreateAuctionModal";
import MarketplaceService from "@/services/MarketplaceService";

interface AuctionExplorerProps {
  data: AuctionPropertyI[];
  handleShowBidDetail: () => void;
}

const AuctionExplorer: React.FC<AuctionExplorerProps> = ({
  data,
  handleShowBidDetail,
}) => {
  const { isCreateAuctionModalOpen } = useAppSelector((state) => {
    const { isCreateAuctionModalOpen } = state.userReducer;
    return { isCreateAuctionModalOpen };
  });

  const { getAuctions } = MarketplaceService();

  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAuctions = data.filter((auction) =>
    auction.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGetAuctions = async () => {
    console.log("getting...");
    const data = await getAuctions();
    console.log({ data });
  };

  useEffect(() => {
    const fetchAuction = async () => {
      const result = await handleGetAuctions();
    };
    fetchAuction();
  }, []);

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:outline-none w-10/12 text-[14px]"
            />

            <div className="w-4 h-4">
              <MagnifyingGlassIcon />
            </div>
          </div>
          <div className="h-[410px] overflow-y-auto thin-scrollbar">
            {" "}
            <div className="grid grid-cols-2 gap-4">
              {filteredAuctions?.length > 0 ? (
                filteredAuctions.map((item, index) => (
                  <div key={index} onClick={handleShowBidDetail}>
                    <AuctionCard data={item} />
                  </div>
                ))
              ) : (
                <div className="text-center col-span-2 text-light-grey">
                  No auctions found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionExplorer;

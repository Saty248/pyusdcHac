import { AuctionDataI } from "@/types";
import { IoClose } from "react-icons/io5";

interface BidsViewModal {
  onClose: () => void;
  auctionDetailData: AuctionDataI | undefined;
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
};

const BidsViewModal: React.FC<BidsViewModal> = ({
  onClose,
  auctionDetailData,
}) => {
  // Sort bids by bidOffer in descending order
  const sortedBids = auctionDetailData?.bids.sort(
    (a, b) => b.bidOffer - a.bidOffer
  );

  return (
    <div
      style={{
        zIndex: 55,
      }}
      className="fixed inset-0 z-50 flex items-start pt-32 justify-center mx-4 bg-[#294B63] bg-opacity-50 backdrop-blur-[2px]"
    >
      <div className="w-[400px] h-64 bg-white rounded-xl relative p-4 ">
        <div
          onClick={onClose}
          className="absolute right-[0.5rem] top-[0.5rem] cursor-pointer"
        >
          <IoClose className="w-4 h-4" />
        </div>
        <div className="flex items-center w-full border-b pb-2">
          <div className="w-1/2 text-center">Bidder</div>
          <div className="w-1/2 text-center">Offer ($)</div>
        </div>

        {sortedBids && sortedBids.length > 0 ? (
          sortedBids?.map((bid, index) => (
            <div key={bid.bidder} className="flex items-center w-full px-4">
              <div className="flex items-center gap-2 py-1 w-2/3 text-sm text-center">
                <div>
                  {index === 0 ? (
                    <span className="inline-block animate-pulse w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ) : (
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2 shadow-md"></span>
                  )}
                </div>
                <div>{shortenAddress(bid.bidder)}</div>
              </div>
              <div className="flex flex-col gap-4 py-1 w-1/3 text-sm text-center">
                <div>{bid.bidOffer}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[14px] leading-[26px] mt-4 text-[#727272] text-center italic">
            No Bids were placed during this event
          </p>
        )}
      </div>
    </div>
  );
};

export default BidsViewModal;

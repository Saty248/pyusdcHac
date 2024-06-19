import { AuctionPropertyI } from "@/types";
import { useState } from "react";
import AuctionCard from "./AuctionCard";

interface BuyExplorerMobileProps {
  data: AuctionPropertyI[];
  handleShowBidDetail:() => void;
}

const BuyExplorerMobile: React.FC<BuyExplorerMobileProps> = ({ data,handleShowBidDetail }) => {
  const [toggleTray, setToggleTray] = useState(false);
  const handleTrayToggle = () =>{
    setToggleTray(false)
    handleShowBidDetail()
  }
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-20 bg-white p-4 shadow-md text-center rounded-t-[30px]">
      <div
        onClick={() => setToggleTray(!toggleTray)}
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className="w-16 animate-pulse h-2 rounded-3xl bg-light-grey"></div>
        <h4>{data.length} Airspaces available</h4>
      </div>

      {toggleTray && (
        <div className="h-[450px] overflow-y-auto flex flex-col items-center gap-4 mt-6">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div className="mx-auto" key={index} onClick={handleTrayToggle}>
                <AuctionCard data={item} />
              </div>
            ))
          ) : (
            <div className="text-center mt-16 text-light-grey">
              No auctions found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuyExplorerMobile;

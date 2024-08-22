import { AuctionDataI } from "@/types";
import { getMapboxStaticImage, getTimeLeft } from "@/utils/marketplaceUtils";

import Carousel from "../Shared/Carousel";
interface AuctionCardProps {
  data: AuctionDataI;
  handleShowBidDetail:Function;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ data ,handleShowBidDetail}) => {
  const endDate = new Date(data?.endDate);
  const timeLeft = getTimeLeft(endDate);

  const getStatus = (endDate) => {
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <div>Complete</div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
          <div>Ongoing</div>
        </div>
      );
    }
  };
console.log(data,"helo test data")
  const { latitude, longitude, title } = data?.properties[0] || {};
  const images = [{ "image_url": "/images/imagetest1.jpg" },
  { "image_url": "/images/imagetest2.jpg" },
  { "image_url": "/images/imagetest3.jpg" }]

  const imageUrl = getMapboxStaticImage(latitude, longitude);
  images[0] = {image_url:imageUrl};
  return (
    <div className="w-[350px] md:w-full h-[278px] rounded-lg shadow-md overflow-hidden" style={{ boxShadow: "0px 4px 10px 0px #0000001a" }}>
      <div className="relative w-full h-[130px]">
      <Carousel images={images} />
      </div>
      <div className="px-4 py-2 flex flex-col items-start">
        <div className="text-sm text-black font-bold flex items-center justify-between w-full">
          Name
          <div className="text-xs text-[#727272]">{getStatus(endDate)}</div>
        </div>
        <div className="text-sm text-[#727272] truncate w-[95%] text-left">
          {title}
        </div>
      </div>

      <div className="flex justify-between px-4 pb-2 bg-[#4285F4]/5 pt-1">
        <div className="flex flex-col items-start">
          <div className="text-sm text-[#727272]">Highest Bid</div>
          <div className="text-sm text-black font-bold">${data.highestBid}</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-[#727272]">Time Left</div>
          <div className="text-sm text-black font-bold">{timeLeft}</div>
        </div>
      </div>
      <div className="flex justify-center px-[15px] py-[10px] h-[51px]">
      <div className=" bg-[#0653EA] w-full flex items-center rounded-lg h-[31px]">
      <button onClick={()=>handleShowBidDetail(data)} className="w-full text-white text-[14px] leading-[21px]">Place Bid</button>
      </div>

      </div>
    </div>
  );
};

export default AuctionCard;

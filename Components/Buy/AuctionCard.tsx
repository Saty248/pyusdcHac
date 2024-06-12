import { AuctionPropertyI } from "@/types";
import Image from "next/image";

interface AuctionCardProps {
  data: AuctionPropertyI;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ data }) => {
  return (
    <div className="w-[350px] md:w-full h-[227px] rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-[130px]">
        <Image
          className="w-full h-[130px] bg-contain"
          width={220}
          height={130}
          src={"/images/map.png"}
          alt={""}
        />
      </div>
      <div className="px-4 py-2 flex flex-col items-start">
        <div className="text-[12px] text-black font-bold">Name</div>
        <div className="text-[12px] text-[#727272]">{data.name}</div>
      </div>
      <div className="flex justify-between px-4 pb-2 bg-[#4285F4]/5 pt-1">
        <div className="flex flex-col items-start">
          <div className="text-[12px] text-[#727272]">Highest Bid</div>
          <div className="text-[12px] text-black font-bold">
            {data.highest_bid}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[12px] text-[#727272]">Time Left</div>
          <div className="text-[12px] text-black font-bold">
            {data.time_left}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;

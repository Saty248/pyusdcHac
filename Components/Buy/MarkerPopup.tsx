import React from "react";
import Image from "next/image";
import { getMapboxStaticImage, getTimeLeft } from "@/utils/marketplaceUtils";
import { AuctionDataI } from "@/types";
import Carousel from "../Shared/Carousel";

interface MarkerPopupProps {
  auction: AuctionDataI;
  setShowBidDetail: Function;
  setAuctionDetailData: Function;
}

const MarkerPopup: React.FC<MarkerPopupProps> = ({
  auction,
  setShowBidDetail,
  setAuctionDetailData,
}) => {
  const endDate = new Date(auction?.endDate);
  const timeLeft = getTimeLeft(endDate);
  const { latitude, longitude, title } = auction?.layer?.property || {};
  const imageUrl = getMapboxStaticImage(latitude, longitude);
  const handleShowBidDetail = (item) => {
    setShowBidDetail(true);
    setAuctionDetailData(item);
  };
  const images = [
    { image_url: "/images/imagetest1.jpg" },
    { image_url: "/images/imagetest2.jpg" },
    { image_url: "/images/imagetest3.jpg" },
  ];
  images[0] = { image_url: imageUrl };

  return (
    <div
      className={
        " relative bg-white rounded-[5px] flex flex-row w-[321px] sm:w-[266px] h-[151px] sm:h-auto sm:flex sm:flex-col "
      }
    >
      <div className={" w-1/2 sm:w-[266px] relative h-[151px]"}>
        <Carousel images={images} />
      </div>
      <div
        className={"w-1/2 h-[151px] sm:w-[266px] flex flex-col justify-between"}
      >
        <div>
          <div className="px-[15px] py-[5px] bg-white w-full">
            <h1 className="text-[14px] font-semibold leading-5 ">Name</h1>
            <p className="text-xs leading-[26px] text-[#727272] truncate w-[98%]">
              {auction?.layer?.property?.title}
            </p>
          </div>
          <div className="flex justify-between items-center flex-end h-[46px] px-[15px] w-full bg-[#4285F4]/5 ">
            <div className="flex flex-col ">
              <p className="text-xs  text-[#727272]">Highest Bid</p>
              <h1 className="text-xs  font-bold text-[#050505]">
                $ {auction?.currentPrice}
              </h1>
            </div>
            <div className="flex flex-col">
              <p className="text-xs  text-[#727272]">Time left</p>
              <h1 className="text-xs  font-bold text-[#050505]">{timeLeft}</h1>
            </div>
          </div>
        </div>
        <div className="w-full rounded-b-[5px] px-[15px] py-[10px] h-[51px] flex justify-center items-center">
          <button
            onClick={() => handleShowBidDetail(auction)}
            className="flex justify-center items-center h-[31px] text-center text-[14px] leading-[21px] text-white w-full rounded-lg border-[#4285F4] bg-[#0653EA] px-[10px] py-[10px]"
          >
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkerPopup;

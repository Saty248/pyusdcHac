import React from "react";
import Image from "next/image";
import Image1 from "../../public/images/AHImage.png";
interface MarkerPopupProps{
  name:string;
  highestBid:number;
  timeLeft:string;
}

const MarkerPopup:React.FC<MarkerPopupProps> = ({name,highestBid,timeLeft}) => {
  return (
    <div className={" relative bg-white rounded-[5px] flex flex-row w-[321px] sm:w-[266px] h-[130px] sm:h-auto sm:flex sm:flex-col "}>
      <div className={"w-1/2 sm:w-[266px] relative h-[130px]"}>
          <Image src={Image1} alt="test"
          layout="fill"
          objectFit="cover" />
      </div>
      <div className={"w-1/2 h-[130px] sm:w-[266px] flex flex-col justify-between"}>
        <div className="px-[15px] py-[5px] bg-white w-full">
          <h1 className="text-[14px] font-semibold leading-5 ">Name</h1>
          <p className="text-xs leading-[26px] text-[#727272]">
            {name}
          </p>
        </div>
        <div className="flex justify-between flex-end px-[15px] py-[10px] w-full bg-[#4285F4]/5 ">
          <div className="flex flex-col ">
            <p className="text-xs  text-[#727272]">Highest Bid</p>
            <h1 className="text-xs  font-bold text-[#050505]">$ {highestBid}</h1>
          </div>
          <div className="flex flex-col ">
            <p className="text-xs  text-[#727272]">Time left</p>
            <h1 className="text-xs  font-bold text-[#050505]">{timeLeft}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerPopup;

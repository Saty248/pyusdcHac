import React from "react";
import {  CloseIcon } from "@/Components/Icons";

interface BidAirspaceHeaderProps {
  onCloseModal: () => void;
}

const BidAirspaceHeader: React.FC<BidAirspaceHeaderProps> = ({ onCloseModal }) => {
  return (
    <div className="relative flex items-center gap-[20px] md:p-0">
      <div className="flex justify-center items-center w-[95%] gap-2 ">
        <h2 className="text-[#222222] text-center font-medium text-xl">
        Airspace Name
        </h2>
      </div>

      <div
        onClick={onCloseModal}
        className="hidden md:block absolute top-0 right-0 w-[15px] h-[15px] ml-auto cursor-pointer"
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default BidAirspaceHeader;

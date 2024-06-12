import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { MagnifyingGlassIcon } from "../Shared/Icons";
import { GiSettingsKnobs } from "react-icons/gi";
import { FiPlus } from "react-icons/fi";

interface AuctionSearchMobileProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const AuctionSearchMobile: React.FC<AuctionSearchMobileProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="md:hidden fixed top-0 left-0 w-full z-20 bg-white p-4 shadow-md text-center">
      <div className="flex items-center justify-between gap-2">
        <IoArrowBack />
        <div className="flex justify-between items-center border rounded-lg overflow-hidden p-2">
          <input
            placeholder="Search auctions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none min-w-[200px] text-[14px]"
          />

          <div className="w-4 h-4">
            <MagnifyingGlassIcon />
          </div>
        </div>
        <GiSettingsKnobs />
        <div className="p-2 bg-dark-blue rounded-lg">
          <FiPlus className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default AuctionSearchMobile;

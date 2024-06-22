// components/ActivitiesList.tsx

import { ArrowLeftIcon, InfoIcon } from '@/Components/Icons';
import { CloseIcon } from '@/Components/Shared/Icons';
import { useMobile } from '@/hooks/useMobile';
import React, { useState } from 'react';

interface ActivitiesListProps {
  onBack: () => void;
}

const ActivitiesList: React.FC<ActivitiesListProps> = ({ onBack }) => {
  const { isMobile } = useMobile();
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  return (
    <div>
    {isMobile ? (
      <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
      <div className="flex items-center mb-4">
        <div className="flex px-4  items-center justify-between py-5  w-full text-[#222222] bg-white" style={{ boxShadow: "0px 2px 12px 0px #00000014" }}>
          <button onClick={onBack} className="mr-2 h-6 w-6">
            <ArrowLeftIcon/>
           </button>
            <p className="md:text-2xl text-xl font-normal md:font-medium mx-auto md:m-0">
            Use my SKY Points
            </p>
            </div>
      </div>
      <div className="px-8 py-5">
      <div className="grid grid-col gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="bg-gray-200 h-[66px] flex-1 flex items-center justify-center">
            {index + 1}
          </div>
        ))}
      </div>
    </div>

    </div>
    ):(
      <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-6 w-[60%] max-h-full bg-white z-50 rounded-3xl"
      style={{ boxShadow: "0px 2px 12px 0px #00000014" }}>
      <div className="">
      <div className="px-6 w-full flex justify-end items-center ">
      <button onClick={onBack} className="mt-4 h-4 w-4">
            <CloseIcon/>
      </button>
      </div>
        <div className="flex justify-center items-center gap-[5px] w-full">
        <p className="text-xl font-normal"> Use my SKY Points </p>
        <div
          onClick={() => setIsInfoVisible((prev) => !prev)}
          className="relative flex h-[20px] w-[20px] items-center justify-center"
        >
          <InfoIcon />
          {isInfoVisible && (
            <div className="absolute -top-4 left-6 w-[189px] rounded-[4px] bg-[#CCE3FC] p-[12px] text-[10px] font-normal italic">
              Note that we store your data securely with advanced encryption and
              strict authentication measures to ensure utmost privacy and
              protection.
            </div>
          )}
        </div>
       </div>
      </div>
      <div className=" px-16 grid grid-cols-3 grid-rows-4 gap-2 mt-2">
      {Array.from({ length: 12 }, (_, index) => (
        <div key={index} className="bg-gray-200 h-[66px] flex items-center justify-center">
          {index + 1}
        </div>
      ))}
    </div>
   
    </div>
    </div>
    )
  }
  </div>

    
   
  );
};

export default ActivitiesList;

import React, { useState, useEffect } from "react";
import LoadingButton from "../LoadingButton/LoadingButton";
import RentalDetails from "./RentalDetails";
import SellingDetails from "./SellingDetails";
import PlanningPermission from "./PlanningPermission";
import AirspaceOptions from "./AirspaceOptions";
import AirspaceInfo from "./AirspaceInfo";
import ClaimAirspaceHeader from "./ClaimAirspaceHeader";

interface ClaimModalProps {
  onCloseModal: () => void;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  onClaim: () => void;
  claimButtonLoading: boolean;
}

const ClaimModal: React.FC<ClaimModalProps> = ({
    onCloseModal,
    data,
    setData,
    onClaim,
    claimButtonLoading,
  }) => {
    const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
    useEffect(() => {
      let airSpaceName = data.address.split(",");
      setData((prev) => {
        return {
          ...prev,
          name: airSpaceName[0],
        };
      });
    }, []);
    const handleSellPrice = (e) => {
      let inputVal = e.target.value;
      let parsedVal = parseFloat(inputVal);
      if (parsedVal >= 0 && !Number.isNaN(parsedVal)) {
        setData((prev) => {
          return {
            ...prev,
            sellingPrice: inputVal,
          };
        });
      } else {
        setData((prev) => {
          return {
            ...prev,
            sellingPrice: "0",
          };
        });
      }
    };
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white md:rounded-[30px] w-full max-h-screen h-screen md:max-h-[640px] md:h-auto overflow-y-auto overflow-x-auto md:w-[689px] z-[500] sm:z-50 flex flex-col gap-[15px] ">
        <div
          className="z-[100] sticky top-0 left-0 right-0 bg-white py-[20px] px-[29px] -mt-[1px]      md:shadow-none"
          style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
        >
          <ClaimAirspaceHeader onCloseModal={onCloseModal}/>
        </div>
        <div className="md:overflow-y-scroll">
          <div className="px-[29px]">
            <AirspaceInfo data={data} setData={setData}/>
            <AirspaceOptions data={data} setData={setData}/>
            {data.rent && <RentalDetails data={data} setData={setData}/>}
            {data.sell && <SellingDetails data={data} handleSellPrice={handleSellPrice} /> }
            <PlanningPermission data={data} setData={setData} />
  
            <div className="  flex items-center md:justify-center gap-[20px] text-[14px]  my-8">
              <div
                onClick={onCloseModal}
                className="rounded-[5px] py-[10px] px-[22px] text-[#0653EA] cursor-pointer"
                style={{ border: "1px solid #0653EA" }}
              >
                Cancel
              </div>
              
              <div className="w-[75%] md:w-[25%] rounded-[5px] py-[10px] px-[22px] text-white bg-[#0653EA] cursor-pointer">
                <div className="flex justify-center items-center w-full ">
                  <LoadingButton onClick={onClaim} isLoading={claimButtonLoading} color={'white'} className="">
                    Claim Airspace
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default ClaimModal;
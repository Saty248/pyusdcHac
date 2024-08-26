import useAuth from "@/hooks/useAuth";
import AirspaceRentalService from "@/services/AirspaceRentalService";
import PropertiesService from "@/services/PropertiesService";
import { PropertyData } from "@/types";
import { formatDate } from "@/utils";
import { SetStateAction, useState } from "react";

const { Fragment } = require("react");
const { ArrowLeftIcon, CloseIcon, LocationPointIcon } = require("../Icons");
interface ModalProps {
  airspace: any
    onCloseModal:() => void ;
    isOffer?:boolean
    pageNumber?: number
    setAirspaceList:  (value: SetStateAction<PropertyData[]>) => void
}


const  Modal = ({ airspace, onCloseModal, isOffer, pageNumber = 0, setAirspaceList }: ModalProps) => {
  const [inputValue, setInputValue] = useState(airspace?.address);
  const {editAirSpaceAddress} = PropertiesService()
  const [isLoading, setIsEditLoading] = useState(false)
  const { user } = useAuth();
  const {getUnverifiedAirspaces} = AirspaceRentalService();

  console.log(user, "user")
const handleEdit = async () => {
  if (!user || inputValue === airspace?.address) return;
  setIsEditLoading(true);
  const editResponse = await editAirSpaceAddress({ address: inputValue, propertyId: airspace.id });
  if(!editResponse) return
  const airspaceResp = await getUnverifiedAirspaces(
    user?.blockchainAddress,
    pageNumber,
    10,
  );
  setAirspaceList(airspaceResp.items);
  setIsEditLoading(false);
};

  return (
    <Fragment>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-[30px] md:rounded-[30px] px-[29px] w-full h-full md:h-auto md:w-[689px] z-[500] md:z-50 flex flex-col gap-[15px]">
        <div
          className="relative flex items-center gap-[20px] md:p-0 py-[20px] px-[29px] -mx-[29px] -mt-[30px] md:my-0 md:mx-0 md:shadow-none"
          style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
        >
          <div className="w-[16px] h-[12px] md:hidden" onClick={onCloseModal}>
            <ArrowLeftIcon />
          </div>
          <h2 className="text-light-black text-center font-medium text-xl">
            {inputValue}
          </h2>
          <div
            onClick={onCloseModal}
            className="hidden md:block absolute top-0 right-0 w-[15px] h-[15px] ml-auto cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>
       
        <div
          className="flex items-center gap-[10px] py-4 px-[22px] rounded-lg border border-deep-blue"
        >
          <div className="w-6 h-6">
            <LocationPointIcon />
          </div>
          <input className="font-normal text-light-black text-[14px] flex-1 border-none outline-none" 
          type="text"
          value={inputValue}
          onChange={ (e) => { setInputValue(e.target.value); }}
          />
     </div>
 
        <div className="flex gap-[15px]">
          <p className="text-[14px] font-normal text-light-black">ID:</p>
          <p className="text-[14px] font-normal text-light-grey break-all">
            {airspace?.id}
          </p>
        </div>

        {airspace?.metadata?.endTime && (
          <div className="flex gap-[15px]">
            <p className="text-[14px] font-normal text-light-black">
              Expiration Date:
            </p>
            <p className="text-[14px] font-normal text-light-grey">
              {formatDate(airspace?.metadata?.endTime)}
            </p>
          </div>
        )}

        {isOffer ? (
          <div
            className="flex gap-[20px] md:mt-[15px] mt-auto py-[16px] md:py-0 -mx-[30px] md:mx-0 md:mb-0 -mb-[30px] px-[14px] md:px-0 md:shadow-none"
            style={{ boxShadow: "0px 0px 4.199999809265137px 0px #00000040" }}
          >
            <div className="flex flex-col">
              <p className="font-normal text-[12px] text-[#838187]">
                Offer received
              </p>
              <p className="font-bold text-2xl text-light-black">
              {/*  {USDollar.format(99.87)} */}
              </p>
            </div>
            <div
              onClick={onCloseModal}
              className="flex-1 text-[#0653EA] rounded-[5px] bg-white text-center py-[10px] px-[20px] cursor-pointer flex items-center justify-center"
              style={{ border: "1px solid #0653EA" }}
            >
              Decline
            </div>
            <div
              className="flex-1 text-white rounded-[5px] bg-[#0653EA] text-center py-[10px] px-[20px] cursor-pointer flex items-center justify-center"
              style={{ border: "1px solid #0653EA" }}
            >
              Approve
            </div>
          </div>
        ) : (
          <div className="flex gap-[20px] md:mt-[15px] mt-auto -mx-[30px] md:mx-0 md:mb-0 -mb-[30px] px-[14px] md:px-0 py-[16px] md:py-0">
            <div
              onClick={onCloseModal}
              className="flex-1 text-[#0653EA] rounded-[5px] bg-white text-center py-[10px] px-[20px] cursor-pointer flex items-center justify-center"
              style={{ border: "1px solid #0653EA" }}
            >
              Cancel
            </div>
            <button
              // disabled
              onClick={handleEdit}
              className=" flex-1 text-white rounded-[5px] bg-[#0653EA]  text-center py-[10px] px-[20px] flex items-center justify-center"
            >
              {isLoading ? "Editing ..." : "Edit"}
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default Modal

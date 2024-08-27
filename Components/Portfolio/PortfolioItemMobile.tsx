import React, { useState } from "react";
import { ChevronRightIcon, DocumentApprovedIcon, DocumentRejectedIcon, LocationPointIcon, ReviewVerificationIcon } from "../Icons";
import AdditionalDocuments from "./AdditionalDocuments";
import VerificationSuccessPopup from "./VerificationSuccessPopup";
import UploadedDocuments from "./UploadedDocuments";

const PortfolioItemMobile = ({ airspaceName, tags, type, selectAirspace, setUploadedDoc, requestDocument,uploadedDoc,assetId}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [index,setIndex] = useState<number | string>();

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
    return ( 
      <div>
        <div
        className=" shadow-md px-4 py-6 items-center justify-between gap-[10px] rounded-lg bg-white cursor-pointer w-screen"
         >

          <div className="items-center justify-between gap-[10px] rounded-lg">
          <div className="flex items-center gap-[10px] flex-1">
              <div className="w-6 h-6">
                <LocationPointIcon />
              </div>
              <p className="font-normal text-[#222222] text-[14px] flex-1">
                {airspaceName.length > 15 ?  airspaceName.slice(0, 25) + ' ...' : airspaceName}
              </p>
            </div>
            <div className="">
            <div className="flex mt-2 gap-[10px] items-center">
              {!!tags[0] && (
                <div onClick={selectAirspace} className="w-20 bg-[#DBDBDB] text-[#222222] text-sm font-normal p-2 cursor-pointer rounded-[3px]">
                  {type === "land" ? "On Claim" : "On Rent"}
                </div>
              )}
              {!!tags[1] && (
                <div className="bg-[#E7E6E6] text-[#222222] text-sm font-normal px-[7px] cursor-pointer rounded-[3px]">
                  On Sale
                </div>
              )}
              {!!tags[2] && (
                <div className="bg-[#222222] text-white text-sm font-normal px-[7px] cursor-pointer rounded-[3px]">
                  No Fly Zone
                </div>
              )}
              {!!tags[3] && (
                <div className="bg-[#E04F64] text-white text-sm font-normal px-[7px] cursor-pointer rounded-[3px]">
                  Review Offer
                </div>
              )}
            {requestDocument &&  requestDocument[0]?.status == 'SUBMITTED' && (
                <div className=" mt-4 flex justify-start items-center gap-2">
                <div className="w-6 h-6">
                <ReviewVerificationIcon />
                </div>
                <p className="text-orange-500 font-normal text-sm">
                      Documents under review
                </p>
            </div>
            )}
            {requestDocument &&  requestDocument[0]?.status == 'APPROVED' && (
          <div className="flex justify-center items-center gap-2">
          <div className="w-6 h-6">
          <DocumentApprovedIcon />
          </div>
          <p className="text-[#1FD387] font-normal text-sm">
          Documents approved
          </p>
          </div>
        )}
        {requestDocument &&  requestDocument[0]?.status == 'REJECTED' && (
          <div className="flex justify-center items-center gap-2">
          <div className="w-6 h-6">
          <DocumentRejectedIcon />
          </div>
          <p className="text-[#E04F64] font-normal text-sm">
          Documents rejected
          </p>
          </div>
        )}
            </div>
            {((requestDocument && requestDocument?.length>0 )&& (!requestDocument[0]?.document) )&&(
            <div className="flex justify-between items-center gap-12 w-full mt-4">
            <div onClick={handleButtonClick} className="p-2 border border-orange-500 rounded-md">
            <p className="text-orange-500 font-normal text-sm">
              Additional documents requested
            </p>
            </div> 
            <div className="w-[7px] h-[14px]">
                  <ChevronRightIcon />
                </div>
              </div>
            )}
            
            
      {uploadedDoc?.length > 0 && requestDocument && requestDocument?.length>0 && (index === assetId )&& <UploadedDocuments  uploadedDoc={uploadedDoc } requestDocument = {requestDocument}/>}
      {showPopup && (
        <AdditionalDocuments assetId={assetId} setIndex={setIndex} showPopup={showPopup} setUploadedDoc={setUploadedDoc} setShowSuccessToast={setShowSuccessToast} closePopup={closePopup} requestDocument = {requestDocument[0]} />
        )}
 
        {showSuccessToast &&  <VerificationSuccessPopup />}

        </div>
        </div>
        </div>
      </div>
        );
}
 
export default PortfolioItemMobile;
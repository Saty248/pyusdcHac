import React, { useState } from "react";
import { ChevronRightIcon, LocationPointIcon, ReviewVerificationIcon } from "../Icons";
import AdditionalDocuments from "../MyAccount/AdditionalDocuments";
import UploadedDocuments from "../MyAccount/UploadedDocuments";
import VerificationSuccessPopup from "../MyAccount/VerificationSuccessPopup";

const PortfolioItem = ({ airspaceName, tags, type, selectAirspace, setUploadedDoc, requestDocument,uploadedDoc}) => {
  const [showPopup, setShowPopup] = useState(false);

  const [showSuccessToast, setShowSuccessToast] = useState(false)


  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  console.log()
  return (
    <div
      className="p-[11px] items-center justify-between gap-[10px] rounded-lg bg-white cursor-pointer"
      style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
    >
      <div
      className="flex items-center justify-between gap-[10px]  cursor-pointer" >
      <div className="flex items-center gap-[10px] flex-1">
        <div className="w-6 h-6">
          <LocationPointIcon />
        </div>
        <p className="font-normal text-[#222222] text-[14px] flex-1">
          {airspaceName}
        </p>
      </div>
      <div  className="flex gap-[10px] items-center">
        {!!tags[0] && (
          <div   onClick={selectAirspace} className="bg-[#DBDBDB] text-[#222222] text-sm font-normal px-[7px] cursor-pointer rounded-[3px]">
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


        {requestDocument?.length>0 && (
        <div onClick={handleButtonClick} className="p-2 border border-orange-500 rounded-md">
        <p className="text-orange-500 font-normal text-sm">
          Additional documents requested
        </p>
       </div>
        )}
        


  {requestDocument[0]?.document && requestDocument && (
          <div className="flex justify-center items-center gap-2">
          <div className="w-6 h-6">
          <ReviewVerificationIcon />
          </div>
          <p className="text-orange-500 font-normal text-sm">
                 Documents under review
          </p>
          </div>
   )}
        
        <div className="w-[7px] h-[14px]">
          <ChevronRightIcon />
        </div>
      </div>
      </div>
     
   {uploadedDoc?.length > 0 && requestDocument && <UploadedDocuments  uploadedDoc={uploadedDoc} requestDocument = {requestDocument}/>}

      {showPopup && (
        <AdditionalDocuments showPopup={showPopup} setUploadedDoc={setUploadedDoc} setShowSuccessToast={setShowSuccessToast} closePopup={closePopup} requestDocument = {requestDocument[0]} />
        )}
 
  {showSuccessToast &&  <VerificationSuccessPopup />}
    </div>
  );
};

export default PortfolioItem;

import { FC, useState } from "react";
import React from "react";
import { CancelIconWhite, CloseIconWhite, FailedVerificationIcon, FileIcon, SuccessIcon, SuccessIconwhite } from "../Icons";
import AdditionalDocuments from "./AdditionalDocuments";
import VerificationSuccessPopup from "./VerificationSuccessPopup";


interface AccountVerificationProps {
  KYCStatusId: number;
  isLoading: boolean;
  onVerifyMyAccount: () => void;
}
const AccountVerification = ({
  KYCStatusId,
  isLoading,
  onVerifyMyAccount,
}: AccountVerificationProps) => {
  console.log(KYCStatusId , "KYCStatusId")
  const [showPopup, setShowPopup] = useState(false);
  const [showAdditionalDoc, setShowAdditionalDoc] = useState(false)

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
    <div className="flex flex-col py-[17px] md:px-[25px] px-[20px] rounded-[30px] gap-[15px] bg-white"  style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }} >
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-medium text-[#222222]">
        Account verification
      </h2>
      <div className="">
        <FailedVerificationIcon/>
      </div>
    </div>

   <div>
    { showAdditionalDoc ?
      (
      <div>  
        <p className="font-normal text-base text-[#87878D] mt-2">Your account verification is currently under review. This step is crucial for security and compliance reasons. Please await confirmation to enjoy full access to our services. Rest assured, your data is securely handled. If you have any questions, feel free to contact our support team. Thank you for your patience.</p>
        <p className="font-bold text-base text-[#87878D] mt-2">Once your KYC verification is successfully completed, you'll instantly earn 10 SKY points.</p>
      </div>
     ):(
     <div>
      <p className="font-normal text-base text-[#87878D] mt-2">
        Your account verification is currently under review.<span className="font-bold"> To complete this process, we require additional documentation.</span> This step is crucial for security and compliance reasons.
      </p>
      <p className="font-normal text-base text-[#87878D] mt-2">
        Please<span className="font-bold">submit “Document name” </span>at your earliest convenience to enjoy full access to our services. Rest assured, your data is securely handled. If you have any questions, feel free to contact our support team. Thank you for your cooperation and patience
      </p>
     </div>
     )
    }
    

    {!showAdditionalDoc &&(
      <div className="flex justify-end mt-2">
      <button  onClick={handleButtonClick} className="text-dark-blue text-base">
        Add Additionnal Documents
      </button>
    </div>
    )}
   </div>    

     
     
   
      {/* <div>  
      <p className="font-normal text-base text-[#87878D]">Your account verification is currently under review. This step is crucial for security and compliance reasons. Please await confirmation to enjoy full access to our services. Rest assured, your data is securely handled. If you have any questions, feel free to contact our support team. Thank you for your patience.</p>
      <p className="font-bold text-base text-[#87878D]">Once your KYC verification is successfully completed, you'll instantly earn 10 SKY points.</p>
    </div> */}
  

    </div>
    
    
    {showAdditionalDoc && (
     <div className="p-4 mt-8 rounded-[30px] bg-white shadow-lg" style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}>
     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[15px]">
       <div className="">
       <h2 className="text-xl font-semibold">My Additional Documents</h2>
       <p className="mt-4">We requested your “Document Name” and “Document Name”</p>
     </div>
     <div className="w-full md:w-[38%] flex flex-col md:flex-row justify-center items-center gap-6 mt-4 md:mt-0">
       <div className="px-6 py-4 flex justify-center items-center border rounded-md gap-4">
         <FileIcon />
         <div>
           <p className="text-[#1F7DFD] text-sm">file_name.jpg</p>
           <p className="text-sm">“Document Name”</p>
         </div>
       </div>
       <div className="px-6 py-4 flex justify-center items-center border rounded-md gap-4">
         <FileIcon />
         <div>
           <p className="text-[#1F7DFD] text-sm">file_name.jpg</p>
           <p className="text-sm">“Document Name”</p>
         </div>
       </div>
     </div>
  </div>
   </div> 
    )}
    
    
      {showPopup && (
        <AdditionalDocuments showPopup={showPopup} closePopup={closePopup} setShowAdditionalDoc={setShowAdditionalDoc} />
        )}
 
    
      {/* {showAdditionalDoc && (
        <VerificationSuccessPopup />
      )} */}
      
  
   
    </div>
  );
};

export default AccountVerification;


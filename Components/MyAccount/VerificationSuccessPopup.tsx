import React, { useState} from 'react';
import { CancelIconWhite, SuccessIcon, } from "../Icons";
import { useMobile } from '@/hooks/useMobile';

const VerificationSuccessPopup: React.FC = () => {
    const { isMobile } = useMobile();
    const [showPopup, setShowPopup] = useState(true);

    const handleClose = () => {
        setShowPopup(false); 
    }

  return (
    <>
    {showPopup && (
      <div className={`fixed ${isMobile ? 'inset-0 bg-green-500' : 'top-24 right-0 '}  flex flex-col items-center justify-center p-4 z-50 gap-12`}>
        <div className="absolute top-4 right-4">
          <button onClick={handleClose} className="text-white h-6 w-6">
            <CancelIconWhite />
          </button>
        </div>
        {isMobile ? (
          <>
            <div className="flex justify-center items-center w-24 h-24">
              <SuccessIcon />
            </div>
            <div className="flex flex-col gap-6 text-center text-white w-60">
              <p className="text-xl font-medium">
                Thanks, your additional documents have been successfully submitted.
              </p>
              <p className="text-sm font-normal px-8">
                Wait for our team to review your documents. Once your KYC verification is successfully completed, you'll instantly earn 10 SKY points.
              </p>
              <div className="flex justify-center items-center">
                <button onClick={handleClose} className="w-[174px] text-white text-sm py-3 border rounded">
                  Close
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="w-auto bg-white  rounded">
            <div className="flex items-center justify-between p-4">
              <div className="w-4 h-4">
                <SuccessIcon />
              </div>
              <div className="p-2 text-green-500">
                <p>Thanks, your additional documents have been successfully submitted.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )}
  </>
  );
};

export default VerificationSuccessPopup;

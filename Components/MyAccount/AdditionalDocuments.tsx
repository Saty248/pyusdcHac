import React, { useState } from 'react';
import { useDropzone, DropzoneRootProps } from 'react-dropzone';
import { CloseIcon } from "../Icons";
import { useMobile } from '@/hooks/useMobile';


interface PopupProps {
  showPopup: boolean;
  closePopup: () => void;
  setShowAdditionalDoc:React.Dispatch<React.SetStateAction<boolean>>
}

const Popup: React.FC<PopupProps> = ({ showPopup, closePopup,setShowAdditionalDoc }) => {
    const { isMobile } = useMobile();
    const [files, setFiles] = useState([]);
    
  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };
 const { getRootProps } = useDropzone({ onDrop });

  if (!showPopup) return null;

  const handleclick =() =>{
    setShowAdditionalDoc(true)
    closePopup()
  }

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="fixed bottom-0 md:relative md:top-0 flex flex-col md:w-[566px] md:h-[350px] md:py-[20px] py-[30px] md:px-[20px] px-[30px] rounded-t-[30px] md:rounded-[15px] bg-white gap-[15px]" style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}>
      <div>
        { isMobile ?
        (
          <div className="flex flex-col justify-center items-center">
            <div onClick={closePopup} className="border-4 border-dark-grey cursor-pointer w-[20%] rounded-md">  </div>
            <h2 className=" mt-4 text-xl font-medium text-[#222222]">Documents</h2>
          </div>         
        ):(
          <div className="flex justify-between">
            <h2 className="text-xl font-medium text-[#222222]">Documents</h2>
            <div onClick={closePopup} className="w-4 h-4 cursor-pointer">
              <CloseIcon />
            </div>
          </div>
        ) }
        </div>
       
        <p className="font-normal text-base text-[#87878D]">
          Please upload additional documents to complete your KYC
        </p>
        <p className="bg-[#D5DCEB] border w-full h-1"></p>
        <p className="font-normal text-base text-[#87878D]">
          We need: <span className="font-bold">“Document name”</span>
        </p>
        <div
          {...(getRootProps() as DropzoneRootProps)}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500"
        >
       { isMobile ?(
         <p className="text-base font-medium text-[#87878D]">click to upload Document</p>
        ):(
        <p className="text-base font-medium text-[#87878D]">Drag here or click to upload</p>  
        )}
        </div>
        <button  onClick={ handleclick} className="mt-4 px-6 py-2 text-white bg-dark-blue text-base">
          Submit Additional Documents
        </button>
      </div>
    </div>
  );
};

export default Popup;

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDropzone, DropzoneRootProps } from 'react-dropzone';
import { CloseIcon } from "../Icons";
import { useMobile } from '@/hooks/useMobile';
import Service from '@/services/Service';


interface PopupProps {
  showPopup: boolean;
  closePopup: () => void;
  setUploadedDoc: Dispatch<SetStateAction<File[]>>
  setShowSuccessToast: Dispatch<SetStateAction<boolean>>
}

const Popup: React.FC<PopupProps> = ({ showPopup, closePopup, setUploadedDoc, setShowSuccessToast }) => {
    const { isMobile } = useMobile();
    const [files, setFiles] = useState<File | null>(null);
    const {postRequest } = Service();


  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles[0]);
  };
 const { getRootProps } = useDropzone({ onDrop });

  if (!showPopup) return null;

  const handleclick = async() =>{
    if(!files) return
    const response = await postRequest({
      uri: `/private/aws-s3/generate-s3-sensitive-upload-url?fileType=${files?.type}&fileName=${files?.name}`,
      postData: files
    })
    console.log({response})
    setUploadedDoc((prev) => [...prev, files])
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 2000);
    closePopup()
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="fixed bottom-0 md:relative md:top-0 flex flex-col md:w-[566px] md:min-h-[350px] md:py-[20px] py-[30px] md:px-[20px] px-[30px] rounded-t-[30px] md:rounded-[15px] bg-white gap-[15px]" style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}>
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
        To verify your ownership of the claimed airspace and facilitate your passive income, we require additional documentation for legal compliance. Please be assured that all your information will be securely stored and handled with utmost confidentiality

        Please upload additional documents to complete you claim
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
        <button onClick={handleclick} className="mt-4 px-6 py-2 text-white bg-dark-blue text-base">
          Submit Additional Documents
        </button>
      </div>
    </div>
  );
};

export default Popup;
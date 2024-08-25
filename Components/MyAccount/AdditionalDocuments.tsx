import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useDropzone, DropzoneRootProps } from 'react-dropzone';
import { CloseIcon } from "../Icons";
import { useMobile } from '@/hooks/useMobile';
import Service from '@/services/Service';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import UserService from '@/services/UserService';


interface PopupProps {
  showPopup: boolean;
  closePopup: () => void;
  setShowAdditionalDoc:React.Dispatch<React.SetStateAction<boolean>>
  setShowSuccessToast: Dispatch<SetStateAction<boolean>>
  setUploadedDoc: React.Dispatch<React.SetStateAction<File[]>>
  setShowUnderReviewDoc: React.Dispatch<React.SetStateAction<boolean>>
}

const Popup: React.FC<PopupProps> = ({ showPopup,  closePopup,setShowAdditionalDoc,setShowSuccessToast,setUploadedDoc, setShowUnderReviewDoc}) => {
    const { isMobile } = useMobile();
    const [files, setFiles] = useState<File | null>(null);
    const {postRequest} = Service();
    const {user, signIn} = useAuth()
    const { getUser } = UserService();
   
    const requestedDoc = useMemo(() => {
      return user?.requestDocument.find((doc) => doc.status === "NOT_SUBMITTED" )
    }, [user])
    
  
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles[0]);
    setUploadedDoc((prev) => [...prev, acceptedFiles[0]])
  };
 const { getRootProps } = useDropzone({ onDrop });

  if (!showPopup) return null;

  const handleclick = async() =>{
    if(!files) return
    const requestId =  requestedDoc.id
    const response = await postRequest({
      uri: `/private/request-document/generate-upload-url?contentType=${files?.type}&requestId=${requestId}`,
      postData: files
    })
    const uploadUrl = response?.data.uploadUrl?.uploadUrl
    const uploadKey = response?.data.key
    if( !uploadUrl) throw new Error('upload url not found')
      console.log(uploadUrl,"uploadUrluploadUrl")
    const formData = new FormData();
    formData.append('file', files);
    formData.append('url', uploadUrl);
    await axios.put('/api/persona', formData)
    await postRequest({
      uri: `/private/request-document/update-document-metadata?filePath=${uploadKey}&requestId=${requestId}`
    })


    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 5000);
    setShowAdditionalDoc(true)
    closePopup()
    setShowUnderReviewDoc(true)
    const responseData = await getUser();
    if (responseData?.id) {
      signIn({ user: responseData });}
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
          We need: <span className="font-bold">{requestedDoc.description}</span>
        </p>
        <div
          {...(getRootProps() as DropzoneRootProps)}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500"
        >
       { isMobile ?(
         <p className="text-base font-medium text-[#87878D]">{files ? files.name : 'click to upload Document'}</p>
        ):(
        <p className="text-base font-medium text-[#87878D]">{files ? files.name : 'Drag here or click to upload'}</p>  
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
function getUser() {
  throw new Error('Function not implemented.');
}


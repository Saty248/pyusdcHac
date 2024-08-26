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

const AdditionalDocuments: React.FC<PopupProps> = ({ showPopup,  closePopup,setShowAdditionalDoc,setShowSuccessToast,setUploadedDoc, setShowUnderReviewDoc}) => {
    const { isMobile } = useMobile();
    const [files, setFiles] = useState<File | null>(null);
    const {postRequest} = Service();
    const {user, signIn} = useAuth()
    const { getUser } = UserService();
    const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="fixed bottom-0 md:relative md:top-0 flex flex-col md:w-[566px] min-h-80  md:py-[20px] py-[30px] md:px-[20px] px-[30px] rounded-t-[30px] md:rounded-[15px] bg-white gap-[15px]" style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}>
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
       
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg ">
        <p className="text-gray-700">
          To prove home ownership in the United States, you'll typically need one or more of the following documents...
          {isExpanded && (
            <div className="mt-2 max-h-48 overflow-y-auto pr-2">
              <p>
                1. <em>Deed</em>: The most definitive proof of ownership is your property deed, which shows you as the
                legal owner. This document is issued when you purchase the property. There are different types of deeds,
                such as a warranty deed or a quitclaim deed.
              </p>
              <p>
                2. <em>Title</em>: The title indicates your legal ownership of the property and is often accompanied by
                title insurance. The title company that handled your home purchase will have provided this documentation.
              </p>
              <p>
                3. <em>Mortgage Statement or Satisfaction of Mortgage</em>: If you have a mortgage, your mortgage statement
                or a letter from your lender can serve as proof of ownership. If you’ve paid off the mortgage, a
                satisfaction of mortgage document from the lender shows that you own the home outright.
              </p>
              <p>
                4. <em>Property Tax Records</em>: Property tax bills or records from your local government list the
                homeowner’s name and can serve as proof of ownership.
              </p>
              <p>
                5. <em>Homeowner’s Insurance Policy</em>: Your insurance policy typically lists the property owner and can
                be used as supporting documentation.
              </p>
              <p>
                6. <em>Closing Documents</em>: When you closed on the property, you should have received a packet of
                documents that includes the purchase agreement and closing disclosure. These documents outline the transfer
                of ownership.
              </p>
              <h4 className="my-6 font-bold">Where to Obtain These Documents:</h4>
              <p>
                <em>County Clerk or Recorder’s Office</em>: The deed and title documents are often recorded at your local
                county clerk or recorder’s office. You can request copies of these records, often for a small fee.
              </p>
              <p>
                <em>Title Company</em>: If you used a title company during the purchase, they may have copies of the title
                and deed. You can request these documents from them.
              </p>
              <p>
                <em>Mortgage Lender</em>: If you’re still paying a mortgage, your lender can provide mortgage statements or
                satisfaction of mortgage documents if it’s been paid off.
              </p>
              <p>
                <em>Property Tax Office</em>: Contact your local tax assessor’s office or check their website for property
                tax records.
              </p>
              <p>
                <em>Your Records</em>: If you have a copy of the closing documents, insurance policies, or your deed, those
                can be used as proof of ownership. Having one or more of these documents readily available will generally
                be sufficient to prove you own your home.
              </p>
            </div>
          )}
        </p>
        <button
          onClick={toggleReadMore}
          className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
        <p className="bg-[#D5DCEB] border w-full h-1"></p>
        <p className="font-normal text-base text-[#87878D]">
          We need: <span className="font-bold">Proof Of Ownership</span>
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



export default AdditionalDocuments;
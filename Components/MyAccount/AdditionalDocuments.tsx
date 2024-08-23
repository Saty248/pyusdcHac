import React, { Dispatch, SetStateAction, useState } from "react";
import { useDropzone, DropzoneRootProps } from "react-dropzone";
import { CloseIconBlack } from "../Icons";
import { useMobile } from "@/hooks/useMobile";
import Service from "@/services/Service";
import DocumentUploadServices from "@/services/DocumentUploadServices";
import axios from "axios";

interface PopupProps {
  showPopup: boolean;
  closePopup: () => void;
  setUploadedDoc: Dispatch<SetStateAction<File[]>>;
  setShowSuccessToast: Dispatch<SetStateAction<boolean>>;
  requestDocument?: any;
}

const Popup: React.FC<PopupProps> = ({
  showPopup,
  closePopup,
  setUploadedDoc,
  setShowSuccessToast,
  requestDocument,
}) => {
  const { isMobile } = useMobile();
  const { generateS3UploadUrl ,updateDocument} = DocumentUploadServices();
  // const [file, setFile] = useState<File | null>(null);
  const { postRequest } = Service();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadUrls, setUploadUrls] = useState([]);

  const onDrop = (acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  };
  const { getRootProps } = useDropzone({ onDrop ,multiple: true,});

  if (!showPopup) return null;
  const getPresignedUrls = async (selectedFiles) => {
    let urls =[] ;
    await Promise.all(
      selectedFiles.map(async (file) => {
        const response = await generateS3UploadUrl(
          file?.type,
          requestDocument?.id
        );
        // const data = await response.json();
         urls.push(response);
      })
    );
    return urls
    // setUploadUrls(urls);
  };
  // const convertToBlob = (base64Image) => {
  //   let binary = atob(base64Image.split(',')[1]);
  //   let array = [];
  //   for (let i = 0; i < binary.length; i++) {
  //     array.push(binary.charCodeAt(i));
  //   }
  //   return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  // };
  const fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });
  const uploadImages = async (urls) => {
    try {
      await Promise.all(
        selectedFiles.map(async (file, index) => {
          const blobData = fileToBlob(file)
          const formData = new FormData();
          formData.append('file', file);
          // const blobData2 = new Blob([file], { type: file.type });
          let url = urls[index]?.awsUploadUrl
  
          try {
            const response = await axios.put(url,
               formData, 
              // blobData,
               {
              headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type':file?.type,
              },
            }
          );
            console.log(response,"happy");
            if (response.status === 200) {
              console.log(`${file.name} uploaded successfully`);
            } else {
              console.error(`${file.name} upload failed`);
            }
          } catch (error) {
            // console.error(`Error uploading ${file.name}:`, error);
            console.log('error 2',error)
          }
        })
      );
  
      console.log('All files uploaded successfully');
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  const handleClick = async () => {
    // if (!file) return;
    //replace the request ID with the correct value

    // console.log(file, "test file");
    // console.log(response,"hello response test");
    console.log(selectedFiles,"hello")
   const urls = await getPresignedUrls(selectedFiles);  
   console.log(urls,"urls");
   const upload = await uploadImages(urls)
   console.log(upload ,"helo test 1")
  const path = urls[0]?.key;
  console.log(path,"path");
  const result = await updateDocument(path,requestDocument?.id)
  console.log(result , "happy ")
    // const uploadImage = async () => {
    //   // const response1 = await generateS3UploadUrl(
    //   //   file?.type,
    //   //   requestDocument?.id
    //   // );
    //   console.log('')
    //   // if (!file) return;
    //   // console.log(response1, "test response 1");
    //   // const response = await fetch(response1?.awsUploadUrl, {
    //   //   method: 'POST',
    //   //   body: file,
    //   //   headers: {
    //   //     'Content-Type': file.type,
    //   //   },
    //   // });
    //   // const response = await axios.put(response1?.awsUploadUrl, file, {
    //   //   headers: {
    //   //     'Content-Type': "application/jpg",
    //   //   },
    //   // });
    //   // const awsUploadUrl = response1?.awsUploadUrl; // Replace with the presigned URL
    //   // let filePath = response1?.fileKey;
    //   // axios
    //   //   .put(awsUploadUrl, file, {
    //   //     headers: {
    //   //       "Content-Type": "multipart/form-data",
    //   //     },
    //   //   })
    //   //   .then((response) => {
    //   //     console.log(response, "test 2");
    //   //     console.log(response.data, "test 3");
    //   //   })
    //   //   .catch((error) => {
    //   //     console.error(error, "the s3 error");
    //   //   });

    //   //the second api

    //   // axios.put(`/private/aws-s3/update-document-metadata?filePath=${filePath}&requestId=${requestDocument?.id}`, file, {
    //   //   headers: {
    //   //     'Content-Type': file.type,
    //   //   },
    //   // })
    //   //   .then((response) => {
    //   //     console.log(response,"test 2");
    //   //     console.log(response.data,"test 3");
    //   //   })
    //   //   .catch((error) => {
    //   //     console.error(error,"the s3 error");
    //   //   });

    //   // console.log(response,"response 2 test")
    //   // if (response.ok) {
    //   //   console.log('Upload successful');
    //   // } else {
    //   //   console.error('Upload failed');
    //   // }
    // };
    // response = await postRequest({
    //   uri: `/private/aws-s3/generate-s3-upload-url?fileType=${file?.type}&requestId=${requestId}`,
    //   postData: file,
    // });
    // await uploadImage();
    // console.log(file, "file 2");
    console.log();
    // console.log( response,"response" );
    // console.log(file.type, "cccccccccc");
    // console.log(file, "cccccccccc");

    // setUploadedDoc((prev) => [...prev, file]);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
    closePopup();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="fixed bottom-0 md:relative md:top-0 flex flex-col md:w-[566px] md:min-h-[350px] md:py-[20px] py-[30px] md:px-[20px] px-[30px] rounded-t-[30px] md:rounded-[15px] bg-white gap-[15px]"
        style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
      >
        <div>
          {isMobile ? (
            <div className="flex flex-col justify-center items-center">
              <div
                onClick={closePopup}
                className="border-4 border-dark-grey cursor-pointer w-[20%] rounded-md"
              >
                {" "}
              </div>
              <h2 className=" mt-4 text-xl font-medium text-[#222222]">
                Documents
              </h2>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-[#222222]">Documents</h2>
              <button
                onClick={closePopup}
                className="flex  w-4 h-4 cursor-pointer text-light-black"
              >
                <CloseIconBlack />
              </button>
            </div>
          )}
        </div>

        <p className="font-normal text-base text-[#87878D]">
          To verify your ownership of the claimed airspace and facilitate your
          passive income, we require additional documentation for legal
          compliance. Please be assured that all your information will be
          securely stored and handled with utmost confidentiality
          <br />
          <br />
          Please upload additional documents to complete you claim
        </p>
        <hr className="bg-[#D5DCEB] w-full" />
        <p className="font-normal text-base text-[#87878D]">
          We need:{" "}
          <span className="font-bold">{requestDocument?.description}</span>
        </p>
        <div
          {...(getRootProps() as DropzoneRootProps)}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500"
        >
          {isMobile ? (
            <p className="text-base font-medium text-[#87878D]">
              click to upload Document
            </p>
          ) : (
            <p className="text-base font-medium text-[#87878D]">
              Drag here or click to upload
            </p>
          )}
        </div>
        <button
          onClick={handleClick}
          className="mt-4 px-[10px] py-[17px] text-white bg-dark-blue text-base rounded-[5px]"
        >
          Submit Additional Documents
        </button>
      </div>
    </div>
  );
};

export default Popup;

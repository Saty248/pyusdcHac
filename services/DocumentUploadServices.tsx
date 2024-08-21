import Service from "./Service"

const DocumentUploadServices = () => {
  const { getRequest, postRequest } = Service();



  const generateS3UploadUrl = async ( fileType,requestId )=>{
    try {
      if(!fileType || !requestId)return;
    const  response = await postRequest({
        uri: `/private/aws-s3/generate-s3-upload-url?fileType=${fileType}&requestId=${requestId}`,
      });
      console.log(response,"hello test")
      return response?.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message)
    }
  }
  




  return { 
    generateS3UploadUrl,
  };
};

export default DocumentUploadServices;
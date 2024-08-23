import Service from "./Service"

const DocumentUploadServices = () => {
  const { getRequest, postRequest, patchRequest } = Service();



  const generateS3UploadUrl = async ( fileType,requestId )=>{
    try {
      if(!fileType || !requestId)return;
    const  response = await postRequest({
        uri: `/private/request-document/generate-upload-url?contentType=${fileType}&requestId=${requestId}`,
      });
      console.log(response,"hello test")
      return response?.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message)
    }
  }
  const updateDocument = async ( path,requestId )=>{
    try {
      if(!path || !requestId)return;
    const  response = await postRequest({
        uri: `/private/request-document/update-document-metadata?filePath=${path}&requestId=${requestId}`,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message)
    }
  }




  return { 
    generateS3UploadUrl,
    updateDocument
  };
};

export default DocumentUploadServices;
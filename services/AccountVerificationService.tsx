import Service from "./Service";

const AccountVerificationService = async ({ postData }: {postData: any}) => {
    try {
        const response = await postRequest({
          uri: `/public/properties/`,
          postData,
          isPublic: true,
        })
        return response?.data;
      } catch (error) {
        console.error(error);
      }
    }
 



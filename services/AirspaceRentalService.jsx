import Service from "./Service"

const AirspaceRentalService = () => {
  const { getRequest, postRequest } = Service();

  const getPropertiesByUserAddress = async (callerAddress, type, limit, afterAssetId)=>{
    try {
      const response = await getRequest({
        uri: `/private/airspace-rental/retrieve-tokens?callerAddress=${callerAddress}&type=${type}&limit=${limit}&afterAssetId=${afterAssetId || ""}`
      })
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const getUnverifiedAirspaces = async (callerAddress, limit, page)=>{
    try {
      const response = await getRequest({
        uri: `/private/airspace-rental/retrieve-unverified-airspace?callerAddress=${callerAddress}&limit=${limit}&page=${page || "1"}`
      })
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const createMintRentalToken = async ({ postData })=>{
    try {
      const response = await postRequest({
        uri: `/private/airspace-rental/create-mint-rental-token-ix`,
        postData,
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const executeMintRentalToken = async ({ postData })=>{
    try {
      const response = await postRequest({
        uri: `/private/airspace-rental/execute-mint-rental-token-ix`,
        postData,
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }


  return { 
    getPropertiesByUserAddress,
    getUnverifiedAirspaces,
    createMintRentalToken,
    executeMintRentalToken,
  };
};

export default AirspaceRentalService;
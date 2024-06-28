import Service from "./Service";

const MarketplaceService = () => {
  const { getRequest, postRequest } = Service();

  const getAuctions = async () => {
    try {
      const response = await getRequest({
        uri: `/market/nft`,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createAuction = async ({ postData }: { postData: any }) => {
    try {
      const response = await postRequest({
        uri: `/market/nft`,
        postData,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAuctions,
    createAuction,
  };
};

export default MarketplaceService;

import { AuctionListingI, AuctionSubmitI } from "@/types";
import Service from "./Service";

const MarketplaceService = () => {
  const { getRequest, postRequest } = Service();

  const getAuctions = async (page: number = 1, limit: number = 10) => {
    try {
      const response = await getRequest({
        uri: `/market/nft?page=${page}&limit=${limit}`,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createAuction = async ({ postData }: { postData: AuctionListingI }) => {
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

  const submitAuction = async ({ postData }: { postData: AuctionSubmitI }) => {
    try {
      const response = await postRequest({
        uri: `/market/nft/txs/submit`,
        postData,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const searchAuctions = async (page: number = 1, limit: number = 10,searchParam:string | undefined) => {
    try {
      const response = await getRequest({
        uri: `/market/nft/search?searchParam=${searchParam}&page=${page}&limit=${limit}`,
      });
      console.log(response?.data,"hello search")
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const filterAuctions = async ({
    postData,
  }: {
    postData: {
      minPrice: number;
      maxPrice: number;
    };
  }) => {
    try {
      const response = await postRequest({
        uri: `/market/nft/search`,
        postData,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createBid = async ({ postData }) => {
    try {
      // console.log(assetId,callerBlockchainAddress,bidOffer,bidType,'why')
      const response = await postRequest({
        uri: "/market/nft/bid",
        postData,
      });

      console.log(response, "thanks");
      return response;
    } catch (error) {
      console.error(error);
      console.log("error here 2 thanks", error);
      return [];
    }
  };
  const submitSignature = async ({ postData }) => {
    try {
      console.log(postData, "postData");
      // console.log(assetId,signature)
      const response = await postRequest({
        uri: "/market/nft/tx/submit",
        postData,
      });
      console.log(response, "hello from service");
      return response;
    } catch (error) {
      console.error(error);
      console.log("error here 2 thanks", error);
      return [];
    }
  };

  return {
    getAuctions,
    createAuction,
    submitAuction,
    searchAuctions,
    filterAuctions,
    createBid,
    submitSignature,
  };
};

export default MarketplaceService;
